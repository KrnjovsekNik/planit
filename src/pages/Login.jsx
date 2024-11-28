import React, { useEffect } from 'react';
import { SignIn, useAuth, useUser } from '@clerk/clerk-react';

export default function Login() {
  const { isLoaded, user } = useUser(); // Access user object once loaded

  useEffect(() => {
    if (isLoaded && user) {
      const username = user.username || user.firstName || user.emailAddress; // Adjust based on available fields
      
      // Store in session storage
      sessionStorage.setItem('username', username);

      // Store in cookies
      document.cookie = `username=${username}; path=/; max-age=3600; SameSite=Strict`;
    }
  }, [isLoaded, user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/register"
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
