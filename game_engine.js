/**
 * 🎮 محرك اللعبة الخارق - المليونير الذهبي
 * النظام الكامل لإدارة اللعبة من البداية للنهاية
 */

class GameEngine {
    constructor() {
        console.log("🚀 بدء تشغيل محرك اللعبة الخارق...");
        
        // المتغيرات الأساسية
        this.currentQuestion = null;
        this.currentLevel = 0;
        this.score = 0;
        this.totalPrize = 0;
        this.isGameActive = false;
        this.timer = null;
        this.timeLeft = 30;
        this.selectedAnswer = null;
        this.correctAnswers = 0;
        this.totalQuestions = 15;
        
        // وسائل المساعدة
        this.lifelines = {
            fiftyFifty: { available: true, used: false },
            askFriend: { available: true, used: false },
            audience: { available: true, used: false },
            extraLife: { available: false, used: false }
        };
        
        // هيكل الجوائز
        this.prizeStructure = [
            100, 200, 300, 500, 1000,          // المستويات 1-5
            2000, 5000, 10000, 16000, 32000,   // المستويات 6-10
            64000, 128000, 250000, 500000, 1000000  // المستويات 11-15
        ];
        
        // المستويات الآمنة (كل 5 أسئلة)
        this.safeHavens = [5, 10, 15];
        
        // إعدادات اللعبة
        this.settings = {
            category: 'general',
            difficulty: 'medium',
            withTimer: true,
            soundEffects: true,
            vibration: true
        };
        
        // قاعدة بيانات الأسئلة
        this.questionsDatabase = [];
        this.loadQuestions();
    }
    
