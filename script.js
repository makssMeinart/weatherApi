// Вызывал города по именам так как чуть не положил ПК когда попробывал запустить файл с 1.8 милионов городами


// Variables
const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "apik": "284f8024e54dc0852c1938b037a630da",
}

const cities = {
    "London": "London",
    "Kyiv": "Kyiv",
    "Minsk": "Minsk",
    "Gdansk": "Gdansk",
    "Edinburgh": "Edinburgh",
    "Daugavpils": "Daugavpils",
    "Riga":"Riga",
}


// getWeather function
function getWeather() {
    // Final City Name
    let cityName = "";    
    // Create the select and get the value
    createSelect();

    fetch(`${param.url}weather?q=${cityName}&appid=${param.apik}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);


        function createSelect() {
            const cardSelect = document.querySelector("#card-select");
        
            // Only let it run if select.length is 0
            if(cardSelect.length == 0) {   
                for(let key in cities) {
                    // Create select with options
                    const newOption = document.createElement("option");
                    newOption.value = cities[key];
                    newOption.textContent = cities[key];
                    cardSelect.appendChild(newOption);
                }
            }   
            // Get the select value
            cityName = cardSelect.value;
        }
}

// Change all the visual stats
function showWeather(data) {
    // Location
    document.querySelector(".weather-card__title").textContent = data.name
    // Celsius
    document.querySelector("#temp-ammount").textContent = Math.round(data.main.temp - 270);
    // Condition
    document.querySelector(".weather-card__status-cond").textContent = data.weather[0].description;
    // Weather Icon
    document.querySelector(".weather-card__status-img").setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    // Wind Section
    // Wind Speed
    document.querySelector("#controll-card__wind-speed").textContent = `Speed: ${data.wind.speed}`;
    // Wind Degrees
    document.querySelector("#controll-card__wind-deg").textContent = `Deg: ${data.wind.deg}`;    
}

getWeather();
document.querySelector("#main-btn").onclick = getWeather;


