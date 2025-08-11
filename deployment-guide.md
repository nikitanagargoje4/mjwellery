# Deployment Guide - Mrugaya Jewelry E-commerce

## Prerequisites

### 1. Razorpay Account Setup
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Complete KYC verification
3. Get your API keys:
   - **Test Keys**: For development and testing
   - **Live Keys**: For production use

### 2. Environment Configuration

Create `.env` file with the following variables:

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890  # Your Razorpay Key ID
RAZORPAY_KEY_SECRET=your_secret_key_here   # Keep this secure (backend only)
VITE_RAZORPAY_WEBHOOK_SECRET=webhook_secret_here

# Application Configuration
VITE_APP_NAME=मृगया
VITE_APP_URL=https://yourdomain.com

# Database Configuration (if using backend)
DATABASE_URL=your_database_connection_string
```

## Frontend Deployment

### Option 1: Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Configure redirects** (create `public/_redirects`):
   ```
   /*    /index.html   200
   ```

### Option 2: Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** in Vercel dashboard

### Option 3: AWS S3 + CloudFront

1. **Build and upload to S3:**
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

2. **Configure CloudFront distribution**
3. **Set up custom domain and SSL**

## Backend Deployment

### Option 1: Node.js Server (Express)

1. **Create backend server** (see `backend-api-example.js`)

2. **Install dependencies:**
   ```bash
   npm install express razorpay crypto cors dotenv
   ```

3. **Deploy to platforms:**
   - **Heroku**: `git push heroku main`
   - **Railway**: Connect GitHub repository
   - **DigitalOcean App Platform**: Deploy from GitHub

### Option 2: Serverless Functions

#### Netlify Functions
```javascript
// netlify/functions/create-order.js
const Razorpay = require('razorpay');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, currency, receipt } = JSON.parse(event.body);
    
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, order }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
```

#### Vercel API Routes
```javascript
// api/create-order.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency, receipt } = req.body;
    
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

## Database Setup

### Option 1: PostgreSQL (Recommended)

1. **Create database** on platforms like:
   - **Supabase**: Free tier available
   - **Railway**: PostgreSQL addon
   - **AWS RDS**: Managed PostgreSQL

2. **Run migrations:**
   ```bash
   psql -h hostname -U username -d database -f database-schema.sql
   ```

### Option 2: MySQL

1. **Create database** on platforms like:
   - **PlanetScale**: Serverless MySQL
   - **AWS RDS**: Managed MySQL

2. **Import schema:**
   ```bash
   mysql -h hostname -u username -p database < database-schema.sql
   ```

## Security Configuration

### 1. API Key Management

**Frontend (.env):**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890  # Safe to expose
```

**Backend (.env):**
```env
RAZORPAY_KEY_SECRET=your_secret_key  # NEVER expose this
RAZORPAY_WEBHOOK_SECRET=webhook_secret
```

### 2. CORS Configuration

```javascript
// Backend CORS setup
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
}));
```

### 3. Webhook Security

```javascript
// Verify webhook signature
const crypto = require('crypto');

const verifyWebhookSignature = (body, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  
  return signature === expectedSignature;
};
```

## Testing

### 1. Test Payment Flow

Use Razorpay test cards:
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002

### 2. Test UPI Payments

Use test UPI IDs:
- **Success**: success@razorpay
- **Failure**: failure@razorpay

### 3. Webhook Testing

Use tools like:
- **ngrok**: For local webhook testing
- **Razorpay Dashboard**: Webhook logs and retry

## Monitoring and Analytics

### 1. Payment Monitoring

- Monitor payment success rates
- Track failed payments and reasons
- Set up alerts for payment failures

### 2. Error Tracking

```javascript
// Error logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### 3. Performance Monitoring

- Use tools like New Relic or DataDog
- Monitor API response times
- Track database query performance

## Backup and Recovery

### 1. Database Backups

```bash
# PostgreSQL backup
pg_dump -h hostname -U username database > backup.sql

# MySQL backup
mysqldump -h hostname -u username -p database > backup.sql
```

### 2. File Backups

- Backup uploaded images and assets
- Use cloud storage with versioning
- Implement automated backup schedules

## SSL and Security

### 1. SSL Certificate

- Use Let's Encrypt for free SSL
- Configure HTTPS redirects
- Implement HSTS headers

### 2. Security Headers

```javascript
// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

## Go-Live Checklist

- [ ] Switch to Razorpay live keys
- [ ] Update webhook URLs to production
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Test all payment methods
- [ ] Set up monitoring and alerts
- [ ] Backup strategy in place
- [ ] Error tracking configured
- [ ] Performance monitoring active

## Support and Maintenance

### 1. Regular Updates

- Keep dependencies updated
- Monitor security vulnerabilities
- Update payment gateway integration

### 2. Customer Support

- Set up support email system
- Create FAQ and help documentation
- Implement order tracking system

### 3. Analytics

- Set up Google Analytics
- Track conversion rates
- Monitor user behavior

---

**Note**: Always test thoroughly in a staging environment before deploying to production. Keep your API keys secure and never commit them to version control.