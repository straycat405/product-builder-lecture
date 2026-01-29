# Blueprint: Animal Lookalike Test (동물상 테스트)

## Overview

This application is an AI-powered "Animal Lookalike Test" that determines whether a user looks more like a dog or a cat using a Teachable Machine image classification model. It provides a modern, interactive, and visually appealing user experience.

## Design and Features

### 1. **Visual Design**
    -   **Style:** Modern **Glassmorphism** aesthetic with translucent layers and soft blurs (`backdrop-filter`).
    -   **Color Palette:** "Fresh & Soft" theme using a light gradient background (`#f5f7fa` to `#c3cfe2`) and a vibrant violet/purple primary gradient (`#6c5ce7` to `#a29bfe`).
    -   **Typography:** `Noto Sans KR` with increased line-height and letter-spacing for better readability.
    -   **Components:**
        -   **Glass Cards:** Main container and navbar use a semi-transparent white background with a blur effect.
        -   **Buttons:** Soft gradients with "glow" shadows.
        -   **Upload Area:** Cleaner, dashed-border design with hover lift effects.
        -   **Result Bars:** Rounded progress bars with a shimmering gradient animation.
    -   **Animations:** Smooth entrance animations (`slideUp`, `fadeIn`) and hover transitions.

### 2. **Functionality**
    -   **AI Prediction:** Uses a Teachable Machine model to classify user images.
    - **Image Upload:** Supports both file upload and drag-and-drop for images.
    - **Real-time Feedback:** Displays a preview of the uploaded image.
    - **Detailed Results:** Shows the probability for each animal category (Dog, Cat) using progress bars.
    - **Detailed Results:** Shows the probability for each animal category (Dog, Cat) using progress bars.
    - **Social Sharing:** Share results via Native Share, Twitter, Facebook, or Copy Link.

### 3. **Technical Implementation**
    - **Framework-less:** Pure HTML, CSS, and JavaScript.
    - **AI Model:** Teachable Machine Image Model (TensorFlow.js).
    - **Modern CSS:** CSS Variables, Flexbox/Grid, and Container Queries.
    - **ES Modules:** Organized JavaScript code.


## User Preferences (Memory)

1.  **Explanation Style:** Web Developer Perspective (Full-stack: Frontend & Backend concepts).
2.  **Language:** Korean (concise).

## Current Status

-   **Phase:** Core Implementation Complete.
-   **Files:**
    -   `index.html`: Fully structured with SEO, semantic HTML, and sections.
    -   `style.css`: Modern styling with variables, responsiveness, and animations.
    -   `main.js`: Functional image upload, preview, and Teachable Machine prediction logic.
    -   `terms.html`: Terms of Service page.
-   **Pending:**
    -   Further SEO refinements.
    -   Further SEO refinements.
    -   Refining ad placements.

### 4. **Completed Improvements**
    -   **Copywriting:** Enhanced text content in `index.html` to be more engaging, clear, and reassuring.
    -   **Title & Subtitle:** Made them catchy and focused on user benefits.
    -   **Instructions:** Clarified upload instructions and reinforced privacy (local processing).
    -   **Feature Descriptions:** Added more personality to the descriptions of animal types.
    -   **SEO & Meta Tags:** Added JSON-LD structured data and Open Graph tags.
