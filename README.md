# Synent-Technologies-web-development-and-design-internship-week-3task
# SkyCast

A premium, glassmorphic weather dashboard — built as Task 6 for the **Synent Technologies Web Development Internship**.

SkyCast is designed to look and feel like a real, deployable weather product (in the spirit of Apple Weather, Google Weather, and AccuWeather), built entirely with **HTML5, CSS3, and vanilla JavaScript (ES6)** — no frameworks, no libraries beyond Google Fonts and Font Awesome icons. It runs with **zero configuration** — no API key or signup required.

---

## ✨ Project Overview

SkyCast lets you search any city in the world and instantly see its current conditions — temperature, feels-like, humidity, wind, pressure, visibility, UV index, and sunrise/sunset — inside a glass-panel interface whose entire background dynamically shifts to match the weather: a glowing sun for clear skies, drifting clouds for overcast days, falling rain, flashing lightning for storms, and a twinkling starfield at night.

---

## 🚀 Features

### Core
- ✔️ Search any city worldwide
- ✔️ Current temperature, feels-like, condition, and icon
- ✔️ Humidity, wind speed, pressure, visibility, UV index
- ✔️ Sunrise and sunset times
- ✔️ Country, region, local date & time
- ✔️ Dynamic animated background driven by real weather condition (sunny / cloudy / rain / storm / snow / night)
- ✔️ Loading animation while data is fetched
- ✔️ Professional error card when a city isn't found or the request fails

### Bonus
- 🕓 Search history — recent cities shown as tappable chips
- 🌙 Dark mode toggle with saved preference
- 🎬 Animated weather cards (fade-up entrance, floating icon, hover lift)
- ⌨️ Keyboard **Enter** support to search
- 🎯 Auto-focus on the search box on page load
- 🧭 "Use my location" button (Geolocation API)
- 🔄 Refresh button to re-fetch the current city
- 📱 Responsive navigation that adapts to mobile

---

## 🛠️ Technologies Used

- **HTML5** — semantic structure
- **CSS3** — custom properties (design tokens), Flexbox, Grid, glassmorphism (`backdrop-filter`), layered gradient/animation system for the dynamic sky background
- **Vanilla JavaScript (ES6+)** — `fetch`, `async/await`, Geolocation API, `localStorage`, event delegation, IIFE module pattern
- **Open-Meteo** — free, keyless live weather + geocoding data
- **Google Fonts** — Poppins
- **Font Awesome 6** — icon set

No Bootstrap, Tailwind, React, Vue, Angular, or jQuery is used anywhere in this project.

---

## 🌦️ API Used

SkyCast uses **[Open-Meteo](https://open-meteo.com/)** — a free weather API that requires **no API key and no signup at all**. Two of its endpoints are used together:

- **Geocoding API** (`geocoding-api.open-meteo.com`) — turns a searched city name into latitude/longitude
- **Forecast API** (`api.open-meteo.com`) — returns current conditions, hourly visibility/UV, and today's sunrise/sunset for those coordinates

For the "Use my location" button, reverse geocoding (coordinates → city name) is handled by the free, keyless **[BigDataCloud](https://www.bigdatacloud.com/geocoding-apis)** client API.

### How to Get an API Key
You don't need one — that's the point. Clone the repo and it works immediately, with zero configuration.

If you'd rather use a paid/richer provider like WeatherAPI.com instead, the API layer is isolated in one section of `script.js` (`SECTION 6 — API`), so swapping it in later just means replacing those functions and adding your key to a single constant at the top of the file.

---

## 📦 Installation

SkyCast is a static site — no build step or dependencies required.

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/synent-task6-skycast-weatherdashboard-alishbahumar.git
   cd synent-task6-skycast-weatherdashboard-alishbahumar
   ```

2. **Serve it locally** (recommended, so fonts/icons and geolocation work correctly — geolocation in particular requires `http://` or `https://`, not `file://`):
   ```bash
   # Python
   python3 -m http.server 8000

   # or Node
   npx serve .
   ```

3. Visit `http://localhost:8000` and search for a city. No API key, no setup — it works immediately.

---

## 📁 Folder Structure

```
synent-task6-skycast-weatherdashboard-alishbahumar/
│
├── index.html          # App markup — navbar, search, hero card, detail grid, states
├── style.css            # All styling — tokens, dynamic sky background, components, responsive rules
├── script.js             # App logic — API calls, condition mapping, rendering, localStorage
├── README.md            # Project documentation (this file)
└── screenshots/          # (optional) images referenced below
```

---

## 🖼️ Screenshots

> _Add screenshots here before publishing to GitHub._

| Clear Day | Rainy | Night |
|---|---|---|
| `screenshots/clear-day.png` | `screenshots/rain.png` | `screenshots/night.png` |

| Dark Mode | Mobile View |
|---|---|
| `screenshots/dark-mode.png` | `screenshots/mobile-view.png` |

---

## 🧠 Design Notes

- **Design language:** glassmorphism over a living, weather-reactive gradient background rather than a static image — the sky itself is the signature element.
- **Dynamic background system:** a single `[data-weather]` attribute on `<body>` drives which CSS layers (sun glow, clouds, rain streaks, lightning flashes, starfield) are visible and which gradient stops apply, all cross-faded with smooth transitions.
- **Typography:** Poppins across all weights (300–800) for a clean, modern, geometric feel.
- **Accessibility:** visible focus states, `prefers-reduced-motion` respected, decorative background marked `aria-hidden`.

---

## 👩‍💻 Author

**Alishba Umar**
Web Development Intern — Synent Technologies

---

## 📄 License

This project was built for educational/internship purposes. Free to use as a learning reference.
