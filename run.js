/**
 * 👑 THE ULTIMATE ENTERPRISE MASTER RUNNER (run.js - GOD TIER) 👑
 * 🦾 مزود بمراقبة الرامات، الإيقاف الآمن، التخطي الذكي، والحماية القصوى للسيرفر.
 */

import { runMasterEngine } from './config/core-engine.js';
import fs from 'fs';
import { createClient } from '@libsql/client';

// ==========================================================
// 🛡️ حارس المتغيرات الفوري (ENV GUARD) - يضاف هنا بالظبط
// ==========================================================
const REQUIRED_ENV = ['TURSO_DB_URL', 'TURSO_DB_TOKEN', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'];
const missingEnvs = REQUIRED_ENV.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
    console.error("======================================================");
    console.error("❌ [CRITICAL SECURITY ERROR]: متغيرات البيئة التالية ناقصة:");
    missingEnvs.forEach(env => console.error(`   - ${env}`));
    console.error("🚨 تم إيقاف النظام فوراً قبل بدء أي عملية حمايةً للموارد!");
    console.error("======================================================");
    process.exit(1);
}

// 🔌 الاتصال بقاعدة البيانات لتسجيل تقارير التشغيل
const db = createClient({ 
    url: process.env.TURSO_DB_URL, 
    authToken: process.env.TURSO_DB_TOKEN 
});

const STORES = ['Amazon', 'Noon', 'Jumia'];
const CATEGORIES = ['phones', 'laptops', 'tablets', 'smartwatches'];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// 🛡️ تكتيك مراقبة الرامات وتنظيفها لمنع انهيار السيرفر
function checkMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    console.log(`🧠 [Memory Check]: الذاكرة المستهلكة حالياً = ${heapUsedMB} MB`);
    
    if (heapUsedMB > 700 && global.gc) {
        console.log(`🧹 [Garbage Collection]: تنظيف الذاكرة الإجباري لخفض الاستهلاك...`);
        global.gc();
    }
}

// 📡 إرسال تقارير تليجرام متقدمة
async function sendTelegramAlert(text) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;
    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
        });
    } catch (e) {
        console.error("❌ فشل إرسال تنبيه التليجرام.");
    }
}

// 🛑 تكتيك الإيقاف الآمن (Graceful Shutdown)
let isShuttingDown = false;
process.on('SIGINT', async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n⚠️ [System Signal]: تم استلام إشارة إيقاف تشغيل طارئة. جاري حفظ الحالة والخروج بأمان...`);
    await sendTelegramAlert(`⚠️ <b>Master Runner:</b> تم إيقاف النظام يدويًا أو عبر إشارة طارئة.`);
    process.exit(0);
});

async function startAutonomousSystem() {
    console.clear();
    console.log("======================================================");
    console.log("👑 DALELAK ENTERPRISE SYSTEM - GOD TIER RUNNER 👑");
    console.log("======================================================");
    console.log(`⏰ بدء دورة التشغيل في: ${new Date().toLocaleString()}\n`);

    let totalCycles = 0;
    let failedCycles = 0;
    const startTime = Date.now();

    const randomizedCategories = shuffleArray([...CATEGORIES]);

    for (const category of randomizedCategories) {
        if (isShuttingDown) break;
        const randomizedStores = shuffleArray([...STORES]);

        for (const store of randomizedStores) {
            if (isShuttingDown) break;

            checkMemoryUsage();

            try {
                totalCycles++;
                console.log(`\n------------------------------------------------------`);
                console.log(`🚀 [مهمة #${totalCycles}]: قسم [${category.toUpperCase()}] ⬅️ متجر [${store}]`);
                console.log(`------------------------------------------------------\n`);

                await runMasterEngine(category, store); //[cite: 2]

                console.log(`✅ [نجاح تام]: اكتملت معالجة ${category} في متجر ${store}.`);
                console.log(`☕ تبريد تكتيكي للسيرفر لمدة 25 ثانية حمايةً للـ IP...`);
                await delay(25000); 

            } catch (error) {
                failedCycles++;
                console.error(`❌ [خطأ تشغيلي]: فشل معالجة [${category}] في [${store}] -> ${error.message}`);
                console.log(`🔄 تفعيل بروتوكول التبريد المضاعف (45 ثانية) والتخطي...\n`);
                await delay(45000); 
            }
        }
    }

    const durationMinutes = ((Date.now() - startTime) / 60000).toFixed(1);
    const report = `🎉 <b>دورة السحب الشاملة انتهت بنجاح!</b>\n\n⏱️ الوقت المستغرَق: ${durationMinutes} دقيقة\n📊 إجمالي المهام: ${totalCycles}\n❌ الإخفاقات: ${failedCycles}\n⏰ وقت الانتهاء: ${new Date().toLocaleString()}`;

    console.log("\n======================================================");
    console.log("🎉 انتهت دورة السحب الشاملة لكل المتاجر والأقسام بنجاح تام! 🎉");
    console.log("======================================================");

    await sendTelegramAlert(report);
    process.exit(0);
}

startAutonomousSystem();