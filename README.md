# 🌤️ SkyCast — Premium Weather Dashboard

<p align="center">
  <b>A premium glassmorphic weather experience with real-time weather data and dynamic animated skies.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Internship-Synent%20Technologies-6C63FF?style=for-the-badge">
  <img src="https://img.shields.io/badge/Language-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Style-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge">
</p>

---

## 🌍 About SkyCast

**SkyCast** is a premium, modern weather dashboard developed as **Task 6** during the **Synent Technologies Web Development Internship**.

The application is designed to feel like a real-world, deployable weather product inspired by modern weather platforms. It provides live weather information through a beautiful **glassmorphic interface** with dynamic animated backgrounds that change according to the current weather conditions.

Built entirely using:

* 🌐 HTML5
* 🎨 CSS3
* ⚡ Vanilla JavaScript (ES6+)

> 🚀 No frameworks. No build tools. No API key required.

---

# ✨ Key Highlights

```text
🌍 Worldwide City Search
🌡️ Live Weather Information
🎨 Dynamic Animated Weather Backgrounds
🔮 Glassmorphism UI
🌙 Dark Mode
📍 Use My Location
🕓 Search History
📱 Fully Responsive
⚡ Zero Configuration
🔑 No API Key Required
```

---

# 🚀 Features

## 🌤️ Weather Information

* ✔️ Search any city worldwide
* ✔️ Current temperature
* ✔️ Feels-like temperature
* ✔️ Weather condition and icon
* ✔️ Humidity
* ✔️ Wind speed
* ✔️ Atmospheric pressure
* ✔️ Visibility
* ✔️ UV index
* ✔️ Sunrise time
* ✔️ Sunset time
* ✔️ Country and region
* ✔️ Local date and time

---

## 🎨 Dynamic Weather Experience

The entire interface visually adapts to the current weather.

| Weather Condition | Visual Experience          |
| ----------------- | -------------------------- |
| ☀️ Clear          | Glowing sun and bright sky |
| ☁️ Cloudy         | Drifting cloud effects     |
| 🌧️ Rain          | Animated falling rain      |
| ⛈️ Storm          | Lightning flashes          |
| ❄️ Snow           | Snow weather visuals       |
| 🌙 Night          | Animated starfield         |

---

## ⭐ Bonus Features

* 🕓 Recent city search history
* 🌙 Dark mode with saved preference
* 🎬 Animated weather cards
* ⌨️ Press **Enter** to search
* 🎯 Auto-focus search input
* 📍 **Use My Location** button
* 🔄 Refresh current weather
* 📱 Mobile-responsive navigation
* ⏳ Loading animation
* ❌ Professional error handling

---

# 🛠️ Technologies Used

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| 🌐 HTML5           | Semantic structure              |
| 🎨 CSS3            | Styling and responsive layouts  |
| ⚡ JavaScript ES6+  | Application functionality       |
| 🌍 Open-Meteo      | Live weather and geocoding data |
| 📍 Geolocation API | User location detection         |
| 💾 localStorage    | Search history and preferences  |
| 🔤 Google Fonts    | Poppins typography              |
| 🎯 Font Awesome    | Modern icons                    |

---

# 🌦️ APIs Used

## 🌍 Open-Meteo

SkyCast uses **Open-Meteo**, a free and keyless weather API.

### 📍 Geocoding API

Converts:

```text
City Name
    ↓
Latitude + Longitude
```

### 🌤️ Forecast API

Provides:

* Current weather
* Hourly visibility
* UV index
* Sunrise
* Sunset
* Weather conditions

> 🔑 **No API key or signup required.**

---

## 📍 Location Services

For the **Use My Location** feature, reverse geocoding is handled through **BigDataCloud**.

```text
User Coordinates
      ↓
Reverse Geocoding
      ↓
City Name
      ↓
Live Weather Data
```

---

# 🧠 JavaScript Concepts Used

* `fetch()`
* `async / await`
* API Integration
* Geolocation API
* `localStorage`
* Event Delegation
* DOM Manipulation
* IIFE Module Pattern
* Error Handling
* Dynamic Rendering

---

# 🎨 Design Philosophy

## 🔮 Glassmorphism

SkyCast uses a modern glassmorphic design system featuring:

* Transparent panels
* Background blur
* Layered gradients
* Soft visual depth
* Smooth transitions

