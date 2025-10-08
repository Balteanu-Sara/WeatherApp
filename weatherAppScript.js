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

const icons = [
  {
    name: "sunny",
    src: "./icons/icon-sunny.webp",
    priority: 1,
  },
  {
    name: "night",
    src: "./icons/icon-clear-night-smaller.webp",
    priority: 1,
  },
  {
    name: "partly-cloudy",
    src: "./icons/icon-partly-cloudy.webp",
    priority: 2,
  },
  {
    name: "overcast",
    src: "./icons/icon-overcast.webp",
    priority: 3,
  },
  {
    name: "fog",
    src: "./icons/icon-fog.webp",
    priority: 4,
  },
  {
    name: "drizzle",
    src: "./icons/icon-drizzle.webp",
    priority: 5,
  },
  {
    name: "rain",
    src: "./icons/icon-rain.webp",
    priority: 6,
  },
  {
    name: "snow",
    src: "./icons/icon-snow.webp",
    priority: 7,
  },
  {
    name: "storm",
    src: "./icons/icon-storm.webp",
    priority: 8,
  },
];

const searchInput = document.getElementById("search-input");
const suggestionsContainer = document.querySelector(".suggestions-container");
const actualSuggestions = document.getElementById("actual-suggestions");
const searchBtn = document.getElementById("search-btn");

const noResults = document.querySelector(".no-results");
const apiContainer = document.querySelector(".api-container");
const initialDisplay = apiContainer.style.display;

const currentLocation = document.getElementById("current-location");
const currentDate = document.getElementById("current-date");
const currentTemp = document.getElementById("current-temp");

const feelsLikeElement = document.getElementById("feels-like");
const humidityElement = document.getElementById("humidity");
const speedElement = document.getElementById("speed");
const speedUnit = speedElement.querySelector("span");
const precipitationElement = document.getElementById("precipitation");
const precipitationUnit = precipitationElement.querySelector("span");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayElements = document.querySelectorAll(".day");
const forecastOptions = document.getElementById("forecast-options");
let selectedOption = {
  today: true,
  tomorrow: false,
};
const todayOption = document.getElementById("today");
const tomorrowOption = document.getElementById("tomorrow");
const hoursContainer = document.querySelector(".hours");
const hourElements = document.querySelectorAll(".hour");
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
let city;
let country;

const initialUrl = `latitude=41.89193&longitude=12.51133&timezone=auto&daily=temperature_2m_max,temperature_2m_min,cloud_cover_mean,visibility_mean,precipitation_probability_mean,snowfall_water_equivalent_sum,weather_code&current=precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,visibility,snowfall,is_day,weather_code`;
fetch(dataUrl + initialUrl)
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    city = "Rome";
    country = "Italy";
    showResults(result);
  })
  .catch((err) => {
    console.error(err);
  });

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

  const highestTempElements = document.querySelectorAll(".highest-temp");
  highestTempElements.forEach((element) => {
    const oldDegree = parseInt(element.textContent.replace("°", ""));
    const newDegree = func(oldDegree);
    element.textContent = `${newDegree}°`;
  });

  const lowestTempElements = document.querySelectorAll(".lowest-temp");
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

