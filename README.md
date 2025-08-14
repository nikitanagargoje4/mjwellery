# मृगया - Premium Maharashtrian Jewelry E-commerce

A beautiful, modern e-commerce website for traditional Maharashtrian jewelry with integrated cart and Razorpay payment functionality.

## Features

### 🛒 Shopping Cart
- Add items to cart with visual feedback
- Real-time cart counter updates
- Sliding cart drawer with item management
- Quantity adjustment and item removal
- Persistent cart state across sessions

### 💳 Payment Integration
- Razorpay payment gateway integration
- Multiple payment methods: UPI, Cards, Net Banking, Wallets
- PhonePe and Google Pay specific integrations
- UPI QR Code generation for payments
- Cash on Delivery with handling fee
- Secure payment processing
- Customer information collection
- Order confirmation and receipt generation
- Payment status verification

### 🎨 User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Success notifications and feedback
- Mobile-optimized interface

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Payment Gateway**: Razorpay
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mrugaya
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your PhonePe credentials in `.env`:
4. Configure your Razorpay credentials in `.env`:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
VITE_RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

5. Start the development server:
```bash
npm run dev
```

## Razorpay Integration Setup

### 1. Get Razorpay Account
- Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Complete KYC verification
- Get your Key ID and Key Secret

### 2. Configure API Endpoints
- **Test Mode**: Use test keys for development
- **Live Mode**: Use live keys for production

### 3. Set Up Webhooks
Configure webhook URLs in Razorpay dashboard:
- Success URL: `https://yourdomain.com/payment-success`
- Callback URL: `https://yourdomain.com/api/payment-callback`

### 4. Security Considerations
- Never expose Key Secret in frontend code
- Implement checksum generation on backend
- Use HTTPS in production
- Validate all payment callbacks on server

## Cart Functionality

### Adding Items
```typescript
const { addItem } = useCart();

addItem({
  id: 1,
  name: "Royal Thushi Set",
  price: "₹45,999",
  originalPrice: "₹52,999",
  image: "image-url",
  category: "Traditional",
  rating: 4.8,
  reviews: 124
});
```

### Cart State Management
The cart uses React Context with useReducer for state management:
- `ADD_ITEM`: Add new item or increment quantity
- `REMOVE_ITEM`: Remove item completely
- `UPDATE_QUANTITY`: Change item quantity
- `CLEAR_CART`: Empty the cart
- `TOGGLE_CART`: Show/hide cart drawer

## Payment Flow

1. **Add to Cart**: User adds jewelry items to cart
2. **Cart Review**: User reviews items in cart drawer
3. **Customer Details**: User fills shipping and contact information
4. **Payment Method**: User selects payment method (UPI/Card/COD)
5. **Payment Processing**: Process through Razorpay or COD
6. **Confirmation**: Success page with order details

## API Integration

### Payment Initiation
```typescript
const options = {
  key: "rzp_test_1234567890",
  amount: amount * 100, // Amount in paise
  currency: "INR",
  name: "मृगया - Mrugaya Jewelry",
  description: "Payment for jewelry items",
  order_id: order.id,
  handler: function (response) {
    // Handle successful payment
  },
  prefill: {
    name: customerInfo.name,
    email: customerInfo.email,
    contact: customerInfo.phone
  },
  theme: {
    color: "#DC2626"
  }
};
```

### Order Creation
```typescript
const createOrder = async (amount: number) => {
  const orderData = {
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: generateOrderId(),
    payment_capture: 1
  };
  
  // Call your backend API to create Razorpay order
  return await createRazorpayOrder(orderData);
};
```

## Deployment

### Environment Variables
Set these in your production environment:
```env
VITE_RAZORPAY_KEY_ID=your_production_key_id
RAZORPAY_KEY_SECRET=your_production_key_secret
```

### Build for Production
```bash
npm run build
```

### Deploy
The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## Security Best Practices

1. **Backend Integration**: Move sensitive operations to backend
2. **Signature Validation**: Verify all payment callbacks
3. **HTTPS Only**: Use secure connections in production
4. **Input Validation**: Sanitize all user inputs
5. **Rate Limiting**: Implement API rate limiting
6. **Error Handling**: Don't expose sensitive error details

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## Support

For support and questions:
- Email: support@ratnamala.com
- Phone: +91-900-000-0000
- Documentation: [Razorpay Developer Docs](https://razorpay.com/docs/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This implementation includes Razorpay integration with proper security measures. In production, ensure proper backend integration for enhanced security and compliance.# mj
