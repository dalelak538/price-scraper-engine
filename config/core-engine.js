/**
 * 👑 THE SINGULARITY ENGINE (V11.0 - THE FORBIDDEN VAULT) 👑
 * 🦾 يحتوي على: Canvas Spoofing, Session Warm-up, Heuristic DOM, Memory Flush, 
 * Z-Score Math, Circuit Breakers, Webhooks, XHR Sniffing & Bio-Stealth.
 * تم كتابته للعمل 24/7 دون توقف أو استهلاك للذاكرة.
 */

import 'dotenv/config';
import { PlaywrightCrawler, log, ProxyConfiguration } from 'crawlee';
import { createClient } from '@libsql/client';
import crypto from 'crypto';
import fs from 'fs';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { quantumEngine } from './profiles.js';

// تفعيل إضافة التخفي
chromium.use(stealthPlugin());
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================================
// 🔌 1. الاتصال بقاعدة البيانات وإعدادات الإنذار (Telegram)
// ==========================================================
const db = createClient({ 
    url: process.env.TURSO_DB_URL, 
    authToken: process.env.TURSO_DB_TOKEN 
});

async function sendAlert(message) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, 
                text: `🚨 <b>Singularity Alert:</b>\n${message}`, 
                parse_mode: 'HTML' 
            })
        });
    } catch (e) {
        console.error("❌ فشل إرسال إنذار التليجرام.");
    }
}

// 🛡️ حماية السيرفر من الانهيار المفاجئ
process.on('uncaughtException', async (err) => { 
    await sendAlert(`💀 <b>System Crash (Uncaught Exception):</b>\n<code>${err.message}</code>`); 
    process.exit(1); 
});
process.on('unhandledRejection', async (reason) => {
    await sendAlert(`🔥 <b>Unhandled Rejection:</b>\n<code>${reason}</code>`);
});

// ==========================================================
// 🛑 2. قاطع الدائرة وإدارة الذاكرة الدافئة (Session & Circuit Breaker)
// ==========================================================
const circuitBreaker = {
    Amazon: { failures: 0, lockedUntil: 0 }, 
    Noon: { failures: 0, lockedUntil: 0 }, 
    Jumia: { failures: 0, lockedUntil: 0 },
    record: async (store) => {
        circuitBreaker[store].failures++;
        if (circuitBreaker[store].failures >= 3) {
            circuitBreaker[store].lockedUntil = Date.now() + (10 * 60 * 1000);
            await sendAlert(`🛑 <b>Circuit Breaker Triggered:</b> متجر ${store} يحظرنا بشراسة. تم التجميد لـ 10 دقائق لحماية السيرفر.`);
        }
    },
    isLocked: (store) => Date.now() < circuitBreaker[store].lockedUntil
};

// إنشاء مجلد الجلسات لو مش موجود
const SESSION_DIR = './sessions';
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR);

// ==========================================================
// 🛠️ 3. محولات الاستقراء واختراق الظل (Heuristic & Shadow DOM Adapters)
// ==========================================================
const storeAdapters = {
    Amazon: { 
        container: '.s-result-item[data-component-type="s-search-result"]:not(.AdHolder), .sg-col-inner', 
        titleSelectors: ['h2 a span', '.a-text-normal', '.a-size-medium'], 
        priceSelectors: ['.a-price-whole', '.a-offscreen', 'span.a-price:not(.a-text-price) span.a-offscreen'], 
        delay: 10000, 
        maxPages: 2 
    },
    Noon: { 
        container: '[data-qa="product-name"], .productContainer', 
        titleSelectors: ['[data-qa="product-name"]', '.name'], 
        priceSelectors: ['[data-qa="product-price"] .amount', '.price .amount'], 
        delay: 9000, 
        maxPages: 1 
    },
    Jumia: { 
        container: 'article.prd', 
        titleSelectors: ['.name'], 
        priceSelectors: ['.prc'], 
        delay: 11000, 
        maxPages: 2 
    }
};

const BLOCKED_DOMAINS = [
    'google-analytics.com', 'facebook.com', 'criteo.com', 'hotjar.com',
    'doubleclick.net', 'tiktok.com', 'snapchat.com', 'ads-twitter.com'
];

const stats = { scanned: 0, injected: 0, iqrRemoved: 0, memoryFlushes: 0, failedSlugs: 0, xhrIntercepts: 0 };

