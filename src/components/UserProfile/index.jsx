import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';

import axios from 'axios';
import createDateFromArray from '../../utils/DateUtil';

import { Form, Button, Col, Row } from 'react-bootstrap';

import { validToken, getName } from '../../utils/jwt'
import portrait from '../../images/portrait.png';
const UserProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [registerDate, setRegisterDate] = useState('');

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dodaj tutaj logikę zmiany hasła, np. wywołanie API
    console.log('Dane zmiany hasła:', currentPassword, newPassword, confirmNewPassword);
  };

 


  useEffect(() => {
    if(!validToken()) {
      window.location.href = '../';
    }


    axios.get(`http://localhost:8081/api/account/register-date-by-login?login=${getName()}`, {
      headers: {'Authorization': process.env.REACT_APP_BASIC_AUTH}
      })
      .then((response) => {
        setRegisterDate(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania daty rejestracji:', error);
      });
    });


  return (
    <div>
    <Navigation/>
    <Row>
    <Col style={{ maxWidth: '200px', margin: '50px' }}>
    <img src={portrait} alt="Logo" style={{ maxWidth: '500px', margin: '50px' }} />
    <p>
      Witaj {getName()}
    </p>
    <p>
      Jesteś w serwisie od {createDateFromArray(registerDate)}
    </p>
  </Col>
   <Col>
    <Form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
      <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
        <Form.Label>Obecne hasło</Form.Label>
        <Form.Control type="password" placeholder="Obecne hasło" value={currentPassword} onChange={handleCurrentPasswordChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNewPassword">
        <Form.Label>Nowe hasło</Form.Label>
        <Form.Control type="password" placeholder="Wprowadź nowe hasło" value={newPassword} onChange={handleNewPasswordChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmNewPassword">
        <Form.Label>Potwierdź nowe hasło</Form.Label>
        <Form.Control type="password" placeholder="Potwierdź nowe hasło" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Zmień hasło
      </Button>
    </Form>
    </Col>
    </Row>
    </div>
  );
};

export default UserProfile;