/**
 * المليونير الذهبي - التطبيق الرئيسي
 */

class MillionaireApp {
    constructor() {
        console.log("🎮 بدء تشغيل المليونير الذهبي...");
        
        // تهيئة المتغيرات
        this.currentScreen = 'loading';
        this.user = null;
        this.game = null;
        this.soundManager = null;
        this.settings = this.loadSettings();
        this.isLoading = true;
        
        // تهيئة التطبيق
        this.init();
    }
    
    /**
     * تهيئة التطبيق
     */
    init() {
        // تهيئة مدير الصوت
        this.soundManager = new SoundManager();
        this.soundManager.loadSettings();
        
        // تحميل المستخدم
        this.loadUser();
        
        // إعداد أحداث الواجهة
        this.setupEvents();
        
        // بدء شاشة التحميل
        this.startLoadingScreen();
    }
    
    /**
     * بدء شاشة التحميل
     */
    startLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.getElementById('loading-progress');
        const progressText = document.getElementById('progress-text');
        const loadingTip = document.getElementById('loading-tip');
        const dollar = document.getElementById('dollar-animation');
        const stairs = document.querySelectorAll('.stair');
        
        let progress = 0;
        const tips = [
            "جاري تحميل الأسئلة...",
            "إعداد النظام الصوتي...",
            "تحميل الرسومات...",
            "جاري تهيئة اللعبة...",
            "تقريباً جاهز!"
        ];
        
        // حركة الدولار على الدرج
        const animateDollar = () => {
            let currentStair = 0;
            const totalStairs = stairs.length;
            
            const climbStairs = () => {
                if (currentStair < totalStairs) {
                    const stair = stairs[currentStair];
                    const rect = stair.getBoundingClientRect();
                    const container = document.querySelector('.staircase-animation').getBoundingClientRect();
                    
                    // حساب الموقع
                    const x = rect.left + rect.width / 2 - container.left - 30;
                    const y = rect.top + rect.height / 2 - container.top - 30;
                    
                    // تحريك الدولار
                    dollar.style.transform = `translate(${x}px, ${y}px)`;
                    
                    currentStair++;
                    setTimeout(climbStairs, 200);
                } else {
                    // وصول للقمة - تساقط الدولارات
                    this.createDollarRain();
                }
            };
            
            setTimeout(climbStairs, 500);
        };
        
