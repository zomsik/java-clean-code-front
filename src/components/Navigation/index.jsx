import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { validToken, getName } from '../../utils/jwt'
const Navigation = () => {


    const [tokenValid, setTokenValid] = useState(false);
    const [nickname, setNickname] = useState("")

    useEffect(() => {
      setTokenValid(validToken());
    });

    useEffect(() => {
      if (tokenValid) {
        setNickname(getName())
      }
    }, [tokenValid]);

  const handleLogout = () => {
      localStorage.removeItem('jwtToken');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Col>
        <Navbar.Brand as={Link} to="/">Aplikacja Projektowa</Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Col sm={10}>
          <Nav className="ms-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Szukaj"
                className="w-100"
                
                aria-label="Search"
              />
              <Button variant="outline-success">Szukaj</Button>
            </Form>
          </Nav>
          </Col>
        <Col >
          <Nav>

            {tokenValid ?
              <Nav.Link as={Link} to="/profile">Profil</Nav.Link>
            : <Nav.Link as={Link} to="/login">Login</Nav.Link> }

            {tokenValid ?
              <Nav.Link as={Link} to="/" onClick={handleLogout}>Wyloguj</Nav.Link>
            : <Nav.Link as={Link} to="/registration">Rejestracja</Nav.Link>}
            
          </Nav>
        </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
