import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CiLogout } from "react-icons/ci";

export default function LogoutButton() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="h-[45px] w-10 bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center border-l border-gray-300"
    ><CiLogout /></button>
  );
}