
# 🧮 Modern Calculator

<div align="center">
  
![Calculator Demo](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-orange)
![CodeAlpha](https://img.shields.io/badge/CodeAlpha-Internship_Project-purple)

*A sleek, feature-rich calculator built with vanilla web technologies*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation)

</div>

## ✨ Features

### 🎯 Core Functionality
| Feature | Status | Description |
|---------|--------|-------------|
| **Basic Operations** | ✅ | Addition, Subtraction, Multiplication, Division |
| **Real-time Display** | ✅ | Instant calculation updates |
| **Decimal Support** | ✅ | Floating-point calculations |
| **Clear Functions** | ✅ | AC (All Clear) & Backspace |
| **Percentage** | ✅ | Percentage calculations |
| **Error Handling** | ✅ | Division by zero, overflow protection |

### 🌟 Advanced Features
| Feature | Status | Description |
|---------|--------|-------------|
| **Keyboard Support** | ✅ | Type calculations directly |
| **Dark/Light Mode** | ✅ | Theme toggle with persistence |
| **Responsive Design** | ✅ | Mobile-first approach |
| **Visual Feedback** | ✅ | Button animations & hover effects |
| **Accessibility** | ✅ | ARIA labels, keyboard navigation |
| **Number Formatting** | ✅ | Comma-separated thousands |

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- No dependencies or build tools required

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/calculator.git

# Navigate to project directory
cd calculator

# Open in browser
open index.html
```

**Or simply** download the ZIP file and open `index.html` in your browser.

## 📱 Demo

### Live Preview
[![Open in Browser](https://img.shields.io/badge/Open-Live_Demo-2ea44f)](https://yourusername.github.io/calculator)



## 🎮 Usage

### Basic Operations
```javascript
// Examples of supported operations
5 + 3 = 8           // Addition
10 - 4 = 6          // Subtraction
6 × 3 = 18          // Multiplication
15 ÷ 3 = 5          // Division
50 × 20% = 10       // Percentage
```

### Input Methods
| Method | Example | Notes |
|--------|---------|-------|
| **Mouse/Touch** | Click buttons | Standard input method |
| **Keyboard** | Type `5+3=` | Full keyboard support |
| **Mixed** | Start with mouse, finish with keyboard | Seamless integration |

### Keyboard Shortcuts
| Key | Function | Equivalent Button |
|-----|----------|-------------------|
| `0-9` | Number input | 0-9 buttons |
| `+` `-` `*` `/` | Operations | + − × ÷ buttons |
| `.` | Decimal point | . button |
| `Enter` `=` | Calculate result | = button |
| `Escape` `Delete` | Clear all | AC button |
| `Backspace` | Delete last digit | ⌫ button |
| `%` | Percentage | % button |

## 🏗️ Architecture

### File Structure
```
calculator/
├── calculator.html          # Main HTML document
├── calculator.css           # Styles & responsive design
├── calculator.js           # Calculator logic & interactivity
└── README.md           # Documentation
```

### Code Organization
```javascript
// State Management
const calculator = {
    currentOperand: '0',    // Currently displayed number
    previousOperand: '',    // Previous number in calculation
    operation: undefined,   // Current operation (+, −, ×, ÷)
    resetScreen: false,     // Flag for display reset
    darkMode: false         // Theme state
};

// Core Functions
function appendNumber()     // Add digit to current input
function chooseOperation()  // Set mathematical operation
function compute()          // Perform calculation
function clearCalculator()  // Reset calculator state
function updateDisplay()    // Refresh UI
```

## 🎨 Design Philosophy

### UI/UX Principles
1. **Clarity**: Clean typography, clear visual hierarchy
2. **Feedback**: Immediate visual response to interactions
3. **Consistency**: Uniform spacing, sizing, and colors
4. **Accessibility**: Keyboard navigation, screen reader support
5. **Responsiveness**: Optimized for all screen sizes

### Color Scheme
| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | `#ffffff` | `#1e1e1e` |
| Display | `#1a1a2e` | `#0f0f23` |
| Number Buttons | `#f8f9fa` | `#3d3d3d` |
| Operation Buttons | `#e9ecef` | `#404040` |
| Equals Button | `#007bff` | `#1971c2` |

## 🔧 Development

### Browser Support
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully supported |
| Firefox | 88+ | ✅ Fully supported |
| Safari | 14+ | ✅ Fully supported |
| Edge | 90+ | ✅ Fully supported |

### Performance
- **Initial Load**: < 100ms
- **Bundle Size**: < 50KB (uncompressed)
- **Memory Usage**: Minimal footprint
- **Render Performance**: 60fps animations

## 📚 API Reference

### Event Listeners
```javascript
// Button clicks
button.addEventListener('click', handler);

// Keyboard events
document.addEventListener('keydown', handler);

// Theme toggle
themeButton.addEventListener('click', toggleTheme);
```

### Public Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `appendNumber()` | `number: string` | `void` | Add digit to display |
| `chooseOperation()` | `operation: string` | `void` | Set mathematical operation |
| `compute()` | `none` | `void` | Calculate result |
| `clearCalculator()` | `none` | `void` | Reset calculator |
| `toggleTheme()` | `none` | `void` | Switch dark/light mode |

## 🧪 Testing

### Test Cases
```javascript
// Arithmetic operations
test('5 + 3 = 8', () => { /* ... */ });
test('10 - 4 = 6', () => { /* ... */ });
test('6 × 3 = 18', () => { /* ... */ });
test('15 ÷ 3 = 5', () => { /* ... */ });

// Edge cases
test('Division by zero = Error', () => { /* ... */ });
test('Decimal handling = 0.1 + 0.2 = 0.3', () => { /* ... */ });
test('Large numbers formatting', () => { /* ... */ });
```

### Manual Testing Checklist
- [x] All arithmetic operations work correctly
- [x] Keyboard input matches mouse input
- [x] Theme persistence across page reloads
- [x] Mobile responsive layout
- [x] Error handling for invalid operations
- [x] Accessibility features functional

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Update documentation as needed
- Test changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

## 👏 Acknowledgments

### Built With
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Page structure
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - Styling & layout
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Logic & interactivity
- [Font Awesome](https://fontawesome.com) - Icons
- [Google Fonts](https://fonts.google.com) - Typography

### Special Thanks
- **CodeAlpha** for the internship opportunity
- **Mentors** for guidance and feedback
- **Open Source Community** for inspiration

### Inspiration
- [iOS Calculator](https://www.apple.com/ios/calculator/)
- [Material Design](https://material.io/design)
- [Modern CSS Techniques](https://moderncss.dev)



<div align="center">

### ⭐ Show your support
Give a ⭐️ if this project helped you!

### 📊 Stats
![GitHub stars](https://img.shields.io/github/stars/yourusername/calculator?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/calculator?style=social)

---

**Built with ❤️ during CodeAlpha Internship**

*"Simplicity is the ultimate sophistication." - Leonardo da Vinci*

</div>
