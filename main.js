document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeSwitch = document.getElementById('checkbox');
    const languageSelector = document.getElementById('language-selector');

    const translations = {
        ko: {
            title: "로또 번호 생성기",
            header: "로또 번호 생성기",
            generateBtn: "번호 생성"
        },
        en: {
            title: "Lotto Number Generator",
            header: "Lotto Number Generator",
            generateBtn: "Generate Numbers"
        },
        ja: {
            title: "ロト番号生成器",
            header: "ロト番号生成器",
            generateBtn: "番号生成"
        },
        zh: {
            title: "乐透号码生成器",
            header: "乐透号码生成器",
            generateBtn: "生成号码"
        }
    };

    function setLanguage(lang) {
        if (!translations[lang]) return;
        
        document.title = translations[lang].title;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        languageSelector.value = lang;
    }

    languageSelector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Detect and apply language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) {
            setLanguage(browserLang);
        } else {
            setLanguage('ko'); // Default
        }
    }

    // Theme switch logic
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply saved theme on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    } else {
        // Default to light theme if no preference is saved
        document.documentElement.setAttribute('data-theme', 'light');
    }


    generateBtn.addEventListener('click', () => {
        lottoNumbersContainer.innerHTML = '';
        const numbers = generateLottoNumbers();
        numbers.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numberElement.style.animationDelay = `${index * 0.1}s`;
            lottoNumbersContainer.appendChild(numberElement);
        });
    });

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});
