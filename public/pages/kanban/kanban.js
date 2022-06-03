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
            dueDate: "2022-06-08",
          },
          {
            taskName: "Complete Tutorial Question",
            className: "LAWS3123",
            priorityRating: "Medium",
            estimatedTime: 80,
            dueDate: "2022-06-12",
          },
        ],
      },
      { title: "In Progress", taskCards: [] },
      { title: "Done", taskCards: [] },
    ];

//////////////////////////////////////////////////////////// COLUMNS ////////////////////////////////////////////////////////////
//Collect DOM elements for Columns
const kanbanBoard = document.getElementById("kanban");
const addTaskButton = document.getElementById("add-task");
const columnform = document.getElementById("column-form");
const columnNameInput = document.getElementById("column-name-input");
const columnModal = document.getElementById("columnModal");

// Column modal event listener
columnform.addEventListener("submit", (e) => {
  //Prevent page from refreshing upon submit
  e.preventDefault();

  //Run add column function with user-inputed data
  let columnName = columnNameInput.value;
  if (columnName) {
    addColumn(columnName);
  } else {
    alert("Please enter column name");
  }

  //Close Modal Manually
  var modal = bootstrap.Modal.getInstance(columnModal);
  modal.hide();

  //Reset form
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

  //Rerender drag-drop functionality for taskcards within
  loadDrag();
}

// Function to load up columns
function renderColumn() {
  // Clear columns before load to prevent duplicates
  kanbanBoard.querySelectorAll(".column-template").forEach((column) => {
    column.remove();
  });

  //Map through global column array and render a column for each object
  columns.map((column, index) => {
    //Clone HTML column template
    const newColumn = document
      .getElementById("column-template")
      .cloneNode(true);

    //Give each column a unique id
    newColumn.id = `column-${index}`;
    newColumn.classList.add("column-template");

    //Remove hidden class to show on page
    newColumn.classList.remove("hidden");

    //Give unique id to the tasklist within (they will be storing the taskcards)
    newColumn.querySelector("#taskList").id = `taskList-${index}`;

    //Render stored value on column name
    newColumn.querySelector(".column-title").textContent = column.title;

    //Give delete button a unique id
    newColumn.querySelector("#delete-col").id = `delete-col-${index}`;
    var columnDeleteButton = newColumn.querySelector(`#delete-col-${index}`);
    columnDeleteButton.addEventListener("click", () => {
      removeColumn(newColumn, index);
    });

    //Add to Kanbanboard
    kanbanBoard.appendChild(newColumn);

    //Render Taskcards within column
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

//////////////////////////////////////////////////////////// TASKS  ////////////////////////////////////////////////////////////
// Collect Basic DOM Elements for columns
const taskForm = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
const toDoTaskList = document.getElementById("taskList-0");

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var classInput = document.getElementById("classInput");
var priorityInput = document.getElementById("priorityInput");
var dueDateInput = document.getElementById("dueDateInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");

// Task Form event listener
taskForm.addEventListener("submit", function (event) {
  //Prevent page from refreshing upon submit
  event.preventDefault();

  //Obtain user data and set as arguments for addTask function
  let task = taskInput.value;
  let className = classInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  let dueDate = dueDateInput.value;
  let estimatedTime = estimatedTimeInput.value;
  if ((task, className, priorityRating, dueDate, estimatedTime)) {
    addTask(task, className, priorityRating, dueDate, estimatedTime);
  } else {
    alert("Please fill out all task details");
  }

  //Close Modal Manually
  var modal = bootstrap.Modal.getInstance(taskModal);
  modal.hide();

  //Clear form
  taskForm.reset();
});

//Function to add task
function addTask(taskName, className, priorityRating, dueDate, estimatedTime) {
  //Create taskcard based off user input
  let task = {
    taskName,
    className,
    priorityRating,
    dueDate,
    estimatedTime,
  };

  //Add tasks to the to-do column
  columns[0].taskCards.push(task);

  //Rerender tasks in the to-do column
  renderTask(columns[0].taskCards, 0);

  //Update local storage
  localStorage.setItem("columns", JSON.stringify(columns));

  //Rerender drag-drop functionality
  loadDrag();
}

//Function to load up Tasks
function renderTask(columnTasks, colIndex) {
  var selectedTaskList = document.getElementById(`taskList-${colIndex}`);

  //Clear Task List before load to prevent duplicates
  selectedTaskList
    .querySelectorAll(".task-card-template")
    .forEach((taskcard) => {
      taskcard.remove();
    });

  //Map through the task-list array within each column object and render a taskcard for each task object
  columnTasks.map((taskcard, index) => {
    //Duplicate taskcard template
    const newTaskCard = document
      .getElementById("task-card-template")
      .cloneNode(true);

    //Render each flashcard with stored value
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

    /////////////////// REMOVE TASK BUTTON  FUNCTIONALITY //////////////////
    //Call HTML button element and give it a unique id
    const deleteTaskButton = newTaskCard.querySelector("#delete-task");
    deleteTaskButton.id = `delete-task-${index}`;

    //Create an Event listener to remove taskcard upon click
    deleteTaskButton.addEventListener("click", function () {
      //Get Appropriate Task List Array in which the taskcard will be deleted
      const taskListArray = columns[colIndex].taskCards;

      //Call function to remove taskcard with current task card, its parent array, and index within the array as arguments
      removeTaskcard(newTaskCard, taskListArray, index);
    });

    //Append taskcards to appropriate column
    selectedTaskList.appendChild(newTaskCard);
  });
}

//Function to remove taskcard
function removeTaskcard(taskcard, taskListArray, arrIndex) {
  //Remove taskcard HTML element
  taskcard.remove();

  //Remove taskcard from the appropriate tasklist array
  taskListArray.splice(arrIndex, 1);

  //Update local storage
  localStorage.setItem("columns", JSON.stringify(columns));
  renderColumn();

  //Rerender drag and drop functionality
  loadDrag();
}

//Drag and drop functionality for cards
function loadDrag() {
  //Set up HTML DOM elements for draggable taskcards and tasklists
  const draggables = document.querySelectorAll(".draggable");
  const taskListContainer = document.querySelectorAll(".taskList");

  //Function for drag drop function
  //Apply function to each task card
  draggables.forEach((draggable) => {
    //Locate the index of the taskcard list array which corresponds with the column index for the INITIAL COLUMN
    const initialColIndex = draggable.parentNode.id.slice(9);

    //Locate the index of the taskcard within the tascard list array
    const draggableIndex = draggable.id.slice(10);

    //Event listener for when the user starts dragging
    draggable.addEventListener("dragstart", () => {
      //Apply dragging class to lower opacity whilst dragging
      draggable.classList.add("dragging");
    });

    //Event listener for when the user stops dragging
    draggable.addEventListener("dragend", () => {
      //Rmove the dragging class to return to original opacity
      draggable.classList.remove("dragging");

      // Add the flashcard to tasklist array of the new column
      // Locate the index of the taskcard list array which corresponds with the column index for the END COLUMN
      const endColIndex = draggable.parentNode.id.slice(9);

      //Access the tasklist array of that END COLUMN
      const endCol = columns[parseInt(endColIndex, 10)].taskCards;

      //Copy the taskcard object that is being moved, from it's intial position int he array. Done by
      // 1. Finding which column object it belongs to in the global array (using the column index number)
      // 2. Accessing the taskcard array within that columns object
      // 3. Locating the moving taskcard object (using the draggable index declared above)
      const initialTaskcard =
        columns[parseInt(initialColIndex, 10)].taskCards[
          parseInt(draggableIndex, 10)
        ];
      //Push to new tasklist array
      endCol.push(initialTaskcard);

      // Remove the taskcard from initial column by
      // 1. Locating the initial column object by using the initial column index again
      // 2. Accesing the taskcard array within that columns object
      // 3. Calling the 'remove function' and pass in the moving object's parent tasklist array and its index
      const initialCol = columns[parseInt(initialColIndex, 10)].taskCards;
      removeFromInitialColumn(initialCol, draggableIndex);

      //Update local storage
      localStorage.setItem("columns", JSON.stringify(columns));

      //Rerender columns to update changes
      renderColumn();

      //Rerender drag and drop functionality
      loadDrag();
    });
  });

  //For each tasklist array (ie. each column), add an event listener which allows the moving taskcard to be added as a DOM element
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

    //Rerender columns to update changes
    renderColumn();
  }
}

//Load the drag and drop function on initial load so that all taskcards can be dragged.
window.onload = loadDrag();
