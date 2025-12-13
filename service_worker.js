/**
 * Service Worker لتطبيق المليونير الذهبي (PWA)
 */

const CACHE_NAME = 'millionaire-cache-v2.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    
    // CSS
    '/assets/css/main.css',
    '/assets/css/animations.css',
    '/assets/css/game.css',
    
    // JavaScript
    '/assets/js/app.js',
    '/assets/js/game-engine.js',
    '/assets/js/sounds.js',
    '/assets/js/auth.js',
    '/assets/js/questions.js',
    '/assets/js/shop.js',
    '/assets/js/leaderboard.js',
    
    // الصور
    '/assets/images/favicon.png',
    '/assets/images/icons/icon-72.png',
    '/assets/images/icons/icon-192.png',
    '/assets/images/icons/icon-512.png',
    
    // الخطوط
    'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('جارٍ تخزين الملفات في ذاكرة التخزين المؤقت...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('تم التثبيت بنجاح');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('خطأ في التثبيت:', error);
            })
    );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('حذف ذاكرة التخزين المؤقت القديمة:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('تم التفعيل بنجاح');
            return self.clients.claim();
        })
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
    // تجاهل طلبات POST
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إذا كان الملف موجوداً في ذاكرة التخزين المؤقت
                if (response) {
                    return response;
                }
                
                // إذا لم يكن موجوداً، جلب من الشبكة
                return fetch(event.request)
                    .then(response => {
                        // التحقق من أن الاستجابة صالحة
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // استنساخ الاستجابة
                        const responseToCache = response.clone();
                        
                        // تخزين في ذاكرة التخزين المؤقت
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // إذا فشل الاتصال بالشبكة، يمكن إرجاع صفحة بديلة
                        if (event.request.url.includes('.html')) {
                            return caches.match('/index.html');
                        }
                        
                        // للصور، يمكن إرجاع صورة بديلة
                        if (event.request.url.includes('.png') || event.request.url.includes('.jpg')) {
                            return caches.match('/assets/images/favicon.png');
                        }
                        
                        return new Response('لا يوجد اتصال بالإنترنت', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// تحديث التطبيق في الخلفية
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

// إرسال إشعارات PUSH
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'المليونير الذهبي';
    const options = {
        body: data.body || 'لديك تحدٍ جديد ينتظرك!',
        icon: '/assets/images/icons/icon-192.png',
        badge: '/assets/images/icons/icon-72.png',
        tag: 'millionaire-notification',
        renotify: true,
        actions: [
            {
                action: 'play',
                title: 'العب الآن'
            },
            {
                action: 'dismiss',
                title: 'تجاهل'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// التعامل مع النقر على الإشعار
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'play') {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    if (clientList.length > 0) {
                        let client = clientList[0];
                        for (let i = 0; i < clientList.length; i++) {
                            if (clientList[i].focused) {
                                client = clientList[i];
                            }
                        }
                        return client.focus();
                    }
                    return clients.openWindow('/');
                })
        );
    }
});

// التعامل مع إغلاق الإشعار
self.addEventListener('notificationclose', event => {
    console.log('تم إغلاق الإشعار:', event.notification.tag);
});

// التعامل مع المزامنة في الخلفية
self.addEventListener('sync', event => {
    if (event.tag === 'sync-game-data') {
        event.waitUntil(syncGameData());
    }
});

// مزامنة بيانات اللعبة
async function syncGameData() {
    try {
        // هنا سيتم مزامنة بيانات اللعبة مع الخادم
        console.log('مزامنة بيانات اللعبة...');
        
        // محاكاة المزامنة
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('تمت المزامنة بنجاح');
    } catch (error) {
        console.error('خطأ في المزامنة:', error);
    }
}

// التعامل مع تثبيت التطبيق
self.addEventListener('appinstalled', event => {
    console.log('تم تثبيت التطبيق بنجاح!');
    
    // يمكن إرسال إشعار ترحيبي هنا
    event.waitUntil(
        self.registration.showNotification('مرحباً بك!', {
            body: 'تم تثبيت المليونير الذهبي بنجاح. ابدأ رحلتك نحو المليون!',
            icon: '/assets/images/icons/icon-192.png',
            badge: '/assets/images/icons/icon-72.png'
        })
    );
});
