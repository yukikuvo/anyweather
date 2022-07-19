function darkmode () {
    alert('hello');
}

function showreset () {
    document.getElementsByClassName('modal-reset')[0].style.display = "block";
}

function resetall (confirmreset) {
    if (confirmreset == true) {
        localStorage.clear();
        location.reload(true);
    } else {
        document.getElementsByClassName('modal-reset')[0].style.display = "none";    }
}