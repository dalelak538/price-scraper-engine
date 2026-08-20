/**
 * 👑 THE MASTER RUNNER (run.js) 👑
 * 🦾 المايسترو التنفيذي المسؤول عن جدولة وتشغيل عمليات السحب لكل المتاجر والأقسام أوتوماتيكياً.
 */

import { runMasterEngine } from './config/core-engine.js';

// 🛒 المتاجر المستهدفة
const STORES = ['Amazon', 'Noon', 'Jumia'];

// 📂 الأقسام المتاحة في قاعدة البيانات
const CATEGORIES = ['phones', 'laptops', 'tablets', 'smartwatches'];

// دالة تأخير تكتيكية لتبريد السيرفر وحماية الـ IP بين العمليات
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startAutonomousSystem() {
    console.clear();
    console.log("======================================================");
    console.log("👑 DALELAK PRICE INTELLIGENCE SYSTEM - MASTER RUNNER 👑");
    console.log("======================================================");
    console.log(`⏰ بدء دورة التشغيل الشاملة في: ${new Date().toLocaleString()}\n`);

    let totalCycles = 0;
    let failedCycles = 0;

    // حلقة تكرارية مزدوجة: تمر على كل قسم، وفي كل قسم تمر على كل متجر
    for (const category of CATEGORIES) {
        for (const store of STORES) {
            try {
                totalCycles++;
                console.log(`\n------------------------------------------------------`);
                console.log(`🚀 [بدء المهمة #${totalCycles}]: قسم [${category.toUpperCase()}] ⬅️ متجر [${store}]`);
                console.log(`------------------------------------------------------\n`);

                // استدعاء المفاعل النووي (Singularity Engine)
                await runMasterEngine(category, store);

                console.log(`\n✅ [اكتمل بنجاح]: انتهى مسح وتحديث ${category} في متجر ${store}.`);
                console.log(`☕ تبريد إجباري للسيرفر لمدة 15 ثانية حمايةً من الحظر...`);
                await delay(15000); 

            } catch (error) {
                failedCycles++;
                console.error(`\n❌ [فشل في المهمة]: حدث خطأ أثناء معالجة [${category}] في متجر [${store}]`);
                console.error(`📌 التفاصيل: ${error.message}`);
                console.log(`🔄 تفعيل بروتوكول الأمان: تخطي والانتقال للمهمة التالية...\n`);
                
                // فترة راحة أطول في حال حدوث خطأ لتهدئة الـ IP
                await delay(30000);
            }
        }
    }

    console.log("\n======================================================");
    console.log("🎉 انتهت دورة السحب الشاملة لكل المتاجر والأقسام بنجاح تام! 🎉");
    console.log("======================================================");
    console.log(`📊 إجمالي العمليات المنفذة : ${totalCycles}`);
    console.log(`❌ العمليات التي فشلت    : ${failedCycles}`);
    console.log(`⏰ وقت الانتهاء         : ${new Date().toLocaleString()}`);
    console.log("======================================================\n");
    
    process.exit(0);
}

// إطلاق النظام الأوتوماتيكي
startAutonomousSystem();