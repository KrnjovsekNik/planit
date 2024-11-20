import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
import './App.css'; 
import Statistika from './pages/Statistika';
import MojiProjekti from './pages/MojiProjekti';
import Prijatelji from './pages/Prijatelji';
import MojeNaloge from './pages/MojeNaloge';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistika" element={<Statistika />} />
            <Route path="/moji-projekti" element={<MojiProjekti />} />
            <Route path="/moje-naloge" element={<MojeNaloge />} />
            <Route path="/prijatelji" element={<Prijatelji />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
