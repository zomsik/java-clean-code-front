import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Store } from 'react-notifications-component';

const NewPostForm = () => {
  const categories = ['BRAK', 'Technologia', 'Informacje', 'Ukraina', "Podroze", "Rozrywka", "Sport", "Motoryzacja", "Gospodarka", "Ciekawostki"];
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('BRAK');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  
  function notificate(title, message, type) {
    Store.addNotification({
      title:title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        setImage(Array.from(byteArray));
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newPostData = {
      text: text,
      image: image,
      selectedCategory: selectedCategory
    };

    const jwtToken = localStorage.getItem('jwtToken');
    let headers = {'Content-Type': 'application/json',
                   'Authorization': process.env.REACT_APP_BASIC_AUTH,
                   'jwt': jwtToken};

    console.log(headers)

    const response = await fetch(`http://localhost:8081/api/posts/create-post`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(newPostData)
        })
        .then(async res => {
          if(!res.ok) {
            console.log("CBA")
            const text = await res.text();
            throw new Error(text); 
           }
          else {
            console.log("ABC")
           return res.json();
         }    
        })
        .then(function(data) {
          console.log("DATA NEW POST")
          console.log(data)
          if (data.success == true) {
            
            window.location.reload(false);
            notificate("Sukces", data.message, "success")
            
          } else {
            if (data.message != null) {
              notificate(data.message)
            }
          }
          
        })
        .catch(err => {
           
           console.log(err)
           const errorObject = JSON.parse(err);
           notificate("Błąd!", errorObject.message, "danger")
        });





  };




  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="text">
        <Form.Label>Tekst:</Form.Label>
        <Form.Control type="text" value={text} onChange={handleTextChange} />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Obrazek:</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Kategoria:</Form.Label>
        <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Dodaj post
      </Button>
    </Form>
  );
};

export default NewPostForm;