/**
 * ============================================================================
 * 👑 THE OMNISCIENT PRICE INTELLIGENCE BRAIN (V5.0 - GOD MODE EDITION) 👑
 * ============================================================================
 * 🧠 35 Central Brains for Ultimate E-commerce Scraping, Validation & Parsing.
 * 🛡️ Anti-Scam, Anti-Junk, Anti-Bundle, and Deep Specs Extraction.
 * ============================================================================
 */

// ==========================================
// 🚫 1. القوائم السوداء (The Blacklists) - 9 عقول للتدمير الفوري
// ==========================================
const ANTI_BUNDLE_KEYWORDS = ['باندل', 'باقه', 'باقة', 'هديه', 'هدية', 'مجانا', 'مجاني', 'مع سماعه', 'مع ساعه', '+', 'زائد', 'مرفق', 'طابعه هديه', 'قلم مجاني', 'شنطه هديه', 'ماوس هديه', 'توفير', 'عرض مزدوج', '2 في 1', '3 في 1', '4 في 1', 'مجموعه', 'طقم', 'شاحن هديه', 'كارت ميموري هديه', 'باقه هدايا', 'اضافي', 'إضافي', 'تخفيض كومبو', 'جهازين', 'قطعتين', 'عبوه من 2', 'مزدوج', 'مزدوجة', 'حصري', 'عرض خاص مع', 'شامله هديه', 'يأتي مع', 'مع ايربودز', 'مع باور بانك', 'مع سمارت ووتش', 'قطعة إضافية', 'تجميعة', 'كومبو', 'bundle', 'combo', 'gift', 'free', 'bonus', 'pack', 'starter kit', 'plus free', 'with free', 'pack of 2', 'twin pack', 'comes with', 'freebie', 'promo pack', 'value pack', 'mega pack', '+ watch', '+ earbuds', '+ charger', 'extra', 'dual pack', 'multi pack', 'شريحة مجانية', 'مع خط', 'وخط', 'وباقة'];
const ANTI_JUNK_KEYWORDS = ['مجدد', 'مستعمل', 'كسر زيرو', 'هيكل', 'ماكيت', 'دمية', 'مقلد', 'فرز تاني', 'فرز ب', 'هاي كوبي', 'تالف', 'للتقطيع', 'خردة', 'غير شغال', 'محروق', 'صيانة فقط', 'بدون كرتونة', 'بدون شاحن', 'معيوب', 'خدوش', 'حالة جيدة', 'حالة ممتازة', 'مفتوح', 'وارد الخارج بدون علبة', 'dummy', 'renewed', 'used', 'refurbished', 'fake', 'high copy', 'replica', 'damaged', 'for parts', 'open box', 'pre-owned', 'scratched', 'refurb', 'grade a', 'grade b', 'grade c'];
const ANTI_SPARE_KEYWORDS = ['شاشه تعويضيه', 'باغه', 'فلاته', 'بورده', 'شاشه لمس', 'مستشعر', 'بصمه', 'فليكس', 'مايك', 'سبيكر', 'جرس', 'هزاز', 'موتور', 'سوكت', 'مدخل شحن', 'كاميرا خلفيه', 'كاميرا اماميه', 'عدسه', 'بيت كارت', 'درج شريحه', 'مسامير', 'قطعه غيار', 'تصليح', 'صيانه', 'اي سي', 'ic', 'بطاريه داخليه', 'شريط فلات', 'مفصلات', 'هاوسينج', 'فريم داخلي', 'مبرد', 'مروحه داخليه', 'مازر بورد', 'كيبورد لابتوب داخلي', 'تاتش باد', 'lcd', 'display replacement', 'motherboard', 'flex cable', 'charging port', 'battery replacement'];
const ANTI_ACCESSORIES_KEYWORDS = ['جراب', 'كفر', 'حافظه', 'اسكرينه', 'سكرينه', 'استيكر', 'ستيكر', 'لاصقه', 'حمايه', 'زجاج مقسي', 'شفاف', 'مضاد للصدمات', 'سيليكون', 'جلد', 'ماج سيف', 'واقي', 'باندا', 'محفظه', 'شنطه', 'باك باك', 'شاحن', 'كابل', 'وصله', 'محول', 'ادابتور', 'سماعه سلك', 'ايربودز', 'هاند فري', 'رينج لايت', 'حامل', 'استاند', 'ترايبود', 'باوتش', 'مروحه تبريد', 'تريجر', 'صباع ببجي', 'جيم باد', 'ذراع', 'دلايه', 'ميداليه', 'قلم تاتش', 'مغناطيسي', 'يو اس بي', 'تايب سي', 'لايتنينج', 'باور بانك', 'شاحن لاسلكي', 'شاحن سياره', 'حامل سياره', 'عدسات اضافيه', 'جراب مائي', 'غطاء غوص', 'مكبر شاشه', 'نظاره واقع افتراضي', 'vr', 'سير ساعه', 'استراب', 'حزام ساعه', 'باند ساعه', 'قاعده تبريد لابتوب', 'ماوس', 'فأره', 'ماوس باد', 'لاصق كيبورد', 'case', 'cover', 'screen protector', 'glass', 'battery external', 'charger', 'cable', 'adapter', 'pouch', 'holder', 'stand', 'tripod', 'mount', 'ring light', 'gaming trigger', 'strap'];
const ANTI_SCAM_KEYWORDS = ['قسط', 'تقسيط', 'قسط شهري', 'دفعة اولى', 'مقدم', 'بدون فوائد', 'installment', 'down payment', 'monthly', 'pay monthly', 'تقسيط مريح', 'بدون مقدم'];
const ANTI_DIGITAL_KEYWORDS = ['كود رقمي', 'تفعيل', 'حساب', 'مفتاح', 'سيريال', 'علبة فارغة', 'كرتونة فقط', 'بدون جهاز', 'digital code', 'activation key', 'cd key', 'account', 'empty box', 'box only', 'no device'];
const ANTI_BNPL_KEYWORDS = ['فاليو', 'valu', 'سيمبل', 'sympl', 'شهري', 'shahry', 'امان', 'aman', 'فرصة', 'forsa', 'سهولة', 'souhoola', 'كارت تقسيط', 'حالاً', 'halan', 'بريميوم كارد', 'premium card', 'ادفع لاحقا', 'قسط على'];
const ANTI_WHOLESALE_KEYWORDS = ['جملة', 'باقة تجار', 'كرتونة', 'درزن', 'للتجار', 'كمية', 'lot of', 'wholesale', 'bulk', 'عبوة من 10', 'مجموعة من 5', 'بالكرتونة'];
const ANTI_MOCKUP_KEYWORDS = ['للعرض فقط', 'فاترينة', 'ماكيت للعرض', 'هيكل بلاستيك', 'display mockup', 'dummy phone', 'للتصوير', 'هيكل وهمي', 'غير صالح للعمل'];

