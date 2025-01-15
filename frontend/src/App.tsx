import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { HomePage } from './pages/HomePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { VerifyResetEmailPage } from './pages/VerifyResetEmailPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import  VerifyEmailLandingPage  from './pages/VerifyEmailLandingPage'
import BuddyProfile from './components/profile/BuddyProfile';
import GroupProfile from './components/profile/GroupProfile';
function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-email" element={<VerifyResetEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/my_profile" element={<BuddyProfile />} />
        <Route path="/group_profile/:id" element={<GroupProfile />} />
        <Route path="/verify-email/:token" element={<VerifyEmailLandingPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;