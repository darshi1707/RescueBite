import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Store, 
  ShoppingBag, 
  Bike, 
  Leaf, 
  Clock, 
  Users, 
  TrendingUp,
  Award,
  ShieldCheck,
  ChevronRight,
  Search,
  MapPin,
  HeartHandshake,
  DollarSign
} from 'lucide-react';

export default function LandingPage() {
  const { setActiveTab, impact, listings, setSelectedFood } = useApp();
  const [heroSearchInput, setHeroSearchInput] = useState('');

  // Top active listings for featured surplus section
  const featuredListings = listings
    .filter(item => item.status === 'active' && item.quantity_available > 0)
    .slice(0, 3);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setActiveTab('marketplace');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-28 py-4 animate-fade-in">
      
      {/* 1. Large Editorial Hero Section */}
      <section className="pt-6 sm:pt-10 pb-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#174D38]/10 text-[#174D38] text-xs font-black uppercase tracking-wider font-['Manrope']">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A9D889] ring-2 ring-[#174D38]"></span>
            <span>Campus Food Rescue • Adani University & Shantigram</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#103B2B] leading-[1.06] tracking-tight font-['Manrope']">
            Good Food Deserves <br className="hidden sm:inline" />
            <span className="text-[#174D38] underline decoration-[#A9D889] decoration-6 sm:decoration-8 underline-offset-8">
              Another Chance.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#777D73] leading-relaxed max-w-2xl mx-auto font-normal">
            RescueBite connects campus cafeterias with students to offer safe, wholesome surplus meals at 50% discount. Dine affordably, eliminate kitchen waste, and earn with peer micro-delivery.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="btn-primary text-sm px-7 py-3.5 shadow-md group font-['Manrope']"
            >
              <span>Explore Available Meals</span>
              <ArrowRight className="w-4 h-4 text-[#A9D889] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works-section')}
              className="btn-secondary text-sm px-6 py-3.5 font-['Manrope']"
            >
              <span>How Campus Rescue Works</span>
            </button>
          </div>

          {/* Live Search Bar Preview in Hero */}
          <form 
            onSubmit={handleHeroSearch}
            className="pt-4 max-w-xl mx-auto relative flex items-center"
          >
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#777D73] absolute left-4 top-3.5" />
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Search thali, sandwich, roll, cold brew..."
                className="w-full pl-11 pr-24 py-3 rounded-2xl border border-[#E8E5DA] bg-white text-xs sm:text-sm text-[#202820] shadow-sm focus:outline-hidden focus:border-[#174D38] font-medium"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 btn-primary text-xs py-1.5 px-3.5 font-['Manrope']"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[#777D73]">
            <span className="font-bold text-[#202820] font-['Manrope']">Popular Today:</span>
            {['Veg Thali (50% Off)', 'Paneer Tikka Roll', 'Triple Decker Sandwich', 'Cold Brew'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTab('marketplace')}
                className="px-3 py-1 rounded-full bg-white border border-[#E8E5DA] hover:border-[#174D38] hover:text-[#174D38] transition-all cursor-pointer font-medium text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* 2. Visual Photography Mosaic / Hero Composition */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Food Showcase Card (Large) */}
            <div className="md:col-span-7 relative group">
              <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF8F2]">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=85"
                  alt="Fresh campus healthy grain and vegetable bowl"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none"></div>

                {/* Floating Tag Top Left */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F2A65A] text-[#1A1A18] shadow-md font-['Manrope']">
                    50% OFF FLASH RESCUE
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#174D38] text-white font-['Manrope']">
                    Meals
                  </span>
                </div>

                {/* Bottom Caption on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] uppercase font-black tracking-widest text-[#A9D889] block font-['Manrope']">
                    Adani University Central Food Court
                  </span>
                  <div className="text-lg font-black mt-0.5 font-['Manrope']">Deluxe Freshly Prepared Thalis & Bowls</div>
                  <div className="text-xs text-[#D5DCD0] flex items-center gap-3 mt-1 font-medium">
                    <span>Cut-off: 04:30 PM</span>
                    <span>•</span>
                    <span className="text-[#A9D889] font-bold">₹60 (Originally ₹120)</span>
                  </div>
                </div>
              </div>

              {/* Floating Live Badge */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E8E5DA] flex items-center gap-3 animate-fade-in hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-bold text-sm shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-[#103B2B] font-['Manrope']">FSSAI Safety Verified</div>
                  <div className="text-[11px] text-[#777D73]">Prepared in licensed campus kitchens</div>
                </div>
              </div>
            </div>

            {/* Right Stack Cards */}
            <div className="md:col-span-5 space-y-5">
              
              {/* Secondary Food Card */}
              <div className="card-white p-4 sm:p-5 flex items-center gap-4 hover:border-[#174D38] transition-all cursor-pointer group" onClick={() => setActiveTab('marketplace')}>
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#FAF8F2]">
                  <img
                    src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&auto=format&fit=crop&q=80"
                    alt="Triple decker sandwich"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="badge-orange text-[10px]">Save ₹30</span>
                  <h4 className="text-sm font-black text-[#103B2B] truncate font-['Manrope']">Veg Club Triple Decker</h4>
                  <div className="text-xs text-[#777D73]">Campus Cafe Central</div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-sm font-black text-[#174D38] font-['Manrope']">₹30</span>
                    <span className="text-xs text-[#777D73] line-through">₹60</span>
                  </div>
                </div>
              </div>

              {/* Courier Micro-Delivery Card */}
              <div className="card-white p-4 sm:p-5 flex items-center gap-4 hover:border-[#174D38] transition-all cursor-pointer group" onClick={() => setActiveTab('delivery-partner-register')}>
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#FAF8F2] flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80"
                    alt="Campus bicycle courier"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="badge-fresh text-[10px]">Earn On Campus</span>
                  <h4 className="text-sm font-black text-[#103B2B] truncate font-['Manrope']">Student Couriers Wanted</h4>
                  <div className="text-xs text-[#777D73]">Earn ₹15 / delivery + Free Daily Meal</div>
                  <div className="text-xs font-bold text-[#174D38] pt-0.5 font-['Manrope'] flex items-center gap-1">
                    <span>Activate Courier Account</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Live Ticker Card */}
              <div className="p-4 rounded-2xl bg-[#174D38] text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#A9D889] animate-pulse"></span>
                  <div>
                    <div className="text-xs font-bold text-[#A9D889] font-['Manrope']">Live Campus Impact</div>
                    <div className="text-sm font-black font-['Manrope']">{impact.totalMealsRescued} Meals Rescued</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-white/80">Adani University</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Horizontal Impact Strip: 4 Key Metrics */}
      <section className="card-white p-6 sm:p-8 bg-white border border-[#E8E5DA] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F0EDE4]">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#103B2B] font-['Manrope']">
              Measuring Our Campus Footprint
            </h2>
            <p className="text-xs text-[#777D73] mt-0.5">
              Audited sustainability metrics across Adani University & Shantigram partner kitchens.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#777D73] bg-[#FAF8F2] px-3.5 py-1 rounded-full border border-[#E8E5DA] font-['Manrope']">
            *Audited Campus Pilot Data
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Meals Rescued
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#103B2B] font-['Manrope']">
              {impact.totalMealsRescued}
            </div>
            <span className="text-xs font-bold text-[#174D38] block pt-1 font-['Manrope']">
              Wholesome portions diverted
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Food Waste Avoided
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#103B2B] font-['Manrope']">
              {impact.totalFoodSavedKg} <span className="text-lg font-medium text-[#777D73]">kg</span>
            </div>
            <span className="text-xs font-bold text-[#174D38] block pt-1 font-['Manrope']">
              Kept out of waste disposal
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Student Dining Savings
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#103B2B] font-['Manrope']">
              ₹{impact.totalStudentSavings.toLocaleString()}
            </div>
            <span className="text-xs font-bold text-[#B56014] block pt-1 font-['Manrope']">
              Saved on dining budgets
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">
              Partner Cafeterias
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#103B2B] font-['Manrope']">
              5 <span className="text-base font-medium text-[#777D73]">Canteens</span>
            </div>
            <span className="text-xs font-bold text-[#174D38] block pt-1 font-['Manrope']">
              ₹{impact.vendorRevenueRecovered.toLocaleString()} kitchen losses recovered
            </span>
          </div>
        </div>
      </section>

      {/* 3. Interactive 3-Step "How It Works" Section */}
      <section id="how-it-works-section" className="space-y-12 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#174D38] font-['Manrope']">
            Circular Food Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
            How RescueBite Works
          </h2>
          <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
            Designed around university dining timetables and cafeteria closing routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="card-white p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-black text-lg font-['Manrope'] shadow-xs">
              1
            </div>
            <h3 className="text-lg font-black text-[#103B2B] font-['Manrope']">
              Vendors list surplus meals.
            </h3>
            <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
              Cafeterias list their safe, freshly prepared unsold meals 45–60 minutes before closing at 40%–70% discounts with allergen notes and pickup cut-offs.
            </p>
            <div className="pt-2 text-xs font-bold text-[#174D38] flex items-center gap-1.5 font-['Manrope']">
              <CheckCircle2 className="w-4 h-4 text-[#174D38]" />
              <span>Zero kitchen prep waste</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-white p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#A9D889] text-[#103B2B] flex items-center justify-center font-black text-lg font-['Manrope'] shadow-xs">
              2
            </div>
            <h3 className="text-lg font-black text-[#103B2B] font-['Manrope']">
              Students reserve at discount.
            </h3>
            <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
              Verified university students browse live dishes, choose portions, and reserve meals with zero surge pricing via simulated UPI or counter cash.
            </p>
            <div className="pt-2 text-xs font-bold text-[#174D38] flex items-center gap-1.5 font-['Manrope']">
              <CheckCircle2 className="w-4 h-4 text-[#174D38]" />
              <span>Instant 4-digit pickup codes</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-white p-7 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#F2A65A] text-[#1A1A18] flex items-center justify-center font-black text-lg font-['Manrope'] shadow-xs">
              3
            </div>
            <h3 className="text-lg font-black text-[#103B2B] font-['Manrope']">
              Collect or receive delivery.
            </h3>
            <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
              Pick up your meal directly at the canteen counter, or opt for peer delivery to your hostel room by a registered student courier earning flexible cash.
            </p>
            <div className="pt-2 text-xs font-bold text-[#B56014] flex items-center gap-1.5 font-['Manrope']">
              <Bike className="w-4 h-4 text-[#B56014]" />
              <span>Flexible 15-min delivery</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Featured Live Surplus Meals Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E5DA]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#174D38] uppercase tracking-wider font-['Manrope']">
              <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
              <span>Available Right Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
              Featured Surplus Meals
            </h2>
            <p className="text-xs sm:text-sm text-[#777D73]">
              Grab a meal before the cafeteria pickup window closes. Verified safe, freshly cooked, and 50% off.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="btn-secondary text-xs py-2 px-4 shrink-0 font-['Manrope']"
          >
            <span>View All Surplus Dishes</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#174D38]" />
          </button>
        </div>

        {/* 3 Featured Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map(item => (
            <FoodCard 
              key={item.id} 
              item={item} 
              onSelect={setSelectedFood} 
            />
          ))}
        </div>
      </section>

      {/* 5. Three-Sided Ecosystem Architectural Showcase */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#174D38] font-['Manrope']">
            Mutual Campus Value
          </span>
          <h2 className="text-3xl font-black text-[#103B2B] font-['Manrope']">
            Built for Every Stakeholder
          </h2>
          <p className="text-xs sm:text-sm text-[#777D73]">
            When food waste is eliminated, students, kitchens, and couriers all benefit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Benefit 1: For Students */}
          <div className="card-white overflow-hidden flex flex-col justify-between">
            <div className="aspect-16/10 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
                alt="Student affordable healthy dining"
                className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#174D38] font-['Manrope']">
                  For Students
                </span>
                <h3 className="text-xl font-black text-[#103B2B] font-['Manrope']">
                  "Eat well. Spend less."
                </h3>
                <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
                  Enjoy wholesome, freshly cooked food from your favorite campus cafeterias at 40%–70% discount. Save ₹1,500+ every month without sacrificing nutritional quality.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="btn-primary w-full text-xs py-2.5 mt-2"
              >
                Explore Student Deals
              </button>
            </div>
          </div>

          {/* Benefit 2: For Cafeterias */}
          <div className="card-white overflow-hidden flex flex-col justify-between">
            <div className="aspect-16/10 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
                alt="Cafeteria operations and kitchen"
                className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#174D38] font-['Manrope']">
                  For Cafeterias
                </span>
                <h3 className="text-xl font-black text-[#103B2B] font-['Manrope']">
                  "Turn surplus into revenue."
                </h3>
                <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
                  Turn unsold kitchen portions into recovered revenue before closing. Eliminate food disposal fees and showcase your cafeteria as a campus sustainability leader.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('vendor-register')}
                className="btn-secondary w-full text-xs py-2.5 mt-2"
              >
                Partner as a Cafeteria
              </button>
            </div>
          </div>

          {/* Benefit 3: For Delivery Partners */}
          <div className="card-white overflow-hidden flex flex-col justify-between">
            <div className="aspect-16/10 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80"
                alt="Student bicycle delivery partner"
                className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
              />
            </div>
            <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#B56014] font-['Manrope']">
                    For Delivery Partners
                  </span>
                  <span className="badge-orange text-[10.5px]">Daily Free Meal</span>
                </div>
                <h3 className="text-xl font-black text-[#103B2B] font-['Manrope']">
                  "Earn on your schedule."
                </h3>
                <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
                  Deliver food on campus by walking or cycling during lecture gaps. Earn ₹15 per drop plus automatically unlock a free ₹60 daily meal credit after 5 deliveries.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('delivery-partner-register')}
                className="btn-accent w-full text-xs py-2.5 mt-2"
              >
                Earn With RescueBite
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Grand Closing Green CTA Section */}
      <section className="rounded-3xl bg-[#174D38] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#A9D889] text-xs font-black font-['Manrope']">
            <Leaf className="w-4 h-4 text-[#A9D889]" />
            <span>Adani University & Shantigram Township</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-['Manrope']">
            Make Every Meal Count.
          </h2>

          <p className="text-sm sm:text-base text-[#FAF8F2] leading-relaxed max-w-lg mx-auto font-normal">
            Join the students, cafeteria operators, and student couriers transforming campus surplus food into affordable meals and measurable environmental impact.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('student-register')}
              className="btn-lime text-xs px-7 py-3.5 shadow-lg"
            >
              Join RescueBite
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-6 py-3.5 rounded-xl font-bold text-xs bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all font-['Manrope']"
            >
              Explore Available Meals
            </button>
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#A9D889]/15 rounded-full blur-3xl pointer-events-none"></div>
      </section>

    </div>
  );
}
