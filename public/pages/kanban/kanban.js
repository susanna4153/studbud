//////////////////////////////////////////////////////////// GLOBAL ARRAY ////////////////////////////////////////////////////////////
//Set up global array in local storage to set up all kanban columns and the taskcards within
var columns = localStorage.getItem("columns")
  ? JSON.parse(localStorage.getItem("columns"))
  : [
      {
        title: "To Do",
        taskCards: [
          {
            taskName: "Read Textbook Chapter 2",
            className: "LAWS2017",
            priorityRating: "High",
            estimatedTime: 240,
            dueDate: "09-06-2022",
          },
          {
            taskName: "Complete Tutorial Question",
            className: "LAWS3123",
            priorityRating: "Low",
            estimatedTime: 80,
            dueDate: "07-08-2022",
          },
        ],
      },
      {
        title: "In Progress",
        taskCards: [],
      },
      { title: "Done", taskCards: [] },
    ];

//////////////////////////////////////////////////////////// COLUMNS ////////////////////////////////////////////////////////////
//Set up variables for HTML elements using DOM selection
const kanbanBoard = document.getElementById("kanban");
const addTaskButton = document.getElementById("add-task");
const columnform = document.getElementById("column-form");
const columnNameInput = document.getElementById("column-name-input");
const columnModal = document.getElementById("columnModal");

// Column Modal form submission event listener
columnform.addEventListener("submit", function (event) {
  //Prevent page from refreshing upon submit
  event.preventDefault();

  //Run add column function with user-inputed column name as argument
  let columnName = columnNameInput.value;
  if (columnName) {
    addColumn(columnName);
  }

  //Close Modal Manually
  var modal = bootstrap.Modal.getInstance(columnModal);
  modal.hide();

  columnform.reset();
});

// Function to add column with user inputs as parameters
function addColumn(title) {
  let column = {
    title: title,
    taskCards: [],
  };

  //Add column object into column array
  columns.push(column);

  // Update Local Storage
  localStorage.setItem("columns", JSON.stringify(columns));

  // Rerender displayed columns
  renderColumn();

  //Rerender drag-drop functionality
  loadDrag();
}

// Function to load up columns
function renderColumn() {
  // Clear columns before load to prevent duplicates
  kanbanBoard.querySelectorAll(".column-template").forEach((column) => {
    column.remove();
  });

  //Duplicate Column Template
  columns.map((column, index) => {
    //Clone HTML column template
    const newColumn = document
      .getElementById("column-template")
      .cloneNode(true);

    //Give it a unique id
    newColumn.id = `column-${index}`;
    newColumn.classList.add("column-template");

    //Remove hidden class to show on page
    newColumn.classList.remove("hidden");

    //Give unique id to tasklist within
    newColumn.querySelector("#taskList").id = `taskList-${index}`;

    //Enter in user input for the column name
    newColumn.querySelector(".column-title").textContent = column.title;

    //Give delete button a unique id
    newColumn.querySelector("#delete-col").id = `delete-col-${index}`;
    var columnDeleteButton = newColumn.querySelector(`#delete-col-${index}`);
    columnDeleteButton.addEventListener("click", function () {
      removeColumn(newColumn, index);
    });

    //Add to Kanbanboard
    kanbanBoard.appendChild(newColumn);

    //Render Task cards within column
    renderTask(column.taskCards, index);
  });

  //Hide delete button from default columns
  var toDoColumnDeleteButton0 = document.getElementById("delete-col-0");
  toDoColumnDeleteButton0.setAttribute("class", "hidden");
  var toDoColumnDeleteButton1 = document.getElementById("delete-col-1");
  toDoColumnDeleteButton1.setAttribute("class", "hidden");
  var toDoColumnDeleteButton2 = document.getElementById("delete-col-2");
  toDoColumnDeleteButton2.setAttribute("class", "hidden");
}

//Load up the columns
renderColumn();

//Delete Column Function
function removeColumn(columnToRemove, arrIndex) {
  columnToRemove.remove();

  //Remove from local array
  columns.splice(arrIndex, 1);

  //Update local storage
  localStorage.setItem("columns", JSON.stringify(columns));

  //Rerender columns
  renderColumn();

  //Rerender drag-drop functionality
  loadDrag();
}

