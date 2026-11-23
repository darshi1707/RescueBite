import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { 
  Bike, 
  Wallet, 
  Award, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound, 
  ArrowRight, 
  Sparkles,
  PackageCheck,
  TrendingUp,
  Package,
  Layers,
  ShieldCheck,
  Coins,
  Gift,
  Footprints,
  Compass,
  Check,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export default function DeliveryPartnerPage() {
  const { 
    currentUser, 
    orders, 
    wallets, 
    acceptDelivery, 
    collectFood, 
    verifyDeliveryOtp, 
    registerDeliveryPartner,
    redeemMealCredit,
    systemConfig,
    showToast
  } = useApp();

  // Registration state if not yet courier
  const [vehicleType, setVehicleType] = useState('Bicycle');
  const [deliveryZone, setDeliveryZone] = useState('Central Campus & Hostels');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98111 22334');

  // Sub-tab in courier view
  const [activeTabSub, setActiveTabSub] = useState('overview'); // 'overview', 'requests', 'active', 'rewards', 'ledger'

  // OTP inputs for active deliveries
  const [otpInputs, setOtpInputs] = useState({});

  const partnerId = currentUser?.id || 'usr_delivery_1';
  const courierWallet = wallets[partnerId] || {
    cash_balance: 60.0,
    meal_credits: 0.0,
    deliveries_today: 4,
    total_deliveries: 19,
    transactions: []
  };

  const isCourier = currentUser?.role === 'delivery';

  // Available requests: orders placed with delivery not yet assigned
  const availableRequests = orders.filter(
    o => o.delivery_type === 'delivery' && o.status === 'placed' && !o.delivery_partner_id
  );

  // My active deliveries
  const myActiveDeliveries = orders.filter(
    o => o.delivery_partner_id === partnerId && o.status !== 'delivered' && o.status !== 'cancelled'
  );

  // My completed deliveries
  const myCompletedDeliveries = orders.filter(
    o => o.delivery_partner_id === partnerId && o.status === 'delivered'
  );

  const handleOtpSubmit = (orderId) => {
    const otp = otpInputs[orderId];
    if (!otp || otp.length !== 4) {
      showToast('Please enter the full 4-digit OTP provided by the student buyer.', 'error');
      return;
    }
    verifyDeliveryOtp(orderId, otp);
  };

  // If user is not yet a delivery partner, show "Earn with RescueBite" registration form
  if (!isCourier) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-8 animate-fade-in font-['Inter']">
        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center mx-auto shadow-xs border border-[#174D38]/15">
            <Bike className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2A65A]/15 text-[#B56014] text-[11px] font-black uppercase tracking-wider font-['Manrope']">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
            <span>Student Micro-Earnings Program</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
            Earn with RescueBite
          </h1>
          <p className="text-xs sm:text-sm text-[#777D73] max-w-lg mx-auto font-['Inter'] leading-relaxed">
            Deliver hot cafeteria meals to fellow students between your lectures. Earn ₹{systemConfig.courier_fee} cash per delivery and unlock free daily meals!
          </p>
        </div>

        {/* Highlight Incentive Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-[#FAF8F2] border border-[#E1E5D8] text-[#202820] space-y-3 shadow-xs">
          <div className="flex items-center gap-2.5 font-black text-sm text-[#B56014] font-['Manrope']">
            <div className="w-8 h-8 rounded-xl bg-[#F2A65A]/20 flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-[#F2A65A]" />
            </div>
            <span>The Daily 5-Delivery Meal Incentive</span>
          </div>
          <p className="text-xs text-[#777D73] leading-relaxed font-['Inter']">
            Every completed delivery credits <strong>₹{systemConfig.courier_fee} cash</strong> directly into your account wallet. Complete 5 deliveries within a calendar day to automatically earn a <strong>FREE ₹{systemConfig.reward_meal_credit} Meal Credit Voucher</strong> for the campus dining court!
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-3 bg-white rounded-2xl border border-[#E1E5D8]">
              <span className="text-[10.5px] uppercase font-bold text-[#777D73] block font-['Manrope']">Per Delivery</span>
              <span className="text-base font-black text-[#174D38] font-['Manrope']">₹{systemConfig.courier_fee} Cash</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#E1E5D8]">
              <span className="text-[10.5px] uppercase font-bold text-[#777D73] block font-['Manrope']">Daily Goal</span>
              <span className="text-base font-black text-[#103B2B] font-['Manrope']">5 Deliveries</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#E1E5D8]">
              <span className="text-[10.5px] uppercase font-bold text-[#777D73] block font-['Manrope']">Free Meal</span>
              <span className="text-base font-black text-[#B56014] font-['Manrope']">₹{systemConfig.reward_meal_credit} Credit</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            registerDeliveryPartner({ vehicleType, deliveryZone, phone });
          }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E1E5D8] space-y-5 shadow-xs"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#202820] font-['Manrope']">Student Courier Name</label>
            <input
              type="text"
              disabled
              value={currentUser?.name || 'Aarav Patel'}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2] text-[#777D73] cursor-not-allowed font-medium"
            />
            <span className="text-[11px] text-[#777D73] font-['Inter']">Linked automatically to your verified university profile ({currentUser?.email || 'student@adaniuni.ac.in'})</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#202820] font-['Manrope']">Contact Number (Trip Coordination Only)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820] transition-colors"
              placeholder="+91 98765 43210"
            />
            <span className="text-[11px] text-[#777D73] font-['Inter']">Phone numbers are private and only shared upon order dispatch</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#202820] font-['Manrope']">Preferred Delivery Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Bicycle', icon: Bike, desc: 'Eco friendly' },
                { id: 'Two-wheeler', icon: Flame, desc: 'Quick transit' },
                { id: 'Walking', icon: Footprints, desc: 'Hostel corridors' }
              ].map((mode) => {
                const IconComponent = mode.icon;
                const isSelected = vehicleType === mode.id;
                return (
                  <button
                    type="button"
                    key={mode.id}
                    onClick={() => setVehicleType(mode.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-[#174D38] bg-[#174D38]/5 text-[#103B2B] ring-2 ring-[#174D38]/20 shadow-xs'
                        : 'border-[#E1E5D8] text-[#777D73] hover:bg-[#FAF8F2] hover:border-[#DCE0D4]'
                    }`}
                  >
                    <IconComponent className={`w-4.5 h-4.5 ${isSelected ? 'text-[#174D38]' : 'text-[#777D73]'}`} />
                    <span className="text-xs font-extrabold font-['Manrope'] block">{mode.id}</span>
                    <span className="text-[10px] text-[#777D73]">{mode.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#202820] font-['Manrope']">Preferred Campus Delivery Zone</label>
            <div className="relative">
              <select
                value={deliveryZone}
                onChange={(e) => setDeliveryZone(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38] appearance-none"
              >
                <option value="Central Campus & Hostels">Central Campus & Hostels (Blocks A, B, C)</option>
                <option value="Engineering & Lab Blocks">Engineering & Lab Blocks</option>
                <option value="Management & Admin Complex">Management & Admin Complex</option>
                <option value="Shantigram Township Perimeter">Shantigram Township Perimeter</option>
              </select>
              <Compass className="w-4 h-4 text-[#777D73] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Safety Pledge */}
          <div className="p-4 bg-[#FAF8F2] rounded-2xl text-xs text-[#777D73] border border-[#E1E5D8] space-y-1.5">
            <div className="font-bold text-[#202820] font-['Manrope'] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#174D38]" />
              <span>Campus Courier Safety Standards:</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#174D38] shrink-0" />
              <span>Safe riding on campus pathways (no speeding or rushing).</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#174D38] shrink-0" />
              <span>Handover completed only after student confirms their 4-digit OTP.</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-accent w-full py-3.5 text-xs font-black shadow-md uppercase tracking-wider font-['Manrope'] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bike className="w-4 h-4" />
            <span>Activate Delivery Partner Account</span>
          </button>
        </form>
      </div>
    );
  }

  // Active Courier Dashboard
  const deliveriesToday = courierWallet.deliveries_today || 0;
  const target = systemConfig.reward_milestone_target || 5;
  const progressPercent = Math.min(100, Math.round((deliveriesToday / target) * 100));

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'requests', label: 'Available Requests', icon: Bike, badge: availableRequests.length },
    { id: 'active', label: 'Active Deliveries', icon: Package, badge: myActiveDeliveries.length },
    { id: 'rewards', label: 'Meal Rewards', icon: Award },
    { id: 'ledger', label: 'Earnings Ledger', icon: Wallet }
  ];

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start animate-fade-in font-['Inter']">
      
      {/* Left Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeTabSub}
        onItemClick={setActiveTabSub}
        userRoleTitle="Student Courier Partner"
      />

      {/* Main Delivery Hub Content */}
      <div className="flex-1 w-full space-y-6 min-w-0">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#B56014] uppercase tracking-wider font-['Manrope']">
              <Bike className="w-3.5 h-3.5 text-[#F2A65A]" />
              <span>Campus Delivery Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
              Earn while making a difference.
            </h1>
            <p className="text-xs sm:text-sm text-[#777D73]">
              Courier: <strong className="text-[#202820]">{currentUser?.name}</strong> • Mode: <span className="font-semibold text-[#174D38]">{currentUser?.vehicle_type || 'Bicycle'}</span> • Zone: {currentUser?.delivery_zone || 'Central Campus'}
            </p>
          </div>

          {/* High-Contrast Dual-Wallet Balance Pill */}
          <div className="flex items-center gap-4 bg-[#FAF8F2] p-3.5 rounded-2xl border border-[#E1E5D8] shadow-2xs">
            <div className="text-right">
              <span className="text-[10px] uppercase font-black text-[#777D73] block font-['Manrope'] tracking-wider">Delivery Cash</span>
              <span className="text-xl font-black text-[#174D38] font-['Manrope']">₹{courierWallet.cash_balance}</span>
            </div>
            <div className="h-8 w-px bg-[#DCE0D4]"></div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-black text-[#777D73] block font-['Manrope'] tracking-wider">Meal Credits</span>
              <span className="text-xl font-black text-[#B56014] font-['Manrope']">₹{courierWallet.meal_credits}</span>
            </div>
          </div>
        </div>

        {/* 5 Delivery Partner Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Today's Earnings
            </span>
            <div className="text-2xl font-black text-[#174D38] font-['Manrope']">
              ₹{deliveriesToday * systemConfig.courier_fee}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              {deliveriesToday} completed today
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Available Requests
            </span>
            <div className="text-2xl font-black text-[#B56014] font-['Manrope']">
              {availableRequests.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Waiting for couriers
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Active Trips
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {myActiveDeliveries.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              In transit right now
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Total Deliveries
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {courierWallet.total_deliveries}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Lifetime completed
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Withdrawable
            </span>
            <div className="text-2xl font-black text-[#174D38] font-['Manrope']">
              ₹{courierWallet.cash_balance}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Instant UPI payout
            </span>
          </div>
        </div>

        {/* Motivation Card: Daily 5-Delivery Meal Reward Milestone Tracker */}
        {(activeTabSub === 'overview' || activeTabSub === 'rewards') && (
          <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#174D38]/25 space-y-5 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-bold text-sm shadow-2xs">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-lg font-black text-[#103B2B] font-['Manrope']">
                    Daily Meal Reward Milestone
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#777D73]">
                  Complete 5 successful deliveries today to automatically unlock a <strong>₹{systemConfig.reward_meal_credit} free meal voucher</strong>.
                </p>
              </div>

              <div className="text-right shrink-0 bg-[#FAF8F2] px-4 py-2.5 rounded-2xl border border-[#E1E5D8]">
                <span className="text-2xl font-black text-[#174D38] font-['Manrope']">{deliveriesToday} / {target}</span>
                <span className="text-[10.5px] text-[#777D73] block font-bold font-['Manrope'] uppercase tracking-wider">Deliveries Today</span>
              </div>
            </div>

            {/* Visual Step Indicator (1 to 5) */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((step) => {
                const isCompleted = deliveriesToday >= step;
                const isCurrent = deliveriesToday + 1 === step;

                return (
                  <div
                    key={step}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isCompleted
                        ? 'bg-[#174D38] text-white border-[#174D38] shadow-xs'
                        : isCurrent
                        ? 'bg-[#FAF8F2] text-[#103B2B] border-[#F2A65A] ring-2 ring-[#F2A65A]/30'
                        : 'bg-[#FAF8F2] text-[#777D73] border-[#E1E5D8]'
                    }`}
                  >
                    <div className="text-xs font-black font-['Manrope']">Step {step}</div>
                    <div className="text-[10px] mt-0.5 font-medium">
                      {isCompleted ? '✓ Done (+₹15)' : isCurrent ? 'Next Goal' : 'Locked'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar towards 5 Deliveries */}
            <div className="space-y-1.5">
              <div className="w-full h-3 bg-[#FAF8F2] border border-[#E1E5D8] rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#A9D889] to-[#174D38] rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-[#777D73]">
                <span className="font-bold text-[#103B2B] font-['Manrope']">
                  {deliveriesToday >= target
                    ? '🎉 Daily goal unlocked! ₹60 Free Campus Meal Credit ready to redeem.'
                    : `Complete ${target - deliveriesToday} more delivery today to unlock a ₹${systemConfig.reward_meal_credit} free meal voucher.`}
                </span>
                <span className="font-black text-[#103B2B] font-['Manrope']">{progressPercent}%</span>
              </div>
            </div>

            {/* 1-Click Voucher Redemption if credits available */}
            {courierWallet.meal_credits >= 60 && (
              <div className="pt-3 border-t border-[#E1E5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-[#103B2B] font-medium">
                  You have <strong className="text-[#174D38]">₹{courierWallet.meal_credits}</strong> in meal credits ready to redeem for cafeteria dining!
                </div>
                <button
                  onClick={() => redeemMealCredit(60)}
                  className="btn-accent text-xs py-2 px-4.5 shadow-sm shrink-0 font-['Manrope'] font-black uppercase tracking-wider cursor-pointer"
                >
                  Redeem ₹60 Meal Voucher
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Deliveries Assigned to Me */}
        {(activeTabSub === 'overview' || activeTabSub === 'active') && myActiveDeliveries.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#103B2B] flex items-center gap-2 font-['Manrope']">
              <span>My Active Trips</span>
              <span className="w-5.5 h-5.5 rounded-full bg-[#F2A65A] text-white text-xs flex items-center justify-center font-bold">
                {myActiveDeliveries.length}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myActiveDeliveries.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-3xl border-2 border-[#F2A65A] space-y-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#B56014]">#{order.order_number}</span>
                      <h3 className="text-base font-extrabold text-[#103B2B] mt-0.5 font-['Manrope']">{order.item_title}</h3>
                      <div className="text-xs text-[#777D73] mt-0.5">Student Buyer: <strong className="text-[#202820]">{order.student_name}</strong></div>
                    </div>
                    <span className="badge-orange text-[10.5px]">
                      {order.status === 'courier_assigned' ? 'Collect from Canteen' : 'In Transit'}
                    </span>
                  </div>

                  {order.status === 'courier_assigned' ? (
                    <div className="space-y-3 p-4 bg-[#FAF8F2] rounded-2xl border border-[#E1E5D8]">
                      <p className="text-xs text-[#202820] leading-relaxed">
                        Step 1: Go to <strong>{order.vendor_name}</strong> and ask for order <strong>#{order.order_number}</strong> to pick up the parcel.
                      </p>
                      <button
                        onClick={() => collectFood(order.id)}
                        className="btn-primary w-full text-xs py-2.5 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <PackageCheck className="w-4 h-4 text-[#A9D889]" />
                        <span>Confirm Food Collected</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 bg-[#174D38]/5 rounded-2xl border border-[#174D38]/15">
                      <div className="text-xs text-[#103B2B] font-bold font-['Manrope'] leading-relaxed">
                        Step 2: Deliver to <strong>{order.delivery_address}</strong>. Ask the student buyer for their 4-digit OTP to complete drop-off.
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          maxLength="4"
                          placeholder="Buyer OTP"
                          value={otpInputs[order.id] || ''}
                          onChange={(e) => setOtpInputs({ ...otpInputs, [order.id]: e.target.value })}
                          className="px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE0D4] text-center font-mono font-black tracking-widest bg-white text-[#103B2B] w-32 focus:outline-hidden focus:border-[#174D38]"
                        />
                        <button
                          onClick={() => handleOtpSubmit(order.id)}
                          className="btn-accent flex-1 text-xs py-2.5 font-black shadow-xs font-['Manrope'] cursor-pointer"
                        >
                          Verify & Earn ₹{systemConfig.courier_fee}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Delivery Requests Broadcast Board */}
        {(activeTabSub === 'overview' || activeTabSub === 'requests') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-[#103B2B] font-['Manrope']">Available Delivery Requests</h2>
                <span className="badge-lime text-xs font-bold">
                  {availableRequests.length} waiting
                </span>
              </div>
              <span className="text-xs text-[#777D73]">Pick orders on your walking or cycling route</span>
            </div>

            {availableRequests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#DCE0D4] space-y-2">
                <Bike className="w-9 h-9 text-[#777D73] mx-auto opacity-50" />
                <div className="text-sm font-bold text-[#202820] font-['Manrope']">No unassigned delivery requests right now</div>
                <p className="text-xs text-[#777D73] max-w-sm mx-auto font-['Inter']">
                  New delivery requests appear automatically when students opt for courier delivery at checkout.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRequests.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E1E5D8] space-y-4 flex flex-col justify-between hover:border-[#174D38] transition-colors shadow-2xs hover:shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#777D73]">#{order.order_number}</span>
                        <span className="badge-orange text-xs font-black">
                          Earn ₹{systemConfig.courier_fee}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-[#103B2B] font-['Manrope']">
                        {order.quantity}x {order.item_title}
                      </h3>

                      {/* Route Details with Timeline Connector */}
                      <div className="space-y-2 text-xs text-[#777D73] bg-[#FAF8F2] p-3 rounded-2xl border border-[#E1E5D8]">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#174D38] shrink-0"></div>
                          <span><strong>Collect from:</strong> {order.vendor_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#F2A65A] shrink-0"></div>
                          <span><strong>Deliver to:</strong> {order.delivery_address}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => acceptDelivery(order.id)}
                      className="btn-accent w-full text-xs py-2.5 font-black shadow-xs uppercase tracking-wider font-['Manrope'] cursor-pointer"
                    >
                      Accept Delivery (Earn ₹{systemConfig.courier_fee})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Courier Earnings & Transactions History Ledger */}
        {(activeTabSub === 'overview' || activeTabSub === 'ledger') && (
          <div className="bg-white rounded-3xl border border-[#E1E5D8] overflow-hidden shadow-xs">
            <div className="px-6 py-4.5 border-b border-[#F0EFE9] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Earnings & Delivery Ledger</h3>
                <p className="text-xs text-[#777D73]">Transparent record of delivery fees and meal voucher credits</p>
              </div>
              <span className="text-xs text-[#777D73] font-medium">{courierWallet.total_deliveries} total trips</span>
            </div>

            <div className="divide-y divide-[#F0EFE9]">
              {(courierWallet.transactions || []).length === 0 ? (
                <div className="p-8 text-center text-xs text-[#777D73]">
                  No delivery transactions recorded yet.
                </div>
              ) : (
                (courierWallet.transactions || []).map((tx) => (
                  <div key={tx.id} className="px-6 py-4 flex items-center justify-between text-xs hover:bg-[#FAF8F2]/60 transition-colors">
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#202820] font-['Manrope']">{tx.description}</div>
                      <div className="text-[11px] text-[#777D73]">
                        {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`font-mono font-black text-sm ${tx.amount > 0 ? 'text-[#174D38]' : 'text-[#B56014]'}`}>
                      {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}