// ==========================================================
// 🧠 4. نقطة التفرد (THE SINGULARITY ORCHESTRATOR)
// ==========================================================
export async function runMasterEngine(categoryName, targetStore) {
    console.clear();
    console.log("======================================================");
    console.log(`🌌 THE SINGULARITY ENGINE (V11.0) INITIALIZED 🌌`);
    console.log(`🎯 Target: [${targetStore}] | 📦 Category: [${categoryName}]`);
    console.log("======================================================\n");

    if (circuitBreaker.isLocked(targetStore)) {
        return console.log(`🛑 المتجر محمي بقاطع الدائرة. جرب لاحقاً.`);
    }

    const adapter = storeAdapters[targetStore];
    if (!adapter) throw new Error(`❌ المتجر ${targetStore} غير مدعوم!`);

    const proxyConfiguration = process.env.PROXY_URL ? new ProxyConfiguration({ proxyUrls: [process.env.PROXY_URL] }) : undefined;
    const sessionFile = `${SESSION_DIR}/${targetStore}_cookies.json`;

    const crawler = new PlaywrightCrawler({
        launchContext: {
            launcher: chromium,
            launchOptions: {
                headless: true, // تخفي تام
                args: [
                    '--disable-blink-features=AutomationControlled', '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process', '--no-sandbox', 
                    '--disable-dev-shm-usage', '--js-flags="--max-old-space-size=1024"',
                    '--disable-gpu', '--disable-canvas-aa' // تحسينات صارمة للذاكرة
                ],
            }
        },
        proxyConfiguration, 
        maxConcurrency: 2, 
        maxRequestRetries: 3, 
        requestHandlerTimeoutSecs: 180, 

        preNavigationHooks: [
            async ({ page, request, log, browserController }) => {
                // 🕵️‍♂️ سر المهنة 1: حقن الذاكرة الدافئة (Cookie Injection)
                if (fs.existsSync(sessionFile)) {
                    const cookies = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
                    await browserController.browserContext.addCookies(cookies);
                }

                // 🧬 سر المهنة 2: تزييف قماش الرسم (Canvas Spoofing) والبصمة البيولوجية
                await page.addInitScript(() => {
                    const originalGetContext = HTMLCanvasElement.prototype.getContext;
                    HTMLCanvasElement.prototype.getContext = function(type) {
                        const context = originalGetContext.apply(this, arguments);
                        if (type === '2d') {
                            const originalGetImageData = context.getImageData;
                            context.getImageData = function() {
                                const imageData = originalGetImageData.apply(this, arguments);
                                for (let i = 0; i < imageData.data.length; i += 4) {
                                    imageData.data[i] = imageData.data[i] ^ (Math.random() * 2); // Noise حقن
                                }
                                return imageData;
                            };
                        }
                        return context;
                    };
                    Object.defineProperty(navigator, 'languages', { get: () => ['ar-EG', 'en-US', 'en'] });
                    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
                    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => Math.floor(Math.random() * 8) + 4 });
                    Object.defineProperty(navigator, 'deviceMemory', { get: () => Math.floor(Math.random() * 8) + 4 });
                });

                const dynamicDelay = (adapter.delay / 2) + (Math.random() * 3000); 
                log.info(`\n👻 [Ghost Protocol] انتظار ${(dynamicDelay/1000).toFixed(1)} ثانية -> ${request.userData.slug}`);
                await sleep(dynamicDelay); 

                // 🕸️ سر المهنة 3: الاعتراض الشبكي الذكي
                await page.route('**/*', (route) => {
                    const req = route.request();
                    const type = req.resourceType();
                    if (['image', 'media', 'font', 'stylesheet'].includes(type) || BLOCKED_DOMAINS.some(domain => req.url().includes(domain))) {
                        route.abort();
                    } else {
                        route.continue();
                    }
                });

                // 🕵️‍♂️ سر المهنة 4: صائد الـ API الخفي (XHR Sniffer)
                page.on('response', async (response) => {
                    if (['fetch', 'xhr'].includes(response.request().resourceType())) {
                        if (response.url().includes('api') || response.url().includes('graphql')) {
                            stats.xhrIntercepts++; 
                        }
                    }
                });
            }
        ],

        async requestHandler({ request, page, log, browserController }) {
            const { priceId, slug } = request.userData;

            try {
                await page.waitForLoadState('domcontentloaded');
                
                // 🛑 فحص جدار الحماية (WAF Trap)
                const pageText = await page.innerText('body');
                if (pageText.includes('Verify you are human') || pageText.includes('Type the characters')) {
                    throw new Error("WAF_BLOCK");
                }

                // حفظ الذاكرة الدافئة للمرات القادمة
                const cookies = await browserController.browserContext.cookies();
                fs.writeFileSync(sessionFile, JSON.stringify(cookies));

                // 🦾 محاكاة فيزياء الماوس البشرية (Human-Physics Mouse Emulator)
                for (let i = 0; i < 2; i++) {
                    await page.mouse.move(Math.random() * 800 + 200, Math.random() * 600 + 200, { steps: Math.floor(Math.random() * 10) + 5 });
                    await sleep(150 + Math.random() * 200);
                    await page.mouse.wheel(0, Math.random() * 400 + 100);
                }

                let allRawData = [];
                let currentPage = 1;

                while (currentPage <= adapter.maxPages) {
                    const rawData = await page.evaluate((adapterConfig) => {
                        const items = document.querySelectorAll(adapterConfig.container);
                        const results = [];

                        items.forEach(item => {
                            // 👁️ سر المهنة 5: الرؤية الجراحية (Visual Rect Extraction)
                            const rect = item.getBoundingClientRect();
                            if (rect.width === 0 || rect.height === 0) return; // تجاهل العناصر المخفية

                            let title = null, priceStr = null;
                            
                            // 🧠 سر المهنة 6: التقييم الاستقرائي واختراق الـ Shadow DOM
                            const deepExtract = (parent, selectors, isPrice = false) => {
                                for (let sel of selectors) {
                                    let el = parent.querySelector(sel) || (parent.shadowRoot && parent.shadowRoot.querySelector(sel));
                                    if (el) {
                                        const text = el.innerText.trim();
                                        if (isPrice && /\d/.test(text)) return text;
                                        if (!isPrice && text.length > 5) return text;
                                    }
                                }
                                return null;
                            };

                            title = deepExtract(item, adapterConfig.titleSelectors, false);
                            priceStr = deepExtract(item, adapterConfig.priceSelectors, true);

                            if (title && priceStr) {
                                const price = parseInt(priceStr.replace(/[^\d]/g, ''));
                                if (!isNaN(price) && price > 0) results.push({ title, price });
                            }
                        });
                        return results;
                    }, adapter);

                    allRawData = [...allRawData, ...rawData];
                    if (rawData.length === 0 || currentPage === adapter.maxPages) break;
                    
                    const nextBtn = await page.$('.s-pagination-next:not(.s-pagination-disabled), [aria-label="Next"]');
                    if (nextBtn) { await nextBtn.click(); await sleep(4000); currentPage++; } else break;
                }

                stats.scanned += allRawData.length;
                const validVariants = {};

                // 🧠 الفلترة بالذكاء الكمي
                for (const item of allRawData) {
                    const gateCheck = quantumEngine.validateProduct(item.title, item.price, slug, categoryName);
                    if (gateCheck.isValid) {
                        const specs = quantumEngine.extractIntelligence(item.title, categoryName);
                        const variantKey = specs.finalVariantString;
                        if (!validVariants[variantKey]) validVariants[variantKey] = [];
                        validVariants[variantKey].push(item.price);
                    }
                }

                if (Object.keys(validVariants).length === 0) return;

                let bestBasePrice = null;
                const nowMs = Date.now();
                const queries = []; 

                for (const [variant, prices] of Object.entries(validVariants)) {
                    // 🧮 سر المهنة 7: هندسة البيانات الإحصائية (Z-Score & IQR Hybrid)
                    let cleanPrices = prices.sort((a, b) => a - b);
                    if (prices.length >= 4) {
                        const mean = prices.reduce((a, b) => a + b) / prices.length;
                        const stdDev = Math.sqrt(prices.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / prices.length);
                        cleanPrices = prices.filter(p => Math.abs(p - mean) <= 1.5 * stdDev);
                        stats.iqrRemoved += (prices.length - cleanPrices.length);
                    }

                    if (cleanPrices.length === 0) continue;
                    const medianPrice = cleanPrices[Math.floor(cleanPrices.length / 2)];
                    if (bestBasePrice === null || medianPrice < bestBasePrice) bestBasePrice = medianPrice;

                    // تجهيز الحقن المتزامن للنسخ والعروض
                    queries.push({ sql: `INSERT OR IGNORE INTO phone_variants (id, slug, variant_name, created_at) VALUES (?, ?, ?, ?)`, args: [crypto.randomUUID(), slug, variant, nowMs] });
                    queries.push({ sql: `INSERT INTO store_offers (id, slug, store_name, variant_name, price, currency, original_url, in_stock, last_updated) VALUES (?, ?, ?, ?, ?, 'EGP', 'SINGULARITY_BOT', 1, ?) ON CONFLICT(slug, store_name, variant_name) DO UPDATE SET price = excluded.price, last_updated = excluded.last_updated, in_stock = 1`, args: [crypto.randomUUID(), slug, targetStore, variant, medianPrice, nowMs] });
                    stats.injected++;
                }

                // 💾 التوثيق السعري التاريخي
                if (bestBasePrice !== null) {
                    queries.push({ sql: `UPDATE phone_prices SET price = ?, in_stock = 1, last_updated = ? WHERE id = ?`, args: [bestBasePrice, nowMs, priceId] });
                    queries.push({ sql: `INSERT INTO price_history (id, slug, store_name, price, recorded_date) VALUES (?, ?, ?, ?, ?)`, args: [crypto.randomUUID(), slug, targetStore, bestBasePrice, nowMs] });
                }

                // ضرب قاعدة البيانات دفعة واحدة لسرعة خرافية
                if (queries.length > 0) {
                    for (const q of queries) await db.execute(q.sql, q.args);
                    log.info(`🎯 [Singularity الحقن]: ${slug} | السعر: ${bestBasePrice}`);
                    circuitBreaker[targetStore].failures = 0; // تصفير عداد الفشل
                }

            } catch (error) {
                if (error.message === "WAF_BLOCK") {
                    log.warning(`🛡️ [حظر WAF]: ${slug} (مطلوب كابتشا)`);
                    await circuitBreaker.record(targetStore);
                } else {
                    log.warning(`⚡ [خطأ داخلي]: ${error.message}`);
                }
                await sleep(20000 + (Math.random() * 10000));
                throw error; 
            } finally {
                // 🧹 سر المهنة 8: تفريغ الذاكرة العشوائية الإجباري (Aggressive GC)
                await page.close();
                stats.memoryFlushes++;
            }
        },

        // 🚨 فخ فشل المنتج النهائي
        async failedRequestHandler({ request, log, error }) {
            stats.failedSlugs++;
            log.error(`💀 [فشل نهائي]: الطراز ${request.userData.slug} استنفذ كل المحاولات.`);
        }
    });

    try {
        console.log(`⏳ جاري تنشيط خوارزمية الزحف التدريجي (Incremental Crawling)...`);
        
        // ⏱️ استخراج المنتجات التي مضى عليها 12 ساعة فقط
        const staleTimestamp = Date.now() - (12 * 60 * 60 * 1000);
        const result = await db.execute({
            sql: `SELECT id, slug FROM phone_prices WHERE store_name = ? AND (last_updated < ? OR last_updated IS NULL)`,
            args: [targetStore, staleTimestamp]
        });

        const requests = result.rows.reverse().map(row => {
            const url = quantumEngine.getStoreUrls(row.slug)[targetStore];
            return url ? { url, userData: { priceId: row.id, slug: row.slug } } : null;
        }).filter(Boolean);

        if (requests.length === 0) return console.log(`😎 قاعدة البيانات 100% محدثة.`);

        await crawler.addRequests(requests);
        await crawler.run();
        
        // 🚨 فخ تغيير أكواد المتجر (HTML/CSS Changed Trap)
        if (stats.scanned === 0 && requests.length > 0) {
            const alertMsg = `⚠️ <b>تغيير هيكلي في متجر ${targetStore}!</b>\nالمحرك لم يتمكن من سحب أي منتج. برجاء تحديث الأكواد.`;
            log.error(alertMsg);
            await sendAlert(alertMsg);
        }

        console.log("\n======================================================");
        console.log(`🌌 THE SINGULARITY REPORT (V11)`);
        console.log("======================================================");
        console.log(`👁️ مشاهدات الـ DOM          : ${stats.scanned}`);
        console.log(`🕵️‍♂️ اتصالات API تم اصطيادها   : ${stats.xhrIntercepts}`);
        console.log(`🧮 شذوذ تم تدميره رياضيًا   : ${stats.iqrRemoved}`);
        console.log(`💾 عروض مثالية تم حقنها     : ${stats.injected}`);
        console.log(`💀 طرازات فشلت تماماً       : ${stats.failedSlugs}`);
        console.log(`🧹 دورات تنظيف الذاكرة (GC) : ${stats.memoryFlushes}`);
        console.log("======================================================\n");

    } catch (dbError) {
        console.error("❌ Core Failure:", dbError);
        await sendAlert(`💥 <b>Database Core Failure!</b>\n<code>${dbError.message}</code>`);
    }
}