const showSuggestions = (value) => {
  actualSuggestions.innerHTML = "";

  fetch(`${coordinatesUrl}${value}`)
    .then((res) => res.json())
    .then((suggestions) => {
      if (!suggestions.results) {
        suggestionsContainer.style.display = "none";
        return;
      }

      suggestionsContainer.style.display = "block";
      console.log(suggestions.results);
      suggestions.results.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = suggestion.admin1
          ? `${suggestion.name}, ${suggestion.admin1}, ${suggestion.country_code}`
          : `${suggestion.name}, ${suggestion.country_code}`;

        li.dataset.latitude = suggestion.latitude;
        li.dataset.longitude = suggestion.longitude;
        li.dataset.city = suggestion.name;
        li.dataset.country = suggestion.country;

        li.addEventListener("click", () => {
          searchInput.value = li.textContent;
          latitude = li.dataset.latitude;
          longitude = li.dataset.longitude;
          city = li.dataset.city;
          country = li.dataset.country;

          suggestionsContainer.style.display = "none";
        });
        actualSuggestions.appendChild(li);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const showNoResults = () => {
  noResults.style.display = "block";
  apiContainer.style.display = "none";
};

const selectHourlyIcon = (hour, data) => {
  const reversedIcons = [...icons].reverse();

  const indexHour = data.time.indexOf(`${hour.slice(0, -2)}00`);
  if (data.weather_code[indexHour] >= 95) return reversedIcons[0].src;
  if (data.snowfall[indexHour] > 0) return reversedIcons[1].src;
  if (data.rain[indexHour] > 0.5) return reversedIcons[2].src;
  if (data.rain[indexHour] > 0) return reversedIcons[3].src;
  if (
    data.weather_code[indexHour] === 45 ||
    data.weather_code[indexHour] === 48
  )
    return reversedIcons[4].src;
  if (data.cloud_cover[indexHour] >= 80) return reversedIcons[5].src;
  if (data.cloud_cover_mid[indexHour] >= 40) return reversedIcons[6].src;
  else {
    return data.is_day[indexHour] === 1
      ? reversedIcons[8].src
      : reversedIcons[7].src;
  }
};

const selectDailyIcon = (day, data) => {
  const reversedIcons = [...icons].reverse();

  const indexDay = data.time.indexOf(day);
  if (data.weather_code[indexDay] >= 95) return reversedIcons[0].src;
  if (data.snowfall_water_equivalent_sum[indexDay] > 0)
    return reversedIcons[1].src;
  if (data.precipitation_probability_mean[indexDay] >= 70)
    return reversedIcons[2].src;
  if (data.precipitation_probability_mean[indexDay] >= 40)
    return reversedIcons[3].src;
  if (data.weather_code[indexDay] === 45 || data.weather_code[indexDay] === 48)
    return reversedIcons[4].src;
  if (data.cloud_cover_mean[indexDay] >= 70) return reversedIcons[5].src;
  if (data.cloud_cover_mean[indexDay] >= 30) return reversedIcons[6].src;
  else {
    return reversedIcons[8].src;
  }
};

const changeCurrentWeatherSection = (data) => {
  console.log("choose the country: ", country);
  currentLocation.textContent = `${city}, ${country}`;

  const weekday = weekdays[new Date(data.current.time).getDay()];
  const day = new Date(data.current.time).getDate();
  const month = months[new Date(data.current.time).getMonth()];
  const year = new Date(data.current.time).getFullYear();
  currentDate.textContent = `${weekday}, ${day} ${month}, ${year}`;
  currentTemp.textContent = units[0].celsius
    ? `${Math.round(data.current.temperature_2m)}°`
    : `${toFahrenheit(data.current.temperature_2m)}°`;

  const hourValue = data.current.time;
  const src = selectHourlyIcon(hourValue, data.hourly);

  const imgElement = document.querySelector(".right-side img");
  imgElement.src = src;
};

const changeDetailsSection = (data) => {
  feelsLikeElement.textContent = units[0].celsius
    ? `${Math.round(data.current.apparent_temperature)}°`
    : `${toFahrenheit(data.current.apparent_temperature)}°`;

  humidityElement.textContent = `${data.current.relative_humidity_2m}%`;

  speedElement.innerHTML = units[1].km
    ? `${Math.round(data.current.wind_speed_10m)} <span>km/h</span>`
    : `${toMph(data.current.wind_speed)} <span>mph</span>`;

  precipitationElement.innerHTML = units[2].mm
    ? `${data.current.precipitation} <span>mm</span>`
    : `${toIn(data.current.precipitation)} <span>in</span>`;
};

const changeDailyForecastSection = (data) => {
  dayElements.forEach((day, index) => {
    const weekday = weekdays[new Date(data.daily.time[index]).getDay()];
    const maxTemp = units[0].celsius
      ? Math.round(data.daily.temperature_2m_max[index])
      : toFahrenheit(data.daily.temperature_2m_max[index]);
    const minTemp = units[0].celsius
      ? Math.round(data.daily.temperature_2m_min[index])
      : toFahrenheit(data.daily.temperature_2m_min[index]);

    const weekDayElement = day.querySelector(".week-day");
    weekDayElement.textContent = weekday.slice(0, 3);

    const highestTemp = day.querySelector(".highest-temp");
    highestTemp.textContent = `${maxTemp}°`;
    const lowestTemp = day.querySelector(".lowest-temp");
    lowestTemp.textContent = `${minTemp}°`;

    const src = selectDailyIcon(data.daily.time[index], data.daily);
    const imgElement = day.querySelector("img");
    imgElement.src = src;
  });
};

const changeHourlyForecast = (data) => {
  let index = data.hourly.time.indexOf(`${data.current.time.slice(0, -2)}00`);

  hourElements.forEach((element) => {
    const hourElement = element.querySelector(".hour-time");
    const tempElement = element.querySelector("#temp");
    const hourValue = new Date(data.hourly.time[index]).getHours();
    const tempValue = data.hourly.temperature_2m[index];
    if (hourValue >= 12) {
      hourElement.textContent = hourValue >= 13 ? `${hourValue % 12} ` : "12 ";
      const spanElement = document.createElement("span");
      spanElement.textContent = "PM";
      hourElement.appendChild(spanElement);
    } else {
      hourElement.textContent = hourValue !== 0 ? `${hourValue} ` : "12 ";
      const spanElement = document.createElement("span");
      spanElement.textContent = "AM";
      hourElement.appendChild(spanElement);
    }

    tempElement.textContent = units[0].celsius
      ? `${Math.round(tempValue)}°`
      : `${toFahrenheit(tempValue)}°`;
    index++;

    const src = selectHourlyIcon(data.hourly.time[index], data.hourly);
    const imgElement = element.querySelector(".left img");
    imgElement.src = src;
  });
};

const showResults = (data) => {
  changeCurrentWeatherSection(data);
  changeDetailsSection(data);
  changeDailyForecastSection(data);
  changeHourlyForecast(data);
};

const extractData = async () => {
  try {
    const detailsUrl1 = `latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_max,temperature_2m_min&current=precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m`;
    const detailsUrl = `latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,cloud_cover_mean,visibility_mean,precipitation_probability_mean,snowfall_water_equivalent_sum,weather_code&current=precipitation,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&hourly=temperature_2m,rain,cloud_cover_mid,cloud_cover,visibility,snowfall,is_day,weather_code`;
    const data = await fetch(dataUrl + detailsUrl);
    const result = await data.json();
    console.log(result);
    showResults(result);
  } catch (err) {
    console.error(err);
  }
};

const isTomorrowAbove = () => {
  const containerPosition = hoursContainer.getBoundingClientRect();
  for (element of hourElements) {
    const elementPosition = element.getBoundingClientRect();
    const passed = elementPosition.bottom <= containerPosition.bottom;
    const isTomorrow =
      element !== hourElements[0] && element.textContent.includes("12 AM");

    if (passed && isTomorrow) {
      return true;
    }
  }
  return false;
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

let timeOut;
searchInput.addEventListener("input", () => {
  if (searchInput.value.trim().length < 2) {
    suggestionsContainer.style.display = "none";
    return;
  }

  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    showSuggestions(searchInput.value.trim());
  }, 300);
});

let selectedIndex = -1;
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && selectedIndex === -1 && searchInput.value) {
    if (latitude && longitude) {
      extractData();
      const noResults = document.querySelector(".no-results");
      const apiContainer = document.querySelector(".api-container");
      noResults.style.display = "none";
      suggestionsContainer.style.display = "none";
      apiContainer.style.display = initialDisplay;
      longitude = null;
      latitude = null;
    } else {
      console.log(selectedIndex, searchInput.value);
      suggestionsContainer.style.display = "none";
      fetch(`${coordinatesUrl}${searchInput.value}`)
        .then((result) => result.json())
        .then((data) => {
          if (!data.results[0]) {
            showNoResults();
            return;
          }
          const first = data.results[0];

          latitude = first.latitude;
          longitude = first.longitude;
          country = first.country;
          city = first.name;
          searchInput.value = first.admin1
            ? `${first.name}, ${first.admin1}, ${first.country_code}`
            : `${first.name}, ${first.country_code}`;
          extractData();
          const noResults = document.querySelector(".no-results");
          const apiContainer = document.querySelector(".api-container");
          noResults.style.display = "none";
          apiContainer.style.display = initialDisplay;
          longitude = null;
          latitude = null;
        })
        .catch((err) => {
          console.error(err);
          showNoResults();
        });
    }
    return;
  }

  const suggestions = actualSuggestions.querySelectorAll("li");
  if (suggestions.length === 0) return;

  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedIndex =
      selectedIndex < suggestions.length - 1
        ? (selectedIndex += 1)
        : selectedIndex;

    suggestions.forEach((li) => li.classList.remove("active"));
    suggestions[selectedIndex].classList.add("active");
    suggestions[selectedIndex].scrollIntoView({ block: "nearest" });
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedIndex = selectedIndex > 0 ? (selectedIndex -= 1) : selectedIndex;

    suggestions.forEach((li) => li.classList.remove("active"));
    suggestions[selectedIndex].classList.add("active");
    suggestions[selectedIndex].scrollIntoView({ block: "nearest" });
  }

  if (event.key === "Enter") {
    event.preventDefault();
    searchInput.value = suggestions[selectedIndex].textContent;
    suggestions.forEach((li) => li.classList.remove("active"));
    latitude = suggestions[selectedIndex].dataset.latitude;
    longitude = suggestions[selectedIndex].dataset.longitude;
    city = suggestions[selectedIndex].dataset.city;
    country = suggestions[selectedIndex].dataset.country;
    suggestionsContainer.style.display = "none";
    selectedIndex = -1;
  }
});

searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim().length === 0) {
    console.log("primul caz");
    console.log(searchInput.value);
    latitude = null;
    longitude = null;
    return;
  }

  if (searchInput.value.trim().length && !latitude && !longitude) {
    console.log("al doilea caz");
    console.log(searchInput.value);
    suggestionsContainer.style.display = "none";
    fetch(`${coordinatesUrl}${searchInput.value}`)
      .then((result) => result.json())
      .then((data) => {
        if (!data.results[0]) {
          showNoResults();
          return;
        }
        const first = data.results[0];

        latitude = first.latitude;
        longitude = first.longitude;
        country = first.country;
        city = first.name;
        searchInput.value = first.admin1
          ? `${first.name}, ${first.admin1}, ${first.country_code}`
          : `${first.name}, ${first.country_code}`;
        extractData();
        const noResults = document.querySelector(".no-results");
        const apiContainer = document.querySelector(".api-container");
        noResults.style.display = "none";
        apiContainer.style.display = initialDisplay;
        longitude = null;
        latitude = null;
      })
      .catch((err) => {
        console.error(err);
        showNoResults();
      });
  } else {
    console.log("al treilea caz");
    extractData();
    const noResults = document.querySelector(".no-results");
    const apiContainer = document.querySelector(".api-container");
    noResults.style.display = "none";
    apiContainer.style.display = initialDisplay;
    longitude = null;
    latitude = null;
  }
});

forecastOptions.addEventListener("change", () => {
  if (forecastOptions.value === "tomorrow") {
    selectedOption.today = false;
    selectedOption.tomorrow = true;
    const firstHour = Array.from(hourElements).find(
      (element, index) =>
        element.textContent.trim().includes("12 AM") && index !== 0
    );

    firstHour.scrollIntoView({ behavior: "smooth" });
  }

  if (forecastOptions.value === "today") {
    selectedOption.today = true;
    selectedOption.tomorrow = false;
    hourElements[0].scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

hoursContainer.addEventListener("scroll", () => {
  const isAbove = isTomorrowAbove();

  if (isAbove && selectedOption.tomorrow === false) {
    selectedOption.tomorrow = true;
    selectedOption.today = false;
    forecastOptions.value = "tomorrow";
  } else if (!isAbove && selectedOption.today === false) {
    selectedOption.tomorrow = false;
    selectedOption.today = true;
    forecastOptions.value = "today";
  }
});
