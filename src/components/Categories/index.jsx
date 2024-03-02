import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, {  useState } from 'react';
const categories = [
  { category: undefined, name: 'Wszystko', path: '/1' },
  { category: "ciekawostki", name: 'Ciekawostki', path: '/ciekawostki/1' },
  { category: "gospodarka", name: 'Gospodarka', path: '/gospodarka/1' },
  { category: "informacje", name: 'Informacje', path: '/informacje/1' },
  { category: "motoryzacja", name: 'Motoryzacja', path: '/motoryzacja/1' },
  { category: "ukraina", name: 'Ukraina', path: '/ukraina/1' },
  { category: "podroze", name: 'Podróże', path: '/podroze/1' },
  { category: "rozrywka", name: 'Rozrywka', path: '/rozrywka/1' },
  { category: "sport", name: 'Sport', path: '/sport/1' },
  { category: "technologia", name: 'Technologia', path: '/technologia/1' }
];


const Categories = () => {
  const navigate = useNavigate();

  const { category } = useParams();

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      {categories.map((cat, index) => (
        <Button key={index} style={{ width: "150px" }} onClick={() => handleCategoryClick(cat.path)} variant={category === cat.category ? 'success' : 'primary'}>
          {cat.name}
        </Button>
      ))}
    </div>
  );
};

export default Categories;