import React from 'react';
import { useState } from 'react';
import { Home, Users, Search, Settings, LogOut, Dumbbell, MapPin, Clock } from 'lucide-react';
import { ManageGroupsPage } from './GroupInfo';
import { SearchBuddiesPage } from './GroupInfo';

interface UserProfile {
    groupInfo?: {
      activityType?: string;
      location?: string;
      schedule?: string;
    };
  }

function GroupDashboard({ profile }: { profile: UserProfile }) {
    const [activePage, setActivePage] = useState<'dashboard' | 'manage' | 'search'>('dashboard');
  
    return (
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="w-64 bg-purple-800 text-white p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Group Workouts</h2>
          </div>
          <nav className="space-y-4">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`w-full flex items-center space-x-3 text-white/90 hover:text-white ${
                activePage === 'dashboard' ? 'text-white' : ''
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActivePage('manage')}
              className={`w-full flex items-center space-x-3 text-white/90 hover:text-white ${
                activePage === 'manage' ? 'text-white' : ''
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Manage Groups</span>
            </button>
            <button
              onClick={() => setActivePage('search')}
              className={`w-full flex items-center space-x-3 text-white/90 hover:text-white ${
                activePage === 'search' ? 'text-white' : ''
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Find Buddies</span>
            </button>
            <a href="#" className="flex items-center space-x-3 text-white/90 hover:text-white">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white/90 hover:text-white mt-auto">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </a>
          </nav>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activePage === 'dashboard' && 'Group Workout Dashboard'}
                {activePage === 'manage' && 'Manage Your Groups'}
                {activePage === 'search' && 'Find Workout Buddies'}
              </h1>
            </div>
          </header>
  
          <main className="max-w-7xl mx-auto px-4 py-6">
            {activePage === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Group Info Card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Your Group Preferences
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Dumbbell className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium">Activity Type</p>
                        <p className="text-gray-600">{profile && profile.groupInfo?.activityType || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{profile && profile.groupInfo?.location || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium">Schedule</p>
                        <p className="text-gray-600">{profile && profile.groupInfo?.schedule || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Suggested Groups Card */}
                <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                  <h2 className="text-lg font-semibold mb-4">Suggested Groups</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:border-purple-400 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Morning Yoga Group</h3>
                          <p className="text-sm text-gray-600">Central Park - 7:00 AM</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:border-purple-400 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">HIIT Warriors</h3>
                          <p className="text-sm text-gray-600">City Gym - 6:00 PM</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activePage === 'manage' && <ManageGroupsPage />}
            {activePage === 'search' && <SearchBuddiesPage />}
          </main>
        </div>
      </div>
    );
  }

export default GroupDashboard;