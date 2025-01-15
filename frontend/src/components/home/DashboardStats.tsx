// import React from 'react';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '2,847', icon: Users, color: 'blue' },
  { label: 'Active Projects', value: '12', icon: BarChart3, color: 'green' },
  { label: 'Upcoming Events', value: '6', icon: Calendar, color: 'purple' },
  { label: 'Growth Rate', value: '+24%', icon: TrendingUp, color: 'orange' },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}