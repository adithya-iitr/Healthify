import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
const router = express.Router();


const razorpay = new Razorpay({
  key_id: 'rzp_test_UdnEljfzaO9XgZ',
  key_secret: 'k39Q1yjehhjUudKD1awCrbDQ'
});

// Create order
router.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in paise
    currency: "INR",
    receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, currency: order.currency, amount: order.amount });
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Payment verification
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sign = crypto
    .createHmac("sha256", 'k39Q1yjehhjUudKD1awCrbDQ')
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (sign === razorpay_signature) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

export default router;
