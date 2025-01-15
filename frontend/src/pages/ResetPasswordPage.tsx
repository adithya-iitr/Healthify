// import React from 'react';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';

export function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Password</h1>
          <p className="mt-2 text-gray-600">
            Your new password must be different from previously used passwords
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}