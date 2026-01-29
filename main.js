document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const themeSwitch = document.getElementById('checkbox');

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
