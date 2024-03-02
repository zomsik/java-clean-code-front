import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment';
import Post from '../Post';
import Navigation from '../Navigation';
import { validToken } from '../../utils/jwt';
import NewCommentForm from '../NewCommentForm';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    setTokenValid(validToken());
  });

  useEffect(() => {
    let headers = {'Authorization': process.env.REACT_APP_BASIC_AUTH};
    if (validToken()) {
      const jwtToken = localStorage.getItem('jwtToken');
      headers = {
        ...headers,
        'jwt': jwtToken
      }
    } 

    axios.get(`http://localhost:8081/api/posts/get-post/${postId}`, {
      headers: headers
      })
      .then((response) => {
        console.log(response)
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania danych posta:', error);
      });

    axios.get(`http://localhost:8081/api/comments/post/get-comments/${postId}`, {
      headers: headers
      })
      .then((response) => {
        console.log("ODP")
        console.log(response)
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania danych komentarzy:', error);
      });
  }, [postId]);

  if (!post.id) {
    return <div>Pobieranie danych...</div>;
  }

  return (
    <div>
      <Navigation/>
      <h1>Szczegóły Posta</h1>
      <Post key={post.id} post={post}/>
      <h3>Komentarze:</h3>
      {tokenValid ? <NewCommentForm/> : ""}
      {comments.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      
    </div>
  );

  /*
    {comments.map((comment) => (
          <Comment comment={comment}/>
        ))}
  */

};

export default PostDetail;