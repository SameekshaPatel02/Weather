// Weather object to handle API requests and data display
let weather = {
    apiKey: "2f0ad3953411bdfb6c2964fa864b71d0",
    
    // Fetch weather data from OpenWeatherMap API
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    // Display weather data on the page
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        // Update DOM elements with weather information
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        
        // Set background image based on the city name
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },

    // Search for weather based on user input
    search: function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

// Event listener for search button click
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

// Event listener for Enter key press in search bar
document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Initial weather fetch for Bhubaneswar
weather.fetchWeather("Bhubaneswar");
