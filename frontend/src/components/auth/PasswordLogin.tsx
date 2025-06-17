import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import axios from 'axios';
import { toast } from "react-hot-toast";

export function PasswordLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting...");
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email:formData.email,
        password:formData.password
      });
      // If successful
      console.log(response.data)
      if(response.status!=400){
        localStorage.setItem('accessToken', response.data.token)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        navigate('/')
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">

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