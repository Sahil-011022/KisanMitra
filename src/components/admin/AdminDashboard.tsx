import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  ShoppingBag,
  TrendingUp,
  Truck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Scale,
  Sparkles,
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    shipments,
    disputes,
    resolveDispute,
    updateProduct,
    showToast,
  } = useApp();
  const { t, language } = useTranslation();

  const [activeTab, setActiveTab] = useState<"overview" | "disputes" | "kyc" | "products">("overview");

  // Summary Metrics
  const totalVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeEscrowAmount = orders
    .filter((o) => o.paymentStatus === "escrow_locked")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingDisputes = disputes.filter((d) => d.status === "open" || d.status === "under_review");

  // Quality flag toggling
  const handleToggleProductStatus = (productId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "flagged" : "active";
    updateProduct(productId, { status: nextStatus as any });
    showToast(
      nextStatus === "flagged" ? "Produce listing flagged for quality review" : "Produce listing reinstated to marketplace",
      nextStatus === "flagged" ? "info" : "success"
    );
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen py-8 text-[#1A2E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Header */}
        <div className="bg-[#0F291E] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm border border-emerald-900/40">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t("ecosystemGovernance")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t("adminConsoleTitle")}
              </h1>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                {t("adminConsoleSubtitle")}
              </p>
            </div>

            <div className="flex gap-2">
              <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-2xl text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t("allServicesOperational")}</span>
              </span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("grossGMV")}</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">₹{(totalVolume + 450000).toLocaleString()}</div>
            <p className="text-[10.5px] text-emerald-600 font-medium">{t("monthOverMonth")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("activeEscrowLocked")}</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-700">₹{activeEscrowAmount.toLocaleString()}</div>
            <p className="text-[10.5px] text-slate-500">{t("secureAutomatedSettlement")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("escrowDisputes")}</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-rose-700">{pendingDisputes.length} {language === "mr" ? "सक्रिय" : language === "hi" ? "सक्रिय" : "Active"}</div>
            <p className="text-[10.5px] text-rose-600 font-medium">{t("resolutionSLA")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{t("verifiedProducers")}</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900">1,248 {language === "mr" ? "उत्पादक" : language === "hi" ? "उत्पादक" : "Producers"}</div>
            <p className="text-[10.5px] text-blue-600 font-medium">{t("kycApprovedRate")}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { key: "overview", label: t("systemOverviewTab") },
            { key: "disputes", label: `${t("disputesResolutionTab")} (${pendingDisputes.length})` },
            { key: "products", label: `${t("catalogModerationTab")} (${products.length})` },
            { key: "kyc", label: t("kycTab") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === item.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">{t("recentTransactions")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-medium">
                      <th className="pb-2">{t("orderIdCol")}</th>
                      <th className="pb-2">{t("buyerCol")}</th>
                      <th className="pb-2">{t("amountCol")}</th>
                      <th className="pb-2">{t("deliveryStatusCol")}</th>
                      <th className="pb-2">{t("escrowStatusCol")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="py-2.5">
                        <td className="py-2.5 font-bold text-slate-900">#{o.id.toUpperCase()}</td>
                        <td className="py-2.5 text-slate-700">{o.buyerName}</td>
                        <td className="py-2.5 font-bold text-emerald-800">₹{o.totalAmount.toLocaleString()}</td>
                        <td className="py-2.5">
                          <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            {(o.status || (o as any).orderStatus || "placed").replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {o.paymentStatus === "escrow_locked" || o.paymentStatus === "escrow_held"
                              ? (language === "mr" ? "एस्क्रो सुरक्षित" : language === "hi" ? "एस्क्रो सुरक्षित" : "Escrow Locked")
                              : o.paymentStatus === "paid"
                              ? (language === "mr" ? "भरणा झाला" : language === "hi" ? "भुगतान हुआ" : "Paid")
                              : (language === "mr" ? "वर्ग केले" : language === "hi" ? "हस्तांतरित" : "Released")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm">{t("systemComplianceLogs")}</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-800">{t("coldChainSLA")}</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{t("coldChainSLADesc")}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-800">{t("pesticideAudits")}</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{t("pesticideAuditsDesc")}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-slate-800">{t("escrowPayoutTime")}</div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{t("escrowPayoutTimeDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "disputes" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">{t("escrowArbitrationDesk")}</h3>
            {disputes.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">{t("noDisputesFiled")}</div>
            ) : (
              <div className="space-y-4">
                {disputes.map((disp) => {
                  const isResolved = disp.status === "resolved";
                  return (
                    <div
                      key={disp.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm">
                            {language === "mr" ? "वाद" : language === "hi" ? "विवाद" : "Dispute"} #{disp.id}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">
                            {language === "mr" ? "ऑर्डर" : language === "hi" ? "ऑर्डर" : "Order"} #{disp.orderId.toUpperCase()}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isResolved ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {disp.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block">{t("buyerNameLabel")}</span>
                          <span className="font-bold text-slate-800">{disp.buyerName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">{t("producerFarmerLabel")}</span>
                          <span className="font-bold text-slate-800">{disp.farmerName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">{t("claimAmountLabel")}</span>
                          <span className="font-bold text-rose-700 text-sm">₹{disp.claimAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-slate-900">{t("reasonLabel")} {disp.reason}</div>
                        <p className="text-slate-600 mt-0.5">{disp.description}</p>
                      </div>

                      {!isResolved && (
                        <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              resolveDispute(
                                disp.id,
                                "Refund Approved: Cargo quality inspection validated damage. Full refund credited to Buyer wallet."
                              )
                            }
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t("approveBuyerRefundBtn")}</span>
                          </button>

                          <button
                            onClick={() =>
                              resolveDispute(
                                disp.id,
                                "Claim Dismissed: Cold-chain and harvest grading logs verified compliant. Escrow released to Farmer."
                              )
                            }
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t("releaseEscrowToFarmerBtn")}</span>
                          </button>
                        </div>
                      )}

                      {isResolved && disp.resolutionNotes && (
                        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-900 font-medium text-[11px]">
                          <strong>{t("resolutionDecision")}</strong> {disp.resolutionNotes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">{t("cropCatalogModeration")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{prod.name}</h4>
                      <p className="text-[11px] text-slate-500">{prod.farmerName} • {prod.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        prod.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {prod.status}
                    </span>

                    <button
                      onClick={() => handleToggleProductStatus(prod.id, prod.status)}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] border transition-colors cursor-pointer ${
                        prod.status === "active"
                          ? "bg-white hover:bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                      }`}
                    >
                      {prod.status === "active" ? t("flagForAuditBtn") : t("reinstateListingBtn")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "kyc" && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">{t("producersFpoKyc")}</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: "Sahyadri Farmers Producer Co.", type: "FPO (450 Members)", region: "Nashik, MH", status: "Verified" },
                { name: "Karnal Rice Growers Federation", type: "FPO (220 Members)", region: "Karnal, HR", status: "Verified" },
                { name: "Wayanad Organic Spices Collective", type: "FPO (180 Members)", region: "Wayanad, KL", status: "Verified" },
                { name: "GreenRoute Agro Cold-Chain Ltd", type: "Logistics Carrier", region: "All-India", status: "Verified" },
              ].map((k, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{k.name}</div>
                    <div className="text-slate-500 text-[11px]">{k.type} • {k.region}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    {t("verifiedBadge")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
