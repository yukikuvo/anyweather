function search() {
    let city = prompt("Please enter city", "");
    let appid = '&appid=3c04e135221b465d95d4ac216c9c883a&units=metric';
    let mainurl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let forecasturl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

    function getFileSity(fileName) {
        let request = new XMLHttpRequest();
        request.open('GET', fileName, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }
    let weatherResult = getFileSity(mainurl + city + appid);
    let forecastResult = getFileSity(forecasturl + city + appid);

    $(document).ready(function () {
        $(".now-city").html(`Today, ${city}`);
    });
    $(document).ready(function () {
        $(".now-temp").html(`Now: ${weatherResult['main']['temp']}°C`);
    });
    $(document).ready(function () {
        $(".now-min").html(`Minimum: ${weatherResult['main']['temp_min']}°C`);
    });
    $(document).ready(function () {
        $(".now-max").html(`Maximum: ${weatherResult['main']['temp_max']}°C`);
    });
    $(document).ready(function () {
        $(".now-hum").html(`Humidity: ${weatherResult['main']['humidity']}%`);
    });
    $(document).ready(function () {
        $(".now-view").html(`Visibility: ${weatherResult['visibility']} m`);
    });
    $(document).ready(function () {
        $(".now-wind").html(`Wind: ${weatherResult['wind']['speed']} kmh`);
    });
    $(document).ready(function () {
        $(".now-cloud").html(`Clouds: ${weatherResult['clouds']['all']}%`);
    });
    $(document).ready(function () {
        $(".now-text").html(`Description: ${weatherResult['weather'][0]['description']}`);
    });

    if (weatherResult['weather'][0]['main'] == 'Clouds') {
        document.getElementsByTagName('body')[0].style.cssText = ` 
            background: url(assets/img/cloud.jpg) no-repeat;
            background-size: 1366px 926px;
            background-color: black;
        `
    } else if (weatherResult['weather'][0]['main'] == 'Clear') {
        document.getElementsByTagName('body')[0].style.cssText = ` 
            background: url(assets/img/sun.jpg) no-repeat;
            background-size: 1366px 926px;
            background-color: black;
        `
    } else if (weatherResult['weather'][0]['main'] == 'Rain') {
        document.getElementsByTagName('body')[0].style.cssText = ` 
            background: url(assets/img/rain.jpg) no-repeat;
            background-size: 1366px 926px;
            background-color: black;
        `
    }

    var step;
    for (step = 0; step < 40; step++) {
        var forecastday = document.getElementsByClassName("forecast-day")[step];
        forecastday.textContent += `${forecastResult['list'][step]['dt_txt']}`;
        var forecasttemp = document.getElementsByClassName("forecast-temp")[step];
        forecasttemp.textContent += `Main temp: ${forecastResult['list'][step]['main']['temp']}°C`;
        var forecastmin = document.getElementsByClassName("forecast-min")[step];
        forecastmin.textContent += `Minimum: ${forecastResult['list'][step]['main']['temp_min']}°C`;
        var forecastmax = document.getElementsByClassName("forecast-max")[step];
        forecastmax.textContent += `Maximum: ${forecastResult['list'][step]['main']['temp_max']}°C`;
        var forecasthum = document.getElementsByClassName("forecast-hum")[step];
        forecasthum.textContent += `Humidity: ${forecastResult['list'][step]['main']['humidity']}%`;
        var forecastwind = document.getElementsByClassName("forecast-wind")[step];
        forecastwind.textContent += `Wind: ${forecastResult['list'][step]['wind']['speed']} kmh`;
        var forecastcloud = document.getElementsByClassName("forecast-cloud")[step];
        forecastcloud.textContent += `Clouds: ${forecastResult['list'][step]['clouds']['all']}%`;
    }

    document.getElementsByClassName('main')[0].style.display = "block"; 
}