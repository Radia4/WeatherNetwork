// OpenWeatherMap API key
const apiKey = "61ae660a5c74e3205405e97503d3ee7a";
// Base URL for the OpenWeatherMap API, using metric units
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the input field where the user will type the city name
const searchBox = document.querySelector(".search input");
// Select the search button
const searchBtn = document.querySelector(".search button");
// Select the image element that displays the weather icon
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch and display weather data for a given city
async function checkWeather(city) {
    // Send a GET request to the OpenWeatherMap API with the city and API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Check if the city name is invalid (status code 404)
    if (response.status == 404) {
        // Show error message and hide weather details
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the JSON response containing the weather data
        var data = await response.json();

        // Get current Unix timestamp (seconds since 1970) for comparison with sunrise/sunset times
        const currentTime = new Date().getTime() / 1000;  // Convert milliseconds to seconds
        const sunrise = data.sys.sunrise;  // Sunrise time in Unix timestamp
        const sunset = data.sys.sunset;    // Sunset time in Unix timestamp

        // Update the city name, temperature, humidity, and wind speed in the DOM
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "WeatherAppImages/Cloud.png";
        } else if (data.weather[0].main == "Clear") {
            // Check if it's night or day to display the appropriate icon for clear sky
            if (currentTime >= sunset || currentTime < sunrise) {
                weatherIcon.src = "WeatherAppImages/moon.png";  // Nighttime clear sky
            } else {
                weatherIcon.src = "WeatherAppImages/ClearSkyD.png";  // Daytime clear sky
            }
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "WeatherAppImages/Drizzle.png";
        } else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "WeatherAppImages/thunderstorm.png";    
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "WeatherAppImages/Drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "WeatherAppImages/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "WeatherAppImages/Snow.png";
        }

        // Show weather details and hide error message if everything is valid
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add an event listener to the search button
// When the button is clicked, fetch the weather data for the entered city
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