// ==========================================
// 📖 2. القواميس الذكية (The Intelligence Dictionaries)
// ==========================================
const BRAND_ALIASES = {
    'apple': ['apple', 'ابل', 'أبل', 'آبل', 'ايفون', 'iphone', 'macbook', 'ماك بوك', 'airpods', 'ايربودز', 'ipad', 'ايباد', 'watch series', 'apple watch'],
    'samsung': ['samsung', 'سامسونج', 'سامسونچ', 'galaxy', 'جلاكسي', 'جالاكسي', 'z fold', 'z flip'],
    'xiaomi': ['xiaomi', 'شاومي', 'شياومي', 'redmi', 'ريدمي', 'poco', 'بوكو', 'mi'],
    'oppo': ['oppo', 'اوبو', 'أوبو', 'reno', 'رينو'],
    'vivo': ['vivo', 'فيفو'],
    'realme': ['realme', 'ريلمي', 'رلمي'],
    'huawei': ['huawei', 'هواوي', 'هووي', 'mate', 'nova'],
    'honor': ['honor', 'هونر', 'اونر', 'هونور'],
    'infinix': ['infinix', 'انفينيكس', 'انفينكس'],
    'tecno': ['tecno', 'تكنو', 'تيكنو'],
    'lenovo': ['lenovo', 'لينوفو', 'ثينك باد', 'ideapad', 'thinkpad'],
    'hp': ['hp', 'اتش بي', 'إتش بي', 'pavilion', 'probook', 'elitebook'],
    'dell': ['dell', 'ديل', 'latitude', 'inspiron', 'xps'],
    'asus': ['asus', 'اسوس', 'أسوس', 'rog', 'tuf', 'vivobook'],
    'acer': ['acer', 'ايسر', 'أيسر', 'predator', 'nitro'],
    'sony': ['sony', 'سوني', 'playstation', 'ps4', 'ps5']
};

