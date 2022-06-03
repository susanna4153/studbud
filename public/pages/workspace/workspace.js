//////////////////////////////////////////////////////////// NAVIGATION LINKS OF TIME FEATURES ////////////////////////////////////////////////////////////
//Setting up HTML DOM Elements
const pomodoroLink = document.getElementsByClassName("pomodoro-link");
const stopwatchLink = document.getElementsByClassName("stopwatch-link");
const settingsLink = document.getElementsByClassName("settings-link");

//Add an event listener to each time feature link
for (var i = 0; i < pomodoroLink.length; i++) {
  pomodoroLink[i].addEventListener("click", (e) => {
    e.preventDefault();
    show("pomodoro-timer", "stopwatch", "settings");
  });
}

for (var i = 0; i < stopwatchLink.length; i++) {
  stopwatchLink[i].addEventListener("click", (e) => {
    e.preventDefault();
    show("stopwatch", "pomodoro-timer", "settings");
  });
}

for (var i = 0; i < settingsLink.length; i++) {
  settingsLink[i].addEventListener("click", (e) => {
    e.preventDefault();
    show("settings", "stopwatch", "pomodoro-timer");
  });
}

// Function to show selected time feature and hide others
function show(shown, hidden1, hidden2) {
  document.getElementById(shown).style.display = "flex";
  document.getElementById(hidden1).style.display = "none";
  document.getElementById(hidden2).style.display = "none";
}

//Set default to pomodoro-timer on page load
window.onload = show("pomodoro-timer", "stopwatch", "settings");

//////////////////////////////////////////////////////////// STOPWATCH ////////////////////////////////////////////////////////////
// Set up DOM elements
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

//Add an event listener for when user presses start butotn
stopwatchStart.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(startStopwatch, 10);
});

//Add event listener for when user presses stop button
stopwatchStop.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
});

//Add event listner for when user presses reset button
stopwatchReset.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchTens = "00";
  stopwatchSeconds = "00";
  stopwatchMinutes = "00";
  appendTens.innerHTML = stopwatchTens;
  appendSeconds.innerHTML = stopwatchSeconds;
  appendMinutes.innerHTML = stopwatchMinutes;
});

