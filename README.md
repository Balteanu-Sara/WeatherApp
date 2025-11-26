# Project Title: WeatherNow - Weather Web App

## Description

WeatherNow is a clean and minimalistic application build with HTML, CSS and Vanilla JavaScript. It delivers real-time weather information, hourly updates and a 7-day forecast using the Open-Meteo API. The interface is designed to be clear, intuitive and easy to navigate.

## Features

- Search System: users are exposed to a variety of worldwide locations which they can search for. They have the possibility of choosing between multiple location results, results that are debounced for smoother typing in order to ensure a better UX.

- Current Weather: once the location has been selected, the WeatherNow application will display: current temperature, feels-like temperature, humidity, wind speed, precipitation accumulation, representative weather icon, date and location.

- Hourly Forecast: this section provides a selector for Today / Tomorrow 's weather, the predicted temperature for the next 24 hours, each one having a condition icon.

- Daily Forecast: WeatherNow contains a 7-day forecast section, where users can see the lowest and highest temperature for each day in order to have an easy overview of the current week.

- Settings Menu: users can change units to customize the units of temperature (Celsius/Fahnreheit), wind speed (km/h / mps), precipitation (mm/in).

## [Demo](https://weather-app-361.netlify.app/)

## Used Tehnologies & Dependencies

- HTML
- CSS
- Vanilla JavaScript
- FontAwesome Icons
- Google Fonts
- Open-Meteo Weather API (Gets current, hourly, and daily weather data)
- Open-Meteo Geocoding API

## APIs

**Geocoding API** converts city names to their specific latitude & longitude.

```bash
https://geocoding-api.open-meteo.com/v1/search?name={city}
```

**Open-Meteo API** gets current, hourly, and daily weather data.

```bash
https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m&timezone=Europe/Bucharest
```

More info: https://open-meteo.com/en/docs

## Getting Started

Follow the steps below to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Balteanu-Sara/WeatherApp.git
```

### 2. Navigate into the project folder
```bash
cd WeatherApp
```

### 3. Open the project
Since this is a front-end project, you can simply open the main HTML file and use the "Live Server" feature in VS Code.

### 4. Using the App
- Enter or select a location

- View the current weather

- Check hourly forecasts

- Explore the next 7 days of weather

Everything loads automatically via the API.
