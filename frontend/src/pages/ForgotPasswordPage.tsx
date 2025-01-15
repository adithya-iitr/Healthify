// import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <Link 
          to="/login"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}