import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
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
import NovProjekt from './pages/NovProjektModal';
import Koledar from './pages/Koledar';

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
            <Route path="/chat" element={<SignedIn><Chat /></SignedIn>} />
            <Route path="/profile" element={<SignedIn><Profile /></SignedIn>} />
            <Route path="/statistika" element={<SignedIn><Statistika /></SignedIn>} />
            <Route path="/moji-projekti" element={<SignedIn><MojiProjekti /></SignedIn>} />
            <Route path="/moje-naloge" element={<SignedIn><MojeNaloge /></SignedIn>} />
            <Route path="/prijatelji" element={<SignedIn><Prijatelji /></SignedIn>} />
            <Route path="/new-project" element={<SignedIn><NovProjekt /></SignedIn>} />
            <Route path="/koledar" element={<SignedIn><Koledar /></SignedIn>} />
            <Route path="*" element={<SignedOut><RedirectToSignIn /></SignedOut>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
