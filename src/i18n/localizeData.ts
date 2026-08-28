import { Product, MarketTrend, Order, OrderItem, QualityGrade, ProductUnit, FarmingCategory, OrderStatus, PaymentStatus } from "../types";
import { Language } from "./types";

// Translation mapping for Crop categories
export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  All: { en: "All Crops", mr: "सर्व पिके", hi: "सभी फसलें" },
  Vegetables: { en: "Vegetables", mr: "भाज्या", hi: "सब्जियां" },
  Fruits: { en: "Fruits", mr: "फळे", hi: "फल" },
  Grains: { en: "Grains & Cereals", mr: "धान्य व तृणधान्ये", hi: "अनाज व दलहन" },
  Pulses: { en: "Pulses & Lentils", mr: "कडधान्ये व डाळी", hi: "दालें व दलहन" },
  Spices: { en: "Spices & Herbs", mr: "मसाले व औषधी वनस्पती", hi: "मसाले व जड़ी-बूटियां" },
  "Dairy & Poultry": { en: "Dairy & Organic", mr: "दुग्धजन्य व सेंद्रिय", hi: "डेयरी व जैविक" },
  "Organic Horticulture": { en: "Organic Horticulture", mr: "सेंद्रिय फलोत्पादन", hi: "जैविक बागवानी" },
  "Cash Crops": { en: "Cash Crops", mr: "नगदी पिके", hi: "व्यावसायिक फसलें" },
};

// Translation mapping for Units
export const UNIT_TRANSLATIONS: Record<string, Record<Language, string>> = {
  kg: { en: "kg", mr: "किलो", hi: "किलो" },
  quintal: { en: "quintal", mr: "क्विंटल", hi: "क्विंटल" },
  "crate (20kg)": { en: "crate (20kg)", mr: "क्रेट (२० किलो)", hi: "क्रेट (२० किलो)" },
  ton: { en: "ton", mr: "टन", hi: "टन" },
  dozen: { en: "dozen", mr: "डझन", hi: "दर्जन" },
  litre: { en: "litre", mr: "लिटर", hi: "लीटर" },
  box: { en: "box", mr: "बॉक्स", hi: "डिब्बा / बॉक्स" },
};

// Translation mapping for Quality Grades
export const GRADE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "Grade A+": { en: "Grade A+", mr: "प्रत A+ (उत्कृष्ट)", hi: "ग्रेड A+ (सर्वोत्तम)" },
  "Grade A": { en: "Grade A", mr: "प्रत A (उत्तम)", hi: "ग्रेड A (उत्तम)" },
  "Grade B": { en: "Grade B", mr: "प्रत B (मध्यम)", hi: "ग्रेड B (मध्यम)" },
  "Export Quality": { en: "Export Quality", mr: "निर्यात दर्जा (Export)", hi: "निर्यात गुणवत्ता" },
};

// Translation mapping for Order & Payment Statuses
export const STATUS_TRANSLATIONS: Record<string, Record<Language, string>> = {
  placed: { en: "Placed", mr: "नोंदवली गेली", hi: "दर्ज की गई" },
  pending: { en: "Pending", mr: "प्रलंबित", hi: "लंबित" },
  preparing: { en: "Harvesting & Preparing", mr: "कापणी व प्रतवारी सुरू", hi: "कटाई व तैयारी जारी" },
  confirmed: { en: "Confirmed", mr: "निश्चित", hi: "पुष्टि की गई" },
  picked_up: { en: "Picked Up from Farm", mr: "शेतातून माल उचलला", hi: "खेत से उठाया गया" },
  in_transit: { en: "In Transit (Cold-Chain)", mr: "मार्गावर (शीतगृह वाहन)", hi: "रास्ते में (कोल्ड-चेन)" },
  out_for_delivery: { en: "Out for Delivery", mr: "वितरणासाठी निघाले", hi: "डिलीवरी के लिए रवाना" },
  delivered: { en: "Delivered & Verified", mr: "वितरित व तपासणी पूर्ण", hi: "डिलीवर व सत्यापित" },
  cancelled: { en: "Cancelled", mr: "रद्द", hi: "रद्द" },
  paid: { en: "Paid", mr: "पैसे भरले", hi: "भुगतान पूर्ण" },
  escrow_held: { en: "🔒 Escrow Protected", mr: "🔒 एस्क्रो सुरक्षित", hi: "🔒 एस्क्रो सुरक्षित" },
  released: { en: "✓ Paid to Farmer", mr: "✓ शेतकऱ्याला वर्ग", hi: "✓ किसान को भुगतान" },
};

