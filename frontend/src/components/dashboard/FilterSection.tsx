import React from 'react';
import { Search, Sliders } from 'lucide-react';

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
}

export function FilterSection({ onFilterChange }: FilterSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by activity or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Sliders className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ activity: e.target.value })}
        >
          <option value="">Activity Type</option>
          <option value="yoga">Yoga</option>
          <option value="running">Running</option>
          <option value="weightlifting">Weightlifting</option>
          <option value="cycling">Cycling</option>
        </select>
        
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ skillLevel: e.target.value })}
        >
          <option value="">Skill Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ distance: e.target.value })}
        >
          <option value="">Distance</option>
          <option value="1">Within 1km</option>
          <option value="5">Within 5km</option>
          <option value="10">Within 10km</option>
          <option value="20">Within 20km</option>
        </select>
        
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ availability: e.target.value })}
        >
          <option value="">Availability</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="weekend">Weekend</option>
        </select>
      </div>
    </div>
  );
}