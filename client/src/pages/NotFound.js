import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
  let location = useLocation();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600">
          No match for <code>{location.pathname}</code>
        </p>
      </div>
    </div>
  );
}

export default NotFound;