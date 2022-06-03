# StudBud Web Prototype - README

> **NOTE:** This Web Prototype is most suitable on Chrome. Please ensure that pop-ups are enabled for the open all links feature of the Flaschards section.

![Press the circled button to adjust pop-up settings](/docs/chrome.png)

## Project Description

**StudBud** is a study application targetted at law students to encourage more effective task, time and content mangagement. According to recent studies, law students experience stress, anxiety and depression at rates significantly higher than their contemporaries who do not study law due to the heavy workload and emotional pressure. That's where Studbud comes in to implement structure and organisation to legal studies by providing:

- a dedicated **Kanban Board** to prioritize and manage upcoming deadlines
- an isolated study **Workspace** to foster productive study sessions and
- a **Flashcard section** which acts as a condensed reading list to practice active memory-recall and review key concepts in the lead up to exams.

## Project Dependencies

The StudBud web-protoype relies on **Bootstrap** for some of its CSS and JS compontents, in particular for the form modals on the Kanban Board page and the accordian structure of the Flashcard page. Its responsive design and grid system also proved extremely useful for building an MVP.

## Challenges

One immense challenge that I encountered during my development process was the presence of a **large file (151 mb!) in my parcel cache which prohibited me from pushing changes into github**. At this stage, I had a couple of componenents already half done so this was pretty frustrating. I tried deleting the parcel cache on git hub, then executing a git pull command to re-download my code, this time without the cache folder. This did not work. Ultimately, I created a new repository and migrated all my files. I also included a **git ignore** file in this new repository to exclude the parcel cache file from being pushed. One positive of this challenge was that it prompted me to **streamline and edit my code during the migration process** and delete unrelated plugins.

## Reflection on the Development Journey

One key reflection from my tutor's feedback on the Web App Pitch was to construct **a more granular development roadmap** to _"help breakdown large tasks into smaller components and to ensure [I] stay on track for implementation."_ Due to the lack of specificity in my original roadmap, I underestimated the complexity of some features. Subsequently, I downgraded certain functional specs to a 'low priority' and simplified a lot of my designs for a more realistic development process. The following two examples demonstrate this process of simplification and streamlining.

### Kanban Board

![Kanbanboard comparison between mock-up(top) and prototype (bottom)](/docs/kanban.png)

- As mentioned above, the Kanban board experienced huge **simplifications for development purposes**. This process of development allowed me to reflect on the most crucial features for necessary for the user journey, and **remove any redundant features** for the time being.
- For example, **the "+" button within each column was removed** because the "+ Task" button served the same purpose. Completing the task modal prompted by the "+ Task" button automatically adds the new task to the 'To Do' column where the user can later drag and drop the task between columns. This process more closely aligns with the user journey from task creation to completion. Furthermore, it was unlikely that a user would add a task to the 'Done' column anyways, therefore the "+" buttons didn't seem to provide any additional affordance and was omitted.
- The **default 'Upcoming' column was also removed** as it served a similar purpose to the original 'To-do' column. This allowed for larger columns and taskcards overall, providing a less cluttered feel to the Kanban Board overall.
- The **delete button within each default column was also removed** to impose a logical constraint on the prototype, preventing users from deleting elements which served a functional JS purpose - ie. Taskcards are always added to the 'To do' column at first instance and the 'In Progress' column was necessary for synchronisation with the Workspace page.
- One crucial function that was lacking on the mock-up was a **delete Taskcard button**. Subsequently, this was implemented during the development stage for a more interactive and effective user experience.

### Pomodoro Timer

![Pomodoro Timer comparison between mock-up(top) and prototype (bottom)](/docs/pomodoro.png)

- Similar to the Kanban Board, the pomodoro timer also underwent some simplifications and improvements during the development process.
- As an improvement, the **prototype displays the break timer** to avoid creating another hidden page. This is particularly the case considering that the 'time-feature' section already has three sub-components (pomodoro timer, stopwatch and settings). Having another button to transition to another hidden break-timer page would overcomplicate the user experience and pose another distraction.
- Another purposeful change was the use of different buttons for the start, stop and reset features to differentiate the pomodoro timer from the music player. This relates to the **mapping** design principle where different features serving different purposes should utilitse distinct visual iconography to distinguish their functional differences.
- Whilst the radial progress bar was not implemented due to time constraints, in the context of the new design with the break timer, it would not have made sense to have two radial progress bars. Therefore, in future iterations, if this second design is retained, the use of a **linear progress bar** may be more appropriate to track the completion of each session.

## Sources

During my development process, I followed a couple of tutorials which I subsequently modified and changed to better accomodate for StudBud's purposes. Here are those sources:

- **Music Player**: https://www.geeksforgeeks.org/create-a-music-player-using-javascript/ (sayantanm19, 2022)
- **Task List**: https://replit.com/@robdongas/Modular-WebApp-Demo (Dongas, 2022)
- **Drag and Drop feature**: https://www.youtube.com/watch?v=jfYWwQrtzzY&t=653s&ab_channel=WebDevSimplified (WebDeSimplified, 2020)
- **Pomodoro timer**: https://www.youtube.com/watch?v=vAEG6OVCass&ab_channel=learn-webdev (learn-webdev, 2020)
- **Flashcard Accordion**: https://getbootstrap.com/docs/5.0/components/accordion/ (Bootstrap, n.d.)
- **Modal**: https://getbootstrap.com/docs/4.0/components/modal/ (Bootstrap, n.d.)

## Future Development & Endeavours

Some future development opportunities for StudBud include:

- **Implementing medium priority features** for a more pleasant, interactive and richer user experience. This includes developing 'editing' features for taskcards and flashcards as well as 'to-do lists'. The latter feature facilitates a key user goal in being able to breakdown large tasks into smaller tasks, however it was not possible to implement them in this initial development stage.
- Another medium priority feature that should be incorporated in future iterations are **more progress markers**, especially for the 'in-progress' column and pomodoro timer to allow users to feel a greater sense of satisfication and motivation when completing tasks. Again, due to the time constraints, this was not implemented for this MVP.
- Whilst the existing prototype is responsive and perfectly usable on mobile devices, future iterations should **hide secondary functions into 'More' buttons** to prevent feature bloat on a smaller screen.
