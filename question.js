/**
 * ❓ نظام الأسئلة الخارق - المليونير الذهبي
 * قاعدة بيانات ذكية لإدارة الأسئلة والتصنيفات
 */

class QuestionManager {
    constructor() {
        console.log("❓ بدء تشغيل نظام الأسئلة الخارق...");
        
        // المتغيرات الأساسية
        this.questions = [];
        this.categories = {};
        this.difficultyLevels = {};
        this.questionStats = {};
        this.customQuestions = [];
        
        // إعدادات النظام
        this.settings = {
            maxQuestionsPerCategory: 1000,
            minQuestionsPerGame: 15,
            shuffleAnswers: true,
            trackStatistics: true,
            autoBackup: true,
            backupInterval: 3600000 // كل ساعة
        };
        
        // التهيئة التلقائية
        this.init();
    }
    
    /**
     * 🚀 تهيئة النظام
     */
    async init() {
        // تحميل الأسئلة المدمجة
        this.loadBuiltInQuestions();
        
        // تحميل الأسئلة المخصصة
        this.loadCustomQuestions();
        
        // تحميل الإحصائيات
        this.loadStatistics();
        
        // بدء النسخ الاحتياطي التلقائي
        this.startAutoBackup();
        
        console.log("✅ تم تهيئة نظام الأسئلة");
    }
    
    /**
     * 📦 تحميل الأسئلة المدمجة
     */
    loadBuiltInQuestions() {
        console.log("📦 تحميل الأسئلة المدمجة...");
        
        // تعريف الفئات
        this.categories = {
            'general': {
                id: 'general',
                name: 'الثقافة العامة',
                icon: '🧠',
                color: '#3498db',
                description: 'أسئلة متنوعة من جميع المجالات',
                questionCount: 500,
                difficulty: {
                    easy: 200,
                    medium: 200,
                    hard: 100
                }
            },
            'science': {
                id: 'science',
                name: 'العلوم',
                icon: '🔬',
                color: '#2ecc71',
                description: 'كيمياء، فيزياء، أحياء، فضاء',
                questionCount: 350,
                difficulty: {
                    easy: 100,
                    medium: 150,
                    hard: 100
                }
            },
            'history': {
                id: 'history',
                name: 'التاريخ',
                icon: '🏛️',
                color: '#e74c3c',
                description: 'أحداث تاريخية وشخصيات مؤثرة',
                questionCount: 400,
                difficulty: {
                    easy: 150,
                    medium: 150,
                    hard: 100
                }
            },
            'geography': {
                id: 'geography',
                name: 'الجغرافيا',
                icon: '🌍',
                color: '#9b59b6',
                description: 'دول، عواصم، أنهار، جبال',
                questionCount: 300,
                difficulty: {
                    easy: 150,
                    medium: 100,
                    hard: 50
                }
            },
            'sports': {
                id: 'sports',
                name: 'الرياضة',
                icon: '⚽',
                color: '#e67e22',
                description: 'ألعاب رياضية وبطولات عالمية',
                questionCount: 250,
                difficulty: {
                    easy: 150,
                    medium: 75,
                    hard: 25
                }
            },
            'entertainment': {
                id: 'entertainment',
                name: 'الترفيه',
                icon: '🎬',
                color: '#1abc9c',
                description: 'أفلام، مسلسلات، فنانون، مشاهير',
                questionCount: 450,
                difficulty: {
                    easy: 250,
                    medium: 150,
                    hard: 50
                }
            },
            'kids': {
                id: 'kids',
                name: 'للأطفال',
                icon: '🧒',
                color: '#f1c40f',
                description: 'أسئلة سهلة ومناسبة للأعمار الصغيرة',
                questionCount: 200,
                difficulty: {
                    easy: 200,
                    medium: 0,
                    hard: 0
                }
            }
        };
        
        // تعريف مستويات الصعوبة
        this.difficultyLevels = {
            1: { name: 'سهل', points: 100, time: 60 },
            2: { name: 'متوسط', points: 200, time: 45 },
            3: { name: 'صعب', points: 300, time: 30 },
            4: { name: 'خبير', points: 500, time: 20 }
        };
        
        // تحميل الأسئلة الأساسية
        this.loadBaseQuestions();
        
        console.log(`✅ تم تحميل ${this.questions.length} سؤال مدمج`);
    }
    