const SUB_BRANDS_MAP = {
    'legion': 'lenovo', 'ideapad': 'lenovo', 'thinkpad': 'lenovo',
    'rog': 'asus', 'tuf': 'asus', 'vivobook': 'asus', 'zenbook': 'asus',
    'predator': 'acer', 'nitro': 'acer',
    'alienware': 'dell', 'inspiron': 'dell', 'latitude': 'dell',
    'pavilion': 'hp', 'omen': 'hp', 'elitebook': 'hp'
};

const COLOR_DICTIONARY = {
    'black': ['أسود', 'اسود', 'black', 'midnight', 'obsidian', 'dark', 'فحمي', 'ميدنايت', 'space black'],
    'white': ['أبيض', 'ابيض', 'white', 'starlight', 'snow', 'pearl', 'ستارلايت', 'لؤلؤي'],
    'blue': ['أزرق', 'ازرق', 'blue', 'navy', 'كحلي', 'ocean', 'pacific', 'تيتانيوم أزرق'],
    'red': ['أحمر', 'احمر', 'red', 'product red', 'burgundy', 'نبيتي', 'قرمزي'],
    'green': ['أخضر', 'اخضر', 'green', 'mint', 'olive', 'زيتي', 'تفاحي', 'تيتانيوم أخضر'],
    'gold': ['ذهبي', 'دهبي', 'gold', 'rose gold', 'روز جولد'],
    'silver': ['فضي', 'silver', 'تيتانيوم', 'titanium', 'platinum', 'بلاتيني'],
    'grey': ['رمادي', 'رصاصي', 'grey', 'gray', 'space grey', 'graphite', 'جرافيت'],
    'purple': ['بنفسجي', 'موف', 'purple', 'violet', 'lavender', 'لافندر', 'ارجواني']
};

const WARRANTY_DICTIONARY = {
    'ضمان محلي': ['ضمان محلي', 'ضمان الوكيل', 'محلي', 'local warranty', 'بضمان', 'ضمان مصر'],
    'ضمان دولي': ['ضمان دولي', 'دولي', 'international warranty', 'بدون ضمان محلي', 'وارد الخارج']
};

const OS_DICTIONARY = {
    'Windows 11': ['win 11', 'windows 11', 'ويندوز 11'],
    'Windows 10': ['win 10', 'windows 10', 'ويندوز 10'],
    'Mac OS': ['mac os', 'macos', 'ماك او اس'],
    'DOS': ['dos', 'بدون ويندوز', 'freedos', 'free dos'],
    'Android': ['android', 'اندرويد'],
    'iOS': ['ios', 'اي او اس']
};

const KEYBOARD_DICTIONARY = {
    'عربي-إنجليزي': ['كيبورد عربي', 'حروف عربية', 'ar/en', 'arabic keyboard', 'مضيء عربي'],
    'إنجليزي فقط': ['english keyboard', 'en only', 'بدون حروف عربية']
};

