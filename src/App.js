import { AppProvider } from '@shopify/polaris';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <AppProvider>
      <div className='App'>
        <Router>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/profile'>Profile</Link>
          </nav>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile/:username' element={<Profile />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
