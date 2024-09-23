// Define the weather API object
const weatherApi = {
  key: "4eb3703790b356562054106543b748b2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

// Add event listener to the dropdown
document.addEventListener("DOMContentLoaded", () => {
  const cityDropdown = document.getElementById("city-dropdown");

  cityDropdown.addEventListener("change", function () {
    const selectedCity = this.value;
    if (selectedCity) {
      // Extract the city and ensure the country code is set to PH (Philippines)
      const [city] = selectedCity.split(",");
      const country = "PH";
      fetchWeather(city, country);
    }
  });
});

// Fetch weather based on selected city
function fetchWeather(city, country) {
  const apiUrl = `${weatherApi.baseUrl}?q=${city},${country}&units=metric&appid=${weatherApi.key}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data, city, country);
        changeBg(data.weather[0].main);
      } else {
        alert("City not found or invalid request!");
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

// Display weather data
function displayWeather(data, city, country) {
  const weatherBody = document.getElementById("weather-body");
  weatherBody.innerHTML = `
    <h2>${city}, ${country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  weatherBody.style.display = "block";
}

// Helper function for date management
function dateManage(dateArg) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = dateArg.getFullYear();
  const month = months[dateArg.getMonth()];
  const date = dateArg.getDate();
  const day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}

// Change background based on weather status
function changeBg(status) {
  const backgrounds = {
    Clouds: "url('img/clouds.jpg')",
    Rain: "url('img/rainy.jpg')",
    Clear: "url('img/clear.jpg')",
    Snow: "url('img/snow.jpg')",
    Sunny: "url('img/sunny.jpg')",
    Thunderstorm: "url('img/thunderstorm.jpg')",
    Drizzle: "url('img/drizzle.jpg')",
    Mist: "url('img/mist.jpg')",
    Haze: "url('img/mist.jpg')",
    Fog: "url('img/mist.jpg')",
  };

  document.body.style.backgroundImage =
    backgrounds[status] || "url('img/bg.jpg')";
}

// Get the appropriate icon class based on weather status
function getIconClass(status) {
  const icons = {
    Rain: "fas fa-cloud-showers-heavy",
    Clouds: "fas fa-cloud",
    Clear: "fas fa-cloud-sun",
    Snow: "fas fa-snowman",
    Sunny: "fas fa-sun",
    Mist: "fas fa-smog",
    Thunderstorm: "fas fa-thunderstorm",
    Drizzle: "fas fa-cloud-rain",
  };

  return icons[status] || "fas fa-cloud-sun";
}

// Reset input field
function reset() {
  const input = document.getElementById("input-box");
  input.value = "";
}

// Add leading zero to numbers less than 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
