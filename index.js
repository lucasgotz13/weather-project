const cityInput = document.getElementById("city-input");
const weatherDiv = document.querySelector(".weather");
const sendButton = document.getElementById("send-button");
const main = document.querySelector('body')
cityInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    const city = cityInput.value;
    getWeather(city);
    return city;
  }
});

sendButton.addEventListener("click", () => {
  const city = cityInput.value;
  getWeather(city);
  return city;
});

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7c8c897450e4cc1b6117faf496580c9&units=metric`,
    {
      mode: "cors",
    }
  );
  let data = await response.json();
  console.log(data);
  displayWeather(data);
}

function getWeatherImage(data) {
  const weatherImage = document.createElement("img");
  weatherImage.classList.add("weather-image");
  // make an if case for each weather condition
  console.log(data.weather[0].main);
  switch (data.weather[0].main) {
    case "Clear":
      weatherImage.src = "./assets/sunny.png";
      break;
    case "Clouds":
      weatherImage.src = "./assets/partly_cloudy.png";
      break;
    case "Rain":
      weatherImage.src = "./assets/rain.png";
      break;
    case "thunderstorm":
      weatherImage.src = "./assets/thunderstorm.png";
      break;
    case "Snow":
      weatherImage.src = "./assets/snow.png";
  }
  // store weather condition into a variable to use later in the getGiphyImage function
  const giphyImage = data.weather[0].main
  weatherDiv.appendChild(weatherImage);
}
function displayWeather(data) {
  weatherDiv.innerHTML = "";
  // city name display
  const city = document.createElement("h1");
  city.classList.add("city");
  city.textContent = data.name;
  weatherDiv.appendChild(city);
  // weather img display
  getWeatherImage(data);
  // weather temp display
  const mainTemp = document.createElement("h2");
  mainTemp.classList.add("temp");
  mainTemp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDiv.appendChild(mainTemp);
  const minMainDiv = document.createElement("div");
  minMainDiv.classList.add("min-main-div");
  weatherDiv.appendChild(minMainDiv);
  const minTemp = document.createElement("h3");
  minTemp.classList.add("min-temp");
  minTemp.textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
  minMainDiv.appendChild(minTemp);
  const maxTemp = document.createElement("h3");
  maxTemp.classList.add("max-temp");
  maxTemp.textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
  minMainDiv.appendChild(maxTemp);
}

async function setBackgroundImage() {
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=W7l1iTCFwnYwDDRk1jQl4M1vwXuOuJmV&s=weather",
    {
      mode: "cors",
    }
  );
  const weatherData = await response.json();
  console.log(weatherData);
  const image = weatherData.data.images.original.url
  main.style.backgroundImage = `url(${image})`  
}

setBackgroundImage();
