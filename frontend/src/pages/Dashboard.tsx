import React, { useState } from 'react';
import { Dumbbell, Users } from 'lucide-react';
import { BuddyCard } from '../components/dashboard/BuddyCard';
import { GroupCard } from '../components/dashboard/GroupCard';
import { FilterSection } from '../components/dashboard/FilterSection';
import type { Buddy, FitnessGroup } from '../types';

const buddies: Buddy[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    activities: ['Yoga', 'Running'],
    skillLevel: 'Intermediate',
    location: 'Downtown',
    distance: 2.5,
    availability: ['Morning', 'Evening']
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    activities: ['Weightlifting', 'CrossFit'],
    skillLevel: 'Advanced',
    location: 'Westside',
    distance: 3.8,
    availability: ['Afternoon', 'Weekend']
  }
];

const groups: FitnessGroup[] = [
  {
    id: '1',
    name: 'Morning Yoga Flow',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800',
    memberCount: 25,
    activity: 'Yoga',
    skillLevel: 'Beginner',
    location: 'Central Park',
    meetingTime: 'Mon, Wed, Fri - 7:00 AM'
  },
  {
    id: '2',
    name: 'Urban Runners Club',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800',
    memberCount: 42,
    activity: 'Running',
    skillLevel: 'Intermediate',
    location: 'Riverside Trail',
    meetingTime: 'Tue, Thu - 6:30 PM'
  }
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'buddies' | 'groups'>('buddies');
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{activeTab==='buddies'?'Buddy Finder':'Group Finder'}</h1>
          <div className="flex gap-4">
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'buddies'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('buddies')}
            >
              <Dumbbell className="w-5 h-5" />
              <span>Workout Buddies</span>
            </button>
            <button
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'groups'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              <Users className="w-5 h-5" />
              <span>Fitness Groups</span>
            </button>
          </div>
        </div>

        <FilterSection onFilterChange={handleFilterChange} />

        {activeTab === 'buddies' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buddies.map((buddy) => (
              <BuddyCard key={buddy.id} buddy={buddy} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;