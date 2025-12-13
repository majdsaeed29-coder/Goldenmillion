/**
 * 🛒 نظام المتجر الخارق - المليونير الذهبي
 * نظام متكامل للشراء، الاشتراكات، والميزات المميزة
 */

class ShopSystem {
    constructor() {
        console.log("🛒 بدء تشغيل نظام المتجر الخارق...");
        
        // المتغيرات الأساسية
        this.products = [];
        this.categories = {};
        this.userInventory = {};
        this.purchases = [];
        this.subscriptions = {};
        this.sales = [];
        
        // عملات اللعبة
        this.currency = {
            name: 'عملة ذهبية',
            symbol: '🪙',
            rate: 1, // 1 دولار = 100 عملة
            minPurchase: 100,
            maxPurchase: 100000
        };
        
        // إعدادات المتجر
        this.settings = {
            taxRate: 0.05, // 5% ضريبة
            enableSales: true,
            dailyDeals: true,
            giftEnabled: true,
            refundPolicy: '24h',
            currency: 'USD'
        };
        
        // التهيئة التلقائية
        this.init();
    }
    
    /**
     * 🚀 تهيئة النظام
     */
    async init() {
        // تحميل المنتجات
        this.loadProducts();
        
        // تحميل الفئات
        this.loadCategories();
        
        // تحميل المشتريات
        this.loadPurchases();
        
        // تحميل الاشتراكات
        this.loadSubscriptions();
        
        // إنشاء العروض اليومية
        this.generateDailyDeals();
        
        console.log("✅ تم تهيئة نظام المتجر");
    }
    
