// @ts-nocheck
var apiKey = "caf497da08f6679f11b08501f76a1974";
var cityInput = document.getElementById("cityInput");
var btn = document.getElementById("getWeatherBtn");
var resultDiv = document.getElementById("result");
btn.addEventListener("click", function () {
    if (cityInput.value === "")
        return;
    fetchWeather(cityInput.value);
});
function fetchWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric");
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if ("message" in data) {
            showError(data.message);
        }
        else {
            showWeather(data);
        }
    })
        .catch(function () { return showError("Network error"); });
}
function showWeather(data) {
    resultDiv.innerHTML = "\n        <p><b>City:</b> ".concat(data.name, "</p>\n        <p><b>Temperature:</b> ").concat(data.main.temp, " \u00B0C</p>\n        <p><b>Humidity:</b> ").concat(data.main.humidity, "%</p>\n        <p><b>Condition:</b> ").concat(data.weather[0].main, "</p>\n    ");
}
function showError(msg) {
    resultDiv.innerHTML = "<p style=\"color:red;\">".concat(msg, "</p>");
}
