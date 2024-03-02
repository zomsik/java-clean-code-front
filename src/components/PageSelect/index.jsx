import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const PageSelect = () => {
  const [totalPosts, setTotalPosts] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { site } = useParams();
  const { category } = useParams();

  const navigate = useNavigate();

  

  // Ta funkcja symuluje pobieranie liczby postów z serwera
  const fetchTotalPosts = () => {
    var link = `http://localhost:8081/api/posts/count-posts`;
    if (category !== undefined) {
      link += `?category=${category}`;
    }
    console.log("TEST")
    axios.get(link, {
      headers: {'Authorization': process.env.REACT_APP_BASIC_AUTH}
      })
      .then((response) => {
        console.log("ODP")
        console.log(response)
        setTotalPosts(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania ilości postów:', error);
    });
  };

  useEffect(() => {


    fetchTotalPosts();
  }, [site, category]);

  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      navigate(`/${pageNumber}`);
    };

  const totalPages = Math.ceil(totalPosts / 10);
  const visiblePages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(
        <Button key={i} onClick={() => handlePageChange(i)} variant={currentPage === i ? 'primary' : 'light'}>
          {i}
        </Button>
      );
    }
  } else {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = maxVisiblePages;
    } else if (currentPage > totalPages - 2) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(
        <Button key={i} onClick={() => handlePageChange(i)} variant={currentPage === i ? 'primary' : 'light'}>
          {i}
        </Button>
      );
    }

    if (currentPage >= 4) {
      visiblePages.unshift(<Button key="startDots" disabled>...</Button>);
    }
    if (currentPage <= totalPages - 3) {
      visiblePages.push(<Button key="endDots" disabled>...</Button>);
    }
  }

  return (
    <div>
      <ButtonGroup aria-label="Strony">{visiblePages}</ButtonGroup>
    </div>
  );
};

export default PageSelect;