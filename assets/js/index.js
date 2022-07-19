viewHistory();

function search() {
    var city = prompt("Please enter city", "").toLowerCase(); ;
    let appid = '&appid=3c04e135221b465d95d4ac216c9c883a&units=metric';
    let mainurl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let forecasturl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    saveHistory(city);

    document.getElementsByClassName('now-day-weather')[0].style.display = "block";
    //document.getElementsByClassName('toforecast-day-text')[0].style.display = "block";

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
        forecastday.innerHTML = (`${forecastResult['list'][step]['dt_txt']}`);
        var forecasttemp = document.getElementsByClassName("forecast-temp")[step];
        forecasttemp.innerHTML = (`Main temp: ${forecastResult['list'][step]['main']['temp']}°C`);
        var forecastmin = document.getElementsByClassName("forecast-min")[step];
        forecastmin.innerHTML = (`Minimum: ${forecastResult['list'][step]['main']['temp_min']}°C`);
        var forecastmax = document.getElementsByClassName("forecast-max")[step];
        forecastmax.innerHTML = (`Maximum: ${forecastResult['list'][step]['main']['temp_max']}°C`);
        var forecasthum = document.getElementsByClassName("forecast-hum")[step];
        forecasthum.innerHTML = (`Humidity: ${forecastResult['list'][step]['main']['humidity']}%`);
        var forecastwind = document.getElementsByClassName("forecast-wind")[step];
        forecastwind.innerHTML = (`Wind: ${forecastResult['list'][step]['wind']['speed']} kmh`);
        var forecastcloud = document.getElementsByClassName("forecast-cloud")[step];
        forecastcloud.innerHTML = (`Clouds: ${forecastResult['list'][step]['clouds']['all']}%`);
    }
}

function saveHistory(cityName) {
    const arr = [];

    if (localStorage.getItem('History') == null) {
        var addCity = {
            name: cityName,
            url: "#"
            };
        arr.push(addCity);
        localStorage.setItem('History', JSON.stringify(arr));
    } else {
        const arrNext = JSON.parse(localStorage.getItem('History'));
        var addCity = {
            name: cityName,
            url: "#"
            };
        arrNext.push(addCity);
        localStorage.clear();
        localStorage.setItem('History', JSON.stringify(arrNext));
    }
    console.log(JSON.parse(localStorage.getItem('History')));

    let posts = JSON.parse(localStorage.getItem('History'))
    let historyField = document.getElementById('history')
    let out = '';
    for (let index = 0; posts.length > index; index++) {
        out = `<a class="historylink" href="${posts[index]['url']}">${posts[index]['name']}</a><br>` + out;
    }

    historyField.innerHTML = out;
}

function viewHistory () {
    let checkposts = JSON.parse(localStorage.getItem('History'))
    let goodclear = removeDuplicates(checkposts);
    localStorage.clear();
    localStorage.setItem('History', JSON.stringify(goodclear));
    let posts = JSON.parse(localStorage.getItem('History'));
    let historyField = document.getElementById('history');
    let out = '';
    for (let index = 0; posts.length > index; index++) {
        out = `<a class="historylink" href="${posts[index]['url']}">${posts[index]['name']}</a><br>` + out;
    }

    historyField.innerHTML = out;
}

function removeDuplicates(arr) {

    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {
    
        if (duplicatesIndices.includes(index)) return;
    
        result.push(current);
    
        // Сравниваем каждый элемент в массиве после текущего
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
        
            const comparison = arr[comparisonIndex];
            const currentKeys = Object.keys(current);
            const comparisonKeys = Object.keys(comparison);
            
            // Проверяем длину массивов
            if (currentKeys.length !== comparisonKeys.length) continue;
            
            // Проверяем значение ключей
            const currentKeysString = currentKeys.sort().join("").toLowerCase();
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
            if (currentKeysString !== comparisonKeysString) continue;
            
            // Проверяем индексы ключей
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i];
                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false;
                    break;
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
            
        } // Конец цикла
    });  
    return result;
}

$('#history a').on('click', function(){
    nextdatasend = $(this).text();
    cityfromhistory(nextdatasend);
  });

function cityfromhistory(mycityname) {
    let appid = '&appid=3c04e135221b465d95d4ac216c9c883a&units=metric';
    let mainurl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let forecasturl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

    document.getElementsByClassName('now-day-weather')[0].style.display = "block";
    //document.getElementsByClassName('toforecast-day-text')[0].style.display = "block";

    function getFileSity(fileName) {
        let request = new XMLHttpRequest();
        request.open('GET', fileName, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }
    let weatherResult = getFileSity(mainurl + mycityname + appid);
    let forecastResult = getFileSity(forecasturl + mycityname + appid);

    $(document).ready(function () {
        $(".now-city").html(`Today, ${mycityname}`);
    });
    $(document).ready(function () {
        $(".now-temp").html(`Now: <br> ${weatherResult['main']['temp']}°C`);
    });
    $(document).ready(function () {
        $(".now-min").html(`Minimum: <br> ${weatherResult['main']['temp_min']}°C`);
    });
    $(document).ready(function () {
        $(".now-max").html(`Maximum: <br> ${weatherResult['main']['temp_max']}°C`);
    });
    $(document).ready(function () {
        $(".now-hum").html(`Humidity: <br> ${weatherResult['main']['humidity']}%`);
    });
    $(document).ready(function () {
        $(".now-view").html(`Visibility: <br> ${weatherResult['visibility']} m`);
    });
    $(document).ready(function () {
        $(".now-wind").html(`Wind: <br> ${weatherResult['wind']['speed']} kmh`);
    });
    $(document).ready(function () {
        $(".now-cloud").html(`Clouds: <br> ${weatherResult['clouds']['all']}%`);
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
        forecastday.innerHTML = (`${timeConverter(forecastResult['list'][step]['dt'])}`);
        var forecasttemp = document.getElementsByClassName("forecast-temp")[step];
        forecasttemp.innerHTML = (`Main temp: <br> ${forecastResult['list'][step]['main']['temp']}°C`);
        var forecastmin = document.getElementsByClassName("forecast-min")[step];
        forecastmin.innerHTML = (`Minimum: <br> ${forecastResult['list'][step]['main']['temp_min']}°C`);
        var forecastmax = document.getElementsByClassName("forecast-max")[step];
        forecastmax.innerHTML = (`Maximum: <br> ${forecastResult['list'][step]['main']['temp_max']}°C`);
        var forecasthum = document.getElementsByClassName("forecast-hum")[step];
        forecasthum.innerHTML = (`Humidity: <br> ${forecastResult['list'][step]['main']['humidity']}%`);
        var forecastwind = document.getElementsByClassName("forecast-wind")[step];
        forecastwind.innerHTML = (`Wind: <br> ${forecastResult['list'][step]['wind']['speed']} kmh`);
        var forecastcloud = document.getElementsByClassName("forecast-cloud")[step];
        forecastcloud.innerHTML = (`Clouds: <br> ${forecastResult['list'][step]['clouds']['all']}%`);
    }



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + '00' ;
    return time;
  }
}