// Translation mapping for Locations
export const LOCATION_TRANSLATIONS: Record<string, Record<Language, string>> = {
  "Nashik, Maharashtra": { en: "Nashik, Maharashtra", mr: "नाशिक, महाराष्ट्र", hi: "नासिक, महाराष्ट्र" },
  "Nashik, MH": { en: "Nashik, MH", mr: "नाशिक, महा.", hi: "नासिक, महा." },
  "Lasalgaon - Nashik, MH": { en: "Lasalgaon - Nashik, MH", mr: "लासलगाव - नासिक, महा.", hi: "लासलगांव - नासिक, महा." },
  "Ludhiana, Punjab": { en: "Ludhiana, Punjab", mr: "लुधियाना, पंजाब", hi: "लुधियाना, पंजाब" },
  "Ratnagiri / Nashik Hub, MH": { en: "Ratnagiri / Nashik Hub, MH", mr: "रत्नागिरी / नाशिक केंद्र, महा.", hi: "रत्नागिरी / नासिक हब, महा." },
  "Nashik Valley, MH": { en: "Nashik Valley, MH", mr: "नाशिक व्हॅली, महा.", hi: "नासिक घाटी, महा." },
  "Nashik Dairy Coop, MH": { en: "Nashik Dairy Coop, MH", mr: "नाशिक दुग्ध सहकारी, महा.", hi: "नासिक डेयरी सहकारी, महा." },
  "Mumbai MMR": { en: "Mumbai MMR", mr: "मुंबई महानगर", hi: "मुंबई महानगर" },
  "Bandra West, Mumbai": { en: "Bandra West, Mumbai", mr: "वांद्रे पश्चिम, मुंबई", hi: "बांद्रा पश्चिम, मुंबई" },
  "Vashi APMC Market, Navi Mumbai": { en: "Vashi APMC Market, Navi Mumbai", mr: "वाशी कृषी उत्पन्न बाजार समिती, नवी मुंबई", hi: "वाशी एपीएमसी मार्केट, नवी मुंबई" },
  "Pune City": { en: "Pune City", mr: "पुणे शहर", hi: "पुणे शहर" },
  "Pune - Mumbai Expressway Hub": { en: "Pune - Mumbai Expressway Hub", mr: "पुणे - मुंबई द्रुतगती मार्ग केंद्र", hi: "पुणे - मुंबई एक्सप्रेसवे हब" },
};

