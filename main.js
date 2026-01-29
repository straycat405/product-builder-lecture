document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const recommendBtn = document.getElementById('recommend-btn');
    const dinnerMenuText = document.getElementById('dinner-menu-text');
    const themeSwitch = document.getElementById('checkbox');
    const languageSelector = document.getElementById('language-selector');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    const menus = {
        ko: ["김치찌개", "된장찌개", "삼겹살", "치킨", "피자", "초밥", "파스타", "떡볶이", "햄버거", "족발"],
        en: ["Kimchi Stew", "Soybean Paste Stew", "Grilled Pork Belly", "Fried Chicken", "Pizza", "Sushi", "Pasta", "Tteokbokki", "Hamburger", "Jokbal"],
        ja: ["キムチチゲ", "味噌チゲ", "サムギョプサル", "チキン", "ピザ", "寿司", "パスタ", "トッポッキ", "ハンバーガー", "豚足"],
        zh: ["泡菜汤", "大酱汤", "烤五花肉", "炸鸡", "比萨", "寿司", "意大利面", "辣炒年糕", "汉堡", "猪蹄"]
    };

    const menuImages = [
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Korean.cuisine-Kimchi_jjigae-01.jpg", // Kimchi Stew
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/Doenjang-jjigae.jpg", // Doenjang Stew
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Korean_Barbecue-Samgyeopsal-01.jpg", // Grilled Pork Belly
        "https://upload.wikimedia.org/wikipedia/commons/2/20/Korean_fried_chicken_3.jpg", // Fried Chicken
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg", // Pizza
        "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg", // Sushi
        "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tagliatelle_al_rag%C3%B9_%28pasta_bolognese%29.jpg", // Pasta
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Tteokbokki.JPG", // Tteokbokki
        "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg", // Hamburger
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Korean.food-Jokbal-01.jpg" // Jokbal
    ];

    const translations = {
        ko: {
            title: "로또 번호 생성기",
            header: "로또 번호 생성기",
            generateBtn: "번호 생성",
            tabLotto: "로또 생성기",
            tabRecipe: "두바이 초콜릿 쿠키",
            tabDinner: "저녁 메뉴 추천",
            dinnerTitle: "저녁 메뉴 추천",
            recommendBtn: "메뉴 추천",
            clickToRecommend: "버튼을 눌러주세요",
            recipeTitle: "두바이 쫀득 쿠키 레시피",
            ingredientsTitle: "재료",
            instructionsTitle: "만드는 법",
            ing1: "버터 100g",
            ing2: "설탕 80g",
            ing3: "밀가루 200g",
            ing4: "피스타치오 크림 50g",
            ing5: "카다이프면 30g",
            ing6: "초콜릿 칩 50g",
            step1: "버터를 부드럽게 풉니다.",
            step2: "설탕을 넣고 잘 섞습니다.",
            step3: "밀가루를 체 쳐 넣고 반죽합니다.",
            step4: "피스타치오 크림과 볶은 카다이프면을 섞습니다.",
            step5: "반죽 안에 필링을 넣고 동그랗게 빚습니다.",
            step6: "180도 오븐에서 12분간 굽습니다."
        },
        en: {
            title: "Lotto Number Generator",
            header: "Lotto Number Generator",
            generateBtn: "Generate Numbers",
            tabLotto: "Lotto Generator",
            tabRecipe: "Dubai Chocolate Cookie",
            tabDinner: "Dinner Recommendation",
            dinnerTitle: "Dinner Recommendation",
            recommendBtn: "Recommend Menu",
            clickToRecommend: "Click the button",
            recipeTitle: "Dubai Chewy Cookie Recipe",
            ingredientsTitle: "Ingredients",
            instructionsTitle: "Instructions",
            ing1: "Butter 100g",
            ing2: "Sugar 80g",
            ing3: "Flour 200g",
            ing4: "Pistachio Cream 50g",
            ing5: "Kataifi Pastry 30g",
            ing6: "Chocolate Chips 50g",
            step1: "Soften the butter.",
            step2: "Mix in the sugar well.",
            step3: "Sift in the flour and knead.",
            step4: "Mix pistachio cream and roasted Kataifi.",
            step5: "Fill the dough with the filling and shape it into a ball.",
            step6: "Bake at 180°C for 12 minutes."
        },
        ja: {
            title: "ロト番号生成器",
            header: "ロト番号生成器",
            generateBtn: "番号生成",
            tabLotto: "ロト生成器",
            tabRecipe: "ドバイチョコレートクッキー",
            tabDinner: "夕食メニュー推薦",
            dinnerTitle: "夕食メニュー推薦",
            recommendBtn: "メニュー推薦",
            clickToRecommend: "ボタンを押してください",
            recipeTitle: "ドバイもちもちクッキーレシピ",
            ingredientsTitle: "材料",
            instructionsTitle: "作り方",
            ing1: "バター 100g",
            ing2: "砂糖 80g",
            ing3: "小麦粉 200g",
            ing4: "ピスタチオクリーム 50g",
            ing5: "カダイフ麺 30g",
            ing6: "チョコチップ 50g",
            step1: "バターを柔らかくします。",
            step2: "砂糖を入れてよく混ぜます。",
            step3: "小麦粉をふるい入れてこねます。",
            step4: "ピスタチオクリームと炒めたカダイフを混ぜます。",
            step5: "生地の中にフィリングを入れて丸めます。",
            step6: "180度のオーブンで12分間焼きます。"
        },
        zh: {
            title: "乐透号码生成器",
            header: "乐透号码生成器",
            generateBtn: "生成号码",
            tabLotto: "乐透生成器",
            tabRecipe: "迪拜巧克力曲奇",
            tabDinner: "晚餐菜单推荐",
            dinnerTitle: "晚餐菜单推荐",
            recommendBtn: "推荐菜单",
            clickToRecommend: "请点击按钮",
            recipeTitle: "迪拜软糯曲奇食谱",
            ingredientsTitle: "材料",
            instructionsTitle: "做法",
            ing1: "黄油 100克",
            ing2: "糖 80克",
            ing3: "面粉 200克",
            ing4: "开心果酱 50克",
            ing5: "卡达伊夫面 30克",
            ing6: "巧克力碎 50克",
            step1: "将黄油软化。",
            step2: "加入糖充分混合。",
            step3: "筛入面粉并揉成面团。",
            step4: "混合开心果酱和炒过的卡达伊夫。",
            step5: "将馅料包入面团中并搓圆。",
            step6: "180度烤箱烤12分钟。"
        }
    };

    // Tab Switching Logic
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

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
    let currentLang = 'ko'; // Default
    if (savedLanguage) {
        currentLang = savedLanguage;
    } else {
        const browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) {
            currentLang = browserLang;
        }
    }
    setLanguage(currentLang);

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

    recommendBtn.addEventListener('click', () => {
        // Use current selected language or fallback to 'ko'
        const lang = languageSelector.value || 'ko';
        const menuList = menus[lang] || menus['ko'];
        const randomIndex = Math.floor(Math.random() * menuList.length);
        const randomMenu = menuList[randomIndex];
        const randomImage = menuImages[randomIndex];
        
        dinnerMenuText.textContent = randomMenu;

        // Handle Image
        let imgElement = document.getElementById('dinner-menu-img');
        if (!imgElement) {
            imgElement = document.createElement('img');
            imgElement.id = 'dinner-menu-img';
            imgElement.alt = "Dinner Menu Image";
            const displayContainer = document.getElementById('dinner-menu-display');
            displayContainer.insertBefore(imgElement, dinnerMenuText);
        }
        imgElement.src = randomImage;
        imgElement.style.display = 'block';
        
        // Add a small animation effect
        dinnerMenuText.style.opacity = 0;
        dinnerMenuText.style.transform = "translateY(10px)";
        imgElement.style.opacity = 0;
        imgElement.style.transform = "translateY(10px) scale(0.95)";

        setTimeout(() => {
            dinnerMenuText.style.transition = "all 0.3s ease";
            dinnerMenuText.style.opacity = 1;
            dinnerMenuText.style.transform = "translateY(0)";

            imgElement.style.transition = "all 0.5s ease";
            imgElement.style.opacity = 1;
            imgElement.style.transform = "translateY(0) scale(1)";
        }, 50);
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
