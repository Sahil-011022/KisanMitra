import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import { X, ShieldAlert, AlertTriangle } from "lucide-react";

interface DisputeModalProps {
  orderId: string;
  onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ orderId, onClose }) => {
  const { createDispute, currentUser, orders } = useApp();
  const { t, language } = useTranslation();
  const order = orders.find((o) => o.id === orderId);

  const [reason, setReason] = useState("Produce Damaged / Spoiled during Transit");
  const [description, setDescription] = useState("");
  const [claimAmount, setClaimAmount] = useState(order?.totalAmount || 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !order) return;

    createDispute({
      orderId: order.id,
      buyerId: order.buyerId,
      buyerName: order.buyerName,
      farmerId: order.items[0]?.farmerId || "u_farmer_1",
      farmerName: order.items[0]?.farmerName || "Farmer",
      reason,
      description,
      claimAmount,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-rose-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{t("fileEscrowDisputeTitle")}</h3>
              <p className="text-[11px] text-slate-500">{language === "mr" ? "ऑर्डर" : language === "hi" ? "ऑर्डर" : "Order"}: {orderId.toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              {t("escrowLockedSafetyNotice")}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("disputeReasonLabel")}</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            >
              <option value="Produce Damaged / Spoiled during Transit">{language === "mr" ? "वाहतुकीदरम्यान मालाचे नुकसान / खराब झाला" : language === "hi" ? "परिवहन के दौरान माल खराब / क्षतिग्रस्त" : "Produce Damaged / Spoiled during Transit"}</option>
              <option value="Wrong Grade / Quality Mismatch">{language === "mr" ? "चुकीचा दर्जा / गुणवत्तेत तफावत" : language === "hi" ? "गलत ग्रेड / गुणवत्ता बेमेल" : "Wrong Grade / Quality Mismatch"}</option>
              <option value="Quantity Shortage Received">{language === "mr" ? "कमी प्रमाणात माल मिळाला" : language === "hi" ? "कम मात्रा प्राप्त हुई" : "Quantity Shortage Received"}</option>
              <option value="Excessive Delivery Delay / Cold Chain Broken">{language === "mr" ? "अत्यधिक विलंब / शीतगृह साखळी तुटली" : language === "hi" ? "अत्यधिक देरी / कोल्ड चेन टूटी" : "Excessive Delivery Delay / Cold Chain Broken"}</option>
              <option value="Other Issue">{language === "mr" ? "इतर समस्या" : language === "hi" ? "अन्य समस्या" : "Other Issue"}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("claimRefundAmountLabel")}</label>
            <input
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(Number(e.target.value))}
              max={order?.totalAmount || 100000}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t("detailedExplanationLabel")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              placeholder={t("disputeExplanationPlaceholder")}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            {t("submitEscrowClaimBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};
