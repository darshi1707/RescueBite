import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { 
  Store, 
  PlusCircle, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  KeyRound, 
  TrendingUp, 
  Utensils,
  Package,
  AlertCircle,
  FileText,
  DollarSign,
  Layers,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Image as ImageIcon,
  Check,
  ChefHat
} from 'lucide-react';

const PRESET_FOOD_IMAGES = [
  { label: 'Veg Thali', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80' },
  { label: 'Sandwich', url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
  { label: 'Wrap / Roll', url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80' },
  { label: 'Biryani Bowl', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80' },
  { label: 'Bakery / Snack', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80' },
  { label: 'Beverage', url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80' },
];

export default function VendorDashboardPage() {
  const { 
    currentUser, 
    listings, 
    addListing, 
    updateListing, 
    deleteListing, 
    orders, 
    verifyPickupPin, 
    registerVendor,
    showToast
  } = useApp();

  const isVendor = currentUser?.role === 'vendor';

  // Vendor registration state if not registered
  const [businessName, setBusinessName] = useState('Adani University Food Court');
  const [managerName, setManagerName] = useState('Mr. Rajesh Mehta');
  const [vendorEmail, setVendorEmail] = useState('canteen@adaniuni.ac.in');
  const [vendorPassword, setVendorPassword] = useState('vendor123');
  const [vendorLocation, setVendorLocation] = useState('Central Food Court, Ground Floor');

  // Sidebar sub-tab state
  const [activeTabSub, setActiveTabSub] = useState('overview'); // 'overview', 'listings', 'add', 'orders', 'earnings'

  // Add Surplus Food form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Meals');
  const [newOrigPrice, setNewOrigPrice] = useState('80');
  const [newDiscPrice, setNewDiscPrice] = useState('40');
  const [newQuantity, setNewQuantity] = useState('10');
  const [newDeadline, setNewDeadline] = useState('04:30 PM Today');
  const [newAllergens, setNewAllergens] = useState('Dairy, Gluten');
  const [newImageUrl, setNewImageUrl] = useState(PRESET_FOOD_IMAGES[0].url);

  // Pickup PIN input state
  const [pinInputs, setPinInputs] = useState({});

  // If not logged in as vendor, show vendor registration form
  if (!isVendor) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-8 animate-fade-in font-['Inter']">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center mx-auto shadow-xs border border-[#174D38]/15">
            <Store className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#174D38]/10 text-[#174D38] text-[11px] font-black uppercase tracking-wider font-['Manrope']">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Cafeteria Partner Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
            Cafeteria Partner Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#777D73] max-w-lg mx-auto leading-relaxed">
            Join the campus food rescue network. Recover preparation costs on safe unsold surplus meals before kitchen closing.
          </p>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            registerVendor({
              businessName,
              managerName,
              email: vendorEmail,
              password: vendorPassword,
              location: vendorLocation,
              phone: '+91 79 2555 4000'
            });
          }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E1E5D8] space-y-5 shadow-xs"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#202820] font-['Manrope']">Cafeteria / Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820]"
              placeholder="e.g. Adani Food Court Counter 2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">Manager / Operator Name</label>
              <input
                type="text"
                required
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">Campus Email</label>
              <input
                type="email"
                required
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">Password</label>
              <input
                type="password"
                required
                value={vendorPassword}
                onChange={(e) => setVendorPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">Physical Campus Location</label>
              <input
                type="text"
                required
                value={vendorLocation}
                onChange={(e) => setVendorLocation(e.target.value)}
                placeholder="e.g. Ground Floor, Central Food Court"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] focus:outline-hidden focus:border-[#174D38] bg-white text-[#202820]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 text-xs font-black shadow-md uppercase tracking-wider font-['Manrope'] cursor-pointer"
          >
            Register Cafeteria Partner
          </button>
        </form>
      </div>
    );
  }

  // Active Vendor Dashboard
  const vendorId = currentUser?.id || 'usr_vendor_1';
  const vendorListings = listings.filter(l => l.vendor_id === vendorId || l.vendor_id === 'usr_vendor_1');
  const vendorOrders = orders.filter(o => o.vendor_id === vendorId || o.vendor_id === 'usr_vendor_1');
  const activeOrders = vendorOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const completedVendorOrders = vendorOrders.filter(o => o.status === 'delivered');

  const recoveredRevenue = completedVendorOrders.reduce((sum, o) => sum + (o.food_price * 0.90), 0);
  const portionsRescued = completedVendorOrders.reduce((sum, o) => sum + o.quantity, 0);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Please enter a food title.', 'error');
      return;
    }

    const orig = Number(newOrigPrice);
    const disc = Number(newDiscPrice);
    const qty = Number(newQuantity);

    if (disc >= orig) {
      showToast('Discounted price must be lower than original price.', 'error');
      return;
    }

    const discountPct = Math.round(((orig - disc) / orig) * 100);

    addListing({
      title: newTitle,
      description: newDesc || 'Freshly prepared wholesome campus meal.',
      category: newCategory,
      original_price: orig,
      discounted_price: disc,
      discount_percent: discountPct,
      quantity_available: qty,
      pickup_deadline: newDeadline,
      allergens: newAllergens,
      image_url: newImageUrl
    });

    setNewTitle('');
    setNewDesc('');
    setActiveTabSub('listings');
  };

  const handlePinSubmit = (orderId) => {
    const pin = pinInputs[orderId];
    if (!pin || pin.length !== 4) {
      showToast('Please enter the 4-digit Pickup PIN shown on the student screen.', 'error');
      return;
    }
    verifyPickupPin(orderId, pin);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'listings', label: 'Surplus Listings', icon: Package, badge: vendorListings.length },
    { id: 'add', label: 'Add Surplus Food', icon: PlusCircle },
    { id: 'orders', label: 'Active Orders', icon: FileText, badge: activeOrders.length },
    { id: 'earnings', label: 'Recovered Revenue', icon: DollarSign }
  ];

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start animate-fade-in font-['Inter']">
      
      {/* Left Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeTabSub}
        onItemClick={setActiveTabSub}
        userRoleTitle="Licensed Cafeteria Vendor"
      />

      {/* Main Vendor Content Area */}
      <div className="flex-1 w-full space-y-6 min-w-0">
        
        {/* Top Header Card */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#174D38] uppercase tracking-wider font-['Manrope']">
              <Store className="w-3.5 h-3.5" />
              <span>Cafeteria Management Interface</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
              Good day, {currentUser?.name}.
            </h1>
            <p className="text-xs sm:text-sm text-[#777D73]">
              Operator: <strong className="text-[#202820]">{currentUser?.department}</strong> • ID: <span className="font-mono">{currentUser?.university_id}</span> • Location: {currentUser?.delivery_zone || 'Central Dining Court'}
            </p>
          </div>

          <button
            onClick={() => setActiveTabSub(activeTabSub === 'add' ? 'overview' : 'add')}
            className="btn-accent text-xs py-2.5 px-4.5 flex items-center gap-2 shadow-xs shrink-0 font-['Manrope'] font-black cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{activeTabSub === 'add' ? 'Back to Overview' : 'Add Surplus Food'}</span>
          </button>
        </div>

        {/* 5 Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Active Listings
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              {vendorListings.filter(l => l.status === 'active').length}
            </div>
            <span className="text-[10.5px] text-[#174D38] font-bold block font-['Manrope']">
              Live on marketplace
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Active Orders
            </span>
            <div className="text-2xl font-black text-[#B56014] font-['Manrope']">
              {activeOrders.length}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Waiting for pickup
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Completed Orders
            </span>
            <div className="text-2xl font-black text-[#174D38] font-['Manrope']">
              {completedVendorOrders.length}
            </div>
            <span className="text-[10.5px] text-[#174D38] font-bold block font-['Manrope']">
              Handovers completed
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Revenue Recovered
            </span>
            <div className="text-2xl font-black text-[#103B2B] font-['Manrope']">
              ₹{Math.round(recoveredRevenue)}
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Net 90% payout
            </span>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#E1E5D8] space-y-1 shadow-2xs col-span-2 sm:col-span-1">
            <span className="text-[10.5px] font-bold text-[#777D73] block uppercase tracking-wider font-['Manrope']">
              Food Rescued
            </span>
            <div className="text-2xl font-black text-[#174D38] font-['Manrope']">
              {portionsRescued} <span className="text-xs font-normal text-[#777D73]">portions</span>
            </div>
            <span className="text-[10.5px] text-[#777D73] block font-medium">
              Diverted from waste
            </span>
          </div>
        </div>

        {/* Add Surplus Food Form Drawer / Card */}
        {activeTabSub === 'add' && (
          <form 
            onSubmit={handleAddSubmit}
            className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#174D38]/25 space-y-6 animate-fade-in shadow-xs"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E1E5D8]">
              <div>
                <h3 className="text-base font-black text-[#103B2B] flex items-center gap-2 font-['Manrope']">
                  <PlusCircle className="w-4.5 h-4.5 text-[#174D38]" />
                  <span>Publish New Surplus Food Listing</span>
                </h3>
                <p className="text-xs text-[#777D73]">Upload safe surplus meals 45–60 minutes before kitchen closing</p>
              </div>
              <span className="badge-lime text-[11px] font-black">Verified Kitchen</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Food Item Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Veg Deluxe Thali, Paneer Roll, Triple Decker Sandwich..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                >
                  <option value="Meals">Meals & Thalis</option>
                  <option value="Snacks">Snacks & Sandwiches</option>
                  <option value="Bakery">Bakery & Pastries</option>
                  <option value="Beverages">Beverages & Shakes</option>
                  <option value="Combos">Student Combos</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#202820] font-['Manrope']">Description & Freshness Details</label>
              <textarea
                rows="2"
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Mention freshly prepared time, wholesome ingredients, warm packaging..."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Original Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newOrigPrice}
                  onChange={(e) => setNewOrigPrice(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Discounted Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newDiscPrice}
                  onChange={(e) => setNewDiscPrice(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Portions Available</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>
            </div>

            {/* Quick Image Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#202820] font-['Manrope'] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#174D38]" />
                <span>Select Food Image Preset</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {PRESET_FOOD_IMAGES.map((preset) => (
                  <button
                    type="button"
                    key={preset.label}
                    onClick={() => setNewImageUrl(preset.url)}
                    className={`p-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      newImageUrl === preset.url
                        ? 'border-[#174D38] bg-[#174D38]/5 ring-2 ring-[#174D38] shadow-xs'
                        : 'border-[#E1E5D8] hover:bg-[#FAF8F2]'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-12 object-cover rounded-xl" />
                    <span className="text-[10px] font-bold block mt-1 truncate font-['Manrope']">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Pickup Cutoff Deadline</label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  placeholder="e.g. 05:00 PM Today"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] font-['Manrope']">Allergen Notice</label>
                <input
                  type="text"
                  value={newAllergens}
                  onChange={(e) => setNewAllergens(e.target.value)}
                  placeholder="e.g. Dairy, Gluten, Nuts"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E1E5D8]">
              <button
                type="button"
                onClick={() => setActiveTabSub('overview')}
                className="btn-secondary text-xs py-2.5 px-4.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary text-xs py-2.5 px-6 shadow-sm cursor-pointer"
              >
                Publish to Student Marketplace
              </button>
            </div>
          </form>
        )}

        {/* Counter Handover & Pickup PIN Verification Tool */}
        {(activeTabSub === 'overview' || activeTabSub === 'orders') && (
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-[#103B2B] flex items-center gap-2 font-['Manrope']">
                  <Package className="w-4.5 h-4.5 text-[#174D38]" />
                  <span>Live Counter Orders & Pickup PIN Verification</span>
                </h3>
                <p className="text-xs text-[#777D73]">Enter student 4-digit pickup PIN to verify order collection</p>
              </div>
              <span className="badge-orange text-xs font-black">
                {activeOrders.length} pending pickup
              </span>
            </div>

            {activeOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#777D73] bg-[#FAF8F2] rounded-2xl border border-[#E1E5D8]">
                No active reservations waiting at the counter right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeOrders.map((order) => {
                  const isPickup = order.delivery_type === 'pickup';

                  return (
                    <div key={order.id} className="p-5 rounded-2xl border border-[#E1E5D8] bg-[#FAF8F2] space-y-3.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-mono font-black text-[#174D38]">#{order.order_number}</span>
                          <h4 className="text-sm font-black text-[#103B2B] mt-0.5 font-['Manrope']">
                            {order.quantity}x {order.item_title}
                          </h4>
                          <div className="text-xs text-[#777D73] mt-0.5 font-medium">
                            Student: <strong className="text-[#202820]">{order.student_name}</strong>
                          </div>
                        </div>
                        <span className="badge-lime text-[10.5px]">
                          {isPickup ? 'Self-Pickup' : 'Courier Pickup'}
                        </span>
                      </div>

                      {isPickup ? (
                        <div className="p-3.5 bg-white rounded-xl border border-[#E1E5D8] space-y-2">
                          <span className="text-xs font-bold text-[#202820] block font-['Manrope']">
                            Enter Student's 4-Digit Pickup PIN:
                          </span>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength="4"
                              placeholder="e.g. 7319"
                              value={pinInputs[order.id] || ''}
                              onChange={(e) => setPinInputs({ ...pinInputs, [order.id]: e.target.value })}
                              className="px-3.5 py-2 text-xs rounded-xl border border-[#DCE0D4] font-mono font-black tracking-widest text-center w-32 bg-[#FAF8F2] text-[#103B2B] focus:outline-hidden focus:border-[#174D38]"
                            />
                            <button
                              onClick={() => handlePinSubmit(order.id)}
                              className="btn-primary text-xs py-2 flex-1 shadow-2xs font-['Manrope'] cursor-pointer"
                            >
                              Verify & Handover
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 bg-white rounded-xl border border-[#E1E5D8] text-xs text-[#777D73] space-y-1">
                          <div className="font-bold text-[#103B2B] font-['Manrope']">Courier Delivery Request</div>
                          <div>
                            Courier Status: {order.delivery_partner_name ? (
                              <span className="text-[#174D38] font-bold font-['Manrope']">{order.delivery_partner_name} assigned</span>
                            ) : (
                              <span className="text-[#B56014] font-bold font-['Manrope']">Waiting for courier dispatch</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Professional Food Listings Table */}
        {(activeTabSub === 'overview' || activeTabSub === 'listings') && (
          <div className="bg-white rounded-3xl border border-[#E1E5D8] overflow-hidden shadow-xs">
            <div className="px-6 py-4.5 border-b border-[#F0EFE9] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Today's Surplus Food Listings</h3>
                <p className="text-xs text-[#777D73]">Inventory stock levels and availability indicators</p>
              </div>
              <span className="text-xs text-[#777D73] font-medium">{vendorListings.length} dishes registered</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#777D73]">
                <thead className="bg-[#FAF8F2] text-[#202820] font-black font-['Manrope'] border-b border-[#E1E5D8]">
                  <tr>
                    <th className="px-6 py-3.5">Dish</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Original / Discount</th>
                    <th className="px-6 py-3.5">Available Qty</th>
                    <th className="px-6 py-3.5">Cut-off Deadline</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EFE9]">
                  {vendorListings.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="font-extrabold text-[#202820] font-['Manrope']">{item.title}</div>
                        <div className="text-[11px] text-[#777D73]">{item.allergens}</div>
                      </td>
                      <td className="px-6 py-3.5 font-medium">{item.category}</td>
                      <td className="px-6 py-3.5">
                        <span className="text-[#777D73] line-through mr-1.5">₹{item.original_price}</span>
                        <span className="text-[#103B2B] font-black font-['Manrope']">₹{item.discounted_price}</span>
                      </td>
                      <td className="px-6 py-3.5 font-black text-[#202820] font-['Manrope']">{item.quantity_available}</td>
                      <td className="px-6 py-3.5 font-medium">{item.pickup_deadline}</td>
                      <td className="px-6 py-3.5">
                        <span className={item.status === 'active' ? 'badge-lime text-[10px]' : 'badge-orange text-[10px]'}>
                          {item.status === 'active' ? 'Available' : 'Sold Out'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateListing(item.id, { 
                              status: item.status === 'active' ? 'sold_out' : 'active',
                              quantity_available: item.status === 'active' ? 0 : 6
                            })}
                            className="text-[11px] font-black text-[#174D38] hover:underline font-['Manrope'] cursor-pointer"
                          >
                            {item.status === 'active' ? 'Mark Sold Out' : 'Restock (+6)'}
                          </button>
                          <button
                            onClick={() => deleteListing(item.id)}
                            className="p-1 rounded-lg text-[#777D73] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}