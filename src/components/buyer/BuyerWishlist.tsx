import React from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import { ProductCard } from "../marketplace/ProductCard";
import { ProductDetailModal } from "../marketplace/ProductDetailModal";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

export const BuyerWishlist: React.FC = () => {
  const { wishlist, products, selectedProductId, setSelectedProductId, setCurrentView } = useApp();
  const { t } = useTranslation();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {t("savedProduceBadge")}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{t("myHarvestWishlist")}</h1>
            <p className="text-xs text-slate-500">{t("keepTrackFavoriteFarms")}</p>
          </div>

          <button
            onClick={() => setCurrentView("marketplace")}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("browseMoreCropsBtn")}</span>
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">{t("wishlistEmptyTitle")}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t("wishlistEmptyDesc")}
            </p>
            <button
              onClick={() => setCurrentView("marketplace")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              {t("exploreFreshProduceBtn")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={(id) => setSelectedProductId(id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};
