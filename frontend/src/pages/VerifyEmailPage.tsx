// import React from 'react';
import { VerifyEmail } from '../components/auth/VerifyEmail';

export function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <VerifyEmail />
      </div>
    </div>
  );
}