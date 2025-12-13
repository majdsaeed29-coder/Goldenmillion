/**
 * 🔊 نظام الصوت الخارق - المليونير الذهبي
 * نظام صوتي متكامل مع مؤثرات وموسيقى حماسية
 */

class SoundManager {
    constructor() {
        console.log("🔊 بدء تشغيل نظام الصوت الخارق...");
        
        // المتغيرات الأساسية
        this.sounds = {};
        this.music = {};
        this.volume = 0.7;
        this.masterVolume = 0.7;
        this.muted = false;
        this.vibrateEnabled = true;
        this.currentMusic = null;
        this.soundCache = {};
        this.isInitialized = false;
        
        // إعدادات الصوت
        this.settings = this.loadSettings();
        
        // قائمة الأصوات
        this.soundList = {
            // المؤثرات الأساسية
            'click': { url: 'sounds/click.mp3', volume: 0.4, type: 'effect' },
            'hover': { url: 'sounds/hover.mp3', volume: 0.3, type: 'effect' },
            'notification': { url: 'sounds/notification.mp3', volume: 0.5, type: 'effect' },
            'success': { url: 'sounds/success.mp3', volume: 0.6, type: 'effect' },
            'error': { url: 'sounds/error.mp3', volume: 0.6, type: 'effect' },
            'coins': { url: 'sounds/coins.mp3', volume: 0.7, type: 'effect' },
            'level_up': { url: 'sounds/level_up.mp3', volume: 0.8, type: 'effect' },
            'game_start': { url: 'sounds/game_start.mp3', volume: 0.9, type: 'effect' },
            'game_over': { url: 'sounds/game_over.mp3', volume: 0.8, type: 'effect' },
            
            // أصوات اللعبة
            'correct': { url: 'sounds/correct.mp3', volume: 0.9, type: 'game' },
            'wrong': { url: 'sounds/wrong.mp3', volume: 0.9, type: 'game' },
            'timer': { url: 'sounds/timer.mp3', volume: 0.5, type: 'game' },
            'timer_warning': { url: 'sounds/timer_warning.mp3', volume: 0.6, type: 'game' },
            'lifeline': { url: 'sounds/lifeline.mp3', volume: 0.7, type: 'game' },
            'skip': { url: 'sounds/skip.mp3', volume: 0.6, type: 'game' },
            'withdraw': { url: 'sounds/withdraw.mp3', volume: 0.7, type: 'game' },
            'win': { url: 'sounds/win.mp3', volume: 1.0, type: 'game' },
            'lose': { url: 'sounds/lose.mp3', volume: 0.8, type: 'game' },
            'million': { url: 'sounds/million.mp3', volume: 1.0, type: 'game' },
            
            // أصوات المتجر
            'purchase': { url: 'sounds/purchase.mp3', volume: 0.7, type: 'shop' },
            'unlock': { url: 'sounds/unlock.mp3', volume: 0.8, type: 'shop' },
            'upgrade': { url: 'sounds/upgrade.mp3', volume: 0.7, type: 'shop' },
            
            // أصوات المستخدم
            'login': { url: 'sounds/login.mp3', volume: 0.6, type: 'user' },
            'register': { url: 'sounds/register.mp3', volume: 0.6, type: 'user' },
            'logout': { url: 'sounds/logout.mp3', volume: 0.5, type: 'user' },
            
            // الموسيقى الخلفية
            'bg_menu': { url: 'music/menu.mp3', volume: 0.4, type: 'music', loop: true },
            'bg_game': { url: 'music/game.mp3', volume: 0.3, type: 'music', loop: true },
            'bg_tension': { url: 'music/tension.mp3', volume: 0.5, type: 'music', loop: true },
            'bg_victory': { url: 'music/victory.mp3', volume: 0.6, type: 'music', loop: true },
            'bg_shop': { url: 'music/shop.mp3', volume: 0.3, type: 'music', loop: true }
        };
        
        // تهيئة النظام
        this.init();
    }
    
