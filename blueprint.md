# Blueprint: Animal Lookalike Test (동물상 테스트)

## Overview

This application is an AI-powered "Animal Lookalike Test" that determines whether a user looks more like a dog or a cat using a Teachable Machine image classification model. It provides a modern, interactive, and visually appealing user experience.

## Design and Features

### 1. **Visual Design**
    - **Aesthetics:** Clean, friendly, and modern UI with a focus on ease of use.
    - **Color Palette:** Warm and inviting colors (e.g., soft yellows, oranges, and purples).
    - **Typography:** Clear and expressive typography using modern sans-serif fonts.
    - **Layout:** Responsive design that works well on both mobile and desktop.
    - **Interactive Elements:** Polished buttons, smooth transitions, and progress bars for prediction results.

### 2. **Functionality**
    - **AI Prediction:** Uses a Teachable Machine model to classify user images.
    - **Image Upload:** Supports both file upload and drag-and-drop for images.
    - **Real-time Feedback:** Displays a preview of the uploaded image.
    - **Detailed Results:** Shows the probability for each animal category (Dog, Cat) using progress bars.
    - **Social Sharing (Optional):** Ability to share results (to be considered).

### 3. **Technical Implementation**
    - **Framework-less:** Pure HTML, CSS, and JavaScript.
    - **AI Model:** Teachable Machine Image Model (TensorFlow.js).
    - **Modern CSS:** CSS Variables, Flexbox/Grid, and Container Queries.
    - **ES Modules:** Organized JavaScript code.

## Current Plan

1.  **HTML (`index.html`):** 
    - Structure the main container, upload area, and result section.
    - Include TensorFlow.js and Teachable Machine libraries.
2.  **CSS (`style.css`):** 
    - Create a modern look with gradients, shadows, and responsive layouts.
    - Style the upload area and result progress bars.
3.  **JavaScript (`main.js`):** 
    - Load the Teachable Machine model from the provided URL.
    - Implement image preview and prediction logic.
    - Update the UI with prediction results.