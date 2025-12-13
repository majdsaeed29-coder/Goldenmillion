/**
 * مدير الصوت والموسيقى للعبة
 */

class SoundManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.volume = 0.5;
        this.muted = false;
        this.vibrateEnabled = true;
        
        this.initSounds();
    }

    /**
     * تهيئة جميع الأصوات
     */
    initSounds() {
        // مؤثرات صوتية أساسية
        const soundEffects = {
            'correct': { url: 'assets/sounds/correct.mp3', volume: 0.7 },
            'wrong': { url: 'assets/sounds/wrong.mp3', volume: 0.7 },
            'click': { url: 'assets/sounds/click.mp3', volume: 0.3 },
            'level_up': { url: 'assets/sounds/level-up.mp3', volume: 0.6 },
            'lifeline': { url: 'assets/sounds/lifeline.mp3', volume: 0.5 },
            'win': { url: 'assets/sounds/win.mp3', volume: 0.8 },
            'lose': { url: 'assets/sounds/lose.mp3', volume: 0.6 },
            'timer': { url: 'assets/sounds/timer.mp3', volume: 0.4 }
        };

        // تحميل الأصوات
        for (const [key, config] of Object.entries(soundEffects)) {
            this.sounds[key] = new Audio(config.url);
            this.sounds[key].volume = config.volume * this.volume;
        }

        // الموسيقى الخلفية
        this.music = new Audio('assets/music/background.mp3');
        this.music.loop = true;
        this.music.volume = 0.3 * this.volume;
    }

    /**
     * تشغيل موسيقى الخلفية الحماسية
     */
    playBackgroundMusic() {
        if (this.muted || !this.music) return;
        
        this.music.currentTime = 0;
        this.music.play().catch(e => {
            console.log("تعذر تشغيل الموسيقى:", e);
        });
    }

    /**
     * إيقاف الموسيقى
     */
    stopBackgroundMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }

    /**
     * تشغيل صوت معين
     */
    play(soundName) {
        if (this.muted || !this.sounds[soundName]) return;
        
        try {
            const sound = this.sounds[soundName];
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.log(`تعذر تشغيل الصوت ${soundName}:`, e);
            });

            // إضافة اهتزاز إذا كان مفعلاً
            if (this.vibrateEnabled) {
                this.vibrate(soundName);
            }
        } catch (error) {
            console.error("خطأ في تشغيل الصوت:", error);
        }
    }

    /**
     * التحكم بالاهتزاز
     */
    vibrate(soundName) {
        if (!navigator.vibrate || !this.vibrateEnabled) return;

        const patterns = {
            'correct': [100, 50, 100], // اهتزاز النجاح
            'wrong': [200, 100, 200],  // اهتزاز الخطأ
            'level_up': [50, 150, 50, 150], // اهتزاز الترقية
            'win': [100, 50, 100, 50, 100, 50, 100] // اهتزاز الفوز
        };

        if (patterns[soundName]) {
            navigator.vibrate(patterns[soundName]);
        }
    }

    /**
     * تغيير مستوى الصوت
     */
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        
        // تحديث حجم جميع الأصوات
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
        
        if (this.music) {
            this.music.volume = 0.3 * this.volume;
        }
        
        // حفظ الإعدادات
        this.saveSettings();
    }

    /**
     * كتم/إعادة الصوت
     */
    toggleMute() {
        this.muted = !this.muted;
        
        if (this.muted) {
            this.stopBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
        
        this.saveSettings();
        return this.muted;
    }

    /**
     * تبديل الاهتزاز
     */
    toggleVibration() {
        this.vibrateEnabled = !this.vibrateEnabled;
        this.saveSettings();
        return this.vibrateEnabled;
    }

    /**
     * حفظ الإعدادات
     */
    saveSettings() {
        const settings = {
            volume: this.volume,
            muted: this.muted,
            vibrateEnabled: this.vibrateEnabled
        };
        
        localStorage.setItem('game_sound_settings', JSON.stringify(settings));
    }

    /**
     * تحميل الإعدادات
     */
    loadSettings() {
        const saved = localStorage.getItem('game_sound_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.volume = settings.volume || 0.5;
                this.muted = settings.muted || false;
                this.vibrateEnabled = settings.vibrateEnabled !== false;
                
                this.setVolume(this.volume);
            } catch (error) {
                console.error("خطأ في تحميل إعدادات الصوت:", error);
            }
        }
    }

    /**
     * تشغيل صوت العد التنازلي
     */
    playCountdown(seconds, callback) {
        if (this.muted) return;
        
        let count = seconds;
        const countdownInterval = setInterval(() => {
            if (count <= 0) {
                clearInterval(countdownInterval);
                if (callback) callback();
            } else {
                this.play('timer');
                count--;
            }
        }, 1000);
    }
}

// استخدام الملف:
// const soundManager = new SoundManager();
// soundManager.loadSettings();
// soundManager.playBackgroundMusic();
