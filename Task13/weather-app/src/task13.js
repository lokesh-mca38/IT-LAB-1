import React, { useState, useEffect } from "react";
import "./task13.css";

function Task13() {

    const [city, setCity] = useState("London");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState("");

    const API_KEY = "1ac5ceb33ffa2128b98afc87b6a85498";

    const getWeather = async () => {

        try {

            setError("");

            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!res.ok) {
                throw new Error("City not found");
            }

            const data = await res.json();
            setWeather(data);

            const res2 = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );

            const forecastData = await res2.json();

            const daily = forecastData.list.filter((item, index) => index % 8 === 0);

            setForecast(daily);

        } catch (err) {

            setError(err.message);
            setWeather(null);
            setForecast([]);

        }

    };

    useEffect(() => {
        getWeather();
    }, []);

    return (
        <div className="container">

            <h1>Weather App</h1>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City"
            />

            <button onClick={getWeather}>Search</button>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="card">

                    <h2>{weather.name}</h2>

                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />

                    <h1 className="temp">{weather.main.temp} °C</h1>

                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>{weather.weather[0].main}</p>

                </div>
            )}

            {forecast.length > 0 && (
                <div className="forecast">

                    <h3>5 Day Forecast</h3>

                    {forecast.map((day, index) => (
                        <div key={index} className="forecast-card">

                            <p>{new Date(day.dt_txt).toDateString()}</p>
                            <p>{day.main.temp} °C</p>
                            <p>{day.weather[0].main}</p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Task13;