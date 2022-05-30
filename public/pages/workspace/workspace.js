// Function to show selected time feature and hide others
function show(shown, hidden1, hidden2) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden1).style.display = "none";
  document.getElementById(hidden2).style.display = "none";
}

//Setting up HTML DOM Elements 
const pomodoroLink = document.getElementsByClassName("pomodoro-link");
const stopwatchLink = document.getElementsByClassName("stopwatch-link");
const settingsLink = document.getElementsByClassName("settings-link");

//Add an event listener to each time feature link
for (var i = 0; i < pomodoroLink.length; i++) {
    pomodoroLink[i].addEventListener("click", function () {
        show("pomodoro-timer", "stopwatch", "settings");
      });
}

for (var i = 0; i < stopwatchLink.length; i++) {
    stopwatchLink[i].addEventListener("click", function () {
        show("stopwatch", "pomodoro-timer", "settings");
      });
}

for (var i = 0; i < settingsLink.length; i++) {
    settingsLink[i].addEventListener("click", function () {
        show("settings", "stopwatch", "pomodoro-timer");
      });
}

//Setting default to pomodoro-timer on page load
window.onload = show("pomodoro-timer", "stopwatch", "settings");


//Stopwatch - modelled off Clathy Dutton's JavaScript Stopwatch
// https://codepen.io/cathydutton/pen/xxpOOw?editors=1010 
window.onload = function () {
    var minutes = 00;
    var seconds = 00; 
    var tens = 00; 
    var appendTens = document.getElementById("tens");
    var appendSeconds = document.getElementById("seconds");
    var appendMinutes = document.getElementById("minutes");
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var stopwatchInterval;
  
    buttonStart.onclick = function() {
        clearInterval(stopwatchInterval);
        stopwatchInterval = setInterval(startStopwatch, 10);
    }
    
    buttonStop.onclick = function() {
        clearInterval(stopwatchInterval);
    }
    
  
    buttonReset.onclick = function() {
       clearInterval(stopwatchInterval);
        tens = "00";
        seconds = "00";
        minutes= "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
        
    }
    
    
    function startStopwatch () {
      tens++;
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }

      if (seconds > 59){
          minutes++;
          appendMinutes.innerHTML = "0" + minutes;
          seconds = 0;
          appendSeconds.innerHTML = "0" + 0
      }
    }
  }

//Pomodoro timer 
var workMinutes = 25;
var workSeconds = 00;
var displayWorkMinutes = document.getElementById("pomodoro-minutes");
var displayWorkSeconds = document.getElementById("pomodoro-seconds");
var pomodoroStart = document.getElementById("pomodoro-start");
var pomodoroStop = document.getElementById("pomodoro-stop");
var pomodoroReset = document.getElementById("pomodoro-reset");
var pomodoroInterval;

pomodoroStart.addEventListener("click", function(){
    clearInterval(pomodoroInterval);
    pomodoroInterval = setInterval(pomodoroStart, 1000);
})

pomodoroStop.onclick = function() {
    clearInterval(Interval);
}

function pomodoroStart() {

}



//Settings
var workDuration = document.getElementById('work-duration');
var breakDuration = document.getElementById('break-duration');
var numberOfSessions = document.getElementById('number-of-sessions');

//Retrieve user input for work duration
workDuration.addEventListener("input", function(event){
    //Retrieve
    var workDurationValue = document.getElementById('work-duration').value

    //Update
    displayWorkMinutes.innerHTML = workDurationValue;
    console.log(workDurationValue);
})

//Retrieve user input for break duration
breakDuration.addEventListener("input", function(event){
    var breakDurationValue = document.getElementById('break-duration').value
    console.log(breakDurationValue);
})

//Retrieve user input for total number of sessions and update on pomodoro timer
numberOfSessions.addEventListener("input", function(event){
    //Retrieve
    var numberOfSessionsValue = document.getElementById('number-of-sessions').value;

    //Update
    var totalSessions = document.getElementById('total-sessions');
    totalSessions.innerHTML = numberOfSessionsValue;
})











