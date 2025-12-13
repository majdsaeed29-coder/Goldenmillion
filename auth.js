/**
 * 🔐 نظام المصادقة الخارق - المليونير الذهبي
 * نظام أمني كامل لإدارة المستخدمين والجلسات
 */

class AuthSystem {
    constructor() {
        console.log("🔐 بدء تشغيل نظام المصادقة الخارق...");
        
        // المتغيرات الأساسية
        this.currentUser = null;
        this.isAuthenticated = false;
        this.sessionToken = null;
        this.sessionExpiry = null;
        this.users = this.loadUsers();
        this.sessions = this.loadSessions();
        this.loginAttempts = {};
        this.blockedIPs = {};
        
        // إعدادات الأمان
        this.securitySettings = {
            maxLoginAttempts: 5,
            lockoutDuration: 15 * 60 * 1000, // 15 دقيقة
            sessionDuration: 24 * 60 * 60 * 1000, // 24 ساعة
            requireEmailVerification: false,
            require2FA: false,
            passwordMinLength: 6,
            enableBruteForceProtection: true
        };
        
        // التهيئة التلقائية
        this.autoLogin();
    }
    
    /**
     * 📂 تحميل قاعدة بيانات المستخدمين
     */
    loadUsers() {
        try {
            const usersData = localStorage.getItem('millionaire_users');
            if (usersData) {
                return JSON.parse(usersData);
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل المستخدمين:", error);
        }
        
        // بيانات افتراضية للمسؤول
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@millionaire.com',
                password: this.hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date().toISOString(),
                lastLogin: null,
                isVerified: true,
                isActive: true,
                profile: {
                    avatar: '👑',
                    level: 100,
                    balance: 1000000,
                    achievements: ['admin', 'developer', 'founder']
                }
            }
        ];
        
        localStorage.setItem('millionaire_users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    
    /**
     * 📂 تحميل الجلسات
     */
    loadSessions() {
        try {
            const sessionsData = localStorage.getItem('user_sessions');
            return sessionsData ? JSON.parse(sessionsData) : [];
        } catch (error) {
            console.error("❌ خطأ في تحميل الجلسات:", error);
            return [];
        }
    }
    
    /**
     * 🔄 تسجيل الدخول التلقائي
     */
    autoLogin() {
        try {
            const savedSession = localStorage.getItem('current_session');
            if (savedSession) {
                const session = JSON.parse(savedSession);
                
                // التحقق من صلاحية الجلسة
                if (this.validateSession(session.token)) {
                    this.currentUser = session.user;
                    this.isAuthenticated = true;
                    this.sessionToken = session.token;
                    this.sessionExpiry = session.expiry;
                    
                    console.log(`✅ تسجيل الدخول التلقائي: ${session.user.username}`);
                    return true;
                }
            }
        } catch (error) {
            console.error("❌ خطأ في تسجيل الدخول التلقائي:", error);
        }
        
        return false;
    }
    
    /**
     * 📝 تسجيل مستخدم جديد
     */
    async register(userData) {
        // التحقق من البيانات المدخلة
        const validation = this.validateRegistration(userData);
        if (!validation.valid) {
            return {
                success: false,
                message: validation.message
            };
        }
        
        // التحقق من وجود المستخدم
        if (this.userExists(userData.username, userData.email)) {
            return {
                success: false,
                message: 'اسم المستخدم أو البريد الإلكتروني موجود بالفعل'
            };
        }
        
        try {
            // إنشاء مستخدم جديد
            const newUser = this.createUser(userData);
            
            // إضافة للمستخدمين
            this.users.push(newUser);
            this.saveUsers();
            
            // تسجيل الدخول التلقائي
            const loginResult = await this.login(userData.username, userData.password, false);
            
            if (loginResult.success) {
                return {
                    success: true,
                    message: 'تم إنشاء الحساب بنجاح',
                    user: loginResult.user,
                    token: loginResult.token
                };
            } else {
                return {
                    success: true,
                    message: 'تم إنشاء الحساب بنجاح، يرجى تسجيل الدخول',
                    user: newUser
                };
            }
            
        } catch (error) {
            console.error("❌ خطأ في التسجيل:", error);
            return {
                success: false,
                message: 'حدث خطأ أثناء إنشاء الحساب'
            };
        }
    }
    
    /**
     * 🔍 التحقق من بيانات التسجيل
     */
    validateRegistration(userData) {
        const { username, email, password, confirmPassword } = userData;
        
        // التحقق من اسم المستخدم
        if (!username || username.length < 3) {
            return {
                valid: false,
                message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
            };
        }
        
        // التحقق من صحة اسم المستخدم
        const usernameRegex = /^[a-zA-Z0-9_آ-ی]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return {
                valid: false,
                message: 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط'
            };
        }
        
        // التحقق من البريد الإلكتروني
        if (email && !this.validateEmail(email)) {
            return {
                valid: false,
                message: 'البريد الإلكتروني غير صالح'
            };
        }
        
        // التحقق من كلمة المرور
        if (!password || password.length < this.securitySettings.passwordMinLength) {
            return {
                valid: false,
                message: `كلمة المرور يجب أن تكون ${this.securitySettings.passwordMinLength} أحرف على الأقل`
            };
        }
        
        // التحقق من تطابق كلمات المرور
        if (password !== confirmPassword) {
            return {
                valid: false,
                message: 'كلمات المرور غير متطابقة'
            };
        }
        
        // التحقق من قوة كلمة المرور
        const passwordStrength = this.checkPasswordStrength(password);
        if (passwordStrength < 2) {
            return {
                valid: false,
                message: 'كلمة المرور ضعيفة، يرجى استخدام أحرف كبيرة وصغيرة وأرقام'
            };
        }
        
        return { valid: true };
    }
    