    /**
     * 🔄 تحميل الأسئلة من قاعدة البيانات
     */
    loadQuestions() {
        // هذا مثال، في الواقع سيتم جلبها من قاعدة بيانات حقيقية
        this.questionsDatabase = [
            // الثقافة العامة
            {
                id: 1,
                question: "ما هي عاصمة فرنسا؟",
                options: ["لندن", "برلين", "باريس", "مدريد"],
                correctAnswer: 2,
                category: "general",
                difficulty: 1,
                explanation: "باريس هي عاصمة فرنسا وأكبر مدنها"
            },
            {
                id: 2,
                question: "كم عدد كواكب المجموعة الشمسية؟",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1,
                category: "general",
                difficulty: 1,
                explanation: "يوجد 8 كواكب في المجموعة الشمسية"
            },
            {
                id: 3,
                question: "من هو مؤلف مسرحية 'هملت'؟",
                options: ["شكسبير", "تشيخوف", "إبسن", "برنارد شو"],
                correctAnswer: 0,
                category: "general",
                difficulty: 2,
                explanation: "وليم شكسبير هو مؤلف مسرحية هملت"
            },
            {
                id: 4,
                question: "ما هو أكبر محيط في العالم؟",
                options: ["المحيط الهادئ", "المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي"],
                correctAnswer: 0,
                category: "general",
                difficulty: 1,
                explanation: "المحيط الهادئ هو أكبر محيط في العالم"
            },
            {
                id: 5,
                question: "في أي عام هبط الإنسان على القمر لأول مرة؟",
                options: ["1965", "1969", "1972", "1975"],
                correctAnswer: 1,
                category: "general",
                difficulty: 2,
                explanation: "هبط الإنسان على القمر لأول مرة في عام 1969"
            },
            // العلوم
            {
                id: 6,
                question: "ما هو العنصر الكيميائي الذي رمزه 'O'؟",
                options: ["ذهب", "أوكسجين", "فضة", "حديد"],
                correctAnswer: 1,
                category: "science",
                difficulty: 1,
                explanation: "الأكسجين هو العنصر الكيميائي الذي رمزه O"
            },
            {
                id: 7,
                question: "كم عدد العظام في جسم الإنسان البالغ؟",
                options: ["206", "210", "215", "220"],
                correctAnswer: 0,
                category: "science",
                difficulty: 2,
                explanation: "يحتوي جسم الإنسان البالغ على 206 عظمة"
            },
            // التاريخ
            {
                id: 8,
                question: "متى انتهت الحرب العالمية الثانية؟",
                options: ["1943", "1944", "1945", "1946"],
                correctAnswer: 2,
                category: "history",
                difficulty: 2,
                explanation: "انتهت الحرب العالمية الثانية في عام 1945"
            },
            {
                id: 9,
                question: "من هو أول رئيس للولايات المتحدة الأمريكية؟",
                options: ["توماس جفرسون", "جورج واشنطن", "أبراهام لينكولن", "جون آدامز"],
                correctAnswer: 1,
                category: "history",
                difficulty: 1,
                explanation: "جورج واشنطن هو أول رئيس للولايات المتحدة"
            },
            // الجغرافيا
            {
                id: 10,
                question: "ما هو أطول نهر في العالم؟",
                options: ["نهر النيل", "نهر الأمازون", "نهر المسيسيبي", "نهر اليانغتسي"],
                correctAnswer: 0,
                category: "geography",
                difficulty: 2,
                explanation: "نهر النيل هو أطول نهر في العالم"
            },
            {
                id: 11,
                question: "ما هي أكبر دولة في العالم من حيث المساحة؟",
                options: ["كندا", "الولايات المتحدة", "روسيا", "الصين"],
                correctAnswer: 2,
                category: "geography",
                difficulty: 1,
                explanation: "روسيا هي أكبر دولة في العالم من حيث المساحة"
            },
            // الرياضة
            {
                id: 12,
                question: "في أي رياضة يستخدم مصطلح 'تريبلك'؟",
                options: ["كرة القدم", "كرة السلة", "التنس", "الجولف"],
                correctAnswer: 1,
                category: "sports",
                difficulty: 1,
                explanation: "تريبلك هو مصطلح يستخدم في كرة السلة"
            },
            {
                id: 13,
                question: "كم عدد اللاعبين في فريق كرة القدم؟",
                options: ["10", "11", "12", "13"],
                correctAnswer: 1,
                category: "sports",
                difficulty: 1,
                explanation: "فريق كرة القدم يتكون من 11 لاعباً"
            },
            // الترفيه
            {
                id: 14,
                question: "من هو مخرج فيلم 'تايتنك'؟",
                options: ["ستيفن سبيلبرغ", "جيمس كاميرون", "كريستوفر نولان", "بيتر جاكسون"],
                correctAnswer: 1,
                category: "entertainment",
                difficulty: 2,
                explanation: "جيمس كاميرون هو مخرج فيلم تايتنك"
            },
            {
                id: 15,
                question: "ما هي أول لعبة فيديو في العالم؟",
                options: ["بونج", "سوبر ماريو", "تنس للاثنين", "باك مان"],
                correctAnswer: 2,
                category: "entertainment",
                difficulty: 3,
                explanation: "تنس للاثنين هي أول لعبة فيديو في العالم"
            }
        ];
    }
    
    /**
     * 🎯 بدء لعبة جديدة
     */
    startNewGame(settings = {}) {
        console.log("🎮 بدء لعبة جديدة...");
        
        // تحديث الإعدادات
        this.settings = { ...this.settings, ...settings };
        
        // إعادة تعيين المتغيرات
        this.currentLevel = 0;
        this.score = 0;
        this.totalPrize = 0;
        this.isGameActive = true;
        this.correctAnswers = 0;
        this.selectedAnswer = null;
        
        // إعادة تعيين وسائل المساعدة
        Object.keys(this.lifelines).forEach(key => {
            this.lifelines[key].used = false;
        });
        
        // تحميل أسئلة الفئة المختارة
        this.filterQuestionsByCategory();
        
        // بدء أول سؤال
        const firstQuestion = this.nextQuestion();
        
        // بدء المؤقت إذا كان مفعلاً
        if (this.settings.withTimer) {
            this.startTimer();
        }
        
        return {
            success: true,
            question: firstQuestion,
            level: this.currentLevel,
            prize: this.getCurrentPrize(),
            gameState: this.getGameState()
        };
    }
    
