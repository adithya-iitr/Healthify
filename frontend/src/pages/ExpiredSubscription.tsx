import React from 'react';
import { AlertTriangle, Clock, CreditCard, RefreshCw, ArrowRight, CheckCircle, Star, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ExpiredSubscription: React.FC = () => {
  const navigate=useNavigate();
  const userPlan= JSON.parse(localStorage.getItem('userPlan') || '{"plan": "null"}').plan

  const handleRenewSubscription = () => {
    navigate('/plan')
  };

  const handleViewFreeContent = () => {
    navigate('/ai');
  };

  const getExpiredPlanName = () => {
    switch (userPlan) {
      case 'basic':
        return 'Basic';
      case 'pro':
        return 'Pro';
      case 'elite':
        return 'Elite';
      default:
        return 'Premium';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscription Expired</h1>
              <p className="text-gray-600">Your {getExpiredPlanName()} plan has expired</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Alert Card */}
        <div className="bg-white rounded-2xl shadow-xl border-l-4 border-red-500 p-8 mb-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your {getExpiredPlanName()} Subscription Has Expired
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We hope you enjoyed your fitness journey with us! Your subscription expired on{' '}
                <span className="font-semibold text-red-600">
                  {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>. 
                To continue accessing premium features like personal trainers, custom workout plans, 
                and exclusive video content, please renew your subscription.
              </p>
              
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <div className="text-sm text-gray-600">Days Active</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">23</div>
                  <div className="text-sm text-gray-600">Workouts Completed</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">8.5</div>
                  <div className="text-sm text-gray-600">lbs Lost</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRenewSubscription}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Renew Subscription</span>
                </button>
                <button
                  onClick={()=>{
                    window.location.href = "mailto:support@fittrainer.com"}
                  }
                  className="border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 font-semibold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What You're Missing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Star className="h-6 w-6 text-yellow-500" />
            <span>What You're Missing</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Trainers</h4>
                  <p className="text-gray-600 text-sm">Access to certified fitness professionals for personalized guidance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom Workout Plans</h4>
                  <p className="text-gray-600 text-sm">Tailored exercise routines based on your goals and fitness level</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CreditCard className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Premium Video Library</h4>
                  <p className="text-gray-600 text-sm">Exclusive workout videos and advanced training programs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Priority Support</h4>
                  <p className="text-gray-600 text-sm">24/7 customer support and faster response times</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Renewal Options */}

        {/* Free Content Available */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Still Want to Stay Active? Try Our Free Features
          </h3>
          <p className="text-gray-600 mb-6">
            While you decide on renewal, you can still access our AI fitness assistant for basic workout tips and guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleViewFreeContent}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Try AI Assistant</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/home')}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 text-gray-600">
          {/* <p>Questions about your subscription? <button onClick={handleContactSupport} className="text-emerald-600 hover:text-emerald-700 font-semibold">Contact our support team</button></p> */}
        </div>
      </div>
    </div>
  );
};

export default ExpiredSubscription;