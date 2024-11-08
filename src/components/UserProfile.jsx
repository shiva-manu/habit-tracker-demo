import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import './UserProfile.css';

const UserProfile = ({ onComplete }) => {
  const [profile, setProfile] = useState({
    username: '',
    trackingFrequency: 'daily',
    preferredTime: '',
    notifications: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile.username.trim()) {
      setSaveError('Please enter your name.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSetupComplete(true);
    } catch (error) {
      setSaveError('An error occurred while saving your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isSetupComplete) {
    return (
      <div className="success-screen">
        <div style={{ width: '35%' }} className="bg-gray-800 text-white rounded-lg mx-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-teal-100 mb-6">
              Welcome, {profile.username}!
            </h2>
            <div className="space-y-4 relative">
              <div className="flex justify-center items-center h-16">
                <CheckCircle className="w-16 h-16 text-teal-400" />
              </div>
              <p className="text-center text-gray-200">
                Your profile has been saved successfully.
              </p>
              <Button 
                onClick={onComplete}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-center text-sm text-gray-300">
                Tip: Your dashboard is now ready to help you track your habits!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#006D5B] text-white p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
          <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
          <div className="w-1/3 h-2 bg-[#5EEAD4] rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Onboarding</span>
          <span className="text-gray-400">Habit Selection</span>
          <span className="font-bold text-[#5EEAD4]">Profile Setup</span>
        </div>
      </div>

      <h1>Set Up Your Profile</h1>
      
      <div className="profile-card">
        <div className="profile-content">
          <div className="input-group">
            <label htmlFor="username">What's your name?</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name..."
              value={profile.username}
              onChange={(e) => handleProfileChange('username', e.target.value)}
            />
            <p className="input-help">
              We'll use this to personalize your dashboard with a greeting.
            </p>
          </div>

          <div className="preferences-card">
            <h3>Tracking Preferences</h3>
            <div className="preferences-content">
              <div className="frequency-group">
                <label>Track habits</label>
                <div className="frequency-buttons">
                  {['daily', 'weekly'].map((freq) => (
                    <button
                      key={freq}
                      className={`frequency-button ${
                        profile.trackingFrequency === freq ? 'active' : ''
                      }`}
                      onClick={() => handleProfileChange('trackingFrequency', freq)}
                    >
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="time-group">
                <label htmlFor="preferred-time">Preferred time of day</label>
                <select
                  id="preferred-time"
                  value={profile.preferredTime}
                  onChange={(e) => handleProfileChange('preferredTime', e.target.value)}
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div className="notifications-group">
                <label>
                  <input
                    type="checkbox"
                    checked={profile.notifications}
                    onChange={(e) => handleProfileChange('notifications', e.target.checked)}
                  />
                  Enable notifications
                </label>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSaveProfile}
            className="save-button"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="spinner" />
                Saving Profile...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>

          <AnimatePresence>
            {saveError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="error-message"
              >
                <AlertCircle />
                <span>{saveError}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;