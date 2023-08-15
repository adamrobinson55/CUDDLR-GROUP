import React from 'react';

export default function ProfilePage() {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h1 className="text-xl font-semibold mt-4">John Haywire</h1>
          <p className="text-gray-600 mt-2">User</p>
          <div className="mt-4">
            <p className="text-gray-700">About Me</p>
            <p className="text-gray-600">
              I love the minion movies
            </p>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Friend
            </button>
          </div>
        </div>
      </div>
    );
  };