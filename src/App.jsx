import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home'
import Auth from './page/Auth';
import SignInPage from './page/SignIn';

const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path= "/sign-in/*" element={<SignInPage />} />
        </Routes>
        <ToastContainer autoClose={2500} hideProgressBar={true} theme='colored' />
      </Router>
  )
}

export default App