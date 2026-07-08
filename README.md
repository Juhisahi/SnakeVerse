# SnakeVerse

# SnakeVerse 🐍

A modern and responsive **Snake Game** built using **HTML, CSS, and Vanilla JavaScript**. This project recreates the classic arcade experience with a polished user interface, smooth gameplay, responsive controls, adaptive difficulty, and persistent high-score tracking.

The game is lightweight, beginner-friendly, and runs entirely in the browser without requiring any external libraries or frameworks.

---

## ✨ Features

### 🎮 Classic Snake Gameplay
- Smooth grid-based movement
- Random food generation
- Snake grows after eating food
- Collision detection with walls and itself
- Game Over screen with restart functionality

### 📱 Responsive Design
- Fully responsive layout
- Optimized for desktop, tablet, and mobile devices
- Modern UI with clean animations

### 🎯 Multiple Control Options
- Keyboard support (Arrow Keys)
- Touch-friendly on-screen control pad
- Mobile-optimized gameplay

### 📊 Game Statistics
- Live score counter
- Highest score tracking
- Elapsed game timer
- High score saved using Local Storage

### ⚡ Adaptive Difficulty
- Snake speed increases as your score grows
- Provides a progressively challenging experience

### 🎨 User Interface
- Animated start screen
- Game Over modal
- Smooth transitions
- Modern green-themed snake design

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API

---

## 📂 Project Structure

```
SnakeVerse/
│── index.html      # Main HTML file
│── style.css       # Styling and responsive layout
│── script.js       # Complete game logic
└── README.md       # Project documentation
```

---

## 🚀 Getting Started

### Option 1 — Open Directly

Simply open the `index.html` file in your browser.

### Option 2 — Run with a Local Server (Recommended)

```bash
cd "your-project-folder"
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

## 🎮 Controls

### Keyboard

| Key | Action |
|------|--------|
| ⬆️ Arrow Up | Move Up |
| ⬇️ Arrow Down | Move Down |
| ⬅️ Arrow Left | Move Left |
| ➡️ Arrow Right | Move Right |

### Touch Controls

- Tap the game board to reveal the on-screen controls.
- Use the directional buttons to move the snake.
- Designed for smooth gameplay on mobile devices.

---

## 🧠 How the Game Works

1. The game creates a responsive grid based on the board size.
2. The snake starts with a predefined length.
3. Every game tick:
   - A new head is added.
   - The tail is removed.
   - Unless food is eaten, allowing the snake to grow.
4. Food is randomly generated on empty cells.
5. Collision detection checks for:
   - Wall collisions
   - Self collisions
6. The snake's speed increases automatically as the score grows.
7. High scores are stored using the browser's Local Storage API.

---

## ⚙️ Customization

### Change Grid Size

Open `script.js` and modify:

```javascript
const BLOCK_SIZE = 40;
```

Smaller values create more cells and increase difficulty.

---

### Change Initial Speed

Modify the initial delay value inside `script.js`.

```javascript
let initialDelay = 200;
```

Lower values make the snake move faster.

---

### Customize the Appearance

Inside `style.css`, you can easily change:

- Snake color
- Food color
- Board theme
- Shadows
- Animations
- Border radius
- Background

---

## 🌐 Browser Compatibility

Works seamlessly on modern browsers including:

- Google Chrome
- Microsoft Edge
- Brave
- Opera
- Mozilla Firefox

No installation or additional dependencies are required.

---

## 💡 Future Enhancements

- 🔊 Sound effects
- 🎵 Background music
- 🌙 Dark/Light mode
- 🎯 Difficulty levels
- 🏆 Online leaderboard
- 🎨 Multiple themes
- ✨ Particle animations
- 🍎 Different food types
- ⏸️ Pause menu
- 💾 Save game functionality

---

## 📚 Learning Outcomes

This project demonstrates concepts such as:

- DOM Manipulation
- Event Handling
- JavaScript Game Loops
- Collision Detection
- Responsive Web Design
- Local Storage
- Arrays & Objects
- Mobile-Friendly UI Design
- Grid-Based Game Development


---

> **"People will always have something to say. I was called a snake, so I created a Snake game. Turn criticism into creativity, and never let others decide your worth. 🐍💻✨"**
