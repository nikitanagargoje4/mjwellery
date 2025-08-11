// Backend API Example for Razorpay Integration
// Node.js + Express implementation

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, customerInfo, items } = req.body;

    // Validate required fields
    if (!amount || !customerInfo || !items) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create order in Razorpay
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items_count: items.length,
      },
    };

    const order = await razorpay.orders.create(options);

    // Save order to database
    const orderData = {
      order_id: receipt || `MRG_${Date.now()}`,
      razorpay_order_id: order.id,
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      subtotal: amount,
      total_amount: amount,
      currency,
      payment_method: 'razorpay',
      payment_status: 'pending',
      order_status: 'confirmed',
    };

    // Insert into database (pseudo code)
    // const savedOrder = await db.orders.create(orderData);
    // await db.order_items.createMany(items.map(item => ({
    //   order_id: savedOrder.id,
    //   product_id: item.id,
    //   product_name: item.name,
    //   quantity: item.quantity,
    //   unit_price: parseFloat(item.price.replace(/[^\d]/g, '')),
    //   total_price: parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity,
    // })));

    res.json({
      success: true,
      order,
      orderData,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
});

// Verify Payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified
      // Update order status in database
      // await db.orders.update({
      //   where: { razorpay_order_id },
      //   data: { payment_status: 'completed' }
      // });

      // Save payment details
      // await db.razorpay_payments.create({
      //   order_id: orderId,
      //   razorpay_order_id,
      //   razorpay_payment_id,
      //   razorpay_signature,
      //   status: 'captured',
      //   amount: paymentAmount,
      // });

      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
});

// Razorpay Webhook Handler
app.post('/api/webhook', (req, res) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = JSON.stringify(req.body);

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(webhookBody)
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    // Save webhook to database
    // await db.webhooks.create({
    //   event_type: event,
    //   entity_type: 'payment',
    //   entity_id: paymentEntity.id,
    //   payload: req.body,
    //   signature: webhookSignature,
    // });

    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        console.log('Payment captured:', paymentEntity.id);
        // Update order status
        // await updateOrderStatus(paymentEntity.order_id, 'completed');
        // Send confirmation email
        // await sendOrderConfirmationEmail(paymentEntity.order_id);
        break;

      case 'payment.failed':
        console.log('Payment failed:', paymentEntity.id);
        // Update order status
        // await updateOrderStatus(paymentEntity.order_id, 'failed');
        // Send failure notification
        break;

      case 'order.paid':
        console.log('Order paid:', paymentEntity.id);
        // Handle order completion
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// Get Order Details
app.get('/api/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch order from database
    // const order = await db.orders.findUnique({
    //   where: { order_id: orderId },
    //   include: {
    //     order_items: true,
    //     razorpay_payments: true,
    //   },
    // });

    // Mock response for demo
    const order = {
      order_id: orderId,
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      total_amount: 45999,
      payment_status: 'completed',
      order_status: 'processing',
      created_at: new Date().toISOString(),
    };

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
});

// Process COD Order
app.post('/api/cod-order', async (req, res) => {
  try {
    const { amount, customerInfo, items } = req.body;
    const handlingFee = 50;
    const totalAmount = amount + handlingFee;
    const orderId = `COD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate estimated delivery
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    // Save COD order to database
    const orderData = {
      order_id: orderId,
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      subtotal: amount,
      handling_fee: handlingFee,
      total_amount: totalAmount,
      payment_method: 'cod',
      payment_status: 'pending',
      order_status: 'confirmed',
      estimated_delivery: estimatedDelivery,
    };

    // Insert into database (pseudo code)
    // const savedOrder = await db.orders.create(orderData);

    // Send confirmation email
    // await sendCODConfirmationEmail(orderData);

    res.json({
      success: true,
      order: {
        orderId,
        amount,
        handlingFee,
        totalAmount,
        customerInfo,
        status: 'confirmed',
        estimatedDelivery: estimatedDelivery.toLocaleDateString('en-IN'),
      },
    });
  } catch (error) {
    console.error('COD order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process COD order',
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;