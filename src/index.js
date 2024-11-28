import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const clerkFrontendApi = 'pk_test_cGxlYXNlZC1sb25naG9ybi0zLmNsZXJrLmFjY291bnRzLmRldiQ'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ClerkProvider>
);
