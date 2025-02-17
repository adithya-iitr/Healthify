import React from 'react';
import { MapPin, Activity, Clock } from 'lucide-react';
import type { Buddy } from '../../types';

interface BuddyCardProps {
  buddy: Buddy;
}

export function BuddyCard({ buddy }: BuddyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <img
          src={buddy.avatar}
          alt={buddy.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{buddy.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{buddy.distance}km away • {buddy.location}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="w-4 h-4" />
          <div className="flex flex-wrap gap-2">
            {buddy.activities.map((activity) => (
              <span
                key={activity}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <div className="flex flex-wrap gap-2">
            {buddy.availability.map((time) => (
              <span
                key={time}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Connect
        </button>
      </div>
    </div>
  );
}