import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navigation from '../Navigation';


import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

const Registration = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');



  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
 



  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (login === '') {
      setLoginError('Nie wprowadzono loginu');
      return;
    }

    if (login.length < 4) {
      setLoginError('Login krótszy niż 4 znaki');
      return;
    }

    if (email === '') {
      setEmailError('Nie wprowadzono maila');
      return;
    }

    if (email.length < 4) {
      setEmailError('Mail krótszy niż 4 znaki');
      return;
    }

    if (password === '') {
      setPasswordError('Nie wprowadzono hasła');
      return;
    }

    if (password.length < 4) {
      setPasswordError('Hasło krótsze niż 4 znaki');
      return;
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('Nie wprowadzono ponownie hasła');
      return;
    }

    if (confirmPassword.length < 4) {
      setConfirmPasswordError('Ponowne hasło krótsze niż 4 znaki');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Hasła się różnią');
      setConfirmPasswordError('Hasła się różnią');
      return;
    }

    
    if (birthdate === undefined) {
      setBirthdateError('Nie wprowadzono daty urodzenia');
      return;
    }

    const registerData = {
      login: login,
      email: email,
      password: password,
      birthDate: birthdate
    };

    const response = await fetch(`http://localhost:8081/api/account/register`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
                    'Authorization': process.env.REACT_APP_BASIC_AUTH},
          body: JSON.stringify(registerData)
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
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
            value={login}
            onChange={handleLoginChange}
            isInvalid={!!loginError}
          />
          <Form.Control.Feedback type="invalid">
            {loginError}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!emailError}
          />
          <Form.Control.Feedback type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={!!passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            isInvalid={!!confirmPasswordError}
          />
          <Form.Control.Feedback type="invalid">
            {confirmPasswordError}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicBirthdate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthdate}
            onChange={handleBirthdateChange}
            isInvalid={!!birthdateError}
          />
          <Form.Control.Feedback type="invalid">
            {birthdateError}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Registration;