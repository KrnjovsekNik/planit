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
import NovProjekt from './pages/NovProjektModal';
import MojaNaloga from './pages/MojaNaloga';
import MojProjekt from './pages/MojProjekt';
import UporabnikPrijavljen from './pages/UporabnikPrijavljen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Koledar from './pages/Koledar';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/*"
          element={
            <UporabnikPrijavljen>
              <div className="app-content">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-content">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/statistika" element={<Statistika />} />
                      <Route path="/moji-projekti" element={<MojiProjekti />} />
                      <Route path="/moje-naloge" element={<MojeNaloge />} />
                      <Route path="/prijatelji" element={<Prijatelji />} />
                      <Route path="/new-project" element={<NovProjekt />} />
                      <Route path="/moje-naloge/:id" element={<MojaNaloga />} />
                      <Route path="/moji-projekti/:id" element={<MojProjekt />} />
                      <Route path="/koledar" element={<Koledar />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </UporabnikPrijavljen>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
}

export default App;