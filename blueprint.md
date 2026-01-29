# Blueprint: Lotto Number Generator

## Overview

This application will be a visually appealing and interactive Lotto Number Generator. It will generate 6 unique random numbers between 1 and 45, displaying them in a clean, modern interface. The design will be responsive and accessible, following the guidelines for modern web development.

## Design and Features

### 1. **Visual Design**
    - **Layout:** A centered, clean layout that is easy to navigate.
    - **Color Palette:** A vibrant and energetic color palette with gradients.
    - **Typography:** Expressive and clear typography to create a visual hierarchy.
    - **Effects:**
        - A subtle noise texture on the background for a premium feel.
        - Multi-layered drop shadows on components to create a sense of depth.
        - A "glow" effect on the interactive button.
    - **Iconography:** Use of a simple icon on the button for better user understanding.

### 2. **Functionality**
    - **Number Generation:** Generate 6 unique random numbers from 1 to 45.
    - **Display:** Display the generated numbers in individual, styled elements.
    - **Interactivity:** A button to trigger the number generation.
    - **Animation:** A subtle animation for the numbers appearing on the screen.

### 3. **Technical Implementation**
    - **HTML:** Semantic HTML5 structure.
    - **CSS:** Modern CSS including Flexbox for layout, CSS Variables for theming, and transitions for animations.
    - **JavaScript:** Modern ES6+ JavaScript, using a function to handle the logic for generating and displaying the numbers.

## Current Plan

1.  **HTML (`index.html`):** Set up the basic structure of the application, including a container for the numbers and a button.
2.  **CSS (`style.css`):** Apply styles for the layout, colors, typography, and effects.
3.  **JavaScript (`main.js`):** Implement the logic for generating and displaying the random numbers when the button is clicked.

## Current Request: Add Multi-language Support
- **Goal**: Support English, Korean, Japanese, and Chinese with auto-detection and manual selection.
- **Plan**:
    1.  **HTML**:
        -   Add a `<select>` element for language switching.
        -   Add `data-i18n` attributes to text elements (`h1`, `button`, `title` logic).
    2.  **JavaScript**:
        -   Create a `translations` object with support for 'en', 'ko', 'ja', 'zh'.
        -   Implement language detection using `navigator.language`.
        -   Create a `updateLanguage(lang)` function to update text content.
        -   Persist language choice in `localStorage`.
    3.  **CSS**:
        -   Style the language selector.