    /**
     * 🔑 تسجيل الدخول
     */
    async login(username, password, checkAttempts = true) {
        // التحقق من الحظر
        if (checkAttempts && this.isUserBlocked(username)) {
            const timeLeft = this.getBlockTimeLeft(username);
            return {
                success: false,
                message: `تم حظر المحاولات، حاول مرة أخرى بعد ${timeLeft} دقيقة`,
                blocked: true
            };
        }
        
        // البحث عن المستخدم
        const user = this.findUser(username);
        
        if (!user) {
            this.recordLoginAttempt(username, false);
            return {
                success: false,
                message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
            };
        }
        
        // التحقق من حالة المستخدم
        if (!user.isActive) {
            return {
                success: false,
                message: 'الحساب معطل، يرجى التواصل مع الدعم'
            };
        }
        
        // التحقق من كلمة المرور
        const passwordMatch = this.verifyPassword(password, user.password);
        
        if (!passwordMatch) {
            this.recordLoginAttempt(username, false);
            return {
                success: false,
                message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
            };
        }
        
        // التحقق من التحقق بخطوتين إذا كان مفعلاً
        if (this.securitySettings.require2FA && user.twoFactorEnabled) {
            return {
                success: true,
                requires2FA: true,
                user: this.sanitizeUser(user),
                tempToken: this.generateTempToken(user)
            };
        }
        
        // تسجيل الدخول الناجح
        return this.completeLogin(user);
    }
    
