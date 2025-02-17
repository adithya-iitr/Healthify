import React, { useState } from 'react';
import { Dumbbell, Users, Calendar, MapPin, Target, Clock, Home, UserCircle, Settings, LogOut, Search, Edit2, Check, X, Filter } from 'lucide-react';

// ... (keep all existing types and interfaces)

interface FitnessGroup {
  id: string;
  name: string;
  activityType: string;
  location: string;
  schedule: string;
  members: number;
  capacity: number;
  createdBy: string;
}

interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  groupId: string;
  groupName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}

interface UserProfile {
  groupInfo?: {
    activityType?: string;
    location?: string;
    schedule?: string;
  };
}

// ... (keep IndividualPortal component as is)

export function ManageGroupsPage() {
  const [activeTab, setActiveTab] = useState<'myGroups' | 'requests'>('myGroups');
  const [editingGroup, setEditingGroup] = useState<FitnessGroup | null>(null);

  // Example data - in a real app, this would come from your backend
  const myGroups: FitnessGroup[] = [
    {
      id: '1',
      name: 'Morning Yoga Warriors',
      activityType: 'Yoga',
      location: 'Central Park',
      schedule: 'Mon, Wed, Fri - 7:00 AM',
      members: 8,
      capacity: 12,
      createdBy: 'current-user',
    },
    {
      id: '2',
      name: 'HIIT Squad',
      activityType: 'HIIT',
      location: 'City Gym',
      schedule: 'Tue, Thu - 6:00 PM',
      members: 15,
      capacity: 20,
      createdBy: 'current-user',
    },
  ];

  const joinRequests: JoinRequest[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      groupId: '1',
      groupName: 'Morning Yoga Warriors',
      status: 'pending',
      requestDate: '2024-03-15',
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      groupId: '2',
      groupName: 'HIIT Squad',
      status: 'pending',
      requestDate: '2024-03-14',
    },
  ];

  const handleEditGroup = (group: FitnessGroup) => {
    setEditingGroup(group);
  };

  const handleSaveGroup = () => {
    // In a real app, save changes to backend
    setEditingGroup(null);
  };

  const handleRequestResponse = (requestId: string, approved: boolean) => {
    // In a real app, update request status in backend
    console.log(`Request ${requestId} ${approved ? 'approved' : 'rejected'}`);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('myGroups')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'myGroups'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Groups
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Join Requests
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'myGroups' ? (
        <div className="space-y-6">
          {myGroups.map(group => (
            <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
              {editingGroup?.id === group.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Name</label>
                    <input
                      type="text"
                      value={editingGroup.name}
                      onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule</label>
                    <input
                      type="text"
                      value={editingGroup.schedule}
                      onChange={(e) => setEditingGroup({ ...editingGroup, schedule: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={editingGroup.location}
                      onChange={(e) => setEditingGroup({ ...editingGroup, location: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingGroup(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveGroup}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {group.schedule}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {group.location}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {group.members} / {group.capacity} members
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {joinRequests.map(request => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{request.userName}</h3>
                  <p className="text-sm text-gray-500">wants to join {request.groupName}</p>
                  <p className="text-xs text-gray-400 mt-1">Requested on {request.requestDate}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestResponse(request.id, true)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRequestResponse(request.id, false)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SearchBuddiesPage() {
  const [filters, setFilters] = useState({
    location: '',
    availability: '',
    activityType: '',
  });

  // Example data - in a real app, this would come from your backend
  const buddies = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'Downtown',
      availability: 'Morning',
      activities: ['Yoga', 'Running'],
      distance: '0.5 miles',
    },
    {
      id: '2',
      name: 'Mike Chen',
      location: 'Westside',
      availability: 'Evening',
      activities: ['HIIT', 'Swimming'],
      distance: '1.2 miles',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-600" />
            Filters
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="Enter location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Any time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Type</label>
            <select
              value={filters.activityType}
              onChange={(e) => setFilters({ ...filters, activityType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Any activity</option>
              <option value="yoga">Yoga</option>
              <option value="running">Running</option>
              <option value="hiit">HIIT</option>
              <option value="swimming">Swimming</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {buddies.map(buddy => (
          <div key={buddy.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{buddy.name}</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {buddy.location} ({buddy.distance})
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Available: {buddy.availability}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {buddy.activities.map(activity => (
                      <span
                        key={activity}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ... (keep App component and all other existing code as is)

