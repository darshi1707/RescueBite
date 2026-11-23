import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'rescuebite.sqlite');
const db = new DatabaseSync(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL, -- 'student', 'delivery', 'vendor', 'admin'
    university_id TEXT,
    department TEXT,
    year_of_study TEXT,
    phone TEXT,
    vehicle_type TEXT,
    delivery_zone TEXT,
    is_verified INTEGER DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    vendor_id TEXT NOT NULL,
    vendor_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    original_price REAL NOT NULL,
    discounted_price REAL NOT NULL,
    discount_percent INTEGER NOT NULL,
    quantity_available INTEGER NOT NULL,
    pickup_deadline TEXT NOT NULL,
    allergens TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'sold_out', 'expired'
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    vendor_id TEXT NOT NULL,
    vendor_name TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    food_price REAL NOT NULL,
    delivery_type TEXT NOT NULL, -- 'pickup', 'delivery'
    delivery_fee REAL DEFAULT 0,
    total_price REAL NOT NULL,
    pickup_pin TEXT NOT NULL,
    delivery_otp TEXT NOT NULL,
    status TEXT NOT NULL, -- 'placed', 'preparing', 'ready_for_pickup', 'courier_assigned', 'in_transit', 'delivered', 'cancelled'
    delivery_partner_id TEXT,
    delivery_partner_name TEXT,
    delivery_address TEXT,
    created_at TEXT NOT NULL,
    completed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS wallets (
    user_id TEXT PRIMARY KEY,
    cash_balance REAL DEFAULT 0,
    meal_credits REAL DEFAULT 0,
    deliveries_today INTEGER DEFAULT 0,
    last_delivery_date TEXT,
    total_deliveries INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS wallet_transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL, -- 'delivery_earning', 'meal_reward_bonus', 'meal_credit_redemption', 'payout'
    description TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS system_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Seed Default System Configs if not present
const configCount = db.prepare('SELECT COUNT(*) as count FROM system_config').get().count;
if (configCount === 0) {
  const insertConfig = db.prepare('INSERT INTO system_config (key, value) VALUES (?, ?)');
  insertConfig.run('vendor_commission_pct', '10');
  insertConfig.run('courier_fee', '15');
  insertConfig.run('coordination_fee', '4');
  insertConfig.run('reward_milestone_target', '5');
  insertConfig.run('reward_meal_credit', '60');
  insertConfig.run('allowed_domains', 'adaniuni.ac.in,shantigram.res');
}

// Seed Initial Accounts if not present
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
  const now = new Date().toISOString();
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, university_id, department, year_of_study, phone, vehicle_type, delivery_zone, is_verified, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // 1. Verified Student
  insertUser.run(
    'usr_student_1',
    'Aarav Patel',
    'student@adaniuni.ac.in',
    'student123',
    'student',
    'AU2024CS104',
    'Computer Science & Engineering',
    '3rd Year',
    '+91 98765 43210',
    null,
    'Hostel Block B',
    1,
    now
  );

  // 2. Student Delivery Partner
  insertUser.run(
    'usr_delivery_1',
    'Rohan Sharma',
    'delivery@adaniuni.ac.in',
    'delivery123',
    'delivery',
    'AU2024ME082',
    'Mechanical Engineering',
    '2nd Year',
    '+91 98111 22334',
    'Bicycle',
    'Central Campus & Hostels',
    1,
    now
  );

  // 3. Cafeteria Vendor
  insertUser.run(
    'usr_vendor_1',
    'Adani University Food Court',
    'canteen@adaniuni.ac.in',
    'vendor123',
    'vendor',
    'VEN-ADANI-01',
    'Main Food Court (Ground Floor)',
    'Established 2021',
    '+91 79 2555 4000',
    null,
    'Main Dining Hall Counter 3',
    1,
    now
  );

  // 4. Platform Admin
  insertUser.run(
    'usr_admin_1',
    'RescueBite Administrator',
    'admin@rescuebite.com',
    'admin123',
    'admin',
    'ADM-AU-001',
    'Campus Sustainability Office',
    'Staff',
    '+91 79 2555 9999',
    null,
    'Admin Tower',
    1,
    now
  );

  // Seed Wallets
  const insertWallet = db.prepare(`
    INSERT INTO wallets (user_id, cash_balance, meal_credits, deliveries_today, last_delivery_date, total_deliveries)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  // Rohan Sharma has 4 deliveries completed today to make it easy to demonstrate the 5th meal reward!
  insertWallet.run('usr_delivery_1', 60.0, 0.0, 4, now.split('T')[0], 19);

  const insertTx = db.prepare(`
    INSERT INTO wallet_transactions (id, user_id, amount, type, description, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertTx.run('tx_1', 'usr_delivery_1', 15.0, 'delivery_earning', 'Delivery earning: Order #RB-1082 to Hostel A', now);
  insertTx.run('tx_2', 'usr_delivery_1', 15.0, 'delivery_earning', 'Delivery earning: Order #RB-1085 to Library', now);
  insertTx.run('tx_3', 'usr_delivery_1', 15.0, 'delivery_earning', 'Delivery earning: Order #RB-1089 to Lab Complex', now);
  insertTx.run('tx_4', 'usr_delivery_1', 15.0, 'delivery_earning', 'Delivery earning: Order #RB-1092 to Hostel B', now);

  // Seed Surplus Listings
  const insertListing = db.prepare(`
    INSERT INTO listings (id, vendor_id, vendor_name, title, description, category, original_price, discounted_price, discount_percent, quantity_available, pickup_deadline, allergens, image_url, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleListings = [
    {
      id: 'list_1',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'Adani University Food Court',
      title: 'Veg Club Sandwich (Triple Decker)',
      description: 'Fresh grilled sandwich with cucumber, tomato, herb butter, mint chutney, and processed cheese.',
      category: 'Snacks',
      original_price: 60,
      discounted_price: 30,
      discount_percent: 50,
      quantity_available: 8,
      pickup_deadline: '04:30 PM Today',
      allergens: 'Dairy, Gluten',
      image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'list_2',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'Campus Cafe Central',
      title: 'Paneer Tikka Roll Wrap',
      description: 'Marinated cottage cheese roasted with capsicum and onions in whole wheat roti with tangy yogurt dressing.',
      category: 'Wraps',
      original_price: 90,
      discounted_price: 45,
      discount_percent: 50,
      quantity_available: 5,
      pickup_deadline: '04:45 PM Today',
      allergens: 'Dairy, Mustard',
      image_url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'list_3',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'Mess Hall Block A',
      title: 'Deluxe Gujarati Veg Thali',
      description: 'Complete wholesome meal: 4 phulkas, paneer sabzi, dal fry, steamed jeera rice, salad and pickle.',
      category: 'Meals',
      original_price: 120,
      discounted_price: 60,
      discount_percent: 50,
      quantity_available: 12,
      pickup_deadline: '03:45 PM Today',
      allergens: 'Dairy',
      image_url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'list_4',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'Shantigram Eatery',
      title: 'Desi Dal Khichdi Comfort Bowl',
      description: 'Slow-cooked yellow lentils and rice tempered with desi ghee, cumin, garlic, and hing. Served with roasted papad.',
      category: 'Bowls',
      original_price: 80,
      discounted_price: 40,
      discount_percent: 50,
      quantity_available: 6,
      pickup_deadline: '04:00 PM Today',
      allergens: 'Dairy (Ghee)',
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'list_5',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'South Indian Corner',
      title: 'Steamed Idli Sambar Platter (4 Pcs)',
      description: 'Fluffy fermented rice cakes served with piping hot vegetable sambar and fresh grated coconut chutney.',
      category: 'Breakfast',
      original_price: 50,
      discounted_price: 25,
      discount_percent: 50,
      quantity_available: 9,
      pickup_deadline: '05:00 PM Today',
      allergens: 'Coconut, Mustard Seeds',
      image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    },
    {
      id: 'list_6',
      vendor_id: 'usr_vendor_1',
      vendor_name: 'Pastry & Brews Campus Kiosk',
      title: 'Bakery Combo: Choco Muffin & Veg Puff',
      description: 'One warm spiced vegetable puff pastry and one rich double chocolate chip muffin from morning batch.',
      category: 'Bakery',
      original_price: 70,
      discounted_price: 35,
      discount_percent: 50,
      quantity_available: 7,
      pickup_deadline: '05:30 PM Today',
      allergens: 'Gluten, Dairy',
      image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      status: 'active'
    }
  ];

  for (const item of sampleListings) {
    insertListing.run(
      item.id,
      item.vendor_id,
      item.vendor_name,
      item.title,
      item.description,
      item.category,
      item.original_price,
      item.discounted_price,
      item.discount_percent,
      item.quantity_available,
      item.pickup_deadline,
      item.allergens,
      item.image_url,
      item.status,
      now
    );
  }

  // Seed sample completed orders for historical impact analytics
  const insertOrder = db.prepare(`
    INSERT INTO orders (id, order_number, student_id, student_name, vendor_id, vendor_name, item_id, item_title, quantity, food_price, delivery_type, delivery_fee, total_price, pickup_pin, delivery_otp, status, delivery_partner_id, delivery_partner_name, delivery_address, created_at, completed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertOrder.run(
    'ord_hist_1', 'RB-1082', 'usr_student_1', 'Aarav Patel', 'usr_vendor_1', 'Adani Food Court',
    'list_1', 'Veg Club Sandwich', 2, 60.0, 'delivery', 19.0, 79.0,
    '4192', '5821', 'delivered', 'usr_delivery_1', 'Rohan Sharma', 'Hostel Block A, Room 204',
    now, now
  );
  insertOrder.run(
    'ord_hist_2', 'RB-1085', 'usr_student_1', 'Aarav Patel', 'usr_vendor_1', 'Campus Cafe Central',
    'list_2', 'Paneer Tikka Roll Wrap', 1, 45.0, 'pickup', 0.0, 45.0,
    '7319', '1102', 'delivered', null, null, 'Counter Pickup',
    now, now
  );
  insertOrder.run(
    'ord_hist_3', 'RB-1089', 'usr_student_1', 'Aarav Patel', 'usr_vendor_1', 'Mess Hall Block A',
    'list_3', 'Deluxe Gujarati Veg Thali', 1, 60.0, 'delivery', 19.0, 79.0,
    '2984', '9403', 'delivered', 'usr_delivery_1', 'Rohan Sharma', 'Central Library Reading Hall',
    now, now
  );
  // An active pending delivery request ready for the delivery partner to accept
  insertOrder.run(
    'ord_pending_deliv', 'RB-2041', 'usr_student_1', 'Aarav Patel', 'usr_vendor_1', 'Adani Food Court',
    'list_1', 'Veg Club Sandwich (Triple Decker)', 1, 30.0, 'delivery', 19.0, 49.0,
    '8374', '6219', 'placed', null, null, 'Hostel Block B, Room 312',
    now, null
  );
}

export default db;
