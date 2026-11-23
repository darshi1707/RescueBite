import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { 
  ShieldCheck, 
  Mail, 
  User, 
  Lock, 
  Phone, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Utensils
} from 'lucide-react';

export default function StudentAuthPage() {
  const { registerStudent, systemConfig, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [yearOfStudy, setYearOfStudy] = useState('2nd Year');

  const handleSubmit = (e) => {
    e.preventDefault();
    registerStudent({
      name,
      email,
      university_id: universityId,
      password,
      phone,
      department,
      year_of_study: yearOfStudy
    });
  };

  const allowedDomainList = systemConfig.allowed_domains.split(',');

  return (
    <div className="py-8 max-w-5xl mx-auto animate-fade-in font-['Inter']">
      <div className="overflow-hidden flex flex-col md:flex-row shadow-xl border border-[#E1E5D8] rounded-3xl bg-white">
        
        {/* Left Side: Brand Panel */}
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
                Campus Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white font-['Manrope']">
                Exclusive to verified students.
              </h2>
              <p className="text-xs text-[#D5DCD0] leading-relaxed">
                We verify university credentials to ensure genuine dining affordability and maintain safety for our campus delivery network.
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="relative z-10 my-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-16/10">
            <img
              src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=80"
              alt="Fresh campus club sandwich"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-bold font-['Manrope']">
              Save 50% on fresh meals daily
            </div>
          </div>

          <div className="relative z-10 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#D5DCD0] space-y-1.5">
            <div className="font-bold text-[#A9D889] flex items-center gap-1.5 font-['Manrope']">
              <ShieldCheck className="w-4 h-4" />
              <span>Configured University Domains:</span>
            </div>
            <div className="text-[11px] flex flex-wrap gap-1.5">
              {allowedDomainList.map((d, i) => (
                <code key={i} className="text-[#F2A65A] font-bold bg-black/25 px-2 py-0.5 rounded-md font-mono">@{d.trim()}</code>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#174D38] rounded-full blur-3xl pointer-events-none opacity-50"></div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-7/12 p-8 sm:p-10 space-y-6 bg-white flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-black text-[#174D38] uppercase tracking-wider font-['Manrope']">
                Student Registration
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
                Create Student Account
              </h1>
              <p className="text-xs sm:text-sm text-[#777D73]">
                Enter your university credentials to unlock discounted surplus meals and delivery privileges.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                  <User className="w-3.5 h-3.5 text-[#777D73]" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                    <Mail className="w-3.5 h-3.5 text-[#777D73]" />
                    <span>University Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@adaniuni.ac.in"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                    <GraduationCap className="w-3.5 h-3.5 text-[#777D73]" />
                    <span>Student / Enrollment ID</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    placeholder="e.g. AU2024CS089"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                    <Phone className="w-3.5 h-3.5 text-[#777D73]" />
                    <span>Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-[#FAF8F2]/60 text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#202820] flex items-center gap-1.5 font-['Manrope']">
                    <Building2 className="w-3.5 h-3.5 text-[#777D73]" />
                    <span>Department / Branch</span>
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mechanical & Civil Engineering">Mechanical & Civil Engineering</option>
                    <option value="Management & Commerce">Management & Commerce</option>
                    <option value="Architecture & Planning">Architecture & Planning</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#202820] font-['Manrope']">Year of Study</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E1E5D8] bg-white text-[#202820] focus:outline-hidden focus:border-[#174D38]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Post-Graduate / Masters">Post-Graduate / Masters</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 text-xs font-black shadow-sm uppercase tracking-wider font-['Manrope'] cursor-pointer"
              >
                Create Student Account & Verify
              </button>
            </form>
          </div>

          {/* Bottom Switcher */}
          <div className="pt-4 border-t border-[#F0EFE9] text-xs text-center text-[#777D73]">
            Already have an active campus account?{' '}
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className="font-bold text-[#174D38] hover:underline font-['Manrope'] cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}