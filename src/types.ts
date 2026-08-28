export type UserRole = "farmer" | "buyer" | "logistics" | "admin";

export type FarmingCategory =
  | "Vegetables"
  | "Fruits"
  | "Grains"
  | "Pulses"
  | "Spices"
  | "Dairy & Poultry"
  | "Organic Horticulture"
  | "Cash Crops";

export type QualityGrade = "Grade A+" | "Grade A" | "Grade B" | "Export Quality";

export type ProductUnit = "kg" | "quintal" | "crate (20kg)" | "ton" | "dozen" | "litre" | "box";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  location: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  profileImage?: string;
  status: "active" | "pending_verification" | "suspended";
  createdAt: string;

  // Farmer specific details
  farmName?: string;
  farmSize?: string;
  farmingCategory?: FarmingCategory;
  verificationStatus?: "Pending" | "Under Review" | "Approved" | "Rejected";
  kycDocNumber?: string;
  kycDocType?: string;

  // Logistics specific details
  companyName?: string;
  vehicleType?: "Mini Truck (1-2 Ton)" | "Heavy Truck (10 Ton)" | "Refrigerated Container" | "Three-Wheeler Pickup" | "Electric Cargo";
  vehicleNumber?: string;
  serviceAreas?: string[];
  maxLoadCapacity?: string;
  rating?: number;
  completedDeliveries?: number;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  farmerLocation: string;
  farmerPhone: string;
  farmerRating: number;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: ProductUnit;
  availableQuantity: number;
  minOrderQuantity: number;
  harvestDate: string;
  location: string;
  qualityGrade: QualityGrade;
  isOrganic: boolean;
  organicCertificateNumber?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  status: "active" | "inactive" | "sold_out";
  featured?: boolean;
  viewsCount: number;
  salesCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "paid" | "pending" | "escrow_held" | "released";

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: ProductUnit;
  image: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerCity: string;
  buyerState: string;
  buyerPincode: string;
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "UPI / QR" | "Debit / Credit Card" | "Net Banking" | "Cash on Delivery" | "AgriEscrow Safe Pay";
  deliveryOption: "Standard Cold-Chain" | "Express Green Logistics" | "Farmer Self-Delivery";
  trackingNumber?: string;
  shipmentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryDate: string;
}

export interface ShipmentTimelineEvent {
  status: string;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export type ShipmentStatus =
  | "requested"
  | "accepted"
  | "pickup_scheduled"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Shipment {
  id: string;
  orderId: string;
  orderNumber: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  logisticsPartnerId?: string;
  logisticsPartnerName?: string;
  logisticsPhone?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  pickupLocation: string;
  pickupAddress: string;
  deliveryLocation: string;
  deliveryAddress: string;
  productSummary: string;
  totalWeightKg: number;
  specialInstructions?: string;
  preferredPickupTime: string;
  status: ShipmentStatus;
  estimatedDistanceKm: number;
  estimatedDeliveryTime: string;
  fareAmount: number;
  coordinates: {
    pickup: { lat: number; lng: number; label: string };
    dropoff: { lat: number; lng: number; label: string };
    currentDriverPos: { lat: number; lng: number; label: string; progressPercent: number };
  };
  timeline: ShipmentTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface InquiryMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Inquiry {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserRole: UserRole;
  fromUserPhone?: string;
  toUserId: string;
  toUserName: string;
  toUserRole: UserRole;
  productId?: string;
  productName?: string;
  subject: string;
  messages: InquiryMessage[];
  status: "open" | "replied" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  targetType: "product" | "farmer" | "logistics";
  targetId: string;
  targetName: string;
  rating: number; // 1 - 5
  comment: string;
  photoUrl?: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  targetRole: UserRole | "all";
  type: "order" | "shipment" | "inquiry" | "price_alert" | "verification" | "system" | "ai_insight";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionTab?: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  orderNumber: string;
  reportedByUserId: string;
  reportedByName: string;
  reportedByRole: UserRole;
  category: "Quality / Produce Rot" | "Delivery Delay" | "Incorrect Weight / Quantity" | "Payment / Escrow Issue" | "Other";
  description: string;
  status: "open" | "under_review" | "resolved" | "rejected";
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface MarketTrend {
  id: string;
  cropName: string;
  category: string;
  currentPrice: number;
  previousPrice: number;
  changePercent: number;
  unit: string;
  demandTrend: "HIGH_DEMAND" | "STABLE" | "MODERATE" | "DECREASING";
  regionalHotspots: string[];
  mandiArrivalVolume: string;
  peakSeasonMonths: string;
  priceHistory: { month: string; price: number }[];
  aiPriceRecommendation: {
    recommended: number;
    min: number;
    max: number;
    summary: string;
  };
}
