function search() {
    let city = prompt("Please enter city", "");
    let appid = '&appid=3c04e135221b465d95d4ac216c9c883a&units=metric';
    let mainurl = 'https://api.openweathermap.org/data/2.5/weather?q=';

    function getFileSity(fileName) {
        let request = new XMLHttpRequest();
        request.open('GET', fileName, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }
    let weatherResult = getFileSity(`${mainurl} + ${city} + ${appid}`);
    // let weatherIcon = weatherResult['weather'][0]['icon'];

    $(document).ready(function () {
        $(".weather-now-city").html(`Today, ${city}`);
    });
    $(document).ready(function () {
        $(".weather-now-temp").html(`Now: ${weatherResult['main']['temp']}°C`);
    });
    $(document).ready(function () {
        $(".weather-text").html(`Description: ${weatherResult['weather'][0]['description']}`);
    });

    if (weatherResult['weather'][0]['main'] == 'Clouds') {
        document.body.style.background = "url(assets/img/cloud.jpg) no-repeat";
    } else if (weatherResult['weather'][0]['main'] == 'Clear') {
        document.getElementsByTagName('body')[0].style.cssText = ` 
            background: url(assets/img/sun.jpg) no-repeat;
            background-size: 1366px 768px;
        `
    } else if (weatherResult['weather'][0]['main'] == 'Rain') {
        document.getElementsByTagName('body')[0].style.cssText = ` 
            background: url(assets/img/rain.jpg) no-repeat;
            background-size: 1366px 768px;
        `
    }
    weekForecast();
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
// console.log(timeConverter(1655229600));

function weekForecast() {

}