// Product Translations by ID
export const PRODUCT_LOCALIZATIONS: Record<string, Record<Language, { name: string; description: string; variety?: string }>> = {
  prod_1: {
    en: {
      name: "Sun-Ripened Organic Red Tomatoes (Hybrid 1057)",
      description: "Naturally ripened, pesticide-free hybrid tomatoes grown using drip fertigation. Firm skin, rich lycopene content, high pulp yield, ideal for long-shelf life and culinary retail.",
      variety: "Hybrid 1057",
    },
    mr: {
      name: "सूर्यपक्व सेंद्रिय लाल टोमॅटो (संकरित १०५७)",
      description: "ठिबक सिंचनावर नैसर्गिकरीत्या पिकवलेले, कीटकनाशकमुक्त संकरित टोमॅटो. घट्ट साल, जास्त गर आणि दीर्घ टिकवणक्षमता — किरकोळ व हॉटेल वापरासाठी सर्वोत्तम.",
      variety: "संकरित १०५७",
    },
    hi: {
      name: "धूप में पके जैविक लाल टमाटर (हाइब्रिड 1057)",
      description: "ड्रिप सिंचाई द्वारा प्राकृतिक रूप से उगाए गए कीटनाशक-मुक्त हाइब्रिड टमाटर। सख्त छिलका, भरपूर गूदा और लंबी शेल्फ-लाइफ के साथ रसोई के लिए उत्तम।",
      variety: "हाइब्रिड 1057",
    },
  },
  prod_2: {
    en: {
      name: "Nashik Special Premium Red Onions (Garwa Quality)",
      description: "Export quality, sun-cured Garwa variety red onions with thick skin and low moisture for 4+ months storage stability. Uniform 50-60mm size sorting.",
      variety: "Garwa Selection",
    },
    mr: {
      name: "नाशिक स्पेशल दर्जेदार लाल कांदा (गरवा प्रत)",
      description: "निर्यात दर्जाचा, उन्हात चांगला वाळवलेला गरवा लाल कांदा. जाड पापुद्रा, कमी ओलावा आणि ४+ महिने उत्तम टिकण्याची क्षमता. एकसारखा ५०-६० मिमी आकार.",
      variety: "गरवा निवडक",
    },
    hi: {
      name: "नासिक स्पेशल प्रीमियम लाल प्याज (गरवा गुणवत्ता)",
      description: "निर्यात गुणवत्ता का अच्छी तरह सुखाया गया गरवा लाल प्याज। मोटा छिलका, कम नमी और 4+ महीने तक भंडारण क्षमता। एकसमान 50-60 मिमी आकार।",
      variety: "गरवा सेलेक्शन",
    },
  },
  prod_3: {
    en: {
      name: "Broccoli",
      description: "Fresh, high-quality broccoli with a firm texture and rich nutritional value.",
      variety: "Premium",
    },
    mr: {
      name: "ब्रोकोली",
      description: "ताजी आणि उच्च दर्जाची ब्रोकोली, जे अत्यंत पौष्टिक आणि चविष्ट आहे.",
      variety: "प्रिमियम",
    },
    hi: {
      name: "ब्रोकोली",
      description: "ताजा और उच्च गुणवत्ता वाली ब्रोकोली, जो पौष्टिक और स्वादिष्ट है।",
      variety: "प्रीमियम",
    },
  },
  prod_4: {
    en: {
      name: "Royal Traditional Basmati Rice 1121 (Aged 2 Years)",
      description: "Authentic long-grain scented Basmati rice, slow-aged in clean silos for 24 months. Cooked grain elongates to 22mm with enchanting natural floral aroma.",
      variety: "1121 Royal Aged",
    },
    mr: {
      name: "शाही अस्सल बासमती तांदूळ ११२१ (२ वर्षे जुना)",
      description: "२४ महिने नैसर्गिक पद्धतीने साठवलेला लांब दाण्याचा सुगंधी बासमती तांदूळ. शिजवल्यावर दाणा २२ मिमी पर्यंत लांब होतो आणि मोहक सुगंध येतो.",
      variety: "११२१ शाही जुना",
    },
    hi: {
      name: "शाही पारंपरिक बासमती चावल 1121 (2 वर्ष पुराना)",
      description: "24 महीने तक साइलो में परिपक्व किया गया लंबा सुगंधित बासमती चावल। पकने पर 22 मिमी तक लंबा दाना और मनमोहक प्राकृतिक खुशबू।",
      variety: "1121 रॉयल एज्ड",
    },
  },
  prod_5: {
    en: {
      name: "Whole Wheat Grain (MP Sharbati Gold Heavy Kernel)",
      description: "Golden lustre Sharbati wheat grown in nutrient-dense soils. High gluten and natural sweetness for making fluffy rotis with superior dough elasticity.",
      variety: "Sharbati Gold",
    },
    mr: {
      name: "संपूर्ण गहू (खास शरबती सुवर्ण दाणेदार)",
      description: "कसदार काळ्या जमिनीत पिकवलेला चमकदार शरबती गहू. मऊ, टम्म फुगणाऱ्या चपात्यांसाठी नैसर्गिक गोडवा आणि उच्च लवचिकता.",
      variety: "शरबती गोल्ड",
    },
    hi: {
      name: "साबुत गेहूं (एमपी शरबती गोल्ड भारी दाना)",
      description: "पोषक तत्वों से भरपूर मिट्टी में उगा चमकदार शरबती गेहूं। नरम और फूली हुई रोटियों के लिए प्राकृतिक मिठास व उच्च ग्लूटेन।",
      variety: "शरबती गोल्ड",
    },
  },
  prod_6: {
    en: {
      name: "Ratnagiri Alphonso Mangoes (GI Tagged Grade A+)",
      description: "Naturally carbide-free tree-ripened Hapus Alphonso mangoes. Saffron pulp, thin seed, sublime sweetness and GI Geographical Indication certification.",
      variety: "Hapus Ratnagiri",
    },
    mr: {
      name: "रत्नागिरी हापूस आंबा (GI मानांकन प्रत A+)",
      description: "झाडावर नैसर्गिकरीत्या पिकवलेला अस्सल रत्नागिरी हापूस. केशरयुक्त गर, बारीक कोय, अत्यंत गोड चव आणि अधिकृत GI भौगोलिक मानांकन प्रमाणित.",
      variety: "हापूस रत्नागिरी",
    },
    hi: {
      name: "रत्नागिरी अलफांसो आम (GI टैग ग्रेड A+)",
      description: "पेड़ पर प्राकृतिक रूप से पका कार्बाइड-मुक्त हापुस आम। गहरा केसरिया गूदा, पतली गुठली, बेमिसाल मिठास और जीआई टैग प्रमाणित।",
      variety: "हापुस रत्नागिरी",
    },
  },
  prod_7: {
    en: {
      name: "Thompson Seedless Green Grapes (Export Bunch)",
      description: "Crunchy, sweet, and seedless green grapes. High brix index (18+), zero chemical wash, packed in breathable perforated fruit punnets.",
      variety: "Thompson Seedless",
    },
    mr: {
      name: "थॉमसन बिनबियांची हिरवी द्राक्षे (निर्यात दर्जा घड)",
      description: "कुरकुरीत, गोड आणि बिनबियांची ताजी द्राक्षे. उच्च ब्रिक्स साखर (१८+), कीटकनाशक विरहित आणि हवा खेळत्या बास्केटमध्ये पॅक केलेले.",
      variety: "थॉमसन सीडलेस",
    },
    hi: {
      name: "थॉम्पसन बिना बीज वाले हरे अंगूर (निर्यात गुच्छा)",
      description: "कुरकुरे, मीठे और बिना बीज के ताज़ा हरे अंगूर। उच्च मिठास (18+ ब्रिक्स), शून्य रसायन धुलाई और छिद्रित बॉक्स में पैक।",
      variety: "थॉम्पसन सीडलेस",
    },
  },
  prod_8: {
    en: {
      name: "Organic Desi Chickpeas / Kabuli Chana (Bold 12mm)",
      description: "Machine-cleaned, uniform 12mm jumbo Kabuli chickpeas. Unpolished, high in plant protein and dietary fibre. Perfect for curries and hummus.",
      variety: "Jumbo Kabuli 12mm",
    },
    mr: {
      name: "सेंद्रिय देशी काबुली चणा (ठळक १२ मिमी दाणा)",
      description: "यंत्राने स्वच्छ केलेला मोठा १२ मिमी काबुली चणा. पॉलिश विरहित, उच्च प्रथिने आणि फायबरयुक्त — छोले आणि उसळीसाठी उत्तम.",
      variety: "जम्बो काबुली १२ मिमी",
    },
    hi: {
      name: "जैविक काबुली चना (मोटा 12 मिमी दाना)",
      description: "मशीन से साफ किया गया 12 मिमी जंबो काबुली चना। बिना पॉलिश, प्रोटीन और फाइबर से भरपूर। छोले और करी के लिए एकदम सही।",
      variety: "जंबो काबुली 12 मिमी",
    },
  },
  prod_9: {
    en: {
      name: "Fresh Artisanal A2 Gir Cow Farm Paneer (Made to Order)",
      description: "Unpressed natural soft paneer crafted using raw whole A2 Gir Cow milk and lemon coagulant. Zero preservatives or starch fillers. Chilled dispatched within 6 hours of milking.",
      variety: "A2 Gir Whole Milk",
    },
    mr: {
      name: "ताजे शुद्ध A2 गीर गायीचे पनीर (ऑर्डरनुसार तयार)",
      description: "अस्सल A2 देशी गीर गायीच्या दुधापासून आणि लिंबाच्या रसापासून बनवलेले मऊ पनीर. कोणतेही रासायनिक घटक किंवा स्टार्च नाही. धार काढल्यापासून ६ तासांत वितरित.",
      variety: "A2 गीर संपूर्ण दूध",
    },
    hi: {
      name: "ताज़ा शुद्ध A2 गिर गाय का पनीर (ऑर्डर पर निर्मित)",
      description: "शुद्ध A2 गिर गाय के दूध और नींबू से तैयार किया गया प्राकृतिक मलाईदार पनीर। कोई संरक्षक या स्टार्च नहीं। मिल्किंग के 6 घंटे के भीतर भेजा जाता है।",
      variety: "A2 गिर शुद्ध दूध",
    },
  },
};

