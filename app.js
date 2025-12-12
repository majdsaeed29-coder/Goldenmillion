/**
 * المليونير الذهبي - النسخة المميزة
 * التطبيق الرئيسي مع جميع الميزات الجديدة
 */

class MillionaireApp {
    constructor() {
        console.log('🚀 بدء تشغيل المليونير الذهبي - النسخة المميزة');
        
        // تهيئة التطبيق
        this.initializeApp();
        
        // تحميل المكونات الأساسية
        this.loadCoreModules();
        
        // إعداد الأحداث
        this.setupEvents();
        
        // التحقق من المستخدم
        this.checkUserSession();
        
        // بدء المؤثرات
        this.startEffects();
        
        // تحديث الإحصائيات الحية
        this.startLiveUpdates();
    }
    
    /**
     * تهيئة التطبيق
     */
    initializeApp() {
        // إنشاء مثيلات الأنظمة الأساسية
        this.config = window.GameConfig || {};
        this.auth = new AuthSystem();
        this.questions = new QuestionManager();
        this.game = new GameEngine();
        this.ui = new UIManager(this);
        
        // الأنظمة الجديدة
        this.shop = new ShopSystem();
        this.social = new SocialFeatures();
        this.achievements = new AchievementsSystem();
        this.sounds = new SoundManager();
        this.notifications = new NotificationManager();
        
        // حالة التطبيق
        this.state = {
            currentScreen: 'home',
            user: null,
            gameActive: false,
            musicPlaying: true,
            soundsEnabled: true,
            notificationsEnabled: true,
            theme: 'golden'
        };
        
        // بيانات التطبيق
        this.data = {
            onlineUsers: 5432,
            totalPrizes: 12345678,
            dailyChallenge: null,
            liveMatches: [],
            leaderboard: []
        };
        
        console.log('✅ التطبيق جاهز للاستخدام');
    }
    
    /**
     * تحميل الموديولات الأساسية
     */
    loadCoreModules() {
        // تحميل التكوين
        if (!this.config.VERSION) {
            this.config = {
                VERSION: '2.0.0',
                APP_NAME: 'المليونير الذهبي',
                CURRENCY_SYMBOL: '$',
                MAX_QUESTIONS: 15,
                PRIZES: [100, 200, 300, 500, 1000, 2000, 5000, 10000, 16000, 32000, 64000, 128000, 256000, 500000, 1000000],
                SAFE_HAVENS: [5, 10],
                INITIAL_BALANCE: 1000,
                INITIAL_LIFELINES: 3,
                CATEGORIES: [
                    { id: 'general', name: 'عام', color: '#3498db' },
                    { id: 'history', name: 'تاريخ', color: '#e74c3c' },
                    { id: 'geography', name: 'جغرافيا', color: '#2ecc71' },
                    { id: 'science', name: 'علوم', color: '#9b59b6' },
                    { id: 'sports', name: 'رياضة', color: '#e67e22' },
                    { id: 'entertainment', name: 'ترفيه', color: '#1abc9c' }
                ],
                DIFFICULTY_LEVELS: [
                    { id: 'easy', name: 'سهل', time: 60, lifelines: 3 },
                    { id: 'medium', name: 'متوسط', time: 45, lifelines: 2 },
                    { id: 'hard', name: 'صعب', time: 30, lifelines: 1 }
                ]
            };
        }
        
        // تحميل المستخدمين من التخزين المحلي
        this.loadUserData();
        
        // تحميل الأسئلة
        this.loadQuestions();
        
        // تحميل المتجر
        this.loadShopItems();
    }
    
