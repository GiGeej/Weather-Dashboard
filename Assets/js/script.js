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

// ... (your existing code)

function displayWeather(currentWeatherData, forecastData) {
  const weatherResult = document.getElementById("weatherResult"); // Updated this line
  weatherResult.innerHTML = "";

  // Display current weather
  const currentWeather = document.createElement("div");
  currentWeather.innerHTML = `
          <h2>${currentWeatherData.name}</h2>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Temperature: ${currentWeatherData.main.temp}°C</p>
          <p>Humidity: ${currentWeatherData.main.humidity}%</p>
          <p>Wind Speed: ${currentWeatherData.wind.speed} m/s</p>
      `;
  weatherResult.appendChild(currentWeather);

  // Display 5-day forecast
  const forecast = document.createElement("div");
  forecast.innerHTML = "<h3>5-Day Forecast</h3>";
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const forecastItem = forecastData.list[i];
    forecast.innerHTML += `
              <div class="forecast-item">
                  <p>Date: ${forecastItem.dt_txt}</p>
                  <p>Temperature: ${forecastItem.main.temp}°C</p>
                  <p>Humidity: ${forecastItem.main.humidity}%</p>
                  <p>Wind Speed: ${forecastItem.wind.speed} m/s</p>
              </div>
          `;
  }
  weatherResult.appendChild(forecast);
}

// ... (your existing code)

// button event handler

document
  .getElementById("searchButton")
  .addEventListener("click", searchWeather);
