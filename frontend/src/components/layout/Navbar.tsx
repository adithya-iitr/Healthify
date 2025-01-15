import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}