    /**
     * 📦 تحميل المنتجات
     */
    loadProducts() {
        console.log("📦 تحميل المنتجات...");
        
        // تعريف الفئات
        this.categories = {
            'coins': {
                id: 'coins',
                name: 'العملات',
                icon: '🪙',
                description: 'شراء عملات للعبة',
                featured: true
            },
            'powerups': {
                id: 'powerups',
                name: 'وسائل المساعدة',
                icon: '⚡',
                description: 'مزايا خاصة للمساعدة في اللعبة',
                featured: true
            },
            'lifelines': {
                id: 'lifelines',
                name: 'وسائل مساعدة',
                icon: '🆘',
                description: 'وسائل مساعدة إضافية'
            },
            'avatars': {
                id: 'avatars',
                name: 'الصور الرمزية',
                icon: '👤',
                description: 'تخصيص صورتك الرمزية'
            },
            'themes': {
                id: 'themes',
                name: 'السمات',
                icon: '🎨',
                description: 'تغيير مظهر اللعبة'
            },
            'subscriptions': {
                id: 'subscriptions',
                name: 'الاشتراكات',
                icon: '👑',
                description: 'اشتراكات مميزة',
                featured: true
            },
            'bundles': {
                id: 'bundles',
                name: 'الباقات',
                icon: '🎁',
                description: 'باقات مجمعة بخصومات'
            }
        };
        
        // تحميل المنتجات
        this.products = [
            // العملات
            {
                id: 'coins_1000',
                name: '1000 عملة ذهبية',
                description: 'مثالي للبداية',
                category: 'coins',
                type: 'currency',
                price: 4.99,
                currency: 'USD',
                quantity: 1000,
                bonus: 0,
                icon: '🪙',
                color: '#f1c40f',
                featured: false,
                tags: ['coins', 'starter'],
                requirements: null,
                limit: null,
                discount: {
                    active: false,
                    originalPrice: 6.99,
                    percentage: 29
                }
            },
            {
                id: 'coins_5000',
                name: '5000 عملة ذهبية',
                description: 'الأكثر مبيعاً',
                category: 'coins',
                type: 'currency',
                price: 19.99,
                currency: 'USD',
                quantity: 5000,
                bonus: 500,
                icon: '💰',
                color: '#f39c12',
                featured: true,
                tags: ['coins', 'popular', 'bonus'],
                requirements: null,
                limit: null,
                discount: {
                    active: true,
                    originalPrice: 24.99,
                    percentage: 20
                }
            },
            {
                id: 'coins_10000',
                name: '10000 عملة ذهبية',
                description: 'باقة المليونير',
                category: 'coins',
                type: 'currency',
                price: 34.99,
                currency: 'USD',
                quantity: 10000,
                bonus: 1500,
                icon: '💎',
                color: '#e74c3c',
                featured: true,
                tags: ['coins', 'premium', 'bonus'],
                requirements: null,
                limit: null,
                discount: {
                    active: true,
                    originalPrice: 44.99,
                    percentage: 22
                }
            },
            {
                id: 'coins_25000',
                name: '25000 عملة ذهبية',
                description: 'كمية كبيرة بخصم أكبر',
                category: 'coins',
                type: 'currency',
                price: 79.99,
                currency: 'USD',
                quantity: 25000,
                bonus: 5000,
                icon: '👑',
                color: '#9b59b6',
                featured: false,
                tags: ['coins', 'mega', 'bonus'],
                requirements: null,
                limit: null,
                discount: {
                    active: true,
                    originalPrice: 99.99,
                    percentage: 20
                }
            },
            
            // وسائل المساعدة
            {
                id: 'extra_life',
                name: 'حياة إضافية',
                description: 'خطأ إضافي في اللعبة',
                category: 'powerups',
                type: 'consumable',
                price: 500,
                currency: 'coins',
                duration: 'permanent',
                uses: 1,
                effect: 'extra_life',
                icon: '❤️',
                color: '#e74c3c',
                featured: false,
                tags: ['powerup', 'game'],
                requirements: { level: 5 },
                limit: { perDay: 3 }
            },
            {
                id: 'time_extension',
                name: 'تمديد الوقت',
                description: '+15 ثانية لكل سؤال',
                category: 'powerups',
                type: 'consumable',
                price: 300,
                currency: 'coins',
                duration: 'one_game',
                uses: 1,
                effect: 'time_extension',
                icon: '⏱️',
                color: '#3498db',
                featured: false,
                tags: ['powerup', 'time'],
                requirements: { level: 3 },
                limit: { perDay: 5 }
            },
            {
                id: 'hint',
                name: 'تلميح',
                description: 'تلميح للإجابة الصحيحة',
                category: 'powerups',
                type: 'consumable',
                price: 750,
                currency: 'coins',
                duration: 'one_question',
                uses: 1,
                effect: 'hint',
                icon: '💡',
                color: '#f1c40f',
                featured: true,
                tags: ['powerup', 'help'],
                requirements: { level: 10 },
                limit: { perDay: 2 }
            },
            {
                id: 'double_prize',
                name: 'مضاعفة الجائزة',
                description: 'مضاعفة الجائزة النهائية',
                category: 'powerups',
                type: 'consumable',
                price: 2000,
                currency: 'coins',
                duration: 'one_game',
                uses: 1,
                effect: 'double_prize',
                icon: '💰',
                color: '#2ecc71',
                featured: true,
                tags: ['powerup', 'money'],
                requirements: { level: 15 },
                limit: { perDay: 1 }
            },
            
            // وسائل مساعدة إضافية
            {
                id: 'extra_5050',
                name: 'وسيلة 50:50 إضافية',
                description: 'وسيلة مساعدة 50:50 إضافية',
                category: 'lifelines',
                type: 'consumable',
                price: 1000,
                currency: 'coins',
                duration: 'permanent',
                uses: 1,
                effect: 'extra_5050',
                icon: '50%',
                color: '#9b59b6',
                featured: false,
                tags: ['lifeline', 'help'],
                requirements: null,
                limit: { perDay: 2 }
            },
            {
                id: 'extra_friend',
                name: 'استشارة صديق إضافية',
                description: 'وسيلة استشارة صديق إضافية',
                category: 'lifelines',
                type: 'consumable',
                price: 1500,
                currency: 'coins',
                duration: 'permanent',
                uses: 1,
                effect: 'extra_friend',
                icon: '📞',
                color: '#3498db',
                featured: false,
                tags: ['lifeline', 'friend'],
                requirements: null,
                limit: { perDay: 2 }
            },
            {
                id: 'extra_audience',
                name: 'رأي الجمهور إضافي',
                description: 'وسيلة رأي الجمهور إضافية',
                category: 'lifelines',
                type: 'consumable',
                price: 1200,
                currency: 'coins',
                duration: 'permanent',
                uses: 1,
                effect: 'extra_audience',
                icon: '👥',
                color: '#e67e22',
                featured: false,
                tags: ['lifeline', 'audience'],
                requirements: null,
                limit: { perDay: 2 }
            },
            
            // الاشتراكات
            {
                id: 'subscription_vip',
                name: 'اشتراك VIP',
                description: 'جميع الميزات المميزة',
                category: 'subscriptions',
                type: 'subscription',
                price: 9.99,
                currency: 'USD',
                period: 'monthly',
                features: [
                    'إزالة جميع الإعلانات',
                    '1000 عملة ذهبية شهرياً',
                    'وسائل مساعدة غير محدودة',
                    'دخول البطولات الحصرية',
                    'دعم مميز',
                    'سمات حصرية',
                    'إحصائيات متقدمة'
                ],
                icon: '👑',
                color: '#f1c40f',
                featured: true,
                tags: ['subscription', 'vip', 'premium'],
                requirements: null,
                limit: null,
                discount: {
                    active: true,
                    originalPrice: 14.99,
                    percentage: 33
                }
            },
            {
                id: 'subscription_no_ads',
                name: 'اشتراك بدون إعلانات',
                description: 'إزالة جميع الإعلانات',
                category: 'subscriptions',
                type: 'subscription',
                price: 4.99,
                currency: 'USD',
                period: 'monthly',
                features: [
                    'إزالة جميع الإعلانات',
                    '500 عملة ذهبية شهرياً',
                    'وسائل مساعدة إضافية'
                ],
                icon: '🚫',
                color: '#e74c3c',
                featured: false,
                tags: ['subscription', 'no_ads'],
                requirements: null,
                limit: null
            },
            {
                id: 'subscription_yearly_vip',
                name: 'اشتراك VIP سنوي',
                description: 'VIP لمدة سنة بخصم كبير',
                category: 'subscriptions',
                type: 'subscription',
                price: 99.99,
                currency: 'USD',
                period: 'yearly',
                features: [
                    'جميع ميزات VIP',
                    '2000 عملة ذهبية شهرياً',
                    'هدية خاصة كل شهر',
                    'دعم فني على مدار الساعة',
                    'تصميم ذهبي حصري'
                ],
                icon: '💎',
                color: '#9b59b6',
                featured: true,
                tags: ['subscription', 'vip', 'yearly'],
                requirements: null,
                limit: null,
                discount: {
                    active: true,
                    originalPrice: 119.99,
                    percentage: 17
                }
            },
            
            // الباقات
            {
                id: 'bundle_starter',
                name: 'باقة المبتدئ',
                description: 'كل ما تحتاجه للبداية',
                category: 'bundles',
                type: 'bundle',
                price: 14.99,
                currency: 'USD',
                items: [
                    { id: 'coins_5000', quantity: 1 },
                    { id: 'extra_life', quantity: 3 },
                    { id: 'time_extension', quantity: 5 }
                ],
                icon: '🎒',
                color: '#3498db',
                featured: true,
                tags: ['bundle', 'starter'],
                requirements: { level: 1 },
                limit: { total: 1 },
                discount: {
                    active: true,
                    originalPrice: 24.99,
                    percentage: 40
                }
            },
            {
                id: 'bundle_pro',
                name: 'باقة المحترف',
                description: 'للاعبين المحترفين',
                category: 'bundles',
                type: 'bundle',
                price: 29.99,
                currency: 'USD',
                items: [
                    { id: 'coins_10000', quantity: 1 },
                    { id: 'double_prize', quantity: 2 },
                    { id: 'hint', quantity: 5 },
                    { id: 'extra_5050', quantity: 3 }
                ],
                icon: '⚡',
                color: '#e67e22',
                featured: true,
                tags: ['bundle', 'pro'],
                requirements: { level: 10 },
                limit: { perMonth: 1 },
                discount: {
                    active: true,
                    originalPrice: 49.99,
                    percentage: 40
                }
            },
            {
                id: 'bundle_millionaire',
                name: 'باقة المليونير',
                description: 'كل شيء للفوز بالمليون',
                category: 'bundles',
                type: 'bundle',
                price: 79.99,
                currency: 'USD',
                items: [
                    { id: 'coins_25000', quantity: 1 },
                    { id: 'subscription_vip', period: '3_months' },
                    { id: 'double_prize', quantity: 5 },
                    { id: 'extra_life', quantity: 10 },
                    { id: 'hint', quantity: 10 }
                ],
                icon: '🎩',
                color: '#f1c40f',
                featured: true,
                tags: ['bundle', 'ultimate'],
                requirements: { level: 20 },
                limit: { total: 1 },
                discount: {
                    active: true,
                    originalPrice: 149.99,
                    percentage: 47
                }
            }
        ];
        
        // تحميل المنتجات المخصصة من التخزين
        this.loadCustomProducts();
        
        console.log(`✅ تم تحميل ${this.products.length} منتج`);
    }
    
