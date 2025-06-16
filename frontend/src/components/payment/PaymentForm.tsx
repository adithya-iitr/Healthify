import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
// import { stripePromise, createPaymentIntent } from '../../payment/stripe';
import { createRazorpayOrder, initiateRazorpayPayment } from '../../payment/razorpay';

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

interface PaymentFormProps {
  selectedPlan: Plan;
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
}

type PaymentMethod = 'razorpay';

const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedPlan,
  customerData,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = selectedPlan.price;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;
     

  const processRazorpayPayment = async () => {
    try {
      // Create Razorpay order
      const order = await createRazorpayOrder(total, 'INR');
      const options = {
        key: 'rzp_test_UdnEljfzaO9XgZ',
        amount: order.amount,
        currency: order.currency,
        name: 'Fitness Trainer App',
        description: `${selectedPlan.name} Plan Subscription`,
        order_id: order.orderId,
        handler: (response: any) => {
          onPaymentSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: total,
            currency: 'INR',
            method: 'razorpay'
          });
        },
        prefill: {
          name: `${customerData.firstName} ${customerData.lastName}`,
          email: customerData.email,
          contact: customerData.phone,
        },
        theme: {
          color: '#10B981',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      await initiateRazorpayPayment(options);
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
        await processRazorpayPayment();
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'Payment processing failed');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => setPaymentMethod('razorpay')}
            className={`p-4 border-2 rounded-xl transition-all ${
              paymentMethod === 'razorpay'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold text-gray-900">Razorpay</div>
              <div className="text-sm text-gray-600">UPI, Cards, Wallets</div>
            </div>
          </button>
        </div>
      </div>
      {/* Razorpay Info */}
      {paymentMethod === 'razorpay' && (
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-900">Razorpay Checkout</span>
          </div>
          <p className="text-sm text-purple-700">
            You'll be redirected to Razorpay's secure checkout page to complete your payment using UPI, cards, net banking, or wallets.
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">{selectedPlan.name} Plan</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tax (8%)</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-900">Secure Payment</span>
        </div>
        <p className="text-sm text-green-700 mt-1">
          Your payment information is encrypted and processed securely using industry-standard security protocols.
        </p>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Pay ${total.toFixed(2)} with {'Razorpay'}</span>
          </div>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By completing your purchase, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default PaymentForm;