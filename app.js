//Object to store the functions and variables necessary for using the API
let weather = {
    //to access the weather
    "apiKey": "9efffb9d3561d03f46b70965c6782b6d",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    //display weather
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed} = data.wind;

        document.querySelector(".city").innerText = "Weather In " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "' )"
    },
    //get content of search bar
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

//making the search bar and search icon work

document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
});

//activating the enter button to fetch results
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Accra");