// Mandi Trends Localizations
export const MANDI_TRENDS_LOCALIZATIONS: Record<string, Record<Language, { cropName: string; summary: string; hotspots: string[] }>> = {
  trend_1: {
    en: {
      cropName: "Tomato (Hybrid Red)",
      summary: "Monsoon rains have delayed northern crop arrivals. Expect prices to remain firm between ₹34-40/kg for the next 3 weeks.",
      hotspots: ["Mumbai MMR", "Pune City", "Surat Hub", "Bangalore Urban"],
    },
    mr: {
      cropName: "टोमॅटो (संकरित लाल)",
      summary: "पावसामुळे उत्तरेकडील आवक मंदावली आहे. पुढील ३ आठवडे दर ₹३४-४०/किलोच्या दरम्यान मजबूत राहण्याचा अंदाज आहे.",
      hotspots: ["मुंबई महानगर", "पुणे शहर", "सुरत केंद्र", "बंगळुरू शहर"],
    },
    hi: {
      cropName: "टमाटर (हाइब्रिड लाल)",
      summary: "मानसून की बारिश के कारण उत्तरी आवक में देरी हुई है। अगले 3 हफ्तों तक कीमतें ₹34-40/किग्रा के बीच मजबूत रहने की उम्मीद है।",
      hotspots: ["मुंबई महानगर", "पुणे शहर", "सूरत हब", "बेंगलुरु अर्बन"],
    },
  },
  trend_2: {
    en: {
      cropName: "Red Onion (Garwa Grade A)",
      summary: "Storage stock depletion in Maharashtra mandis is driving institutional buying. Strong opportunity for direct farm batches.",
      hotspots: ["Delhi NCR", "Kolkata", "Hyderabad", "Mumbai"],
    },
    mr: {
      cropName: "लाल कांदा (गरवा प्रत A)",
      summary: "महाराष्ट्रातील बाजार समित्यांमध्ये साठा कमी झाल्यामुळे मोठी खरेदी सुरू आहे. थेट शेतातून विक्रीसाठी ही उत्तम संधी आहे.",
      hotspots: ["दिल्ली NCR", "कोलकाता", "हैदराबाद", "मुंबई"],
    },
    hi: {
      cropName: "लाल प्याज (गरवा ग्रेड A)",
      summary: "महाराष्ट्र की मंडियों में स्टॉक कम होने से संस्थागत खरीदारी बढ़ रही है। सीधे खेत से बेचने का यह शानदार अवसर है।",
      hotspots: ["दिल्ली NCR", "कोलकाता", "हैदराबाद", "मुंबई"],
    },
  },
  trend_3: {
    en: {
      cropName: "Basmati Rice 1121",
      summary: "Global export demand remains robust. Steady price trajectory with minimal volatility.",
      hotspots: ["Gulf Export Hubs", "Delhi NCR", "Chandigarh", "Bengaluru"],
    },
    mr: {
      cropName: "बासमती तांदूळ ११२१",
      summary: "जागतिक निर्यातीची मागणी मजबूत आहे. दर स्थिर राहून शेतकरी आणि FPO साठी चांगला परतावा कायम राहील.",
      hotspots: ["खाडी देश निर्यात केंद्र", "दिल्ली NCR", "चंदिगढ", "बंगळुरू"],
    },
    hi: {
      cropName: "बासमती चावल 1121",
      summary: "वैश्विक निर्यात मांग मजबूत बनी हुई है। न्यूनतम उतार-चढ़ाव के साथ स्थिर मूल्य का रुख।",
      hotspots: ["खाड़ी निर्यात हब", "दिल्ली NCR", "चंडीगढ़", "बेंगलुरु"],
    },
  },
  trend_4: {
    en: {
      cropName: "Organic Broccoli",
      summary: "High demand from health-conscious urban consumers and premium grocery chains is maintaining strong price levels.",
      hotspots: ["Mumbai Supermarkets", "Pune Retail", "Delhi NCR", "Bangalore"],
    },
    mr: {
      cropName: "सेंद्रिय ब्रोकोली",
      summary: "आरोग्याबाबत जागरूक शहरी ग्राहक आणि प्रीमियम सुपरमार्केट्सकडून असलेल्या मागणीमुळे दर चढे राहिले आहेत.",
      hotspots: ["मुंबई सुपरमार्केट्स", "पुणे किरकोळ बाजार", "दिल्ली एनसीआर", "बंगळुरू"],
    },
    hi: {
      cropName: "जैविक ब्रोकोली",
      summary: "स्वास्थ्य के प्रति जागरूक शहरी उपभोक्ताओं और प्रीमियम सुपरमार्केट चेन से भारी मांग के कारण दरें ऊंची बनी हुई हैं।",
      hotspots: ["मुंबई सुपरमार्केट्स", "पुणे रिटेल", "दिल्ली एनसीआर", "बेंगलुरु"],
    },
  },
  trend_5: {
    en: {
      cropName: "Sharbati Golden Wheat",
      summary: "Abundant buffer stocks across national godowns keeping spot prices stable.",
      hotspots: ["Indore", "Sehore", "Ahmedabad", "Pune"],
    },
    mr: {
      cropName: "शरबती सुवर्ण गहू",
      summary: "गोदामांमध्ये मुबलक साठा असल्यामुळे बाजारभाव नियंत्रित व स्थिर आहेत.",
      hotspots: ["इंदूर", "सिहोर", "अहमदाबाद", "पुणे"],
    },
    hi: {
      cropName: "शरबती गोल्डन गेहूं",
      summary: "राष्ट्रीय गोदामों में पर्याप्त बफर स्टॉक होने से हाजिर कीमतें स्थिर बनी हुई हैं।",
      hotspots: ["इंदौर", "सीहोर", "अहमदाबाद", "पुणे"],
    },
  },
};

