// OpenWeatherMap API key and base URL
const apiKey = "2b813323d85d2ad0ed841ed44a0315e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Selecting DOM elements for search and display
const serachBox = document.querySelector(".search input");
const serachBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// On initial page load, set the default background
window.addEventListener("DOMContentLoaded", () => {
    const bgContainer = document.getElementById('background-container');
    bgContainer.innerHTML = `<video src="videos/default.mp4" autoplay loop muted></video>`;
});


// Main function to fetch weather data from API
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Handle invalid city name (404 error)
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return; // ⛔ Stop execution, don't clear input
    }

    // If valid response, parse JSON
    const data = await response.json();
    console.log(data); // Debugging log

    // Update DOM with weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Extract main condition and update background
    const condition = data.weather[0].main;
    setWeatherBackground(condition);

    // Set weather icon based on condition
    if (condition == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (condition == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    if (condition == "Clouds") {
    weatherIcon.src = "images/clouds.png";
    weatherIcon.setAttribute("title", "Cloudy");
} else if (condition == "Clear") {
    weatherIcon.src = "images/clear.png";
    weatherIcon.setAttribute("title", "Sunny");
} else if (condition == "Rain") {
    weatherIcon.src = "images/rain.png";
    weatherIcon.setAttribute("title", "Rainy");
} else if (condition == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
    weatherIcon.setAttribute("title", "Drizzling");
} else if (condition == "Mist") {
    weatherIcon.src = "images/mist.png";
    weatherIcon.setAttribute("title", "Misty");
} else if (condition == "Snow") {
    weatherIcon.src = "images/snow.png";
    weatherIcon.setAttribute("title", "Snowy");
} else {
    weatherIcon.setAttribute("title", "Weather");
}


    // Show weather card, hide error
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    // Clear input field only on successful search
    serachBox.value = "";
}

// Trigger search on clicking the search button
serachBtn.addEventListener("click", () => {
    checkWeather(serachBox.value);
    // Don't clear input here — it's handled after success
});

// Trigger search on pressing Enter key inside input
serachBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkWeather(serachBox.value);
        // Don't clear here — handled inside checkWeather after success
    }
});

// Dynamically set weather-based background video
function setWeatherBackground(condition) {
    const bgContainer = document.getElementById('background-container');
    let src = "";

    // Map condition to corresponding video
    if (condition === "Clear") {
        src = "videos/Clear.mp4";
    } else if (condition === "Clouds") {
        src = "videos/Cloudy.mp4";
    } else if (condition === "Rain" || condition === "Drizzle") {
        src = "videos/Rainy.mp4";
    } else if (condition === "Snow") {
        src = "videos/Snow.mp4";
    } else if (condition === "Mist") {
        src = "videos/Mist.mp4";
    } else if (condition === "Windy") {
        src = "videos/Windy.mp4";
    } else {
        // Fallback default video for unrecognized weather
        src = "videos/default.mp4";
    }

    // Replace background with new video as condition matched
    bgContainer.innerHTML = `<video src="${src}" autoplay loop muted></video>`;
}
