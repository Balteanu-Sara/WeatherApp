const unitsBtn = document.getElementById("units-btn");

const celsiusSet = document.getElementById("celsius");
const fahrenheitSet = document.getElementById("fahrenheit");
const temperature = {
  celsius: true,
  fahrenheit: false,
};
const kmSet = document.getElementById("km");
const mpgSet = document.getElementById("mph");
const windSpeed = {
  km: true,
  fahrenheit: false,
};
const mmSet = document.getElementById("mm");
const inSet = document.getElementById("in");
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