// Helper Functions
export const getLocalizedProduct = (product: Product, lang: Language): Product => {
  const loc = PRODUCT_LOCALIZATIONS[product.id]?.[lang];
  const cat = CATEGORY_TRANSLATIONS[product.category]?.[lang] || product.category;
  const unit = UNIT_TRANSLATIONS[product.unit]?.[lang] || product.unit;
  const grade = GRADE_TRANSLATIONS[product.qualityGrade]?.[lang] || product.qualityGrade;
  const locStr = LOCATION_TRANSLATIONS[product.location]?.[lang] || product.location;
  const farmerLoc = LOCATION_TRANSLATIONS[product.farmerLocation]?.[lang] || product.farmerLocation;

  return {
    ...product,
    name: loc?.name || product.name,
    description: loc?.description || product.description,
    category: cat,
    unit: unit as ProductUnit,
    qualityGrade: grade as QualityGrade,
    location: locStr,
    farmerLocation: farmerLoc,
  };
};

export const getLocalizedMandiTrend = (trend: MarketTrend, lang: Language): MarketTrend => {
  const loc = MANDI_TRENDS_LOCALIZATIONS[trend.id]?.[lang];
  const cat = CATEGORY_TRANSLATIONS[trend.category]?.[lang] || trend.category;
  const unit = UNIT_TRANSLATIONS[trend.unit]?.[lang] || trend.unit;

  return {
    ...trend,
    cropName: loc?.cropName || trend.cropName,
    category: cat,
    unit: unit as ProductUnit,
    regionalHotspots: loc?.hotspots || trend.regionalHotspots,
    aiPriceRecommendation: {
      ...trend.aiPriceRecommendation,
      summary: loc?.summary || trend.aiPriceRecommendation.summary,
    },
  };
};

export const getLocalizedCategory = (category: string, lang: Language): string => {
  return CATEGORY_TRANSLATIONS[category]?.[lang] || category;
};

export const getLocalizedUnit = (unit: string, lang: Language): string => {
  return UNIT_TRANSLATIONS[unit]?.[lang] || unit;
};

export const getLocalizedGrade = (grade: string, lang: Language): string => {
  return GRADE_TRANSLATIONS[grade]?.[lang] || grade;
};

export const getLocalizedStatus = (status: string, lang: Language): string => {
  return STATUS_TRANSLATIONS[status]?.[lang] || status;
};

export const getLocalizedLocation = (loc: string, lang: Language): string => {
  return LOCATION_TRANSLATIONS[loc]?.[lang] || loc;
};
