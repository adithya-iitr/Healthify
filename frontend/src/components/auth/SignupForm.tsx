import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, Lock } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            toast.error("Invalid password", {
                position: "top-center",
                duration: 3000,
            });
            return;
        }

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

            if (apiResponse.data.valid === true) {
                localStorage.setItem('user',JSON.stringify(apiResponse.data.user))
                navigate('/verify-email', { state: { email: formData.email } });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data || "Signup failed. Please try again.";
                toast.error(message, {
                    position: "top-center",
                    duration: 3000,
                });
            } else {
                toast.error("An unexpected error occurred.", {
                    position: "top-center",
                    duration: 3000,
                });
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
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
                <div className="text-xs text-gray-500 ml-1 -mt-4 mb-4">
                    Password must be at least 8 characters, include an uppercase letter, a number, and a special character.
                </div>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}
