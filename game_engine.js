/**
 * محرك اللعبة الرئيسي - المليونير الذهبي
 */

class GameEngine {
    constructor() {
        this.currentQuestion = null;
        this.currentLevel = 0;
        this.score = 0;
        this.lifelines = {
            fiftyFifty: true,
            askFriend: true,
            audience: true
        };
        this.gameActive = false;
        this.timer = null;
        this.timeLeft = 0;
        this.questions = [];
        this.safeHavens = [5, 10, 15]; // الأسئلة الآمنة
        this.prizeStructure = [
            100, 200, 300, 500, 1000,
            2000, 5000, 10000, 16000, 32000,
            64000, 128000, 250000, 500000, 1000000
        ];
    }

    /**
     * بدء لعبة جديدة
     */
    startNewGame(settings) {
        this.gameActive = true;
        this.currentLevel = 0;
        this.score = 0;
        this.lifelines = {
            fiftyFifty: true,
            askFriend: true,
            audience: true
        };

        // إعدادات اللعبة
        this.category = settings.category || 'general';
        this.withTimer = settings.withTimer || false;
        this.timePerQuestion = settings.timePerQuestion || 30;

        // تحميل الأسئلة
        this.loadQuestions(this.category);

        // بدء أول سؤال
        this.nextQuestion();

        // بدء المؤقت إذا كان مفعلاً
        if (this.withTimer) {
            this.startTimer();
        }

        return this.getGameState();
    }

    /**
     * تحميل الأسئلة بناءً على الفئة
     */
    loadQuestions(category) {
        // هذا مثال، في الواقع سيتم جلبها من قاعدة البيانات
        this.questions = [
            {
                id: 1,
                question: "ما هي عاصمة فرنسا؟",
                options: ["لندن", "برلين", "باريس", "مدريد"],
                correctAnswer: 2,
                category: "general",
                difficulty: 1
            },
            {
                id: 2,
                question: "كم عدد كواكب المجموعة الشمسية؟",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1,
                category: "science",
                difficulty: 1
            },
            // ... المزيد من الأسئلة
        ].filter(q => q.category === category || category === 'all');
    }

    /**
     * الانتقال للسؤال التالي
     */
    nextQuestion() {
        if (this.currentLevel >= 15) {
            this.endGame(true); // فاز بالمليون
            return;
        }

        // اختيار سؤال عشوائي مناسب للمستوى
        const availableQuestions = this.questions.filter(q => 
            q.difficulty === Math.min(3, Math.floor(this.currentLevel / 5) + 1)
        );

        if (availableQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            this.currentQuestion = availableQuestions[randomIndex];
            this.currentLevel++;

            // إزالة السؤال من القائمة لمنع التكرار
            this.questions = this.questions.filter(q => q.id !== this.currentQuestion.id);

            // إعادة تعيين المؤقت
            if (this.withTimer) {
                this.timeLeft = this.timePerQuestion;
            }

            return this.currentQuestion;
        }

        return null;
    }

    /**
     * التحقق من الإجابة
     */
    checkAnswer(selectedIndex) {
        if (!this.gameActive || !this.currentQuestion) {
            return null;
        }

        const isCorrect = (selectedIndex === this.currentQuestion.correctAnswer);
        
        if (isCorrect) {
            // زيادة النقاط
            this.score = this.prizeStructure[this.currentLevel - 1];
            
            // التحقق إذا كان مستوى آمن
            const isSafeHaven = this.safeHavens.includes(this.currentLevel);
            
            return {
                correct: true,
                prize: this.score,
                safeHaven: isSafeHaven,
                correctIndex: this.currentQuestion.correctAnswer
            };
        } else {
            // خسارة - الرجوع لأخر مستوى آمن
            const lastSafeHaven = Math.max(...this.safeHavens.filter(sh => sh < this.currentLevel));
            this.score = lastSafeHaven >= 0 ? this.prizeStructure[lastSafeHaven - 1] : 0;
            
            this.endGame(false);
            return {
                correct: false,
                lost: true,
                finalPrize: this.score
            };
        }
    }

