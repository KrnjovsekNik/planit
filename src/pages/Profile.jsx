import React, { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState("Martin Kobal");
  const [email] = useState("martin.kobal@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* karta z imenom in profilno sliko */}
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        {/* profilka */}
        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Uporabniško ime</p>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
            ) : (
              <p className="text-lg font-bold text-gray-800">{name}</p>
            )}
          </div>
        </div>

        {/* uporabniski mejl */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Uporabniški e-naslov</p>
          <p className="text-lg text-gray-800">{email}</p>
        </div>

        {/* geslo */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Geslo</p>
          {isEditing ? (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
          ) : (
            <p className="text-lg text-gray-800">******</p>
          )}
        </div>

        {/* gumb za spreminjanje in shranjevanje */}
        <button
          onClick={() => {
            if (isEditing) {
              // trenutno samo temporarno shrani na browser, ko bo dodana podatkovna baza se bo to shranilo
              alert("Podatki spremenjeni!");
            }
            setIsEditing(!isEditing);
          }}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
        >
          {isEditing ? "Shrani" : "Spremeni"}
        </button>
      </div>
    </div>
  );
}
