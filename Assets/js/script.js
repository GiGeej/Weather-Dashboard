function searchWeather() {
  const apiKey = "74361d775fa838f3e2559184185af99d";
  const cityInput = document.getElementById("cityInput").value;

  // Check if the city is not empty
  if (cityInput.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  // API endpoint for current weather
  const currentWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  // API endpoint for 5-day forecast
  const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;

  // Fetch current weather data
  fetch(currentWeatherEndpoint)
    .then((response) => response.json())
    .then((currentWeatherData) => {
      // Fetch 5-day forecast data
      fetch(forecastEndpoint)
        .then((response) => response.json())
        .then((forecastData) => {
          // Display weather data
          displayWeather(currentWeatherData, forecastData);
        })
        .catch((error) =>
          console.error("Error fetching forecast data:", error)
        );
    })
    .catch((error) =>
      console.error("Error fetching current weather data:", error)
    );
}

function displayWeather(currentWeatherData, forecastData) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "";

  // Display current weather
  const currentWeather = document.createElement("div");
  currentWeather.className = "weather-box";
  const weatherIconCode = currentWeatherData.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
  currentWeather.innerHTML = `
            <h2>${
              currentWeatherData.name
            } (${new Date().toLocaleDateString()})</h2>
            <img src="${weatherIconUrl}" alt="Weather Icon">
            <ul>
                <li>Temperature: ${currentWeatherData.main.temp}°C</li>
                <li>Humidity: ${currentWeatherData.main.humidity}%</li>
                <li>Wind Speed: ${currentWeatherData.wind.speed} m/s</li>
            </ul>
        `;
  weatherResult.appendChild(currentWeather);

  // Display 5-day forecast
  const forecastContainer = document.createElement("div");
  forecastContainer.innerHTML = "<h3>5-Day Forecast</h3>";
  forecastContainer.className = "forecast-container";
  weatherResult.appendChild(forecastContainer);
  const forecastBoxContainer = document.createElement("div");
  forecastBoxContainer.className = "forecast-box-container";
  forecastContainer.appendChild(forecastBoxContainer);

  for (let i = 0; i < 5; i++) {
    const forecastItem = forecastData.list[i * 8];
    const forecastBox = document.createElement("div");
    forecastBox.className = "forecast-box";
    const forecastIconCode = forecastItem.weather[0].icon;
    const forecastIconUrl = `https://openweathermap.org/img/w/${forecastIconCode}.png`;
    forecastBox.innerHTML = `
                <h4>${new Date(forecastItem.dt_txt).toLocaleDateString()}</h4>
                <img src="${forecastIconUrl}" alt="Weather Icon">
                <ul>
                    <li>Temperature: ${forecastItem.main.temp}°C</li>
                    <li>Humidity: ${forecastItem.main.humidity}%</li>
                    <li>Wind Speed: ${forecastItem.wind.speed} m/s</li>
                </ul>
            `;
    forecastBoxContainer.appendChild(forecastBox);
  }
}

// button event handler
document
  .getElementById("searchButton")
  .addEventListener("click", searchWeather);
