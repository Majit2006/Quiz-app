// const startingMinutes = 5;
// let time = startingMinutes * 60;

// const countdownEl = document.getElementById("countdown");
// setInterval(updateCountdown, 1000);

// function updateCountdown() {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   seconds = seconds < 5 ? "0" + seconds : seconds;

//   countdownEl.innerHTML = `${minutes} : ${seconds}`;
//   time--;
// }\


var mins = 5;
var secs = mins * 60;
function countdown() {
  setTimeout("Decrement()", 1000);
}

function Decrement() {
  if (document.getElementById) {
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
  }
  if (seconds < 59) {
    seconds.value = secs;
  } else {
    minutes.value = getminutes();
    seconds.value = getseconds();
  }
  if (secs !== 0) {
    secs--;
    setTimeout("Decrement()", 1000);
  } else {
    this.count = 20;
  }
}

function getminutes() {
  // minutes is seconds divided by 60, rounded down
  mins = Math.floor(secs / 60);
  return mins;
}
function getseconds() {
  // take mins remaining (as seconds) away from total seconds remaining
  return secs - Math.round(mins * 60);
}