---

## 🌈 Dynamic Sky System

A single weather state controls the application's visual environment.

```text
Weather Condition
       ↓
[data-weather] Attribute
       ↓
CSS State Detection
       ↓
Animated Sky Layers
       ↓
Dynamic Visual Experience
```

The system controls:

* ☀️ Sun glow
* ☁️ Clouds
* 🌧️ Rain
* ⚡ Lightning
* 🌙 Stars
* 🎨 Gradient transitions

---

# ♿ Accessibility

SkyCast includes accessibility-focused design decisions:

* ✔️ Visible keyboard focus states
* ✔️ `prefers-reduced-motion` support
* ✔️ Decorative backgrounds marked with `aria-hidden`
* ✔️ Clear visual hierarchy
* ✔️ Responsive navigation
* ✔️ Keyboard **Enter** support

---

# 📦 Installation & Setup

SkyCast is a **static website** with no build process or dependencies.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/synent-task6-skycast-weatherdashboard-alishbahumar.git
```

## 2️⃣ Open the Project

```bash
cd synent-task6-skycast-weatherdashboard-alishbahumar
```

## 3️⃣ Run a Local Server

### 🐍 Using Python

```bash
python3 -m http.server 8000
```

### 🟢 Using Node.js

```bash
npx serve .
```

## 4️⃣ Open in Browser

Visit:

```text
http://localhost:8000
```

🎉 That's it! Search for any city and start exploring the weather.

---

# 📁 Project Structure

```text
synent-task6-skycast-weatherdashboard-alishbahumar/
│
├── 📄 index.html
│   └── Application structure and UI
│
├── 🎨 style.css
│   └── Glassmorphism, animations, responsive design
│
├── ⚡ script.js
│   └── API integration, weather logic, rendering
│
├── 🖼️ screenshots/
│   └── Project previews
│
└── 📘 README.md
    └── Project documentation
```

---

# 🖼️ Screenshots

> 📸 Add your project screenshots below.

| ☀️ Clear Day                | 🌧️ Rainy              | 🌙 Night                |
| --------------------------- | ---------------------- | ----------------------- |
| `screenshots/clear-day.png` | `screenshots/rain.png` | `screenshots/night.png` |

| 🌙 Dark Mode                | 📱 Mobile View                |
| --------------------------- | ----------------------------- |
| `screenshots/dark-mode.png` | `screenshots/mobile-view.png` |

---

# 📱 Responsive Design

SkyCast is designed to provide a smooth experience across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The layout automatically adapts navigation, weather cards, search components, and information grids for different screen sizes.

---

# 🎯 Learning Outcomes

Through this project, I practiced:

* 🌐 Modern HTML5 structure
* 🎨 Advanced CSS styling
* 🔮 Glassmorphism UI
* 📱 Responsive web design
* ⚡ Modern JavaScript ES6+
* 🌍 API integration
* 🔄 Asynchronous programming
* 📍 Geolocation
* 💾 Browser storage
* ♿ Web accessibility
* 🎬 CSS animations
* 🧠 Real-world UI/UX design

---

# 🚀 Future Improvements

* [x] Worldwide weather search
* [x] Dynamic weather backgrounds
* [x] Dark mode
* [x] Search history
* [x] Geolocation
* [x] Responsive design

### 🔮 Future Features

* [ ] 7-day weather forecast
* [ ] Hourly forecast timeline
* [ ] Weather maps
* [ ] Favorite cities
* [ ] Multiple location comparison
* [ ] Severe weather alerts
* [ ] Weather notifications
* [ ] Additional themes
* [ ] Progressive Web App (PWA) support

---

# 🏆 Project Status

> 🟢 **Completed Successfully**

Developed as **Task 6** for the **Synent Technologies Web Development Internship**.

---

# 👩‍💻 Author

## **Alishbah Umar**

🎓 BS Software Engineering Student
🌐 Web Developer
🎨 UI/UX Designer

---

# 📄 License

This project was developed for **educational and internship purposes**.

You are welcome to use it as a learning reference.

---

<p align="center">
  ⭐ If you like this project, consider giving the repository a star!
</p>

<p align="center">
  <b>Made with ❤️, ☕ and JavaScript</b>
</p>

<p align="center">
  🌤️ <b>SkyCast — See the weather. Feel the sky.</b> 🌤️
</p>