    /**
     * 📂 تحميل المنتجات المخصصة
     */
    loadCustomProducts() {
        try {
            const customData = localStorage.getItem('custom_products');
            if (customData) {
                const customProducts = JSON.parse(customData);
                this.products.push(...customProducts);
                console.log(`📂 تم تحميل ${customProducts.length} منتج مخصص`);
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل المنتجات المخصصة:", error);
        }
    }
    
    /**
     * 📂 تحميل المشتريات
     */
    loadPurchases() {
        try {
            const purchasesData = localStorage.getItem('user_purchases');
            if (purchasesData) {
                this.purchases = JSON.parse(purchasesData);
                console.log(`📂 تم تحميل ${this.purchases.length} عملية شراء`);
            } else {
                this.purchases = [];
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل المشتريات:", error);
            this.purchases = [];
        }
    }
    
    /**
     * 📂 تحميل الاشتراكات
     */
    loadSubscriptions() {
        try {
            const subsData = localStorage.getItem('user_subscriptions');
            if (subsData) {
                this.subscriptions = JSON.parse(subsData);
                console.log(`📂 تم تحميل ${Object.keys(this.subscriptions).length} اشتراك`);
            } else {
                this.subscriptions = {};
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل الاشتراكات:", error);
            this.subscriptions = {};
        }
    }
    
    /**
     * 🎁 إنشاء العروض اليومية
     */
    generateDailyDeals() {
        if (!this.settings.dailyDeals) return;
        
        const today = new Date().toDateString();
        const lastDealDate = localStorage.getItem('last_deal_date');
        
        if (lastDealDate === today) {
            // تم إنشاء العروض اليوم
            const deals = JSON.parse(localStorage.getItem('daily_deals') || '[]');
            this.sales = deals;
            return;
        }
        
        // إنشاء عروض جديدة
        this.sales = [];
        
        // اختيار 3 منتجات عشوائية لتكون في العرض
        const availableProducts = this.products.filter(p => 
            p.price > 5 && 
            !['subscription', 'bundle'].includes(p.type)
        );
        
        for (let i = 0; i < 3 && availableProducts.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableProducts.length);
            const product = availableProducts[randomIndex];
            
            const discount = Math.floor(Math.random() * 30) + 10; // 10-40%
            const salePrice = product.price * (1 - discount / 100);
            
            this.sales.push({
                productId: product.id,
                originalPrice: product.price,
                salePrice: salePrice,
                discount: discount,
                endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // تنتهي بعد 24 ساعة
                quantity: Math.floor(Math.random() * 50) + 10 // 10-60 وحدة
            });
            
            // إزالة المنتج من القائمة لمنع التكرار
            availableProducts.splice(randomIndex, 1);
        }
        
        // حفظ العروض
        localStorage.setItem('daily_deals', JSON.stringify(this.sales));
        localStorage.setItem('last_deal_date', today);
        
        console.log(`🎁 تم إنشاء ${this.sales.length} عرض يومي`);
    }
    
    /**
     * 🔍 البحث عن المنتجات
     */
    searchProducts(query, filters = {}) {
        let results = [...this.products];
        
        // البحث في النص
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }
        
        // تطبيق الفلاتر
        if (filters.category && filters.category !== 'all') {
            results = results.filter(p => p.category === filters.category);
        }
        
        if (filters.type) {
            results = results.filter(p => p.type === filters.type);
        }
        
        if (filters.maxPrice !== undefined) {
            results = results.filter(p => {
                const price = this.getProductPrice(p);
                return price <= filters.maxPrice;
            });
        }
        
        if (filters.minPrice !== undefined) {
            results = results.filter(p => {
                const price = this.getProductPrice(p);
                return price >= filters.minPrice;
            });
        }
        
        if (filters.featured) {
            results = results.filter(p => p.featured);
        }
        
        if (filters.onSale) {
            results = results.filter(p => 
                p.discount?.active || 
                this.sales.some(s => s.productId === p.id)
            );
        }
        
        // ترتيب النتائج
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price_asc':
                    results.sort((a, b) => this.getProductPrice(a) - this.getProductPrice(b));
                    break;
                case 'price_desc':
                    results.sort((a, b) => this.getProductPrice(b) - this.getProductPrice(a));
                    break;
                case 'popularity':
                    results.sort((a, b) => {
                        const purchasesA = this.getProductPurchaseCount(a.id);
                        const purchasesB = this.getProductPurchaseCount(b.id);
                        return purchasesB - purchasesA;
                    });
                    break;
                case 'discount':
                    results.sort((a, b) => {
                        const discountA = this.getProductDiscount(a);
                        const discountB = this.getProductDiscount(b);
                        return discountB - discountA;
                    });
                    break;
                case 'newest':
                    results.sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                        return dateB - dateA;
                    });
                    break;
            }
        }
        
        return {
            results: results,
            total: results.length,
            categories: this.getProductCategories(results),
            priceRange: this.getPriceRange(results)
        };
    }
    
    /**
     * 💰 الحصول على سعر المنتج (بعد الخصم)
     */
    getProductPrice(product) {
        let price = product.price;
        
        // تطبيق الخصم المباشر
        if (product.discount?.active) {
            price = product.discount.originalPrice * (1 - product.discount.percentage / 100);
        }
        
        // تطبيق الخصم اليومي
        const dailyDeal = this.sales.find(s => s.productId === product.id);
        if (dailyDeal) {
            price = dailyDeal.salePrice;
        }
        
        return price;
    }
    
    /**
     * 📊 الحصول على نسبة الخصم
     */
    getProductDiscount(product) {
        // الخصم المباشر
        if (product.discount?.active) {
            return product.discount.percentage;
        }
        
        // الخصم اليومي
        const dailyDeal = this.sales.find(s => s.productId === product.id);
        if (dailyDeal) {
            return dailyDeal.discount;
        }
        
        return 0;
    }
    
    /**
     * 📊 الحصول على فئات المنتجات
     */
    getProductCategories(products) {
        const categories = {};
        
        products.forEach(product => {
            const category = this.categories[product.category];
            if (category) {
                if (!categories[category.id]) {
                    categories[category.id] = {
                        ...category,
                        count: 0,
                        totalValue: 0
                    };
                }
                
                categories[category.id].count++;
                categories[category.id].totalValue += this.getProductPrice(product);
            }
        });
        
        return categories;
    }
    
    /**
     * 📊 الحصول على نطاق الأسعار
     */
    getPriceRange(products) {
        if (products.length === 0) {
            return { min: 0, max: 0, avg: 0 };
        }
        
        const prices = products.map(p => this.getProductPrice(p));
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        
        return { min, max, avg: Math.round(avg * 100) / 100 };
    }
    
    /**
     * 🛍️ شراء منتج
     */
    async purchaseProduct(productId, userId, paymentMethod = 'coins', quantity = 1) {
        // البحث عن المنتج
        const product = this.products.find(p => p.id === productId);
        
        if (!product) {
            return {
                success: false,
                message: 'المنتج غير موجود'
            };
        }
        
        // التحقق من المتطلبات
        const requirementCheck = this.checkRequirements(product, userId);
        if (!requirementCheck.valid) {
            return {
                success: false,
                message: requirementCheck.message
            };
        }
        
        // التحقق من الحدود
        const limitCheck = this.checkLimits(product, userId, quantity);
        if (!limitCheck.valid) {
            return {
                success: false,
                message: limitCheck.message
            };
        }
        
        // حساب السعر
        const price = this.calculatePrice(product, quantity);
        
        // معالجة الدفع
        const paymentResult = await this.processPayment(userId, price, paymentMethod, product.currency);
        
        if (!paymentResult.success) {
            return paymentResult;
        }
        
        // تسليم المنتج
        const deliveryResult = this.deliverProduct(product, userId, quantity, paymentResult);
        
        if (!deliveryResult.success) {
            // استرداد المبلغ في حالة الفشل
            await this.refundPayment(userId, price, paymentMethod, product.currency);
            return deliveryResult;
        }
        
        // تسجيل عملية الشراء
        const purchase = this.recordPurchase({
            productId: product.id,
            userId: userId,
            quantity: quantity,
            price: price,
            total: price * quantity,
            currency: product.currency,
            paymentMethod: paymentMethod,
            transactionId: paymentResult.transactionId,
            status: 'completed',
            delivered: true
        });
        
        // تحديث إحصائيات المنتج
        this.updateProductStats(product.id);
        
        console.log(`🛍️ تم شراء ${quantity} من ${product.name} بقيمة ${price * quantity} ${product.currency}`);
        
        return {
            success: true,
            message: 'تمت عملية الشراء بنجاح',
            purchase: purchase,
            delivery: deliveryResult,
            receipt: this.generateReceipt(purchase)
        };
    }
    
    /**
     * ✅ التحقق من المتطلبات
     */
    checkRequirements(product, userId) {
        if (!product.requirements) {
            return { valid: true };
        }
        
        // في تطبيق حقيقي، سيتم التحقق من مستوى المستخدم، الإنجازات، الخ
        // هنا نستخدم تبسيط
        const userLevel = this.getUserLevel(userId);
        
        if (product.requirements.level && userLevel < product.requirements.level) {
            return {
                valid: false,
                message: `يجب أن تكون مستوى ${product.requirements.level} لشراء هذا المنتج`
            };
        }
        
        return { valid: true };
    }
    
    /**
     * 📏 التحقق من الحدود
     */
    checkLimits(product, userId, quantity) {
        if (!product.limit) {
            return { valid: true };
        }
        
        // الحصول على المشتريات السابقة
        const userPurchases = this.getUserPurchases(userId);
        const productPurchases = userPurchases.filter(p => p.productId === product.id);
        
        // التحقق من الحد اليومي
        if (product.limit.perDay) {
            const today = new Date().toDateString();
            const todayPurchases = productPurchases.filter(p => 
                new Date(p.createdAt).toDateString() === today
            );
            
            const totalToday = todayPurchases.reduce((sum, p) => sum + p.quantity, 0);
            
            if (totalToday + quantity > product.limit.perDay) {
                return {
                    valid: false,
                    message: `لا يمكن شراء أكثر من ${product.limit.perDay} من هذا المنتج يومياً`
                };
            }
        }
        
        // التحقق من الحد الشهري
        if (product.limit.perMonth) {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            
            const monthPurchases = productPurchases.filter(p => 
                new Date(p.createdAt) >= startOfMonth
            );
            
            const totalMonth = monthPurchases.reduce((sum, p) => sum + p.quantity, 0);
            
            if (totalMonth + quantity > product.limit.perMonth) {
                return {
                    valid: false,
                    message: `لا يمكن شراء أكثر من ${product.limit.perMonth} من هذا المنتج شهرياً`
                };
            }
        }
        
        // التحقق من الحد الكلي
        if (product.limit.total) {
            const totalPurchased = productPurchases.reduce((sum, p) => sum + p.quantity, 0);
            
            if (totalPurchased + quantity > product.limit.total) {
                return {
                    valid: false,
                    message: `لا يمكن شراء أكثر من ${product.limit.total} من هذا المنتج`
                };
            }
        }
        
        return { valid: true };
    }
    
    /**
     * 🧮 حساب السعر
     */
    calculatePrice(product, quantity) {
        let price = this.getProductPrice(product);
        
        // تطبيق الضريبة
        if (this.settings.taxRate > 0 && product.currency === 'USD') {
            price += price * this.settings.taxRate;
        }
        
        return price;
    }
    
    /**
     * 💳 معالجة الدفع
     */
    async processPayment(userId, amount, method, currency) {
        // في تطبيق حقيقي، سيكون هناك اتصال ببوابة الدفع
        // هنا نستخدم محاكاة
        
        if (method === 'coins') {
            // الدفع بالعملات
            const userBalance = this.getUserCoins(userId);
            
            if (userBalance < amount) {
                return {
                    success: false,
                    message: 'رصيد العملات غير كافي'
                };
            }
            
            // خصم العملات
            this.deductUserCoins(userId, amount);
            
            return {
                success: true,
                transactionId: 'coin_' + Date.now(),
                method: 'coins',
                amount: amount,
                currency: currency
            };
            
        } else if (method === 'credit_card') {
            // محاكاة دفع بالبطاقة الائتمانية
            return {
                success: true,
                transactionId: 'cc_' + Date.now(),
                method: 'credit_card',
                amount: amount,
                currency: currency
            };
            
        } else if (method === 'paypal') {
            // محاكاة دفع بالباي بال
            return {
                success: true,
                transactionId: 'pp_' + Date.now(),
                method: 'paypal',
                amount: amount,
                currency: currency
            };
        }
        
        return {
            success: false,
            message: 'طريقة الدفع غير مدعومة'
        };
    }
    
    /**
     * 📦 تسليم المنتج
     */
    deliverProduct(product, userId, quantity, payment) {
        try {
            if (product.type === 'currency') {
                // تسليم العملات
                this.addUserCoins(userId, product.quantity * quantity);
                
                if (product.bonus > 0) {
                    this.addUserCoins(userId, product.bonus * quantity);
                }
                
            } else if (product.type === 'consumable') {
                // تسليم المنتج الاستهلاكي
                this.addToInventory(userId, product.id, quantity);
                
            } else if (product.type === 'subscription') {
                // تفعيل الاشتراك
                this.activateSubscription(userId, product);
                
            } else if (product.type === 'bundle') {
                // تسليم الباقة
                this.deliverBundle(userId, product, quantity);
            }
            
            return {
                success: true,
                delivered: true,
                items: this.getDeliveryItems(product, quantity)
            };
            
        } catch (error) {
            console.error("❌ خطأ في تسليم المنتج:", error);
            return {
                success: false,
                message: 'حدث خطأ أثناء تسليم المنتج'
            };
        }
    }
    
    /**
     * 🎁 تسليم الباقة
     */
    deliverBundle(userId, bundle, quantity) {
        if (!bundle.items) return;
        
        bundle.items.forEach(item => {
            const product = this.products.find(p => p.id === item.id);
            if (product) {
                if (product.type === 'subscription') {
                    // تفعيل الاشتراك للفترة المحددة
                    this.activateSubscription(userId, product, item.period);
                } else {
                    // إضافة المنتج للمخزون
                    this.addToInventory(userId, item.id, item.quantity * quantity);
                }
            }
        });
    }
    
    /**
     * 📋 الحصول على عناصر التسليم
     */
    getDeliveryItems(product, quantity) {
        const items = [];
        
        if (product.type === 'currency') {
            items.push({
                type: 'coins',
                amount: product.quantity * quantity,
                description: `${product.quantity * quantity} عملة ذهبية`
            });
            
            if (product.bonus > 0) {
                items.push({
                    type: 'bonus_coins',
                    amount: product.bonus * quantity,
                    description: `مكافأة: ${product.bonus * quantity} عملة`
                });
            }
            
        } else if (product.type === 'consumable') {
            items.push({
                type: 'item',
                id: product.id,
                quantity: quantity,
                description: `${quantity} × ${product.name}`
            });
            
        } else if (product.type === 'subscription') {
            items.push({
                type: 'subscription',
                id: product.id,
                period: product.period,
                description: `اشتراك ${product.name}`
            });
            
        } else if (product.type === 'bundle') {
            items.push({
                type: 'bundle',
                id: product.id,
                quantity: quantity,
                description: `باقة ${product.name}`
            });
        }
        
        return items;
    }
    
    /**
     * 📝 تسجيل عملية الشراء
     */
    recordPurchase(data) {
        const purchase = {
            id: 'purchase_' + Date.now(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.purchases.push(purchase);
        this.savePurchases();
        
        return purchase;
    }
    
    /**
     * 📊 تحديث إحصائيات المنتج
     */
    updateProductStats(productId) {
        // في تطبيق حقيقي، ستكون هناك إحصائيات للمنتج
        // هنا نستخدم تبسيط
        const stats = JSON.parse(localStorage.getItem('product_stats') || '{}');
        
        if (!stats[productId]) {
            stats[productId] = {
                totalPurchases: 0,
                totalRevenue: 0,
                lastPurchase: null
            };
        }
        
        stats[productId].totalPurchases++;
        stats[productId].lastPurchase = new Date().toISOString();
        
        localStorage.setItem('product_stats', JSON.stringify(stats));
    }
    
    /**
     * 🧾 إنشاء فاتورة
     */
    generateReceipt(purchase) {
        const product = this.products.find(p => p.id === purchase.productId);
        
        return {
            receiptId: 'rece
