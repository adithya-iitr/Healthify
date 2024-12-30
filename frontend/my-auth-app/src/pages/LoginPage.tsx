import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginOptions } from '../components/auth/LoginOptions';
import { PasswordLogin } from '../components/auth/PasswordLogin';
import { OTPLogin } from '../components/auth/OTPLogin';

type LoginMethod = 'choose' | 'password' | 'otp';

export function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('choose');

  const handleMethodSelect = (method: 'password' | 'otp') => {
    setLoginMethod(method);
  };

  const handleBack = () => {
    setLoginMethod('choose');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {loginMethod === 'choose' && (
          <LoginOptions onSelect={handleMethodSelect} />
        )}
        
        {loginMethod === 'password' && (
          <PasswordLogin onBack={handleBack} />
        )}
        
        {loginMethod === 'otp' && (
          <OTPLogin onBack={handleBack} />
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}