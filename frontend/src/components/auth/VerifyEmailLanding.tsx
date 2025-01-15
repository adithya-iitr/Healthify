import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import axios from 'axios';

export function VerifyEmail() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  // const { token } = useParams();
  // const authToken=token?.split('=')[1];
  const [message, setMessage]=useState('');

  const handleVerification = async () => {
    setIsVerifying(true);
    setMessage('')
    // Simulate verification process
    try {
      const response = await axios.post('http://localhost:8000/auth/verify_token', {
        token: 'abs'
      })
      const accessToken=response.data.accessToken;
      const refreshToken=response.data.refreshToken;
      localStorage.setItem('accessToken',accessToken)
      localStorage.setItem('refreshToken',refreshToken)
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
    catch(e){
      setMessage('Invalid or expired token')
      setIsVerifying(false)
    }
  };

  return (
    <div className="text-center space-y-6">
      {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <Mail className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

      {/* Added verification button for demo purposes */}
      
      <div className="pt-4">
        <Button
          onClick={handleVerification}
          disabled={isVerifying}
          className="max-w-xs mx-auto"
        >
          {isVerifying ? 'Verifying...' : 'Verify Email'}
        </Button>
      </div>
    </div>
  );
}