        // تساقط الدولارات
        this.createDollarRain = () => {
            const container = document.querySelector('.staircase-animation');
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const dollarDrop = document.createElement('div');
                    dollarDrop.className = 'dollar-rain';
                    dollarDrop.innerHTML = '$';
                    dollarDrop.style.left = `${Math.random() * 100}%`;
                    dollarDrop.style.fontSize = `${Math.random() * 20 + 15}px`;
                    dollarDrop.style.animationDelay = `${Math.random() * 1}s`;
                    container.appendChild(dollarDrop);
                    
                    // إزالة العنصر بعد الانتهاء
                    setTimeout(() => {
                        if (dollarDrop.parentNode) {
                            dollarDrop.remove();
                        }
                    }, 3000);
                }, i * 50);
            }
        };
        
        // محاكاة التحميل
        const interval = setInterval(() => {
            progress += Math.random() * 8;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            // تغيير النصيحة
            const tipIndex = Math.floor(progress / 20);
            if (tipIndex < tips.length) {
                loadingTip.textContent = tips[tipIndex];
            }
            
            // تحريك الدولار عند 25%
            if (progress >= 25 && !dollar.classList.contains('moving')) {
                dollar.classList.add('moving');
                animateDollar();
            }
            
            // إكمال التحميل
            if (progress >= 100) {
                clearInterval(interval);
                
                // تأخير ثم الانتقال للشاشة التالية
                setTimeout(() => {
                    this.showScreen('register');
                }, 1500);
            }
        }, 100);
    }
    
    /**
     * تحميل المستخدم
     */
    loadUser() {
        const savedUser = localStorage.getItem('millionaire_user');
        if (savedUser) {
            try {
                this.user = JSON.parse(savedUser);
                console.log('تم تحميل المستخدم:', this.user.username);
            } catch (error) {
                console.error('خطأ في تحميل بيانات المستخدم:', error);
                this.user = null;
            }
        }
    }
    
    /**
     * حفظ المستخدم
     */
    saveUser() {
        if (this.user) {
            localStorage.setItem('millionaire_user', JSON.stringify(this.user));
        }
    }
    
    /**
     * تحميل الإعدادات
     */
    loadSettings() {
        const savedSettings = localStorage.getItem('game_settings');
        const defaultSettings = {
            sound: true,
            music: true,
            vibration: true,
            timer: true,
            notifications: true,
            darkMode: false,
            language: 'ar'
        };
        
        if (savedSettings) {
            try {
                return { ...defaultSettings, ...JSON.parse(savedSettings) };
            } catch (error) {
                console.error('خطأ في تحميل الإعدادات:', error);
                return defaultSettings;
            }
        }
        
        return defaultSettings;
    }
    
    /**
     * حفظ الإعدادات
     */
    saveSettings() {
        localStorage.setItem('game_settings', JSON.stringify(this.settings));
    }
    
    /**
     * إعداد أحداث الواجهة
     */
    setupEvents() {
        // أحداث التسجيل
        this.setupAuthEvents();
        
        // أحداث القائمة الرئيسية
        this.setupMainMenuEvents();
        
        // أحداث شاشة اللعبة
        this.setupGameEvents();
        
        // أحداث الإعدادات
        this.setupSettingsEvents();
        
        // أحداث المتجر
        this.setupShopEvents();
        
        // أحداث لوحة المتصدرين
        this.setupLeaderboardEvents();
    }
    
    /**
     * إعداد أحداث التسجيل
     */
    setupAuthEvents() {
        // تبديل بين التسجيل والدخول
        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        });
        
        document.getElementById('show-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
        });
        
        // تسجيل الدخول
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // التسجيل
        document.getElementById('register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }
    
    /**
     * معالجة تسجيل الدخول
     */
    handleLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        // التحقق البسيط
        if (!username || !password) {
            this.showNotification('يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        // محاكاة تسجيل الدخول
        const users = JSON.parse(localStorage.getItem('millionaire_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            this.user = user;
            this.saveUser();
            this.showNotification(`مرحباً بعودتك ${username}!`, 'success');
            this.soundManager.play('login');
            this.showScreen('main-menu');
            this.updateUserUI();
        } else {
            this.showNotification('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
            this.soundManager.play('error');
        }
    }
    
    /**
     * معالجة التسجيل
     */
    handleRegister() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;
        
        // التحقق من الحقول
        if (!username || !password || !confirmPassword) {
            this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        if (username.length < 3) {
            this.showNotification('اسم المستخدم يجب أن يكون 3 أحرف على الأقل', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('كلمات المرور غير متطابقة', 'error');
            return;
        }
        
        // التحقق من وجود المستخدم
        const users = JSON.parse(localStorage.getItem('millionaire_users') || '[]');
        if (users.some(u => u.username === username)) {
            this.showNotification('اسم المستخدم موجود بالفعل', 'error');
            return;
        }
        
        // إنشاء المستخدم
        const newUser = {
            id: Date.now(),
            username: username,
            password: password,
            email: email || '',
            balance: 1000, // رصيد ابتدائي
            level: 1,
            gamesPlayed: 0,
            gamesWon: 0,
            totalEarnings: 0,
            achievements: [],
            inventory: [],
            subscription: null,
            createdAt: new Date().toISOString()
        };
        
        // حفظ المستخدم
        users.push(newUser);
        localStorage.setItem('millionaire_users', JSON.stringify(users));
        
        this.user = newUser;
        this.saveUser();
        
        this.showNotification(`مرحباً بك ${username}! تم إنشاء حسابك بنجاح`, 'success');
        this.soundManager.play('register');
        this.showScreen('main-menu');
        this.updateUserUI();
    }
    
    /**
     * إعداد أحداث القائمة الرئيسية
     */
    setupMainMenuEvents() {
        // زر اللعب
        document.getElementById('play-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('category-screen');
        });
        
        // زر التحدي اليومي
        document.getElementById('daily-challenge-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showNotification('قريباً: التحدي اليومي', 'info');
        });
        
        // زر لوحة المتصدرين
        document.getElementById('leaderboard-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('leaderboard-screen');
            this.loadLeaderboard();
        });
        
        // زر المتجر
        document.getElementById('shop-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('shop-screen');
            this.updateShopBalance();
        });
        
        // زر الإنجازات
        document.getElementById('achievements-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showNotification('قريباً: الإنجازات', 'info');
        });
        
        // زر كيفية اللعب
        document.getElementById('how-to-play-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showTutorial();
        });
        
        // زر الإعدادات
        document.getElementById('settings-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('settings-screen');
            this.loadSettingsUI();
        });
        
        // زر الإشعارات
        document.getElementById('notifications-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.toggleNotifications();
        });
        
        // زر اللعبة السريعة
        document.getElementById('quick-play')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.startQuickGame();
        });
        
        // زر دعوة صديق
        document.getElementById('invite-friend')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.inviteFriend();
        });
        
        // زر مشاهدة إعلان
        document.getElementById('watch-ad')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.watchAd();
        });
        
        // أزرار العودة
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.soundManager.play('click');
                this.showScreen('main-menu');
            });
        });
    }
    
    /**
     * إعداد أحداث شاشة اللعبة
     */
    setupGameEvents() {
        // اختيار الإجابة
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', () => {
                if (this.game && this.game.isGameActive && !option.classList.contains('disabled')) {
                    this.selectAnswer(option);
                }
            });
        });
        
        // زر تأكيد الإجابة
        document.getElementById('confirm-answer')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.confirmAnswer();
            }
        });
        
        // وسائل المساعدة
        document.getElementById('lifeline-50-50')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.useLifeline('50-50');
            }
        });
        
        document.getElementById('lifeline-friend')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.useLifeline('friend');
            }
        });
        
        document.getElementById('lifeline-audience')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.useLifeline('audience');
            }
        });
        
        // زر تخطي السؤال
        document.getElementById('skip-question-btn')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.skipQuestion();
            }
        });
        
        // زر الانسحاب
        document.getElementById('withdraw-btn')?.addEventListener('click', () => {
            if (this.game && this.game.isGameActive) {
                this.withdrawGame();
            }
        });
        
        // أزرار الإغلاق في النوافذ المنبثقة
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lifeline-modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            });
        });
        
        // زر العودة من النتيجة
        document.getElementById('back-to-home-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('main-menu');
        });
        
        // زر اللعب مرة أخرى
        document.getElementById('play-again-btn')?.addEventListener('click', () => {
            this.soundManager.play('click');
            this.showScreen('category-screen');
        });
        
        // زر مشاركة النتيجة
        document.getElementById('share-result-btn')?.addEventListener('click', () => {
            this.shareResult();
        });
        
        // زر مضاعفة الجائزة
        document.getElementById('double-prize-btn')?.addEventListener('click', () => {
            this.watchAdForDoublePrize();
        });
    }
    
    /**
     * بدء لعبة سريعة
     */
    startQuickGame() {
        if (!this.user) {
            this.showNotification('يجب تسجيل الدخول أولاً', 'warning');
            this.showScreen('register');
            return;
        }
        
        this.soundManager.play('game_start');
        this.showScreen('category-screen');
    }
    
    /**
     * دعوة صديق
     */
    inviteFriend() {
        if (navigator.share) {
            navigator.share({
                title: 'المليونير الذهبي',
                text: 'انضم إلي في تحدي المليونير الذهبي واربح مليون دولار!',
                url: window.location.href
            }).then(() => {
                this.showNotification('تمت المشاركة بنجاح!', 'success');
            }).catch(error => {
                console.log('خطأ في المشاركة:', error);
            });
        } else {
            // نسخ الرابط
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('تم نسخ الرابط! شاركه مع أصدقائك', 'success');
            });
        }
    }
    
    /**
     * مشاهدة إعلان
     */
    watchAd() {
        this.showNotification('جاري تحميل الإعلان...', 'info');
        
        // محاكاة مشاهدة الإعلان
        setTimeout(() => {
            if (this.user) {
                this.user.balance += 100;
                this.saveUser();
                this.updateUserUI();
                this.showNotification('+100 عملة! تمت إضافتها لحسابك', 'success');
                this.soundManager.play('coins');
            }
        }, 2000);
    }
    
    /**
     * إظهار التعليمات
     */
    showTutorial() {
        const messages = [
            "مرحباً بك في المليونير الذهبي!",
            "قواعد اللعبة بسيطة:",
            "1. اختر مجال الأسئلة المفضل لديك",
            "2. أجب على 15 سؤالاً للحصول على مليون دولار",
            "3. لديك 3 وسائل مساعدة:",
            "   • 50:50 - حذف إجابتين خاطئتين",
            "   • استشارة صديق - رأي خبير",
            "   • رأي الجمهور - تصويت الحضور",
            "4. يمكنك الانسحاب في أي وقت والحصول على الجائزة الحالية",
            "5. كل 5 أسئلة هناك مستوى آمن لا تخسر عنده",
            "حظاً موفقاً!"
        ];
        
        let currentMessage = 0;
        
        const showNextMessage = () => {
            if (currentMessage < messages.length) {
                this.showNotification(messages[currentMessage], 'info');
                currentMessage++;
                setTimeout(showNextMessage, 2000);
            }
        };
        
        showNextMessage();
    }
    
    /**
     * تحديث واجهة المستخدم
     */
    updateUserUI() {
        if (this.user) {
            // تحديث القائمة الرئيسية
            const usernameElements = document.querySelectorAll('#display-username, #game-username, #leaderboard-username, #player-rank-name');
            usernameElements.forEach(el => {
                if (el) el.textContent = this.user.username;
            });
            
            // تحديث الرصيد
            const balanceElements = document.querySelectorAll('#user-balance, #shop-balance');
            balanceElements.forEach(el => {
                if (el) el.textContent = `${this.user.balance}$`;
            });
            
            // تحديث المستوى
            const levelElements = document.querySelectorAll('#player-level');
            levelElements.forEach(el => {
                if (el) el.textContent = this.user.level;
            });
        }
    }
    
    /**
     * تبديل الإشعارات
     */
    toggleNotifications() {
        const container = document.getElementById('notifications-container');
        container.classList.toggle('active');
    }
    
    /**
     * إظهار إشعار
     */
    showNotification(message, type = 'info') {
        // إنشاء العنصر
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // إضافة للقائمة
        const list = document.getElementById('notifications-list');
        list.insertBefore(notification, list.firstChild);
        
        // تحديث العداد
        this.updateNotificationCount();
        
        // تشغيل الصوت
        this.soundManager.play(type === 'error' ? 'error' : 'notification');
        
        // إغلاق تلقائي
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                this.updateNotificationCount();
            }
        }, 5000);
        
        // حدث الإغلاق
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
            this.updateNotificationCount();
        });
    }
    
    /**
     * الحصول على أيقونة الإشعار
     */
    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
    
    /**
     * تحديث عداد الإشعارات
     */
    updateNotificationCount() {
        const count = document.querySelectorAll('.notification').length;
        const badge = document.getElementById('notification-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    /**
     * مسح جميع الإشعارات
     */
    setupNotificationsEvents() {
        document.getElementById('clear-notifications')?.addEventListener('click', () => {
            document.querySelectorAll('.notification').forEach(n => n.remove());
            this.updateNotificationCount();
            this.soundManager.play('click');
        });
    }
    
    /**
     * إعداد أحداث الإعدادات
     */
    setupSettingsEvents() {
        // تحميل الإعدادات للواجهة
        this.loadSettingsUI = () => {
            document.getElementById('bg-music').checked = this.settings.music;
            document.getElementById('sound-effects').checked = this.settings.sound;
            document.getElementById('vibration').checked = this.settings.vibration;
            document.getElementById('auto-timer').checked = this.settings.timer;
            document.getElementById('dark-mode').checked = this.settings.darkMode;
            document.getElementById('volume-slider').value = this.soundManager.volume * 100;
            document.getElementById('volume-value').textContent = `${Math.round(this.soundManager.volume * 100)}%`;
        };
        
        // تغيير الإعدادات
        document.getElementById('bg-music')?.addEventListener('change', (e) => {
            this.settings.music = e.target.checked;
            this.saveSettings();
            if (e.target.checked) {
                this.soundManager.playBackgroundMusic();
            } else {
                this.soundManager.stopBackgroundMusic();
            }
        });
        
        document.getElementById('sound-effects')?.addEventListener('change', (e) => {
            this.settings.sound = e.target.checked;
            this.saveSettings();
            this.soundManager.enabled = e.target.checked;
        });
        
        document.getElementById('vibration')?.addEventListener('change', (e) => {
            this.settings.vibration = e.target.checked;
            this.saveSettings();
            this.soundManager.vibrateEnabled = e.target.checked;
        });
        
        document.getElementById('auto-timer')?.addEventListener('change', (e) => {
            this.settings.timer = e.target.checked;
            this.saveSettings();
        });
        
        document.getElementById('dark-mode')?.addEventListener('change', (e) => {
            this.settings.darkMode = e.target.checked;
            this.saveSettings();
            document.body.classList.toggle('dark-mode', e.target.checked);
        });
        
        document.getElementById('volume-slider')?.addEventListener('input', (e) => {
            const value = e.target.value;
            this.soundManager.setVolume(value / 100);
            document.getElementById('volume-value').textContent = `${value}%`;
        });
        
        // تسجيل الخروج
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                this.user = null;
                localStorage.removeItem('millionaire_user');
                this.showNotification('تم تسجيل الخروج بنجاح', 'success');
                this.showScreen('register');
            }
        });
        
        // حذف الحساب
        document.getElementById('delete-account-btn')?.addEventListener('click', () => {
            this.showConfirmation(
                'حذف الحساب',
                'هل أنت متأكد من حذف حسابك؟ سيتم حذف جميع بياناتك بشكل دائم.',
                () => {
                    if (this.user) {
                        const users = JSON.parse(localStorage.getItem('millionaire_users') || '[]');
                        const updatedUsers = users.filter(u => u.id !== this.user.id);
                        localStorage.setItem('millionaire_users', JSON.stringify(updatedUsers));
                        localStorage.removeItem('millionaire_user');
                        this.user = null;
                        this.showNotification('تم حذف حسابك بنجاح', 'success');
                        this.showScreen('register');
                    }
                }
            );
        });
        
        // تقييم التطبيق
        document.getElementById('rate-app-btn')?.addEventListener('click', () => {
            this.showNotification('شكراً لك! سيتم توجيهك لمتجر التطبيقات قريباً', 'info');
        });
        
        // مشاركة التطبيق
        document.getElementById('share-app-btn')?.addEventListener('click', () => {
            this.inviteFriend();
        });
    }
    
    /**
     * إعداد أحداث المتجر
     */
    setupShopEvents() {
        // تبديل التبويبات
        document.querySelectorAll('.shop-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.shop-tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // شراء العملات
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.getAttribute('data-product');
                this.purchaseProduct(product);
            });
        });
        
        // الاشتراكات
        document.getElementById('subscribe-vip')?.addEventListener('click', () => {
            this.purchaseSubscription('vip');
        });
        
        document.getElementById('subscribe-no-ads')?.addEventListener('click', () => {
            this.purchaseSubscription('no-ads');
        });
    }
    
    /**
     * تحديث رصيد المتجر
     */
    updateShopBalance() {
        if (this.user) {
            document.getElementById('shop-balance').textContent = `${this.user.balance}$`;
        }
    }
    
    /**
     * شراء منتج
     */
    purchaseProduct(productId) {
        if (!this.user) {
            this.showNotification('يجب تسجيل الدخول أولاً', 'warning');
            return;
        }
        
        // أسعار المنتجات
        const prices = {
            'coins-1000': 4.99,
            'coins-5000': 19.99,
            'coins-10000': 34.99,
            'coins-25000': 79.99
        };
        
        const price = prices[productId];
        if (!price) {
            this.showNotification('المنتج غير متوفر', 'error');
            return;
        }
        
        this.showConfirmation(
            'تأكيد الشراء',
            `هل تريد شراء هذا المنتج بسعر ${price}$؟`,
            () => {
                // محاكاة عملية الشراء
                setTimeout(() => {
                    const amounts = {
                        'coins-1000': 1000,
                        'coins-5000': 5000,
                        'coins-10000': 10000,
                        'coins-25000': 25000
                    };
                    
                    const amount = amounts[productId];
                    this.user.balance += amount;
                    this.saveUser();
                    this.updateShopBalance();
                    this.updateUserUI();
                    
                    this.showNotification(`تمت إضافة ${amount} عملة لحسابك!`, 'success');
                    this.soundManager.play('purchase');
                }, 1000);
            }
        );
    }
    
    /**
     * شراء اشتراك
     */
    purchaseSubscription(type) {
        if (!this.user) {
            this.showNotification('يجب تسجيل الدخول أولاً', 'warning');
            return;
        }
        
        const plans = {
            'vip': { price: 9.99, name: 'VIP' },
            'no-ads': { price: 4.99, name: 'بدون إعلانات' }
        };
        
        const plan = plans[type];
        if (!plan) return;
        
        this.showConfirmation(
            'تأكيد الاشتراك',
            `هل تريد الاشتراك في باقة ${plan.name} بسعر ${plan.price}$ شهرياً؟`,
            () => {
                // محاكاة عملية الاشتراك
                setTimeout(() => {
                    this.user.subscription = {
                        type: type,
                        startDate: new Date().toISOString(),
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                    };
                    
                    this.saveUser();
                    this.showNotification(`تم تفعيل اشتراك ${plan.name} بنجاح!`, 'success');
                    this.soundManager.play('success');
                }, 1000);
            }
        );
    }
    
    /**
     * إعداد أحداث لوحة المتصدرين
     */
    setupLeaderboardEvents() {
        document.getElementById('leaderboard-filter')?.addEventListener('change', (e) => {
            this.loadLeaderboard(e.target.value);
        });
    }
    
    /**
     * تحميل لوحة المتصدرين
     */
    loadLeaderboard(filter = 'alltime') {
        // محاكاة بيانات المتصدرين
        const leaderboardData = [
            { rank: 1, name: "أحمد النابغة", score: 1000000, games: 15, avatar: "👑" },
            { rank: 2, name: "سارة الذكية", score: 500000, games: 14, avatar: "🥈" },
            { rank: 3, name: "محمد العبقري", score: 250000, games: 13, avatar: "🥉" },
            { rank: 4, name: "فاطمة المبدعة", score: 128000, games: 12, avatar: "💎" },
            { rank: 5, name: "خالد الحيفر", score: 64000, games: 11, avatar: "⭐" },
            { rank: 6, name: "لينا الفهدة", score: 32000, games: 10, avatar: "🚀" },
            { rank: 7, name: "عمر الذهبي", score: 16000, games: 9, avatar: "🔥" },
            { rank: 8, name: "ريم السريعة", score: 10000, games: 8, avatar: "⚡" },
            { rank: 9, name: "زياد القائد", score: 5000, games: 7, avatar: "🎯" },
            { rank: 10, name: "نور الهدى", score: 2000, games: 6, avatar: "✨" }
        ];
        
        // عرض البيانات
        const container = document.getElementById('leaderboard-entries');
        if (container) {
            container.innerHTML = leaderboardData.slice(3).map(player => `
                <div class="leaderboard-item">
                    <div class="item-rank">${player.rank}</div>
                    <div class="item-avatar">${player.avatar}</div>
                    <div class="item-info">
                        <h4>${player.name}</h4>
                        <p class="item-stats">${player.games} لعبة</p>
                    </div>
                    <div class="item-score">${this.formatNumber(player.score)}$</div>
                </div>
            `).join('');
        }
        
        // تحديث الإحصائيات
        document.getElementById('total-players').textContent = '12,345';
        document.getElementById('total-prize-money').textContent = '12,345,678$';
        document.getElementById('highest-prize').textContent = '1,000,000$';
        
        // تحديث تصنيف المستخدم
        if (this.user) {
            document.getElementById('user-rank').textContent = '#42';
            document.getElementById('user-score').textContent = `${this.user.balance}$`;
        }
    }
    
    /**
     * تنسيق الأرقام
     */
    formatNumber(num) {
        return new Intl.NumberFormat('ar-EG').format(num);
    }
    
    /**
     * إظهار تأكيد
     */
    showConfirmation(title, message, onConfirm) {
        const modal = document.getElementById('confirmation-modal');
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        
        modal.classList.add('active');
        
        document.getElementById('modal-confirm').onclick = () => {
            modal.classList.remove('active');
            if (onConfirm) onConfirm();
        };
        
        document.getElementById('modal-cancel').onclick = () => {
            modal.classList.remove('active');
        };
    }
    
    /**
     * إظهار شاشة
     */
    showScreen(screenId) {
        // إخفاء جميع الشاشات
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // إظهار الشاشة المطلوبة
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenId;
            
            // إذا كانت شاشة اللعبة، نبدأ لعبة جديدة
            if (screenId === 'game-screen' && !this.game) {
                this.startNewGame();
            }
            
            // تشغيل الموسيقى المناسبة
            if (screenId === 'game-screen') {
                this.soundManager.playBackgroundMusic('game');
            } else if (screenId === 'main-menu') {
                this.soundManager.playBackgroundMusic('menu');
            }
        }
    }
    
    /**
     * بدء لعبة جديدة
     */
    startNewGame() {
        // الحصول على إعدادات اللعبة
        const category = localStorage.getItem('selectedCategory') || 'general';
        const difficulty = localStorage.getItem('selectedDifficulty') || 'medium';
        const withTimer = localStorage.getItem('gameTimer') === 'true';
        
        // إنشاء محرك اللعبة
        this.game = new GameEngine();
        this.game.startNewGame({
            category: category,
            difficulty: difficulty,
            withTimer: withTimer,
            user: this.user
        });
        
        // تحديث الواجهة
        this.updateGameUI();
    }
    
    /**
     * تحديث واجهة اللعبة
     */
    updateGameUI() {
        if (!this.game) return;
        
        const state = this.game.getGameState();
        
        // تحديث السؤال
        document.getElementById('question-text').textContent = state.currentQuestion?.question || 'جاري تحميل السؤال...';
        document.getElementById('question-category').textContent = this.getCategoryName(state.category);
        document.getElementById('question-number').textContent = `سؤال ${state.currentLevel} من 15`;
        
        // تحديث الإجابات
        const answersContainer = document.getElementById('answers-container');
        if (state.currentQuestion) {
            answersContainer.innerHTML = state.currentQuestion.options.map((option, index) => `
                <div class="answer-option" data-index="${index}">
                    <div class="option-letter">${String.fromCharCode(1570 + index)}</div>
                    <div class="option-text">${option}</div>
                </div>
            `).join('');
            
            // إعادة إضافة الأحداث
            document.querySelectorAll('.answer-option').forEach(option => {
                option.addEventListener('click', () => {
                    if (this.game && this.game.isGameActive && !option.classList.contains('disabled')) {
                        this.selectAnswer(option);
                    }
                });
            });
        }
        
        // تحديث الجوائز
        document.getElementById('current-prize').textContent = `${state.currentPrize}$`;
        document.getElementById('withdraw-amount').textContent = `${state.currentPrize}$`;
        
        // تحديث المؤقت
        if (state.timer) {
            document.getElementById('game-timer').textContent = state.timeLeft;
        }
        
        // تحديث وسائل المساعدة
        this.updateLifelinesUI();
    }
    
    /**
     * الحصول على اسم الفئة
     */
    getCategoryName(category) {
        const categories = {
            'general': 'الثقافة العامة',
            'science': 'العلوم',
            'history': 'التاريخ',
            'geography': 'الجغرافيا',
            'sports': 'الرياضة',
            'entertainment': 'الترفيه',
            'kids': 'للأطفال',
            'all': 'شاملة'
        };
        
        return categories[category] || 'عام';
    }
    
    /**
     * تحديث وسائل المساعدة
     */
    updateLifelinesUI() {
        if (!this.game) return;
        
        const lifelines = this.game.getLifelines();
        
        // 50:50
        const fiftyFiftyBtn = document.getElementById('lifeline-50-50');
        if (fiftyFiftyBtn) {
            fiftyFiftyBtn.disabled = !lifelines.fiftyFifty;
            fiftyFiftyBtn.classList.toggle('used', !lifelines.fiftyFifty);
        }
        
        // صديق
        const friendBtn = document.getElementById('lifeline-friend');
        if (friendBtn) {
            friendBtn.disabled = !lifelines.askFriend;
            friendBtn.classList.toggle('used', !lifelines.askFriend);
        }
        
        // جمهور
        const audienceBtn = document.getElementById('lifeline-audience');
        if (audienceBtn) {
            audienceBtn.disabled = !lifelines.audience;
            audienceBtn.classList.toggle('used', !lifelines.audience);
        }
    }
    
    /**
     * اختيار الإجابة
     */
    selectAnswer(optionElement) {
        if (!this.game || !this.game.isGameActive) return;
        
        // إلغاء اختيار جميع الإجابات
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // اختيار الإجابة الحالية
        optionElement.classList.add('selected');
        
        // تفعيل زر التأكيد
        document.getElementById('confirm-answer').disabled = false;
        
        // تشغيل الصوت
        this.soundManager.play('select');
    }
    
    /**
     * تأكيد الإجابة
     */
    confirmAnswer() {
        if (!this.game || !this.game.isGameActive) return;
        
        const selectedOption = document.querySelector('.answer-option.selected');
        if (!selectedOption) return;
        
        const answerIndex = parseInt(selectedOption.getAttribute('data-index'));
        const result = this.game.checkAnswer(answerIndex);
        
        // عرض النتيجة
        if (result.correct) {
            this.handleCorrectAnswer(selectedOption, result);
        } else {
            this.handleWrongAnswer(selectedOption, result);
        }
    }
    
    /**
     * معالجة الإجابة الصحيحة
     */
    handleCorrectAnswer(optionElement, result) {
        // إظهار الإجابة الصحيحة
        const correctOption = document.querySelector(`.answer-option[data-index="${result.correctIndex}"]`);
        correctOption.classList.add('correct');
        
        // تشغيل الصوت
        this.soundManager.play('correct');
        
        // تطبيق وميض أخضر
        document.body.classList.add('correct-flash');
        setTimeout(() => {
            document.body.classList.remove('correct-flash');
        }, 500);
        
        // الانتقال للسؤال التالي بعد تأخير
        setTimeout(() => {
            if (this.game.isGameActive) {
                this.game.nextQuestion();
                this.updateGameUI();
                document.getElementById('confirm-answer').disabled = true;
                
                // إذا وصل للمليون
                if (this.game.currentLevel > 15) {
                    this.endGame(true);
                }
            }
        }, 2000);
    }
    
    /**
     * معالجة الإجابة الخاطئة
     */
    handleWrongAnswer(optionElement, result) {
        // إظهار الإجابة الخاطئة
        optionElement.classList.add('wrong');
        
        // إظهار الإجابة الصحيحة
        const correctOption = document.querySelector(`.answer-option[data-index="${result.correctIndex}"]`);
        correctOption.classList.add('correct');
        
        // تشغيل الصوت
        this.soundManager.play('wrong');
        
        // تطبيق وميض أحمر
        document.body.classList.add('wrong-flash');
        setTimeout(() => {
            document.body.classList.remove('wrong-flash');
        }, 500);
        
        // إنهاء اللعبة بعد تأخير
        setTimeout(() => {
            this.endGame(false);
        }, 3000);
    }
    
    /**
     * استخدام وسيلة مساعدة
     */
    useLifeline(type) {
        if (!this.game || !this.game.isGameActive) return;
        
        let result;
        
        switch(type) {
            case '50-50':
                result = this.game.useFiftyFifty();
                if (result) {
                    this.applyFiftyFifty(result);
                }
                break;
                
            case 'friend':
                result = this.game.useAskFriend();
                if (result) {
                    this.showFriendHelp(result);
                }
                break;
                
            case 'audience':
                result = this.game.useAudience();
                if (result) {
                    this.showAudiencePoll(result);
                }
                break;
        }
        
        // تحديث الواجهة
        this.updateLifelinesUI();
        this.soundManager.play('lifeline');
    }
    
    /**
     * تطبيق 50:50
     */
    applyFiftyFifty(result) {
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            const index = parseInt(option.getAttribute('data-index'));
            if (!result.remainingOptions.includes(index)) {
                option.classList.add('disabled');
                option.style.opacity = '0.3';
            }
        });
    }
    
    /**
     * إظهار مساعدة الصديق
     */
    showFriendHelp(result) {
        const modal = document.getElementById('friend-modal');
        const suggestion = document.getElementById('friend-suggestion');
        const expertise = document.getElementById('friend-expertise');
        
        // تحديث النص
        const optionLetters = ['أ', 'ب', 'ج', 'د'];
        suggestion.innerHTML = `"أعتقد أن الإجابة الصحيحة هي <strong>${optionLetters[result.suggestedAnswer]}</strong>"`;
        expertise.textContent = this.getCategoryName(this.game.category);
        
        // إظهار النافذة
        modal.classList.add('active');
    }
    
    /**
     * إظهار تصويت الجمهور
     */
    showAudiencePoll(result) {
        const modal = document.getElementById('audience-modal');
        const pollOptions = document.querySelectorAll('.poll-option');
        
        // تحديث النسب
        pollOptions.forEach(option => {
            const index = parseInt(option.getAttribute('data-option'));
            const percent = result.votes[index];
            const bar = option.querySelector('.poll-bar');
            const percentText = option.querySelector('.poll-percent');
            
            bar.style.width = `${percent}%`;
            percentText.textContent = `${percent}%`;
        });
        
        // تحديث عدد المصوتين
        document.getElementById('total-votes').textContent = '1,234';
        
        // إظهار النافذة
        modal.classList.add('active');
    }
    
    /**
     * تخطي السؤال
     */
    skipQuestion() {
        if (!this.game || !this.game.isGameActive) return;
        
        this.showNotification('جاري تحميل الإعلان...', 'info');
        
        // محاكاة مشاهدة الإعلان
        setTimeout(() => {
            this.game.skipQuestion();
            this.updateGameUI();
            this.showNotification('تم تخطي السؤال!', 'success');
            this.soundManager.play('skip');
        }, 2000);
    }
    
    /**
     * الانسحاب من اللعبة
     */
    withdrawGame() {
        if (!this.game || !this.game.isGameActive) return;
        
        this.showConfirmation(
            'تأكيد الانسحاب',
            `هل أنت متأكد من الانسحاب؟ ستحصل على ${this.game.currentPrize}$`,
            () => {
                const result = this.game.withdraw();
                this.endGame(false, result.prize);
                this.showNotification(`لقد انسحبت برصيد ${result.prize}$!`, 'success');
            }
        );
    }
    
    /**
     * إنهاء اللعبة
     */
    endGame(win = false, finalPrize = null) {
        if (!this.game) return;
        
        const prize = finalPrize || this.game.currentPrize;
        
        // تحديث بيانات المستخدم
        if (this.user) {
            this.user.balance += prize;
            this.user.gamesPlayed++;
            if (win) this.user.gamesWon++;
            this.user.totalEarnings += prize;
            this.saveUser();
        }
        
        // عرض شاشة النتيجة
        this.showResultScreen(win, prize);
        
        // إعادة تعيين اللعبة
        this.game = null;
    }
    
    /**
     * إظهار شاشة النتيجة
     */
    showResultScreen(win, prize) {
        // تحديث النصوص
        document.getElementById('result-title').textContent = win ? '🎉 مبروك! فزت بالمليون! 🎉' : '🎮 انتهت اللعبة!';
        document.getElementById('result-subtitle').textContent = win ? 'لقد فزت بـ' : 'لقد ربحت';
        document.getElementById('final-prize').textContent = `${this.formatNumber(prize)}$`;
        
        // تحديث الإحصائيات
        if (this.user) {
            document.getElementById('correct-answers').textContent = `${this.game?.correctAnswers || 0}/15`;
            document.getElementById('highest-level').textContent = `المرحلة ${this.game?.currentLevel || 1}`;
            document.getElementById('total-balance').textContent = `${this.formatNumber(this.user.balance)}$`;
            document.getElementById('player-rank-score').textContent = `${this.formatNumber(prize)}$`;
        }
        
        // إظهار الشاشة
        this.showScreen('result-screen');
        
        // تشغيل الصوت
        if (win) {
            this.soundManager.play('win');
        } else {
            this.soundManager.play(prize > 1000 ? 'level_up' : 'lose');
        }
    }
    
    /**
     * مشاركة النتيجة
     */
    shareResult() {
        const prize = document.getElementById('final-prize').textContent;
        const text = `فزت بـ${prize} في لعبة المليونير الذهبي! جربها الآن: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'نتيجة المليونير الذهبي',
                text: text
            });
        } else {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('تم نسخ النتيجة! شاركها مع أصدقائك', 'success');
            });
        }
    }
    
    /**
     * مشاهدة إعلان لمضاعفة الجائزة
     */
    watchAdForDoublePrize() {
        this.showNotification('جاري تحميل الإعلان...', 'info');
        
        // محاكاة مشاهدة الإعلان
        setTimeout(() => {
            if (this.user) {
                const currentPrize = parseInt(document.getElementById('final-prize').textContent.replace(/\D/g, ''));
                const doubledPrize = currentPrize * 2;
                
                this.user.balance += currentPrize; // إضافة المبلغ الإضافي
                this.saveUser();
                
                document.getElementById('final-prize').textContent = `${this.formatNumber(doubledPrize)}$`;
                this.showNotification(`تم مضاعفة ربحك! ${currentPrize}$ إضافية`, 'success');
                this.soundManager.play('coins');
            }
        }, 3000);
    }
}

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التطبيق
    window.MillionaireApp = new MillionaireApp();
    
    // تسجيل Service Worker لـ PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }, function(error) {
                console.log('Service Worker registration failed:', error);
            });
        });
    }
});
