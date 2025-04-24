
# Browser Extension to Detect Suspicious Scripts Blocker

## Overview

This Chrome extension is designed to detect and block suspicious or malicious inline scripts on websites, improving security by preventing unwanted script execution. It leverages Chrome APIs and JavaScript to monitor and block harmful content dynamically while offering a clean, user-friendly interface with dark mode support.

## Features

- **Script Detection**: Identifies inline scripts that could be potentially harmful.
- **Malicious Script Blocking**: Prevents harmful scripts from executing.
- **Dark Mode Support**: Toggle between light and dark modes for a comfortable user experience.
- **Persistent Settings**: User preferences (dark mode) are stored and maintained across sessions.
- **Seamless Integration**: Works in the background and provides an easy-to-use popup interface for configuration.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/eyop/suspicious-script-detector.git
```

### 2. Navigate to the `chrome://extensions/` page in your browser.

### 3. Enable **Developer Mode** (top right).

### 4. Click on **Load Unpacked** and select the extension directory.

The extension will be loaded and ready to use.

---

## Usage

### **Popup Interface:**

- **Toggle Dark Mode**: Change the extension's interface theme (light/dark mode) via the popup. The theme is saved and applied across sessions.
- **Options Page**: Click the **"Go to Options"** button in the popup to access more advanced settings.
  
### **Options Page**:

- **Dark Mode Toggle**: Enable or disable dark mode from the options page.
- **Customization**: Additional customization options can be added here in future versions.

---

## Code Structure

The project is divided into several files for clarity and modularity:

### 1. `manifest.json`
Defines the extension's metadata and permissions required to interact with the Chrome APIs.

### 2. `popup.html`
The main HTML file that defines the popup interface. Includes buttons for interacting with the extension.

### 3. `popup.css`
CSS file for styling the popup page, with light and dark mode styles included.

### 4. `popup.js`
JavaScript file that handles the logic for toggling dark mode, opening the options page, and detecting suspicious inline scripts.

### 5. `options.html`
HTML for the options page where users can toggle dark mode.

### 6. `options.css`
CSS styles for the options page.

### 7. `options.js`
JavaScript file that manages the dark mode toggle on the options page and stores user preferences.

### 8. `background.js` (if applicable)
Handles background tasks such as script detection and blocking.

---

## Contributing

We welcome contributions! If you would like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request to the `main` branch.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Chrome Extensions Documentation**: For providing extensive documentation on Chrome extension APIs.
- **StackOverflow**: For the numerous solutions and discussions that helped during development.
- **Dark Mode Design**: Inspired by the user preference for dark mode in modern applications.
