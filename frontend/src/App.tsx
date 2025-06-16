import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { VerifyResetEmailPage } from './pages/VerifyResetEmailPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import  VerifyEmailLandingPage  from './pages/VerifyEmailLandingPage'
import PaymentPage from './pages/PaymentPage';
// import PaymentSuccess from './components/payment/PaymentSuccess';
import PlanSelection from './components/payment/PlanSelection';
import VideoLibrary from './pages/VideoLibrary';
import AIAdvice from './pages/AIbot';
import TrainerProfile from './pages/TrainerProfile';
import TrainerSelection from './pages/TrainerSelection';
import PaymentSuccess from './components/payment/PaymentSuccess';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
function App() {
  
  return (
    <>
    <Toaster position="top-center" />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-reset-email" element={<VerifyResetEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email/verified=false" element={<VerifyEmailLandingPage />} />
        <Route path="/plan" element={<PaymentPage />} />
        <Route path="/ai" element={<AIAdvice/>}/>
        <Route path="/video" element={<VideoLibrary/>}/>
        <Route path="/trainer/:id" element={<TrainerProfile/>}/>
        <Route path="/trainer_dashboard" element={<TrainerSelection/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/chat/:id" element={<ChatPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;