    /**
     * ✅ إكمال تسجيل الدخول
     */
    completeLogin(user) {
        // إنشاء جلسة جديدة
        const session = this.createSession(user);
        
        // تحديث آخر تسجيل دخول
        this.updateLastLogin(user.id);
        
        // مسح محاولات تسجيل الدخول الفاشلة
        this.clearLoginAttempts(user.username);
        
        // تعيين المستخدم الحالي
        this.currentUser = this.sanitizeUser(user);
        this.isAuthenticated = true;
        this.sessionToken = session.token;
        this.sessionExpiry = session.expiry;
        
        console.log(`✅ تسجيل دخول ناجح: ${user.username}`);
        
        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: this.currentUser,
            token: session.token,
            session: session
        };
    }
    
    /**
     * 🔐 التحقق بخطوتين
     */
    verify2FA(userId, code) {
        // في تطبيق حقيقي، سيكون هناك إرسال واستلام الرمز
        // هنا نستخدم محاكاة
        const user = this.findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'المستخدم غير موجود'
            };
        }
        
        // محاكاة التحقق
        const isValid = code === '123456'; // في الواقع سيكون من خدمة مثل Google Authenticator
        
        if (isValid) {
            return this.completeLogin(user);
        } else {
            return {
                success: false,
                message: 'رمز التحقق غير صحيح'
            };
        }
    }
    
    /**
     * 🚪 تسجيل الخروج
     */
    logout() {
        if (!this.isAuthenticated) {
            return {
                success: false,
                message: 'لم يتم تسجيل الدخول'
            };
        }
        
        // إنهاء الجلسة
        this.endSession(this.sessionToken);
        
        // مسح بيانات الجلسة
        this.currentUser = null;
        this.isAuthenticated = false;
        this.sessionToken = null;
        this.sessionExpiry = null;
        
        // مسح الجلسة المحفوظة
        localStorage.removeItem('current_session');
        
        console.log("🚪 تم تسجيل الخروج");
        
        return {
            success: true,
            message: 'تم تسجيل الخروج بنجاح'
        };
    }
    
    /**
     * 👤 إنشاء مستخدم جديد
     */
    createUser(userData) {
        const timestamp = new Date().toISOString();
        
        return {
            id: this.generateUserId(),
            username: userData.username,
            email: userData.email || '',
            password: this.hashPassword(userData.password),
            role: 'user',
            createdAt: timestamp,
            updatedAt: timestamp,
            lastLogin: null,
            isVerified: !this.securitySettings.requireEmailVerification,
            isActive: true,
            twoFactorEnabled: false,
            profile: {
                avatar: this.generateAvatar(userData.username),
                level: 1,
                balance: 1000, // رصيد ابتدائي
                experience: 0,
                achievements: ['new_user'],
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    totalEarnings: 0,
                    highestScore: 0,
                    correctAnswers: 0,
                    totalQuestions: 0
                }
            },
            settings: {
                sound: true,
                music: true,
                vibration: true,
                notifications: true,
                theme: 'golden',
                language: 'ar'
            },
            inventory: {
                lifelines: {
                    fiftyFifty: 3,
                    askFriend: 3,
                    audience: 3
                },
                powerups: [],
                cosmetics: []
            },
            security: {
                lastPasswordChange: timestamp,
                loginHistory: [],
                devices: []
            }
        };
    }
    
    /**
     * 🆔 توليد معرف مستخدم فريد
     */
    generateUserId() {
        return Date.now() + Math.floor(Math.random() * 1000);
    }
    
    /**
     * 🎨 توليد صورة رمزية
     */
    generateAvatar(username) {
        const avatars = ['👤', '👨', '👩', '🧔', '👱', '🧑', '👨‍💼', '👩‍💼'];
        const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return avatars[hash % avatars.length];
    }
    
    /**
     * 🔐 تشفير كلمة المرور
     */
    hashPassword(password) {
        // في تطبيق حقيقي، استخدم bcrypt أو similar
        // هنا نستخدم تبسيط لأغراض التوضيح
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    /**
     * 🔓 التحقق من كلمة المرور
     */
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }
    
    /**
     * 📧 التحقق من صحة البريد الإلكتروني
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /**
     * 💪 التحقق من قوة كلمة المرور
     */
    checkPasswordStrength(password) {
        let strength = 0;
        
        // طول كلمة المرور
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // أحرف متنوعة
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        return strength;
    }
    
    /**
     * 🔍 البحث عن مستخدم
     */
    findUser(identifier) {
        return this.users.find(user => 
            user.username === identifier || 
            user.email === identifier
        );
    }
    
    /**
     * 🔍 البحث عن مستخدم بالمعرف
     */
    findUserById(userId) {
        return this.users.find(user => user.id === userId);
    }
    
    /**
     * ❓ التحقق من وجود مستخدم
     */
    userExists(username, email) {
        return this.users.some(user => 
            user.username === username || 
            (email && user.email === email)
        );
    }
    
    /**
     * 📋 إنشاء جلسة جديدة
     */
    createSession(user) {
        const token = this.generateToken();
        const expiry = Date.now() + this.securitySettings.sessionDuration;
        
        const session = {
            token: token,
            userId: user.id,
            username: user.username,
            ip: this.getClientIP(),
            userAgent: navigator.userAgent,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(expiry).toISOString(),
            lastActivity: new Date().toISOString()
        };
        
        // إضافة للجلسات
        this.sessions.push(session);
        this.saveSessions();
        
        // حفظ الجلسة الحالية
        localStorage.setItem('current_session', JSON.stringify({
            token: token,
            user: this.sanitizeUser(user),
            expiry: expiry
        }));
        
        return session;
    }
    
    /**
     * 🎫 توليد رمز جلسة
     */
    generateToken() {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * 🎫 توليد رمز مؤقت
     */
    generateTempToken(user) {
        return 'temp_' + user.id + '_' + Date.now();
    }
    
    /**
     * ✅ التحقق من صلاحية الجلسة
     */
    validateSession(token) {
        const session = this.sessions.find(s => s.token === token);
        
        if (!session) {
            return false;
        }
        
        // التحقق من انتهاء الصلاحية
        const expiryTime = new Date(session.expiresAt).getTime();
        if (Date.now() > expiryTime) {
            this.endSession(token);
            return false;
        }
        
        // تحديث آخر نشاط
        session.lastActivity = new Date().toISOString();
        this.saveSessions();
        
        return true;
    }
    
    /**
     * 🛑 إنهاء الجلسة
     */
    endSession(token) {
        this.sessions = this.sessions.filter(session => session.token !== token);
        this.saveSessions();
    }
    
    /**
     * 🌐 الحصول على IP العميل
     */
    getClientIP() {
        // في تطبيق حقيقي، سيكون من الخادم
        // هنا نعيد قيمة وهمية
        return '192.168.1.' + Math.floor(Math.random() * 255);
    }
    
    /**
     * 📝 تسجيل محاولة تسجيل دخول
     */
    recordLoginAttempt(username, success) {
        if (!this.loginAttempts[username]) {
            this.loginAttempts[username] = {
                attempts: [],
                blockedUntil: null
            };
        }
        
        const attempt = {
            username: username,
            success: success,
            timestamp: new Date().toISOString(),
            ip: this.getClientIP()
        };
        
        this.loginAttempts[username].attempts.push(attempt);
        
        // الحفاظ على آخر 10 محاولات فقط
        if (this.loginAttempts[username].attempts.length > 10) {
            this.loginAttempts[username].attempts.shift();
        }
        
        // إذا فشلت، تحقق من عدد المحاولات
        if (!success && this.securitySettings.enableBruteForceProtection) {
            const failedAttempts = this.loginAttempts[username].attempts
                .filter(a => !a.success)
                .filter(a => Date.now() - new Date(a.timestamp).getTime() < 
                    this.securitySettings.lockoutDuration);
            
            if (failedAttempts.length >= this.securitySettings.maxLoginAttempts) {
                this.blockUser(username);
            }
        }
        
        // حفظ المحاولات
        localStorage.setItem('login_attempts', JSON.stringify(this.loginAttempts));
    }
    
    /**
     * 🔒 حظر مستخدم
     */
    blockUser(username) {
        if (!this.loginAttempts[username]) {
            this.loginAttempts[username] = {
                attempts: [],
                blockedUntil: null
            };
        }
        
        this.loginAttempts[username].blockedUntil = 
            Date.now() + this.securitySettings.lockoutDuration;
        
        console.log(`🔒 حظر المستخدم ${username} لمدة 15 دقيقة`);
    }
    
    /**
     * 🔓 التحقق إذا كان المستخدم محظوراً
     */
    isUserBlocked(username) {
        const userAttempts = this.loginAttempts[username];
        
        if (!userAttempts || !userAttempts.blockedUntil) {
            return false;
        }
        
        if (Date.now() > userAttempts.blockedUntil) {
            // انتهى الحظر
            delete userAttempts.blockedUntil;
            return false;
        }
        
        return true;
    }
    
    /**
     * ⏱️ الحصول على وقت الحظر المتبقي
     */
    getBlockTimeLeft(username) {
        const userAttempts = this.loginAttempts[username];
        
        if (!userAttempts || !userAttempts.blockedUntil) {
            return 0;
        }
        
        const timeLeft = userAttempts.blockedUntil - Date.now();
        return Math.ceil(timeLeft / (60 * 1000));
    }
    
    /**
     * 🧹 مسح محاولات تسجيل الدخول
     */
    clearLoginAttempts(username) {
        if (this.loginAttempts[username]) {
            delete this.loginAttempts[username];
        }
    }
    
    /**
     * 👤 تنظيف بيانات المستخدم (إزالة الحساسة)
     */
    sanitizeUser(user) {
        if (!user) return null;
        
        const sanitized = { ...user };
        
        // إزالة البيانات الحساسة
        delete sanitized.password;
        delete sanitized.security;
        
        return sanitized;
    }
    
    /**
     * 💾 حفظ قاعدة بيانات المستخدمين
     */
    saveUsers() {
        localStorage.setItem('millionaire_users', JSON.stringify(this.users));
    }
    
    /**
     * 💾 حفظ الجلسات
     */
    saveSessions() {
        localStorage.setItem('user_sessions', JSON.stringify(this.sessions));
    }
    
    /**
     * 📅 تحديث آخر تسجيل دخول
     */
    updateLastLogin(userId) {
        const user = this.findUserById(userId);
        if (user) {
            user.lastLogin = new Date().toISOString();
            this.saveUsers();
        }
    }
    
    /**
     * 🔄 تحديث بيانات المستخدم
     */
    updateUserProfile(userId, updates) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'المستخدم غير موجود'
            };
        }
        
        // تحديث البيانات المسموح بها فقط
        const allowedFields = ['email', 'profile', 'settings'];
        const updatedFields = {};
        
        allowedFields.forEach(field => {
            if (updates[field]) {
                if (field === 'profile' || field === 'settings') {
                    // دمج الكائنات بدلاً من الاستبدال
                    user[field] = { ...user[field], ...updates[field] };
                } else {
                    user[field] = updates[field];
                }
                updatedFields[field] = true;
            }
        });
        
        user.updatedAt = new Date().toISOString();
        this.saveUsers();
        
        // تحديث المستخدم الحالي إذا كان هو نفسه
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = this.sanitizeUser(user);
        }
        
        return {
            success: true,
            message: 'تم تحديث البيانات بنجاح',
            updatedFields: Object.keys(updatedFields)
        };
    }
    
    /**
     * 🔑 تغيير كلمة المرور
     */
    changePassword(userId, currentPassword, newPassword) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return {
                success: false,
                message: 'المستخدم غير موجود'
            };
        }
        
        // التحقق من كلمة المرور الحالية
        if (!this.verifyPassword(currentPassword, user.password)) {
            return {
                success: false,
                message: 'كلمة المرور الحالية غير صحيحة'
            };
        }
        
        // التحقق من قوة كلمة المرور الجديدة
        const strength = this.checkPasswordStrength(newPassword);
        if (strength < 3) {
            return {
                success: false,
                message: 'كلمة المرور الجديدة ضعيفة جداً'
            };
        }
        
        // تغيير كلمة المرور
        user.password = this.hashPassword(newPassword);
        user.security.lastPasswordChange = new Date().toISOString();
        user.updatedAt = new Date().toISOString();
        
        this.saveUsers();
        
        return {
            success: true,
            message: 'تم تغيير كلمة المرور بنجاح'
        };
    }
    
    /**
     * 📧 طلب إعادة تعيين كلمة المرور
     */
    requestPasswordReset(email) {
        const user = this.findUser(email);
        
        if (!user) {
            // لأغراض الأمان، نعيد نفس الرسالة سواء كان المستخدم موجود أم لا
            return {
                success: true,
                message: 'إذا كان البريد الإلكتروني مسجلاً، ستتلقى رابط إعادة التعيين'
            };
        }
        
        // توليد رمز إعادة التعيين
        const resetToken = this.generateResetToken(user.id);
        
        // حفظ الرمز
        this.saveResetToken(user.id, resetToken);
        
        // في تطبيق حقيقي، إرسال البريد الإلكتروني هنا
        console.log(`📧 إرسال رابط إعادة التعيين إلى: ${email}`);
        console.log(`🔑 رمز إعادة التعيين: ${resetToken}`);
        
        return {
            success: true,
            message: 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني',
            // لأغراض التطوير فقط، نعيد الرمز
            resetToken: resetToken
        };
    }
    
    /**
     * 🔄 توليد رمز إعادة التعيين
     */
    generateResetToken(userId) {
        return 'reset_' + userId + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * 💾 حفظ رمز إعادة التعيين
     */
    saveResetToken(userId, token) {
        const resetTokens = JSON.parse(localStorage.getItem('reset_tokens') || '{}');
        resetTokens[token] = {
            userId: userId,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 3600000).toISOString() // ساعة واحدة
        };
        localStorage.setItem('reset_tokens', JSON.stringify(resetTokens));
    }
    
    /**
     * 🔍 التحقق من رمز إعادة التعيين
     */
    verifyResetToken(token) {
        const resetTokens = JSON.parse(localStorage.getItem('reset_tokens') || '{}');
        const tokenData = resetTokens[token];
        
        if (!tokenData) {
            return { valid: false, message: 'الرابط غير صالح أو منتهي' };
        }
        
        const expiryTime = new Date(tokenData.expiresAt).getTime();
        if (Date.now() > expiryTime) {
            delete resetTokens[token];
            localStorage.setItem('reset_tokens', JSON.stringify(resetTokens));
            return { valid: false, message: 'الرابط منتهي الصلاحية' };
        }
        
        return {
            valid: true,
            userId: tokenData.userId
        };
    }
    
    /**
     * 🔑 إعادة تعيين كلمة المرور
     */
    resetPassword(token, newPassword) {
        const tokenVerification = this.verifyResetToken(token);
        
        if (!tokenVerification.valid) {
            return tokenVerification;
        }
        
        const user = this.findUserById(tokenVerification.userId);
        
        if (!user) {
            return {
                success: false,
                message: 'المستخدم غير موجود'
            };
        }
        
        // التحقق من قوة كلمة المرور
        const strength = this.checkPasswordStrength(newPassword);
        if (strength < 3) {
            return {
                success: false,
                message: 'كلمة المرور الجديدة ضعيفة جداً'
            };
        }
        
        // تغيير كلمة المرور
        user.password = this.hashPassword(newPassword);
        user.security.lastPasswordChange = new Date().toISOString();
        user.updatedAt = new Date().toISOString();
        
        this.saveUsers();
        
        // حذف الرمز المستخدم
        const resetTokens = JSON.parse(localStorage.getItem('reset_tokens') || '{}');
        delete resetTokens[token];
        localStorage.setItem('reset_tokens', JSON.stringify(resetTokens));
        
        return {
            success: true,
            message: 'تم إعادة تعيين كلمة المرور بنجاح'
        };
    }
    
    /**
     * 👥 الحصول على جميع المستخدمين (للمسؤول)
     */
    getAllUsers(adminId) {
        const admin = this.findUserById(adminId);
        
        if (!admin || admin.role !== 'admin') {
            return {
                success: false,
                message: 'غير مصرح بالوصول'
            };
        }
        
        return {
            success: true,
            users: this.users.map(user => this.sanitizeUser(user)),
            total: this.users.length,
            active: this.users.filter(u => u.isActive).length
        };
    }
    
    /**
     * ⚙️ تحديث إعدادات المستخدم
     */
    updateUserSettings(userId, settings) {
        return this.updateUserProfile(userId, { settings: settings });
    }
    
    /**
     * 🏆 تحديث إحصائيات اللعبة
     */
    updateGameStats(userId, gameResult) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return false;
        }
        
        const stats = user.profile.stats;
        
        stats.gamesPlayed++;
        if (gameResult.win) stats.gamesWon++;
        stats.totalEarnings += gameResult.finalScore || 0;
        
        if (gameResult.finalScore > stats.highestScore) {
            stats.highestScore = gameResult.finalScore;
        }
        
        stats.correctAnswers += gameResult.correctAnswers || 0;
        stats.totalQuestions += gameResult.totalQuestions || 0;
        
        // تحديث مستوى الخبرة
        const experienceGained = Math.floor((gameResult.finalScore || 0) / 100);
        user.profile.experience += experienceGained;
        
        // تحديث المستوى
        const newLevel = Math.floor(user.profile.experience / 1000) + 1;
        if (newLevel > user.profile.level) {
            user.profile.level = newLevel;
            // إضافة إنجاز مستوى جديد
            user.profile.achievements.push(`level_${newLevel}`);
        }
        
        // تحديث الرصيد
        user.profile.balance += gameResult.finalScore || 0;
        
        user.updatedAt = new Date().toISOString();
        this.saveUsers();
        
        // تحديث المستخدم الحالي إذا كان هو نفسه
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = this.sanitizeUser(user);
        }
        
        return true;
    }
    
    /**
     * 💰 تحديث رصيد المستخدم
     */
    updateBalance(userId, amount, reason = 'game') {
        const user = this.findUserById(userId);
        
        if (!user) {
            return false;
        }
        
        user.profile.balance += amount;
        
        if (amount > 0) {
            user.profile.stats.totalEarnings += amount;
        }
        
        user.updatedAt = new Date().toISOString();
        this.saveUsers();
        
        // تحديث المستخدم الحالي إذا كان هو نفسه
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = this.sanitizeUser(user);
        }
        
        return true;
    }
    
    /**
     * 🎮 الحصول على إحصائيات اللاعب
     */
    getPlayerStats(userId) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return null;
        }
        
        const stats = user.profile.stats;
        const winRate = stats.gamesPlayed > 0 ? 
            (stats.gamesWon / stats.gamesPlayed * 100).toFixed(1) : 0;
        
        const accuracy = stats.totalQuestions > 0 ?
            (stats.correctAnswers / stats.totalQuestions * 100).toFixed(1) : 0;
        
        return {
            gamesPlayed: stats.gamesPlayed,
            gamesWon: stats.gamesWon,
            winRate: winRate,
            totalEarnings: stats.totalEarnings,
            highestScore: stats.highestScore,
            correctAnswers: stats.correctAnswers,
            accuracy: accuracy,
            level: user.profile.level,
            experience: user.profile.experience,
            balance: user.profile.balance,
            achievements: user.profile.achievements.length
        };
    }
    
    /**
     * 📊 الحصول على إحصائيات النظام
     */
    getSystemStats() {
        const totalUsers = this.users.length;
        const activeUsers = this.users.filter(u => u.isActive).length;
        const onlineUsers = this.sessions.length;
        const newUsersToday = this.users.filter(u => {
            const created = new Date(u.createdAt);
            const today = new Date();
            return created.toDateString() === today.toDateString();
        }).length;
        
        const totalEarnings = this.users.reduce((sum, user) => 
            sum + user.profile.stats.totalEarnings, 0);
        
        return {
            totalUsers,
            activeUsers,
            onlineUsers,
            newUsersToday,
            totalEarnings,
            averageBalance: totalUsers > 0 ? 
                this.users.reduce((sum, user) => sum + user.profile.balance, 0) / totalUsers : 0
        };
    }
    
    /**
     * 🔔 إرسال إشعار للمستخدم
     */
    sendNotification(userId, notification) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return false;
        }
        
        // في تطبيق حقيقي، ستكون هناك قاعدة بيانات للإشعارات
        const notifications = JSON.parse(localStorage.getItem('user_notifications') || '{}');
        
        if (!notifications[userId]) {
            notifications[userId] = [];
        }
        
        notifications[userId].push({
            ...notification,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false
        });
        
        // الحفاظ على آخر 50 إشعار فقط
        if (notifications[userId].length > 50) {
            notifications[userId].shift();
        }
        
        localStorage.setItem('user_notifications', JSON.stringify(notifications));
        
        return true;
    }
    
    /**
     * 🔔 الحصول على إشعارات المستخدم
     */
    getUserNotifications(userId) {
        const notifications = JSON.parse(localStorage.getItem('user_notifications') || '{}');
        return notifications[userId] || [];
    }
    
    /**
     * 🔔 وضع علامة كمقروء
     */
    markNotificationAsRead(userId, notificationId) {
        const notifications = JSON.parse(localStorage.getItem('user_notifications') || '{}');
        
        if (notifications[userId]) {
            const notification = notifications[userId].find(n => n.id === notificationId);
            if (notification) {
                notification.read = true;
                localStorage.setItem('user_notifications', JSON.stringify(notifications));
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 🧹 تنظيف البيانات القديمة
     */
    cleanupOldData() {
        const now = Date.now();
        
        // تنظيف الجلسات المنتهية
        this.sessions = this.sessions.filter(session => {
            const expiryTime = new Date(session.expiresAt).getTime();
            return expiryTime > now;
        });
        this.saveSessions();
        
        // تنظيف رموز إعادة التعيين المنتهية
        const resetTokens = JSON.parse(localStorage.getItem('reset_tokens') || '{}');
        Object.keys(resetTokens).forEach(token => {
            const expiryTime = new Date(resetTokens[token].expiresAt).getTime();
            if (expiryTime <= now) {
                delete resetTokens[token];
            }
        });
        localStorage.setItem('reset_tokens', JSON.stringify(resetTokens));
        
        console.log("🧹 تنظيف البيانات القديمة");
    }
    
    /**
     * 🎯 التحقق من الصلاحيات
     */
    hasPermission(userId, permission) {
        const user = this.findUserById(userId);
        
        if (!user) {
            return false;
        }
        
        const permissions = {
            'admin': ['manage_users', 'manage_questions', 'view_stats', 'all'],
            'user': ['play_game', 'view_profile', 'edit_settings', 'view_leaderboard']
        };
        
        return permissions[user.role]?.includes(permission) || false;
    }
}

// تصدير النظام إذا كان في بيئة Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}

// للاستخدام في المتصفح
if (typeof window !== 'undefined') {
    window.AuthSystem = AuthSystem;
}

// Example usage:
/*
const auth = new AuthSystem();
auth.register({
    username: 'test',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
}).then(result => {
    console.log(result);
});
*/
