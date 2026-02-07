// @ts-nocheck

type WeatherSuccess = {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        main: string;
    }[];
};

type WeatherError = {
    message: string;
};

type WeatherResponse = WeatherSuccess | WeatherError;

const apiKey: string = "caf497da08f6679f11b08501f76a1974";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const btn = document.getElementById("getWeatherBtn") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

btn.addEventListener("click", () => {
    if (cityInput.value === "") return;
    fetchWeather(cityInput.value);
});

function fetchWeather(city: string): void {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then((data: WeatherResponse) => {
            if ("message" in data) {
                showError(data.message);
            } else {
                showWeather(data);
            }
        })
        .catch(() => showError("Network error"));
}

function showWeather(data: WeatherSuccess): void {
    resultDiv.innerHTML = `
        <p><b>City:</b> ${data.name}</p>
        <p><b>Temperature:</b> ${data.main.temp} °C</p>
        <p><b>Humidity:</b> ${data.main.humidity}%</p>
        <p><b>Condition:</b> ${data.weather[0].main}</p>
    `;
}

function showError(msg: string): void {
    resultDiv.innerHTML = `<p style="color:red;">${msg}</p>`;
}