    /**
     * 🚀 تهيئة نظام الصوت
     */
    async init() {
        try {
            console.log("🎵 جاري تحميل الأصوات...");
            
            // تحميل الأصوات الأساسية أولاً
            await this.loadEssentialSounds();
            
            // إنشاء سياق الصوت
            this.createAudioContext();
            
            this.isInitialized = true;
            console.log("✅ تم تهيئة نظام الصوت بنجاح");
            
            // تشغيل صوت بداية النظام
            this.play('notification');
            
        } catch (error) {
            console.error("❌ خطأ في تهيئة نظام الصوت:", error);
            this.isInitialized = false;
        }
    }
    
    /**
     * 📥 تحميل الأصوات الأساسية
     */
    async loadEssentialSounds() {
        const essentialSounds = ['click', 'notification', 'success', 'error'];
        
        for (const soundName of essentialSounds) {
            await this.loadSound(soundName);
        }
    }
    
    /**
     * 📦 تحميل صوت معين
     */
    async loadSound(soundName) {
        if (this.sounds[soundName] || this.soundCache[soundName]) {
            return true;
        }
        
        const soundConfig = this.soundList[soundName];
        if (!soundConfig) {
            console.warn(`⚠️ الصوت غير موجود: ${soundName}`);
            return false;
        }
        
        try {
            // إنشاء كائن الصوت
            const audio = new Audio();
            audio.src = soundConfig.url;
            audio.volume = soundConfig.volume * this.volume;
            audio.preload = 'auto';
            
            // تخزين في الكاش
            this.soundCache[soundName] = {
                audio: audio,
                config: soundConfig,
                loaded: false
            };
            
            // انتظار التحميل
            await new Promise((resolve, reject) => {
                audio.addEventListener('canplaythrough', () => {
                    this.soundCache[soundName].loaded = true;
                    resolve();
                });
                
                audio.addEventListener('error', (error) => {
                    console.error(`❌ خطأ في تحميل الصوت ${soundName}:`, error);
                    reject(error);
                });
                
                // محاولة تحميل
                audio.load();
            });
            
            console.log(`✅ تم تحميل الصوت: ${soundName}`);
            return true;
            
        } catch (error) {
            console.error(`❌ فشل تحميل الصوت ${soundName}:`, error);
            return false;
        }
    }
    
    /**
     * 🎛️ إنشاء سياق الصوت المتقدم
     */
    createAudioContext() {
        try {
            // إنشاء AudioContext إذا كان المتصفح يدعمه
            if (window.AudioContext || window.webkitAudioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // إنشاء GainNode للتحكم في الصوت
                this.gainNode = this.audioContext.createGain();
                this.gainNode.connect(this.audioContext.destination);
                this.gainNode.gain.value = this.masterVolume;
                
                console.log("🎛️ تم إنشاء سياق الصوت المتقدم");
            }
        } catch (error) {
            console.warn("⚠️ لا يمكن إنشاء سياق الصوت المتقدم:", error);
            this.audioContext = null;
        }
    }
    
