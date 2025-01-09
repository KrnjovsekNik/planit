import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { Odjava } from './Odjava';

const Navbar = () => {
  const [ime, setIme] = useState(sessionStorage.getItem('username'));
  const [profileImage, setProfileImage] = useState(sessionStorage.getItem('profile_image'));
  const logoutHandler = Odjava();

  // Update state when sessionStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIme(sessionStorage.getItem('username'));
      setProfileImage(sessionStorage.getItem('profile_image'));
    };

    // Listen for changes to sessionStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gray-100 text-white border-r border-gray-300">
      <div className="h-[45px] flex items-center justify-between pr-0 px-4 border-b border-gray-200">
        {/* Logo */}
        <div className="font-bold text-lg text-gray-800">
          Planit
        </div>

        <div className="flex items-center space-x-0">
          <Link
            to="./profile"
            className="h-[45px] bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center border-l border-gray-300 px-4"
          >
            <div className="mr-2 font-medium text-sm">
              {ime}
            </div>
            <img
              src={profileImage || 'default-profile-image-url.jpg'} // Fallback to default if no profile image
              alt="Profile"
              className="w-9 h-9 rounded-full shadow-md cursor-pointer"
            />
          </Link>
          <button
            onClick={logoutHandler}
            className="h-[45px] w-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center border-l border-gray-300"
          >
            <CiLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
