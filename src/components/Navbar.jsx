import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  Utensils, 
  ShoppingBag, 
  Bike, 
  Store, 
  ShieldCheck, 
  Leaf, 
  MapPin, 
  LogOut, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  User,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    logout, 
    switchRole, 
    toast
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const getDashboardTab = () => {
    if (!currentUser) return 'login';
    if (currentUser.role === 'student') return 'student-dashboard';
    if (currentUser.role === 'delivery') return 'delivery-dashboard';
    if (currentUser.role === 'vendor') return 'vendor-dashboard';
    if (currentUser.role === 'admin') return 'admin-dashboard';
    return 'student-dashboard';
  };

  return (
    <>
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4.5 py-3.5 rounded-2xl shadow-xl bg-white border border-[#E8E5DA] text-[#202820] animate-fade-in max-w-md">
          {toast.type === 'error' ? (
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : toast.type === 'amber' ? (
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#F2A65A] flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F2] text-[#174D38] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#174D38]" />
            </div>
          )}
          <div className="text-xs font-semibold leading-snug">{toast.message}</div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E5DA] shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              <div 
                onClick={() => navigateTo('landing')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#174D38] text-[#A9D889] flex items-center justify-center shadow-xs group-hover:bg-[#103B2B] transition-all">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-[#174D38] font-['Manrope']">
                      RescueBite
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-[#A9D889]/30 text-[#174D38] border border-[#A9D889]">
                      Campus
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#777D73] font-medium hidden sm:flex">
                    <MapPin className="w-3 h-3 text-[#174D38]" />
                    <span>Adani University • Shantigram</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#FAF8F2] p-1.5 rounded-2xl border border-[#E8E5DA]">
              <button
                onClick={() => navigateTo('landing')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-['Manrope'] ${
                  activeTab === 'landing' 
                    ? 'bg-[#174D38] text-white shadow-2xs' 
                    : 'text-[#777D73] hover:text-[#174D38] hover:bg-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('marketplace')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-['Manrope'] ${
                  activeTab === 'marketplace' 
                    ? 'bg-[#174D38] text-white shadow-2xs' 
                    : 'text-[#202820] hover:text-[#174D38] hover:bg-white'
                }`}
              >
                Explore Food
              </button>

              <button
                onClick={() => {
                  navigateTo('landing');
                  setTimeout(() => {
                    const el = document.getElementById('how-it-works-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#777D73] hover:text-[#174D38] hover:bg-white transition-all font-['Manrope']"
              >
                How It Works
              </button>

              <button
                onClick={() => navigateTo('impact')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-['Manrope'] ${
                  activeTab === 'impact' 
                    ? 'bg-[#174D38] text-white shadow-2xs' 
                    : 'text-[#777D73] hover:text-[#174D38] hover:bg-white'
                }`}
              >
                Campus Impact
              </button>

              <button
                onClick={() => navigateTo(currentUser?.role === 'delivery' ? 'delivery-dashboard' : 'delivery-partner-register')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all font-['Manrope'] ${
                  activeTab === 'delivery-dashboard' || activeTab === 'delivery-partner-register' 
                    ? 'bg-[#174D38] text-white shadow-2xs' 
                    : 'text-[#777D73] hover:text-[#174D38] hover:bg-white'
                }`}
              >
                Earn With Us
              </button>

              {currentUser && (
                <button
                  onClick={() => navigateTo(getDashboardTab())}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#174D38]/10 text-[#174D38] hover:bg-[#174D38]/20 transition-all ml-1 font-['Manrope']"
                >
                  Dashboard
                </button>
              )}
            </nav>

            {/* Right: Controls & Persona Switcher */}
            <div className="flex items-center gap-3">
              
              {/* 1-Click Fast Persona Switcher (For evaluators, faculty, investors) */}
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-[#FAF8F2] border border-[#E8E5DA] hover:border-[#174D38] text-[#202820] shadow-2xs transition-all cursor-pointer font-['Manrope']"
                  title="Switch between test personas"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A9D889] ring-2 ring-[#174D38]"></span>
                  <span className="hidden sm:inline text-[#777D73] font-medium">Role:</span>
                  <span className="capitalize font-black text-[#174D38]">
                    {currentUser?.role === 'student' ? 'Student' :
                     currentUser?.role === 'delivery' ? 'Courier' :
                     currentUser?.role === 'vendor' ? 'Vendor' :
                     currentUser?.role === 'admin' ? 'Admin' : 'Guest'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#777D73]" />
                </button>

                {roleMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-72 bg-white rounded-2xl shadow-xl border border-[#E8E5DA] py-2.5 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-[#F0EDE4] text-[10.5px] font-black text-[#777D73] uppercase tracking-wider flex items-center justify-between font-['Manrope']">
                      <span>1-Click Test Persona</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#F2A65A]" />
                    </div>
                    
                    <button
                      onClick={() => { switchRole('student'); setRoleMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#FAF8F2] flex items-center gap-3 text-[#202820]"
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center font-bold text-xs shrink-0">
                        🎓
                      </span>
                      <div>
                        <div className="font-extrabold text-[#174D38] font-['Manrope']">Aarav Patel</div>
                        <div className="text-[10.5px] text-[#777D73]">Verified Student Buyer</div>
                      </div>
                    </button>

                    <button
                      onClick={() => { switchRole('delivery'); setRoleMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#FAF8F2] flex items-center gap-3 text-[#202820]"
                    >
                      <span className="w-8 h-8 rounded-xl bg-[#F2A65A]/20 text-[#B56014] flex items-center justify-center font-bold text-xs shrink-0">
                        🚴
                      </span>
                      <div>
                        <div className="font-extrabold text-[#B56014] font-['Manrope']">Rohan Sharma</div>
                        <div className="text-[10.5px] text-[#777D73]">Student Courier (4/5 done)</div>
                      </div>
                    </button>

                    <button
                      onClick={() => { switchRole('vendor'); setRoleMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#FAF8F2] flex items-center gap-3 text-[#202820]"
                    >
                      <span className="w-8 h-8 rounded-xl bg-emerald-100 text-[#174D38] flex items-center justify-center font-bold text-xs shrink-0">
                        🍲
                      </span>
                      <div>
                        <div className="font-extrabold text-[#174D38] font-['Manrope']">Central Food Court</div>
                        <div className="text-[10.5px] text-[#777D73]">Cafeteria Operator</div>
                      </div>
                    </button>

                    <button
                      onClick={() => { switchRole('admin'); setRoleMenuOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs hover:bg-[#FAF8F2] flex items-center gap-3 text-[#202820]"
                    >
                      <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs shrink-0">
                        ⚙️
                      </span>
                      <div>
                        <div className="font-extrabold text-purple-900 font-['Manrope']">Campus Admin</div>
                        <div className="text-[10.5px] text-[#777D73]">Student ID Approvals & Policy</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* User Profile or Login/Get Started */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo(getDashboardTab())}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#E8E5DA] hover:border-[#174D38] text-xs font-bold text-[#202820] transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#174D38] text-white flex items-center justify-center text-xs font-black">
                      {currentUser.name[0]}
                    </span>
                    <span className="hidden sm:inline truncate max-w-[110px] font-['Manrope'] font-bold">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </button>

                  <button
                    onClick={logout}
                    className="p-2 rounded-xl text-[#777D73] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('login')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] transition-colors font-['Manrope']"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigateTo('student-register')}
                    className="btn-primary text-xs py-2 px-4 shadow-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-[#202820] hover:bg-[#FAF8F2]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E5DA] bg-white px-5 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
            <button
              onClick={() => navigateTo('landing')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('marketplace')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              Explore Food
            </button>
            <button
              onClick={() => {
                navigateTo('landing');
                setTimeout(() => {
                  const el = document.getElementById('how-it-works-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              How It Works
            </button>
            <button
              onClick={() => navigateTo('impact')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              Campus Impact
            </button>
            <button
              onClick={() => navigateTo(currentUser?.role === 'delivery' ? 'delivery-dashboard' : 'delivery-partner-register')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              Earn With Us (Delivery Partner)
            </button>
            <button
              onClick={() => navigateTo(currentUser?.role === 'vendor' ? 'vendor-dashboard' : 'vendor-register')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-[#202820] hover:bg-[#FAF8F2] font-['Manrope']"
            >
              For Cafeterias
            </button>
          </div>
        )}
      </header>
    </>
  );
}
