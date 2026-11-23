import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CONFIG, INITIAL_USERS, INITIAL_LISTINGS, INITIAL_ORDERS, INITIAL_WALLETS } from '../services/mockData.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Users state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('rescuebite_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Current logged in user (default to student for immediate exploration)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('rescuebite_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  // 2. Listings state
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('rescuebite_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  // 3. Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('rescuebite_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 4. Wallets state
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('rescuebite_wallets');
    return saved ? JSON.parse(saved) : INITIAL_WALLETS;
  });

  // 5. System config state
  const [systemConfig, setSystemConfig] = useState(() => {
    const saved = localStorage.getItem('rescuebite_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  // Navigation / Active View
  const [activeTab, setActiveTab] = useState('marketplace');
  // Selected Food Item for detail view
  const [selectedFood, setSelectedFood] = useState(null);
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('rescuebite_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('rescuebite_current_user', JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem('rescuebite_listings', JSON.stringify(listings));
  }, [listings]);
  useEffect(() => {
    localStorage.setItem('rescuebite_orders', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem('rescuebite_wallets', JSON.stringify(wallets));
  }, [wallets]);
  useEffect(() => {
    localStorage.setItem('rescuebite_config', JSON.stringify(systemConfig));
  }, [systemConfig]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Auth Operations
  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);
    if (!found) {
      showToast('Invalid email address or password', 'error');
      return false;
    }
    setCurrentUser(found);
    showToast(`Welcome back, ${found.name}! Signed in as ${found.role.toUpperCase()}`);
    if (found.role === 'vendor') setActiveTab('vendor-dashboard');
    else if (found.role === 'delivery') setActiveTab('delivery-dashboard');
    else if (found.role === 'admin') setActiveTab('admin-dashboard');
    else setActiveTab('marketplace');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.');
    setActiveTab('landing');
  };

  const switchRole = (role) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      showToast(`Switched active profile to ${targetUser.name} (${role.toUpperCase()})`);
      if (role === 'vendor') setActiveTab('vendor-dashboard');
      else if (role === 'delivery') setActiveTab('delivery-dashboard');
      else if (role === 'admin') setActiveTab('admin-dashboard');
      else setActiveTab('marketplace');
    }
  };

  const registerStudent = (studentData) => {
    const { name, email, password, university_id, department, year_of_study, phone } = studentData;
    const cleanEmail = email.trim().toLowerCase();
    const domain = cleanEmail.split('@')[1] || '';
    const allowed = systemConfig.allowed_domains.split(',').map(d => d.trim().toLowerCase());
    const isDomainAllowed = allowed.some(d => domain === d || domain.endsWith('.' + d));

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      showToast('An account with this email already exists', 'error');
      return false;
    }

    const newUser = {
      id: `usr_std_${Date.now()}`,
      name,
      email: cleanEmail,
      password,
      role: 'student',
      university_id,
      department: department || 'Engineering',
      year_of_study: year_of_study || '1st Year',
      phone: phone || '',
      vehicle_type: null,
      delivery_zone: 'Campus Main',
      is_verified: isDomainAllowed ? 1 : 0,
      created_at: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    if (isDomainAllowed) {
      showToast('Registration successful! Verified automatically via university email domain.');
      setActiveTab('marketplace');
    } else {
      showToast('Account created. External domain queued for Administrator verification.', 'amber');
      setActiveTab('student-verification');
    }
    return true;
  };

  const registerDeliveryPartner = ({ vehicleType, deliveryZone, phone }) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      role: 'delivery',
      vehicle_type: vehicleType || 'Walking',
      delivery_zone: deliveryZone || 'Central Campus & Hostels',
      phone: phone || currentUser.phone
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);

    // Initialize courier wallet if absent
    if (!wallets[currentUser.id]) {
      setWallets(prev => ({
        ...prev,
        [currentUser.id]: {
          user_id: currentUser.id,
          cash_balance: 0.0,
          meal_credits: 0.0,
          deliveries_today: 0,
          last_delivery_date: new Date().toISOString().split('T')[0],
          total_deliveries: 0,
          transactions: []
        }
      }));
    }

    showToast('Welcome to the delivery network! You can now accept student delivery requests.');
    setActiveTab('delivery-dashboard');
  };

  const registerVendor = ({ businessName, managerName, email, password, location, phone }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      showToast('An account with this email already exists', 'error');
      return false;
    }

    const newVendor = {
      id: `usr_ven_${Date.now()}`,
      name: businessName,
      email: cleanEmail,
      password,
      role: 'vendor',
      university_id: `VEN-${Date.now().toString().slice(-4)}`,
      department: managerName,
      year_of_study: 'Licensed Food Operator',
      phone: phone || '',
      vehicle_type: null,
      delivery_zone: location || 'Campus Dining Block',
      is_verified: 1,
      created_at: new Date().toISOString()
    };

    setUsers(prev => [newVendor, ...prev]);
    setCurrentUser(newVendor);
    showToast(`Vendor account created for ${businessName}!`);
    setActiveTab('vendor-dashboard');
  };

  // Marketplace & Listings
  const addListing = (listingData) => {
    const origPrice = parseFloat(listingData.original_price);
    const discPrice = parseFloat(listingData.discounted_price);
    const discountPercent = Math.round(((origPrice - discPrice) / origPrice) * 100);

    const newListing = {
      id: `list_${Date.now()}`,
      vendor_id: currentUser?.id || 'usr_vendor_1',
      vendor_name: currentUser?.name || 'Campus Food Court',
      title: listingData.title,
      description: listingData.description || 'Fresh wholesome surplus food prepared today.',
      category: listingData.category || 'Snacks',
      original_price: origPrice,
      discounted_price: discPrice,
      discount_percent: discountPercent,
      quantity_available: parseInt(listingData.quantity_available),
      pickup_deadline: listingData.pickup_deadline || '05:00 PM Today',
      allergens: listingData.allergens || 'None declared',
      image_url: listingData.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      status: 'active',
      created_at: new Date().toISOString()
    };

    setListings(prev => [newListing, ...prev]);
    showToast(`Published listing: "${newListing.title}"!`);
  };

  const updateListing = (id, updates) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    showToast('Listing updated successfully.');
  };

  const deleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
    showToast('Listing removed.');
  };

  // Orders & Fulfillment
  const createOrder = ({ item, quantity, deliveryType, deliveryAddress }) => {
    if (!currentUser) {
      showToast('Please log in as a student to place an order.', 'error');
      setActiveTab('login');
      return null;
    }

    if (item.quantity_available < quantity) {
      showToast(`Only ${item.quantity_available} portions remaining!`, 'error');
      return null;
    }

    // Decrement stock
    const remainingStock = item.quantity_available - quantity;
    updateListing(item.id, {
      quantity_available: remainingStock,
      status: remainingStock === 0 ? 'sold_out' : 'active'
    });

    const isDelivery = deliveryType === 'delivery';
    const courierFee = systemConfig.courier_fee;
    const coordinationFee = systemConfig.coordination_fee;
    const deliveryFee = isDelivery ? (courierFee + coordinationFee) : 0;
    const foodPrice = item.discounted_price * quantity;
    const totalPrice = foodPrice + deliveryFee;

    const pickupPin = Math.floor(1000 + Math.random() * 9000).toString();
    const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder = {
      id: `ord_${Date.now()}`,
      order_number: `RB-${Math.floor(1000 + Math.random() * 9000)}`,
      student_id: currentUser.id,
      student_name: currentUser.name,
      vendor_id: item.vendor_id,
      vendor_name: item.vendor_name,
      item_id: item.id,
      item_title: item.title,
      quantity,
      food_price: foodPrice,
      delivery_type: deliveryType,
      delivery_fee: deliveryFee,
      total_price: totalPrice,
      pickup_pin: pickupPin,
      delivery_otp: deliveryOtp,
      status: 'placed',
      delivery_partner_id: null,
      delivery_partner_name: null,
      delivery_address: isDelivery ? (deliveryAddress || 'Hostel Campus') : 'Counter Pickup',
      created_at: new Date().toISOString(),
      completed_at: null
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.order_number} confirmed!`);
    setActiveTab('student-dashboard');
    return newOrder;
  };

  // Vendor confirms self-pickup code
  const verifyPickupPin = (orderId, pin) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;
    if (order.pickup_pin !== pin.trim()) {
      showToast('Incorrect Pickup PIN. Please re-check code.', 'error');
      return false;
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered', completed_at: new Date().toISOString() } : o));
    showToast(`Pickup verified for order #${order.order_number}!`);
    return true;
  };

  // Courier accepts delivery
  const acceptDelivery = (orderId) => {
    if (!currentUser || currentUser.role !== 'delivery') {
      showToast('Only active student delivery partners can accept requests.', 'error');
      return;
    }
    const order = orders.find(o => o.id === orderId);
    if (order.delivery_partner_id) {
      showToast('This order has already been taken by another partner.', 'error');
      return;
    }

    setOrders(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'courier_assigned',
      delivery_partner_id: currentUser.id,
      delivery_partner_name: currentUser.name
    } : o));
    showToast(`Accepted order #${order.order_number}! Head to ${order.vendor_name} for pickup.`);
  };

  // Courier marks food collected from vendor
  const collectFood = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'in_transit' } : o));
    showToast('Food collected from cafeteria counter! Now in transit to buyer.');
  };

  // Courier confirms OTP with buyer and marks completed
  const verifyDeliveryOtp = (orderId, otp) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return false;
    if (order.delivery_otp !== otp.trim()) {
      showToast('Invalid OTP entered. Please ask the student buyer for the 4-digit code.', 'error');
      return false;
    }

    const now = new Date().toISOString();
    const todayDate = now.split('T')[0];
    const partnerId = currentUser?.id || 'usr_delivery_1';

    // Mark order completed
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered', completed_at: now } : o));

    // Update Wallet & 5-Delivery Reward System
    setWallets(prev => {
      const currentWallet = prev[partnerId] || {
        user_id: partnerId,
        cash_balance: 0,
        meal_credits: 0,
        deliveries_today: 0,
        last_delivery_date: todayDate,
        total_deliveries: 0,
        transactions: []
      };

      const isSameDay = currentWallet.last_delivery_date === todayDate;
      const deliveriesToday = (isSameDay ? currentWallet.deliveries_today : 0) + 1;
      const target = systemConfig.reward_milestone_target;
      const milestoneReached = deliveriesToday === target;

      const earnedCash = systemConfig.courier_fee;
      const newCashBalance = currentWallet.cash_balance + earnedCash;
      const earnedMealCredit = milestoneReached ? systemConfig.reward_meal_credit : 0;
      const newMealCredits = currentWallet.meal_credits + earnedMealCredit;

      const newTransactions = [
        {
          id: `tx_${Date.now()}_cash`,
          amount: earnedCash,
          type: 'delivery_earning',
          description: `Delivery fee for #${order.order_number} to ${order.delivery_address}`,
          created_at: now
        },
        ...(milestoneReached ? [{
          id: `tx_${Date.now()}_reward`,
          amount: earnedMealCredit,
          type: 'meal_reward_bonus',
          description: `🎉 5th Delivery Completed! Earned ₹${earnedMealCredit} free meal voucher credit!`,
          created_at: now
        }] : []),
        ...(currentWallet.transactions || [])
      ];

      if (milestoneReached) {
        showToast(`🎉 5-DELIVERY MILESTONE UNLOCKED! ₹${earnedCash} added to cash + ₹${earnedMealCredit} FREE MEAL REWARD!`, 'success');
      } else {
        showToast(`Delivery completed! ₹${earnedCash} added to your wallet. (${deliveriesToday}/${target} toward daily free meal).`);
      }

      return {
        ...prev,
        [partnerId]: {
          ...currentWallet,
          cash_balance: newCashBalance,
          meal_credits: newMealCredits,
          deliveries_today: deliveriesToday,
          last_delivery_date: todayDate,
          total_deliveries: currentWallet.total_deliveries + 1,
          transactions: newTransactions
        }
      };
    });

    return true;
  };

  // Courier redeems meal credits
  const redeemMealCredit = (amount = 60) => {
    if (!currentUser) return;
    const partnerId = currentUser.id;
    const currentWallet = wallets[partnerId];

    if (!currentWallet || currentWallet.meal_credits < amount) {
      showToast('Insufficient meal credits to redeem.', 'error');
      return false;
    }

    const now = new Date().toISOString();
    setWallets(prev => ({
      ...prev,
      [partnerId]: {
        ...currentWallet,
        meal_credits: currentWallet.meal_credits - amount,
        transactions: [
          {
            id: `tx_rd_${Date.now()}`,
            amount: -amount,
            type: 'meal_credit_redemption',
            description: `Redeemed ₹${amount} meal credit for cafeteria dining voucher.`,
            created_at: now
          },
          ...currentWallet.transactions
        ]
      }
    }));
    showToast(`Redeemed ₹${amount} meal voucher! Present this confirmation at the cafeteria counter.`);
    return true;
  };

  // Admin Actions
  const verifyUser = (userId, approved) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, is_verified: approved ? 1 : 0 } : u));
    showToast(approved ? 'Student credential verified!' : 'Student verification rejected.', approved ? 'success' : 'amber');
  };

  const updateSystemConfig = (newConfigs) => {
    setSystemConfig(prev => ({ ...prev, ...newConfigs }));
    showToast('Platform operational settings saved.');
  };

  // Impact Calculations
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const basePilotMeals = 184; // baseline empirical campus measurement
  const totalMealsRescued = deliveredOrders.length + basePilotMeals;
  const kgFoodSaved = parseFloat((totalMealsRescued * 0.40).toFixed(1));
  const co2AvoidedKg = parseFloat((kgFoodSaved * 2.5).toFixed(1));
  const waterSavedLiters = Math.round(kgFoodSaved * 380);
  const totalStudentSavings = Math.round(totalMealsRescued * 38.5);
  const vendorRevenueRecovered = Math.round(totalMealsRescued * 42.0);

  const value = {
    users,
    currentUser,
    setCurrentUser,
    activeTab,
    setActiveTab,
    selectedFood,
    setSelectedFood,
    toast,
    showToast,
    login,
    logout,
    switchRole,
    registerStudent,
    registerDeliveryPartner,
    registerVendor,
    listings,
    addListing,
    updateListing,
    deleteListing,
    orders,
    createOrder,
    verifyPickupPin,
    acceptDelivery,
    collectFood,
    verifyDeliveryOtp,
    wallets,
    redeemMealCredit,
    verifyUser,
    systemConfig,
    updateSystemConfig,
    impact: {
      totalMealsRescued,
      kgFoodSaved,
      co2AvoidedKg,
      waterSavedLiters,
      totalStudentSavings,
      vendorRevenueRecovered
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