const MATERIAL_DICTIONARY = {
    'تيتانيوم': ['تيتانيوم', 'titanium'], 'ألومنيوم': ['الومنيوم', 'المنيوم', 'aluminum', 'aluminium'],
    'ستانلس ستيل': ['ستانلس', 'stainless', 'صلب'], 'سيراميك': ['سيراميك', 'ceramic']
};

// ==========================================
// 🔍 3. محركات الاستخراج العميقة (The Regex Extractors)
// ==========================================
const REGEX_ENGINES = {
    storage: /(\d+)\s*(gb|tb|g|جيجا|گيجا|تيرا)\b/i,
    ram: /(\d+)\s*(gb ram|g ram|ram|رام|جيجا رام)\b/i,
    processor: /(core i3|core i5|core i7|core i9|ryzen 3|ryzen 5|ryzen 7|ryzen 9|m1|m2|m3|m4|snapdragon|mediatek|helio|dimensity)/i,
    network: /(5g|4g|lte|wifi|wi-fi|cellular|شريحتين|dual sim)/i,
    region: /(middle east|global|international|uae|ksa|japan|الشرق الاوسط|عالمية|اماراتي|ياباني)/i,
    watchSize: /(\d+)\s*(mm|مللي|مم|ملم)\b/i,
    screenSize: /(\d{1,2}\.\d{1,2})\s*(inch|بوصة|انش|")\b/i,
    panelType: /(AMOLED|OLED|IPS|LCD|Retina|Super AMOLED|TFT)/i,
    refreshRate: /(\d{2,3})\s*(hz|هرتز)\b/i,
    battery: /(\d{3,4})\s*(mah|مللي أمبير|ملي امبير)\b/i,
    camera: /(\d{1,3})\s*(mp|ميجا بيكسل|ميجابيكسل)\b/i,
    charging: /(\d{2,3})\s*(w|وات|واط)\b/i,
    generation: /(الجيل\s*(العاشر|الحادي عشر|الثاني عشر|الثالث عشر|الرابع عشر)|gen\s*\d+|1[0-4]th\s*gen|202[0-6])/i,
    edition: /(Fan Edition|FE|Ultra|Pro Max|Pro|Plus|Lite|Classic|Active|SE)/i,
    quirks: /(بدون فيس تايم|no facetime|نسخة يابانية|صوت الكاميرا لا يغلق)/i,
    ports: /(thunderbolt|type-c|تايب سي|usb-c|hdmi 2.1)/i,
    weight: /(\d{1,4}\.?\d{0,2})\s*(kg|g|كيلو|جرام|جم)\b/i
};

// ==========================================
// 📊 4. المصفوفة الكونية للأقسام (Categories Matrix)
// ==========================================
const CATEGORY_MATRIX = {
    phones: { minPrice: 2500, maxPrice: 150000, type: 'device' },
    laptops: { minPrice: 8000, maxPrice: 400000, type: 'device' },
    tablets: { minPrice: 3000, maxPrice: 150000, type: 'device' },
    smartwatches: { minPrice: 500, maxPrice: 65000, type: 'wearable' },
    accessories: { minPrice: 150, maxPrice: 40000, type: 'audio' },
    gaming: { minPrice: 6000, maxPrice: 50000, type: 'console' },
    tvs: { minPrice: 4000, maxPrice: 200000, type: 'appliance' }
};

// ==========================================
// 🔗 5. محرك الروابط المتقدم (Store URL Engine)
// ==========================================
const STORE_ENGINE = {
    Amazon: (slug) => `https://www.amazon.eg/s?k=${slug.replace(/-/g, '+')}&rh=p_n_condition-type%3A28071525031`, // جديد فقط
    Noon: (slug) => `https://www.noon.com/egypt-ar/search/?q=${slug.replace(/-/g, '%20')}&limit=50`,
    Jumia: (slug) => `https://www.jumia.com.eg/catalog/?q=${slug.replace(/-/g, '+')}&rating=3-5`
};

// ==========================================
// 🛠️ 6. معالج النصوص العربي الدقيق (Arabic Normalizer)
// ==========================================
const normalizeArabicText = (text) => {
    if (!text) return '';
    return text.toLowerCase()
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/چ/g, 'ج')
        .replace(/ڤ/g, 'ف')
        .replace(/[\u064B-\u0652]/g, '') // تشكيل
        .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // إزالة الرموز مع حفظ العربي/الإنجليزي
        .replace(/\s+/g, ' ')
        .trim();
};