//Function for when user starts stopwatch
function startStopwatch() {
  //Increment milliseconds
  stopwatchTens++;

  // Adding a zero to the single digit time values
  if (stopwatchTens <= 9) {
    appendTens.innerHTML = "0" + stopwatchTens;
  }

  //For double digit milliseconds, leave as normal
  if (stopwatchTens > 9) {
    appendTens.innerHTML = stopwatchTens;
  }

  //Once 99 milliseconds have passed, increment seconds
  // Adding a zero to the single digit time values
  if (stopwatchTens > 99) {
    stopwatchSeconds++;
    appendSeconds.innerHTML = "0" + stopwatchSeconds;
    stopwatchTens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  //For double digit seconds, leave as normal
  if (stopwatchSeconds > 9) {
    appendSeconds.innerHTML = stopwatchSeconds;
  }

  //Once 59 seconds have passed, increment minutes
  // Adding a zero to the single digit time values
  if (stopwatchSeconds > 59) {
    stopwatchMinutes++;
    appendMinutes.innerHTML = "0" + stopwatchMinutes;
    stopwatchSeconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }
}

//////////////////////////////////////////////////////////// SETTINGS ////////////////////////////////////////////////////////////
//Slider Controls
const workDuration = document.getElementById("work-duration");
const breakDuration = document.getElementById("break-duration");
const numberOfSessions = document.getElementById("number-of-sessions");

// Get HTML DOM elements for slider control displayed values
const workDurationValueLabel = document.getElementById("work-duration-value");
const breakDurationValueLabel = document.getElementById("break-duration-value");
const numberOfSessionsValueLabel = document.getElementById(
  "number-of-sessions-value"
);

// Update displayed input value according to user-input
workDurationValueLabel.textContent = workDuration.value;
breakDurationValueLabel.textContent = breakDuration.value;
numberOfSessionsValueLabel.textContent = numberOfSessions.value;

// Add an event listener to update displayed input values on input value change
workDuration.addEventListener("change", (e) => {
  workDurationValueLabel.textContent = e.target.value;
});

breakDuration.addEventListener("change", (e) => {
  breakDurationValueLabel.textContent = e.target.value;
});

numberOfSessions.addEventListener("change", (e) => {
  numberOfSessionsValueLabel.textContent = e.target.value;
});

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

//Ensure timer is up to date with user inputed value upon load
window.onload = updatePomodoroTimer();

//////////////////////////////////////////////////////////// POMODORO TIMER ////////////////////////////////////////////////////////////
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

//Add an event listener when start button is pressed
pomodoroStart.addEventListener("click", function () {
  //Start countdown
  countdown();

  //If startTimer variable ie not defined (ie. if the countdown has not began) set an interval of 1000 milliseconds for countdown function
  //Otherwise alert user that timer is already running
  if (startTimer === undefined) {
    startTimer = setInterval(countdown, 1000);
  } else {
    alert("Timer is already running");
  }
});

//Timer Reset
pomodoroReset.addEventListener("click", function () {
  //Render stored values according to user inputed data in settings page
  displayWorkMinutes.innerHTML = document.getElementById("work-duration").value;
  displayWorkSeconds.innerHTML = "00";
  displayBreakMinutes.innerHTML =
    document.getElementById("break-duration").value;
  displayBreakSeconds.innerHTML = "00";

  //Upon reset, set the current session number to 1 again.
  document.getElementById("current-session").innerText = 1;

  //Stop timer from running
  stopInterval();

  //Return to intial value of startTimer variable (which was undefined)
  startTimer = undefined;
});

//Add event listener when stop button is pressed
pomodoroStop.addEventListener("click", function () {
  //Stop timer from running
  stopInterval();

  //Return to intial value of startTimer variable (which was undefined)
  startTimer = undefined;
});

//Start Timer Function
function countdown() {
  //Work timer Countdown
  //If work seconds are not at zero, decrement seconds
  if (displayWorkSeconds.innerText != 0) {
    displayWorkSeconds.innerText--;
    // Adding a zero to the single digit time values
    if (
      displayWorkSeconds.innerText <= 9 &&
      displayWorkSeconds.innerText != 0
    ) {
      displayWorkSeconds.innerText = "0" + displayWorkSeconds.innerText;
    }

    /// Adding a zero to the single digit time values
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
  //Begin break timer once work timer has expended
  if (displayWorkMinutes.innerText == 0 && displayWorkSeconds.innerText == 0) {
    //If break seconds are not at zero, decrement seconds
    if (displayBreakSeconds.innerText != 0) {
      displayBreakSeconds.innerText--;

      // Adding a zero to the single digit time values
      if (
        displayBreakSeconds.innerText <= 9 &&
        displayBreakSeconds.innerText != 0
      ) {
        displayBreakSeconds.innerText = "0" + displayBreakSeconds.innerText;
      }

      // Adding a zero to the single digit time values
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

  //If both work and break timer are expended, reset timer and increment current session number by one
  if (
    displayWorkMinutes.innerText == 0 &&
    displayWorkSeconds.innerText == 0 &&
    displayBreakMinutes.innerText == 0 &&
    displayBreakSeconds.innerText == 0
  ) {
    //Reset Timer values to user inputted data
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

////////////////////////////////////////////////////////////LOAD UP IN PROGRESS COLUMN ///////////////////////////////////////////////////////////////////////////////////
//
var columns = localStorage.getItem("columns")
  ? JSON.parse(localStorage.getItem("columns"))
  : [];

// Render the in progress column
function renderInProgressColumn() {
  // In progress column is always 2nd column in columns object
  columns[1].taskCards.map((taskcard, index) => {
    // Render each taskcard in the "in progress" column in DOM
    //Clone the taskcard template
    const newTaskCard = document
      .getElementById("task-card-template")
      .cloneNode(true);

    //Render stored data
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

    //Event listener to remove taskcard
    deleteTaskButton.addEventListener("click", function () {
      //Get Appropriate Task List Array
      const taskListArray = columns[1].taskCards;
      removeTaskcard(newTaskCard, taskListArray, index);
    });

    //Add to DOM
    document.getElementById("progressColTaskList").appendChild(newTaskCard);
  });
}

//Call the render in progress column function
renderInProgressColumn();
