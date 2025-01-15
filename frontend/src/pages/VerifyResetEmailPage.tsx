// import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function VerifyResetEmailPage() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p>Click the link in the email to reset your password.</p>
            <p className="mt-2">
              Didn't receive the email?{' '}
              <button className="text-blue-600 hover:text-blue-800">
                Click to resend
              </button>
            </p>
          </div>

          {/* Demo purpose only - In production, remove this button */}
          <Button
            onClick={() => window.location.href = '/reset-password'}
            className="max-w-xs mx-auto"
          >
            Continue to Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
}