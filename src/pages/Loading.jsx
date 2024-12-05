import React from "react";
import { FaSpinner } from "react-icons/fa"; // Uvozi ikono FaSpinner

const Loading = () => {
  return (
    <div className="mt-3 flex justify-center items-center">
      <FaSpinner className=" text-4xl animate-spin" />
    </div>
  );
};

export default Loading;