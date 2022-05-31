//////////////////////////////////////////////////////////// COLUMN FUNCTIONS ////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////// TASK MODAL  ////////////////////////////////////////////////////////////
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

// Access first To-do column of the column array
const toDoColumn = document.querySelector("#column-0");

// Task Form submission event listener
// taskform.addEventListener("submit", function (event) {
//   event.preventDefault();

//   let task = taskInput.value;
//   let dueDate = dueDateInput.value;
//   let completionTime = completionTimeInput.value;
//   let estimatedTime = estimatedTimeInput.value;
//   let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
//   if (task) {
//     addTask(
//       task,
//       dueDate,
//       estimatedTime,
//       priorityRating,
//       completionTime,
//       false
//     );
//   }
// });

// Create global array to track tasks
let taskListArray = [
  {
    taskName: "Finish Assignment",
    className: "Maths",
    priority: "High",
    estimatedCompletionTime: "01/01/2023",
    dueDate: "August 9th, 2023",
  },

  {
    taskName: "Finish this",
    className: "Law",
    priority: "low",
    estimatedCompletionTime: "03/04/2023",
    dueDate: "August 5thth, 2023",
  },

  {
    taskName: "Finish Assignment",
    className: "Maths",
    priority: "High",
    estimatedCompletionTime: "01/01/2023",
    dueDate: "August 9th, 2023",
  },
];

//Function to load up flashcards
function renderTask() {
  taskListArray.map((taskcard, index) => {
    const newTaskCard = document
      .getElementById("task-card-template")
      .cloneNode(true);
    newTaskCard.id = `task-card-${index}`;
    newTaskCard.classList.remove("hidden");
    newTaskCard.classList.add("task-card-template");
    newTaskCard.querySelector(".task-name").innerText = taskName;
    newTaskCard.querySelector(".task-class-name").innerText = className;
    newTaskCard.querySelector(".task-priority").innerText = priority;
    newTaskCard.querySelector(".estimated-completion-time").innerText =
      estimatedCompletionTime;
    newTaskCard.querySelector(".task-due-date").innerText = dueDate;

    //Append to appropriate column
    toDoColumn.appendChild(newTaskCard);
  });

  window.onload = renderTask();

  ///
  ///
  ///

  //   //Delete Button
  //   let delButton = document.createElement("button");
  //   let delButtonText = document.createTextNode("Delete Task");
  //   delButton.appendChild(delButtonText);
  //   item.appendChild(delButton);

  //   // Event Listeners for DOM elements
  //   delButton.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     let id = event.target.parentElement.getAttribute("data-id");
  //     let index = taskListArray.findIndex((task) => task.id === Number(id));
  //     removeItemFromArray(taskListArray, index);
  //     console.log(taskListArray);
  //     updateEmpty();
  //     item.remove();
  //   });

  //   // Clear the input form
  //   form.reset();
}

// // Function to remove item from array
// function removeItemFromArray(arr, index) {
//   if (index > -1) {
//     arr.splice(index, 1);
//   }
//   return arr;
// }

// Function to add task with user inputs as parameters
// function addTask(
//   taskDescription,
//   dueDate,
//   estimatedTime,
//   priorityRating,
//   completionTime,
//   completionStatus
// ) {
//   let d = new Date();
//   let dateCreated = d.getFullYear();
//   let task = {
//     id: Date.now(),
//     taskDescription,
//     dueDate,
//     dateCreated,
//     estimatedTime,
//     completionTime,
//     priorityRating,
//     estimatedTime,
//     completionStatus,
//   };
//   taskListArray.push(task);
//   console.log(taskListArray);
//   renderTask(task);
// }
