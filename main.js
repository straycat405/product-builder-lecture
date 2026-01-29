// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/3kMbg5uA9/";

let model, labelContainer, maxPredictions;

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

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("모델을 불러오는 중 오류가 발생했습니다.");
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
        alert("이미지 분석 중 오류가 발생했습니다.");
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

    prediction.forEach(p => {
        const classTitle = p.className === 'Dog' ? '강아지상' : (p.className === 'Cat' ? '고양이상' : p.className);
        const colorClass = p.className.toLowerCase();
        const probability = (p.probability * 100).toFixed(1);

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

    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

predictBtn.addEventListener('click', predict);

// Social Share Functionality
const shareNative = document.getElementById('share-native');
const shareTwitter = document.getElementById('share-twitter');
const shareFacebook = document.getElementById('share-facebook');
const shareCopy = document.getElementById('share-copy');

const shareData = {
    title: '인공지능 동물상 테스트',
    text: '나는 강아지상일까? 고양이상일까? AI가 분석해주는 동물상 테스트! 🐾',
    url: window.location.href
};

// Check for native share support
if (navigator.share) {
    shareNative.style.display = 'flex';
    shareNative.addEventListener('click', async () => {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing:', err);
        }
    });
}

shareTwitter.addEventListener('click', () => {
    const text = encodeURIComponent(shareData.text);
    const url = encodeURIComponent(shareData.url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
});

shareFacebook.addEventListener('click', () => {
    const url = encodeURIComponent(shareData.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
});

shareCopy.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(shareData.url);
        alert('링크가 복사되었습니다!');
    } catch (err) {
        console.error('Failed to copy: ', err);
        prompt('이 링크를 복사하세요:', shareData.url);
    }
});

retryBtn.addEventListener('click', () => {
    imageInput.value = '';
    imagePreview.src = '';
    imagePreview.hidden = true;
    uploadContent.hidden = false;
    predictBtn.disabled = true;
    resultSection.hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize model on load
init();