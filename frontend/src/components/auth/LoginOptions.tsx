import React from 'react';
import { KeyRound, Smartphone } from 'lucide-react';
import { Button } from '../ui/Button';
// import { GoogleIcon } from 'lucide-react';
interface LoginOptionsProps {
  onSelect: (method: 'password' | 'otp' | 'google') => void;
}
import { useNavigate } from 'react-router-dom';
import OauthLogin from './OauthLogin';
export function LoginOptions({ onSelect }: LoginOptionsProps) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Button
        onClick={() => onSelect('password')}
        className="flex items-center justify-center space-x-2"
      >
        <KeyRound className="w-5 h-5" />
        <span>Continue with Password</span>
      </Button>

      <Button
        variant="secondary"
        onClick={() => onSelect('otp')}
        className="flex items-center justify-center space-x-2"
      >
        <Smartphone className="w-5 h-5" />
        <span>Continue with OTP</span>
      </Button>
      <Button
        variant='secondary'
        className="flex items-center justify-center space-x-2"
        onClick={() => onSelect('google')}
      >
        {/* <Google className="w-5 h-5" /> */}
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}