import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ShieldCheck, 
  Award, 
  Target, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Sparkles,
  Coins,
  ChevronRight
} from 'lucide-react';

export default function InvestorPage() {
  const [selectedStage, setSelectedStage] = useState(1);

  const stages = [
    {
      id: 1,
      name: 'Stage 1: Campus Pilot',
      subtitle: 'Adani University Campus (5 Vendors)',
      vendors: 5,
      listingsPerDay: 25,
      ordersPerDay: 100,
      aov: 60,
      monthlyGMV: 180000,
      commissionPct: 10,
      commissionRev: 18000,
      coordinationRev: 7200,
      totalRev: 25200,
      rewardExp: 5400,
      operatingExp: 5000,
      netProfit: 14800,
      netMargin: 58.7
    },
    {
      id: 2,
      name: 'Stage 2: Township Expansion',
      subtitle: 'Shantigram Residential & Commercial (20 Vendors)',
      vendors: 20,
      listingsPerDay: 30,
      ordersPerDay: 500,
      aov: 65,
      monthlyGMV: 975000,
      commissionPct: 10,
      commissionRev: 97500,
      coordinationRev: 36000,
      totalRev: 133500,
      rewardExp: 27000,
      operatingExp: 18000,
      netProfit: 88500,
      netMargin: 66.3
    },
    {
      id: 3,
      name: 'Stage 3: University Cluster',
      subtitle: 'Gandhinagar & Ahmedabad Hubs (50 Vendors)',
      vendors: 50,
      listingsPerDay: 35,
      ordersPerDay: 1500,
      aov: 65,
      monthlyGMV: 2925000,
      commissionPct: 10,
      commissionRev: 292500,
      coordinationRev: 108000,
      totalRev: 400500,
      rewardExp: 81000,
      operatingExp: 45000,
      netProfit: 274500,
      netMargin: 68.5
    }
  ];

  const currentStage = stages[selectedStage - 1];

  return (
    <div className="space-y-10 py-6 animate-fade-in font-['Inter']">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F2A65A]/20 text-[#B56014] text-xs font-black uppercase tracking-wider font-['Manrope']">
          <TrendingUp className="w-3.5 h-3.5 text-[#B56014]" />
          <span>Venture Investment Memo</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
          Why Invest in RescueBite?
        </h1>
        <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
          Unlocking the immense potential of India’s 40-million-strong campus circular food economy with zero inventory risk, zero vehicle Capex, and day-one positive contribution margins.
        </p>
      </div>

      {/* 4 Investment Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center font-black text-sm font-['Manrope']">
            01
          </div>
          <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">High Recurring Demand</h3>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Students dine 3 times daily within a confined campus boundary. A 50% discount triggers immediate, organic conversion without costly acquisition.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#F2A65A]/20 text-[#B56014] flex items-center justify-center font-black text-sm font-['Manrope']">
            02
          </div>
          <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Zero-Inventory Model</h3>
          <p className="text-xs text-[#777D73] leading-relaxed">
            RescueBite holds no perishable inventory and operates no kitchens. All surplus food is monetized directly from cafeteria counters to students.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#A9D889]/30 text-[#174D38] flex items-center justify-center font-black text-sm font-['Manrope']">
            03
          </div>
          <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Zero-Capex Fleet</h3>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Deliveries are performed by student walking and cycling couriers between lectures. No electric scooters, no fuel subsidies, no maintenance overhead.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#103B2B]/10 text-[#103B2B] flex items-center justify-center font-black text-sm font-['Manrope']">
            04
          </div>
          <h3 className="text-sm font-black text-[#103B2B] font-['Manrope']">Institutional Moat</h3>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Institutional email domain verification (<code className="text-[#174D38] font-bold font-mono">@adaniuni.ac.in</code>) creates high community trust that general aggregators cannot match.
          </p>
        </div>
      </div>

      {/* Unit Economics Breakdown Card */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#103B2B] font-['Manrope']">Single Delivery Order Unit Economics</h3>
            <p className="text-xs text-[#777D73]">Representative order of a ₹60 discounted meal (50% off ₹120 standard)</p>
          </div>
          <span className="badge-lime text-xs font-black font-['Manrope']">54% Gross Margin</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Total Buyer Invoiced</span>
            <span className="text-xl font-black text-[#103B2B] mt-1 block font-['Manrope']">₹79.00</span>
            <span className="text-[11px] text-[#777D73]">₹60 food + ₹19 delivery</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Vendor Net Payout</span>
            <span className="text-xl font-black text-[#174D38] mt-1 block font-['Manrope']">₹54.00</span>
            <span className="text-[11px] text-[#777D73]">₹60 less 10% commission</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Student Courier Payout</span>
            <span className="text-xl font-black text-[#B56014] mt-1 block font-['Manrope']">₹15.00</span>
            <span className="text-[11px] text-[#777D73]">100% pass-through</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#174D38]/10 border border-[#174D38]/30">
            <span className="text-[#174D38] font-black block font-['Manrope']">Platform Net Contribution</span>
            <span className="text-xl font-black text-[#103B2B] mt-1 block font-['Manrope']">₹5.40</span>
            <span className="text-[11px] text-[#174D38] font-bold">After gateway & reward reserve</span>
          </div>
        </div>
      </div>

      {/* 3-Stage Financial Projections with Interactive Switcher */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E1E5D8] space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-[#103B2B] font-['Manrope']">3-Stage Expansion Financial Model</h3>
            <p className="text-xs text-[#777D73]">Projections based on measured Adani University campus pilot data</p>
          </div>

          {/* Stage Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F2] rounded-2xl border border-[#E1E5D8]">
            {stages.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStage(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer font-['Manrope'] ${
                  selectedStage === s.id
                    ? 'bg-[#174D38] text-white shadow-xs'
                    : 'text-[#777D73] hover:text-[#202820]'
                }`}
              >
                Stage {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stage Banner */}
        <div className="p-6 rounded-3xl bg-[#103B2B] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
          <div>
            <span className="text-xs font-black text-[#A9D889] uppercase tracking-wider font-['Manrope']">
              {currentStage.name}
            </span>
            <h4 className="text-xl font-black mt-1 font-['Manrope']">{currentStage.subtitle}</h4>
            <div className="text-xs text-[#D5DCD0] mt-1">
              {currentStage.vendors} Partner Cafeterias • ~{currentStage.ordersPerDay} Orders/Day • AOV ₹{currentStage.aov}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-[#D5DCD0] block font-bold font-['Manrope']">Monthly Food GMV</span>
            <span className="text-2xl sm:text-3xl font-black text-[#F2A65A] font-['Manrope']">
              ₹{currentStage.monthlyGMV.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Financial Breakdown Table for Selected Stage */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Vendor Commissions</span>
            <span className="text-sm font-black text-[#202820] mt-1 block font-['Manrope']">₹{currentStage.commissionRev.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#777D73]">10% on food sales</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Coordination Fees</span>
            <span className="text-sm font-black text-[#202820] mt-1 block font-['Manrope']">₹{currentStage.coordinationRev.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#777D73]">₹4 / delivery</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#174D38]/5 border border-[#174D38]/20">
            <span className="text-[#174D38] font-black block font-['Manrope']">Gross Revenue</span>
            <span className="text-sm font-black text-[#103B2B] mt-1 block font-['Manrope']">₹{currentStage.totalRev.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#174D38] font-bold">Commissions + Fees</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[#B56014] font-black block font-['Manrope']">Meal Reward Fund</span>
            <span className="text-sm font-black text-[#B56014] mt-1 block font-['Manrope']">₹{currentStage.rewardExp.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#B56014] font-medium">Free meal reserve</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E1E5D8]">
            <span className="text-[#777D73] block font-medium">Operating Overhead</span>
            <span className="text-sm font-black text-[#202820] mt-1 block font-['Manrope']">₹{currentStage.operatingExp.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#777D73]">Cloud & verification</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#A9D889]/30 border-2 border-[#174D38]">
            <span className="text-[#103B2B] font-black block font-['Manrope']">Net Profit</span>
            <span className="text-base font-black text-[#103B2B] mt-1 block font-['Manrope']">₹{currentStage.netProfit.toLocaleString()}</span>
            <span className="text-[10.5px] text-[#174D38] font-extrabold font-['Manrope']">{currentStage.netMargin}% Margin</span>
          </div>
        </div>
      </div>

      {/* The Seed Ask */}
      <div className="bg-[#103B2B] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#A9D889] font-['Manrope']">
              Pre-Seed Financing Round
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 font-['Manrope']">Investment Ask: ₹25 Lakhs ($30,000 USD)</h3>
            <p className="text-xs text-[#D5DCD0] mt-1">
              Catalytic seed capital to scale RescueBite across 15 higher-education campuses in Gujarat.
            </p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-[#F2A65A] text-[#1A1A18] font-black text-xs shrink-0 font-['Manrope'] shadow-md">
            18-Month Runway
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#A9D889] font-black text-xl block font-['Manrope']">40%</span>
            <span className="font-bold block text-white font-['Manrope']">Engineering & Platform</span>
            <p className="text-[11px] text-[#D5DCD0]">Progressive web app, automated FSSAI expiry alerts, real-time dispatch.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-white font-black text-xl block font-['Manrope']">30%</span>
            <span className="font-bold block text-white font-['Manrope']">Campus Operations</span>
            <p className="text-[11px] text-[#D5DCD0]">Cafeteria onboarding, staff training, counter QR display collateral.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#F2A65A] font-black text-xl block font-['Manrope']">20%</span>
            <span className="font-bold block text-white font-['Manrope']">Meal Reward Reserve</span>
            <p className="text-[11px] text-[#D5DCD0]">Underwriting the 5-delivery reward program during initial launch.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-1">
            <span className="text-[#A9D889] font-black text-xl block font-['Manrope']">10%</span>
            <span className="font-bold block text-white font-['Manrope']">Legal & Compliance</span>
            <p className="text-[11px] text-[#D5DCD0]">FSSAI food liability advisories and university administration MOUs.</p>
          </div>
        </div>
      </div>

      {/* Document Notice */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center font-bold text-lg">
            <FileText className="w-5 h-5 text-[#174D38]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#103B2B] font-['Manrope']">Investor Deck & Financial Model Available</h4>
            <p className="text-xs text-[#777D73]">
              `RESCUEBITE_INVESTOR_PITCH.docx` and `RESCUEBITE_PROJECT_REPORT.docx` are ready in the project workspace.
            </p>
          </div>
        </div>
        <span className="badge-lime text-xs font-black font-['Manrope']">Saved in Root</span>
      </div>

    </div>
  );
}