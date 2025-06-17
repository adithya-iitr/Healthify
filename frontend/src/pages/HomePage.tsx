import React, { useState } from 'react';
import { 
  Play, 
  Star, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Dumbbell, 
  Heart, 
  Target, 
  Clock, 
  MessageCircle, 
  Video, 
  Bot, 
  Zap, 
  Shield, 
  TrendingUp,
  Globe,
  Smartphone,
  Calendar,
  BarChart3,
  Crown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { userPlan } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  const handleGetStarted = () => {
    const userPlan = localStorage.getItem("userPlan")
      ? JSON.parse(localStorage.getItem("userPlan")!)
      : null;
    if(!userPlan)
      navigate('/plan')
    else
      navigate('/trainer_dashboard')
  };

  const handleTryAI = () => {
    navigate('/ai');
  };

  const handleViewTrainers = () => {
    navigate('/trainer_dashboard')
  };

  const handleViewVideos = () => {
    navigate('/video');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">FitTrainer</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={handleViewTrainers}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Trainers
              </button>
              <button 
                onClick={handleViewVideos}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Videos
              </button>
              <button 
                onClick={handleTryAI}
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                AI Assistant
              </button>
              <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Pricing
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {userPlan ? (
                <div className="flex items-center space-x-3">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {userPlan} Plan
                  </span>
                  <button
                    // onClick={() => setCurrentPage('trainer-selection')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200"
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <>
                  
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={handleViewTrainers}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Trainers
                </button>
                <button 
                  onClick={handleViewVideos}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Videos
                </button>
                <button 
                  onClick={handleTryAI}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium"
                >
                  AI Assistant
                </button>
                <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                  Pricing
                </a>
                <div className="pt-4 space-y-2">
                  {!userPlan && (
                    <>
                      
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap className="h-4 w-4" />
                  <span>Transform Your Fitness Journey</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Personal
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600"> Fitness</span>
                  <br />Transformation
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Connect with certified trainers, access premium workout videos, and get AI-powered guidance. 
                  Start your journey to a healthier, stronger you today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleTryAI}
                  className="border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Bot className="h-5 w-5" />
                  <span>Try AI Assistant</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Certified Trainers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Happy Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fitness Training"
                  className="rounded-2xl shadow-2xl"
                />
                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Heart Rate</div>
                      <div className="text-sm text-gray-600">142 BPM</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Progress</div>
                      <div className="text-sm text-gray-600">+15% This Week</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personalized training to AI-powered guidance, we provide all the tools 
              and support you need for your fitness transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Trainers</h3>
              <p className="text-gray-600 mb-6">
                Connect with certified fitness professionals who create personalized workout plans tailored to your goals.
              </p>
              <button 
                onClick={handleViewTrainers}
                className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-2"
              >
                <span>Browse Trainers</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Library</h3>
              <p className="text-gray-600 mb-6">
                Access hundreds of professional workout videos for all fitness levels, from beginner to advanced.
              </p>
              <button 
                onClick={handleViewVideos}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2"
              >
                <span>Watch Videos</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Bot className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Assistant</h3>
              <p className="text-gray-600 mb-6">
                Get instant answers to your fitness questions with our intelligent AI assistant, available 24/7.
              </p>
              <button 
                onClick={handleTryAI}
                className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-2"
              >
                <span>Try AI Free</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 mb-6">
                Monitor your fitness journey with detailed analytics and progress reports to stay motivated.
              </p>
              <div className="text-green-600 font-semibold">Coming Soon</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Guidance</h3>
              <p className="text-gray-600 mb-6">
                Receive personalized meal plans and nutrition advice to complement your workout routine.
              </p>
              <div className="text-orange-600 font-semibold">Pro & Elite Plans</div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 mb-6">
                Get help whenever you need it with our round-the-clock customer support and trainer availability.
              </p>
              <div className="text-red-600 font-semibold">Elite Plan</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just three simple steps and begin your transformation today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select the subscription plan that best fits your fitness goals and budget. Start with our free AI assistant.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with Trainers</h3>
              <p className="text-gray-600">
                Browse our network of certified trainers and find the perfect match for your fitness style and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Training</h3>
              <p className="text-gray-600">
                Begin your personalized fitness journey with expert guidance, video workouts, and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of people who have transformed their lives with FitTrainer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "FitTrainer completely changed my approach to fitness. The personalized guidance and support helped me lose 30 pounds and gain confidence I never had before."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Sarah M."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-600">Lost 30 lbs in 4 months</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The AI assistant is incredible! It's like having a fitness expert available 24/7. The video library is also amazing with workouts for every level."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Mike R."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Mike R.</div>
                  <div className="text-sm text-gray-600">Gained 15 lbs muscle</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Working with my trainer through FitTrainer has been life-changing. The personalized approach and constant motivation kept me on track to reach my goals."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Emma L."
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Emma L.</div>
                  <div className="text-sm text-gray-600">Completed first marathon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free AI assistant or upgrade to get access to personal trainers and premium features.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
                <div className="text-gray-600">Forever</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">AI Fitness Assistant</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Basic workout tips</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Limited video access</span>
                </li>
              </ul>
              <button
                onClick={handleTryAI}
                className="w-full py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200"
              >
                Try Free
              </button>
            </div>

            {/* Basic Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Everything in Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Monthly trainer sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Full video library</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$59</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Everything in Basic</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Weekly trainer sessions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Custom meal plans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-200"
              >
                Get Started
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-white border-2 border-purple-500 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Elite</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$99</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">24/7 trainer access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Daily check-ins</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Exclusive workshops</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already started their fitness journey with FitTrainer. 
            Begin with our free AI assistant or choose a plan that fits your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Your Journey
            </button>
            <button
              onClick={handleTryAI}
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200"
            >
              Try AI Assistant Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">FitTrainer</span>
              </div>
              <p className="text-gray-400">
                Transform your fitness journey with expert guidance and AI-powered support.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleViewTrainers} className="hover:text-white transition-colors">Personal Trainers</button></li>
                <li><button onClick={handleViewVideos} className="hover:text-white transition-colors">Video Library</button></li>
                <li><button onClick={handleTryAI} className="hover:text-white transition-colors">AI Assistant</button></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;