//Adding a Column
//Set up variables for HTML elements using DOM selection
const kanbanBoard = document.getElementById("kanban");
const addColumn = document.getElementById("add-column");
const addTaskButton = document.getElementById("add-task");

//Event Listener for "+ Column" Button Click
addColumn.addEventListener("click", function () {
  //Create container for each column
  let columnContainer = document.createElement("div");
  columnContainer.setAttribute("class", "col-md-4");
  kanbanBoard.appendChild(columnContainer);

  //Create column
  let column = document.createElement("div");
  column.setAttribute("class", "kanban_column box");
  columnContainer.appendChild(column);

  //Add Heading into column
  let columnHeading = document.createElement("h3");
  columnHeading.textContent = "New Column";
  column.appendChild(columnHeading);
});

//Deleting a Column
const deleteColumnButton = document.getElementById("delete-column");

deleteColumnButton.addEventListener("click", function () {
  const columnToDelete = this.parentNode.parentNode.parentNode;
  columnToDelete.remove();
});

// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const button = document.getElementById("task-button");
const tasklist = document.getElementById("tasklist");
const taskInput = document.getElementById("taskInput");

// Event listener for Button click
// This could also be form.addEventListener("submit", function() {...} )
button.addEventListener("click", function (event) {
  event.preventDefault(); // Not as necessary for button, but needed for form submit

  let task = form.elements.task.value; // could be swapped out for line below
  //let task = taskInput.value;

  let date = new Date().toLocaleDateString("en-US"); //Convert to short date format

  // Call the addTask() function using
  addTask(task, date, "26/03/2021", "Low", ["1", "30"], false);

  // Log out the newly populated taskList everytime the button has been pressed
  console.log(taskList);
});

// Create an empty array to store our tasks
var taskList = [];

function addTask(
  taskDescription,
  createdDate,
  dueDate,
  priorityRating,
  estimatedTime,
  completionStatus
) {
  let task = {
    taskDescription,
    createdDate,
    dueDate,
    priorityRating,
    estimatedTime,
    completionStatus,
  };

  // Add the task to our array of tasks
  taskList.push(task);

  // Separate the DOM manipulation from the object creation logic
  renderTask(task);
}

// Function to display the item on the page
function renderTask(task) {
  let item = document.createElement("li");
  item.innerHTML = "<p>" + task.taskDescription + "</p>";

  tasklist.appendChild(item);

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete Task");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

  // Listen for when the
  delButton.addEventListener("click", function (event) {
    item.remove(); // Remove the task item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element
  });

  // Clear the value of the input once the task has been added to the page
  form.reset();
}
