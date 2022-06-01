// Retrieve existing flashcards, otherwise start with empty array of flashcards
var flashcards = localStorage.getItem("flashcards")
  ? JSON.parse(localStorage.getItem("flashcards"))
  : [
      {
        question: "Why did the chicken cross the road?",
        answer: "I don't really know",
        links: ["https://www.facebook.com/messages/t/100008350746646"],
      },
      { question: "Hello hello hello", answer: "Bye bye bye", links: [] },
      { question: "Wei wei wei", answer: "wei wei wei", links: [] },
    ];

//Set up DOM Elements
const flashcardButton = document.getElementById("add-flashcard");

// Load flashcards
function loadFlashcards() {
  const section = document.getElementById("section-accordion");

  // Clear pre-existing flashcards first except first (initial template)
  while (section.childNodes.length > 2) {
    section.removeChild(section.lastChild);
  }

  flashcards.map((flashcard, index) => {
    const newFlashcard = document
      .getElementById("accordion-item-template")
      .cloneNode(true);

    newFlashcard.id = `accordion-item-${index}`;
    newFlashcard.classList.remove("hidden");

    // Collect DOM elements
    const flashQuestion = newFlashcard.querySelector("#flashcard-question");
    const flashCollapseBtn = newFlashcard.querySelector(
      "button[data-bs-toggle=collapse]"
    );
    const flashCollapseBody = newFlashcard.querySelector("#flashcard-collapse");
    const flashBodyContent = newFlashcard.querySelector("#flashcard-answer");
    const flashBodyLinks = newFlashcard.querySelector("#flashcard-links");
    const flashBtnDelete = newFlashcard.querySelector("#flashcard-btn-delete");

    // Render stored values on flashcard
    flashCollapseBtn.textContent = flashcard.question;
    flashBodyContent.textContent = flashcard.answer;
    // Display all links
    flashcard.links.map((link, index) => {
      const newLink = document
        .getElementById("flashcard-link-template")
        .cloneNode(true);
      newLink.classList.remove("hidden");
      newLink.id = `flashcard-link-${index}`;

      newLink.innerHTML = `<a href=${link}>${link}</a>`;

      flashBodyLinks.appendChild(newLink);
    });

    // Give each flashcard unique ids for collapse to uniquely target
    flashQuestion.id = `flashcard-question-${index}`;
    flashCollapseBody.setAttribute("aria-labelledby", flashQuestion.id);

    flashCollapseBody.id = `flashcard-collapse-${index}`;
    flashCollapseBtn.setAttribute("data-bs-target", `#${flashCollapseBody.id}`);
    flashCollapseBtn.setAttribute("aria-controls", `#${flashCollapseBody.id}`);

    flashBodyContent.id = `flashcard-answer-${index}`;
    flashBodyLinks.id = `flashcard-links-${index}`;
    flashBtnDelete.id = `flashcard-btn-delete-${index}`;

    // Delete the flashcard on btn delete click
    flashBtnDelete.addEventListener("click", () => {
      removeFlashcard(newFlashcard, index);
    });

    section.appendChild(newFlashcard);
  });
}

// Load flashcards on initial load
loadFlashcards();

// Adds a new flashcard
function addFlashcard(question, answer, links) {
  let newFlashcard = {
    question: question,
    answer: answer,
    links: links,
  };

  // Add flashcard to flashcards array
  flashcards.push(newFlashcard);
  // Update localstorage
  localStorage.setItem("flashcards", JSON.stringify(flashcards));

  // Rerender displayed flashcards
  loadFlashcards();
}

flashcardButton.addEventListener("click", () => {
  addFlashcard("question example", "answer example", ["link1", "link2"]);
});

// Removes a flashcard
function removeFlashcard(flashcard, arrIndex) {
  // Remove from DOM
  flashcard.remove();
  // Remove specific single item from array
  flashcards.splice(arrIndex, 1);
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  loadFlashcards();
}

function addLink() {}
