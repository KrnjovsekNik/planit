import React from 'react';

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      {/* registracija */}
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Registracija</h2>
        <form>
          {/* vnos za ime */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ime
            </label>
            <input
              type="text"
              id="name"
              placeholder="Vnesite ime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* vnos za mejl */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Vnesite email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* vnos za geslo */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Geslo
            </label>
            <input
              type="password"
              id="password"
              placeholder="Vnesite geslo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* potrditev za geslo */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Potrdi geslo
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Ponovno vnesite geslo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* gumb za registracijo */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
          >
            Registracija
          </button>
        </form>

        {/* link do prijave */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Že imate račun?{' '}
            <a
              href="/login"
              className="text-indigo-500 hover:underline"
            >
              Prijavite se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
