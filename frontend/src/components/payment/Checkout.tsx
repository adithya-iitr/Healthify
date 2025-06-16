import React, { useState } from 'react';
import { ArrowLeft, User, AlertCircle } from 'lucide-react';
import PaymentForm from './PaymentForm';

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

interface CheckoutProps {
  selectedPlan: Plan;
  onBack: () => void;
  onProceedToPayment: (formData: CheckoutData) => void;
}

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const Checkout: React.FC<CheckoutProps> = ({ selectedPlan, onBack, onProceedToPayment }) => {
  const [formData, setFormData] = useState<CheckoutData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<Partial<CheckoutData>>({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    alert('Payment successful');
    onProceedToPayment(formData);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    console.error('Payment error:', error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to plans</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Complete Your Order</h1>
          <p className="text-gray-600 mt-2">You're just one step away from starting your fitness journey!</p>
        </div>

        {/* Error Message */}
        {paymentError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="font-semibold text-red-900">Payment Error</span>
            </div>
            <p className="text-red-700 mt-1">{paymentError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            {/* Personal Information */}
            {!showPaymentForm && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Form */}
            {showPaymentForm && (
              <PaymentForm
                selectedPlan={selectedPlan}
                customerData={formData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}

            {showPaymentForm && (
              <button
                onClick={() => setShowPaymentForm(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to personal information</span>
              </button>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Selected Plan */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedPlan.color} text-white flex items-center justify-center`}>
                    {selectedPlan.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
                    <p className="text-gray-600">{selectedPlan.description}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    {selectedPlan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {selectedPlan.features.length > 3 && (
                      <p className="text-sm text-gray-500">+ {selectedPlan.features.length - 3} more features</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">${selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tax (8%)</span>
                  <span className="font-semibold">${(selectedPlan.price * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${(selectedPlan.price * 1.08).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Billed monthly</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>30-day money back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;