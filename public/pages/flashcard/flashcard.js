var flashcards = localStorage.getItem("flashcards")
  ? JSON.parse(localStorage.getItem("flashcards"))
  : [
      {
        question: "What are the key purposes of the criminal law?",
        answer:
          "The criminal law prohibits conduct that causes or threatens the public interest; defines and warns people of the acts that are subject to criminal punishment; distinguishes between serious and minor offenses; and imposes punishment to protect society and to satisfy the demands for retribution, rehabilitation, and deterrence.",
        links: [
          "https://www.sagepub.com/sites/default/files/upm-binaries/30388_1.pdf",
        ],
      },
      {
        question: "What are the two elements of every crime?",
        answer:
          "The actus reus or physical elements. It is the prohibited event spelt out in the definition of an offence (ie, the act/omission, the context, or circumstances, in which it takes place, and any consequences. The second elements is mens rea (fault elements).",
        links: [],
      },
      {
        question: "What was the key principle in Woolmington v DPP?",
        answer:
          "No matter what the charge or where the trial, the principle that the prosecution must prove the guilt of the prisoner is part of the common law of England and no attempt to whittle it down can be entertained. - Lord Sankey LC",
        links: [
          "https://www.casemine.com/judgement/uk/5a938b3e60d03e5f6b82ba39",
          "https://www.alrc.gov.au/publication/traditional-rights-and-freedoms-encroachments-by-commonwealth-laws-alrc-interim-report-127/11-burden-of-proof/a-common-law-principle-7/",
        ],
      },
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
    const flashInputAddLink = newFlashcard.querySelector(
      "#flashcard-link-text"
    );
    const flashBtnAddLink = newFlashcard.querySelector("#add-link");

    // Render stored values on flashcard
    flashCollapseBtn.textContent = flashcard.question;
    flashBodyContent.textContent = flashcard.answer;

    // Display all links
    flashcard.links.map((link, index) => {
      renderLink(link, index, flashBodyLinks, flashcard);
    });

    // Give each flashcard unique ids for collapse to uniquely target
    flashQuestion.id = `flashcard-question-${index}`;
    flashCollapseBody.setAttribute("aria-labelledby", flashQuestion.id);

    flashCollapseBody.id = `flashcard-collapse-${index}`;
    flashCollapseBtn.setAttribute("data-bs-target", `#${flashCollapseBody.id}`);
    flashCollapseBtn.setAttribute("aria-controls", `#${flashCollapseBody.id}`);

    //Give unique ids to each of the flashcard elements
    flashBodyContent.id = `flashcard-answer-${index}`;
    flashBodyLinks.id = `flashcard-links-${index}`;
    flashInputAddLink.id = `flashcard-link-text-${index}`;
    flashBtnAddLink.id = `add-link-${index}`;
    flashBtnDelete.id = `flashcard-btn-delete-${index}`;

    // Add link on button add click event
    flashBtnAddLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Check if input field is empty
      if (flashInputAddLink.value === "") {
        alert("Please enter a link");
      } else {
        addLink(
          flashInputAddLink.value,
          flashcard.links.length,
          flashBodyLinks,
          flashcard
        );
      }

      // Clear input field
      flashInputAddLink.value = "";
    });

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
  // Update Local Storage
  localStorage.setItem("flashcards", JSON.stringify(flashcards));

  // Rerender displayed flashcards
  loadFlashcards();
}

const flashcardModalSubmitButton = document.getElementById(
  "flashcard-button-submit"
);
flashcardModalSubmitButton.addEventListener("click", () => {
  // Collect input values
  const question = document.getElementById("flashcard-question-input").value;
  const answer = document.getElementById("flashcard-answer-input").value;
  const links = [];
  links.push(document.getElementById("flashcard-links-input").value);

  //Alert if user has not completed form fields
  if (question === "" || answer === "") {
    alert("Please enter a question and answer");
  } else {
    addFlashcard(question, answer, links);
  }
});

// Removes a flashcard
function removeFlashcard(flashcard, arrIndex) {
  // Remove from DOM
  flashcard.remove();

  // Remove specific single item from array
  flashcards.splice(arrIndex, 1);

  //Replace old flashcards with new flascards to update the array
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  loadFlashcards();
}

// Removes a link from given flashcard
function removeLink(link, flashcard, arrIndex) {
  // Remove from DOM
  link.remove();
  // Remove specific single item from array
  flashcard.links.splice(arrIndex, 1);
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Adds a link to given flashcard
function addLink(link, index, parent, flashcard) {
  // Add to DOM
  renderLink(link, index, parent, flashcard);

  flashcard.links.push(link);
  // Update localstorage
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Function to add a new link to the DOM
function renderLink(link, index, parent, flashcard) {
  const newLink = document
    .getElementById("flashcard-link-template")
    .cloneNode(true);

  const btnRemoveLink = newLink.querySelector("#remove-link");
  newLink.classList.remove("hidden");
  newLink.id = `flashcard-link-${index}`;
  btnRemoveLink.id = `remove-link-${index}`;

  newLink.querySelector("a").setAttribute("href", link);
  newLink.querySelector("a").textContent = link;

  // Remove link on button remove click event
  btnRemoveLink.addEventListener("click", (e) => {
    e.preventDefault();
    removeLink(newLink, flashcard, index);
  });

  parent.appendChild(newLink);
}

// Open all links
const btnOpenAllLinks = document.getElementById("btn-open-all-links");
btnOpenAllLinks.addEventListener("click", () => {
  // Loop through all links and open each one
  flashcards.map((flashcard, index) => {
    flashcard.links.map((link, index) => {
      window.open(link, "_blank");
    });
  });
});
