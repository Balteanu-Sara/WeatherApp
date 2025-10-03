const unitsBtn = document.getElementById("units-btn");

const celsiusSet = document.getElementById("celsius");
celsiusSet.style.backgroundColor = "var(--outline-grey)";
const fahrenheitSet = document.getElementById("fahrenheit");
fahrenheitSet.style.backgroundColor = "unset";
const temperature = {
  celsius: true,
  fahrenheit: false,
};
const kmSet = document.getElementById("km");
kmSet.style.backgroundColor = "var(--outline-grey)";
const mphSet = document.getElementById("mph");
mphSet.style.backgroundColor = "unset";
const windSpeed = {
  km: true,
  mph: false,
};
const mmSet = document.getElementById("mm");
mmSet.style.backgroundColor = "var(--outline-grey)";
const inSet = document.getElementById("in");
inSet.style.backgroundColor = "unset";
const precipitation = {
  mm: true,
  in: false,
};

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const currentLocation = document.getElementById("current-location");
const currentDate = document.getElementById("current-date");
const currentTemp = document.getElementById("current-temp");

const feelsLikeElement = document.getElementById("feels-like");
const humidityElement = document.getElementById("humidity");
const speedElement = document.getElementById("speed");
const speedUnit = speedElement.querySelector("span");
const precipitationElement = document.getElementById("precipitation");
const precipitationUnit = precipitationElement.querySelector("span");

const dailyForecast = [
  {
    weekday: "Tue",
    "highest temp": 20,
    "lowest temp": 14,
  },
];

const forecastOptions = document.getElementById("forecast-options");
const hourlyForecast = [
  {
    hour: 3,
    daytime: "pm",
    temp: 21,
  },
];

const coordinatesUrl = "https://geocoding-api.open-meteo.com/v1/search?name=";
const dataUrl = "https://api.open-meteo.com/v1/forecast?";
let latitude;
let longitude;
let timezone;
const detailsUrl = `latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,relative_humidity_2m&timezone=${timezone}`;

unitsBtn.addEventListener("click", () => {
  const settings = document.getElementById("settings");
  settings.style.display = settings.style.display === "none" ? "block" : "none";
});

celsiusSet.addEventListener("click", () => {
  temperature.celsius = true;
  celsiusSet.style.backgroundColor = "var(--outline-grey)";
  temperature.fahrenheit = false;
  fahrenheitSet.style.backgroundColor = "unset";
});

fahrenheitSet.addEventListener("click", () => {
  temperature.fahrenheit = true;
  fahrenheitSet.style.backgroundColor = "var(--outline-grey)";
  temperature.celsius = false;
  celsiusSet.style.backgroundColor = "unset";
});

kmSet.addEventListener("click", () => {
  windSpeed.km = true;
  kmSet.style.backgroundColor = "var(--outline-grey)";
  windSpeed.mph = false;
  mphSet.style.backgroundColor = "unset";
});

mphSet.addEventListener("click", () => {
  windSpeed.mph = true;
  mphSet.style.backgroundColor = "var(--outline-grey)";
  windSpeed.km = false;
  kmSet.style.backgroundColor = "unset";
});

mmSet.addEventListener("click", () => {
  precipitation.mm = true;
  mmSet.style.backgroundColor = "var(--outline-grey)";
  precipitation.in = false;
  inSet.style.backgroundColor = "unset";
});

inSet.addEventListener("click", () => {
  precipitation.in = true;
  inSet.style.backgroundColor = "var(--outline-grey)";
  precipitation.mm = false;
  mmSet.style.backgroundColor = "unset";
});
