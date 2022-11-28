const cityInput = document.getElementById('city-input');

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
    const data = await response.json();
    console.log(data);
}

