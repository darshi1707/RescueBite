import React from 'react';
import { 
  Briefcase, 
  Users, 
  Sparkles, 
  Truck, 
  HeartHandshake, 
  CreditCard, 
  Layers, 
  Activity, 
  Network, 
  TrendingUp,
  FileText,
  CheckCircle2,
  GraduationCap,
  Store,
  Bike
} from 'lucide-react';

export default function BmcPage() {
  const bmcBlocks = [
    {
      id: 'key-partners',
      title: '1. Key Partners',
      icon: Network,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'Adani University Student Affairs & Canteen Inspection Committee',
        'Shantigram Township Commercial Food Courts & Belvedere Eateries',
        'Student Activity Council (SAC) & Campus Sustainability Club',
        'FSSAI Certified Food Safety & Quality Advisors',
        'Local Eco-friendly Packaging Providers'
      ]
    },
    {
      id: 'key-activities',
      title: '2. Key Activities',
      icon: Activity,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'Automated surplus cut-off listing matching (60 mins prior to closing)',
        'Institutional email (@adaniuni.ac.in) student verification',
        'Hyperlocal courier broadcast & concurrency-locked dispatch',
        'Food hygiene timestamp enforcement & pickup deadline tracking',
        'Promotional 5-delivery meal reward fund reconciliation'
      ]
    },
    {
      id: 'key-resources',
      title: '3. Key Resources',
      icon: Layers,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'High-density campus web application & matching algorithms',
        'Verified student database & academic domain authority',
        'Network of authorized cafeteria operators & kitchen managers',
        'Active pool of student walking & bicycle couriers',
        'Direct relationship with university administrative officers'
      ]
    },
    {
      id: 'value-propositions',
      title: '4. Value Propositions',
      icon: Sparkles,
      color: 'border-[#174D38]/30 bg-[#FAF8F2]',
      bullets: [
        'For Students: 40-70% discount on fresh, safe cafeteria food; rapid 15-min hostel delivery or pickup',
        'For Cafeterias: Monetize sunk perishable food losses; recover ₹20,000+ monthly; zero listing risk',
        'For Couriers: ₹15 per delivery between classes; walking/bicycle zero Capex; daily 5-delivery free meal'
      ]
    },
    {
      id: 'customer-relationships',
      title: '5. Customer Relationships',
      icon: HeartHandshake,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'High institutional trust via institutional email verification',
        'Frictionless transparency: live stock countdowns & 4-digit PINs',
        'Community empathy: students delivering to fellow hostel peers',
        'Rapid campus dispute resolution & food safety refund guarantee'
      ]
    },
    {
      id: 'channels',
      title: '6. Channels',
      icon: Truck,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'Mobile-first responsive Progressive Web Application (PWA)',
        'Cafeteria table-top QR tent cards & counter stickers',
        'University WhatsApp hostel announcement groups & batch channels',
        'Campus sustainability orientation workshops & freshers fairs'
      ]
    },
    {
      id: 'customer-segments',
      title: '7. Customer Segments',
      icon: Users,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'Hostellers & Day Scholars seeking affordable daily nutrition',
        'On-campus cafeterias, canteens, and township commercial food outlets',
        'University students seeking flexible, non-intrusive micro-earnings',
        'Corporate office canteens in Shantigram Township (future phase)'
      ]
    },
    {
      id: 'cost-structure',
      title: '8. Cost Structure',
      icon: CreditCard,
      color: 'border-[#E1E5D8] bg-white',
      bullets: [
        'Cloud hosting, serverless backend & database upkeep (₹2,500/mo)',
        'Daily Meal Reward promotional reserve fund (₹3/delivery allocation)',
        'Payment gateway processing fees (~1.5-2%)',
        'Campus marketing collateral, QR stands & courier welcome badges (₹3,000/mo)',
        'Customer support & campus verification auditing'
      ]
    },
    {
      id: 'revenue-streams',
      title: '9. Revenue Streams',
      icon: TrendingUp,
      color: 'border-[#A9D889] bg-[#174D38]/5',
      bullets: [
        'Vendor Commission: 8-10% take-rate on completed discounted food orders',
        'Delivery Coordination Fee: ₹4 fixed platform fee per delivery order',
        'Premium Vendor Analytics (Future): ₹499/mo for predictive demand analytics',
        'Corporate Township ESG Sponsorships & certified carbon offset credits'
      ]
    }
  ];

  return (
    <div className="space-y-10 py-6 animate-fade-in font-['Inter']">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#174D38]/10 text-[#174D38] text-xs font-black uppercase tracking-wider font-['Manrope']">
          <Briefcase className="w-3.5 h-3.5 text-[#174D38]" />
          <span>Strategic Business Model</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#103B2B] tracking-tight font-['Manrope']">
          Business Model Canvas
        </h1>
        <p className="text-xs sm:text-sm text-[#777D73] leading-relaxed">
          The 9 strategic building blocks demonstrating how RescueBite creates, delivers, and captures economic and social value across Adani University & Shantigram Township.
        </p>
      </div>

      {/* 3 Beneficiaries Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-black text-sm text-[#103B2B] font-['Manrope']">
            <div className="w-7 h-7 rounded-lg bg-[#174D38]/10 text-[#174D38] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span>How Students Benefit</span>
          </div>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Nutritional equity: get 50% discounts on fresh, wholesome food; eliminates expensive off-campus delivery surge charges; saves ₹1,500+ monthly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-black text-sm text-[#103B2B] font-['Manrope']">
            <div className="w-7 h-7 rounded-lg bg-[#174D38]/10 text-[#174D38] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <span>How Cafeterias Benefit</span>
          </div>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Cost recovery: monetize perishable food that would otherwise be discarded; recover ₹15,000–₹30,000 monthly; reduces organic disposal expenses.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-black text-sm text-[#103B2B] font-['Manrope']">
            <div className="w-7 h-7 rounded-lg bg-[#F2A65A]/15 text-[#B56014] flex items-center justify-center">
              <Bike className="w-4 h-4" />
            </div>
            <span>How Couriers Benefit</span>
          </div>
          <p className="text-xs text-[#777D73] leading-relaxed">
            Dignified micro-work: earn ₹15 per delivery without leaving campus; unlock free daily ₹60 meals after 5 deliveries (earn ₹135 daily value).
          </p>
        </div>
      </div>

      {/* 9-Block Interactive Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Key Partners */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between shadow-2xs ${bmcBlocks[0].color}`}>
          <div>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Network className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[0].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[0].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>

        {/* Key Activities & Resources */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className={`p-5 rounded-3xl border flex-1 shadow-2xs ${bmcBlocks[1].color}`}>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Activity className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[1].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[1].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          <div className={`p-5 rounded-3xl border flex-1 shadow-2xs ${bmcBlocks[2].color}`}>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Layers className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[2].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[2].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>

        {/* Value Propositions */}
        <div className={`p-5 rounded-3xl border-2 flex flex-col justify-between shadow-2xs ${bmcBlocks[3].color}`}>
          <div>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Sparkles className="w-4 h-4 text-[#F2A65A]" />
              <span>{bmcBlocks[3].title}</span>
            </div>
            <ul className="text-[11px] text-[#202820] space-y-2.5 pl-3 list-disc">
              {bmcBlocks[3].bullets.map((b, i) => <li key={i}><strong>{b.split(':')[0]}:</strong>{b.split(':')[1]}</li>)}
            </ul>
          </div>
          <div className="mt-4 p-2.5 rounded-xl bg-[#A9D889]/30 text-[#103B2B] text-xs font-black text-center font-['Manrope']">
            Zero Food Loss Campus Model
          </div>
        </div>

        {/* Customer Relationships & Channels */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className={`p-5 rounded-3xl border flex-1 shadow-2xs ${bmcBlocks[4].color}`}>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <HeartHandshake className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[4].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[4].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          <div className={`p-5 rounded-3xl border flex-1 shadow-2xs ${bmcBlocks[5].color}`}>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Truck className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[5].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[5].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>

        {/* Customer Segments */}
        <div className={`p-5 rounded-3xl border flex flex-col justify-between shadow-2xs ${bmcBlocks[6].color}`}>
          <div>
            <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
              <Users className="w-4 h-4 text-[#174D38]" />
              <span>{bmcBlocks[6].title}</span>
            </div>
            <ul className="text-[11px] text-[#777D73] space-y-2 pl-3 list-disc">
              {bmcBlocks[6].bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Financial Blocks: Cost Structure & Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Cost Structure */}
        <div className={`p-6 sm:p-7 rounded-3xl border shadow-xs ${bmcBlocks[7].color}`}>
          <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
            <CreditCard className="w-4.5 h-4.5 text-[#777D73]" />
            <span>{bmcBlocks[7].title}</span>
          </div>
          <ul className="text-xs text-[#777D73] space-y-2 pl-4 list-disc">
            {bmcBlocks[7].bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* Revenue Streams */}
        <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xs ${bmcBlocks[8].color}`}>
          <div className="flex items-center gap-2 font-black text-xs text-[#103B2B] mb-3 font-['Manrope']">
            <TrendingUp className="w-4.5 h-4.5 text-[#174D38]" />
            <span>{bmcBlocks[8].title}</span>
          </div>
          <ul className="text-xs text-[#202820] space-y-2 pl-4 list-disc font-medium">
            {bmcBlocks[8].bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

      </div>

      {/* Document Notice */}
      <div className="bg-white p-6 rounded-3xl border border-[#E1E5D8] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#174D38]/10 text-[#174D38] flex items-center justify-center font-bold text-lg">
            <FileText className="w-5 h-5 text-[#174D38]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#103B2B] font-['Manrope']">Official Business Model Canvas Report in Workspace</h4>
            <p className="text-xs text-[#777D73]">
              `RESCUEBITE_BUSINESS_MODEL_CANVAS.docx` is saved directly in your project root directory.
            </p>
          </div>
        </div>
        <span className="badge-lime text-xs font-black font-['Manrope']">Saved in Root</span>
      </div>

    </div>
  );
}