import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { UserRole, FarmingCategory } from "../../types";
import { INITIAL_USERS } from "../../data/mockData";
import {
  X,
  Sprout,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  FileText,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    authModalRole,
    setAuthModalRole,
    loginUser,
    registerUser,
    showToast,
  } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");

  // Farmer specific
  const [farmName, setFarmName] = useState("");
  const [farmSize, setFarmSize] = useState("10 Acres");
  const [farmingCategory, setFarmingCategory] = useState<FarmingCategory>("Vegetables");
  const [kycDocType, setKycDocType] = useState("Kisan Credit Card / 7/12 Land Title");
  const [kycDocNumber, setKycDocNumber] = useState("");

  // Logistics specific
  const [companyName, setCompanyName] = useState("");
  const [vehicleType, setVehicleType] = useState<any>("Refrigerated Container");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [serviceArea, setServiceArea] = useState("Mumbai - Pune - Nashik Agro Belt");

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAuthModalOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};

    if (authModalMode === "login") {
      if (!email.trim()) errs.email = "Email or mobile is required";
      if (!password.trim()) errs.password = "Password is required";
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }

    // Register validations
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Valid email is required";
    if (!mobile.trim() || mobile.replace(/\D/g, "").length < 10) errs.mobile = "10-digit mobile number required";
    if (!password.trim() || password.length < 6) errs.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";

    if (authModalRole === "farmer") {
      if (!farmName.trim()) errs.farmName = "Farm or FPO producer name required";
      if (!kycDocNumber.trim()) errs.kycDocNumber = "Kisan/KYC registration number required";
    }

    if (authModalRole === "buyer") {
      if (!address.trim()) errs.address = "Delivery address is required";
      if (!pincode.trim() || pincode.length < 6) errs.pincode = "Valid 6-digit pincode is required";
    }

    if (authModalRole === "logistics") {
      if (!companyName.trim()) errs.companyName = "Logistics company name is required";
      if (!vehicleNumber.trim()) errs.vehicleNumber = "Vehicle registration number is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (authModalMode === "login") {
      // Find matching mock user or use default
      const matched = INITIAL_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone.includes(email)
      ) || INITIAL_USERS.find((u) => u.role === authModalRole) || INITIAL_USERS[0];

      loginUser(matched);
    } else {
      registerUser({
        name: fullName,
        email,
        phone: mobile,
        role: authModalRole,
        address,
        city: city || (authModalRole === "farmer" ? "Nashik" : "Mumbai"),
        state: stateName,
        pincode: pincode || "400001",
        farmName,
        farmSize,
        farmingCategory,
        kycDocType,
        kycDocNumber,
        companyName,
        vehicleType,
        vehicleNumber,
        serviceAreas: [serviceArea],
      });
    }
  };

  const handleQuickDemoLogin = (userIndex: number) => {
    loginUser(INITIAL_USERS[userIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-emerald-300">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {authModalMode === "login" ? "Sign In to KisanMitra" : "Create Your KisanMitra Account"}
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Connecting Farmers, Direct Buyers & Cold-Chain Logistics
              </p>
            </div>
          </div>

          {/* Role selector tabs */}
          <div className="mt-5 grid grid-cols-4 gap-1.5 p-1 bg-black/20 rounded-xl">
            {[
              { role: "farmer" as UserRole, label: "Farmer", icon: <Sprout className="w-3.5 h-3.5" /> },
              { role: "buyer" as UserRole, label: "Buyer", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
              { role: "logistics" as UserRole, label: "Logistics", icon: <Truck className="w-3.5 h-3.5" /> },
              { role: "admin" as UserRole, label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.role}
                type="button"
                onClick={() => setAuthModalRole(tab.role)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  authModalRole === tab.role
                    ? "bg-white text-emerald-900 shadow-sm"
                    : "text-emerald-100/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick 1-Click Demo Accounts Bar */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-emerald-900 text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            1-Click Demo Login:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleQuickDemoLogin(0)}
              className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium text-[11px] hover:bg-emerald-100 transition-colors"
            >
              🧑‍🌾 Farmer (Ramesh)
            </button>
            <button
              onClick={() => handleQuickDemoLogin(2)}
              className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium text-[11px] hover:bg-emerald-100 transition-colors"
            >
              🛒 Buyer (Priya)
            </button>
            <button
              onClick={() => handleQuickDemoLogin(4)}
              className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium text-[11px] hover:bg-emerald-100 transition-colors"
            >
              🚚 Driver (Anil)
            </button>
            <button
              onClick={() => handleQuickDemoLogin(5)}
              className="px-2 py-0.5 rounded bg-white border border-emerald-200 text-emerald-800 font-medium text-[11px] hover:bg-emerald-100 transition-colors"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {authModalMode === "register" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.fullName ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-500"
                    }`}
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                {errors.fullName && <p className="text-[10px] text-red-600 mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98234 56789"
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.mobile ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-500"
                    }`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                {errors.mobile && <p className="text-[10px] text-red-600 mt-0.5">{errors.mobile}</p>}
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={authModalRole === "farmer" ? "farmer@kisanmitra.in" : "user@domain.com"}
                className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-500"
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            {errors.email && <p className="text-[10px] text-red-600 mt-0.5">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className={authModalMode === "register" ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : ""}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-9 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-emerald-500"
                  }`}
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-600 mt-0.5">{errors.password}</p>}
            </div>

            {authModalMode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:ring-emerald-500"
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-red-600 mt-0.5">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {/* Role specific registration inputs */}
          {authModalMode === "register" && authModalRole === "farmer" && (
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                Farm / FPO Producer Information
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Farm / FPO Name *</label>
                  <input
                    type="text"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. Sahyadri Organic FPO"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  {errors.farmName && <p className="text-[10px] text-red-600 mt-0.5">{errors.farmName}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Farm Size</label>
                  <input
                    type="text"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="e.g. 15.5 Acres"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Primary Farming Category</label>
                  <select
                    value={farmingCategory}
                    onChange={(e) => setFarmingCategory(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                    <option value="Dairy & Poultry">Dairy & Poultry</option>
                    <option value="Organic Horticulture">Organic Horticulture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">KYC Land / Kisan ID *</label>
                  <input
                    type="text"
                    value={kycDocNumber}
                    onChange={(e) => setKycDocNumber(e.target.value)}
                    placeholder="MH-FPO-88492"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  {errors.kycDocNumber && <p className="text-[10px] text-red-600 mt-0.5">{errors.kycDocNumber}</p>}
                </div>
              </div>
            </div>
          )}

          {authModalMode === "register" && authModalRole === "buyer" && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                Delivery Address & Location
              </h5>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat / Shop No., Building, Street Name"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                />
                {errors.address && <p className="text-[10px] text-red-600 mt-0.5">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="400050"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  {errors.pincode && <p className="text-[10px] text-red-600 mt-0.5">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          )}

          {authModalMode === "register" && authModalRole === "logistics" && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                Fleet & Carrier Vehicle Details
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Fleet Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. GreenRoute Agro Express"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  {errors.companyName && <p className="text-[10px] text-red-600 mt-0.5">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Refrigerated Container">Refrigerated Container (Cold-Chain)</option>
                    <option value="Mini Truck (1-2 Ton)">Mini Truck (1-2 Ton)</option>
                    <option value="Heavy Truck (10 Ton)">Heavy Truck (10 Ton)</option>
                    <option value="Electric Cargo">Electric Cargo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Vehicle Plate No. *</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    placeholder="MH-14-GH-4921"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  {errors.vehicleNumber && <p className="text-[10px] text-red-600 mt-0.5">{errors.vehicleNumber}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Service Coverage Area</label>
                  <input
                    type="text"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    placeholder="Mumbai, Pune, Nashik"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            {authModalMode === "login" ? `Sign In as ${authModalRole.toUpperCase()}` : "Complete Registration & Continue"}
          </button>

          {/* Toggle Mode */}
          <div className="text-center pt-2 text-xs text-slate-600">
            {authModalMode === "login" ? (
              <p>
                Don't have a KisanMitra account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode("register");
                    setErrors({});
                  }}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode("login");
                    setErrors({});
                  }}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
