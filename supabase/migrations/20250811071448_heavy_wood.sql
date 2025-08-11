-- Database Schema for Mrugaya Jewelry E-commerce
-- Razorpay Payment Integration

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    parent_category_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id)
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category_id VARCHAR(50),
    subcategory_id VARCHAR(50),
    material VARCHAR(100),
    weight VARCHAR(50),
    dimensions VARCHAR(100),
    purity VARCHAR(50),
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Product Images Table
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_model_image BOOLEAN DEFAULT FALSE,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(100) UNIQUE NOT NULL,
    user_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    handling_fee DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method ENUM('razorpay', 'cod') NOT NULL,
    payment_status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    order_status ENUM('confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'confirmed',
    estimated_delivery DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Razorpay Payments Table
CREATE TABLE razorpay_payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    razorpay_signature VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    status ENUM('created', 'authorized', 'captured', 'refunded', 'failed') DEFAULT 'created',
    method VARCHAR(50), -- upi, card, netbanking, wallet
    bank VARCHAR(100),
    wallet VARCHAR(50),
    vpa VARCHAR(100), -- For UPI payments
    fee DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    error_code VARCHAR(50),
    error_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Webhooks Table (for tracking Razorpay webhooks)
CREATE TABLE webhooks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    signature VARCHAR(255),
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Favorites Table
CREATE TABLE user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT NOT NULL,
    session_id VARCHAR(255), -- For guest users
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    UNIQUE KEY unique_session_product (session_id, product_id)
);

-- Cart Items Table (for persistent cart)
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(255), -- For guest users
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Reviews Table
CREATE TABLE product_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(255),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Inventory Tracking Table
CREATE TABLE inventory_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    change_type ENUM('stock_in', 'stock_out', 'adjustment') NOT NULL,
    quantity_change INT NOT NULL,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    reason VARCHAR(255),
    reference_id VARCHAR(100), -- Order ID or other reference
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Coupons Table
CREATE TABLE coupons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2) DEFAULT 0,
    maximum_discount DECIMAL(10,2),
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupon Usage Table
CREATE TABLE coupon_usage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coupon_id INT NOT NULL,
    order_id INT NOT NULL,
    user_id INT,
    discount_amount DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_razorpay_payments_status ON razorpay_payments(status);
CREATE INDEX idx_webhooks_processed ON webhooks(processed);
CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_cart_items_session ON cart_items(session_id);

-- Sample Data Insertion
INSERT INTO categories (id, name, description, image_url) VALUES
('all-jewellery', 'All Jewellery', 'Complete collection of traditional Maharashtrian jewelry', 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg'),
('mangalsutra', 'Mangalsutra', 'Sacred marriage jewelry with traditional significance', 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg'),
('nath-category', 'Nath', 'Traditional Maharashtrian nose jewelry', '/nath.png'),
('oxide', 'Oxide', 'Oxidized silver jewelry with antique finish', 'https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg'),
('bridal', 'Bridal', 'Complete bridal jewelry collections', 'https://images.pexels.com/photos/1454166/pexels-photo-1454166.jpeg');

INSERT INTO products (name, description, price, original_price, category_id, material, weight, dimensions, purity, featured, rating, reviews_count, tags) VALUES
('Royal Thushi Set', 'Exquisite traditional Maharashtrian Thushi set crafted with 22K gold and adorned with precious pearls.', 45999.00, 52999.00, 'all-jewellery', '22K Gold', '45 grams', '18 inches length', '916 Hallmarked', TRUE, 4.8, 124, '["traditional", "wedding", "gold", "pearls", "maharashtrian"]'),
('Traditional Nath', 'Authentic Maharashtrian Nath with delicate gold work and pearl drops.', 15999.00, 18999.00, 'nath-category', '22K Gold', '8 grams', '3 inches length', '916 Hallmarked', TRUE, 4.6, 156, '["nath", "traditional", "gold", "pearls", "bridal"]'),
('Diamond Mangalsutra', 'Elegant diamond mangalsutra combining traditional significance with modern aesthetics.', 125999.00, 145999.00, 'mangalsutra', '18K Gold', '25 grams', '16 inches length', '750 Hallmarked', TRUE, 4.9, 203, '["mangalsutra", "diamond", "modern", "bridal", "gold"]');