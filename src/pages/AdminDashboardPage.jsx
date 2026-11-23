import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Sliders, 
  Utensils, 
  Leaf, 
  Save, 
  AlertCircle,
  Package,
  Layers,
  Store,
  Bike,
  Building,
  Check,
  X
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { 
    users, 
    verifyUser, 
    orders, 
    listings, 
    systemConfig, 
    updateSystemConfig, 
    impact,
    showToast
  } = useApp();

  // Config local form state
  const [commissionPct, setCommissionPct] = useState(systemConfig.vendor_commission_pct);
  const [courierFee, setCourierFee] = useState(systemConfig.courier_fee);
  const [coordFee, setCoordFee] = useState(systemConfig.coordination_fee);
  const [rewardTarget, setRewardTarget] = useState(systemConfig.reward_milestone_target);
  const [rewardCredit, setRewardCredit] = useState(systemConfig.reward_meal_credit);
  const [allowedDomains, setAllowedDomains] = useState(systemConfig.allowed_domains);

  // Sub-tab state
  const [activeTabSub, setActiveTabSub] = useState('overview'); // 'overview', 'verifications', 'orders', 'settings'

  // User segments
  const pendingStudents = users.filter(u => u.role === 'student' && u.is_verified === 0);
  const verifiedStudents = users.filter(u => u.role === 'student' && u.is_verified === 1);
  const deliveryCouriers = users.filter(u => u.role === 'delivery');
  const cafeteriaVendors = users.filter(u => u.role === 'vendor');

  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const totalFoodGMV = deliveredOrders.reduce((sum, o) => sum + o.food_price, 0);
  const platformRevenue = Math.round(
    deliveredOrders.reduce((sum, o) => {
      const comm = o.food_price * (commissionPct / 100);
      const coord = o.delivery_type === 'delivery' ? coordFee : 0;
      return sum + comm + coord;
    }, 0)
  );

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateSystemConfig({
      vendor_commission_pct: Number(commissionPct),
      courier_fee: Number(courierFee),
      coordination_fee: Number(coordFee),
      reward_milestone_target: Number(rewardTarget),
      reward_meal_credit: Number(rewardCredit),
      allowed_domains: allowedDomains
    });
  };

  const sidebarItems = [
    { id: 'overview', label: 'Platform Overview', icon: TrendingUp },
    { id: 'verifications', label: 'Verification Queue', icon: Users, badge: pendingStudents.length },
    { id: 'orders', label: 'Order Monitor', icon: Package, badge: orders.length },
    { id: 'settings', label: 'Economics & Rules', icon: Sliders }
  ];

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start animate-fade-in font-['Inter']">
      
      {/* Left Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeTabSub}
        onItemClick={setActiveTabSub}
        userRoleTitle="Campus Superadministrator"
      />

      {/* Main Admin Content Area */}
      <div className="flex-1 w-full space-y-6 min-w-0">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174D38] uppercase tracking-wider font-['Manrope']">
              <ShieldCheck className="w-3.5 h-3.5 text-[#174D38]" />
              <span>Campus Governance Office</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
              Administrative Control Center
            </h1>
            <p className="text-xs sm:text-sm text-[#777D73]">
              Adani University & Shantigram Township • Verification, Policies & Economics
            </p>
          </div>

          <div className="text-right bg-[#FAF8F2] p-3 px-4.5 rounded-2xl border border-[#E1E5D8] shadow-2xs">
            <span className="text-[10px] uppercase font-black text-[#777D73] block font-['Manrope'] tracking-wider">Platform Commission</span>
            <span className="text-2xl font-black text-[#174D38] font-['Manrope']">₹{platformRevenue}</span>
          </div>
        </div>

        {/* 6 Key Platform Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Total Students
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {verifiedStudents.length + pendingStudents.length}
            </div>
            <span className="text-[10.5px] text-[#174D38] font-bold block font-['Manrope']">
              {verifiedStudents.length} verified
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Verified Users
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {verifiedStudents.length + deliveryCouriers.length + cafeteriaVendors.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Ecosystem members
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Active Vendors
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {cafeteriaVendors.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Campus canteens
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Delivery Partners
            </span>
            <div className="text-2xl font-black text-[#B56014] font-['Manrope']">
              {deliveryCouriers.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Active couriers
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Total Orders
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {deliveredOrders.length}
            </div>
            <span className="text-[10.5px] text-[#174D38] font-bold block font-['Manrope']">
              Zero food loss
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Meals Rescued
            </span>
            <div className="text-2xl font-black text-[#174D38] font-['Manrope']">
              {impact.totalMealsRescued}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              {impact.totalFoodSavedKg} kg diverted
            </span>
          </div>
        </div>

        {/* Verification Approval Queue */}
        {(activeTabSub === 'overview' || activeTabSub === 'verifications') && (
          <div className="bg-white rounded-3xl border border-[#E1E5D8] overflow-hidden shadow-xs">
            <div className="px-6 py-4.5 border-b border-[#F0EFE9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4.5 h-4.5 text-[#174D38]" />
                <div>
                  <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Student Identity Verification Queue</h3>
                  <p className="text-xs text-[#777D73]">Review and approve incoming university student profiles</p>
                </div>
              </div>
              <span className="badge-orange text-xs font-black">
                {pendingStudents.length} pending review
              </span>
            </div>

            {pendingStudents.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#777D73] font-['Inter']">
                ✓ All student accounts are verified. No pending items in the institutional queue.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#777D73]">
                  <thead className="bg-[#FAF8F2] text-[#202820] font-black font-['Manrope'] border-b border-[#E1E5D8]">
                    <tr>
                      <th className="px-6 py-3.5">Student Name</th>
                      <th className="px-6 py-3.5">Institutional Email</th>
                      <th className="px-6 py-3.5">Student ID</th>
                      <th className="px-6 py-3.5">Department & Year</th>
                      <th className="px-6 py-3.5">Domain Match</th>
                      <th className="px-6 py-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EFE9]">
                    {pendingStudents.map((student) => {
                      const domain = student.email.split('@')[1];
                      const isAllowed = systemConfig.allowed_domains.includes(domain);

                      return (
                        <tr key={student.id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                          <td className="px-6 py-3.5 font-bold text-[#202820] font-['Manrope']">{student.name}</td>
                          <td className="px-6 py-3.5 font-mono">{student.email}</td>
                          <td className="px-6 py-3.5 font-mono font-bold text-[#103B2B]">{student.university_id}</td>
                          <td className="px-6 py-3.5">{student.department} ({student.year_of_study})</td>
                          <td className="px-6 py-3.5">
                            {isAllowed ? (
                              <span className="badge-lime text-[10px]">Valid Campus Domain</span>
                            ) : (
                              <span className="badge-orange text-[10px]">External Domain</span>
                            )}
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => verifyUser(student.id, true)}
                                className="px-3.5 py-1.5 rounded-xl bg-[#174D38] text-white font-bold text-[11px] hover:bg-[#103B2B] transition-colors shadow-2xs font-['Manrope'] cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => verifyUser(student.id, false)}
                                className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-700 font-bold text-[11px] hover:bg-red-100 transition-colors font-['Manrope'] cursor-pointer flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Platform Economics & Reward Rule Controls Form */}
        {(activeTabSub === 'overview' || activeTabSub === 'settings') && (
          <form 
            onSubmit={handleSaveConfig}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E1E5D8] space-y-6 shadow-xs"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E1E5D8]">
              <div>
                <h3 className="text-base font-black text-[#103B2B] flex items-center gap-2 font-['Manrope']">
                  <Sliders className="w-4.5 h-4.5 text-[#174D38]" />
                  <span>Platform Operational Policy & Reward Parameters</span>
                </h3>
                <p className="text-xs text-[#777D73]">Control take-rates, courier payouts, and meal reward sustainability</p>
              </div>
              <span className="badge-lime text-[11px] font-black">Live Governance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2 bg-[#FAF8F2] p-4 rounded-2xl border border-[#E1E5D8]">
                <div className="flex justify-between text-xs font-bold text-[#202820] font-['Manrope']">
                  <span>Vendor Commission:</span>
                  <span className="text-[#174D38] font-black text-sm">{commissionPct}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={commissionPct}
                  onChange={(e) => setCommissionPct(Number(e.target.value))}
                  className="w-full accent-[#174D38] cursor-pointer"
                />
                <span className="text-[10.5px] text-[#777D73] block">Standard: 10% on discounted order value</span>
              </div>

              <div className="space-y-2 bg-[#FAF8F2] p-4 rounded-2xl border border-[#E1E5D8]">
                <div className="flex justify-between text-xs font-bold text-[#202820] font-['Manrope']">
                  <span>Courier Delivery Payout:</span>
                  <span className="text-[#B56014] font-black text-sm">₹{courierFee}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="1"
                  value={courierFee}
                  onChange={(e) => setCourierFee(Number(e.target.value))}
                  className="w-full accent-[#F2A65A] cursor-pointer"
                />
                <span className="text-[10.5px] text-[#777D73] block">100% credited to student courier wallet</span>
              </div>

              <div className="space-y-2 bg-[#FAF8F2] p-4 rounded-2xl border border-[#E1E5D8]">
                <div className="flex justify-between text-xs font-bold text-[#202820] font-['Manrope']">
                  <span>Platform Coordination Fee:</span>
                  <span className="text-[#103B2B] font-black text-sm">₹{coordFee}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={coordFee}
                  onChange={(e) => setCoordFee(Number(e.target.value))}
                  className="w-full accent-[#174D38] cursor-pointer"
                />
                <span className="text-[10.5px] text-[#777D73] block">Retained by RescueBite per delivery order</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#E1E5D8]">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">
                  Daily Deliveries to Unlock Free Meal Reward:
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={rewardTarget}
                  onChange={(e) => setRewardTarget(Number(e.target.value))}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
                <span className="text-[10.5px] text-[#777D73]">Default milestone: 5 deliveries per calendar day</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">
                  Free Meal Reward Voucher Credit (₹):
                </label>
                <input
                  type="number"
                  min="30"
                  max="120"
                  step="5"
                  value={rewardCredit}
                  onChange={(e) => setRewardCredit(Number(e.target.value))}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
                <span className="text-[10.5px] text-[#777D73]">Default: ₹60 promotional meal credit</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E1E5D8]">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">
                Allowed Institutional Email Domains (Comma-separated):
              </label>
              <input
                type="text"
                value={allowedDomains}
                onChange={(e) => setAllowedDomains(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white font-mono text-[#202820] focus:outline-hidden focus:border-[#174D38]"
              />
              <span className="text-[10.5px] text-[#777D73]">
                Students registering with matching email domains receive immediate verified status.
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 shadow-sm font-['Manrope'] cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#A9D889]" />
                <span>Save Operational Parameters</span>
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}