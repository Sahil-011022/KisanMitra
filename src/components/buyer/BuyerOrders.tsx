import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import { getLocalizedProduct, getLocalizedStatus, getLocalizedUnit } from "../../i18n/localizeData";
import { OrderTrackingModal } from "./OrderTrackingModal";
import { ReviewModal } from "./ReviewModal";
import { DisputeModal } from "./DisputeModal";
import {
  ShoppingBag,
  Truck,
  Star,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  PackageCheck,
  MapPin,
} from "lucide-react";

export const BuyerOrders: React.FC = () => {
  const { orders, currentUser, updateOrderStatus, confirmOrderReceipt, setCurrentView, products } = useApp();
  const { language, t } = useTranslation();

  const [activeTab, setActiveTab] = useState<"all" | "active" | "delivered" | "disputed">("all");
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string | null>(null);
  const [reviewOrderData, setReviewOrderData] = useState<{ productId: string; productName: string; orderId: string } | null>(null);
  const [disputeOrderId, setDisputeOrderId] = useState<string | null>(null);

  const buyerOrders = orders.filter((o) => (currentUser ? o.buyerId === currentUser.id : true));

  const filteredOrders = buyerOrders.filter((order) => {
    const s = order.status || (order as any).orderStatus || "";
    if (activeTab === "active") return ["pending", "confirmed", "in_transit", "placed", "preparing", "picked_up", "out_for_delivery"].includes(s);
    if (activeTab === "delivered") return s === "delivered";
    if (activeTab === "disputed") return s === "disputed" || (order as any).disputed;
    return true;
  });

  const tabList = [
    { key: "all", label: language === "mr" ? `सर्व ऑर्डर्स (${buyerOrders.length})` : language === "hi" ? `सभी ऑर्डर (${buyerOrders.length})` : `All Orders (${buyerOrders.length})` },
    { key: "active", label: language === "mr" ? "सक्रिय व मार्गावर" : language === "hi" ? "सक्रिय व रास्ते में" : "Active & In Transit" },
    { key: "delivered", label: language === "mr" ? "वितरित व तपासलेले" : language === "hi" ? "डिलीवर व सत्यापित" : "Delivered & Verified" },
    { key: "disputed", label: language === "mr" ? "एस्क्रो आढावा" : language === "hi" ? "एस्क्रो समीक्षा" : "Under Escrow Review" },
  ];

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-8 text-[#1A2E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {language === "mr" ? "ग्राहक खरेदी इतिहास" : language === "hi" ? "खरीदार क्रय इतिहास" : "Buyer Purchase History"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === "mr" ? "माझ्या ऑर्डर्स आणि थेट ट्रॅकिंग" : language === "hi" ? "मेरे ऑर्डर और लाइव ट्रैकिंग" : "My Orders & Live Consignments"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              {language === "mr"
                ? "शीतगृह वाहनांचे लाइव्ह लोकेशन तपासा, डिलिव्हरी तपासा, शेतकऱ्याला रेटिंग द्या."
                : language === "hi"
                ? "कोल्ड-चेन लाइव्ह लोकेशन ट्रैक करें, डिलीवरी सत्यापित करें और रेटिंग दें।"
                : "Track shipments, verify delivery, leave producer reviews, and escrow protection."}
            </p>
          </div>

          <button
            onClick={() => setCurrentView("marketplace")}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-800/20 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{language === "mr" ? "ताजी पिके खरेदी करा" : language === "hi" ? "ताज़ा फसल खरीदें" : "Order Fresh Produce"}</span>
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#0F291E] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {language === "mr" ? "या प्रकारात कोणतीही ऑर्डर सापडली नाही" : language === "hi" ? "इस श्रेणी में कोई ऑर्डर नहीं मिला" : "No orders found in this category"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === "mr"
                ? "तुम्ही खरेदी केलेल्या शेतातील ताज्या पिकांची माहिती येथे दिसेल."
                : language === "hi"
                ? "आपकी खरीदी गई ताज़ा फसलों की जानकारी यहाँ दिखेगी।"
                : "Your farm-fresh crop orders and live transit routes will appear here."}
            </p>
            <button
              onClick={() => setCurrentView("marketplace")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 cursor-pointer"
            >
              {language === "mr" ? "बाजारपेठ पाहा" : language === "hi" ? "बाज़ार देखें" : "Browse Marketplace"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const s = order.status || (order as any).orderStatus || "placed";
              const isInTransit = s === "in_transit" || s === "picked_up" || s === "out_for_delivery";
              const isDelivered = s === "delivered";
              const localizedStatus = getLocalizedStatus(s, language);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {language === "mr" ? "ऑर्डर क्रमांक" : language === "hi" ? "ऑर्डर नंबर" : "Order"} {order.orderNumber || `#ORD-${order.id.slice(-4)}`}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {localizedStatus}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} {language === "mr" ? "पिक वस्तू" : language === "hi" ? "फसल उत्पाद" : "items"}
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-base font-black text-emerald-800">₹{order.totalAmount.toLocaleString()}</div>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                        {t("statusEscrowHeld")}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => {
                      const rawProd = products.find((p) => p.id === item.productId);
                      const locProd = rawProd ? getLocalizedProduct(rawProd, language) : null;
                      const locName = locProd?.name || item.productName;
                      const locUnit = getLocalizedUnit(item.unit || "kg", language);

                      return (
                        <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAF8] text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80"}
                              alt=""
                              className="w-10 h-10 rounded-xl object-cover"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{locName}</div>
                              <div className="text-[11px] text-slate-500">
                                {item.quantity} {locUnit} • ₹{item.unitPrice}/{locUnit}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-slate-900">₹{(item.quantity * item.unitPrice).toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedTrackingOrderId(order.id)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === "mr" ? "थेट ट्रॅकिंग पाहा" : language === "hi" ? "लाइव ट्रैकिंग देखें" : "Live GPS Tracking"}</span>
                    </button>

                    {isInTransit && (
                      <button
                        onClick={() => confirmOrderReceipt(order.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === "mr" ? "माल मिळाला निश्चित करा (एस्क्रो वर्ग)" : language === "hi" ? "डिलीवरी की पुष्टि करें (एस्क्रो रिलीज)" : "Confirm Delivery & Release Escrow"}</span>
                      </button>
                    )}

                    {isDelivered && (
                      <button
                        onClick={() =>
                          setReviewOrderData({
                            productId: order.items[0]?.productId || "prod_1",
                            productName: order.items[0]?.productName || "Farm Produce",
                            orderId: order.id,
                          })
                        }
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{language === "mr" ? "शेतकऱ्याला रेटिंग द्या" : language === "hi" ? "किसान को रेटिंग दें" : "Rate Producer & Crop Quality"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTrackingOrderId && (
        <OrderTrackingModal
          orderId={selectedTrackingOrderId}
          onClose={() => setSelectedTrackingOrderId(null)}
        />
      )}

      {reviewOrderData && (
        <ReviewModal
          productId={reviewOrderData.productId}
          productName={reviewOrderData.productName}
          orderId={reviewOrderData.orderId}
          onClose={() => setReviewOrderData(null)}
        />
      )}

      {disputeOrderId && (
        <DisputeModal
          orderId={disputeOrderId}
          onClose={() => setDisputeOrderId(null)}
        />
      )}
    </div>
  );
};
