import './App.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PostList from './components/PostList';
import Categories from './components/Categories';

import Navigation from './components/Navigation';

import PageSelect from './components/PageSelect';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPostForm from './components/NewPostForm';

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import {validToken } from './utils/jwt';

const App = () => {

  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("home");

  const [language, setLanguage] = useState(localStorage.getItem("WiejakProjektLng") || "en");


  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    setTokenValid(validToken());
  });

//<!--<Navbar language={language} setLanguage={setLanguage} activeSection={activeSection} setActiveSection={setActiveSection} />
  return (
    <div>
      <ReactNotifications />
      <Navigation/>
    <Container>
     <Row>
        <Col sm><Categories/></Col>
        <Col sm={8}>{tokenValid ? <NewPostForm/> : ""}<PostList/><PageSelect/></Col>
        <Col sm></Col>
      </Row>
  </Container>
        
  </div>
  );
}

export default App;
