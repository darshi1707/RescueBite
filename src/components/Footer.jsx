import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { Utensils, Shield, FileText, ArrowUpRight, Leaf, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#103B2B] text-[#FAF8F2] mt-32 border-t border-[#174D38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Campus Attribution */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#174D38] text-[#A9D889] flex items-center justify-center shadow-xs">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-['Manrope']">
                RescueBite
              </span>
            </div>

            <p className="text-xs text-[#D5DCD0] leading-relaxed font-normal">
              Good food deserves another chance. A campus-based circular food network connecting students, cafeterias, and peer delivery partners across Adani University & Shantigram Township.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#A9D889] font-['Manrope']">
              <MapPin className="w-4 h-4 text-[#A9D889]" />
              <span>Adani University & Shantigram Township</span>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-['Manrope']">
              Explore RescueBite
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5DCD0]">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-[#A9D889] transition-colors">
                  Available Surplus Dishes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('landing')} className="hover:text-[#A9D889] transition-colors">
                  How Campus Rescues Work
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('delivery-partner-register')} className="hover:text-[#F2A65A] transition-colors flex items-center gap-1">
                  <span>Earn With Us (Student Couriers)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('vendor-register')} className="hover:text-[#A9D889] transition-colors">
                  For Cafeteria Operators
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('student-register')} className="hover:text-[#A9D889] transition-colors">
                  University Student Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Strategy & Documentation */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-['Manrope']">
              Startup Pitch & Strategy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5DCD0]">
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-[#A9D889] transition-colors">
                  UNEP Carbon Accounting Model
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bmc')} className="hover:text-[#A9D889] transition-colors">
                  Business Model Canvas (9 Blocks)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('investor')} className="hover:text-[#A9D889] transition-colors">
                  Investor Pitch & Unit Economics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-[#A9D889] transition-colors">
                  Campus Governance Console
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#A9D889] flex items-center gap-1.5 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>Word Reports (.docx) in Project Root</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Trust & Verification */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-['Manrope']">
              Campus Trust & Verification
            </h4>
            <p className="text-xs text-[#D5DCD0] leading-relaxed">
              Institutional validation ensures student-only access. Full student IDs and contact details remain protected and private.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#A9D889] font-bold font-['Manrope']">
                <Shield className="w-4 h-4" />
                <span>Enforced Email Domain</span>
              </div>
              <p className="text-[11px] text-[#A9B3A2]">
                Whitelisted domain: <code className="text-[#F2A65A] font-black">@adaniuni.ac.in</code>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9B3A2] gap-4">
          <div>
            © {new Date().getFullYear()} RescueBite. Adani University & Shantigram Township, Ahmedabad.
          </div>
          <div className="flex items-center gap-3 text-[11.5px]">
            <span className="flex items-center gap-1.5 text-[#D5DCD0]">
              <Leaf className="w-3.5 h-3.5 text-[#A9D889]" />
              <span>UN SDG #12: Responsible Consumption</span>
            </span>
            <span>•</span>
            <span>Zero Food Waste Campus Pilot</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