// ==========================================
// 🌟 7. المحرك الكمي الأوحد (THE QUANTUM VALIDATION ENGINE)
// ==========================================
export const quantumEngine = {
    
    // 🛡️ دالة الفلترة الجبارة
    validateProduct: (title, price, slug, categoryName) => {
        const normalizedTitle = normalizeArabicText(title);
        const categoryParams = CATEGORY_MATRIX[categoryName];

        if (isNaN(price) || price < categoryParams.minPrice || price > categoryParams.maxPrice) {
            return { isValid: false, reason: 'Price out of bounds or Installment trap' };
        }

        const ALL_BANNED_WORDS = [
            ...ANTI_BUNDLE_KEYWORDS, ...ANTI_JUNK_KEYWORDS, ...ANTI_SPARE_KEYWORDS,
            ...ANTI_ACCESSORIES_KEYWORDS, ...ANTI_SCAM_KEYWORDS, ...ANTI_DIGITAL_KEYWORDS,
            ...ANTI_BNPL_KEYWORDS, ...ANTI_WHOLESALE_KEYWORDS, ...ANTI_MOCKUP_KEYWORDS
        ];

        for (const keyword of ALL_BANNED_WORDS) {
            const regex = new RegExp(`(^|\\s)${normalizeArabicText(keyword)}(\\s|$)`, 'i');
            if (regex.test(normalizedTitle)) return { isValid: false, reason: `Blocked by keyword: ${keyword}` };
        }

        const keywords = slug.toLowerCase().split('-').filter(w => w.length > 0);
        let slugBrand = keywords[0]; 
        
        for (const [sub, parent] of Object.entries(SUB_BRANDS_MAP)) {
            if (normalizedTitle.includes(sub)) slugBrand = parent;
        }

        const aliases = BRAND_ALIASES[slugBrand] || [slugBrand];
        const hasBrand = aliases.some(alias => normalizedTitle.includes(normalizeArabicText(alias)));
        if (!hasBrand) return { isValid: false, reason: 'Brand mismatch' };

        const modelKeywords = keywords.slice(1);
        if (modelKeywords.length > 0) {
            let matchedCount = 0;
            modelKeywords.forEach(kw => {
                if (normalizedTitle.includes(normalizeArabicText(kw))) matchedCount++;
            });
            if (matchedCount < Math.ceil(modelKeywords.length * 0.75)) {
                return { isValid: false, reason: 'Model text fuzzy match failed' };
            }
        }

        return { isValid: true, reason: 'Passed all 35 quantum gates' };
    },

    // 🔬 دالة استخراج البيانات العميقة
    extractIntelligence: (title, categoryName) => {
        const normalized = normalizeArabicText(title);
        const categoryType = CATEGORY_MATRIX[categoryName].type;
        
        let i = {
            storage: null, ram: null, processor: null, network: null, region: null, 
            color: null, screenSize: null, panelType: null, refreshRate: null, 
            battery: null, camera: null, os: null, warranty: null, charging: null, 
            edition: null, generation: null, keyboard: null, material: null, 
            quirks: null, ports: null, weight: null, finalVariantString: 'نسخة قياسية'
        };

        const match = (regex) => normalized.match(regex);

        const storageMatch = match(REGEX_ENGINES.storage);
        if (storageMatch) {
            let num = parseInt(storageMatch[1]);
            i.storage = (storageMatch[2].includes('tb') || storageMatch[2].includes('تيرا') || num >= 1000) ? 
                `${num === 1000 || num === 1024 ? 1 : num}TB` : `${num}GB`;
        }
        const ramMatch = match(REGEX_ENGINES.ram);
        if (ramMatch) i.ram = `${ramMatch[1]}GB RAM`;

        if (match(REGEX_ENGINES.screenSize)) i.screenSize = `${match(REGEX_ENGINES.screenSize)[1]}"`;
        if (match(REGEX_ENGINES.panelType)) i.panelType = match(REGEX_ENGINES.panelType)[1].toUpperCase();
        if (match(REGEX_ENGINES.refreshRate)) i.refreshRate = `${match(REGEX_ENGINES.refreshRate)[1]}Hz`;
        if (match(REGEX_ENGINES.battery)) i.battery = `${match(REGEX_ENGINES.battery)[1]}mAh`;
        if (match(REGEX_ENGINES.charging)) i.charging = `${match(REGEX_ENGINES.charging)[1]}W`;
        if (match(REGEX_ENGINES.camera)) i.camera = `${match(REGEX_ENGINES.camera)[1]}MP`;
        if (match(REGEX_ENGINES.generation)) i.generation = match(REGEX_ENGINES.generation)[1].toUpperCase();
        if (match(REGEX_ENGINES.quirks)) i.quirks = match(REGEX_ENGINES.quirks)[1];
        if (match(REGEX_ENGINES.ports)) i.ports = match(REGEX_ENGINES.ports)[1].toUpperCase();
        if (match(REGEX_ENGINES.weight)) i.weight = `${match(REGEX_ENGINES.weight)[1]}${match(REGEX_ENGINES.weight)[2]}`;

        if (categoryType === 'device') {
            if (match(REGEX_ENGINES.processor)) i.processor = match(REGEX_ENGINES.processor)[1].toUpperCase();
            if (match(REGEX_ENGINES.edition)) i.edition = match(REGEX_ENGINES.edition)[1].toUpperCase();
        }

        if (match(REGEX_ENGINES.network)) i.network = match(REGEX_ENGINES.network)[1].toUpperCase();
        if (match(REGEX_ENGINES.region)) i.region = match(REGEX_ENGINES.region)[1];

        const findDict = (dict) => Object.keys(dict).find(k => dict[k].some(a => normalized.includes(normalizeArabicText(a))));
        i.color = findDict(COLOR_DICTIONARY);
        i.os = findDict(OS_DICTIONARY);
        i.warranty = findDict(WARRANTY_DICTIONARY);
        i.keyboard = findDict(KEYBOARD_DICTIONARY);
        i.material = findDict(MATERIAL_DICTIONARY);

        // 🏗️ تجميع الـ Variant النهائي
        if (categoryType === 'wearable') {
            const sizeMatch = match(REGEX_ENGINES.watchSize);
            i.finalVariantString = sizeMatch ? `${sizeMatch[1]}mm` : 'نسخة قياسية';
            if (i.material) i.finalVariantString += ` - ${i.material}`;
        } else {
            let parts = [];
            if (i.storage) parts.push(i.storage);
            if (i.ram) parts.push(i.ram);
            
            if (parts.length > 0) {
                i.finalVariantString = parts.join(' / ');
                if (i.processor && categoryName === 'laptops') i.finalVariantString += ` - ${i.processor}`;
            } else if (i.processor) {
                i.finalVariantString = i.processor;
            }
        }

        i.fullSpecsDump = JSON.stringify({
            screen: i.screenSize, hz: i.refreshRate, battery: i.battery, os: i.os, 
            keyboard: i.keyboard, generation: i.generation, quirks: i.quirks
        });

        return i;
    },

    getStoreUrls: (slug) => ({
        Amazon: STORE_ENGINE.Amazon(slug),
        Noon: STORE_ENGINE.Noon(slug),
        Jumia: STORE_ENGINE.Jumia(slug)
    }),
    
    // للحصول على الإعدادات الأساسية للقسم (تمت إضافتها لتسهيل الوصول من المحرك)
    getCategoryProfile: (categoryName) => CATEGORY_MATRIX[categoryName]
};