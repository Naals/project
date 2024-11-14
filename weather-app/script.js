const apiKey = "f3b5c4f8d94cbd39429f2b54368f8a33";
const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFound = document.querySelector(".not-found");
const searchCity = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const conditionText = document.querySelector(".condition-txt");
const countryText = document.querySelector(".country-text");
const currentDataText = document.querySelector(".current-date-txt");
const tempText = document.querySelector(".temp-txt");
const humidityValueText = document.querySelector(".humidity-value-txt");
const windValueText = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const forecastItemsContainer = document.querySelector(".forecast-items-container");
const unit = document.querySelector(".unit");
let lastSearchedCity;

searchBtn.addEventListener("click", () => {
    if(cityInput.value.trim() !== ''){
        lastSearchedCity = cityInput.value;
        updateWeatherInfo(cityInput.value,unit.textContent === '°C' ? 'metric' : 'imperial');
        cityInput.value = '';
        cityInput.blur();
    }
})
cityInput.addEventListener("keydown", (e) => {
    if(e.key === 'Enter' && cityInput.value.trim() !== ''){
        lastSearchedCity = cityInput.value;
        updateWeatherInfo(cityInput.value, unit.textContent === '°C' ? 'metric' : 'imperial');
        cityInput.value = '';
        cityInput.blur();
    }
})

async function getFetchData(endPoint, city, unit) {
    const api = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=${unit}`;
    const response = await fetch(api);
    console.log(api);
    return response.json();
}

async function updateWeatherInfo(city, unit) {
    const weatherData = await getFetchData('weather', city, unit);
    console.log(weatherData);

    if(weatherData.cod != 200){
        showDisplaySection(notFound);
        return
    }

    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}

    } = weatherData;
    let newUnit = unit === 'metric' ? '°C' : '°F';
    let newSpeed = unit ===  'metric' ? 'M/s' : 'M/h';
    countryText.textContent = country;
    tempText.textContent = Math.round(temp) + ` ${newUnit}`;
    conditionText.textContent = main;
    humidityValueText.textContent = humidity + '%';
    windValueText.textContent= speed + ` ${newSpeed}`;
    currentDataText.textContent = getCurrentData();
    weatherSummaryImg.src=`assets/${getWeatherIcon(id)}`;

    await updateForecastInfo(city, unit);
    showDisplaySection(weatherInfoSection);
}

async function updateForecastInfo(city, unit) {
    const forecastData = await getFetchData('forecast', city, unit);
    forecastItemsContainer.innerHTML = '';

    const timeTaken = '12:00:00';
    const todayTime = new Date().toISOString().split('T')[0];

    forecastData.list.forEach(forecast => {
        if(forecast.dt_txt.includes(timeTaken) && !forecast.dt_txt.includes(todayTime)){
            console.log(forecast);
            updateForecastItems(forecast, unit);
        }

    })
}

function updateForecastItems(weatherData, unit) {
    let newUnit = unit === 'metric' ? '°C' : '°F'

    const {
        dt_txt: date,
        weather: [{id}],
        main: {temp}
    } = weatherData;
    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateRes = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem =
            `<div class="forecast-item">
                <h5 class="forecast-item-date regular-txt">${dateRes}</h5>
                <img src="assets/${getWeatherIcon(id)}" alt="light" class="forecast-item-img">
                <h5 class="forecast-item-temp">${Math.round(temp)} ${newUnit}</h5>
            </div>`


    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCity, notFound].forEach(item => item.style.display = 'none');
    section.style.display = 'flex';
}

function getWeatherIcon(id) {
    if(id <= 232){
        return 'rainAndLighting.svg';
    }
    if(id <= 321){
        return 'rainAndSun.svg';
    }
    if(id <= 531){
        return 'rainyAndWind.svg';
    }
    if(id <= 622){
        return 'Snow.svg';
    }
    if(id <= 781){
        return 'Tornado.svg';
    }
    if(id <= 800){
        return 'sunny.svg';
    }
    else{
        return 'cloudy.svg';
    }
}

function getCurrentData() {
    const currentData = new Date();
    const options= {
        weekday : 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentData.toLocaleDateString('en-GB', options);
}

unit.onclick = (e) => {
    const currentUnit = e.target.innerText;
    let newUnit = '°C';

    if(currentUnit === '°C'){
        newUnit = '°F';
    }

    unit.textContent = newUnit;

    // Pass last searched city and new unit
    updateWeatherInfo(lastSearchedCity, newUnit === '°C' ? 'metric' : 'imperial');
}