//////////////////////////////////////////////////////////// TASK MODAL  ////////////////////////////////////////////////////////////
// Basic form DOM elements
const taskForm = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var classInput = document.getElementById("classInput");
var priorityInput = document.getElementById("priorityInput");
var dueDateInput = document.getElementById("dueDateInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");

// Access first To-do column of the column array
const toDoTaskList = document.getElementById("taskList-0");

// Column Name Form submission event listener
taskForm.addEventListener("submit", function (event) {
  //Prevent page from refreshing upon submit
  event.preventDefault();

  //Obtain user data and set as arguments for addTask function
  let task = taskInput.value;
  let className = classInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  let dueDate = dueDateInput.value;
  let estimatedTime = estimatedTimeInput.value;
  if (task) {
    addTask(task, className, priorityRating, dueDate, estimatedTime);
  }

  //Close Modal Manually
  var modal = bootstrap.Modal.getInstance(taskModal);
  modal.hide();
});

function addTask(taskName, className, priorityRating, dueDate, estimatedTime) {
  //Create taskcard based off user input
  let task = {
    taskName,
    className,
    priorityRating,
    dueDate,
    estimatedTime,
  };

  columns[0].taskCards.push(task);
  renderTask(columns[0].taskCards, 0);
  localStorage.setItem("columns", JSON.stringify(columns));

  //Re-render drag-drop functionality
  loadDrag();
}

//Function to load up Tasks
function renderTask(columnTasks, colIndex) {
  var selectedColumn = document.getElementById(`taskList-${colIndex}`);

  //Clear Task List before load to prevent duplicates
  selectedColumn.querySelectorAll(".task-card-template").forEach((taskcard) => {
    taskcard.remove();
  });

  columnTasks.map((taskcard, index) => {
    //Duplicate taskcard template
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
      const taskListArray = columns[colIndex].taskCards;
      removeTaskcard(newTaskCard, taskListArray, index);
    });

    //Append to appropriate column
    selectedColumn.appendChild(newTaskCard);
  });
}

//Function to remove taskcard
function removeTaskcard(taskcard, taskListArray, arrIndex) {
  //Remove taskcard HTML element
  taskcard.remove();

  //Remove taskcard form tasklist array
  taskListArray.splice(arrIndex, 1);

  //Update local storage
  localStorage.setItem("columns", JSON.stringify(columns));
  renderColumn();

  loadDrag();
}

//Drag Drop functionality for cards
function loadDrag() {
  //Set up HTML DOM elements for draggable taskcards and tasklists
  const draggables = document.querySelectorAll(".draggable");
  const taskListContainer = document.querySelectorAll(".taskList");

  //Function for drag drop function
  draggables.forEach((draggable) => {
    const initialColIndex = draggable.parentNode.id.slice(9);
    const draggableIndex = draggable.id.slice(10);

    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");

      // Add to new column
      const endColIndex = draggable.parentNode.id.slice(9);
      const endCol = columns[parseInt(endColIndex, 10)].taskCards;
      const initialTaskcard =
        columns[parseInt(initialColIndex, 10)].taskCards[
          parseInt(draggableIndex, 10)
        ];
      endCol.push(initialTaskcard);

      // Remove from initial column
      const initialCol = columns[parseInt(initialColIndex, 10)].taskCards;
      removeFromInitialColumn(initialCol, draggableIndex);

      //Update local storage
      localStorage.setItem("columns", JSON.stringify(columns));
      renderColumn();

      loadDrag();

      loadProgressColumn();
    });
  });

  taskListContainer.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      const draggable = document.querySelector(".dragging");
      container.appendChild(draggable);
    });
  });

  //Function to remove taskcard from initial column
  function removeFromInitialColumn(draggableColumnArray, arrIndex) {
    draggableColumnArray.splice(arrIndex, 1);

    //Update local storage
    localStorage.setItem("columns", JSON.stringify(columns));

    renderColumn();
  }
}

window.onload = loadDrag();

////////////////////////// Update Inprogress Column on Workspace Page ////////////////////////
function loadProgressColumn() {
  //Obtain Objects from the In-Progress Column of Columns array
  let inProgress = columns[1];
}
