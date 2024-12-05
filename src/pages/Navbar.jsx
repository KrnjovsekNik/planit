import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import Odjava from './Odjava';

const Navbar = () => {

  const ime = 'martin'

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
            <FaRegUser />
          </Link>
          <Odjava/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
