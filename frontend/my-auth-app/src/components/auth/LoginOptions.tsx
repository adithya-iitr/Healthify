// import React from 'react';
import { KeyRound, Smartphone } from 'lucide-react';
import { Button } from '../ui/Button';

interface LoginOptionsProps {
  onSelect: (method: 'password' | 'otp') => void;
}

export function LoginOptions({ onSelect }: LoginOptionsProps) {
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
    </div>
  );
}