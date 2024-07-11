import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home'
import Login from './page/Login';
import Register from './page/Register';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer autoClose={2500} hideProgressBar={true} theme='colored' />
      </Router>
  )
}

export default App