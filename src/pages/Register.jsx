import React from 'react';
import { SignUp } from '@clerk/clerk-react'

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignUp
          path="/register"
          routing="path"
          signInUrl="/login"
          appearance={{
            elements: {
              card: 'shadow-lg rounded-md',
              formFieldInput: 'border border-gray-300 rounded-md focus:ring-indigo-500 focus:ring-2',
              button: 'bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition',
            },
          }}
        />

    </div>
  );
}
