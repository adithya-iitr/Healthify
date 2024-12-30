import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, Lock } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import axios from 'axios';

export function SignupForm() {
    const navigate = useNavigate();
    const [response, setResponse] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiResponse = await axios.post(
                'http://localhost:8000/auth/signup',
                {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (apiResponse.data === true) {
                navigate('/verify-email', { state: { email: formData.email } });
            } else {
                setResponse(apiResponse.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse(error.response?.data?.message);
            } else {
                setResponse('An unexpected error occurred');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResponse(''); // Clear any error
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            {response && <p className="text-red-500 text-sm mt-2">{response}</p>}
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                <InputField
                    icon={<User className="w-5 h-5 text-gray-500" />}
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                    icon={<Phone className="w-5 h-5 text-gray-500" />}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
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
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}
