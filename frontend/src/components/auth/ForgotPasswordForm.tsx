import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      navigate('/verify-reset-email', { state: { email } });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <InputField
          id="email"
          icon={<Mail className="w-5 h-5 text-gray-500" />}
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
      </Button>
    </form>
  );
}