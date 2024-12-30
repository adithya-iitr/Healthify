// import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { WelcomeBar } from '../components/home/WelcomeBar';
import { DashboardStats } from '../components/home/DashboardStats';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeBar userName="John" />
        <DashboardStats />
      </main>
    </div>
  );
}