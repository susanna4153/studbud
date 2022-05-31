////////////////////////////// COLUMN FUNCTIONS //////////////////////////////
//Set up variables for HTML elements using DOM selection
const kanbanBoard = document.getElementById("kanban");
const addTaskButton = document.getElementById("add-task");
const columnform = document.getElementById("column-form");
const columnNameInput = document.getElementById("column-name-input");
const columnModal = document.getElementById("columnModal");

// Column Name Form submission event listener
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
});

// Function to add column with user inputs as parameters
function addColumn(title) {
  let column = {
    title: title,
    taskCards: [],
  };

  //Add column object into column array
  columnArray.push(column);
  renderColumn();
}

// Create global array to track columns
let columnArray = [
  { title: "To Do List", taskCards: ["card 1", "card 2", "card 3"] },
  { title: "In Progress", taskCards: ["card 1", "card 2", "card 3"] },
  { title: "Done", taskCards: ["card 1", "card 2", "card 3"] },
];

// Function to load up columns
function renderColumn() {
  // Clear columns before load to prevent duplicates
  kanbanBoard.querySelectorAll(".column-template").forEach((column) => {
    column.remove();
  });

  //Duplicate Column Template
  columnArray.map((column, index) => {
    const newColumn = document
      .getElementById("column-template")
      .cloneNode(true);
    newColumn.id = `column-${index}`;
    newColumn.classList.add("column-template");
    newColumn.classList.remove("hidden");
    newColumn.querySelector(".column-title").textContent = column.title;
    kanbanBoard.appendChild(newColumn);
  });
}

//Load up the columns
renderColumn();

////////////////////////////// TASK MODAL  //////////////////////////////
// Basic form DOM elements
const taskForm = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");

// Selector for the tasklist output
var tasklist = document.querySelector("#tasklist > ul");

// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

// Task Form submission event listener
taskform.addEventListener("submit", function (event) {
  event.preventDefault();
  let task = taskInput.value;
  let dueDate = dueDateInput.value;
  let completionTime = completionTimeInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  if (task) {
    addTask(
      task,
      dueDate,
      estimatedTime,
      priorityRating,
      completionTime,
      false
    );
  }
});

// Create global array to track tasks
var taskListArray = [];

// Function to add task with user inputs as parameters
function addTask(
  taskDescription,
  dueDate,
  estimatedTime,
  priorityRating,
  completionTime,
  completionStatus
) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    id: Date.now(),
    taskDescription,
    dueDate,
    dateCreated,
    estimatedTime,
    completionTime,
    priorityRating,
    estimatedTime,
    completionStatus,
  };
  taskListArray.push(task);
  console.log(taskListArray);
  renderTask(task);
}

// Function to display task on screen
function renderTask(task) {
  // Call function - checks if a task has been added
  updateEmpty();

  // Create HTML elements
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);
  item.innerHTML = "<p>" + task.taskDescription + "</p>";

  tasklist.appendChild(item);

  // Extra Task DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Event Listeners for DOM elements
  delButton.addEventListener("click", function (event) {
    event.preventDefault();
    let id = event.target.parentElement.getAttribute("data-id");
    let index = taskListArray.findIndex((task) => task.id === Number(id));
    removeItemFromArray(taskListArray, index);
    console.log(taskListArray);
    updateEmpty();
    item.remove();
  });

  // Clear the input form
  form.reset();
}

// Function to remove item from array
function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
  if (taskListArray.length > 0) {
    document.getElementById("emptyList").style.display = "none";
  } else {
    document.getElementById("emptyList").style.display = "block";
  }
}

// //Event Listener for "+ Column" Button Click
// addColumn.addEventListener("click", function () {
//   //Create container for each column
//   let columnContainer = document.createElement("div");
//   columnContainer.setAttribute("class", "col-md-4");
//   kanbanBoard.appendChild(columnContainer);

//   //Create column
//   let kanbanColumn = document.createElement("div");
//   kanbanColumn.setAttribute("class", "kanban_column box");
//   columnContainer.appendChild(kanbanColumn);

//   //Add Heading into column
//   let columnHeading = document.createElement("h3");
//   columnHeading.textContent = "New Column";
//   kanbanColumn.appendChild(columnHeading);
// });

//Deleting a Column
// const deleteColumnButton = document.getElementById("delete-column");

// deleteColumnButton.addEventListener("click", function () {
//   const columnToDelete = this.parentNode.parentNode.parentNode;
//   columnToDelete.remove();
// });
