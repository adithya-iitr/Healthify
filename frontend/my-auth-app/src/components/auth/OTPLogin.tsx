import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import axios from 'axios'
interface OTPLoginProps {
    onBack: () => void;
}

export function OTPLogin({ onBack }: OTPLoginProps) {
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError]=useState('');

    const handlePhoneNumberSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send OTP to email here
        const response = await axios.post('http://localhost:8000/auth/login/otp', {
            phoneNumber: '+91'+PhoneNumber
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        console.log(response);
        setStep('otp');
    };

    const handleOTPSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, verify OTP here
        try {
            const response = await axios.post('http://localhost:8000/auth/login/verifyOTP', {
                phoneNumber: '+91'+PhoneNumber,
                code: otp
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            if(response.data===true)
            navigate('/home');
            else
            throw new Error(response.data.message)
        }
        catch (err:any) {
            setError(err.response?.data?.message || 'OTP verification failed')
        }
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

            {step === 'email' ? (
                <form onSubmit={handlePhoneNumberSubmit} className="space-y-4">
                    <InputField
                        icon={<Mail className="w-5 h-5 text-gray-500" />}
                        type="tel"
                        placeholder="Phone Number"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <Button type="submit">Send OTP</Button>
                </form>
            ) : (
                <form onSubmit={handleOTPSubmit} className="space-y-4">
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600">
                            We've sent a code to {PhoneNumber}
                        </p>
                    </div>
                    <InputField
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="text-center text-xl tracking-wider"
                        maxLength={6}
                        required
                    />
                    <Button type="submit">Verify OTP</Button>
                    <div className="text-center">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Resend OTP
                        </button>
                    </div>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}