    /**
     * استخدام وسيلة مساعدة (50:50)
     */
    useFiftyFifty() {
        if (!this.lifelines.fiftyFifty || !this.currentQuestion) {
            return null;
        }

        const wrongOptions = [0, 1, 2, 3]
            .filter(index => index !== this.currentQuestion.correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        this.lifelines.fiftyFifty = false;
        
        return {
            remainingOptions: [
                this.currentQuestion.correctAnswer,
                ...wrongOptions.slice(0, 1)
            ].sort((a, b) => a - b),
            lifelineUsed: 'fiftyFifty'
        };
    }

    /**
     * استخدام وسيلة مساعدة (اسأل صديق)
     */
    useAskFriend() {
        if (!this.lifelines.askFriend || !this.currentQuestion) {
            return null;
        }

        // محاكاة رأي الصديق (85% احتمالية الصواب)
        const friendIsRight = Math.random() < 0.85;
        const suggestedAnswer = friendIsRight ? 
            this.currentQuestion.correctAnswer : 
            Math.floor(Math.random() * 4);

        this.lifelines.askFriend = false;

        return {
            suggestedAnswer: suggestedAnswer,
            confidence: friendIsRight ? "متأكد جداً" : "لست متأكداً",
            lifelineUsed: 'askFriend'
        };
    }

    /**
     * استخدام وسيلة مساعدة (رأي الجمهور)
     */
    useAudience() {
        if (!this.lifelines.audience || !this.currentQuestion) {
            return null;
        }

        // محاكاة توزيع أصوات الجمهور
        const votes = [0, 0, 0, 0];
        const correctIndex = this.currentQuestion.correctAnswer;
        
        // إعطاء نسبة أعلى للإجابة الصحيحة
        votes[correctIndex] = Math.floor(Math.random() * 30 + 60); // 60-90%
        
        // توزيع الباقي عشوائياً
        let remaining = 100 - votes[correctIndex];
        for (let i = 0; i < 4; i++) {
            if (i !== correctIndex) {
                const share = Math.floor(Math.random() * remaining);
                votes[i] = share;
                remaining -= share;
            }
        }

        // إضافة الباقي للإجابة الصحيحة
        votes[correctIndex] += remaining;

        this.lifelines.audience = false;

        return {
            votes: votes,
            lifelineUsed: 'audience'
        };
    }

    /**
     * تخطي السؤال بمشاهدة إعلان
     */
    skipQuestion() {
        if (!this.gameActive) return null;
        
        // هنا سيتم استدعاء نظام الإعلانات
        console.log("عرض إعلان لتخطي السؤال...");
        
        // الانتقال للسؤال التالي
        return this.nextQuestion();
    }

    /**
     * الانسحاب من اللعبة
     */
    withdraw() {
        if (!this.gameActive) return this.score;
        
        const finalPrize = this.score;
        this.endGame(false);
        
        return {
            withdrawn: true,
            prize: finalPrize,
            message: `لقد انسحبت برصيد ${finalPrize} دولار!`
        };
    }

    /**
     * بدء المؤقت
     */
    startTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.endGame(false); // انتهى الوقت
            }
        }, 1000);
    }

    /**
     * إنهاء اللعبة
     */
    endGame(win = false) {
        this.gameActive = false;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        const result = {
            win: win,
            finalScore: this.score,
            levelReached: this.currentLevel,
            totalQuestions: 15
        };

        // حفظ النتيجة للمستخدم
        this.saveGameResult(result);

        // تشغيل صوت النهاية
        if (win) {
            console.log("🎉🎉🎉 فاز بالمليون دولار! 🎉🎉🎉");
        }

        return result;
    }

    /**
     * حفظ نتيجة اللعبة
     */
    saveGameResult(result) {
        // هنا سيتم حفظ النتيجة في قاعدة البيانات
        const gameData = {
            userId: window.currentUser?.id || 'guest',
            score: result.finalScore,
            level: result.levelReached,
            win: result.win,
            date: new Date().toISOString(),
            category: this.category
        };

        localStorage.setItem(`game_result_${Date.now()}`, JSON.stringify(gameData));
    }

    /**
     * الحصول على حالة اللعبة الحالية
     */
    getGameState() {
        return {
            active: this.gameActive,
            level: this.currentLevel,
            score: this.score,
            currentPrize: this.prizeStructure[this.currentLevel - 1] || 0,
            nextPrize: this.prizeStructure[this.currentLevel] || 0,
            lifelines: this.lifelines,
            timer: this.withTimer ? {
                timeLeft: this.timeLeft,
                totalTime: this.timePerQuestion
            } : null,
            safeHaven: this.safeHavens.includes(this.currentLevel),
            totalQuestions: 15
        };
    }

    /**
     * الحصول على هيكل الجوائز
     */
    getPrizeStructure() {
        return this.prizeStructure.map((prize, index) => ({
            level: index + 1,
            prize: prize,
            isSafe: this.safeHavens.includes(index + 1),
            isCurrent: index === this.currentLevel - 1,
            isPassed: index < this.currentLevel - 1
        }));
    }
}

// تصدير المحرك إذا كان في بيئة Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}
