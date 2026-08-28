import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import { RoleSwitcherBar } from "./components/common/RoleSwitcherBar";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { ToastContainer } from "./components/common/ToastContainer";
import { CartDrawer } from "./components/marketplace/CartDrawer";
import { NotificationDrawer } from "./components/common/NotificationDrawer";
import { AiAssistantDrawer } from "./components/common/AiAssistantDrawer";
import { AuthModal } from "./components/auth/AuthModal";
import { CheckoutModal } from "./components/marketplace/CheckoutModal";

// Views
import { LandingPage } from "./components/landing/LandingPage";
import { MarketplaceView } from "./components/marketplace/MarketplaceView";
import { MarketTrendsView } from "./components/common/MarketTrendsView";

// Farmer Views
import { FarmerDashboard } from "./components/farmer/FarmerDashboard";
import { MyProducts } from "./components/farmer/MyProducts";
import { FarmerOrders } from "./components/farmer/FarmerOrders";
import { FarmerInquiries } from "./components/farmer/FarmerInquiries";
import { FarmerAnalytics } from "./components/farmer/FarmerAnalytics";

// Buyer Views
import { BuyerDashboard } from "./components/buyer/BuyerDashboard";
import { BuyerOrders } from "./components/buyer/BuyerOrders";
import { BuyerWishlist } from "./components/buyer/BuyerWishlist";

// Logistics Views
import { LogisticsDashboard } from "./components/logistics/LogisticsDashboard";
import { AvailableShipments } from "./components/logistics/AvailableShipments";
import { AssignedShipments } from "./components/logistics/AssignedShipments";
import { LogisticsEarnings } from "./components/logistics/LogisticsEarnings";

// Admin Views
import { AdminDashboard } from "./components/admin/AdminDashboard";

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage />;
      case "marketplace":
        return <MarketplaceView />;
      case "market_trends":
        return <MarketTrendsView />;

      // Farmer View Routes
      case "farmer_dashboard":
        return <FarmerDashboard />;
      case "farmer_products":
        return <MyProducts />;
      case "farmer_orders":
        return <FarmerOrders />;
      case "farmer_inquiries":
        return <FarmerInquiries />;
      case "farmer_analytics":
        return <FarmerAnalytics />;

      // Buyer View Routes
      case "buyer_dashboard":
        return <BuyerDashboard />;
      case "buyer_orders":
        return <BuyerOrders />;
      case "buyer_wishlist":
        return <BuyerWishlist />;

      // Logistics View Routes
      case "logistics_dashboard":
        return <LogisticsDashboard />;
      case "available_shipments":
        return <AvailableShipments />;
      case "assigned_shipments":
        return <AssignedShipments />;
      case "logistics_earnings":
        return <LogisticsEarnings />;

      // Admin
      case "admin_dashboard":
        return <AdminDashboard />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#1A2E1A] selection:bg-emerald-500 selection:text-white font-sans antialiased">
      {/* Top Demo Role Switcher */}
      <RoleSwitcherBar />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">{renderView()}</main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ToastContainer />
      <CartDrawer />
      <NotificationDrawer />
      <AiAssistantDrawer />
      <AuthModal />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </LanguageProvider>
  );
}
