import React from 'react';
import { Clock, MapPin, ChevronRight, Bike, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';

const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';

export default function FoodCard({ item, onSelect }) {
  const savings = Math.max(0, item.original_price - item.discounted_price);

  return (
    <div 
      onClick={() => onSelect(item)}
      className="card-white overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
    >
      {/* 1. Large Appetizing Food Photography */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF8F2]">
        <img
          src={item.image_url || FALLBACK_FOOD_IMG}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_FOOD_IMG;
          }}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
        />

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F2A65A] text-[#1A1A18] shadow-md font-['Manrope']">
            {item.discount_percent}% OFF
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#174D38]/90 backdrop-blur-md text-white font-['Manrope']">
            {item.category}
          </span>
        </div>

        {/* Portion Remaining Pill Top-Right */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 backdrop-blur-md text-[#174D38] shadow-sm font-['Manrope']">
            {item.quantity_available} left
          </span>
        </div>

        {/* Bottom Banner on Image: Vendor & Cutoff */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1.5 truncate drop-shadow-sm font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#A9D889] shrink-0" />
            <span className="truncate">{item.vendor_name}</span>
          </div>
          <div className="flex items-center gap-1 text-[#F2A65A] font-bold shrink-0 ml-2 drop-shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            <span>by {item.pickup_deadline}</span>
          </div>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base sm:text-lg font-black text-[#202820] group-hover:text-[#174D38] transition-colors line-clamp-1 font-['Manrope']">
            {item.title}
          </h3>

          <p className="text-xs text-[#777D73] line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Fulfillment options & allergen tags */}
          <div className="flex items-center justify-between text-[11px] text-[#777D73] pt-1">
            <span className="truncate">Allergens: {item.allergens || 'None'}</span>
            <span className="flex items-center gap-1 text-[#174D38] font-bold shrink-0 font-['Manrope']">
              <Bike className="w-3.5 h-3.5 text-[#174D38]" />
              <span>Campus Delivery</span>
            </span>
          </div>
        </div>

        {/* 3. Pricing & Call-To-Action */}
        <div className="pt-3.5 border-t border-[#E8E5DA] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#174D38] font-['Manrope']">
                ₹{item.discounted_price}
              </span>
              <span className="text-xs text-[#777D73] line-through font-semibold">
                ₹{item.original_price}
              </span>
            </div>
            <span className="text-[11px] text-[#174D38] font-black block font-['Manrope']">
              Save ₹{savings}
            </span>
          </div>

          <button
            type="button"
            className="btn-primary text-xs py-2 px-4 shadow-sm group-hover:bg-[#103B2B]"
          >
            <span>Reserve Meal</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#A9D889]" />
          </button>
        </div>
      </div>
    </div>
  );
}
