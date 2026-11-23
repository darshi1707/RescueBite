import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  Leaf, 
  TrendingDown, 
  Droplets, 
  Utensils, 
  ShieldCheck, 
  Award, 
  Info, 
  TrendingUp, 
  ArrowRight,
  Globe2,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

export default function ImpactPage() {
  const { impact } = useApp();

  const monthlyImpactData = [
    { month: 'Jun', meals: 45, co2: 45, savings: 1730 },
    { month: 'Jul', meals: 78, co2: 78, savings: 3000 },
    { month: 'Aug', meals: 112, co2: 112, savings: 4310 },
    { month: 'Sep', meals: 140, co2: 140, savings: 5390 },
    { month: 'Oct', meals: 165, co2: 165, savings: 6350 },
    { month: 'Nov (Live)', meals: impact.totalMealsRescued, co2: Math.round(impact.co2AvoidedKg), savings: impact.totalStudentSavings }
  ];

  const wasteComparison = [
    { category: 'Thalis & Meals', saved: 42, wasted: 8 },
    { category: 'Wraps & Rolls', saved: 35, wasted: 5 },
    { category: 'Sandwiches', saved: 58, wasted: 9 },
    { category: 'Rice Bowls', saved: 29, wasted: 4 },
    { category: 'Bakery Combos', saved: 24, wasted: 3 }
  ];

  return (
    <div className="space-y-10 py-6 animate-fade-in font-['Inter']">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#174D38]/10 text-[#174D38] text-xs font-black uppercase tracking-wider font-['Manrope']">
          <Leaf className="w-3.5 h-3.5 text-[#174D38]" />
          <span>ESG & Environmental Accounting</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
          Quantifying Campus Impact
        </h1>
        <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
          Measuring diverted cafeteria food waste, averted greenhouse gas emissions, and student dining savings across Adani University & Shantigram Township.
        </p>
      </div>

      {/* Methodology Alert Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E1E5D8] shadow-xs space-y-2 text-xs text-[#777D73]">
        <div className="flex items-center gap-2 text-[#103B2B] font-black font-['Manrope']">
          <Info className="w-4.5 h-4.5 text-[#174D38]" />
          <span className="text-sm">Scientific Emission Methodology (UNEP & FAO Standards):</span>
        </div>
        <p className="leading-relaxed">
          Carbon calculations use the United Nations Environment Programme (UNEP) Food Waste Index benchmark: 
          <strong> 2.5 kg CO2e per 1.0 kg of prepared food discarded</strong>. 
          Average meal portion weight is standardized at <strong>0.40 kg</strong>. 
          Diverting food waste preserves embedded agricultural resources, conserving an estimated <strong>380 liters of fresh water per kg</strong>.
        </p>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center font-bold">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">Total Meals Rescued</span>
            <div className="text-3xl font-black text-[#103B2B] mt-1 font-['Manrope']">{impact.totalMealsRescued}</div>
            <span className="text-[11px] text-[#174D38] font-black block mt-1 font-['Manrope']">
              ~{impact.kgFoodSaved} kg wholesome food
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#A9D889]/30 text-[#174D38] flex items-center justify-center font-bold">
            <Leaf className="w-5 h-5 text-[#174D38]" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">CO2e Emissions Avoided</span>
            <div className="text-3xl font-black text-[#174D38] mt-1 font-['Manrope']">{impact.co2AvoidedKg} kg</div>
            <span className="text-[11px] text-[#777D73] block mt-1 font-medium">
              Equivalent to 290 km car driving
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">Water Conserved</span>
            <div className="text-3xl font-black text-blue-800 mt-1 font-['Manrope']">{impact.waterSavedLiters.toLocaleString()} L</div>
            <span className="text-[11px] text-[#777D73] block mt-1 font-medium">
              Embedded agricultural water
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#F2A65A]/20 text-[#B56014] flex items-center justify-center font-bold">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#777D73] uppercase tracking-wider block font-['Manrope']">Student Dining Savings</span>
            <div className="text-3xl font-black text-[#B56014] mt-1 font-['Manrope']">₹{impact.totalStudentSavings.toLocaleString()}</div>
            <span className="text-[11px] text-[#777D73] block mt-1 font-medium">
              Direct living cost reduction
            </span>
          </div>
        </div>

      </div>

      {/* Visual Charts: Growth & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Meals Rescued */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Monthly Meals Rescued Trend</h3>
              <p className="text-xs text-[#777D73]">Campus pilot trajectory</p>
            </div>
            <span className="badge-lime text-xs font-black font-['Manrope']">+18% MoM</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyImpactData}>
                <defs>
                  <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#174D38" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#174D38" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5D8" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#777D73' }} />
                <YAxis tick={{ fontSize: 11, fill: '#777D73' }} />
                <Tooltip />
                <Area type="monotone" dataKey="meals" stroke="#174D38" strokeWidth={2} fillOpacity={1} fill="url(#colorMeals)" name="Meals Rescued" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Rescue Breakdown */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Rescued vs Avoided Waste by Category</h3>
              <p className="text-xs text-[#777D73]">Portions diverted from waste bins</p>
            </div>
            <span className="badge-orange text-xs font-black font-['Manrope']">Category Distribution</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteComparison}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5D8" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#777D73' }} />
                <YAxis tick={{ fontSize: 11, fill: '#777D73' }} />
                <Tooltip />
                <Bar dataKey="saved" fill="#174D38" radius={[4, 4, 0, 0]} name="Rescued Portions" />
                <Bar dataKey="wasted" fill="#FAF8F2" stroke="#E1E5D8" radius={[4, 4, 0, 0]} name="Unclaimed Waste" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Sustainable Development Goals (SDG) Alignment */}
      <div className="bg-[#103B2B] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#174D38] text-[#A9D889] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#A9D889] block font-['Manrope']">Global Framework</span>
            <h3 className="text-2xl font-black font-['Manrope']">United Nations Sustainable Development Goals</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#FAF8F2]">
          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <div className="font-black text-sm text-[#A9D889] font-['Manrope']">SDG 12: Responsible Consumption</div>
            <p className="leading-relaxed text-[#D5DCD0]">
              Halving per capita campus food waste at cafeteria retail and dining levels through automated time-discounted distribution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <div className="font-black text-sm text-white font-['Manrope']">SDG 2: Zero Hunger & Nutrition</div>
            <p className="leading-relaxed text-[#D5DCD0]">
              Ensuring nutritious, wholesome meals are accessible to every university student regardless of monthly subsistence budget constraints.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
            <div className="font-black text-sm text-[#F2A65A] font-['Manrope']">SDG 8: Decent Work & Micro-Gig</div>
            <p className="leading-relaxed text-[#D5DCD0]">
              Providing flexible on-campus part-time earnings and meal rewards for student couriers without requiring motorized vehicles.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}