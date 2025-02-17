import { useState } from 'react';
import React from 'react';
interface UserProfile {
    id: string;
    name: string;
    email: string;
    fitnessGoals: string[];
    workoutPreferences: string[];
    availability: string[];
}

function ProfileSetup() {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<UserProfile>({
      id: crypto.randomUUID(),
      name: '',
      email: '',
      fitnessGoals: [],
      workoutPreferences: [],
      availability: [],
    });
  
    const fitnessGoalsOptions = [
      'Weight Loss',
      'Muscle Gain',
      'Improve Endurance',
      'Increase Flexibility',
      'General Fitness',
      'Stress Relief'
    ];
  
    const workoutPreferencesOptions = [
      'Gym Workouts',
      'Yoga',
      'Running',
      'Swimming',
      'HIIT',
      'Cycling',
      'Pilates'
    ];
  
    const availabilityOptions = [
      'Early Morning',
      'Morning',
      'Afternoon',
      'Evening',
      'Late Night',
      'Weekends Only'
    ];
  
    const handleGoalToggle = (goal: string) => {
      setProfile(prev => ({
        ...prev,
        fitnessGoals: prev.fitnessGoals.includes(goal)
          ? prev.fitnessGoals.filter(g => g !== goal)
          : [...prev.fitnessGoals, goal]
      }));
    };
  
    const handlePreferenceToggle = (pref: string) => {
      setProfile(prev => ({
        ...prev,
        workoutPreferences: prev.workoutPreferences.includes(pref)
          ? prev.workoutPreferences.filter(p => p !== pref)
          : [...prev.workoutPreferences, pref]
      }));
    };
  
    const handleAvailabilityToggle = (time: string) => {
      setProfile(prev => ({
        ...prev,
        availability: prev.availability.includes(time)
          ? prev.availability.filter(t => t !== time)
          : [...prev.availability, time]
      }));
    };
  
    // const handleGroupInfoSubmit = (groupInfo: UserProfile['groupInfo']) => {
    //   setProfile(prev => ({
    //     ...prev,
    //     groupInfo
    //   }));
    //   setStep(5); 
    // };
  
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Your Fitness Profile</h2>
            <p className="mt-2 text-sm text-gray-600">
              Step {step} of {4}
            </p>
          </div>
  
          {step === 1 && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
                />
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!profile.name}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
  
          {step === 2 && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Select Your Fitness Goals</h3>
              <div className="grid grid-cols-2 gap-4">
                {fitnessGoalsOptions.map(goal => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      profile.fitnessGoals.includes(goal)
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                        : 'bg-gray-50 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(3)}
                disabled={profile.fitnessGoals.length === 0}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
  
          {step === 3 && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Workout Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                {workoutPreferencesOptions.map(pref => (
                  <button
                    key={pref}
                    onClick={() => handlePreferenceToggle(pref)}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      profile.workoutPreferences.includes(pref)
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                        : 'bg-gray-50 text-gray-700 border-2 border-transparent'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(4)}
                disabled={profile.workoutPreferences.length === 0}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
  
          {step === 4 && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Availability</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {availabilityOptions.map(time => (
                    <button
                      key={time}
                      onClick={() => handleAvailabilityToggle(time)}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        profile.availability.includes(time)
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button
                 onClick={() => {
                    // Handle profile completion
                    console.log('Profile completed:', profile);
                  }}
                disabled={profile.availability.length === 0}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700 disabled:opacity-50 mt-5"
              >
                Complete Profile
              </button>
              </div>
              {/* <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Would you like to join group activities?</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setProfile(prev => ({ ...prev, isGroupActivity: true }));
                      setStep(5);
                    }}
                    className="flex-1 bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700"
                  >
                    Yes, I'm Interested
                  </button>
                  <button
                    onClick={() => {
                      setProfile(prev => ({ ...prev, isGroupActivity: false }));
                      // Proceed to final step or completion
                      console.log('Profile completed:', profile);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-300"
                  >
                    No, Thanks
                  </button>
                </div>
              </div> */}
            </div>
          )}
  
          {/* {step === 5 && profile.isGroupActivity && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Group Activity Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Activity Type
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      groupInfo: {
                        ...prev.groupInfo,
                        activityType: e.target.value
                      }
                    }))}
                  >
                    <option value="">Select activity type</option>
                    {workoutPreferencesOptions.map(pref => (
                      <option key={pref} value={pref}>{pref}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      groupInfo: {
                        ...prev.groupInfo,
                        location: e.target.value
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Weekday mornings"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      groupInfo: {
                        ...prev.groupInfo,
                        schedule: e.target.value
                      }
                    }))}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  // Handle profile completion
                  console.log('Profile completed:', profile);
                }}
                className="w-full bg-purple-600 text-white rounded-lg py-2 px-4 hover:bg-purple-700"
              >
                Complete Profile
              </button>
            </div>
          )} */}
        </div>
      </div>
    );
  }

  export default ProfileSetup;