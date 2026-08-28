import React from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import {
  ShoppingBag,
  Truck,
  TrendingDown,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Heart,
  Package,
} from "lucide-react";

export const BuyerDashboard: React.FC = () => {
  const { currentUser, orders, wishlist, products, setCurrentView, setSelectedProductId, setIsAiAssistantOpen } = useApp();
  const { t, language } = useTranslation();

  const buyerOrders = orders.filter((o) => (currentUser ? o.buyerId === currentUser.id : true));
  const activeDeliveries = buyerOrders.filter((o) => {
    const s = o.status || (o as any).orderStatus || "";
    return ["pending", "confirmed", "in_transit", "placed", "preparing", "picked_up", "out_for_delivery"].includes(s);
  });
  const completedOrders = buyerOrders.filter((o) => (o.status || (o as any).orderStatus) === "delivered");
  const totalSpend = buyerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const estimatedSavings = Math.round(totalSpend * 0.22); // Estimated ~22% savings vs retail middleman

  function orderStatus(o: any) {
    return o.status || o.orderStatus || "placed";
  }

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-8 text-[#1A2E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Buyer Welcome Banner */}
        <div className="bg-[#0F291E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-emerald-900/40">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t("buyerWelcomeBadge")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t("welcomeBack", { name: currentUser?.name || "Priya Sharma" })}
              </h1>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                {t("buyerWelcomeSub")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentView("marketplace")}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t("buyFarmCropsBtn")}</span>
              </button>
              <button
                onClick={() => setIsAiAssistantOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>{t("aiProduceAdviceBtn")}</span>
              </button>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("totalDirectSpend")}</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">₹{totalSpend.toLocaleString()}</div>
            <p className="text-[10.5px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{t("directToFarmerAccounts")}</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("estimatedSavingsCount")}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700">₹{estimatedSavings.toLocaleString()}</div>
            <p className="text-[10.5px] text-slate-500">{t("vsUrbanRetailMiddlemen")}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("activeConsignmentsCount")}</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{activeDeliveries.length}</div>
            <p className="text-[10.5px] text-amber-600 font-medium">{t("liveColdChainGpsActive")}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("savedInWishlistCount")}</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{wishlist.length}</div>
            <p className="text-[10.5px] text-slate-500">{t("seasonalFarmHarvests")}</p>
          </div>
        </div>

        {/* Active Deliveries Highlight */}
        {activeDeliveries.length > 0 && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-300 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <h3 className="font-extrabold text-slate-900 text-sm">{t("activeInTransitConsignments")}</h3>
              </div>
              <button
                onClick={() => setCurrentView("buyer_orders")}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{t("viewAllOrders")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeDeliveries.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {language === "mr" ? "ऑर्डर" : language === "hi" ? "ऑर्डर" : "Order"} #{order.id.toUpperCase()}
                        </span>
                        <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.2 rounded-full uppercase">
                          {(order.status || (order as any).shipmentStatus || (order as any).orderStatus || "in_transit").replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {order.items.map((i) => `${i.productName} (${i.quantity} ${i.unit})`).join(", ")}
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                        <span>ETA: <strong className="text-slate-800">{order.estimatedDeliveryDate || (order as any).estimatedDelivery || (language === "mr" ? "२ दिवस" : language === "hi" ? "२ दिन" : "2 Days")}</strong></span>
                        <span>•</span>
                        <span>{t("destination")}: {(order.buyerAddress || (order as any).deliveryAddress || order.buyerCity || "Customer Address").slice(0, 30)}...</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView("buyer_orders")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                  >
                    {t("trackLiveGpsRouteBtn")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Harvests for Buyer */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{t("recommendedSeasonalHarvests")}</h3>
              <p className="text-xs text-slate-500">{t("fromHighestRatedFpos")}</p>
            </div>
            <button
              onClick={() => setCurrentView("marketplace")}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t("exploreMarketplaceBtn")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  setSelectedProductId(prod.id);
                  setCurrentView("marketplace");
                }}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-white transition-all cursor-pointer flex gap-3 items-center group"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{prod.category}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {prod.rating}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                    {prod.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">{t("byFarmer", { farmer: prod.farmerName })}</p>
                  <div className="text-xs font-black text-emerald-800 mt-1">
                    ₹{prod.price} <span className="text-[10px] font-normal text-slate-500">/{prod.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
