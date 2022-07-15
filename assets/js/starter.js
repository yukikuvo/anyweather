window.onload = function () {
    var localily = localStorage.getItem('welcome');
    console.log(localily);
    
    if (localily == null) {
        document.getElementsByClassName("welcome")[0].style.display = "block";
        localStorage.setItem('welcome', '1');
    } else {
        // nothing show
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isNotFirstUserActivity = localStorage.getItem('welcome');

    if(isNotFirstUserActivity === 'true') {
      const currentItemToDisplayNone = document.querySelector('h1');
      currentItemToDisplayNone.style.display = 'none';

    }
      localStorage.setItem('welcome', 'true');
})

function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}