
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import createDateFromArray from '../../utils/DateUtil';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


import {validToken } from '../../utils/jwt';

const Post = (props) => { 

    const [image, setImage] = useState({});
    const [imageExist, setImageExist] = useState(false);
    console.log("POST")
    console.log(props)


    const [isLiked, setIsLiked] = useState(props.post.liked);
    const [likes, setLikes] = useState(props.post.likes);


    const handleLikeClick = () => {

      let headers = {'Authorization': process.env.REACT_APP_BASIC_AUTH};
      if (validToken()) {
        const jwtToken = localStorage.getItem('jwtToken');
        headers = {
          ...headers,
          'jwt': jwtToken
        }
      } 
  
      
      if (!isLiked) {
        fetch(`http://localhost:8081/api/posts/like/${props.post.id}`, {
          method: 'POST',
          headers: headers,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setIsLiked(true);
              setLikes(data.likes)
            }
          })
          .catch((error) => {
            console.error('Błąd podczas likowania postu:', error);
          });
      } else {
          // Wysyłanie informacji o dislajku na serwer
          fetch(`http://localhost:8081/api/posts/dislike/${props.post.id}`, {
            method: 'POST',
            headers: headers
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                setIsLiked(false);
                setLikes(data.likes)
              }
            })
            .catch((error) => {
              console.error('Błąd podczas dislikowania postu:', error);
            });
        }
    };
  




    useEffect(() => {

      const fetchImage = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/posts/get-post/image/${props.post.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'image/jpeg',
              'Authorization': process.env.REACT_APP_BASIC_AUTH
            }
          });
          if (!response.ok) {
            throw new Error('Wystąpił błąd podczas pobierania danych obrazka.');
          }
          const imageBlob = await response.blob();
          if ( imageBlob.size > 0) {
            setImage(URL.createObjectURL(imageBlob));
            setImageExist(true)
          }
        } catch (error) {
          console.error('Błąd podczas pobierania danych obrazka:', error);
        }
      };

      fetchImage()

    }, []);   

    return (

    <Card style={{  margin: '20px' }}>
      
      <Card.Body>
      <Link to={`/post/${props.post.id}`}>
        <Card.Title>{props.post.account.username}</Card.Title>
      </Link>
      
        <Card.Text>{props.post.text}</Card.Text>
        {imageExist ? <Card.Img variant="top" src={image} style={{ maxHeight: '300px', maxWidth: '500px', width: 'auto', height: 'auto' }} /> : ""}
        <Card.Text>{props.post.createDate}</Card.Text>
        <Card.Text>Polubienia: {likes}, Komentarze {props.post.comments}</Card.Text>
        {validToken() ? <Button variant="primary" onClick={handleLikeClick} >{isLiked ? "Dislike" : "Like"}</Button> : ""}
      </Card.Body>
    </Card>

    )

}
export default Post
