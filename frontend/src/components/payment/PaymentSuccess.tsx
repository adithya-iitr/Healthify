import React from 'react';
import { CheckCircle, Mail, Download, Calendar } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}


const PaymentSuccess: React.FC = ({ }) => {
  const onStartJourney=()=>{
    
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to your fitness journey! Your subscription plan has been activated.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Details</h2>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedPlan.color} text-white flex items-center justify-center`}>
              {selectedPlan.icon}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
              <p className="text-gray-600">${selectedPlan.price}/{selectedPlan.period}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Order ID: #FT-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-sm text-gray-600">Billing Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-gray-600">We've sent your receipt and welcome guide to your email address.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download the App</h3>
            <p className="text-gray-600">Get our mobile app to track your progress and connect with trainers.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Session</h3>
            <p className="text-gray-600">Book your first training session with a certified fitness trainer.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button
            onClick={onStartJourney}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Fitness Journey
          </button>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help getting started? Our support team is available 24/7 to assist you with setup and any questions.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">500+</div>
              <div className="text-sm">Certified Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">10k+</div>
              <div className="text-sm">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;