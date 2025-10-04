const unitsBtn = document.getElementById("units-btn");
const units = [];

const celsiusSet = document.getElementById("celsius");
celsiusSet.style.backgroundColor = "var(--outline-grey)";
const fahrenheitSet = document.getElementById("fahrenheit");
fahrenheitSet.style.backgroundColor = "unset";
const temperature = {
  celsius: true,
  fahrenheit: false,
};
units.push(temperature);
const kmSet = document.getElementById("km");
kmSet.style.backgroundColor = "var(--outline-grey)";
const mphSet = document.getElementById("mph");
mphSet.style.backgroundColor = "unset";
const windSpeed = {
  km: true,
  mph: false,
};
units.push(windSpeed);
const mmSet = document.getElementById("mm");
mmSet.style.backgroundColor = "var(--outline-grey)";
const inSet = document.getElementById("in");
inSet.style.backgroundColor = "unset";
const precipitation = {
  mm: true,
  in: false,
};
units.push(precipitation);

const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.querySelector(".suggestions-container");
const actualSuggestions = document.getElementById("actual-suggestions");
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

const toCelsius = (degrees) => {
  return Math.round(((degrees - 32) * 5) / 9);
};

const toFahrenheit = (degrees) => {
  return Math.round(32 + (degrees * 9) / 5);
};

const toKm = (speed) => {
  return Math.round(speed * 1.60934);
};

const toMph = (speed) => {
  return Math.round(speed / 1.60934);
};

const toMm = (precip) => {
  return Math.round(precip * 25.4);
};

const toIn = (precip) => {
  return Math.round(precip * 0.0393700787);
};

const changeTemperature = (func) => {
  const oldDegree = parseInt(currentTemp.textContent.replace("°", ""));
  const newDegree = func(oldDegree);
  currentTemp.textContent = `${newDegree}°`;

  const oldFeelsLike = parseInt(feelsLikeElement.textContent.replace("°", ""));
  const newFeelsLike = func(oldFeelsLike);
  feelsLikeElement.textContent = `${newFeelsLike}°`;

  const highestTempElements = document.querySelectorAll("#highest-temp");
  highestTempElements.forEach((element) => {
    const oldDegree = parseInt(element.textContent.replace("°", ""));
    const newDegree = func(oldDegree);
    element.textContent = `${newDegree}°`;
  });

  const lowestTempElements = document.querySelectorAll("#lowest-temp");
  lowestTempElements.forEach((element) => {
    const oldDegree = parseInt(element.textContent.replace("°", ""));
    const newDegree = func(oldDegree);
    element.textContent = `${newDegree}°`;
  });

  const tempElements = document.querySelectorAll("#temp");
  tempElements.forEach((element) => {
    const oldDegree = parseInt(element.textContent.replace("°", ""));
    const newDegree = func(oldDegree);
    element.textContent = `${newDegree}°`;
  });
};

const changeSpeed = (func) => {
  const oldSpeed = parseInt(
    speedElement.textContent.replace(/\s?((km\/h)|(mph))/, "")
  );
  const newSpeed = func(oldSpeed);
  speedUnit.textContent = windSpeed.km ? "km/h" : "mph";
  speedElement.innerHTML = `${newSpeed} <span>${speedUnit.textContent}</span>`;
};

const changePrecipitation = (func) => {
  const oldPrecip = parseInt(
    precipitationElement.textContent.replace(/\s?((mm)|(in))/, "")
  );
  const newPrecip = func(oldPrecip);
  precipitationUnit.textContent = precipitation.mm ? "mm" : "in";
  precipitationElement.innerHTML = `${newPrecip} <span>${precipitationUnit.textContent}</span>`;
};

const changeUnit = (unit) => {
  if (unit === 0) {
    units[unit].celsius
      ? changeTemperature(toCelsius)
      : changeTemperature(toFahrenheit);
  } else if (unit === 1) {
    units[unit].km ? changeSpeed(toKm) : changeSpeed(toMph);
  } else if (unit === 2) {
    units[unit].mm ? changePrecipitation(toMm) : changePrecipitation(toIn);
  }
};

const showNoResults = () => {
  const apiContainer = document.querySelector(".api-container");
  apiContainer.innerHTML =
    "<p style=\"font-family: 'DM Sans',sans-serif\">No search result found!</p>";
};

const showSuggestions = () => {
  actualSuggestions.innerHTML = "";

  fetch(`${coordinatesUrl}${searchInput.value}`)
    .then((res) => res.json())
    .then((suggestions) => {
      if (!suggestions.results) {
        suggestionsContainer.style.display = "none";
        return;
      }

      suggestionsContainer.style.display = "block";
      console.log("am ajuns aici");
      console.log(suggestions.results);
      suggestions.results.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = suggestion.admin1
          ? `${suggestion.name}, ${suggestion.admin1}, ${suggestion.country_code}`
          : `${suggestion.name}, ${suggestion.country_code}`;
        li.className = `${suggestion.latitude} ${suggestion.longitude} ${suggestion.timezone}`;

        li.addEventListener("click", () => {
          searchInput.value = li.textContent;
          [latitude, longitude, timezone] = li.className.split(" ");
          suggestionsContainer.style.display = "none";
        });
        actualSuggestions.appendChild(li);
      });
      console.log(latitude, longitude, timezone);
      console.log("am iesit");
    })
    .catch((err) => {
      console.error(err);
    });
};

celsiusSet.addEventListener("click", () => {
  if (temperature.celsius) return;
  temperature.celsius = true;
  celsiusSet.style.backgroundColor = "var(--outline-grey)";
  temperature.fahrenheit = false;
  fahrenheitSet.style.backgroundColor = "unset";
  changeUnit(0);
});

fahrenheitSet.addEventListener("click", () => {
  if (temperature.fahrenheit) return;
  temperature.fahrenheit = true;
  fahrenheitSet.style.backgroundColor = "var(--outline-grey)";
  temperature.celsius = false;
  celsiusSet.style.backgroundColor = "unset";
  changeUnit(0);
});

kmSet.addEventListener("click", () => {
  if (windSpeed.km) return;
  windSpeed.km = true;
  kmSet.style.backgroundColor = "var(--outline-grey)";
  windSpeed.mph = false;
  mphSet.style.backgroundColor = "unset";
  changeUnit(1);
});

mphSet.addEventListener("click", () => {
  if (windSpeed.mph) return;
  windSpeed.mph = true;
  mphSet.style.backgroundColor = "var(--outline-grey)";
  windSpeed.km = false;
  kmSet.style.backgroundColor = "unset";
  changeUnit(1);
});

mmSet.addEventListener("click", () => {
  if (precipitation.mm) return;
  precipitation.mm = true;
  mmSet.style.backgroundColor = "var(--outline-grey)";
  precipitation.in = false;
  inSet.style.backgroundColor = "unset";
  changeUnit(2);
});

inSet.addEventListener("click", () => {
  if (precipitation.in) return;
  precipitation.in = true;
  inSet.style.backgroundColor = "var(--outline-grey)";
  precipitation.mm = false;
  mmSet.style.backgroundColor = "unset";
  changeUnit(2);
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim().length < 2) {
    suggestionsContainer.style.display = "none";
    return;
  }

  setTimeout(showSuggestions, 500);
});
