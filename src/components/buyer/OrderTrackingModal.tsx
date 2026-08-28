import React from "react";
import { Order, Shipment } from "../../types";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import { getLocalizedStatus, getLocalizedUnit } from "../../i18n/localizeData";
import { InteractiveMap } from "../common/InteractiveMap";
import { X, Truck, Package, Clock, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface OrderTrackingModalProps {
  orderId: string;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ orderId, onClose }) => {
  const { orders, shipments } = useApp();
  const { t, language } = useTranslation();

  const order = orders.find((o) => o.id === orderId);
  const foundShipment = shipments.find((s) => s.orderId === orderId);

  const shipment: Shipment = foundShipment || {
    id: `ship_${orderId}`,
    orderId: order?.id || orderId,
    orderNumber: order?.trackingNumber || `ORD-${orderId.slice(0, 6).toUpperCase()}`,
    farmerId: order?.items[0]?.farmerId || "u_farmer_1",
    farmerName: order?.items[0]?.farmerName || "Sahyadri Bio-Organics",
    farmerPhone: "+91 98234 56789",
    buyerId: order?.buyerId || "u_buyer_1",
    buyerName: order?.buyerName || "Verified Buyer",
    buyerPhone: order?.buyerPhone || "+91 98765 43210",
    logisticsPartnerId: "u_logistics_1",
    logisticsPartnerName: "GreenRoute Agro Cold-Chain",
    logisticsPhone: "+91 97123 45678",
    vehicleNumber: "MH-15-AG-4421",
    vehicleType: "Reefer Container (Cold-Chain)",
    pickupLocation: order?.items[0]?.farmerName || "Nashik Agro Hub",
    pickupAddress: "Farm Gate 4, Sahyadri Organic Cluster, Dindori, Nashik, MH",
    deliveryLocation: order?.buyerCity || "Mumbai Central Hub",
    deliveryAddress: order?.buyerAddress || "A-402, Green View Residency, Dadar West, Mumbai",
    productSummary: order?.items.map((i) => `${i.productName} (${i.quantity} ${i.unit})`).join(", ") || "Fresh Produce Consignment",
    totalWeightKg: order?.items.reduce((sum, i) => sum + i.quantity, 0) || 50,
    specialInstructions: "Maintain cold chain at 10-14°C. Handle fresh produce with care.",
    preferredPickupTime: "Morning Slot (06:00 AM - 09:00 AM)",
    status: order?.status === "delivered" ? "delivered" : "in_transit",
    estimatedDistanceKm: 165,
    estimatedDeliveryTime: order?.estimatedDeliveryDate || (language === "mr" ? "उद्या, संध्या. ४:००" : language === "hi" ? "कल, शाम ४:००" : "Tomorrow, 4:00 PM"),
    fareAmount: 450,
    coordinates: {
      pickup: { lat: 19.9975, lng: 73.7898, label: "Nashik Farm Depot" },
      dropoff: { lat: 19.076, lng: 72.8777, label: "Mumbai Delivery Hub" },
      currentDriverPos: {
        lat: 19.5,
        lng: 73.3,
        label: "Igatpuri Cold Pass (Active)",
        progressPercent: order?.status === "delivered" ? 100 : 55,
      },
    },
    timeline: [
      {
        status: "accepted",
        title: language === "mr" ? "वाहतूकदार नियुक्त" : language === "hi" ? "परिवहन वाहक नियुक्त" : "Logistics Carrier Assigned",
        description: "GreenRoute Agro Carrier accepted dispatch job",
        location: "Nashik Hub",
        timestamp: "08:30 AM",
        completed: true,
      },
      {
        status: "picked_up",
        title: language === "mr" ? "शेत डेपोमधून माल उचलला" : language === "hi" ? "खेत डिपो से माल उठाया" : "Harvest Picked up from Farm Depot",
        description: "Pre-cooled produce loaded with digital scale verification",
        location: "Dindori Farm Depot",
        timestamp: "11:15 AM",
        completed: true,
      },
      {
        status: "in_transit",
        title: language === "mr" ? "मार्गावर वाहतूक सुरू" : language === "hi" ? "रास्ते में परिवहन जारी" : "In Transit via Agro Corridor",
        description: "Cold-chain active at 11.8°C with real-time GPS telemetry",
        location: "Samruddhi Mahamarg NH3",
        timestamp: "01:45 PM",
        completed: order?.status === "in_transit" || order?.status === "delivered",
      },
      {
        status: "delivered",
        title: language === "mr" ? "दाराशी वितरण पूर्ण" : language === "hi" ? "घर तक डिलीवरी पूर्ण" : "Delivered to Doorstep",
        description: "Quality inspection and digital OTP handover",
        location: "Mumbai",
        timestamp: order?.status === "delivered" ? (language === "mr" ? "वितरित" : language === "hi" ? "डिलीवर" : "Delivered") : (language === "mr" ? "अपेक्षित" : language === "hi" ? "अपेक्षित" : "Expected"),
        completed: order?.status === "delivered",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!order) return null;

  const currentStatus = order.status || (order as any).orderStatus || "in_transit";
  const localizedStatus = getLocalizedStatus(currentStatus, language);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  {language === "mr" ? "थेट शीतगृह जीपीएस ट्रॅकिंग" : language === "hi" ? "लाइव कोल्ड-चेन जीपीएस ट्रैकिंग" : "Live Cold-Chain Tracking"}
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {localizedStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500">{language === "mr" ? "ऑर्डर आयडी" : language === "hi" ? "ऑर्डर आईडी" : "Order ID"}: {order.id.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* SVG GPS Interactive Map */}
          <InteractiveMap shipment={shipment} />

          {/* Consignment Items */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-4 h-4 text-emerald-600" />
              <span>{language === "mr" ? "ऑर्डरमधील पिके" : language === "hi" ? "कंसाइनमेंट उत्पाद" : "Consignment Items"} ({order.items.length})</span>
            </h4>
            <div className="divide-y divide-slate-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{item.productName}</div>
                    <div className="text-[11px] text-slate-500">
                      {language === "mr" ? "शेतकरी" : language === "hi" ? "किसान" : "Farmer"}: {item.farmerName} • {language === "mr" ? "प्रमाण" : language === "hi" ? "मात्रा" : "Qty"}: {item.quantity} {getLocalizedUnit(item.unit || "kg", language)}
                    </div>
                  </div>
                  <div className="font-bold text-emerald-800">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
