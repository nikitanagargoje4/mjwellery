import { PaymentOptions, RazorpayPayment, PaymentResponse, OrderData, CODOrder } from '../types/payment';
import { CartItem } from '../types/cart';

// Razorpay Configuration
const RAZORPAY_CONFIG = {
  keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
  keySecret: import.meta.env.RAZORPAY_KEY_SECRET || 'your_secret_key',
  webhookSecret: import.meta.env.VITE_RAZORPAY_WEBHOOK_SECRET || 'webhook_secret',
  apiUrl: 'https://api.razorpay.com/v1',
};

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
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

/**
 * Generate unique order ID
 */
const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `MRG_${timestamp}_${random}`;
};

/**
 * Create Razorpay order
 */
export const createRazorpayOrder = async (
  amount: number,
  currency: string = 'INR',
  receipt?: string
): Promise<any> => {
  try {
    // In production, this should be a call to your backend API
    // For demo purposes, we'll simulate the order creation
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || generateOrderId(),
      payment_capture: 1,
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful order creation
    return {
      id: `order_${Date.now()}`,
      entity: 'order',
      amount: orderData.amount,
      amount_paid: 0,
      amount_due: orderData.amount,
      currency: orderData.currency,
      receipt: orderData.receipt,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
};

/**
 * Initialize Razorpay payment for UPI/Digital payments
 */
export const initiateRazorpayPayment = async (
  amount: number,
  customerInfo: any,
  items: CartItem[],
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'phonepe' | 'googlepay' = 'upi'
): Promise<PaymentResponse> => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Create order
    const order = await createRazorpayOrder(amount);

    // Configure payment method preferences
    const methodConfig: any = {};
    
    switch (paymentMethod) {
      case 'phonepe':
        methodConfig.upi = true;
        methodConfig.wallet = ['phonepe'];
        break;
      case 'googlepay':
        methodConfig.upi = true;
        methodConfig.wallet = ['googlepay'];
        break;
      case 'upi':
        methodConfig.upi = true;
        break;
      default:
        methodConfig[paymentMethod] = true;
    }

    return new Promise((resolve) => {
      const options: PaymentOptions = {
        key: RAZORPAY_CONFIG.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'मृगया - Mrugaya Jewelry',
        description: `Payment for ${items.length} jewelry item(s)`,
        order_id: order.id,
        handler: async (response: RazorpayPayment) => {
          try {
            // Verify payment signature
            const isValid = await verifyPaymentSignature(response);
            
            if (isValid) {
              // Save order to localStorage (in production, save to database)
              const orderData: OrderData = {
                orderId: order.receipt,
                amount,
                currency: order.currency,
                customerInfo,
                items: items.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
                paymentMethod: 'razorpay',
                status: 'completed',
                createdAt: new Date().toISOString(),
              };

              localStorage.setItem(`order_${order.receipt}`, JSON.stringify(orderData));

              resolve({
                success: true,
                orderId: order.receipt,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                message: 'Payment completed successfully',
              });
            } else {
              resolve({
                success: false,
                message: 'Payment verification failed',
                error: 'Invalid signature',
              });
            }
          } catch (error) {
            resolve({
              success: false,
              message: 'Payment processing failed',
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        },
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address: customerInfo.address,
        },
        theme: {
          color: '#DC2626', // Red color matching the website theme
        },
        method: methodConfig,
        modal: {
          ondismiss: () => {
            resolve({
              success: false,
              message: 'Payment cancelled by user',
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  } catch (error) {
    console.error('Razorpay payment error:', error);
    return {
      success: false,
      message: 'Payment initialization failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Generate UPI QR Code for payments
 */
export const generateUPIQRCode = async (
  amount: number,
  customerInfo: any,
  items: CartItem[]
): Promise<{ qrCodeUrl: string; orderId: string }> => {
  try {
    const orderId = generateOrderId();
    
    // Create UPI payment URL
    const upiUrl = `upi://pay?pa=mrugaya@razorpay&pn=Mrugaya Jewelry&am=${amount}&cu=INR&tn=Payment for Order ${orderId}`;
    
    // Generate QR code URL (using a QR code service)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;
    
    // Save pending order
    const orderData: OrderData = {
      orderId,
      amount,
      currency: 'INR',
      customerInfo,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      paymentMethod: 'razorpay',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));

    return { qrCodeUrl, orderId };
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate UPI QR code');
  }
};

/**
 * Process Cash on Delivery order
 */
export const processCODOrder = async (
  amount: number,
  customerInfo: any,
  items: CartItem[]
): Promise<CODOrder> => {
  try {
    const orderId = generateOrderId();
    const handlingFee = 50; // ₹50 COD handling fee
    const totalAmount = amount + handlingFee;

    // Calculate estimated delivery (5-7 business days)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const codOrder: CODOrder = {
      orderId,
      amount,
      handlingFee,
      totalAmount,
      customerInfo,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      status: 'confirmed',
      estimatedDelivery: estimatedDelivery.toLocaleDateString('en-IN'),
    };

    // Save COD order
    const orderData: OrderData = {
      orderId,
      amount: totalAmount,
      currency: 'INR',
      customerInfo,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      paymentMethod: 'cod',
      status: 'processing',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return codOrder;
  } catch (error) {
    console.error('COD order processing error:', error);
    throw new Error('Failed to process COD order');
  }
};

/**
 * Verify payment signature (simplified for demo)
 */
const verifyPaymentSignature = async (response: RazorpayPayment): Promise<boolean> => {
  try {
    // In production, this verification should be done on your backend
    // This is a simplified client-side verification for demo purposes
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
    
    // Simulate signature verification
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, we'll assume verification is successful
    // In production, use HMAC SHA256 with your webhook secret
    return true;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

/**
 * Get order details by ID
 */
export const getOrderDetails = (orderId: string): OrderData | null => {
  try {
    const orderData = localStorage.getItem(`order_${orderId}`);
    return orderData ? JSON.parse(orderData) : null;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};

/**
 * Format amount for display
 */
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Handle webhook notifications (for backend implementation)
 */
export const handleWebhook = async (payload: any, signature: string): Promise<boolean> => {
  try {
    // Verify webhook signature
    // In production, implement proper webhook signature verification
    
    const event = payload.event;
    const paymentEntity = payload.payload.payment.entity;
    
    switch (event) {
      case 'payment.captured':
        // Update order status to completed
        console.log('Payment captured:', paymentEntity.id);
        break;
      case 'payment.failed':
        // Update order status to failed
        console.log('Payment failed:', paymentEntity.id);
        break;
      default:
        console.log('Unhandled webhook event:', event);
    }
    
    return true;
  } catch (error) {
    console.error('Webhook handling error:', error);
    return false;
  }
};