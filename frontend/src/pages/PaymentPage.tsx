import React, { useState } from 'react';
import PlanSelection from '../components/payment/PlanSelection';
import Checkout from '../components/payment/Checkout';
import PaymentSuccess from '../components/payment/PaymentSuccess';

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

type AppState = 'plan-selection' | 'checkout' | '';

const PaymentPage: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('plan-selection');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentState('checkout');
  };

  const handleBack = () => {
    setCurrentState('plan-selection');
    setSelectedPlan(null);
  };

  const handleProceedToPayment = () => {
    setCurrentState('');
  };

  const handleStartJourney = () => {
    console.log('Starting fitness journey...');
    alert('Welcome to your fitness journey! Redirecting to dashboard...');
    // Optionally: redirect user using React Router
    // navigate("/dashboard");
  };

  return (
    <div className="App">
      {currentState === 'plan-selection' && (
        <PlanSelection onSelectPlan={handleSelectPlan} />
      )}

      {currentState === 'checkout' && selectedPlan && (
        <Checkout
          selectedPlan={selectedPlan}
          onBack={handleBack}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* {currentState === 'payment-success' && selectedPlan && (
        <PaymentSuccess
          selectedPlan={selectedPlan}
          onStartJourney={handleStartJourney}
        />
      )} */}
    </div>
  );
};

export default PaymentPage;
