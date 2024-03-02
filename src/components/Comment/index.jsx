import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import createDateFromArray from '../../utils/DateUtil';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


import {validToken } from '../../utils/jwt';

const Comment = (props) => {

  console.log("KOMENTARZ")
  console.log(props)
  const [isLiked, setIsLiked] = useState(props.comment.liked);
  const [likes, setLikes] = useState(props.comment.likes);

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
      fetch(`http://localhost:8081/api/comments/like/${props.comment.id}`, {
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
          console.error('Błąd podczas likowania komentarza:', error);
        });
    } else {
        // Wysyłanie informacji o dislajku na serwer
        fetch(`http://localhost:8081/api/comments/dislike/${props.comment.id}`, {
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
            console.error('Błąd podczas dislikowania komentarza:', error);
          });
      }
  };

  
  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title>{props.comment.account.username}</Card.Title>
        <Card.Text>{props.comment.text}</Card.Text>
        <Card.Text>{createDateFromArray(props.comment.createDate)}</Card.Text>
        <Card.Text>Polubienia: {likes}</Card.Text>
        {validToken() ? <Button variant="primary" onClick={handleLikeClick} >{isLiked ? "Dislike" : "Like"}</Button> : ""}
       
      </Card.Body>
    </Card>

  );
};

export default Comment;