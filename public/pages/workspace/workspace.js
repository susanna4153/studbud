////////////////////////// Load up in progress column ////////////////////////
var columns = localStorage.getItem("columns")
  ? JSON.parse(localStorage.getItem("columns"))
  : [];

// Render the in progress column
function renderInProgressColumn() {
  // In progress column is always 2nd column in columns object
  columns[1].taskCards.map((taskcard, index) => {
    // Render each taskcard in the "in progress" column in DOM
    const newTaskCard = document
      .getElementById("task-card-template")
      .cloneNode(true);

    newTaskCard.id = `task-card-${index}`;
    newTaskCard.classList.remove("hidden");
    newTaskCard.classList.add("task-card-template");
    newTaskCard.querySelector(".task-name").innerText = taskcard.taskName;
    newTaskCard.querySelector(".task-class-name").innerText =
      taskcard.className;
    newTaskCard.querySelector(".task-priority").innerText =
      taskcard.priorityRating || "";
    newTaskCard.querySelector(".estimated-completion-time").innerText =
      taskcard.estimatedTime || "0";
    newTaskCard.querySelector(".task-due-date").innerText = taskcard.dueDate;

    //Remove Task functionality
    //Declare HTML button element and give it a unique id
    const deleteTaskButton = newTaskCard.querySelector("#delete-task");
    deleteTaskButton.id = `delete-task-${index}`;

    //Eventlistener to remove taskcard
    deleteTaskButton.addEventListener("click", function () {
      //Get Appropriate Task List Array
      const taskListArray = columns[1].taskCards;
      removeTaskcard(newTaskCard, taskListArray, index);
    });

    // Add to DOM
    document.getElementById("progressColTaskList").appendChild(newTaskCard);
  });
}

renderInProgressColumn();

////////////////////////// Navigation between Time Links ////////////////////////

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

// Function to show selected time feature and hide others
function show(shown, hidden1, hidden2) {
  document.getElementById(shown).style.display = "flex";
  document.getElementById(hidden1).style.display = "none";
  document.getElementById(hidden2).style.display = "none";
}

//Setting default to pomodoro-timer on page load
window.onload = show("pomodoro-timer", "stopwatch", "settings");

////////////////////////// Stopwatch ////////////////////////
// modelled off Clathy Dutton's JavaScript Stopwatch
var stopwatchMinutes = 00;
var stopwatchSeconds = 00;
var stopwatchTens = 00;
var appendTens = document.getElementById("stopwatch-tens");
var appendSeconds = document.getElementById("stopwatch-seconds");
var appendMinutes = document.getElementById("stopwatch-minutes");
const stopwatchStart = document.getElementById("stopwatch-start");
const stopwatchStop = document.getElementById("stopwatch-stop");
const stopwatchReset = document.getElementById("stopwatch-reset");
var stopwatchInterval;

stopwatchStart.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(startStopwatch, 10);
});

stopwatchStop.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
});

stopwatchReset.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchTens = "00";
  stopwatchSeconds = "00";
  stopwatchMinutes = "00";
  appendTens.innerHTML = stopwatchTens;
  appendSeconds.innerHTML = stopwatchSeconds;
  appendMinutes.innerHTML = stopwatchMinutes;
});

