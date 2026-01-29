// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/3kMbg5uA9/";

let model, labelContainer, maxPredictions;
let currentLang = 'ko'; // Default language

// Translations
const translations = {
    ko: {
        logo: "동물상 테스트",
        nav: { test: "테스트하기", features: "특징 알아보기", faq: "FAQ" },
        header: { title: "나와 닮은 동물은 누구?", subtitle: "인공지능이 당신의 관상을 분석해드립니다.<br>강아지상일까요? 아니면 고양이상일까요?" },
        upload: { text: "얼굴 사진을 이곳에 올려주세요", subtext: "사진 데이터는 절대 서버로 전송되지 않습니다." },
        btn: { start: "분석 시작하기", retry: "다시 하기", share: "공유하기" },
        result: { title: "테스트 결과", dog: "강아지상", cat: "고양이상" },
        loading: { text: "AI가 얼굴을 분석하고 있습니다..." },
        ad: { sponsored: "Sponsored" },
        features: {
            title: "🐶 강아지상 vs 🐱 고양이상 특징",
            dog: {
                title: "🐶 멍뭉미 넘치는 강아지상",
                desc: "순둥순둥하고 귀여운 매력의 소유자입니다. 눈꼬리가 살짝 처져 있어 선하고 부드러운 인상을 주며, 웃을 때 반달눈이 되어 주변 사람들을 무장해제 시킵니다. 친화력이 좋고 다정다감해 어디서나 사랑받는 인기쟁이!",
                list1: "동그랗고 맑은 큰 눈망울",
                list2: "살짝 처진 순한 눈꼬리",
                list3: "부드럽고 둥근 얼굴 라인"
            },
            cat: {
                title: "🐱 시크도도 매력 고양이상",
                desc: "세련되고 도시적인 분위기의 소유자입니다. 눈꼬리가 살짝 올라가 있어 도도하고 섹시한 느낌을 주며, 뚜렷한 이목구비로 화려한 인상을 남깁니다. 차가워 보이지만 알면 알수록 빠져드는 반전 매력의 츤데레 스타일!",
                list1: "가로로 길고 매혹적인 눈매",
                list2: "살짝 올라간 매력적인 눈꼬리",
                list3: "날렵하고 갸름한 턱선"
            }
        },
        faq: {
            title: "자주 묻는 질문 (FAQ)",
            q1: "Q. 제 사진이 다른 곳에 저장되나요?",
            a1: "A. 절대 저장되지 않습니다! 🙅‍♂️ 이 테스트는 여러분의 브라우저(클라이언트) 내에서만 작동합니다. 사진 데이터가 서버로 전송되거나 저장되지 않으니 개인정보 걱정 없이 안심하고 즐기셔도 됩니다.",
            q2: "Q. 결과는 얼마나 정확한가요?",
            a2: "A. 구글의 인공지능 학습 모델을 기반으로 분석하지만, 사진의 각도나 조명, 표정에 따라 결과가 달라질 수 있습니다. 📸 정확한 분석보다는 재미로 가볍게 즐겨주세요!"
        },
        footer: { privacy: "개인정보처리방침", terms: "이용약관", copyright: "&copy; 2024 AI Animal Test. Powered by Teachable Machine & TensorFlow.js" },
        alert: { error: "모델을 불러오는 중 오류가 발생했습니다.", predictError: "이미지 분석 중 오류가 발생했습니다.", copied: "링크가 복사되었습니다!" }
    },
    en: {
        logo: "Animal Face Test",
        nav: { test: "Test", features: "Features", faq: "FAQ" },
        header: { title: "Which Animal Do You Look Like?", subtitle: "AI analyzes your face.<br>Are you a Dog type or a Cat type?" },
        upload: { text: "Upload your photo here", subtext: "Photos are processed locally and NEVER sent to a server." },
        btn: { start: "Start Analysis", retry: "Try Again", share: "Share" },
        result: { title: "Test Results", dog: "Dog Type", cat: "Cat Type" },
        loading: { text: "AI is analyzing your face..." },
        ad: { sponsored: "Sponsored" },
        features: {
            title: "🐶 Dog Type vs 🐱 Cat Type",
            dog: {
                title: "🐶 Puppy-like Dog Type",
                desc: "You have a gentle and cute charm. With slightly drooping eyes, you give a kind impression. Your smile melts hearts, and your friendly nature makes you popular everywhere!",
                list1: "Big, round, and clear eyes",
                list2: "Slightly drooping, gentle eye corners",
                list3: "Soft and round face line"
            },
            cat: {
                title: "🐱 Chic & Haughty Cat Type",
                desc: "You have a sophisticated and urban vibe. Slightly upturned eyes give you a sexy and haughty look. You might seem cold at first, but you have a surprising 'tsundere' charm!",
                list1: "Long and seductive eyes",
                list2: "Slightly upturned, charming eye corners",
                list3: "Sharp and sleek jawline"
            }
        },
        faq: {
            title: "Frequently Asked Questions (FAQ)",
            q1: "Q. Is my photo saved anywhere?",
            a1: "A. Absolutely NOT! 🙅‍♂️ This test runs entirely in your browser. Your photo data is never sent to a server, so you can use it safely.",
            q2: "Q. How accurate is the result?",
            a2: "A. It uses Google's AI model trained on many celebrity photos. Results may vary depending on lighting and angle. 📸 Please enjoy it for fun!"
        },
        footer: { privacy: "Privacy Policy", terms: "Terms of Service", copyright: "&copy; 2024 AI Animal Test. Powered by Teachable Machine & TensorFlow.js" },
        alert: { error: "Error loading model.", predictError: "Error analyzing image.", copied: "Link copied to clipboard!" }
    }
};

