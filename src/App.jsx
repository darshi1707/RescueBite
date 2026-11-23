import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import FoodDetailsModal from './pages/FoodDetailsModal.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import DeliveryPartnerPage from './pages/DeliveryPartnerPage.jsx';
import VendorDashboardPage from './pages/VendorDashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ImpactPage from './pages/ImpactPage.jsx';
import BmcPage from './pages/BmcPage.jsx';
import InvestorPage from './pages/InvestorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import StudentAuthPage from './pages/StudentAuthPage.jsx';

function MainRouter() {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'delivery-dashboard':
      case 'delivery-partner-register':
        return <DeliveryPartnerPage />;
      case 'vendor-dashboard':
      case 'vendor-register':
        return <VendorDashboardPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      case 'impact':
        return <ImpactPage />;
      case 'bmc':
        return <BmcPage />;
      case 'investor':
        return <InvestorPage />;
      case 'login':
        return <LoginPage />;
      case 'student-register':
      case 'student-verification':
        return <StudentAuthPage />;
      default:
        return <MarketplacePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] selection:bg-[#A9D889] selection:text-[#174D38]">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>
      <FoodDetailsModal />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
