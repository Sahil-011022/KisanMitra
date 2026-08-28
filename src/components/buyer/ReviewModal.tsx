import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/LanguageContext";
import { X, Star, CheckCircle2, MessageSquare } from "lucide-react";

interface ReviewModalProps {
  productId: string;
  productName: string;
  orderId: string;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ productId, productName, orderId, onClose }) => {
  const { addReview, currentUser } = useApp();
  const { t, language } = useTranslation();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      productId,
      orderId,
      buyerId: currentUser?.id || "u_buyer_1",
      buyerName: currentUser?.name || (language === "mr" ? "सत्यापित खरेदीदार" : language === "hi" ? "सत्यापित खरीदार" : "Verified Buyer"),
      rating,
      comment,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">{t("reviewProduceQualityTitle")}</h3>
              <p className="text-[11px] text-slate-500 truncate max-w-[220px]">{productName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">{t("rateCropQualityFreshness")}</label>
            <div className="flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200 fill-slate-100"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[11px] font-bold text-emerald-700">
              {rating === 5 && t("outstandingFarmFreshness")}
              {rating === 4 && t("greatProduceQuality")}
              {rating === 3 && t("averageHarvest")}
              {rating <= 2 && t("needsImprovement")}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {language === "mr" ? "तुमचा सविस्तर अभिप्राय *" : language === "hi" ? "आपकी विस्तृत प्रतिक्रिया *" : "Your Detailed Feedback *"}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              placeholder={language === "mr" ? "चव, पॅकेजिंग आणि डिलिव्हरी तापमान कसे होते?" : language === "hi" ? "स्वाद, पैकेजिंग और डिलीवरी तापमान कैसा था?" : "How was the taste, packaging, and delivery temperature?"}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            {language === "mr" ? "सत्यापित पुनरावलोकन सबमिट करा" : language === "hi" ? "सत्यापित समीक्षा सबमिट करें" : "Submit Verified Review"}
          </button>
        </form>
      </div>
    </div>
  );
};
