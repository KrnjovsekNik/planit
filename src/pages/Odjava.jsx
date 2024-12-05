import React from 'react';
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {


  return (
    <button
      className="h-[45px] w-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center border-l border-gray-300"
    ><CiLogout /></button>
  );
}