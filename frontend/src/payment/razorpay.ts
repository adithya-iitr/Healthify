import axios from 'axios';
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  theme?: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Mock implementation for demo purposes
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  const response = await axios.post('http://localhost:8000/api/payment/create-order', {
    amount,
  });

  return response.data;
};

export const initiateRazorpayPayment = async (data: RazorpayOptions) => {
  const options = {
    key: 'rzp_test_UdnEljfzaO9XgZ',
    amount: data.amount,
    currency: data.currency,
    order_id: data.order_id,
    name: data.name,
    description: data.description,
    handler: async function (response: any) {
      // Optional: Verify signature
      const body = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      }
      const verifyRes = await axios.post('http://localhost:8000/api/payment/verify',
        body
      );
      if (verifyRes.data.success) {
        window.location.href = '/trainer_dashboard';
      } else {
        alert('Payment verification failed');
      }
      localStorage.setItem(
        'userPlan',
        JSON.stringify({
          plan: options.description.split(' ')[0],
          isPremium: true,
          expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
      );

    },
    modal: {
      ondismiss: () => {
        alert('transaction failed');
        setTimeout(() => { window.location.href = '/plan'; }, 1000)
      }
    }
  }
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
}
