import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostDetail from './components/PostDetail';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes , Navigate  } from 'react-router-dom';


import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <Routes >
        <Route path="/post/" element={<Navigate to="/1" />} />
        <Route path="/" element={<Navigate to="/1" />} />
        <Route path="/login/" element={<Login/>} />
        <Route path="/registration/" element={<Registration/>} />
        <Route path="/profile/" element={<UserProfile/>} />
        <Route path="/:category/:site" element={<App/>} />
        <Route path="/:site" element={<App/>} />
        <Route path="/post/:postId" element={<PostDetail/>} />
      </Routes >
  </Router>
);
