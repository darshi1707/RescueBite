import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { 
  Search, 
  SlidersHorizontal, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles, 
  X,
  Bike,
  Utensils,
  Cookie,
  Coffee,
  Flame,
  RotateCcw,
  MapPin,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function MarketplacePage() {
  const { listings, setSelectedFood, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'discount', 'price_asc', 'price_desc', 'quantity'
  const [maxPrice, setMaxPrice] = useState(120);
  const [filterTag, setFilterTag] = useState('all'); // 'all', 'under_40', 'high_discount', 'veg'

  const categories = [
    { name: 'All', icon: Sparkles, count: listings.filter(l => l.status === 'active').length },
    { name: 'Meals', icon: Utensils, count: listings.filter(l => l.category === 'Meals' && l.status === 'active').length },
    { name: 'Snacks', icon: Cookie, count: listings.filter(l => l.category === 'Snacks' && l.status === 'active').length },
    { name: 'Bakery', icon: ShoppingBag, count: listings.filter(l => l.category === 'Bakery' && l.status === 'active').length },
    { name: 'Beverages', icon: Coffee, count: listings.filter(l => l.category === 'Beverages' && l.status === 'active').length },
    { name: 'Combos', icon: Flame, count: listings.filter(l => l.category === 'Combos' && l.status === 'active').length }
  ];

  // Filter listings
  const filteredListings = listings
    .filter((item) => {
      if (item.status !== 'active' || item.quantity_available <= 0) return false;

      const matchesQuery = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrice = item.discounted_price <= maxPrice;

      let matchesTag = true;
      if (filterTag === 'under_40') matchesTag = item.discounted_price <= 40;
      if (filterTag === 'high_discount') matchesTag = item.discount_percent >= 50;

      return matchesQuery && matchesCategory && matchesPrice && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount_percent - a.discount_percent;
      if (sortBy === 'price_asc') return a.discounted_price - b.discounted_price;
      if (sortBy === 'price_desc') return b.discounted_price - a.discounted_price;
      if (sortBy === 'quantity') return b.quantity_available - a.quantity_available;
      return 0; // featured default
    });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(120);
    setSortBy('featured');
    setFilterTag('all');
  };

  return (
    <div className="space-y-8 py-4 animate-fade-in">
      
      {/* 1. Context & Header Bar */}
      <div className="card-white p-6 sm:p-7 border border-[#E8E5DA] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-black text-[#174D38] uppercase tracking-wider font-['Manrope']">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A9D889] ring-2 ring-[#174D38]"></span>
            <span>Adani University & Shantigram Campus Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
            What's good today?
          </h1>
          <p className="text-xs sm:text-sm text-[#777D73] font-normal">
            Fresh surplus meals prepared today by authorized campus cafeterias at 40%–70% discounts.
          </p>
        </div>

        {/* User Status Badge */}
        {currentUser && (
          <div className="flex items-center gap-3.5 bg-[#FAF8F2] p-3 px-4.5 rounded-2xl border border-[#E8E5DA] shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-black text-sm shrink-0 font-['Manrope']">
              🎓
            </div>
            <div>
              <div className="text-xs font-black text-[#103B2B] font-['Manrope']">{currentUser.name}</div>
              <div className="text-[11px] text-[#777D73] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#174D38]" />
                <span>Verified Student ({currentUser.university_id || 'AU2024CS104'})</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Visual Category Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 font-['Manrope'] ${
                isSelected
                  ? 'bg-[#174D38] text-white border-[#174D38] shadow-md transform -translate-y-0.5'
                  : 'bg-white text-[#202820] border-[#E8E5DA] hover:border-[#174D38] hover:bg-[#FAF8F2]'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-white/15 text-[#A9D889]' : 'bg-[#FAF8F2] text-[#174D38]'
              }`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-xs font-black leading-tight">{cat.name}</div>
                <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#777D73]'}`}>
                  {cat.count} available
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Search & Comprehensive Filter Console */}
      <div className="card-white p-5 sm:p-6 bg-white border border-[#E8E5DA] shadow-sm space-y-5">
        
        {/* Search Bar with requested exact placeholder */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#777D73] absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Find your next delicious deal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-2xl border border-[#E8E5DA] bg-[#FAF8F2]/70 text-[#202820] placeholder:text-[#777D73] focus:outline-hidden focus:border-[#174D38] focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-[#777D73] hover:text-[#202820]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 border-t border-[#F0EDE4]">
          
          {/* Quick Context Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all font-['Manrope'] cursor-pointer ${
                filterTag === 'all'
                  ? 'bg-[#174D38] text-white'
                  : 'bg-[#FAF8F2] text-[#777D73] border border-[#E8E5DA] hover:text-[#202820]'
              }`}
            >
              All Items
            </button>

            <button
              onClick={() => setFilterTag('under_40')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all font-['Manrope'] cursor-pointer ${
                filterTag === 'under_40'
                  ? 'bg-[#174D38] text-white'
                  : 'bg-[#FAF8F2] text-[#777D73] border border-[#E8E5DA] hover:text-[#202820]'
              }`}
            >
              Under ₹40 Deals
            </button>

            <button
              onClick={() => setFilterTag('high_discount')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all font-['Manrope'] cursor-pointer ${
                filterTag === 'high_discount'
                  ? 'bg-[#174D38] text-white'
                  : 'bg-[#FAF8F2] text-[#777D73] border border-[#E8E5DA] hover:text-[#202820]'
              }`}
            >
              50%+ Discount
            </button>
          </div>

          {/* Sort & Price Range Slider */}
          <div className="flex flex-wrap items-center gap-5 text-xs">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-[#777D73]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#174D38]" />
              <span className="font-bold text-[#202820] font-['Manrope']">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E8E5DA] bg-white text-xs font-bold text-[#202820] focus:outline-hidden focus:border-[#174D38] font-['Manrope'] cursor-pointer"
              >
                <option value="featured">Featured Deals</option>
                <option value="discount">Highest Discount %</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="quantity">Availability: Most Left</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-2.5 text-[#777D73]">
              <span className="font-bold text-[#202820] font-['Manrope']">Max Price: <strong className="text-[#174D38]">₹{maxPrice}</strong></span>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-32 accent-[#174D38] cursor-pointer"
              />
            </div>

          </div>

        </div>

      </div>

      {/* 4. Food Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="card-white p-14 text-center space-y-4 bg-white border border-dashed border-[#E8E5DA]">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F2] text-[#777D73] flex items-center justify-center mx-auto shadow-2xs">
            <ShoppingBag className="w-7 h-7 text-[#174D38]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-[#202820] font-['Manrope']">No surplus meals match your criteria</h3>
            <p className="text-xs text-[#777D73] max-w-sm mx-auto">
              Try adjusting your search terms, raising your price ceiling, or check back during the next cafeteria service cut-off window.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5 font-['Manrope']"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onSelect={setSelectedFood}
            />
          ))}
        </div>
      )}

    </div>
  );
}
