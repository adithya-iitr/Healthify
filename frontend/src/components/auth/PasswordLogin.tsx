import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';

interface PasswordLoginProps {
  onBack: () => void;
}

export function PasswordLogin({ onBack }: PasswordLoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle authentication here
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to options
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          icon={<Mail className="w-5 h-5 text-gray-500" />}
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <InputField
          icon={<Lock className="w-5 h-5 text-gray-500" />}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}