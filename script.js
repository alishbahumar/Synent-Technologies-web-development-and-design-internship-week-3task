/* =====================================================================
   SKYCAST — script.js
   Vanilla JS weather dashboard powered by Open-Meteo (100% free, no API
   key or signup required — https://open-meteo.com).
   Organized as: Config → State → DOM refs → Storage → API →
                 Condition mapping → Render → Events → Init
   ===================================================================== */

(() => {
  'use strict';

  /* -------------------------------------------------------------------
     1. CONFIG
     Open-Meteo needs no API key at all, so there is nothing to configure
     out of the box. If you'd rather use WeatherAPI.com (richer data,
     free tier requires a key), swap the functions in section 6 — the
     key would go in a single constant here, exactly like this one.
     ----------------------------------------------------------------- */
  const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
  const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
  const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

  const HISTORY_KEY = 'skycast.history';
  const THEME_KEY = 'skycast.theme';
  const MAX_HISTORY = 6;

  /* -------------------------------------------------------------------
     2. STATE
     ----------------------------------------------------------------- */
  let searchHistory = [];
  let lastQuery = null; // remembers the last successful search for Refresh

  /* -------------------------------------------------------------------
     3. DOM REFERENCES
     ----------------------------------------------------------------- */
  const els = {
    body: document.body,

    searchForm: document.getElementById('searchForm'),
    cityInput: document.getElementById('cityInput'),
    locateBtn: document.getElementById('locateBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    heroRefreshBtn: document.getElementById('heroRefreshBtn'),
    themeToggle: document.getElementById('themeToggle'),

    historyRow: document.getElementById('historyRow'),

    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    errorMessage: document.getElementById('errorMessage'),
    errorRetryBtn: document.getElementById('errorRetryBtn'),
    emptyState: document.getElementById('emptyState'),
    resultSection: document.getElementById('resultSection'),

    cityName: document.getElementById('cityName'),
    countryName: document.getElementById('countryName'),
    localDateTime: document.getElementById('localDateTime'),
    conditionIcon: document.getElementById('conditionIcon'),
    tempValue: document.getElementById('tempValue'),
    conditionText: document.getElementById('conditionText'),
    feelsLikeValue: document.getElementById('feelsLikeValue'),

    humidityValue: document.getElementById('humidityValue'),
    windValue: document.getElementById('windValue'),
    pressureValue: document.getElementById('pressureValue'),
    visibilityValue: document.getElementById('visibilityValue'),
    uvValue: document.getElementById('uvValue'),
    feelsLikeGridValue: document.getElementById('feelsLikeGridValue'),
    sunriseValue: document.getElementById('sunriseValue'),
    sunsetValue: document.getElementById('sunsetValue'),
  };

  /* -------------------------------------------------------------------
     4. STORAGE
     ----------------------------------------------------------------- */
  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      searchHistory = raw ? JSON.parse(raw) : [];
    } catch {
      searchHistory = [];
    }
  }

  function saveHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
  }

  function pushHistory(cityLabel) {
    searchHistory = searchHistory.filter((c) => c.toLowerCase() !== cityLabel.toLowerCase());
    searchHistory.unshift(cityLabel);
    searchHistory = searchHistory.slice(0, MAX_HISTORY);
    saveHistory();
    renderHistory();
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  /* -------------------------------------------------------------------
     5. CONDITION → ICON / BACKGROUND MAPPING
     Maps Open-Meteo's WMO weather codes + is_day into:
       - a Font Awesome icon class for the hero card
       - human-readable condition text
       - a "weather state" that drives the dynamic sky background
     Reference: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
     ----------------------------------------------------------------- */
  function mapCondition(code, isDay) {
    const day = isDay === 1;

    const table = {
      0:  { text: 'Clear sky',            icon: day ? 'fa-solid fa-sun' : 'fa-solid fa-moon', state: day ? 'clear-day' : 'clear-night' },
      1:  { text: 'Mainly clear',         icon: day ? 'fa-solid fa-sun' : 'fa-solid fa-moon', state: day ? 'clear-day' : 'clear-night' },
      2:  { text: 'Partly cloudy',        icon: day ? 'fa-solid fa-cloud-sun' : 'fa-solid fa-cloud-moon', state: 'cloudy' },
      3:  { text: 'Overcast',             icon: 'fa-solid fa-cloud', state: 'cloudy' },
      45: { text: 'Fog',                  icon: 'fa-solid fa-smog', state: 'cloudy' },
      48: { text: 'Depositing rime fog',  icon: 'fa-solid fa-smog', state: 'cloudy' },
      51: { text: 'Light drizzle',        icon: 'fa-solid fa-cloud-rain', state: 'rain' },
      53: { text: 'Moderate drizzle',     icon: 'fa-solid fa-cloud-rain', state: 'rain' },
      55: { text: 'Dense drizzle',        icon: 'fa-solid fa-cloud-rain', state: 'rain' },
      56: { text: 'Light freezing drizzle', icon: 'fa-solid fa-cloud-rain', state: 'rain' },
      57: { text: 'Dense freezing drizzle', icon: 'fa-solid fa-cloud-rain', state: 'rain' },
      61: { text: 'Slight rain',          icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      63: { text: 'Moderate rain',        icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      65: { text: 'Heavy rain',           icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      66: { text: 'Light freezing rain',  icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      67: { text: 'Heavy freezing rain',  icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      71: { text: 'Slight snow fall',     icon: 'fa-solid fa-snowflake', state: 'snow' },
      73: { text: 'Moderate snow fall',   icon: 'fa-solid fa-snowflake', state: 'snow' },
      75: { text: 'Heavy snow fall',      icon: 'fa-solid fa-snowflake', state: 'snow' },
      77: { text: 'Snow grains',          icon: 'fa-solid fa-snowflake', state: 'snow' },
      80: { text: 'Slight rain showers',  icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      81: { text: 'Moderate rain showers', icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      82: { text: 'Violent rain showers', icon: 'fa-solid fa-cloud-showers-heavy', state: 'rain' },
      85: { text: 'Slight snow showers',  icon: 'fa-solid fa-snowflake', state: 'snow' },
      86: { text: 'Heavy snow showers',   icon: 'fa-solid fa-snowflake', state: 'snow' },
      95: { text: 'Thunderstorm',         icon: 'fa-solid fa-cloud-bolt', state: 'storm' },
      96: { text: 'Thunderstorm with hail', icon: 'fa-solid fa-cloud-bolt', state: 'storm' },
      99: { text: 'Severe thunderstorm with hail', icon: 'fa-solid fa-cloud-bolt', state: 'storm' },
    };

    return table[code] || { text: 'Unknown', icon: 'fa-solid fa-cloud', state: 'cloudy' };
  }

  function applySkyState(state) {
    els.body.setAttribute('data-weather', state);
  }

  /* -------------------------------------------------------------------
     6. API
     Two free, keyless Open-Meteo-family services:
       - Geocoding: turn a city name into lat/lon
       - Forecast: turn lat/lon into current conditions + today's astro
     ----------------------------------------------------------------- */
  async function geocodeCity(cityName) {
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location lookup failed');

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }

    const place = data.results[0];
    return {
      name: place.name,
      region: place.admin1 || '',
      country: place.country || '',
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }

  async function reverseGeocode(latitude, longitude) {
    const url = `${REVERSE_GEOCODE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('reverse lookup failed');
      const data = await response.json();
      return {
        name: data.city || data.locality || 'Your Location',
        region: data.principalSubdivision || '',
        country: data.countryName || '',
        latitude,
        longitude,
      };
    } catch {
      // Fall back gracefully — coordinates still work for the forecast call
      return { name: 'Your Location', region: '', country: '', latitude, longitude };
    }
  }

  async function fetchForecast(latitude, longitude) {
    const params = new URLSearchParams({
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'is_day',
        'weather_code',
        'surface_pressure',
        'wind_speed_10m',
      ].join(','),
      hourly: ['visibility', 'uv_index'].join(','),
      daily: ['sunrise', 'sunset'].join(','),
      timezone: 'auto',
    });

    const response = await fetch(`${FORECAST_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Weather data unavailable for this location');
    return response.json();
  }

  /* -------------------------------------------------------------------
     7. RENDER
     ----------------------------------------------------------------- */
  function showState(name) {
    els.loadingState.classList.add('is-hidden');
    els.errorState.classList.add('is-hidden');
    els.emptyState.classList.add('is-hidden');
    els.resultSection.classList.add('is-hidden');

    if (name === 'loading') els.loadingState.classList.remove('is-hidden');
    if (name === 'error') els.errorState.classList.remove('is-hidden');
    if (name === 'empty') els.emptyState.classList.remove('is-hidden');
    if (name === 'result') els.resultSection.classList.remove('is-hidden');
  }

  function renderWeather(place, forecast) {
    const { current, hourly, daily } = forecast;
    const { text, icon, state } = mapCondition(current.weather_code, current.is_day);

    // Match the current hour against the hourly arrays to read visibility/UV
    const hourIndex = hourly.time.indexOf(current.time);
    const visibilityKm = hourIndex >= 0 ? hourly.visibility[hourIndex] / 1000 : null;
    const uvIndex = hourIndex >= 0 ? hourly.uv_index[hourIndex] : null;

    // Hero card
    els.cityName.textContent = place.name;
    els.countryName.textContent = [place.region, place.country].filter(Boolean).join(', ');
    els.localDateTime.textContent = formatLocalDateTime(current.time);
    els.conditionIcon.innerHTML = `<i class="${icon}"></i>`;
    els.tempValue.textContent = Math.round(current.temperature_2m);
    els.conditionText.textContent = text;
    els.feelsLikeValue.textContent = Math.round(current.apparent_temperature);

    // Detail grid
    els.humidityValue.textContent = current.relative_humidity_2m;
    els.windValue.textContent = Math.round(current.wind_speed_10m);
    els.pressureValue.textContent = Math.round(current.surface_pressure);
    els.visibilityValue.textContent = visibilityKm !== null ? visibilityKm.toFixed(1) : '—';
    els.uvValue.textContent = uvIndex !== null ? Math.round(uvIndex) : '—';
    els.feelsLikeGridValue.textContent = Math.round(current.apparent_temperature);
    els.sunriseValue.textContent = formatTimeOnly(daily.sunrise[0]);
    els.sunsetValue.textContent = formatTimeOnly(daily.sunset[0]);

    applySkyState(state);
    showState('result');
  }

  // Open-Meteo returns local time already (timezone=auto), formatted like "2026-07-17T14:30"
  function formatLocalDateTime(isoLocalStr) {
    const [datePart, timePart] = isoLocalStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    return date.toLocaleString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatTimeOnly(isoLocalStr) {
    const [, timePart] = isoLocalStr.split('T');
    const [hour, minute] = timePart.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  function renderHistory() {
    els.historyRow.innerHTML = '';
    searchHistory.forEach((city) => {
      const chip = document.createElement('button');
      chip.className = 'history-chip';
      chip.type = 'button';
      chip.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> ${escapeHtml(city)}`;
      chip.addEventListener('click', () => runSearch(city));
      els.historyRow.appendChild(chip);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* -------------------------------------------------------------------
     8. SEARCH / REFRESH FLOW
     ----------------------------------------------------------------- */
  async function runSearch(query) {
    if (!query || !query.trim()) return;
    lastQuery = query.trim();
    showState('loading');

    try {
      const place = await geocodeCity(lastQuery);
      const forecast = await fetchForecast(place.latitude, place.longitude);
      renderWeather(place, forecast);
      pushHistory(place.name);
      els.cityInput.value = '';
    } catch (err) {
      handleError(err);
    }
  }

  async function runSearchByCoords(latitude, longitude) {
    showState('loading');
    try {
      const place = await reverseGeocode(latitude, longitude);
      const forecast = await fetchForecast(latitude, longitude);
      renderWeather(place, forecast);
      lastQuery = place.name;
      pushHistory(place.name);
    } catch (err) {
      handleError(err);
    }
  }

  function handleError(err) {
    els.errorMessage.textContent = `${err.message}. Double-check the spelling, or try a nearby major city instead.`;
    showState('error');
  }

  function refreshCurrent() {
    if (lastQuery) {
      runSearch(lastQuery);
    } else {
      els.cityInput.focus();
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      handleError(new Error('Geolocation is not supported by your browser'));
      return;
    }

    showState('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        runSearchByCoords(latitude, longitude);
      },
      () => {
        handleError(new Error('Location access was denied'));
      },
      { timeout: 8000 }
    );
  }

  /* -------------------------------------------------------------------
     9. THEME
     ----------------------------------------------------------------- */
  function applyTheme(theme) {
    els.body.setAttribute('data-theme', theme);
    els.themeToggle.querySelector('i').className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    saveTheme(theme);
  }

  function toggleTheme() {
    const isDark = els.body.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  }

  /* -------------------------------------------------------------------
     10. EVENT BINDINGS
     ----------------------------------------------------------------- */
  function bindEvents() {
    // Search form (submit covers both button click and Enter key)
    els.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      runSearch(els.cityInput.value);
    });

    els.locateBtn.addEventListener('click', useMyLocation);

    els.refreshBtn.addEventListener('click', spinAndRefresh(els.refreshBtn));
    els.heroRefreshBtn.addEventListener('click', spinAndRefresh(els.heroRefreshBtn));

    els.errorRetryBtn.addEventListener('click', () => {
      if (lastQuery) runSearch(lastQuery);
      else els.cityInput.focus();
    });

    els.themeToggle.addEventListener('click', toggleTheme);
  }

  function spinAndRefresh(button) {
    return () => {
      button.classList.add('is-spinning');
      refreshCurrent();
      setTimeout(() => button.classList.remove('is-spinning'), 800);
    };
  }

  /* -------------------------------------------------------------------
     11. INIT
     ----------------------------------------------------------------- */
  function init() {
    loadHistory();
    applyTheme(loadTheme());
    renderHistory();
    bindEvents();
    showState('empty');

    // Auto-focus the search box so the user can start typing immediately
    els.cityInput.focus();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
