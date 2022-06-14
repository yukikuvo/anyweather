Data = new Date();
Month = Data.getMonth();
Day = Data.getDate();

switch (Month)
{
  case 0: fMonth="Jan"; break;
  case 1: fMonth="Feb"; break;
  case 2: fMonth="Mar"; break;
  case 3: fMonth="Apr"; break;
  case 4: fMonth="May"; break;
  case 5: fMonth="June"; break;
  case 6: fMonth="July"; break;
  case 7: fMonth="Aug"; break;
  case 8: fMonth="Sep"; break;
  case 9: fMonth="Oct"; break;
  case 10: fMonth="Nov"; break;
  case 11: fMonth="Dec"; break;
}

$(document).ready(function () {
    $(".first-day").html(Day+1 + `, ${fMonth}`);
});

$(document).ready(function () {
    $(".second-day").html(Day+2 + `, ${fMonth}`);
});

$(document).ready(function () {
    $(".third-day").html(Day+3 + `, ${fMonth}`);
});

$(document).ready(function () {
    $(".fourth-day").html(Day+4 + `, ${fMonth}`);
});

$(document).ready(function () {
    $(".fifth-day").html(Day+5 + `, ${fMonth}`);
});