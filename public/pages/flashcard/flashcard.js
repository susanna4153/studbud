//Set up DOM Elements
const flashcardButton = document.getElementById("add-flashcard");

// Store flashcards
// const flashcards = [{"title": "title test 1", "body": "body test 1", "links": ["link 1", "link 2"]}, {"title": "title test 2", "body": "body test 2", "links": ["link 1", "link 2"]}, {"title": "title test 3", "body": "body test 3", "links": ["link 1", "link 2"]}]

////////////////////////////////////////////////////////////////////////////////
// DUMMY DATA 
////////////////////////////////////////////////////////////////////////////////
const flashcardTest1 = {
    title: "Why did the chicken cross the road?",
    content: "I don't really know",
    links: [],
}

const flashcardTest2 = {
    title: "Hello hello hello",
    content: "Bye bye bye",
    links: [],
}

const flashcardTest3 = {
    title: "Wei wei wei",
    content: "wei wei wei",
    links: [],
}

const flashcardsTest = [flashcardTest1, flashcardTest2, flashcardTest3]
localStorage.setItem("flashcards", flashcardsTest)

////////////////////////////////////////////////////////////////////////////////

const flashcards = localStorage.getItem("flashcards");


// Load flashcards
for (var i = 0; i < flashcards.length; i++) {
    const accordionItem = document.getElementById("accordion-item-template");
    const newAccordionItem = accordionItem.cloneNode(true);

    newAccordionItem.setAttribute("style", "display: block");
    newAccordionItem.removeAttribute("id");

    // Set up unique id for accordion item to collapse
    newAccordionItem.querySelector('#collapse-template').id = `collapse-${i}`
    newAccordionItem.querySelector('.accordion-button').setAttribute('data-bs-target', `#collapse-${i}`);

    // Fill flashcard content here
    newAccordionItem.querySelector('.accordion-title-text').innerText = flashcards[i].title;
    newAccordionItem.querySelector('#flashcardContent').innerText = flashcards[i].content;

    newAccordionItem.querySelector('#flashcardContent').addEventListener("input", function (event) {
        var message = newAccordionItem.querySelector('#flashcardContent').value;
    })

    // Accordions are closed by default upon first load
    newAccordionItem.querySelector('.accordion-button').setAttribute('aria-expanded', false);
    newAccordionItem.querySelector('.accordion-button').classList.add("collapsed");
    newAccordionItem.querySelector('.accordion-collapse').classList.remove('show');


    document.getElementById("accordion-container").appendChild(newAccordionItem);
}

//Add Flashcard 
flashcardButton.addEventListener("click", function(event) {
    const accordionItem = document.getElementById("accordion-item-template");
    const newAccordionItem = accordionItem.cloneNode(true);
    
    newAccordionItem.setAttribute("style", "display: block");
    newAccordionItem.removeAttribute("id");

    // Add new flashcard to flashcards array
    flashcards.push({title: "Question title", content: "Flashcard content", links: []});

    // Set up unique id for accordion item to collapse
    newAccordionItem.querySelector('#collapse-template').id = `collapse-${flashcards.length - 1}`
    newAccordionItem.querySelector('.accordion-button').setAttribute('data-bs-target', `#collapse-${flashcards.length - 1}`);

    newAccordionItem.querySelector('.accordion-button').innerText = flashcards[i].title;
    newAccordionItem.querySelector('#flashcardContent').innerText = flashcards[i].content;

    document.getElementById("accordion-container").appendChild(newAccordionItem);
})