// DOM Elements
const imageInput = document.getElementById('image-input');
const dropZone = document.getElementById('drop-zone');
const imagePreview = document.getElementById('image-preview');
const uploadContent = document.getElementById('upload-content');
const predictBtn = document.getElementById('predict-btn');
const resultSection = document.getElementById('result-section');
const retryBtn = document.getElementById('retry-btn');
const loading = document.getElementById('loading');
const labelsDiv = document.getElementById('label-container');
const langToggle = document.getElementById('lang-toggle');

// Language Handling
function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('userLang', lang); // Save preference
    
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const keys = key.split('.');
        let text = translations[lang];
        keys.forEach(k => {
            if (text) text = text[k];
        });
        if (text) el.innerHTML = text;
    });
}

function initLanguage() {
    const savedLang = localStorage.getItem('userLang');
    const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
    const initialLang = savedLang || browserLang;
    updateLanguage(initialLang);
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'ko' ? 'en' : 'ko';
        updateLanguage(newLang);
    });
}

// Only run if we are on the main page
if (imageInput) {
    initLanguage(); // Initialize language

    // Load the image model
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        try {
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            console.log("Model loaded successfully");
            
            // Check for shared result URL params AFTER model is loaded
            checkUrlParams();

        } catch (error) {
            console.error("Error loading model:", error);
            alert(translations[currentLang].alert.error);
        }
    }

    function checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        // Example URL: ?dog=80&cat=20
        // We look for 'Dog' and 'Cat' params (case insensitive handling is tricky, so assume lowercase keys from sharing)
        
        const dogProb = params.get('dog');
        const catProb = params.get('cat');

        if (dogProb && catProb) {
            // Construct a fake prediction array
            const prediction = [
                { className: 'Dog', probability: parseFloat(dogProb) / 100 },
                { className: 'Cat', probability: parseFloat(catProb) / 100 }
            ];
            
            // Hide upload, show results
            uploadContent.hidden = true;
            imageInput.disabled = true; // Prevent interaction during view mode
            dropZone.style.display = 'none'; // Optional: hide dropzone completely
            predictBtn.style.display = 'none';
            
            displayResults(prediction);
            
            // Add a "Try it yourself" message or adjust UI slightly? 
            // For now, the "Retry" button handles "Try again" which resets everything.
        }
    }

    // Handle Image Upload
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    dropZone.addEventListener('click', () => {
        console.log("Drop zone clicked, triggering input click");
        imageInput.click();
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary-color)';
        dropZone.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--gray)';
        dropZone.style.backgroundColor = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.hidden = false;
            uploadContent.hidden = true;
            predictBtn.disabled = false;
            resultSection.hidden = true;
        };
        reader.readAsDataURL(file);
    }

    // Predict Function
    async function predict() {
        if (!model) {
            await init();
        }

        loading.hidden = false;
        predictBtn.disabled = true;

        // Wait a bit for the UI to update
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const prediction = await model.predict(imagePreview);
            displayResults(prediction);
        } catch (error) {
            console.error("Prediction error:", error);
            alert(translations[currentLang].alert.predictError);
        } finally {
            loading.hidden = true;
            predictBtn.disabled = false;
        }
    }

    function displayResults(prediction) {
        labelsDiv.innerHTML = '';
        resultSection.hidden = false;

        // Sort prediction by probability
        prediction.sort((a, b) => b.probability - a.probability);
        
        // Prepare data for sharing (keep track of probabilities)
        let shareParams = new URLSearchParams();

        prediction.forEach(p => {
            // Localization for labels
            let labelKey = p.className.toLowerCase(); // 'dog' or 'cat'
            let classTitle = translations[currentLang].result[labelKey] || p.className;
            
            const colorClass = p.className.toLowerCase();
            const probability = (p.probability * 100).toFixed(1);
            
            // Add to share params
            shareParams.set(labelKey, probability);

            const resultBar = document.createElement('div');
            resultBar.className = 'result-bar-wrapper';
            resultBar.innerHTML = `
                <div class="label-name">
                    <span>${classTitle}</span>
                    <span class="percent">${probability}%</span>
                </div>
                <div class="bar-container">
                    <div class="bar ${colorClass}" style="width: 0%"></div>
                </div>
            `;
            labelsDiv.appendChild(resultBar);

            // Animate bar
            setTimeout(() => {
                resultBar.querySelector('.bar').style.width = `${probability}%`;
            }, 100);
        });

        // Store current result URL for sharing
        window.currentShareUrl = `${window.location.origin}${window.location.pathname}?${shareParams.toString()}`;

        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    predictBtn.addEventListener('click', predict);
    retryBtn.addEventListener('click', () => {
        // Reset everything including URL params
        window.history.pushState({}, document.title, window.location.pathname);
        location.reload(); // Simple way to reset state completely
    });

    // Initialize model on load
    init();
}

