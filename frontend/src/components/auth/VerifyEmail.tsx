import { useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';

export function VerifyEmail() {
  const location = useLocation();
  const email = location.state?.email;
  // if (!email) {
  //   return <Navigate to="/signup" replace />;
  // }
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <Mail className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

      <p className="text-gray-600 max-w-sm mx-auto">
        We've sent a verification link to <span className="font-medium">{email}</span>.
        Please check your inbox and click the link to verify your email address.
      </p>

      {/* Added verification button for demo purposes */}
      <div className="pt-4">
        <p className="text-sm text-gray-500">
          Didn't receive the email?
          <button className="ml-2 text-blue-600 hover:text-blue-800">
            Resend verification email
          </button>
        </p>
      </div>
    </div>
  );
}