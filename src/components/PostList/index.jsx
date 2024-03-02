import Post from "../Post";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import { validToken } from '../../utils/jwt';

import "swiper/css";
import "swiper/css/navigation";


const PostList = () => {

    
    const { site } = useParams();
    const { category } = useParams();

    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const postsPerPage = 10;


    const fetchPosts = () => {

      let headers = {'Authorization': process.env.REACT_APP_BASIC_AUTH};
      if (validToken()) {
        const jwtToken = localStorage.getItem('jwtToken');
        headers = {
          ...headers,
          'jwt': jwtToken
        }
      } 

      var getPostsAdress = `http://localhost:8081/api/posts/get-posts?page=${site}&postsPerPage=${postsPerPage}`;
      if (category !== undefined && category.length !== 0) {
        getPostsAdress = `http://localhost:8081/api/posts/get-posts?category=${category}&page=${site}&postsPerPage=${postsPerPage}`;
      } 

      axios.get(getPostsAdress, {
          headers: headers
      })
      .then((response) => {
       setPosts(response.data);
      })
      .catch((error) => {
       console.error('Błąd podczas pobierania danych:', error);
      });
  };

    useEffect(() => {


        fetchPosts();
    }, [site, category]);


    return (
    <div>
      <h1>Lista Postów</h1>
      {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
        
    </div>
  );

}
export default PostList