// Social Share Functionality
const shareNative = document.getElementById('share-native');
const shareTwitter = document.getElementById('share-twitter');
const shareFacebook = document.getElementById('share-facebook');
const shareCopy = document.getElementById('share-copy');

if (shareTwitter && shareFacebook && shareCopy) {
    
    function getShareData() {
        // If we have a calculated result URL, use it. Otherwise use default.
        const url = window.currentShareUrl || window.location.href;
        return {
            title: translations[currentLang].logo,
            text: translations[currentLang].header.subtitle.replace('<br>', ' '),
            url: url
        };
    }

    // Check for native share support
    if (navigator.share && shareNative) {
        shareNative.style.display = 'flex';
        shareNative.addEventListener('click', async () => {
            try {
                await navigator.share(getShareData());
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    }

    shareTwitter.addEventListener('click', () => {
        const data = getShareData();
        const text = encodeURIComponent(data.text);
        const url = encodeURIComponent(data.url);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    });

    shareFacebook.addEventListener('click', () => {
        const data = getShareData();
        const url = encodeURIComponent(data.url);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    });

    shareCopy.addEventListener('click', async () => {
        const data = getShareData();
        try {
            await navigator.clipboard.writeText(data.url);
            alert(translations[currentLang].alert.copied);
        } catch (err) {
            console.error('Failed to copy: ', err);
            prompt('Copy this link:', data.url);
        }
    });
}