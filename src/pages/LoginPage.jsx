import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  Utensils, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Bike, 
  Store, 
  User,
  GraduationCap
} from 'lucide-react';

export default function LoginPage() {
  const { login, switchRole, setActiveTab } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleManualLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const demoAccounts = [
    {
      role: 'student',
      title: 'Verified Student Buyer',
      email: 'student@adaniuni.ac.in',
      name: 'Aarav Patel',
      desc: 'Browse surplus meals at 50% discount, reserve with PIN/OTP, track savings',
      badge: '@adaniuni.ac.in',
      icon: GraduationCap,
      color: 'text-[#174D38] bg-[#174D38]/10'
    },
    {
      role: 'delivery',
      title: 'Student Delivery Partner',
      email: 'delivery@adaniuni.ac.in',
      name: 'Rohan Sharma',
      desc: 'Active courier (4/5 deliveries completed today). Accept 1 delivery to unlock 5th Free Meal Reward!',
      badge: '4/5 Daily Goal',
      icon: Bike,
      color: 'text-[#B56014] bg-[#F2A65A]/15'
    },
    {
      role: 'vendor',
      title: 'Cafeteria Operator',
      email: 'canteen@adaniuni.ac.in',
      name: 'Adani University Food Court',
      desc: 'Publish surplus dishes before cut-off, verify counter pickup PINs, track revenue',
      badge: 'Certified Vendor',
      icon: Store,
      color: 'text-[#174D38] bg-[#174D38]/10'
    },
    {
      role: 'admin',
      title: 'Campus Administrator',
      email: 'admin@rescuebite.com',
      name: 'Governance Office',
      desc: 'Approve student IDs, configure commission rates and delivery fees, monitor ESG',
      badge: 'Superadmin',
      icon: ShieldCheck,
      color: 'text-[#103B2B] bg-[#103B2B]/10'
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto animate-fade-in font-['Inter']">
      <div className="overflow-hidden flex flex-col md:flex-row shadow-xl border border-[#E1E5D8] rounded-3xl bg-white">
        
        {/* Left Side: Brand Panel with High-Res Photography */}
        <div className="relative md:w-5/12 bg-[#103B2B] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-bold shadow-2xs">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-['Manrope']">RescueBite</span>
            </div>

            <div className="pt-4 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#A9D889] block font-['Manrope']">
                Venture Food-Tech
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white font-['Manrope']">
                Good food deserves another chance.
              </h2>
              <p className="text-xs text-[#D5DCD0] leading-relaxed">
                Connect with campus cafeterias, discover fresh surplus meals at 50% discount, and earn with peer micro-delivery.
              </p>
            </div>
          </div>

          {/* Editorial Food Image Inset */}
          <div className="relative z-10 my-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-16/10">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80"
              alt="Fresh campus salad and meal"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-bold font-['Manrope']">
              Adani University & Shantigram Township
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-2 text-[11px] text-[#A9D889] flex items-center gap-1.5 border-t border-white/10 font-bold font-['Manrope']">
            <ShieldCheck className="w-4 h-4 text-[#A9D889]" />
            <span>Institutional Student Verification Protocol</span>
          </div>

          {/* Subtle Ambient Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#174D38] rounded-full blur-3xl pointer-events-none opacity-50"></div>
        </div>

        {/* Right Side: Authentication Forms & 1-Click Persona Logins */}
        <div className="md:w-7/12 p-8 sm:p-10 space-y-6 bg-white flex flex-col justify-between">
          
          <div className="space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-black text-[#174D38] uppercase tracking-wider font-['Manrope']">
                Account Sign In
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
                Welcome back to RescueBite
              </h1>
              <p className="text-xs sm:text-sm text-[#777D73]">
                Sign in with your campus account or test any persona instantly below.
              </p>
            </div>

            {/* 1-Click Fast Evaluator Personas */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
                  <span>1-Click Test Personas:</span>
                </span>
                <span className="text-[11px] text-[#777D73]">Click to switch role</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {demoAccounts.map((acc) => {
                  const IconComp = acc.icon;
                  return (
                    <div
                      key={acc.role}
                      onClick={() => switchRole(acc.role)}
                      className="p-3 rounded-2xl border border-[#E1E5D8] hover:border-[#174D38] hover:bg-[#FAF8F2] transition-all cursor-pointer space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#103B2B] flex items-center gap-1.5 font-['Manrope']">
                          <span className={`w-6 h-6 rounded-lg ${acc.color} flex items-center justify-center shrink-0`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </span>
                          <span>{acc.title}</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-[#777D73] leading-tight line-clamp-1 font-medium pl-7.5">
                        {acc.name} ({acc.badge})
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Sign In Form */}
            <form onSubmit={handleManualLogin} className="space-y-4 pt-2 border-t border-[#F0EFE9]">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                  <Mail className="w-3.5 h-3.5 text-[#777D73]" />
                  <span>Campus Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@adaniuni.ac.in"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                  <Lock className="w-3.5 h-3.5 text-[#777D73]" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 text-xs font-black shadow-sm uppercase tracking-wider font-['Manrope'] cursor-pointer"
              >
                Sign In to Account
              </button>
            </form>

          </div>

          {/* Registration Paths */}
          <div className="pt-4 border-t border-[#F0EFE9] space-y-2 text-xs text-center text-[#777D73]">
            <div>
              New university student?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('student-register')}
                className="font-bold text-[#174D38] hover:underline font-['Manrope'] cursor-pointer"
              >
                Join as Student
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('vendor-register')}
                className="font-bold text-[#777D73] hover:text-[#174D38] cursor-pointer"
              >
                Register as Cafeteria
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setActiveTab('delivery-partner-register')}
                className="font-bold text-[#B56014] hover:underline cursor-pointer"
              >
                Earn as Delivery Partner
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}