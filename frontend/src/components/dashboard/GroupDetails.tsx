import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface UserProfile {
    id: string;
    name: string;
    email: string;
    isGroupActivity: boolean;
    groupInfo: {
        activityType: string;
        location: string;
        schedule: string;
        availability: string[];
    };
}

const GroupDetails = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile>({
        id: crypto.randomUUID(),
        name: '',
        email: '',
        isGroupActivity: true,
        groupInfo: {
            activityType: '',
            location: '',
            schedule: '',
            availability: []
        }
    });
    const workoutPreferencesOptions = [
        'Gym Workouts',
        'Yoga',
        'Running',
        'Swimming',
        'HIIT',
        'Cycling',
        'Pilates'
    ];
    return (
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6 h-screen">
            <h3 className="text-xl font-bold text-gray-900">Group Activity Preferences</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Preferred Activity Type
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                        onChange={(e) => setProfile({
                            ...profile,
                            groupInfo: {
                                ...profile.groupInfo,
                                activityType: e.target.value
                            }
                        })}
                        value={profile.groupInfo.activityType}
                     
                    >
                        <option value="">Select activity type</option>
                        {workoutPreferencesOptions.map(pref => (
                            <option key={pref} value={pref}>{pref}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Preferred Location
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                        onChange={(e) => setProfile({
                            ...profile,
                            groupInfo: {
                                ...profile.groupInfo,
                                location: e.target.value
                            }
                        })}
                        value={profile.groupInfo.location}
                     
                    />
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Preferred Schedule
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Weekday mornings"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                        onChange={(e) => setProfile({
                            ...profile,
                            groupInfo: {
                                ...profile.groupInfo,
                                schedule: e.target.value
                            }
                        })}
                        value={profile.groupInfo.schedule}
                        
                    />
                </div>
            </div>
            <button
                onClick={() => {
                    console.log('Profile completed:', profile);
                    navigate('/group_dashboard');
                }}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700"
                disabled={!profile.groupInfo.activityType || !profile.groupInfo.location || !profile.groupInfo.schedule}
            >
                Complete Profile
            </button>
        </div>
    )
}

export default GroupDetails;