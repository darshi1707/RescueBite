import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  KeyRound, 
  CheckCircle2, 
  Bike, 
  Leaf, 
  TrendingDown, 
  ArrowRight, 
  PiggyBank, 
  User, 
  Package, 
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function StudentDashboard() {
  const { orders, currentUser, setActiveTab, listings, setSelectedFood } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('orders'); // 'orders', 'history', 'impact', 'profile'

  const studentOrders = currentUser 
    ? orders.filter(o => o.student_id === currentUser.id)
    : orders;

  const activeOrders = studentOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = studentOrders.filter(o => o.status === 'delivered');

  const totalSpent = pastOrders.reduce((sum, o) => sum + o.total_price, 0);
  const totalMealsRescued = pastOrders.length;
  const totalSaved = Math.round(totalSpent * 0.95);
  const kgFoodSaved = (totalMealsRescued * 0.40).toFixed(1);

  // Recommendations: active listings
  const recommendedFood = listings.filter(l => l.status === 'active' && l.quantity_available > 0).slice(0, 3);

  const sidebarItems = [
    { id: 'orders', label: 'Active Reservations', icon: Package, badge: activeOrders.length },
    { id: 'history', label: 'Order Receipts', icon: FileText, badge: pastOrders.length },
    { id: 'impact', label: 'Savings & Impact', icon: PiggyBank },
    { id: 'profile', label: 'Student Profile', icon: User }
  ];

  return (
    <div className="py-4 flex flex-col lg:flex-row gap-6 items-start animate-fade-in">
      
      {/* 1. Left Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeTabSub}
        onItemClick={setActiveTabSub}
        userRoleTitle="Verified Student Buyer"
      />

      {/* 2. Main Student Hub */}
      <div className="flex-1 w-full space-y-7 min-w-0">
        
        {/* Top Greeting Header */}
        <div className="card-white p-6 sm:p-7 border border-[#E8E5DA] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'}!
              </h1>
              {currentUser?.is_verified === 1 && (
                <span className="badge-fresh text-[11px] font-black">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#174D38]" />
                  Verified Student
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#777D73]">
              University ID: <code className="font-bold text-[#202820] bg-[#FAF8F2] px-2 py-0.5 rounded-md border border-[#E8E5DA]">{currentUser?.university_id || 'AU2024CS104'}</code> • {currentUser?.department}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="btn-primary text-xs py-2.5 px-4.5 shrink-0 shadow-xs"
          >
            <span>Explore Food</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A9D889]" />
          </button>
        </div>

        {/* 4 Summary Statistic Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-white p-5 space-y-1 bg-white">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Total Orders
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#103B2B] font-['Manrope']">
              {studentOrders.length}
            </div>
            <span className="text-[11.5px] text-[#777D73] block font-medium">
              {pastOrders.length} completed
            </span>
          </div>

          <div className="card-white p-5 space-y-1 bg-white">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Money Saved
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#174D38] font-['Manrope']">
              ₹{totalSaved}
            </div>
            <span className="text-[11.5px] font-bold text-[#174D38] block font-['Manrope']">
              ~50% dining savings
            </span>
          </div>

          <div className="card-white p-5 space-y-1 bg-white">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Meals Rescued
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#103B2B] font-['Manrope']">
              {totalMealsRescued}
            </div>
            <span className="text-[11.5px] text-[#777D73] block font-medium">
              Portions kept from bins
            </span>
          </div>

          <div className="card-white p-5 space-y-1 bg-white">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Active Reservations
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#B56014] font-['Manrope']">
              {activeOrders.length}
            </div>
            <span className="text-[11.5px] text-[#777D73] block font-medium">
              Awaiting pickup/drop
            </span>
          </div>
        </div>

        {/* Tab 1: Active Reservations & Verification Codes */}
        {activeTabSub === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#103B2B] flex items-center gap-2 font-['Manrope']">
                <span>Active Reservations</span>
                {activeOrders.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#174D38] text-[#A9D889] text-xs flex items-center justify-center font-bold font-['Manrope']">
                    {activeOrders.length}
                  </span>
                )}
              </h2>
              <span className="text-xs text-[#777D73]">Present code at handover</span>
            </div>

            {activeOrders.length === 0 ? (
              <div className="card-white p-12 text-center space-y-3 bg-white border border-dashed border-[#E8E5DA]">
                <ShoppingBag className="w-10 h-10 text-[#777D73] mx-auto opacity-60" />
                <div className="text-base font-bold text-[#202820] font-['Manrope']">No active reservations right now</div>
                <p className="text-xs text-[#777D73] max-w-sm mx-auto">
                  Explore cafeteria surplus deals to save money and divert wholesome food from waste.
                </p>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="btn-primary text-xs py-2 px-4 mt-2 shadow-xs"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeOrders.map((order) => {
                  const isDelivery = order.delivery_type === 'delivery';

                  return (
                    <div
                      key={order.id}
                      className="card-white p-6 border-2 border-[#174D38]/30 space-y-4 shadow-sm bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-mono font-black text-[#174D38]">
                            #{order.order_number}
                          </span>
                          <h3 className="text-base font-extrabold text-[#103B2B] mt-0.5 font-['Manrope']">
                            {order.quantity}x {order.item_title}
                          </h3>
                          <div className="text-xs text-[#777D73] flex items-center gap-1.5 mt-0.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#174D38]" />
                            <span>{order.vendor_name}</span>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-black bg-[#A9D889]/30 text-[#174D38] border border-[#A9D889] font-['Manrope']">
                          {order.status === 'placed' ? 'Order Confirmed' :
                           order.status === 'courier_assigned' ? 'Courier Assigned' :
                           order.status === 'in_transit' ? 'In Transit' : order.status}
                        </span>
                      </div>

                      {/* High-Contrast Verification Code Ticket Box */}
                      <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-2">
                        {isDelivery ? (
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                                <KeyRound className="w-4 h-4 text-[#F2A65A]" />
                                <span>Your Delivery OTP:</span>
                              </span>
                              <span className="text-lg font-black font-mono tracking-widest px-3.5 py-1 bg-[#F2A65A]/20 text-[#B56014] rounded-xl border border-[#F2A65A]/40">
                                {order.delivery_otp}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#777D73] mt-1.5 leading-snug">
                              Provide this 4-digit OTP to your student courier when receiving food at <strong>{order.delivery_address}</strong>.
                            </p>
                            {order.delivery_partner_name && (
                              <div className="text-xs font-bold text-[#174D38] mt-2 flex items-center gap-1.5 font-['Manrope']">
                                <Bike className="w-3.5 h-3.5 text-[#F2A65A]" />
                                <span>Assigned Courier: {order.delivery_partner_name}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                                <KeyRound className="w-4 h-4 text-[#174D38]" />
                                <span>Counter Pickup PIN:</span>
                              </span>
                              <span className="text-lg font-black font-mono tracking-widest px-3.5 py-1 bg-[#A9D889]/40 text-[#103B2B] rounded-xl border border-[#A9D889]">
                                {order.pickup_pin}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#777D73] mt-1.5 leading-snug">
                              Show this 4-digit code at the <strong>{order.vendor_name}</strong> counter to collect your order.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Order Details Line */}
                      <div className="flex items-center justify-between text-xs text-[#777D73] pt-1 border-t border-[#F0EDE4]">
                        <span>Fulfillment: <strong className="capitalize text-[#202820] font-['Manrope']">{order.delivery_type}</strong></span>
                        <span className="font-black text-sm text-[#103B2B] font-['Manrope']">Total: ₹{order.total_price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Past Orders History Receipts */}
        {(activeTabSub === 'history' || activeTabSub === 'orders') && (
          <div className="card-white rounded-3xl border border-[#E8E5DA] overflow-hidden shadow-sm bg-white">
            <div className="px-6 py-5 border-b border-[#F0EDE4] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Order Receipts History</h3>
                <p className="text-xs text-[#777D73]">All verified meal rescues</p>
              </div>
              <span className="text-xs text-[#777D73] font-medium">{pastOrders.length} completed rescues</span>
            </div>

            {pastOrders.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#777D73]">
                No completed order receipts yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#777D73]">
                  <thead className="bg-[#FAF8F2] text-[#202820] font-black font-['Manrope'] border-b border-[#E8E5DA]">
                    <tr>
                      <th className="px-6 py-3.5">Order #</th>
                      <th className="px-6 py-3.5">Dish & Cafeteria</th>
                      <th className="px-6 py-3.5">Qty</th>
                      <th className="px-6 py-3.5">Fulfillment</th>
                      <th className="px-6 py-3.5">Total Paid</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EDE4]">
                    {pastOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                        <td className="px-6 py-4 font-mono font-black text-[#103B2B]">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-extrabold text-[#202820] font-['Manrope']">{order.item_title}</div>
                          <div className="text-[11px] text-[#777D73]">{order.vendor_name}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-[#202820]">{order.quantity}</td>
                        <td className="px-6 py-4 capitalize font-medium">{order.delivery_type}</td>
                        <td className="px-6 py-4 font-black text-[#103B2B] font-['Manrope']">₹{order.total_price}</td>
                        <td className="px-6 py-4 text-[#777D73]">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="badge-fresh text-[10px]">Delivered</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Personal Savings & Impact Details */}
        {activeTabSub === 'impact' && (
          <div className="card-white p-7 space-y-5 bg-white border border-[#E8E5DA]">
            <h3 className="text-base font-black text-[#103B2B] font-['Manrope']">Your Campus Food Rescue Footprint</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-xs text-[#777D73] font-bold uppercase font-['Manrope']">Total Portions Saved</span>
                <div className="text-3xl font-black text-[#103B2B] font-['Manrope']">{totalMealsRescued}</div>
                <span className="text-xs text-[#174D38] font-bold block">Kept out of campus waste</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-xs text-[#777D73] font-bold uppercase font-['Manrope']">Total Budget Saved</span>
                <div className="text-3xl font-black text-[#174D38] font-['Manrope']">₹{totalSaved}</div>
                <span className="text-xs text-[#174D38] font-bold block">Compared to standard retail</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-xs text-[#777D73] font-bold uppercase font-['Manrope']">Carbon Emissions Averted</span>
                <div className="text-3xl font-black text-[#B56014] font-['Manrope']">{(kgFoodSaved * 2.5).toFixed(1)} kg</div>
                <span className="text-xs text-[#B56014] font-bold block">UNEP Food Waste Factor</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Student Profile Details */}
        {activeTabSub === 'profile' && (
          <div className="card-white p-7 space-y-5 bg-white border border-[#E8E5DA]">
            <h3 className="text-base font-black text-[#103B2B] font-['Manrope']">Student Account Credentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-[#777D73] font-bold">Full Name</span>
                <div className="text-sm font-bold text-[#202820]">{currentUser?.name}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-[#777D73] font-bold">University Email</span>
                <div className="text-sm font-mono font-bold text-[#202820]">{currentUser?.email}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-[#777D73] font-bold">Enrollment Number</span>
                <div className="text-sm font-mono font-bold text-[#103B2B]">{currentUser?.university_id}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <span className="text-[#777D73] font-bold">Department / Year</span>
                <div className="text-sm font-bold text-[#202820]">{currentUser?.department} • {currentUser?.year_of_study}</div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Surplus Food Row */}
        {recommendedFood.length > 0 && (
          <div className="space-y-4 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#103B2B] font-['Manrope']">Recommended for You Today</h3>
                <p className="text-xs text-[#777D73]">Available before cafeteria closing hours</p>
              </div>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="text-xs font-black text-[#174D38] hover:underline flex items-center gap-1 font-['Manrope']"
              >
                <span>View all deals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recommendedFood.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onSelect={setSelectedFood}
                />
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