    /**
     * 🔊 تشغيل صوت
     */
    play(soundName, options = {}) {
        // التحقق إذا كان الصوت معطل
        if (this.muted || !this.isInitialized) {
            return null;
        }
        
        // خيارات التشغيل
        const {
            volume = 1.0,
            rate = 1.0,
            loop = false,
            onEnd = null
        } = options;
        
        // البحث عن الصوت في الكاش
        const soundData = this.soundCache[soundName];
        if (!soundData || !soundData.loaded) {
            console.warn(`⚠️ الصوت غير جاهز: ${soundName}`);
            
            // محاولة تحميله
            this.loadSound(soundName);
            return null;
        }
        
        try {
            // استنساخ الصوت للسماح بتشغيل متعدد
            const audio = soundData.audio.cloneNode();
            audio.volume = soundData.config.volume * this.volume * volume;
            audio.playbackRate = rate;
            audio.loop = loop;
            
            // تشغيل الصوت
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log(`▶️ تشغيل الصوت: ${soundName}`);
                    
                    // إضافة اهتزاز إذا كان مفعلاً
                    if (this.vibrateEnabled && soundData.config.type === 'game') {
                        this.vibrate(soundName);
                    }
                    
                    // حدث الانتهاء
                    audio.onended = () => {
                        if (onEnd) onEnd();
                    };
                    
                }).catch(error => {
                    console.error(`❌ خطأ في تشغيل الصوت ${soundName}:`, error);
                });
            }
            
            return audio;
            
        } catch (error) {
            console.error(`❌ استثناء في تشغيل الصوت ${soundName}:`, error);
            return null;
        }
    }
    
    /**
     * 📳 إضافة اهتزاز
     */
    vibrate(soundName) {
        if (!navigator.vibrate || !this.vibrateEnabled) return;
        
        const vibrationPatterns = {
            'correct': [100, 50, 100],
            'wrong': [200, 100, 200],
            'level_up': [50, 150, 50, 150],
            'win': [100, 50, 100, 50, 100],
            'timer_warning': [100],
            'notification': [50]
        };
        
        const pattern = vibrationPatterns[soundName];
        if (pattern) {
            navigator.vibrate(pattern);
        }
    }
    
    /**
     * 🎼 تشغيل الموسيقى الخلفية
     */
    playMusic(musicName, options = {}) {
        const {
            fadeIn = true,
            fadeDuration = 1000,
            volume = 1.0
        } = options;
        
        // إيقاف الموسيقى الحالية
        this.stopMusic();
        
        // تحميل الموسيقى إذا لم تكن محملة
        this.loadSound(musicName).then(() => {
            const musicData = this.soundCache[musicName];
            if (!musicData) return;
            
            // تشغيل الموسيقى
            const audio = this.play(musicName, {
                volume: volume,
                loop: true
            });
            
            if (audio) {
                this.currentMusic = {
                    audio: audio,
                    name: musicName,
                    volume: volume
                };
                
                // تأثير التلاشي
                if (fadeIn) {
                    this.fadeIn(audio, fadeDuration);
                }
                
                console.log(`🎼 تشغيل الموسيقى: ${musicName}`);
            }
        });
    }
    
    /**
     * ⏸️ إيقاف الموسيقى
     */
    stopMusic(fadeOut = true, fadeDuration = 1000) {
        if (!this.currentMusic) return;
        
        const { audio, name } = this.currentMusic;
        
        if (fadeOut && audio) {
            this.fadeOut(audio, fadeDuration).then(() => {
                audio.pause();
                audio.currentTime = 0;
            });
        } else if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        console.log(`⏸️ إيقاف الموسيقى: ${name}`);
        this.currentMusic = null;
    }
    
    /**
     * 🔄 تبديل الموسيقى
     */
    toggleMusic() {
        if (this.currentMusic) {
            this.stopMusic();
            return false;
        } else {
            this.playMusic('bg_menu');
            return true;
        }
    }
    
    /**
     * 🔉 تغيير مستوى الصوت
     */
    setVolume(volume) {
        const newVolume = Math.max(0, Math.min(1, volume));
        this.volume = newVolume;
        this.masterVolume = newVolume;
        
        // تحديث مستوى الصوت لجميع الأصوات المحملة
        Object.values(this.soundCache).forEach(soundData => {
            if (soundData.audio) {
                soundData.audio.volume = soundData.config.volume * this.volume;
            }
        });
        
        // تحديث مستوى الصوت للموسيقى الحالية
        if (this.currentMusic && this.currentMusic.audio) {
            this.currentMusic.audio.volume = this.currentMusic.volume * this.volume;
        }
        
        // تحديث مستوى GainNode إذا كان موجوداً
        if (this.gainNode) {
            this.gainNode.gain.value = this.masterVolume;
        }
        
        this.saveSettings();
        console.log(`🔉 تغيير مستوى الصوت إلى: ${Math.round(newVolume * 100)}%`);
    }
    
    /**
     * 🔇 كتم/إعادة الصوت
     */
    toggleMute() {
        this.muted = !this.muted;
        
        if (this.muted) {
            this.stopMusic(false);
            console.log("🔇 كتم الصوت");
        } else {
            console.log("🔊 إعادة الصوت");
        }
        
        this.saveSettings();
        return this.muted;
    }
    
    /**
     * 📳 تبديل الاهتزاز
     */
    toggleVibration() {
        this.vibrateEnabled = !this.vibrateEnabled;
        this.saveSettings();
        console.log(`📳 الاهتزاز: ${this.vibrateEnabled ? 'مفعل' : 'معطل'}`);
        return this.vibrateEnabled;
    }
    
    /**
     * 🎚️ تأثير التلاشي الدخول
     */
    fadeIn(audio, duration = 1000) {
        if (!audio) return;
        
        audio.volume = 0;
        const targetVolume = this.volume;
        const step = targetVolume / (duration / 50);
        let currentVolume = 0;
        
        const fadeInterval = setInterval(() => {
            currentVolume += step;
            if (currentVolume >= targetVolume) {
                audio.volume = targetVolume;
                clearInterval(fadeInterval);
            } else {
                audio.volume = currentVolume;
            }
        }, 50);
    }
    
    /**
     * 🎚️ تأثير التلاشي الخروج
     */
    fadeOut(audio, duration = 1000) {
        return new Promise((resolve) => {
            if (!audio) {
                resolve();
                return;
            }
            
            const startVolume = audio.volume;
            const step = startVolume / (duration / 50);
            let currentVolume = startVolume;
            
            const fadeInterval = setInterval(() => {
                currentVolume -= step;
                if (currentVolume <= 0) {
                    audio.volume = 0;
                    clearInterval(fadeInterval);
                    resolve();
                } else {
                    audio.volume = currentVolume;
                }
            }, 50);
        });
    }
    
    /**
     * 💾 حفظ الإعدادات
     */
    saveSettings() {
        const settings = {
            volume: this.volume,
            muted: this.muted,
            vibrateEnabled: this.vibrateEnabled
        };
        
        localStorage.setItem('sound_settings', JSON.stringify(settings));
        console.log("💾 حفظ إعدادات الصوت");
    }
    
    /**
     * 📂 تحميل الإعدادات
     */
    loadSettings() {
        const saved = localStorage.getItem('sound_settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.volume = settings.volume || 0.7;
                this.muted = settings.muted || false;
                this.vibrateEnabled = settings.vibrateEnabled !== false;
                
                console.log("📂 تحميل إعدادات الصوت");
                return settings;
            } catch (error) {
                console.error("❌ خطأ في تحميل إعدادات الصوت:", error);
            }
        }
        
        return {
            volume: 0.7,
            muted: false,
            vibrateEnabled: true
        };
    }
    
    /**
     * ⏱️ تشغيل صوت العد التنازلي
     */
    playCountdown(seconds, onTick = null, onComplete = null) {
        if (this.muted) return;
        
        let count = seconds;
        const countdownInterval = setInterval(() => {
            if (count <= 0) {
                clearInterval(countdownInterval);
                if (onComplete) onComplete();
            } else {
                this.play('timer');
                if (count <= 5) {
                    this.play('timer_warning');
                }
                
                if (onTick) onTick(count);
                count--;
            }
        }, 1000);
        
        return countdownInterval;
    }
    
    /**
     * 🎯 تشغيل صوت بناءً على الحدث
     */
    playEventSound(eventName, data = {}) {
        const eventSounds = {
            'game_start': 'game_start',
            'game_win': 'win',
            'game_lose': 'lose',
            'game_million': 'million',
            'answer_correct': 'correct',
            'answer_wrong': 'wrong',
            'level_up': 'level_up',
            'lifeline_used': 'lifeline',
            'item_purchased': 'purchase',
            'user_login': 'login',
            'user_logout': 'logout',
            'notification': 'notification',
            'error': 'error',
            'success': 'success'
        };
        
        const soundName = eventSounds[eventName];
        if (soundName) {
            this.play(soundName, {
                volume: data.volume || 1.0
            });
        }
    }
    
    /**
     * 🎮 تشغيل مؤثرات اللعبة
     */
    playGameEffects(gameState) {
        if (!gameState || this.muted) return;
        
        // مؤثرات حسب حالة اللعبة
        if (gameState.isSafeHaven) {
            this.play('level_up', { volume: 0.8 });
        }
        
        if (gameState.timeLeft <= 10) {
            this.play('timer_warning', { volume: 0.6 });
        }
        
        // تغيير الموسيقى حسب التوتر
        if (gameState.currentLevel >= 10) {
            this.playMusic('bg_tension', { volume: 0.4 });
        }
    }
    
    /**
     * 🎵 إنشاء نغمة مخصصة
     */
    createTone(frequency = 440, duration = 0.5, type = 'sine') {
        if (!this.audioContext || this.muted) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.gainNode || this.audioContext.destination);
            
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(
                this.volume * 0.5,
                this.audioContext.currentTime + 0.01
            );
            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                this.audioContext.currentTime + duration
            );
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
            
        } catch (error) {
            console.error("❌ خطأ في إنشاء النغمة:", error);
        }
    }
    
    /**
     * 🎹 تشغيل لحن
     */
    playMelody(notes = []) {
        if (this.muted || !this.audioContext) return;
        
        let time = this.audioContext.currentTime;
        
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.createTone(note.frequency, note.duration, note.type || 'sine');
            }, index * 200);
        });
    }
    
    /**
     * 🎉 تشغيل لحن الفوز
     */
    playWinMelody() {
        const winMelody = [
            { frequency: 523.25, duration: 0.3 }, // C5
            { frequency: 659.25, duration: 0.3 }, // E5
            { frequency: 783.99, duration: 0.3 }, // G5
            { frequency: 1046.50, duration: 0.5 }, // C6
            { frequency: 1046.50, duration: 0.5 }, // C6
            { frequency: 1046.50, duration: 0.5 }  // C6
        ];
        
        this.playMelody(winMelody);
    }
    
    /**
     * 🚀 تشغيل لحن البدء
     */
    playStartMelody() {
        const startMelody = [
            { frequency: 261.63, duration: 0.2 }, // C4
            { frequency: 329.63, duration: 0.2 }, // E4
            { frequency: 392.00, duration: 0.2 }, // G4
            { frequency: 523.25, duration: 0.4 }  // C5
        ];
        
        this.playMelody(startMelody);
    }
    
    /**
     * 📊 الحصول على إحصائيات الصوت
     */
    getStats() {
        return {
            totalSounds: Object.keys(this.soundCache).length,
            loadedSounds: Object.values(this.soundCache).filter(s => s.loaded).length,
            currentMusic: this.currentMusic ? this.currentMusic.name : 'None',
            volume: Math.round(this.volume * 100),
            muted: this.muted,
            vibrateEnabled: this.vibrateEnabled,
            audioContext: !!this.audioContext
        };
    }
    
    /**
     * 🧹 تنظيف الذاكرة
     */
    cleanup() {
        // إيقاف جميع الأصوات
        Object.values(this.soundCache).forEach(soundData => {
            if (soundData.audio) {
                soundData.audio.pause();
                soundData.audio.currentTime = 0;
            }
        });
        
        // إيقاف الموسيقى الحالية
        this.stopMusic(false);
        
        // إغلاق AudioContext
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
        
        console.log("🧹 تنظيف ذاكرة الصوت");
    }
    
    /**
     * 🔄 إعادة التعيين
     */
    reset() {
        this.cleanup();
        this.sounds = {};
        this.music = {};
        this.soundCache = {};
        this.currentMusic = null;
        this.isInitialized = false;
        
        // إعادة التهيئة
        this.init();
        
        console.log("🔄 إعادة تعيين نظام الصوت");
    }
    
    /**
     * 🎧 اكتشاف سماعات الرأس
     */
    async detectHeadphones() {
        try {
            // هذه ميزة متقدمة قد لا تكون مدعومة في جميع المتصفحات
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false
                    } 
                });
                
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);
                
                // تحليل الصوت لاكتشاف السماعات
                await new Promise(resolve => setTimeout(resolve, 100));
                
                stream.getTracks().forEach(track => track.stop());
                audioContext.close();
                
                return { detected: true, usingHeadphones: false }; // التبسيط
            }
        } catch (error) {
            console.warn("⚠️ لا يمكن اكتشاف السماعات:", error);
        }
        
        return { detected: false, usingHeadphones: false };
    }
    
    /**
     * 🎚️ معادلة الصوت
     */
    createEqualizer() {
        if (!this.audioContext) return null;
        
        try {
            const eq = {
                bass: this.audioContext.createBiquadFilter(),
                mid: this.audioContext.createBiquadFilter(),
                treble: this.audioContext.createBiquadFilter()
            };
            
            eq.bass.type = 'lowshelf';
            eq.bass.frequency.value = 250;
            eq.bass.gain.value = 0;
            
            eq.mid.type = 'peaking';
            eq.mid.frequency.value = 1000;
            eq.mid.Q.value = 1;
            eq.mid.gain.value = 0;
            
            eq.treble.type = 'highshelf';
            eq.treble.frequency.value = 4000;
            eq.treble.gain.value = 0;
            
            // توصيل السلسلة
            eq.bass.connect(eq.mid);
            eq.mid.connect(eq.treble);
            eq.treble.connect(this.gainNode);
            
            return {
                setBass: (value) => eq.bass.gain.value = value,
                setMid: (value) => eq.mid.gain.value = value,
                setTreble: (value) => eq.treble.gain.value = value,
                connect: (source) => source.connect(eq.bass),
                disconnect: () => {
                    eq.bass.disconnect();
                    eq.mid.disconnect();
                    eq.treble.disconnect();
                }
            };
        } catch (error) {
            console.error("❌ خطأ في إنشاء المعادل:", error);
            return null;
        }
    }
    
    /**
     * 🔊 تأثير الصدى
     */
    createReverb() {
        if (!this.audioContext) return null;
        
        try {
            const convolver = this.audioContext.createConvolver();
            
            // إنشاء نبضة صدى بسيطة
            const sampleRate = this.audioContext.sampleRate;
            const length = sampleRate * 2;
            const impulse = this.audioContext.createBuffer(2, length, sampleRate);
            
            for (let channel = 0; channel < 2; channel++) {
                const channelData = impulse.getChannelData(channel);
                for (let i = 0; i < length; i++) {
                    channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
                }
            }
            
            convolver.buffer = impulse;
            convolver.connect(this.gainNode);
            
            return convolver;
        } catch (error) {
            console.error("❌ خطأ في إنشاء الصدى:", error);
            return null;
        }
    }
}

// تصدير المدير إذا كان في بيئة Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoundManager;
}

// للاستخدام في المتصفح
if (typeof window !== 'undefined') {
    window.SoundManager = SoundManager;
}

// Example usage:
/*
const soundManager = new SoundManager();
soundManager.init().then(() => {
    soundManager.play('click');
    soundManager.playMusic('bg_menu');
});
*/
