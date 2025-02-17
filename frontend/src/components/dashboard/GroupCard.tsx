import React from 'react';
import { Users, MapPin } from 'lucide-react';
import type { FitnessGroup } from '../../types';

interface GroupCardProps {
  group: FitnessGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={group.image}
        alt={group.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold">{group.name}</h3>
        
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{group.memberCount} members</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{group.location}</span>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {group.activity}
          </span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
            {group.skillLevel}
          </span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">{group.meetingTime}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
}