    /**
     * 🔍 تصفية الأسئلة حسب الفئة
     */
    filterQuestionsByCategory() {
        if (this.settings.category === 'all') {
            this.filteredQuestions = [...this.questionsDatabase];
        } else {
            this.filteredQuestions = this.questionsDatabase.filter(
                q => q.category === this.settings.category
            );
        }
        
        // خلط الأسئلة عشوائياً
        this.shuffleQuestions();
        
        // تحديد صعوبة الأسئلة
        this.adjustDifficulty();
        
        console.log(`تم تحميل ${this.filteredQuestions.length} سؤال من فئة ${this.settings.category}`);
    }
    
    /**
     * 🎲 خلط الأسئلة عشوائياً
     */
    shuffleQuestions() {
        for (let i = this.filteredQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.filteredQuestions[i], this.filteredQuestions[j]] = 
            [this.filteredQuestions[j], this.filteredQuestions[i]];
        }
    }
    
    /**
     * 📊 تعديل الصعوبة بناءً على المستوى
     */
    adjustDifficulty() {
        const difficultyLevel = this.getDifficultyLevel();
        
        // ترتيب الأسئلة حسب الصعوبة
        this.filteredQuestions.sort((a, b) => {
            const diffA = Math.abs(a.difficulty - difficultyLevel);
            const diffB = Math.abs(b.difficulty - difficultyLevel);
            return diffA - diffB;
        });
        
        // أخذ أول 15 سؤال فقط
        this.filteredQuestions = this.filteredQuestions.slice(0, 15);
    }
    
    /**
     * 📈 الحصول على مستوى الصعوبة الحالي
     */
    getDifficultyLevel() {
        if (this.currentLevel <= 5) return 1; // سهلة
        if (this.currentLevel <= 10) return 2; // متوسطة
        return 3; // صعبة
    }
    
    /**
     * ➡️ الانتقال للسؤال التالي
     */
    nextQuestion() {
        if (!this.isGameActive) {
            console.error("اللعبة غير نشطة");
            return null;
        }
        
        // التحقق إذا وصل للنهائي
        if (this.currentLevel >= this.totalQuestions) {
            this.endGame(true);
            return null;
        }
        
        // زيادة المستوى
        this.currentLevel++;
        
        // الحصول على السؤال التالي
        const questionIndex = this.currentLevel - 1;
        
        if (questionIndex < this.filteredQuestions.length) {
            this.currentQuestion = this.filteredQuestions[questionIndex];
            
            // إعادة تعيين الإجابة المختارة
            this.selectedAnswer = null;
            
            // إعادة تعيين المؤقت
            if (this.settings.withTimer) {
                this.resetTimer();
            }
            
            console.log(`السؤال ${this.currentLevel}: ${this.currentQuestion.question}`);
            
            return {
                question: this.currentQuestion,
                level: this.currentLevel,
                prize: this.getCurrentPrize(),
                isSafeHaven: this.isSafeHaven(),
                totalQuestions: this.totalQuestions
            };
        } else {
            console.error("لا توجد أسئلة كافية");
            this.endGame(false);
            return null;
        }
    }
    
    /**
     * ⏱️ بدء المؤقت
     */
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timeLeft = 30;
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 10) {
                // تنبيه الوقت المنخفض
                this.emit('timerWarning', this.timeLeft);
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timeOut();
            }
        }, 1000);
    }
    
    /**
     * 🔄 إعادة تعيين المؤقت
     */
    resetTimer() {
        if (this.settings.withTimer) {
            this.timeLeft = 30;
        }
    }
    
    /**
     * ⏰ انتهاء الوقت
     */
    timeOut() {
        console.log("⏰ انتهى الوقت!");
        
        if (this.isGameActive) {
            // خسارة اللعبة
            this.endGame(false, 'timeout');
        }
    }
    
    /**
     * ✅ اختيار إجابة
     */
    selectAnswer(answerIndex) {
        if (!this.isGameActive || this.selectedAnswer !== null) {
            return { error: "لا يمكن اختيار إجابة الآن" };
        }
        
        this.selectedAnswer = answerIndex;
        
        return {
            success: true,
            selected: answerIndex,
            canConfirm: true
        };
    }
    
    /**
     * 🔍 تأكيد الإجابة
     */
    confirmAnswer() {
        if (!this.isGameActive || this.selectedAnswer === null) {
            return { error: "لم يتم اختيار إجابة" };
        }
        
        // إيقاف المؤقت
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        const isCorrect = (this.selectedAnswer === this.currentQuestion.correctAnswer);
        const result = {
            isCorrect: isCorrect,
            selectedAnswer: this.selectedAnswer,
            correctAnswer: this.currentQuestion.correctAnswer,
            explanation: this.currentQuestion.explanation,
            prize: this.getCurrentPrize()
        };
        
        if (isCorrect) {
            // إجابة صحيحة
            this.handleCorrectAnswer(result);
        } else {
            // إجابة خاطئة
            this.handleWrongAnswer(result);
        }
        
        return result;
    }
    
    /**
     * 🎉 معالجة الإجابة الصحيحة
     */
    handleCorrectAnswer(result) {
        console.log("✅ إجابة صحيحة!");
        
        // زيادة النقاط
        this.score = this.getCurrentPrize();
        this.totalPrize = this.score;
        this.correctAnswers++;
        
        // زيادة الجائزة
        this.increasePrize();
        
        // التحقق إذا كان مستوى آمن
        const isSafe = this.isSafeHaven();
        
        // إذا كان المستوى 15، فاز بالمليون
        if (this.currentLevel === 15) {
            this.endGame(true);
        }
        
        result.nextAction = 'nextQuestion';
        result.isSafe = isSafe;
        result.newPrize = this.getCurrentPrize();
    }
    
    /**
     * ❌ معالجة الإجابة الخاطئة
     */
    handleWrongAnswer(result) {
        console.log("❌ إجابة خاطئة!");
        
        // التحقق إذا كان مستوى آمن
        const lastSafeHaven = this.getLastSafeHaven();
        
        if (lastSafeHaven > 0) {
            // العودة لأخر مستوى آمن
            this.score = this.prizeStructure[lastSafeHaven - 1];
            this.totalPrize = this.score;
            
            result.saved = true;
            result.safeHavenLevel = lastSafeHaven;
            result.savedPrize = this.score;
        } else {
            // خسارة كل شيء
            this.score = 0;
            this.totalPrize = 0;
            
            result.saved = false;
        }
        
        this.endGame(false, 'wrongAnswer');
    }
    
    /**
     * 💰 زيادة الجائزة
     */
    increasePrize() {
        // الجوائز تزداد حسب المستوى
        if (this.currentLevel < this.totalQuestions) {
            // الحصول على الجائزة التالية
            const nextPrize = this.prizeStructure[this.currentLevel];
            return nextPrize;
        }
        return this.getCurrentPrize();
    }
    
    /**
     * 💵 الحصول على الجائزة الحالية
     */
    getCurrentPrize() {
        if (this.currentLevel === 0) return 0;
        return this.prizeStructure[this.currentLevel - 1];
    }
    
    /**
     * 🛡️ التحقق إذا كان مستوى آمن
     */
    isSafeHaven() {
        return this.safeHavens.includes(this.currentLevel);
    }
    
    /**
     * 🛡️ الحصول على أخر مستوى آمن
     */
    getLastSafeHaven() {
        const passedSafeHavens = this.safeHavens.filter(level => level < this.currentLevel);
        return passedSafeHavens.length > 0 ? Math.max(...passedSafeHavens) : 0;
    }
    
    /**
     * 🆘 استخدام وسيلة مساعدة 50:50
     */
    useFiftyFifty() {
        if (!this.isGameActive || !this.lifelines.fiftyFifty.available || this.lifelines.fiftyFifty.used) {
            return { error: "وسيلة المساعدة غير متاحة" };
        }
        
        const wrongAnswers = [0, 1, 2, 3]
            .filter(index => index !== this.currentQuestion.correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
        
        this.lifelines.fiftyFifty.used = true;
        
        return {
            success: true,
            wrongAnswers: wrongAnswers,
            remainingAnswers: [
                this.currentQuestion.correctAnswer,
                ...wrongAnswers.slice(0, 1)
            ].sort((a, b) => a - b),
            lifeline: 'fiftyFifty'
        };
    }
    
    /**
     * 📞 استخدام وسيلة مساعدة استشارة صديق
     */
    useAskFriend() {
        if (!this.isGameActive || !this.lifelines.askFriend.available || this.lifelines.askFriend.used) {
            return { error: "وسيلة المساعدة غير متاحة" };
        }
        
        const correctAnswer = this.currentQuestion.correctAnswer;
        
        // 85% احتمالية أن يكون الصديق محقاً
        const friendIsRight = Math.random() < 0.85;
        
        let suggestedAnswer;
        if (friendIsRight) {
            suggestedAnswer = correctAnswer;
        } else {
            // اختيار إجابة خاطئة عشوائياً
            const wrongAnswers = [0, 1, 2, 3].filter(index => index !== correctAnswer);
            suggestedAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
        }
        
        // مستوى الثقة
        const confidenceLevels = [
            "لست متأكداً تماماً",
            "أعتقد أن هذه هي الإجابة",
            "متأكد إلى حد ما",
            "متأكد جداً"
        ];
        
        const confidenceIndex = friendIsRight ? 
            Math.floor(Math.random() * 2) + 2 : // 2-3 للصواب
            Math.floor(Math.random() * 2);      // 0-1 للخطأ
        
        this.lifelines.askFriend.used = true;
        
        return {
            success: true,
            suggestedAnswer: suggestedAnswer,
            confidence: confidenceLevels[confidenceIndex],
            friendIsRight: friendIsRight,
            correctAnswer: correctAnswer,
            lifeline: 'askFriend'
        };
    }
    
    /**
     * 👥 استخدام وسيلة مساعدة رأي الجمهور
     */
    useAudience() {
        if (!this.isGameActive || !this.lifelines.audience.available || this.lifelines.audience.used) {
            return { error: "وسيلة المساعدة غير متاحة" };
        }
        
        const correctAnswer = this.currentQuestion.correctAnswer;
        const votes = [0, 0, 0, 0];
        
        // إعطاء نسبة أعلى للإجابة الصحيحة (60-90%)
        const correctVote = Math.floor(Math.random() * 30) + 60;
        votes[correctAnswer] = correctVote;
        
        // توزيع الباقي عشوائياً على الإجابات الخاطئة
        let remaining = 100 - correctVote;
        const wrongAnswers = [0, 1, 2, 3].filter(index => index !== correctAnswer);
        
        for (let i = 0; i < wrongAnswers.length - 1; i++) {
            const share = Math.floor(Math.random() * remaining * 0.7);
            votes[wrongAnswers[i]] = share;
            remaining -= share;
        }
        
        // الباقي للإجابة الخاطئة الأخيرة
        votes[wrongAnswers[wrongAnswers.length - 1]] = remaining;
        
        // خلط النسب قليلاً لجعلها أكثر واقعية
        for (let i = 0; i < 4; i++) {
            const change = Math.floor(Math.random() * 5) - 2;
            votes[i] = Math.max(0, Math.min(100, votes[i] + change));
        }
        
        // تطبيع النسب لتكون 100%
        const total = votes.reduce((a, b) => a + b, 0);
        const adjustment = 100 - total;
        if (adjustment !== 0) {
            votes[correctAnswer] += adjustment;
        }
        
        this.lifelines.audience.used = true;
        
        return {
            success: true,
            votes: votes,
            mostVoted: votes.indexOf(Math.max(...votes)),
            correctAnswer: correctAnswer,
            totalVotes: 100,
            lifeline: 'audience'
        };
    }
    
    /**
     * ⏭️ تخطي السؤال
     */
    skipQuestion() {
        if (!this.isGameActive) {
            return { error: "اللعبة غير نشطة" };
        }
        
        // الانتقال للسؤال التالي
        const nextQuestion = this.nextQuestion();
        
        return {
            success: true,
            skipped: true,
            nextQuestion: nextQuestion
        };
    }
    
    /**
     * 🏃 الانسحاب من اللعبة
     */
    withdraw() {
        if (!this.isGameActive) {
            return { error: "اللعبة غير نشطة" };
        }
        
        const currentPrize = this.getCurrentPrize();
        const lastSafeHaven = this.getLastSafeHaven();
        
        // الحصول على الجائزة حسب أخر مستوى آمن
        let finalPrize;
        if (lastSafeHaven > 0) {
            finalPrize = this.prizeStructure[lastSafeHaven - 1];
        } else {
            finalPrize = 0;
        }
        
        // إنهاء اللعبة
        this.endGame(false, 'withdraw');
        
        return {
            success: true,
            withdrawn: true,
            prize: finalPrize,
            levelReached: this.currentLevel,
            safeHaven: lastSafeHaven,
            message: finalPrize > 0 ? 
                `لقد انسحبت برصيد ${finalPrize}$!` :
                "لقد انسحبت بدون رصيد!"
        };
    }
    
    /**
     * 🏁 إنهاء اللعبة
     */
    endGame(win = false, reason = 'normal') {
        console.log(`🏁 إنهاء اللعبة - ${win ? 'فوز' : 'خسارة'} - السبب: ${reason}`);
        
        this.isGameActive = false;
        
        // إيقاف المؤقت
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // حساب الجائزة النهائية
        let finalPrize = this.totalPrize;
        if (!win && reason !== 'withdraw') {
            const lastSafeHaven = this.getLastSafeHaven();
            finalPrize = lastSafeHaven > 0 ? this.prizeStructure[lastSafeHaven - 1] : 0;
            this.totalPrize = finalPrize;
        }
        
        const result = {
            win: win,
            finalScore: finalPrize,
            levelReached: this.currentLevel,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.totalQuestions,
            reason: reason,
            prizeStructure: this.getPrizeStructure(),
            safeHaven: this.getLastSafeHaven()
        };
        
        // حفظ النتيجة
        this.saveGameResult(result);
        
        // إرسال الحدث
        this.emit('gameEnded', result);
        
        return result;
    }
    
    /**
     * 💾 حفظ نتيجة اللعبة
     */
    saveGameResult(result) {
        const gameData = {
            userId: this.userId || 'guest',
            score: result.finalScore,
            level: result.levelReached,
            win: result.win,
            correctAnswers: result.correctAnswers,
            date: new Date().toISOString(),
            category: this.settings.category,
            difficulty: this.settings.difficulty,
            duration: this.gameDuration || 0
        };
        
        // حفظ في التخزين المحلي
        const games = JSON.parse(localStorage.getItem('game_history') || '[]');
        games.push(gameData);
        localStorage.setItem('game_history', JSON.stringify(games));
        
        // تحديث إحصائيات المستخدم
        this.updateUserStats(gameData);
    }
    
    /**
     * 📊 تحديث إحصائيات المستخدم
     */
    updateUserStats(gameData) {
        const userStats = JSON.parse(localStorage.getItem('user_stats') || '{
            "totalGames": 0,
            "totalWins": 0,
            "totalEarnings": 0,
            "highestScore": 0,
            "averageScore": 0
        }');
        
        userStats.totalGames++;
        if (gameData.win) userStats.totalWins++;
        userStats.totalEarnings += gameData.score;
        
        if (gameData.score > userStats.highestScore) {
            userStats.highestScore = gameData.score;
        }
        
        userStats.averageScore = userStats.totalEarnings / userStats.totalGames;
        
        localStorage.setItem('user_stats', JSON.stringify(userStats));
    }
    
    /**
     * 📋 الحصول على هيكل الجوائز
     */
    getPrizeStructure() {
        return this.prizeStructure.map((prize, index) => ({
            level: index + 1,
            prize: prize,
            isSafe: this.safeHavens.includes(index + 1),
            isCurrent: index === this.currentLevel - 1,
            isPassed: index < this.currentLevel - 1,
            isGuaranteed: index < this.getLastSafeHaven()
        }));
    }
    
    /**
     * 📊 الحصول على حالة اللعبة
     */
    getGameState() {
        return {
            isActive: this.isGameActive,
            currentLevel: this.currentLevel,
            currentPrize: this.getCurrentPrize(),
            nextPrize: this.currentLevel < this.totalQuestions ? 
                this.prizeStructure[this.currentLevel] : 0,
            score: this.score,
            totalPrize: this.totalPrize,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.totalQuestions,
            timeLeft: this.timeLeft,
            isSafeHaven: this.isSafeHaven(),
            lifelines: this.getAvailableLifelines(),
            selectedAnswer: this.selectedAnswer,
            category: this.settings.category,
            difficulty: this.settings.difficulty
        };
    }
    
    /**
     * 🛠️ الحصول على وسائل المساعدة المتاحة
     */
    getAvailableLifelines() {
        const available = {};
        Object.keys(this.lifelines).forEach(key => {
            available[key] = this.lifelines[key].available && !this.lifelines[key].used;
        });
        return available;
    }
    
    /**
     * 🔊 إرسال حدث
     */
    emit(eventName, data) {
        if (typeof window !== 'undefined' && window.dispatchEvent) {
            const event = new CustomEvent(`game:${eventName}`, { detail: data });
            window.dispatchEvent(event);
        }
    }
    
    /**
     * 🎯 الحصول على إحصائيات اللعبة
     */
    getGameStatistics() {
        const games = JSON.parse(localStorage.getItem('game_history') || '[]');
        const userStats = JSON.parse(localStorage.getItem('user_stats') || '{}');
        
        return {
            totalGames: games.length,
            totalWins: games.filter(g => g.win).length,
            totalEarnings: games.reduce((sum, game) => sum + game.score, 0),
            highestScore: Math.max(...games.map(g => g.score), 0),
            averageScore: games.length > 0 ? 
                games.reduce((sum, game) => sum + game.score, 0) / games.length : 0,
            favoriteCategory: this.getFavoriteCategory(games),
            winRate: games.length > 0 ? 
                (games.filter(g => g.win).length / games.length * 100).toFixed(1) : 0,
            userStats: userStats
        };
    }
    
    /**
     * ❤️ الحصول على الفئة المفضلة
     */
    getFavoriteCategory(games) {
        if (games.length === 0) return 'general';
        
        const categories = {};
        games.forEach(game => {
            categories[game.category] = (categories[game.category] || 0) + 1;
        });
        
        return Object.keys(categories).reduce((a, b) => 
            categories[a] > categories[b] ? a : b
        );
    }
    
    /**
     * 🔧 تحديث إعدادات اللعبة
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        
        // إذا تغيرت الفئة، يجب إعادة تحميل الأسئلة
        if (newSettings.category && newSettings.category !== this.settings.category) {
            this.filterQuestionsByCategory();
        }
        
        return this.settings;
    }
    
    /**
     * 🔄 إعادة تعيين اللعبة
     */
    resetGame() {
        this.currentQuestion = null;
        this.currentLevel = 0;
        this.score = 0;
        this.totalPrize = 0;
        this.isGameActive = false;
        this.selectedAnswer = null;
        this.correctAnswers = 0;
        
        // إعادة تعيين وسائل المساعدة
        Object.keys(this.lifelines).forEach(key => {
            this.lifelines[key].used = false;
        });
        
        // إيقاف المؤقت
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        console.log("🔄 تم إعادة تعيين اللعبة");
    }
    
    /**
     * 📝 إضافة سؤال جديد
     */
    addQuestion(questionData) {
        const newQuestion = {
            id: this.questionsDatabase.length + 1,
            ...questionData
        };
        
        this.questionsDatabase.push(newQuestion);
        
        // حفظ في التخزين المحلي
        localStorage.setItem('custom_questions', JSON.stringify(
            JSON.parse(localStorage.getItem('custom_questions') || '[]').concat(newQuestion)
        ));
        
        return newQuestion;
    }
    
    /**
     * 🗑️ حذف سؤال
     */
    deleteQuestion(questionId) {
        const index = this.questionsDatabase.findIndex(q => q.id === questionId);
        if (index !== -1) {
            this.questionsDatabase.splice(index, 1);
            return true;
        }
        return false;
    }
    
    /**
     * 🔍 البحث عن أسئلة
     */
    searchQuestions(query) {
        return this.questionsDatabase.filter(q => 
            q.question.toLowerCase().includes(query.toLowerCase()) ||
            q.category.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    /**
     * 🎲 الحصول على سؤال عشوائي
     */
    getRandomQuestion() {
        if (this.questionsDatabase.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * this.questionsDatabase.length);
        return this.questionsDatabase[randomIndex];
    }
    
    /**
     * 📊 توليد تقرير عن اللعبة
     */
    generateGameReport() {
        const stats = this.getGameStatistics();
        const gameState = this.getGameState();
        
        return {
            timestamp: new Date().toISOString(),
            gameState: gameState,
            statistics: stats,
            settings: this.settings,
            prizeStructure: this.getPrizeStructure(),
            availableLifelines: this.getAvailableLifelines(),
            currentQuestion: this.currentQuestion,
            selectedAnswer: this.selectedAnswer
        };
    }
    
    /**
     * 💾 تصدير بيانات اللعبة
     */
    exportGameData() {
        const data = {
            questions: this.questionsDatabase,
            settings: this.settings,
            gameHistory: JSON.parse(localStorage.getItem('game_history') || '[]'),
            userStats: JSON.parse(localStorage.getItem('user_stats') || '{}'),
            customQuestions: JSON.parse(localStorage.getItem('custom_questions') || '[]'),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
    
    /**
     * 📥 استيراد بيانات اللعبة
     */
    importGameData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.questions) {
                this.questionsDatabase = data.questions;
            }
            
            if (data.settings) {
                this.settings = data.settings;
            }
            
            if (data.gameHistory) {
                localStorage.setItem('game_history', JSON.stringify(data.gameHistory));
            }
            
            if (data.userStats) {
                localStorage.setItem('user_stats', JSON.stringify(data.userStats));
            }
            
            if (data.customQuestions) {
                localStorage.setItem('custom_questions', JSON.stringify(data.customQuestions));
            }
            
            return { success: true, message: "تم استيراد البيانات بنجاح" };
        } catch (error) {
            return { success: false, error: "خطأ في استيراد البيانات" };
        }
    }
    
    /**
     * 🎯 الحصول على تلميح
     */
    getHint() {
        if (!this.currentQuestion) {
            return { error: "لا يوجد سؤال حالياً" };
        }
        
        const hintTypes = [
            "فكر في مجال " + this.currentQuestion.category,
            "الإجابة تتكون من " + this.getAnswerLengthHint() + " حروف",
            "هذا السؤال يصنف على أنه " + this.getDifficultyText(),
            "جرب عملية الحذف للإجابات الواضحة الخطأ"
        ];
        
        const randomHint = hintTypes[Math.floor(Math.random() * hintTypes.length)];
        
        return {
            hint: randomHint,
            category: this.currentQuestion.category,
            difficulty: this.getDifficultyText()
        };
    }
    
    /**
     * 🔤 الحصول على تلميح طول الإجابة
     */
    getAnswerLengthHint() {
        const answer = this.currentQuestion.options[this.currentQuestion.correctAnswer];
        return answer.length;
    }
    
    /**
     * 📊 الحصول على نص الصعوبة
     */
    getDifficultyText() {
        const levels = ["سهل", "متوسط", "صعب", "خبير"];
        return levels[this.currentQuestion.difficulty - 1] || "غير معروف";
    }
    
    /**
     * 🎮 الحصول على معلومات للبث المباشر
     */
    getStreamInfo() {
        return {
            level: this.currentLevel,
            prize: this.getCurrentPrize(),
            question: this.currentQuestion ? 
                this.currentQuestion.question.substring(0, 50) + "..." : "لا يوجد سؤال",
            category: this.settings.category,
            viewers: Math.floor(Math.random() * 1000) + 100,
            likes: Math.floor(Math.random() * 500) + 50,
            isLive: this.isGameActive
        };
    }
}

// تصدير المحرك إذا كان في بيئة Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}

// للاستخدام في المتصفح
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
}

// Example usage:
/*
const game = new GameEngine();
game.startNewGame({
    category: 'general',
    difficulty: 'medium',
    withTimer: true
});
*/