    /**
     * إعداد الأحداث
     */
    setupEvents() {
        // أحداث القائمة الجانبية
        document.getElementById('main-menu-toggle').addEventListener('click', () => {
            this.toggleSideMenu();
        });
        
        document.getElementById('close-menu').addEventListener('click', () => {
            this.toggleSideMenu();
        });
        
        // أحداث التنقل
        document.querySelectorAll('[data-screen]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const screen = e.currentTarget.dataset.screen;
                this.navigateTo(screen);
            });
        });
        
        // أحداث الأزرار السريعة
        document.getElementById('quick-play-btn').addEventListener('click', () => {
            this.startQuickGame();
        });
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
        
        // أحداث الموسيقى
        document.getElementById('music-toggle').addEventListener('click', () => {
            this.toggleMusic();
        });
        
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.setVolume(e.target.value);
        });
        
        // أحداث الإشعارات
        document.getElementById('user-quick-info').addEventListener('click', () => {
            this.toggleNotifications();
        });
        
        // أحداث الشاشات
        this.setupScreenEvents();
    }
    
    /**
     * إعداد أحداث الشاشات
     */
    setupScreenEvents() {
        // شاشة الرئيسية
        this.setupHomeScreen();
        
        // شاشة اللعبة
        this.setupGameScreen();
        
        // شاشة المتجر
        this.setupShopScreen();
        
        // شاشة الملف الشخصي
        this.setupProfileScreen();
        
        // شاشة التحدي اليومي
        this.setupDailyChallengeScreen();
        
        // شاشة البطولات
        this.setupTournamentsScreen();
    }
    
    /**
     * إعداد شاشة الرئيسية
     */
    setupHomeScreen() {
        // زر اللعب السريع
        document.getElementById('quick-play-btn').addEventListener('click', () => {
            this.startQuickGame();
        });
        
        // زر كيفية اللعب
        document.getElementById('learn-more-btn').addEventListener('click', () => {
            this.showTutorial();
        });
        
        // تحديث لوحة المتصدرين
        this.updateLiveLeaderboard();
    }
    
    /**
     * إعداد شاشة اللعبة
     */
    setupGameScreen() {
        // سيتم إضافة الأحداث ديناميكياً عند بدء اللعبة
    }
    
    /**
     * بدء لعبة سريعة
     */
    startQuickGame() {
        if (!this.state.user) {
            this.showLoginPrompt();
            return;
        }
        
        // تحضير إعدادات اللعبة
        const gameSettings = {
            player: this.state.user.username,
            difficulty: 'medium',
            categories: ['general'],
            totalQuestions: 10,
            timerEnabled: true,
            usePowerUps: true
        };
        
        // بدء اللعبة
        this.game.startNewGame(gameSettings);
        
        // الانتقال لشاشة اللعبة
        this.navigateTo('play');
        
        // تشغيل تأثير بدء اللعبة
        this.playSound('game_start');
    }
    
    /**
     * تبديل القائمة الجانبية
     */
    toggleSideMenu() {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.classList.toggle('active');
        
        // إضافة تأثير الضبابية للخلفية
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            overlay.remove();
        });
        
        if (sideMenu.classList.contains('active')) {
            document.body.appendChild(overlay);
        } else {
            document.querySelector('.menu-overlay')?.remove();
        }
    }
    
    /**
     * الانتقال بين الشاشات
     */
    navigateTo(screenName) {
        // إخفاء جميع الشاشات
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // إزالة النشاط من عناصر القائمة
        document.querySelectorAll('.menu-item, .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // إظهار الشاشة المطلوبة
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.state.currentScreen = screenName;
            
            // تحديث القائمة النشطة
            document.querySelectorAll(`[data-screen="${screenName}"]`).forEach(item => {
                item.classList.add('active');
            });
            
            // تحميل محتوى الشاشة
            this.loadScreenContent(screenName);
            
            // تشغيل صوت التنقل
            this.playSound('navigation');
        }
    }
    
    /**
     * تحميل محتوى الشاشة
     */
    async loadScreenContent(screenName) {
        switch (screenName) {
            case 'home':
                await this.loadHomeContent();
                break;
            case 'play':
                await this.loadGameContent();
                break;
            case 'shop':
                await this.loadShopContent();
                break;
            case 'profile':
                await this.loadProfileContent();
                break;
            case 'daily-challenge':
                await this.loadDailyChallengeContent();
                break;
            case 'tournaments':
                await this.loadTournamentsContent();
                break;
            case 'leaderboard':
                await this.loadLeaderboardContent();
                break;
            case 'achievements':
                await this.loadAchievementsContent();
                break;
            case 'friends':
                await this.loadFriendsContent();
                break;
        }
    }
    
    /**
     * تحميل محتوى الصفحة الرئيسية
     */
    async loadHomeContent() {
        // تحميل الإحصائيات الحية
        await this.updateLiveStats();
        
        // تحميل التحدي اليومي
        await this.loadDailyChallenge();
        
        // تحميل البطولات النشطة
        await this.loadActiveTournaments();
        
        // تحديث لوحة المتصدرين
        this.updateLiveLeaderboard();
    }
    
    /**
     * تحديث الإحصائيات الحية
     */
    async updateLiveStats() {
        try {
            // محاكاة بيانات حية
            this.data.onlineUsers += Math.floor(Math.random() * 100) - 50;
            this.data.totalPrizes += Math.floor(Math.random() * 10000);
            
            // تحديث العرض
            document.getElementById('online-count').textContent = 
                this.formatNumber(this.data.onlineUsers);
            document.getElementById('total-prize').textContent = 
                this.formatNumber(this.data.totalPrizes);
        } catch (error) {
            console.error('❌ خطأ في تحديث الإحصائيات:', error);
        }
    }
    
    /**
     * تحديث لوحة المتصدرين الحية
     */
    async updateLiveLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');
        if (!leaderboardList) return;
        
        // بيانات وهمية للمتصدرين
        const topPlayers = [
            { rank: 1, name: 'أحمد العبقرية', score: 985000, avatar: '👑' },
            { rank: 2, name: 'سارة الذكية', score: 876500, avatar: '🌟' },
            { rank: 3, name: 'محمد النابغة', score: 765200, avatar: '⚡' },
            { rank: 4, name: 'فاطمة المبدعة', score: 654300, avatar: '🎯' },
            { rank: 5, name: 'خالد العبقري', score: 543100, avatar: '🏆' }
        ];
        
        leaderboardList.innerHTML = topPlayers.map(player => `
            <div class="leaderboard-item">
                <div class="player-rank">${player.rank}</div>
                <div class="player-avatar">${player.avatar}</div>
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-score">${this.formatNumber(player.score)} $</div>
                </div>
                <div class="live-status">
                    <span class="live-dot"></span>
                    <span>نشط الآن</span>
                </div>
            </div>
        `).join('');
    }
    
    /**
     * تحميل التحدي اليومي
     */
    async loadDailyChallenge() {
        if (this.data.dailyChallenge) return;
        
        // إنشاء تحديات يومية متنوعة
        this.data.dailyChallenge = {
            date: new Date().toLocaleDateString('ar-EG'),
            prize: 5000,
            questions: 5,
            timeLimit: 300, // 5 دقائق
            participants: 1243,
            completed: false,
            score: 0
        };
        
        // عرض التحدي في الواجهة
        const dailyChallengeElement = document.createElement('div');
        dailyChallengeElement.className = 'daily-challenge-card';
        dailyChallengeElement.innerHTML = `
            <div class="challenge-header">
                <h3><i class="fas fa-calendar-star"></i> التحدي اليومي</h3>
                <span class="challenge-prize">${this.formatNumber(this.data.dailyChallenge.prize)} $</span>
            </div>
            <div class="challenge-info">
                <p>${this.data.dailyChallenge.questions} أسئلة | ${this.data.dailyChallenge.timeLimit / 60} دقائق</p>
                <div class="participants">
                    <i class="fas fa-users"></i>
                    <span>${this.formatNumber(this.data.dailyChallenge.participants)} مشارك</span>
                </div>
            </div>
            <button class="btn-challenge" id="start-daily-challenge">
                <i class="fas fa-play"></i>
                بدء التحدي
            </button>
        `;
        
        // إضافة التحدي للصفحة الرئيسية
        const homeScreen = document.getElementById('home-screen');
        if (homeScreen) {
            homeScreen.appendChild(dailyChallengeElement);
            
            // إضافة حدث لبدء التحدي
            document.getElementById('start-daily-challenge').addEventListener('click', () => {
                this.startDailyChallenge();
            });
        }
    }
    
    /**
     * بدء التحدي اليومي
     */
    startDailyChallenge() {
        if (!this.state.user) {
            this.showLoginPrompt();
            return;
        }
        
        // إعدادات التحدي اليومي
        const challengeSettings = {
            type: 'daily',
            prize: this.data.dailyChallenge.prize,
            questions: this.data.dailyChallenge.questions,
            timeLimit: this.data.dailyChallenge.timeLimit,
            difficulty: 'medium'
        };
        
        // بدء التحدي
        this.game.startDailyChallenge(challengeSettings);
        this.navigateTo('play');
    }
    
    /**
     * تحميل محتوى المتجر
     */
    async loadShopContent() {
        // تحميل العناصر من نظام المتجر
        const shopItems = this.shop.getAvailableItems();
        
        // إنشاء واجهة المتجر
        const shopScreen = document.getElementById('shop-screen');
        if (!shopScreen) return;
        
        shopScreen.innerHTML = `
            <div class="shop-container">
                <div class="shop-header">
                    <h1><i class="fas fa-shopping-cart"></i> متجر المليونير</h1>
                    <div class="user-balance">
                        <i class="fas fa-coins"></i>
                        <span>${this.formatNumber(this.state.user?.balance || 0)} $</span>
                    </div>
                </div>
                
                <div class="shop-categories">
                    <button class="category-btn active" data-category="all">الكل</button>
                    <button class="category-btn" data-category="powerups">مزايا مساعدة</button>
                    <button class="category-btn" data-category="avatars">الصور الشخصية</button>
                    <button class="category-btn" data-category="themes">السِمات</button>
                    <button class="category-btn" data-category="coins">العملات</button>
                </div>
                
                <div class="shop-items-grid" id="shop-items">
                    <!-- سيتم ملؤها ديناميكياً -->
                </div>
                
                <div class="shop-featured">
                    <h2><i class="fas fa-gem"></i> العروض المميزة</h2>
                    <div class="featured-items" id="featured-items">
                        <!-- العروض المميزة -->
                    </div>
                </div>
            </div>
        `;
        
        // تحميل العناصر
        await this.loadShopItems();
        
        // إضافة أحداث التصنيفات
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterShopItems(btn.dataset.category);
            });
        });
    }
    
    /**
     * تحميل عناصر المتجر
     */
    async loadShopItems() {
        const shopItemsContainer = document.getElementById('shop-items');
        if (!shopItemsContainer) return;
        
        // عناصر المتجر (بيانات وهمية)
        const shopItems = [
            { id: 1, name: 'ميزة 50:50 إضافية', price: 500, category: 'powerups', icon: 'fas fa-percentage' },
            { id: 2, name: 'اتصال بصديق متميز', price: 800, category: 'powerups', icon: 'fas fa-phone-alt' },
            { id: 3, name: 'صورة ذهبية', price: 1500, category: 'avatars', icon: 'fas fa-crown' },
            { id: 4, name: 'سمة ليلي', price: 2000, category: 'themes', icon: 'fas fa-moon' },
            { id: 5, name: 1000, price: 4.99, category: 'coins', icon: 'fas fa-coins' },
            { id: 6, name: 'حزمة المليونير', price: 19.99, category: 'bundles', icon: 'fas fa-gift' }
        ];
        
        shopItemsContainer.innerHTML = shopItems.map(item => `
            <div class="shop-item" data-category="${item.category}">
                <div class="item-icon">
                    <i class="${item.icon}"></i>
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <div class="item-price">
                        <i class="fas fa-coins"></i>
                        <span>${item.price} $</span>
                    </div>
                </div>
                <button class="btn-buy" data-id="${item.id}">
                    <i class="fas fa-shopping-cart"></i>
                    شراء
                </button>
            </div>
        `).join('');
        
        // إضافة أحداث الشراء
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.id;
                this.purchaseItem(itemId);
            });
        });
    }
    
    /**
     * شراء عنصر من المتجر
     */
    async purchaseItem(itemId) {
        if (!this.state.user) {
            this.showLoginPrompt();
            return;
        }
        
        // التحقق من الرصيد
        const item = this.getShopItemById(itemId);
        if (this.state.user.balance < item.price) {
            this.showNotification('رصيدك غير كافي لشراء هذا العنصر', 'error');
            return;
        }
        
        // عملية الشراء
        try {
            // خصم المبلغ
            this.state.user.balance -= item.price;
            this.updateUserBalance();
            
            // إضافة العنصر للمستخدم
            this.addItemToUser(item);
            
            // إظهار إشعار النجاح
            this.showNotification(`تم شراء ${item.name} بنجاح!`, 'success');
            
            // تشغيل صوت الشراء
            this.playSound('purchase');
            
            // تحديث الواجهة
            this.updateUI();
            
        } catch (error) {
            console.error('❌ خطأ في عملية الشراء:', error);
            this.showNotification('حدث خطأ أثناء عملية الشراء', 'error');
        }
    }
    
    /**
     * تحميل محتوى الملف الشخصي
     */
    async loadProfileContent() {
        const user = this.state.user;
        if (!user) return;
        
        const profileScreen = document.getElementById('profile-screen');
        if (!profileScreen) return;
        
        profileScreen.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <div class="avatar-large">
                            <i class="fas fa-user"></i>
                            <span class="level-badge">${user.level || 1}</span>
                        </div>
                        <button class="btn-change-avatar">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    
                    <div class="profile-info">
                        <h1>${user.username}</h1>
                        <p class="user-email">${user.email || 'لم يتم إضافة بريد إلكتروني'}</p>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <i class="fas fa-trophy"></i>
                                <span>${user.stats?.highestScore || 0} $</span>
                                <small>أعلى نتيجة</small>
                            </div>
                            <div class="stat">
                                <i class="fas fa-gamepad"></i>
                                <span>${user.stats?.gamesPlayed || 0}</span>
                                <small>عدد الألعاب</small>
                            </div>
                            <div class="stat">
                                <i class="fas fa-chart-line"></i>
                                <span>${user.stats?.winRate || 0}%</span>
                                <small>معدل الفوز</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="profile-sections">
                    <!-- سجلات اللعب -->
                    <div class="profile-section">
                        <h2><i class="fas fa-history"></i> سجل الألعاب الأخيرة</h2>
                        <div class="games-history" id="games-history">
                            <!-- سيتم ملؤها ديناميكياً -->
                        </div>
                    </div>
                    
                    <!-- الإنجازات -->
                    <div class="profile-section">
                        <h2><i class="fas fa-medal"></i> الإنجازات</h2>
                        <div class="achievements-grid" id="achievements-grid">
                            <!-- سيتم ملؤها ديناميكياً -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // تحميل سجل الألعاب
        await this.loadGamesHistory();
        
        // تحميل الإنجازات
        await this.loadUserAchievements();
    }
    
    /**
     * تحميل سجل الألعاب
     */
    async loadGamesHistory() {
        const gamesHistoryContainer = document.getElementById('games-history');
        if (!gamesHistoryContainer) return;
        
        // بيانات وهمية
        const gamesHistory = [
            { date: 'اليوم', score: 32000, correct: 8, total: 10 },
            { date: 'أمس', score: 64000, correct: 9, total: 10 },
            { date: 'قبل يومين', score: 16000, correct: 7, total: 10 },
            { date: '3 أيام', score: 8000, correct: 6, total: 10 }
        ];
        
        gamesHistoryContainer.innerHTML = gamesHistory.map(game => `
            <div class="game-record">
                <div class="game-date">${game.date}</div>
                <div class="game-score">${this.formatNumber(game.score)} $</div>
                <div class="game-stats">${game.correct}/${game.total} إجابة صحيحة</div>
                <div class="game-accuracy">${Math.round((game.correct / game.total) * 100)}%</div>
            </div>
        `).join('');
    }
    
    /**
     * تحميل إنجازات المستخدم
     */
    async loadUserAchievements() {
        const achievementsGrid = document.getElementById('achievements-grid');
        if (!achievementsGrid) return;
        
        // إنجازات المستخدم (بيانات وهمية)
        const userAchievements = [
            { id: 1, name: 'المبتدئ', description: 'إكمال أول لعبة', icon: 'fas fa-star', unlocked: true },
            { id: 2, name: 'الخبير', description: 'الفوز بـ 10 ألعاب', icon: 'fas fa-crown', unlocked: true },
            { id: 3, name: 'المليونير', description: 'ربح 100,000 دولار', icon: 'fas fa-gem', unlocked: false },
            { id: 4, name: 'المنتصر', description: 'الفوز بالتحدي اليومي', icon: 'fas fa-trophy', unlocked: false }
        ];
        
        achievementsGrid.innerHTML = userAchievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
                <div class="achievement-status">
                    ${achievement.unlocked ? '🔓' : '🔒'}
                </div>
            </div>
        `).join('');
    }
    
    /**
     * التحقق من جلسة المستخدم
     */
    checkUserSession() {
        const user = this.auth.getCurrentUser();
        if (user) {
            this.state.user = user;
            this.updateUI();
            this.showNotification(`مرحباً بعودتك ${user.username}!`, 'success');
        } else {
            this.showLoginScreen();
        }
    }
    
    /**
     * تحديث واجهة المستخدم
     */
    updateUI() {
        const user = this.state.user;
        
        // تحديث رأس الصفحة
        if (user) {
            document.getElementById('header-username').textContent = user.username;
            document.getElementById('header-balance').textContent = `${this.formatNumber(user.balance)} $`;
            document.getElementById('menu-username').textContent = user.username;
            document.getElementById('menu-level').textContent = user.level || 1;
            
            // إظهار زر لوحة التحكم للمسؤولين
            if (user.isAdmin) {
                document.getElementById('admin-btn').style.display = 'block';
            }
        }
        
        // تحديث حالة الموسيقى
        const musicToggle = document.getElementById('music-toggle');
        const musicStatus = document.querySelector('.music-status');
        if (musicToggle && musicStatus) {
            musicStatus.textContent = this.state.musicPlaying ? 'إيقاف' : 'تشغيل';
        }
    }
    
    /**
     * تبديل الموسيقى
     */
    toggleMusic() {
        this.state.musicPlaying = !this.state.musicPlaying;
        
        if (this.state.musicPlaying) {
            this.sounds.playBackgroundMusic();
            this.showNotification('الموسيقى مفعلة', 'info');
        } else {
            this.sounds.stopBackgroundMusic();
            this.showNotification('الموسيقى معطلة', 'info');
        }
        
        this.updateUI();
    }
    
    /**
     * ضبط مستوى الصوت
     */
    setVolume(volume) {
        this.sounds.setVolume(volume / 100);
    }
    
    /**
     * تسجيل الخروج
     */
    logout() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            this.auth.logout();
            this.state.user = null;
            this.showLoginScreen();
            this.showNotification('تم تسجيل الخروج بنجاح', 'success');
        }
    }
    
    /**
     * إظهار شاشة تسجيل الدخول
     */
    showLoginScreen() {
        this.navigateTo('auth');
        
        const authScreen = document.getElementById('auth-screen');
        authScreen.innerHTML = `
            <div class="auth-container">
                <div class="auth-header">
                    <h1><i class="fas fa-crown"></i> المليونير الذهبي</h1>
                    <p>سجل الدخول أو أنشئ حساباً للبدء</p>
                </div>
                
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">تسجيل الدخول</button>
                    <button class="auth-tab" data-tab="register">إنشاء حساب</button>
                </div>
                
                <div class="auth-content">
                    <!-- نموذج تسجيل الدخول -->
                    <form class="auth-form active" id="login-form">
                        <div class="form-group">
                            <label for="login-username"><i class="fas fa-user"></i> اسم المستخدم</label>
                            <input type="text" id="login-username" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="login-password"><i class="fas fa-lock"></i> كلمة المرور</label>
                            <input type="password" id="login-password" required>
                        </div>
                        
                        <button type="submit" class="btn-auth">
                            <i class="fas fa-sign-in-alt"></i>
                            تسجيل الدخول
                        </button>
                        
                        <div class="auth-footer">
                            <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
                        </div>
                    </form>
                    
                    <!-- نموذج التسجيل -->
                    <form class="auth-form" id="register-form">
                        <div class="form-group">
                            <label for="register-username"><i class="fas fa-user-plus"></i> اسم المستخدم</label>
                            <input type="text" id="register-username" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="register-email"><i class="fas fa-envelope"></i> البريد الإلكتروني</label>
                            <input type="email" id="register-email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="register-password"><i class="fas fa-lock"></i> كلمة المرور</label>
                            <input type="password" id="register-password" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="register-confirm"><i class="fas fa-lock"></i> تأكيد كلمة المرور</label>
                            <input type="password" id="register-confirm" required>
                        </div>
                        
                        <button type="submit" class="btn-auth">
                            <i class="fas fa-user-plus"></i>
                            إنشاء حساب
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        // إعداد أحداث المصادقة
        this.setupAuthEvents();
    }
    
    /**
     * إعداد أحداث المصادقة
     */
    setupAuthEvents() {
        // تبديل التبويبات
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.auth-tab, .auth-form').forEach(el => {
                    el.classList.remove('active');
                });
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
            });
        });
        
        // تسجيل الدخول
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            const result = await this.auth.login(username, password);
            if (result.success) {
                this.state.user = result.user;
                this.updateUI();
                this.navigateTo('home');
                this.showNotification('تم تسجيل الدخول بنجاح', 'success');
                this.playSound('login_success');
            } else {
                this.showNotification(result.message, 'error');
            }
        });
        
        // التسجيل
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            if (password !== confirmPassword) {
                this.showNotification('كلمات المرور غير متطابقة', 'error');
                return;
            }
            
            const result = await this.auth.register(username, password, email);
            if (result.success) {
                this.state.user = result.user;
                this.updateUI();
                this.navigateTo('home');
                this.showNotification('تم إنشاء الحساب بنجاح', 'success');
                this.playSound('register_success');
            } else {
                this.showNotification(result.message, 'error');
            }
        });
    }
    
    /**
     * إظهار رسالة تسجيل الدخول
     */
    showLoginPrompt() {
        this.showNotification('يجب تسجيل الدخول للوصول لهذه الميزة', 'warning');
        setTimeout(() => {
            this.showLoginScreen();
        }, 1500);
    }
    
    /**
     * تشغيل الصوت
     */
    playSound(soundName) {
        if (this.state.soundsEnabled) {
            this.sounds.play(soundName);
        }
    }
    
    /**
     * إظهار الإشعار
     */
    showNotification(message, type = 'info') {
        this.notifications.show(message, type);
    }
    
    /**
     * تبديل مركز الإشعارات
     */
    toggleNotifications() {
        const notificationCenter = document.getElementById('notification-center');
        notificationCenter.classList.toggle('active');
    }
    
    /**
     * بدء المؤثرات
     */
    startEffects() {
        // تشغيل المؤثرات البصرية
        this.startVisualEffects();
        
        // تشغيل الموسيقى الخلفية
        if (this.state.musicPlaying) {
            this.sounds.playBackgroundMusic();
        }
        
        // بدء تحديثات الوقت الحقيقي
        this.startRealTimeUpdates();
    }
    
    /**
     * بدء المؤثرات البصرية
     */
    startVisualEffects() {
        // إضافة العملات العائمة
        this.addFloatingCoins();
        
        // إضافة الجسيمات المتحركة
        this.addParticles();
        
        // إضافة التألق
        this.addShineEffects();
    }
    
    /**
     * إضافة عملات عائمة
     */
    addFloatingCoins() {
        // يتم إضافتها عبر CSS
    }
    
    /**
     * إضافة جسيمات
     */
    addParticles() {
        // تم إعدادها مسبقاً
    }
    
    /**
     * إضافة تأثيرات التألق
     */
    addShineEffects() {
        setInterval(() => {
            const elements = document.querySelectorAll('.glow-on-hover');
            elements.forEach(el => {
                if (Math.random() > 0.7) {
                    el.classList.add('glowing');
                    setTimeout(() => {
                        el.classList.remove('glowing');
                    }, 1000);
                }
            });
        }, 3000);
    }
    
    /**
     * بدء التحديثات في الوقت الحقيقي
     */
    startRealTimeUpdates() {
        // تحديث عدد المستخدمين المتصلين
        setInterval(() => {
            this.updateOnlineUsers();
        }, 30000);
        
        // تحديث البطولات النشطة
        setInterval(() => {
            this.updateActiveTournaments();
        }, 60000);
        
        // تحديث الإشعارات
        setInterval(() => {
            this.checkForNotifications();
        }, 45000);
    }
    
    /**
     * بدء التحديثات الحية
     */
    startLiveUpdates() {
        // تحديث الإحصائيات
        setInterval(() => {
            this.updateLiveStats();
        }, 10000);
        
        // تحديث المتصدرين
        setInterval(() => {
            this.updateLiveLeaderboard();
        }, 15000);
    }
    
    /**
     * تحديث عدد المستخدمين المتصلين
     */
    updateOnlineUsers() {
        const change = Math.floor(Math.random() * 200) - 100;
        this.data.onlineUsers = Math.max(1000, this.data.onlineUsers + change);
        document.getElementById('online-count').textContent = this.formatNumber(this.data.onlineUsers);
    }
    
    /**
     * تحديث البطولات النشطة
     */
    updateActiveTournaments() {
        // محاكاة تحديث البطولات
        console.log('🔄 تحديث البطولات النشطة...');
    }
    
    /**
     * التحقق من الإشعارات
     */
    checkForNotifications() {
        // محاكاة إشعارات جديدة
        const notifications = [
            { id: 1, message: 'تحدي يومي جديد متاح!', type: 'info' },
            { id: 2, message: 'خصم 30% في المتجر اليوم فقط!', type: 'warning' },
            { id: 3, message: 'صديقك أحمد يتحداك!', type: 'success' }
        ];
        
        // إضافة إشعار عشوائي
        if (Math.random() > 0.5 && notifications.length > 0) {
            const notification = notifications[Math.floor(Math.random() * notifications.length)];
            this.showNotification(notification.message, notification.type);
        }
    }
    
    /**
     * تنسيق الأرقام
     */
    formatNumber(num) {
        return new Intl.NumberFormat('ar-EG').format(num);
    }
    
    /**
     * الحصول على عنصر من المتجر
     */
    getShopItemById(itemId) {
        // محاكاة بيانات المتجر
        const shopItems = [
            { id: 1, name: 'ميزة 50:50 إضافية', price: 500, category: 'powerups' },
            { id: 2, name: 'اتصال بصديق متميز', price: 800, category: 'powerups' },
            { id: 3, name: 'صورة ذهبية', price: 1500, category: 'avatars' },
            { id: 4, name: 'سمة ليلي', price: 2000, category: 'themes' },
            { id: 5, name: '1000 عملة', price: 4.99, category: 'coins' },
            { id: 6, name: 'حزمة المليونير', price: 19.99, category: 'bundles' }
        ];
        
        return shopItems.find(item => item.id == itemId) || shopItems[0];
    }
    
    /**
     * إضافة عنصر للمستخدم
     */
    addItemToUser(item) {
        if (!this.state.user.items) {
            this.state.user.items = [];
        }
        
        this.state.user.items.push({
            ...item,
            purchasedAt: new Date().toISOString()
        });
        
        // حفظ التغييرات
        this.saveUserData();
    }
    
    /**
     * حفظ بيانات المستخدم
     */
    saveUserData() {
        if (this.state.user) {
            localStorage.setItem('millionaire_user_v2', JSON.stringify(this.state.user));
        }
    }
    
    /**
     * تحميل بيانات المستخدم
     */
    loadUserData() {
        const savedUser = localStorage.getItem('millionaire_user_v2');
        if (savedUser) {
            try {
                this.state.user = JSON.parse(savedUser);
            } catch (error) {
                console.error('❌ خطأ في تحميل بيانات المستخدم:', error);
            }
        }
    }
    
    /**
     * تحميل الأسئلة
     */
    loadQuestions() {
        // سيتم تحميل الأسئلة من QuestionManager
    }
    
    /**
     * تحديث رصيد المستخدم
     */
    updateUserBalance() {
        if (this.state.user) {
            // تحديث في نظام المصادقة
            this.auth.updateBalance(this.state.user.username, 0); // سيتم تعديلها حسب الحاجة
            
            // حفظ التغييرات
            this.saveUserData();
            
            // تحديث الواجهة
            this.updateUI();
        }
    }
    
    /**
     * إظهار التعليمات
     */
    showTutorial() {
        this.showNotification('قريباً: دليل شامل للعبة', 'info');
    }
    
    /**
     * تحميل البطولات النشطة
     */
    async loadActiveTournaments() {
        // محاكاة تحميل البطولات
        this.data.tournaments = [
            { id: 1, name: 'بطولة رمضان', prize: 50000, participants: 2345, endsIn: '3 أيام' },
            { id: 2, name: 'تحدي العباقرة', prize: 25000, participants: 1234, endsIn: 'يوم واحد' },
            { id: 3, name: 'ماراثون المليونير', prize: 100000, participants: 5000, endsIn: 'أسبوع' }
        ];
    }
    
    /**
     * تحميل محتوى البطولات
     */
    async loadTournamentsContent() {
        const tournamentsScreen = document.getElementById('tournaments-screen');
        if (!tournamentsScreen) return;
        
        tournamentsScreen.innerHTML = `
            <div class="tournaments-container">
                <h1><i class="fas fa-flag-checkered"></i> البطولات النشطة</h1>
                
                <div class="tournaments-grid" id="tournaments-grid">
                    <!-- سيتم ملؤها ديناميكياً -->
                </div>
                
                <div class="upcoming-tournaments">
                    <h2><i class="fas fa-calendar-alt"></i> البطولات القادمة</h2>
                    <div class="upcoming-list" id="upcoming-list">
                        <!-- البطولات القادمة -->
                    </div>
                </div>
            </div>
        `;
        
        // تحميل البطولات
        await this.loadTournamentsData();
    }
    
    /**
     * تحميل بيانات البطولات
     */
    async loadTournamentsData() {
        const tournamentsGrid = document.getElementById('tournaments-grid');
        if (!tournamentsGrid) return;
        
        tournamentsGrid.innerHTML = this.data.tournaments?.map(tournament => `
            <div class="tournament-card">
                <div class="tournament-header">
                    <h3>${tournament.name}</h3>
                    <span class="tournament-prize">${this.formatNumber(tournament.prize)} $</span>
                </div>
                
                <div class="tournament-info">
                    <div class="info-item">
                        <i class="fas fa-users"></i>
                        <span>${this.formatNumber(tournament.participants)} مشارك</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>ينتهي خلال ${tournament.endsIn}</span>
                    </div>
                </div>
                
                <button class="btn-join-tournament" data-id="${tournament.id}">
                    <i class="fas fa-sign-in-alt"></i>
                    انضم للبطولة
                </button>
            </div>
        `).join('') || '<p>لا توجد بطولات نشطة حالياً</p>';
        
        // إضافة أحداث الانضمام للبطولات
        document.querySelectorAll('.btn-join-tournament').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tournamentId = e.currentTarget.dataset.id;
                this.joinTournament(tournamentId);
            });
        });
    }
    
    /**
     * الانضمام للبطولة
     */
    joinTournament(tournamentId) {
        if (!this.state.user) {
            this.showLoginPrompt();
            return;
        }
        
        const tournament = this.data.tournaments?.find(t => t.id == tournamentId);
        if (tournament) {
            this.showNotification(`تم انضمامك لبطولة ${tournament.name}`, 'success');
            this.playSound('tournament_join');
        }
    }
}

// تهيئة التطبيق عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // التأكد من أن جميع العناصر تم تحميلها
    if (document.readyState === 'complete') {
        window.MillionaireApp = new MillionaireApp();
    }
});
