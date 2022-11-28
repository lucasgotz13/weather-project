const cityInput = document.getElementById('city-input');
const weatherDiv = document.querySelector('.weather');
cityInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        const city = cityInput.value
        getWeather(city)
        return city
    }
})

async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7c8c897450e4cc1b6117faf496580c9&units=metric`,
        {
            mode: "cors",
        }
    );
    let data = await response.json();
    console.log(data);
    displayWeather(data)
}

function getWeatherImage(data) {
    const weatherImage = document.createElement('img');
    weatherImage.classList.add('weather-image');
    // make an if case for each weather condition
    console.log(data.weather[0].main)
    switch (data.weather[0].main) {
        case 'Clear':
            weatherImage.src = './assets/sunny.png';
            break;
        case 'Clouds':
            weatherImage.src = './assets/partly_cloudy.png';
            break;
        case 'Rain':
            weatherImage.src = './assets/rain.png';
            break;
        case 'thunderstorm':
            weatherImage.src = './assets/thunderstorm.png';
            break;
        case 'Snow':
            weatherImage.src = './assets/snow.png';
    
        }
        weatherDiv.appendChild(weatherImage);

    }
function displayWeather(data) {
    weatherDiv.innerHTML = ''
    // city name display
    const city = document.createElement('h1');
    city.classList.add('city');
    city.textContent = data.name;
    weatherDiv.appendChild(city);
    // weather img display
    getWeatherImage(data)
    // weather temp display
    const mainTemp = document.createElement('h2');
    mainTemp.classList.add('temp');
    mainTemp.textContent = `${Math.round(data.main.temp)}°C` ;
    weatherDiv.appendChild(mainTemp);
    const minMainDiv = document.createElement('div');
    minMainDiv.classList.add('min-main-div');
    weatherDiv.appendChild(minMainDiv);
    const minTemp = document.createElement('h3');
    minTemp.classList.add('min-temp');
    minTemp.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
    minMainDiv.appendChild(minTemp);
    const maxTemp = document.createElement('h3');
    maxTemp.classList.add('max-temp');
    maxTemp.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
    minMainDiv.appendChild(maxTemp);

}

