import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useParams } from 'react-router-dom';


import {validToken } from '../../utils/jwt';


import { Store } from 'react-notifications-component';
import { jwtDecode } from 'jwt-decode';

const NewCommentForm = () => {
  const { postId } = useParams();
  const [text, setText] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newCommentData = {
      text: text,
      postId: postId
    };

    const jwtToken = localStorage.getItem('jwtToken');
    let headers = {'Content-Type': 'application/json',
                   'Authorization': process.env.REACT_APP_BASIC_AUTH,
                   'jwt': jwtToken};

    const response = await fetch(`http://localhost:8081/api/comments/create-comment`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(newCommentData)
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
          console.log("DATA NEW COMMENT")
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
      <Button variant="primary" type="submit">
        Dodaj komentarz
      </Button>
    </Form>
  );
};

export default NewCommentForm;