    /**
     * 📚 تحميل الأسئلة الأساسية
     */
    loadBaseQuestions() {
        // الثقافة العامة
        this.questions.push(...[
            {
                id: 1001,
                question: "ما هي عاصمة فرنسا؟",
                options: ["لندن", "برلين", "باريس", "مدريد"],
                correctAnswer: 2,
                category: "general",
                difficulty: 1,
                explanation: "باريس هي عاصمة فرنسا وأكبر مدنها، تقع على نهر السين في شمال فرنسا",
                author: "النظام",
                tags: ["عواصم", "أوروبا"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 1002,
                question: "كم عدد كواكب المجموعة الشمسية؟",
                options: ["7", "8", "9", "10"],
                correctAnswer: 1,
                category: "general",
                difficulty: 1,
                explanation: "يوجد 8 كواكب في المجموعة الشمسية: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون",
                author: "النظام",
                tags: ["علوم", "فضاء"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 1003,
                question: "من هو مؤلف مسرحية 'هملت'؟",
                options: ["شكسبير", "تشيخوف", "إبسن", "برنارد شو"],
                correctAnswer: 0,
                category: "general",
                difficulty: 2,
                explanation: "وليم شكسبير هو مؤلف مسرحية هملت، التي كتبها بين 1599 و1601",
                author: "النظام",
                tags: ["أدب", "مسرح"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 1004,
                question: "ما هو أكبر محيط في العالم؟",
                options: ["المحيط الهادئ", "المحيط الأطلسي", "المحيط الهندي", "المحيط المتجمد الشمالي"],
                correctAnswer: 0,
                category: "general",
                difficulty: 1,
                explanation: "المحيط الهادئ هو أكبر محيط في العالم، يغطي مساحة 165.25 مليون كم²",
                author: "النظام",
                tags: ["جغرافيا", "محيطات"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 1005,
                question: "في أي عام هبط الإنسان على القمر لأول مرة؟",
                options: ["1965", "1969", "1972", "1975"],
                correctAnswer: 1,
                category: "general",
                difficulty: 2,
                explanation: "هبط الإنسان على القمر لأول مرة في 20 يوليو 1969 خلال مهمة أبولو 11",
                author: "النظام",
                tags: ["تاريخ", "فضاء"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // العلوم
        this.questions.push(...[
            {
                id: 2001,
                question: "ما هو العنصر الكيميائي الذي رمزه 'O'؟",
                options: ["ذهب", "أوكسجين", "فضة", "حديد"],
                correctAnswer: 1,
                category: "science",
                difficulty: 1,
                explanation: "الأكسجين هو العنصر الكيميائي الذي رمزه O وعدده الذري 8",
                author: "النظام",
                tags: ["كيمياء", "عناصر"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 2002,
                question: "كم عدد العظام في جسم الإنسان البالغ؟",
                options: ["206", "210", "215", "220"],
                correctAnswer: 0,
                category: "science",
                difficulty: 2,
                explanation: "يحتوي جسم الإنسان البالغ على 206 عظمة، بينما يولد الإنسان بحوالي 270 عظمة",
                author: "النظام",
                tags: ["أحياء", "تشريح"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 2003,
                question: "ما هو أقرب كوكب للشمس؟",
                options: ["الزهرة", "عطارد", "الأرض", "المريخ"],
                correctAnswer: 1,
                category: "science",
                difficulty: 1,
                explanation: "عطارد هو أقرب كوكب للشمس وأصغر كوكب في المجموعة الشمسية",
                author: "النظام",
                tags: ["فضاء", "كواكب"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // التاريخ
        this.questions.push(...[
            {
                id: 3001,
                question: "متى انتهت الحرب العالمية الثانية؟",
                options: ["1943", "1944", "1945", "1946"],
                correctAnswer: 2,
                category: "history",
                difficulty: 2,
                explanation: "انتهت الحرب العالمية الثانية في 2 سبتمبر 1945 باستسلام اليابان",
                author: "النظام",
                tags: ["حروب", "تاريخ"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 3002,
                question: "من هو أول رئيس للولايات المتحدة الأمريكية؟",
                options: ["توماس جفرسون", "جورج واشنطن", "أبراهام لينكولن", "جون آدامز"],
                correctAnswer: 1,
                category: "history",
                difficulty: 1,
                explanation: "جورج واشنطن هو أول رئيس للولايات المتحدة، حكم من 1789 إلى 1797",
                author: "النظام",
                tags: ["رؤساء", "أمريكا"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // الجغرافيا
        this.questions.push(...[
            {
                id: 4001,
                question: "ما هو أطول نهر في العالم؟",
                options: ["نهر النيل", "نهر الأمازون", "نهر المسيسيبي", "نهر اليانغتسي"],
                correctAnswer: 0,
                category: "geography",
                difficulty: 2,
                explanation: "نهر النيل هو أطول نهر في العالم، يبلغ طوله حوالي 6650 كم",
                author: "النظام",
                tags: ["أنهار", "أفريقيا"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 4002,
                question: "ما هي أكبر دولة في العالم من حيث المساحة؟",
                options: ["كندا", "الولايات المتحدة", "روسيا", "الصين"],
                correctAnswer: 2,
                category: "geography",
                difficulty: 1,
                explanation: "روسيا هي أكبر دولة في العالم من حيث المساحة، تبلغ مساحتها 17.1 مليون كم²",
                author: "النظام",
                tags: ["دول", "مساحة"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // الرياضة
        this.questions.push(...[
            {
                id: 5001,
                question: "في أي رياضة يستخدم مصطلح 'تريبلك'؟",
                options: ["كرة القدم", "كرة السلة", "التنس", "الجولف"],
                correctAnswer: 1,
                category: "sports",
                difficulty: 1,
                explanation: "تريبلك هو مصطلح يستخدم في كرة السلة للدلالة على تحقيق ثلاث إحصائيات (نقاط، تمريرات، ارتدادات)",
                author: "النظام",
                tags: ["مصطلحات", "كرة سلة"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 5002,
                question: "كم عدد اللاعبين في فريق كرة القدم؟",
                options: ["10", "11", "12", "13"],
                correctAnswer: 1,
                category: "sports",
                difficulty: 1,
                explanation: "فريق كرة القدم يتكون من 11 لاعباً، منهم حارس مرمى و10 لاعبين ميدانيين",
                author: "النظام",
                tags: ["كرة قدم", "فرق"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // الترفيه
        this.questions.push(...[
            {
                id: 6001,
                question: "من هو مخرج فيلم 'تايتنك'؟",
                options: ["ستيفن سبيلبرغ", "جيمس كاميرون", "كريستوفر نولان", "بيتر جاكسون"],
                correctAnswer: 1,
                category: "entertainment",
                difficulty: 2,
                explanation: "جيمس كاميرون هو مخرج فيلم تايتنك الذي صدر عام 1997 وحقق نجاحاً كبيراً",
                author: "النظام",
                tags: ["أفلام", "مخرجين"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 6002,
                question: "ما هي أول لعبة فيديو في العالم؟",
                options: ["بونج", "سوبر ماريو", "تنس للاثنين", "باك مان"],
                correctAnswer: 2,
                category: "entertainment",
                difficulty: 3,
                explanation: "تنس للاثنين (1958) هي أول لعبة فيديو تفاعلية، طورها ويليام هيغينبوثام",
                author: "النظام",
                tags: ["ألعاب", "تاريخ"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
        
        // للأطفال
        this.questions.push(...[
            {
                id: 7001,
                question: "ما هو لون التفاحة الناضجة؟",
                options: ["أزرق", "أحمر", "أصفر", "أخضر"],
                correctAnswer: 1,
                category: "kids",
                difficulty: 1,
                explanation: "التفاحة الناضجة تكون حمراء اللون، لكن هناك أنواع مختلفة من التفاح بألوان مختلفة",
                author: "النظام",
                tags: ["فواكه", "ألوان"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            },
            {
                id: 7002,
                question: "كم عدد أرجل العنكبوت؟",
                options: ["6", "8", "10", "12"],
                correctAnswer: 1,
                category: "kids",
                difficulty: 1,
                explanation: "للعنكبوت 8 أرجل، وهو من فصيلة العناكب وليس الحشرات",
                author: "النظام",
                tags: ["حشرات", "حيوانات"],
                createdAt: "2024-01-01",
                timesAsked: 0,
                correctRate: 0
            }
        ]);
    }
    
    /**
     * 📂 تحميل الأسئلة المخصصة
     */
    loadCustomQuestions() {
        try {
            const customData = localStorage.getItem('custom_questions');
            if (customData) {
                this.customQuestions = JSON.parse(customData);
                console.log(`📂 تم تحميل ${this.customQuestions.length} سؤال مخصص`);
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل الأسئلة المخصصة:", error);
            this.customQuestions = [];
        }
    }
    
    /**
     * 📊 تحميل الإحصائيات
     */
    loadStatistics() {
        try {
            const statsData = localStorage.getItem('question_statistics');
            if (statsData) {
                this.questionStats = JSON.parse(statsData);
                console.log("📊 تم تحميل إحصائيات الأسئلة");
            } else {
                this.questionStats = {};
            }
        } catch (error) {
            console.error("❌ خطأ في تحميل الإحصائيات:", error);
            this.questionStats = {};
        }
    }
    
    /**
     * 💾 بدء النسخ الاحتياطي التلقائي
     */
    startAutoBackup() {
        if (this.settings.autoBackup) {
            setInterval(() => {
                this.backupQuestions();
            }, this.settings.backupInterval);
            
            console.log("💾 تم تفعيل النسخ الاحتياطي التلقائي");
        }
    }
    
    /**
     * 🔍 البحث عن أسئلة
     */
    searchQuestions(query, filters = {}) {
        let results = [...this.questions, ...this.customQuestions];
        
        // البحث في النص
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(q => 
                q.question.toLowerCase().includes(searchTerm) ||
                q.explanation.toLowerCase().includes(searchTerm) ||
                q.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // تطبيق الفلاتر
        if (filters.category && filters.category !== 'all') {
            results = results.filter(q => q.category === filters.category);
        }
        
        if (filters.difficulty) {
            results = results.filter(q => q.difficulty === filters.difficulty);
        }
        
        if (filters.author) {
            results = results.filter(q => q.author === filters.author);
        }
        
        if (filters.minCorrectRate !== undefined) {
            results = results.filter(q => {
                const stats = this.getQuestionStats(q.id);
                return stats.correctRate >= filters.minCorrectRate;
            });
        }
        
        // ترتيب النتائج
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'difficulty':
                    results.sort((a, b) => a.difficulty - b.difficulty);
                    break;
                case 'date':
                    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'popularity':
                    results.sort((a, b) => {
                        const statsA = this.getQuestionStats(a.id);
                        const statsB = this.getQuestionStats(b.id);
                        return statsB.timesAsked - statsA.timesAsked;
                    });
                    break;
            }
        }
        
        return {
            results: results,
            total: results.length,
            categories: this.getCategoryStats(results)
        };
    }
    
    /**
     * 📊 الحصول على إحصائيات الفئات
     */
    getCategoryStats(questions) {
        const stats = {};
        
        questions.forEach(question => {
            if (!stats[question.category]) {
                stats[question.category] = {
                    count: 0,
                    difficulty: {
                        1: 0, 2: 0, 3: 0, 4: 0
                    }
                };
            }
            
            stats[question.category].count++;
            stats[question.category].difficulty[question.difficulty]++;
        });
        
        return stats;
    }
    
    /**
     * 🎲 الحصول على سؤال عشوائي
     */
    getRandomQuestion(filters = {}) {
        let pool = [...this.questions, ...this.customQuestions];
        
        // تطبيق الفلاتر
        if (filters.category && filters.category !== 'all') {
            pool = pool.filter(q => q.category === filters.category);
        }
        
        if (filters.difficulty) {
            pool = pool.filter(q => q.difficulty === filters.difficulty);
        }
        
        if (filters.exclude && filters.exclude.length > 0) {
            pool = pool.filter(q => !filters.exclude.includes(q.id));
        }
        
        if (pool.length === 0) {
            return null;
        }
        
        // اختيار سؤال عشوائي
        const randomIndex = Math.floor(Math.random() * pool.length);
        const question = pool[randomIndex];
        
        // خلط الإجابات إذا كان مفعلاً
        if (this.settings.shuffleAnswers) {
            question.shuffledOptions = this.shuffleOptions(question.options, question.correctAnswer);
        }
        
        return question;
    }
    
    /**
     * 🔀 خلط خيارات الإجابة
     */
    shuffleOptions(options, correctIndex) {
        const shuffled = [...options];
        const correctAnswer = shuffled[correctIndex];
        
        // خلط الخيارات
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // تحديث الفهرس الصحيح
        const newCorrectIndex = shuffled.indexOf(correctAnswer);
        
        return {
            options: shuffled,
            correctAnswer: newCorrectIndex,
            originalCorrect: correctIndex
        };
    }
    
    /**
     * 🎯 الحصول على مجموعة أسئلة للعبة
     */
    getGameQuestions(category = 'general', count = 15) {
        const gameQuestions = [];
        const usedQuestionIds = new Set();
        
        // توزيع الصعوبة
        const difficultyDistribution = {
            1: Math.ceil(count * 0.4), // 40% سهلة
            2: Math.ceil(count * 0.4), // 40% متوسطة
            3: Math.floor(count * 0.2) // 20% صعبة
        };
        
        // جمع الأسئلة من كل مستوى صعوبة
        for (const [difficulty, needed] of Object.entries(difficultyDistribution)) {
            const difficultyNum = parseInt(difficulty);
            let available = this.getQuestionsByCategoryAndDifficulty(category, difficultyNum);
            
            // إزالة الأسئلة المستخدمة
            available = available.filter(q => !usedQuestionIds.has(q.id));
            
            // إذا لم يكن هناك ما يكفي، خذ من المستوى الأدنى
            if (available.length < needed) {
                const extraNeeded = needed - available.length;
                const lowerDifficulty = Math.max(1, difficultyNum - 1);
                const extraQuestions = this.getQuestionsByCategoryAndDifficulty(category, lowerDifficulty);
                
                available = [...available, ...extraQuestions.filter(q => !usedQuestionIds.has(q.id)).slice(0, extraNeeded)];
            }
            
            // اختيار الأسئلة
            const selected = this.selectRandomQuestions(available, needed);
            
            selected.forEach(q => {
                gameQuestions.push(q);
                usedQuestionIds.add(q.id);
            });
        }
        
        // إذا لم يكن هناك ما يكفي، أضف أي أسئلة متاحة
        if (gameQuestions.length < count) {
            const allQuestions = this.getQuestionsByCategory(category);
            const remaining = allQuestions.filter(q => !usedQuestionIds.has(q.id));
            const extraNeeded = count - gameQuestions.length;
            
            const extraQuestions = this.selectRandomQuestions(remaining, extraNeeded);
            gameQuestions.push(...extraQuestions);
        }
        
        // خلط الأسئلة
        this.shuffleArray(gameQuestions);
        
        // إضافة خيارات مختلطة
        gameQuestions.forEach(q => {
            if (this.settings.shuffleAnswers) {
                q.shuffled = this.shuffleOptions(q.options, q.correctAnswer);
            }
        });
        
        return {
            questions: gameQuestions,
            total: gameQuestions.length,
            difficultyBreakdown: this.getDifficultyBreakdown(gameQuestions),
            category: category
        };
    }
    
    /**
     * 📊 الحصول على أسئلة حسب الفئة والصعوبة
     */
    getQuestionsByCategoryAndDifficulty(category, difficulty) {
        const allQuestions = [...this.questions, ...this.customQuestions];
        return allQuestions.filter(q => 
            (category === 'all' || q.category === category) &&
            q.difficulty === difficulty
        );
    }
    
    /**
     * 📋 الحصول على أسئلة حسب الفئة
     */
    getQuestionsByCategory(category) {
        if (category === 'all') {
            return [...this.questions, ...this.customQuestions];
        }
        return [...this.questions, ...this.customQuestions].filter(q => q.category === category);
    }
    
    /**
     * 🎲 اختيار أسئلة عشوائية
     */
    selectRandomQuestions(questions, count) {
        if (questions.length <= count) {
            return [...questions];
        }
        
        const shuffled = [...questions];
        this.shuffleArray(shuffled);
        return shuffled.slice(0, count);
    }
    
    /**
     * 🔀 خلط مصفوفة
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    /**
     * 📊 الحصول على توزيع الصعوبة
     */
    getDifficultyBreakdown(questions) {
        const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0 };
        
        questions.forEach(q => {
            breakdown[q.difficulty]++;
        });
        
        return breakdown;
    }
    
    /**
     * ➕ إضافة سؤال جديد
     */
    addQuestion(questionData) {
        // التحقق من البيانات
        const validation = this.validateQuestion(questionData);
        if (!validation.valid) {
            return {
                success: false,
                message: validation.message
            };
        }
        
        // إنشاء سؤال جديد
        const newQuestion = {
            id: this.generateQuestionId(),
            ...questionData,
            createdAt: new Date().toISOString(),
            author: questionData.author || 'مستخدم',
            timesAsked: 0,
            correctRate: 0,
            tags: questionData.tags || []
        };
        
        // إضافة للسؤالة المخصصة
        this.customQuestions.push(newQuestion);
        
        // حفظ في التخزين المحلي
        this.saveCustomQuestions();
        
        // تحديث إحصائيات الفئة
        this.updateCategoryStats(newQuestion.category);
        
        console.log(`➕ تم إضافة سؤال جديد: ${newQuestion.id}`);
        
        return {
            success: true,
            message: 'تم إضافة السؤال بنجاح',
            question: newQuestion
        };
    }
    
    /**
     * ✅ التحقق من صحة السؤال
     */
    validateQuestion(questionData) {
        const { question, options, correctAnswer, category, difficulty } = questionData;
        
        // التحقق من السؤال
        if (!question || question.trim().length < 5) {
            return {
                valid: false,
                message: 'السؤال يجب أن يكون 5 أحرف على الأقل'
            };
        }
        
        // التحقق من الخيارات
        if (!options || options.length !== 4) {
            return {
                valid: false,
                message: 'يجب توفير 4 خيارات للإجابة'
            };
        }
        
        for (let i = 0; i < options.length; i++) {
            if (!options[i] || options[i].trim().length === 0) {
                return {
                    valid: false,
                    message: `الخيار ${i + 1} فارغ`
                };
            }
        }
        
        // التحقق من الإجابة الصحيحة
        if (correctAnswer === undefined || correctAnswer < 0 || correctAnswer > 3) {
            return {
                valid: false,
                message: 'يجب تحديد الإجابة الصحيحة (0-3)'
            };
        }
        
        // التحقق من الفئة
        if (!category || !this.categories[category]) {
            return {
                valid: false,
                message: 'الفئة غير صحيحة'
            };
        }
        
        // التحقق من الصعوبة
        if (!difficulty || difficulty < 1 || difficulty > 4) {
            return {
                valid: false,
                message: 'مستوى الصعوبة يجب أن يكون بين 1 و4'
            };
        }
        
        return { valid: true };
    }
    
    /**
     * 🆔 توليد معرف سؤال فريد
     */
    generateQuestionId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return timestamp * 1000 + random;
    }
    
    /**
     * ✏️ تعديل سؤال
     */
    editQuestion(questionId, updates) {
        // البحث عن السؤال
        const question = this.findQuestion(questionId);
        
        if (!question) {
            return {
                success: false,
                message: 'السؤال غير موجود'
            };
        }
        
        // تحديث الحقول المسموح بها
        const allowedFields = ['question', 'options', 'correctAnswer', 'explanation', 'tags', 'difficulty'];
        const updatedFields = {};
        
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                question[field] = updates[field];
                updatedFields[field] = true;
            }
        });
        
        // تحديث وقت التعديل
        question.updatedAt = new Date().toISOString();
        
        // حفظ التغييرات
        this.saveCustomQuestions();
        
        return {
            success: true,
            message: 'تم تعديل السؤال بنجاح',
            updatedFields: Object.keys(updatedFields),
            question: question
        };
    }
    
    /**
     * 🗑️ حذف سؤال
     */
    deleteQuestion(questionId) {
        // البحث عن السؤال
        const index = this.customQuestions.findIndex(q => q.id === questionId);
        
        if (index === -1) {
            return {
                success: false,
                message: 'السؤال غير موجود'
            };
        }
        
        // حذف السؤال
        const deletedQuestion = this.customQuestions.splice(index, 1)[0];
        
        // حفظ التغييرات
        this.saveCustomQuestions();
        
        // تحديث إحصائيات الفئة
        this.updateCategoryStats(deletedQuestion.category, -1);
        
        return {
            success: true,
            message: 'تم حذف السؤال بنجاح',
            question: deletedQuestion
        };
    }
    
    /**
     * 🔍 البحث عن سؤال
     */
    findQuestion(questionId) {
        // البحث في الأسئلة المخصصة أولاً
        let question = this.customQuestions.find(q => q.id === questionId);
        
        if (!question) {
            // البحث في الأسئلة المدمجة
            question = this.questions.find(q => q.id === questionId);
        }
        
        return question;
    }
    
    /**
     * 📊 تحديث إحصائيات السؤال
     */
    updateQuestionStats(questionId, answeredCorrectly) {
        if (!this.settings.trackStatistics) return;
        
        // الحصول على الإحصائيات الحالية
        let stats = this.questionStats[questionId];
        if (!stats) {
            stats = {
                timesAsked: 0,
                timesCorrect: 0,
                correctRate: 0
            };
        }
        
        // تحديث الإحصائيات
        stats.timesAsked++;
        if (answeredCorrectly) {
            stats.timesCorrect++;
        }
        stats.correctRate = (stats.timesCorrect / stats.timesAsked) * 100;
        
        // حفظ الإحصائيات
        this.questionStats[questionId] = stats;
        this.saveStatistics();
        
        // تحديث السؤال نفسه إذا كان في الأسئلة المخصصة
        const question = this.customQuestions.find(q => q.id === questionId);
        if (question) {
            question.timesAsked = stats.timesAsked;
            question.correctRate = stats.correctRate;
            this.saveCustomQuestions();
        }
    }
    
    /**
     * 📊 الحصول على إحصائيات السؤال
     */
    getQuestionStats(questionId) {
        return this.questionStats[questionId] || {
            timesAsked: 0,
            timesCorrect: 0,
            correctRate: 0
        };
    }
    
    /**
     * 📈 تحديث إحصائيات الفئة
     */
    updateCategoryStats(category, increment = 1) {
        if (this.categories[category]) {
            this.categories[category].questionCount += increment;
        }
    }
    
    /**
     * 💾 حفظ الأسئلة المخصصة
     */
    saveCustomQuestions() {
        try {
            localStorage.setItem('custom_questions', JSON.stringify(this.customQuestions));
        } catch (error) {
            console.error("❌ خطأ في حفظ الأسئلة المخصصة:", error);
        }
    }
    
    /**
     * 💾 حفظ الإحصائيات
     */
    saveStatistics() {
        try {
            localStorage.setItem('question_statistics', JSON.stringify(this.questionStats));
        } catch (error) {
            console.error("❌ خطأ في حفظ الإحصائيات:", error);
        }
    }
    
    /**
     * 💾 نسخ احتياطي للأسئلة
     */
    backupQuestions() {
        try {
            const backupData = {
                customQuestions: this.customQuestions,
                questionStats: this.questionStats,
                timestamp: new Date().toISOString()
            };
            
            // حفظ نسخة احتياطية
            const backups = JSON.parse(localStorage.getItem('question_backups') || '[]');
            backups.push(backupData);
            
            // الحفاظ على آخر 10 نسخ فقط
            if (backups.length > 10) {
                backups.shift();
            }
            
            localStorage.setItem('question_backups', JSON.stringify(backups));
            
            console.log("💾 تم إنشاء نسخة احتياطية للأسئلة");
            return true;
        } catch (error) {
            console.error("❌ خطأ في النسخ الاحتياطي:", error);
            return false;
        }
    }
    
    /**
     * 🔄 استعادة نسخة احتياطية
     */
    restoreBackup(backupIndex = -1) {
        try {
            const backups = JSON.parse(localStorage.getItem('question_backups') || '[]');
            
            if (backups.length === 0) {
                return {
                    success: false,
                    message: 'لا توجد نسخ احتياطية'
                };
            }
            
            // استخدام أحدث نسخة إذا لم يتم تحديد نسخة
            const index = backupIndex === -1 ? backups.length - 1 : backupIndex;
            
            if (index < 0 || index >= backups.length) {
                return {
                    success: false,
                    message: 'رقم النسخة غير صحيح'
                };
            }
            
            const backup = backups[index];
            
            // استعادة البيانات
            this.customQuestions = backup.customQuestions || [];
            this.questionStats = backup.questionStats || {};
            
            // حفظ البيانات المستعادة
            this.saveCustomQuestions();
            this.saveStatistics();
            
            console.log(`🔄 تم استعادة النسخة الاحتياطية من ${backup.timestamp}`);
            
            return {
                success: true,
                message: 'تم استعادة النسخة الاحتياطية بنجاح',
                timestamp: backup.timestamp,
                questionCount: this.customQuestions.length
            };
        } catch (error) {
            console.error("❌ خطأ في استعادة النسخة الاحتياطية:", error);
            return {
                success: false,
                message: 'حدث خطأ أثناء الاستعادة'
            };
        }
    }
    
    /**
     * 📥 تصدير الأسئلة
     */
    exportQuestions(format = 'json') {
        const data = {
            customQuestions: this.customQuestions,
            questionStats: this.questionStats,
            categories: this.categories,
            exportDate: new Date().toISOString(),
            totalQuestions: this.customQuestions.length + this.questions.length
        };
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            return this.convertToCSV(data);
        }
        
        return null;
    }
    
    /**
     * 📤 استيراد الأسئلة
     */
    importQuestions(data, merge = true) {
        try {
            const imported = typeof data === 'string' ? JSON.parse(data) : data;
            
            if (merge) {
                // دمج الأسئلة
                this.customQuestions = [...this.customQuestions, ...(imported.customQuestions || [])];
                
                // دمج الإحصائيات
                this.questionStats = { ...this.questionStats, ...(imported.questionStats || {}) };
            } else {
                // استبدال الأسئلة
                this.customQuestions = imported.customQuestions || [];
                this.questionStats = imported.questionStats || {};
            }
            
            // حفظ البيانات
            this.saveCustomQuestions();
            this.saveStatistics();
            
            console.log(`📤 تم استيراد ${imported.customQuestions?.length || 0} سؤال`);
            
            return {
                success: true,
                message: 'تم استيراد الأسئلة بنجاح',
                importedCount: imported.customQuestions?.length || 0
            };
        } catch (error) {
            console.error("❌ خطأ في استيراد الأسئلة:", error);
            return {
                success: false,
                message: 'خطأ في تنسيق البيانات'
            };
        }
    }
    
    /**
     * 📝 تحويل إلى CSV
     */
    convertToCSV(data) {
        let csv = 'ID,Question,Option1,Option2,Option3,Option4,CorrectAnswer,Category,Difficulty,Explanation,Tags\n';
        
        data.customQuestions.forEach(q => {
            const row = [
                q.id,
                `"${q.question.replace(/"/g, '""')}"`,
                `"${q.options[0].replace(/"/g, '""')}"`,
                `"${q.options[1].replace(/"/g, '""')}"`,
                `"${q.options[2].replace(/"/g, '""')}"`,
                `"${q.options[3].replace(/"/g, '""')}"`,
                q.correctAnswer,
                q.category,
                q.difficulty,
                `"${(q.explanation || '').replace(/"/g, '""')}"`,
                `"${(q.tags || []).join(',')}"`
            ];
            
            csv += row.join(',') + '\n';
        });
        
        return csv;
    }
    
    /**
     * 📊 الحصول على تقرير النظام
     */
    getSystemReport() {
        const totalQuestions = this.questions.length + this.customQuestions.length;
        const totalCategories = Object.keys(this.categories).length;
        
        // إحصائيات الفئات
        const categoryStats = {};
        Object.keys(this.categories).forEach(category => {
            const count = this.getQuestionsByCategory(category).length;
            categoryStats[category] = {
                ...this.categories[category],
                actualCount: count,
                percentage: ((count / totalQuestions) * 100).toFixed(1)
            };
        });
        
        // الأسئلة الأكثر استخداماً
        const mostUsedQuestions = Object.entries(this.questionStats)
            .sort((a, b) => b[1].timesAsked - a[1].timesAsked)
            .slice(0, 10)
            .map(([id, stats]) => {
                const question = this.findQuestion(parseInt(id));
                return {
                    id: parseInt(id),
                    question: question ? question.question.substring(0, 50) + '...' : 'غير معروف',
                    timesAsked: stats.timesAsked,
                    correctRate: stats.correctRate
                };
            });
        
        // الأسئلة الأصعب (أقل نسبة نجاح)
        const hardestQuestions = Object.entries(this.questionStats)
            .filter(([_, stats]) => stats.timesAsked >= 5)
            .sort((a, b) => a[1].correctRate - b[1].correctRate)
            .slice(0, 10)
            .map(([id, stats]) => {
                const question = this.findQuestion(parseInt(id));
                return {
                    id: parseInt(id),
                    question: question ? question.question.substring(0, 50) + '...' : 'غير معروف',
                    correctRate: stats.correctRate,
                    timesAsked: stats.timesAsked
                };
            });
        
        return {
            summary: {
                total
