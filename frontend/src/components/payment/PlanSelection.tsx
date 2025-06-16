import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';
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

interface PlanSelectionProps {
  onSelectPlan: (plan: Plan) => void;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: 'month',
    description: 'Perfect for beginners starting their fitness journey',
    features: [
      'Access to basic workout plans',
      'Monthly progress tracking',
      'Email support',
      'Mobile app access',
      'Basic nutrition guidelines'
    ],
    icon: <Users className="h-8 w-8" />,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 59,
    period: 'month',
    description: 'Most popular choice for serious fitness enthusiasts',
    features: [
      'All Basic features',
      'Personalized workout plans',
      'Weekly video calls with trainer',
      'Custom meal planning',
      'Priority support',
      'Advanced progress analytics',
      'Workout video library'
    ],
    icon: <Zap className="h-8 w-8" />,
    popular: true,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 99,
    period: 'month',
    description: 'Ultimate package for maximum results and support',
    features: [
      'All Pro features',
      '24/7 trainer availability',
      'Daily check-ins and motivation',
      'Supplement recommendations',
      'Injury prevention protocols',
      'Competition preparation',
      'Exclusive workshops and events',
      'Personal nutrition coach'
    ],
    icon: <Crown className="h-8 w-8" />,
    color: 'from-purple-500 to-purple-600'
  }
];

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>(() =>
    plans.find((plan) => plan.id === 'pro')!
  );
  const location=useLocation();
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    onSelectPlan(plan);
  };
  console.log(selectedPlan)
  // if(location.pathname=='/success') 
  //   return <PaymentSuccess selectedPlan={selectedPlan}/>
  // else 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-emerald-600">Training Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized fitness coaching from certified trainers. 
            Select the plan that fits your goals and budget.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-4 ring-emerald-500 ring-opacity-50' : ''
              } ${selectedPlan.name === plan.name ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold text-sm">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} text-white mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-xl text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-emerald-500" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    selectedPlan.name === plan.name
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                      : plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {selectedPlan.name === plan.name ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-emerald-500" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-emerald-500" />
              <span>Certified trainers only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;