function startStopwatch() {
  stopwatchTens++;

  if (stopwatchTens <= 9) {
    appendTens.innerHTML = "0" + stopwatchTens;
  }

  if (stopwatchTens > 9) {
    appendTens.innerHTML = stopwatchTens;
  }

  if (stopwatchTens > 99) {
    stopwatchSeconds++;
    appendSeconds.innerHTML = "0" + stopwatchSeconds;
    stopwatchTens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (stopwatchSeconds > 9) {
    appendSeconds.innerHTML = stopwatchSeconds;
  }

  if (stopwatchSeconds > 59) {
    stopwatchMinutes++;
    appendMinutes.innerHTML = "0" + stopwatchMinutes;
    stopwatchSeconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }
}

//////////////////////// Settings ////////////////////////
//Slider Controls
const workDuration = document.getElementById("work-duration");
const breakDuration = document.getElementById("break-duration");
const numberOfSessions = document.getElementById("number-of-sessions");

//Update pomodoro timer with user input
function updatePomodoroTimer() {
  workDuration.addEventListener("input", () => {
    const workDurationValue = document.getElementById("work-duration").value;
    displayWorkMinutes.innerHTML = workDurationValue;
  });

  breakDuration.addEventListener("input", () => {
    const breakDurationValue = document.getElementById("break-duration").value;
    displayBreakMinutes.innerHTML = breakDurationValue;
  });

  numberOfSessions.addEventListener("input", () => {
    const totalSessions = document.getElementById("total-sessions");
    const numberOfSessionsValue =
      document.getElementById("number-of-sessions").value;
    totalSessions.innerHTML = numberOfSessionsValue;
  });
}

window.onload = updatePomodoroTimer();

////////////////////////// Pomodoro Timer ////////////////////////
//Set up button HTML DOM Elements
var pomodoroStart = document.getElementById("pomodoro-start");
var pomodoroStop = document.getElementById("pomodoro-stop");
var pomodoroReset = document.getElementById("pomodoro-reset");
//Set up respective pomodoro timer and break HTML DOM Elements
var displayWorkMinutes = document.getElementById("pomodoro-minutes");
var displayWorkSeconds = document.getElementById("pomodoro-seconds");
var displayBreakMinutes = document.getElementById("break-minutes");
var displayBreakSeconds = document.getElementById("break-seconds");
var currentSession = document.getElementById("current-session");

//Store a reference to a timer variable
var startTimer;

pomodoroStart.addEventListener("click", function () {
  timer();
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("Timer is already running");
  }
});

//Timer Reset
pomodoroReset.addEventListener("click", function () {
  displayWorkMinutes.innerHTML = document.getElementById("work-duration").value;
  displayWorkSeconds.innerHTML = "00";
  displayBreakMinutes.innerHTML =
    document.getElementById("break-duration").value;
  displayBreakSeconds.innerHTML = "00";

  document.getElementById("current-session").innerText = 1;
  stopInterval();
  startTimer = undefined;
});

//Timer Pause
pomodoroStop.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
});

//Start Timer Function
function timer() {
  //Work timer Countdown
  if (displayWorkSeconds.innerText != 0) {
    displayWorkSeconds.innerText--;
    if (
      displayWorkSeconds.innerText <= 9 &&
      displayWorkSeconds.innerText != 0
    ) {
      displayWorkSeconds.innerText = "0" + displayWorkSeconds.innerText;
    }

    if (displayWorkSeconds.innerText == 0) {
      displayWorkSeconds.innerText = "00";
    }
  }

  //Reset Seconds to 59 once the minute has passed
  else if (
    displayWorkMinutes.innerText != 0 &&
    displayWorkSeconds.innerText == 0
  ) {
    displayWorkSeconds.innerText = 59;
    displayWorkMinutes.innerText--;
  }

  //Break Timer Countdown
  if (displayWorkMinutes.innerText == 0 && displayWorkSeconds.innerText == 0) {
    if (displayBreakSeconds.innerText != 0) {
      displayBreakSeconds.innerText--;

      if (
        displayBreakSeconds.innerText <= 9 &&
        displayBreakSeconds.innerText != 0
      ) {
        displayBreakSeconds.innerText = "0" + displayBreakSeconds.innerText;
      }

      if (displayBreakSeconds.innerText == 0) {
        displayBreakSeconds.innerText = "00";
      }
    } else if (
      displayBreakMinutes.innerText != 0 &&
      displayBreakSeconds.innerText == 0
    ) {
      displayBreakSeconds.innerText = 59;
      displayBreakMinutes.innerText--;
    }
  }

  //Upon session completion, reset timer and increment current session number by one
  if (
    displayWorkMinutes.innerText == 0 &&
    displayWorkSeconds.innerText == 0 &&
    displayBreakMinutes.innerText == 0 &&
    displayBreakSeconds.innerText == 0
  ) {
    //Reset Timer values
    displayWorkMinutes.innerHTML =
      document.getElementById("work-duration").value;
    displayBreakMinutes.innerHTML = "00";
    displayBreakMinutes.innerHTML =
      document.getElementById("break-duration").value;
    displayBreakSeconds.innerHTML = "00";

    //Increment current session number
    currentSession.innerHTML++;
  }
}

//Stop interval Function
function stopInterval() {
  clearInterval(startTimer);
}
