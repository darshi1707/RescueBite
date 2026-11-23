import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Bike, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  Building,
  CreditCard,
  Banknote,
  Sparkles
} from 'lucide-react';

const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';

export default function FoodDetailsModal() {
  const { selectedFood, setSelectedFood, createOrder, systemConfig, currentUser, setActiveTab } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'
  const [deliveryAddress, setDeliveryAddress] = useState('Hostel Block B, Room 204');
  const [paymentMethod, setPaymentMethod] = useState('simulated_upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedFood) return null;

  const courierFee = systemConfig.courier_fee;
  const coordinationFee = systemConfig.coordination_fee;
  const deliveryFee = deliveryType === 'delivery' ? (courierFee + coordinationFee) : 0;
  const foodTotal = selectedFood.discounted_price * quantity;
  const grandTotal = foodTotal + deliveryFee;
  const totalSavings = (selectedFood.original_price - selectedFood.discounted_price) * quantity;

  const handleConfirm = () => {
    if (!currentUser) {
      setSelectedFood(null);
      setActiveTab('login');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        item: selectedFood,
        quantity,
        deliveryType,
        deliveryAddress
      });
      setIsSubmitting(false);
      setSelectedFood(null);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E5DA] flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Large Food Image Frame */}
        <div className="relative md:w-5/12 bg-[#FAF8F2] shrink-0 min-h-[220px] md:min-h-full">
          <img
            src={selectedFood.image_url || FALLBACK_FOOD_IMG}
            alt={selectedFood.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_FOOD_IMG;
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden pointer-events-none"></div>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F2A65A] text-[#1A1A18] shadow-md font-['Manrope']">
              {selectedFood.discount_percent}% OFF
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#174D38] text-white font-['Manrope']">
              {selectedFood.category}
            </span>
          </div>

          <button
            onClick={() => setSelectedFood(null)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 z-20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side: Dish Information & Reservation Flow */}
        <div className="md:w-7/12 p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Header row with Close button on Desktop */}
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-[#174D38] flex items-center gap-1.5 font-['Manrope']">
                  <MapPin className="w-3.5 h-3.5 text-[#174D38]" />
                  <span>{selectedFood.vendor_name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#103B2B] mt-1 leading-snug font-['Manrope']">
                  {selectedFood.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedFood(null)}
                className="hidden md:inline-flex p-2 rounded-full text-[#777D73] hover:bg-[#FAF8F2] hover:text-[#202820] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
              {selectedFood.description}
            </p>

            {/* Timing & Allergen Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <div className="flex items-center gap-1.5 font-black text-[#103B2B] font-['Manrope']">
                  <Clock className="w-3.5 h-3.5 text-[#F2A65A]" />
                  <span>Pickup Deadline</span>
                </div>
                <div className="text-[11.5px] text-[#777D73] font-medium">{selectedFood.pickup_deadline}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] space-y-1">
                <div className="flex items-center gap-1.5 font-black text-[#103B2B] font-['Manrope']">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#174D38]" />
                  <span>Verified Safe</span>
                </div>
                <div className="text-[11.5px] text-[#777D73] font-medium">Prepared fresh today</div>
              </div>
            </div>

            {/* Allergen advisory */}
            <div className="text-xs text-[#777D73] bg-[#FAF8F2] p-3 rounded-2xl border border-[#E8E5DA] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F2A65A] shrink-0" />
              <span><strong>Allergens:</strong> {selectedFood.allergens || 'None reported'}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E5DA]">
              <div>
                <span className="text-xs font-bold text-[#202820] block font-['Manrope']">Select Portions</span>
                <span className="text-[11px] text-[#777D73]">{selectedFood.quantity_available} portions remaining</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl border border-[#E8E5DA] font-bold text-[#202820] hover:bg-[#FAF8F2] flex items-center justify-center text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="font-black text-sm w-5 text-center font-['Manrope']">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(selectedFood.quantity_available, quantity + 1))}
                  className="w-8 h-8 rounded-xl border border-[#E8E5DA] font-bold text-[#202820] hover:bg-[#FAF8F2] flex items-center justify-center text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Fulfillment Selector */}
            <div className="space-y-2 pt-2 border-t border-[#E8E5DA]">
              <span className="text-xs font-bold text-[#202820] block font-['Manrope']">Fulfillment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'border-[#174D38] bg-[#174D38]/5 text-[#103B2B] shadow-2xs ring-1 ring-[#174D38]'
                      : 'border-[#E8E5DA] text-[#777D73] hover:bg-[#FAF8F2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <ShoppingBag className="w-4 h-4 text-[#174D38]" />
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#A9D889]/40 text-[#174D38] font-['Manrope']">FREE</span>
                  </div>
                  <div className="text-xs font-bold text-[#202820] font-['Manrope']">Self-Pickup</div>
                  <div className="text-[10.5px] text-[#777D73]">Collect at canteen counter</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'delivery'
                      ? 'border-[#174D38] bg-[#174D38]/5 text-[#103B2B] shadow-2xs ring-1 ring-[#174D38]'
                      : 'border-[#E8E5DA] text-[#777D73] hover:bg-[#FAF8F2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Bike className="w-4 h-4 text-[#F2A65A]" />
                    <span className="text-[10.5px] font-bold text-[#202820] font-['Manrope']">+₹{courierFee + coordinationFee}</span>
                  </div>
                  <div className="text-xs font-bold text-[#202820] font-['Manrope']">Student Delivery</div>
                  <div className="text-[10.5px] text-[#777D73]">Direct to hostel drop-off</div>
                </button>
              </div>
            </div>

            {/* Delivery address input if delivery selected */}
            {deliveryType === 'delivery' && (
              <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] animate-fade-in">
                <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                  <Building className="w-3.5 h-3.5 text-[#174D38]" />
                  <span>Hostel / Campus Delivery Location:</span>
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Hostel Block B, Room 204 or Central Library"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E5DA] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-1.5 pt-2 border-t border-[#E8E5DA]">
              <span className="text-xs font-bold text-[#202820] block font-['Manrope']">Payment Simulation</span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'simulated_upi' ? 'border-[#174D38] bg-[#174D38]/5' : 'border-[#E8E5DA] hover:bg-[#FAF8F2]'}`}>
                  <input
                    type="radio"
                    name="modal_payment"
                    checked={paymentMethod === 'simulated_upi'}
                    onChange={() => setPaymentMethod('simulated_upi')}
                    className="accent-[#174D38]"
                  />
                  <CreditCard className="w-3.5 h-3.5 text-[#174D38]" />
                  <span className="font-bold text-[#202820] font-['Manrope']">UPI (Simulated)</span>
                </label>
                <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-[#174D38] bg-[#174D38]/5' : 'border-[#E8E5DA] hover:bg-[#FAF8F2]'}`}>
                  <input
                    type="radio"
                    name="modal_payment"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="accent-[#174D38]"
                  />
                  <Banknote className="w-3.5 h-3.5 text-[#174D38]" />
                  <span className="font-bold text-[#202820] font-['Manrope']">Cash on Pickup</span>
                </label>
              </div>
            </div>
          </div>

          {/* Checkout Footer & Action Button */}
          <div className="pt-4 border-t border-[#E8E5DA] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777D73]">
                Total ({quantity} item{quantity > 1 ? 's' : ''}{deliveryType === 'delivery' ? ' + delivery' : ''}):
              </span>
              <div className="text-right">
                <span className="text-xl font-black text-[#103B2B] font-['Manrope']">₹{grandTotal}</span>
                <span className="text-[11px] text-[#174D38] font-black block font-['Manrope']">
                  You save ₹{totalSavings}!
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="btn-accent w-full py-3.5 text-xs font-black shadow-md uppercase tracking-wider font-['Manrope']"
            >
              {isSubmitting ? 'Confirming Reservation...' : `Reserve Meal for ₹${grandTotal}`}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
