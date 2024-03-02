import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navigation from '../Navigation';

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setLoginError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var ok = true;
    
    if (login === '') {
      setLoginError('Nie wprowadzono loginu');
      ok = false;
    }

    if (login.length < 4) {
      setLoginError('Login krótszy niż 4 znaki');
      ok = false;
    }

    if (password === '') {
      setPasswordError('Nie wprowadzono hasła');
      ok = false;
    }

    if (password.length < 4) {
      setPasswordError('Hasło krótsze niż 4 znaki');
      ok = false;
    }

    if (ok) {

      const loginData = {
        login: login,
        password: password
      };

      const response = await fetch(`http://localhost:8081/api/account/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': process.env.REACT_APP_BASIC_AUTH},
            body: JSON.stringify(loginData)
          })
          .then(async res => {
            if(!res.ok) {
              const text = await res.text();
              throw new Error(text); 
             }
            else {
             return res.json();
           }    
          })
          .then(function(data) {
            console.log("DATA")
            console.log(data)
            if (data.success === true) {
              
              localStorage.setItem("jwtToken", data.token);
              window.location.href = '../';
            } else {
              if (data.message != null) {
                notificate(data.message)
              }
            }
            
          })
          .catch(err => {
             let errorString = String(err)

             const startIndex = errorString.indexOf('{'); // znajdź indeks początku obiektu JSON
             const cleanErrorText = errorString.substring(startIndex);
             const errorObject = JSON.parse(cleanErrorText);
             notificate(errorObject.message)
          });

          console.log("RESPONSE")
          console.log(response)
          

    }
  };

  function notificate(message) {
    Store.addNotification({
      title: "Błąd!",
      message: message,
      type: "danger",
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

  return (
    <div>
      <ReactNotifications />
      <Navigation />
      <Form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="login"
            placeholder="Wprowadź login"
            value={login}
            onChange={handleLoginChange}
            isInvalid={!!loginError}
          />
          <Form.Control.Feedback type="invalid">
            {loginError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            placeholder="Wprowadź hasło"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Zaloguj
        </Button>
      </Form>
    </div>
  );
};

export default Login;