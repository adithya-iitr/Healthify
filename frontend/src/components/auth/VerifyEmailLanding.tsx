import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

export function VerificationFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Verification Failed</h2>
        <p className="text-gray-600 mb-6">
          The verification link is invalid or has expired. Please try signing up again or request a new verification email.
        </p>
        <Button onClick={() => navigate('/signup')} className="w-full mb-2">
          Go Back to Signup
        </Button>
        <Button variant="secondary" onClick={() => navigate('/login')} className="w-full">
          Already Verified? Login
        </Button>
      </div>
    </div>
  );
}
