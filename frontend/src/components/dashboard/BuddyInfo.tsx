import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, Lock } from 'lucide-react';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';
import axios from 'axios';
const BuddyInfo = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState('');
    const [fitnessGoal, setFitnessGoal] = useState<string[]>([]);
    const [workoutPreference, setWorkoutPreference] = useState<string[]>([]);
    const [availability, setAvailability] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = [
    "Lose Weight",
    "Gain Muscle",
    "Increase Stamina",
    "Increase Strength",
    "Increase Flexibility",
    "Increase Endurance",
  ];

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev: string[]) =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiResponse = await axios.post(
                'http://localhost:8000/auth/signup',
                {
                    fitnessGoal: fitnessGoal,
                    workoutPreference: workoutPreference,
                    availability: availability,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // if (apiResponse.data === true) {
            //     navigate('/verify-email', { state: { email: formData.email } });
            // } else {
            //     setResponse(apiResponse.data);
            // }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse(error.response?.data?.message);
            } else {
                setResponse('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen outline outline-1 outline-gray-300 rounded-md">
            <div className="multi-select">
      <label className="text-xl font-bold">Select Your Fitness Goals:</label>
      <div className="options-list border p-3 rounded">
        {options.map((option, index) => (
          <label key={index} className="block mb-2">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
            
        </div>
        </div>
    );
}

export default BuddyInfo;