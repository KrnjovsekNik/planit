import React from 'react';
import { FaTimes } from 'react-icons/fa'; 

const DodajUserjeModal = ({
  isOpen,
  onClose,
  prijatelji = [],
  izbraniPrijatelji = [],
  izberiPrijatelja,
  odstraniPrijatelja,
  dodaj_k_projektu,
}) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Dodaj Uporabnike
        </h2>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2 min-h-[45px] border border-gray-400 rounded-lg w-full p-2">
            {izbraniPrijatelji.map((prijatelj, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded px-3 ml-[2px] py-1 my-1"
              >
                <span>{prijatelj}</span>
                <FaTimes
                  onClick={() => odstraniPrijatelja(prijatelj)}
                  className="cursor-pointer text-gray-800 hover:text-red-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full gap-3 mt-[10px] flex-wrap">
          {prijatelji.map((prijatelj, index) => (
            <div
              onClick={() => izberiPrijatelja(prijatelj)}
              key={index}
              className="h-[30px] border hover:bg-gray-400 border-gray-400 bg-gray-200 text-black rounded px-2 cursor-pointer"
            >
              {prijatelj}
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Prekliči
          </button>
          <button
          onClick={() => {dodaj_k_projektu(); onClose()}}
            type="submit"
            className="px-4 py-2 bg-gray-500 text-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DodajUserjeModal;
