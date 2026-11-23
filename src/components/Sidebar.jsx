import React from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  ShoppingBag, 
  User, 
  Bike, 
  Store, 
  ShieldCheck, 
  Leaf, 
  LogOut, 
  CheckCircle2,
  Package,
  PlusCircle,
  TrendingUp,
  Award,
  Settings,
  Layers
} from 'lucide-react';

export default function Sidebar({ items, activeItem, onItemClick, userRoleTitle }) {
  const { currentUser, logout, setActiveTab } = useApp();

  return (
    <aside className="w-full lg:w-68 bg-white rounded-3xl border border-[#E8E5DA] p-5 flex flex-col justify-between shrink-0 shadow-sm">
      
      {/* Top Profile Card */}
      <div className="space-y-5">
        <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E5DA] flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#174D38] text-[#A9D889] flex items-center justify-center font-black text-lg shrink-0 shadow-xs font-['Manrope']">
            {currentUser?.name?.[0] || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-black text-[#202820] truncate font-['Manrope']">
              {currentUser?.name || 'User'}
            </div>
            <div className="text-[11px] font-bold text-[#777D73] flex items-center gap-1.5 mt-0.5 font-['Manrope']">
              <span className="w-2 h-2 rounded-full bg-[#174D38]"></span>
              <span className="truncate">{userRoleTitle || currentUser?.role}</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all font-['Manrope'] cursor-pointer ${
                  isActive
                    ? 'bg-[#174D38] text-white shadow-xs'
                    : 'text-[#202820] hover:bg-[#FAF8F2] hover:text-[#174D38]'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#A9D889]' : 'text-[#777D73]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-black font-['Manrope'] ${
                    isActive ? 'bg-[#A9D889] text-[#103B2B]' : 'bg-[#F2A65A]/20 text-[#B56014]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-5 mt-8 border-t border-[#F0EDE4] space-y-2">
        <button
          onClick={() => setActiveTab('marketplace')}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-[#777D73] hover:bg-[#FAF8F2] hover:text-[#174D38] transition-colors font-['Manrope'] cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#777D73]" />
          <span>Explore Marketplace</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-[#777D73] hover:bg-red-50 hover:text-red-600 transition-colors font-['Manrope'] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
