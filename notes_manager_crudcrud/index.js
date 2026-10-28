// CRUDCRUD API URL
const API_URL =
  "https://crudcrud.com/api/3b9f4f2e019148588f0d6b9967191ed9/notes";

// Get HTML elements
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const descriptionInput = document.getElementById("note-description");
const dateInput = document.getElementById("note-date");
const searchInput = document.getElementById("search-title");

const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const formMessage = document.getElementById("form-message");

const emptyState = document.getElementById("empty-state");
const emptyTitle = document.getElementById("empty-title");
const emptyDescription = document.getElementById("empty-description");
const loadingMessage = document.getElementById("loading-message");

// Store notes in an array
let notes = [];

// Show a message
function showMessage(message) {
  formMessage.textContent = message;
}

// Load saved notes from CRUDCRUD
function getNotes() {
  loadingMessage.hidden = false;

  axios
    .get(API_URL)
    .then(function (response) {
      // Store the notes received from the server
      notes = response.data;

      // Display the notes
      displayNotes();
    })
    .catch(function (error) {
      console.log("Error loading notes:", error);

      showMessage("Unable to load notes. Check your API endpoint.");

      emptyTitle.textContent = "Unable to load notes";
      emptyDescription.textContent =
        "Please check your internet connection and CRUDCRUD endpoint.";

      emptyState.hidden = false;
    })
    .finally(function () {
      loadingMessage.hidden = true;
    });
}

// Display notes on the page
function displayNotes() {
  // Clear the previous notes from the screen
  notesList.innerHTML = "";

  // Get the search text
  const searchText = searchInput.value.trim().toLowerCase();

  // Count visible notes
  let count = 0;

  // Go through each note
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    // Check whether the title matches the search
    const titleText = (note.title || "").toLowerCase();

    if (titleText.includes(searchText)) {
      count++;

      // Create the note card
      const card = document.createElement("article");
      card.className = "note-card";

      // Add the title
      const title = document.createElement("h3");
      title.textContent = note.title || "Untitled note";
      card.appendChild(title);

      // Add the description
      const description = document.createElement("p");
      description.className = "note-description";
      description.textContent = note.description || "";
      card.appendChild(description);

      // Add the reminder date if available
      if (note.date) {
        const date = document.createElement("p");
        date.className = "note-date";
        date.textContent = "Reminder: " + note.date;
        card.appendChild(date);
      }

      // Create the Delete button
      const deleteButton = document.createElement("button");
      deleteButton.className = "icon-button";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";

      // Delete the note when clicked
      deleteButton.addEventListener("click", function () {
        deleteNote(note);
      });

      card.appendChild(deleteButton);

      // Add the card to the page
      notesList.appendChild(card);
    }
  }

  // Update the number of visible notes
  noteCount.textContent = count;

  // Show or hide the empty message
  if (count === 0) {
    emptyState.hidden = false;

    if (searchText !== "") {
      emptyTitle.textContent = "No matching notes";
      emptyDescription.textContent = "Try searching for another title.";
    } else {
      emptyTitle.textContent = "No notes yet";
      emptyDescription.textContent =
        "Add your first note above. It will appear here.";
    }
  } else {
    emptyState.hidden = true;
  }
}

// Add a new note
function addNote(event) {
  // Prevent the page from refreshing
  event.preventDefault();

  console.log("Add note clicked");

  // Get values from the form
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const date = dateInput.value;

  // Check that the required fields are filled
  if (title === "" || description === "") {
    showMessage("Please enter a title and description.");
    return;
  }

  // Create a note object
  const newNote = {
    title: title,
    description: description,
    date: date,
  };

  // Send the note to CRUDCRUD
  axios
    .post(API_URL, newNote)
    .then(function (response) {
      console.log("Note saved:", response.data);

      // Add the saved note to the beginning of the array
      notes.unshift(response.data);

      // Refresh the notes displayed on the page
      displayNotes();

      // Clear the form
      noteForm.reset();

      // Show success message
      showMessage("Note added successfully!");
    })
    .catch(function (error) {
      console.log("Error saving note:", error.response || error);

      showMessage("Unable to save note. Check the Console and API endpoint.");
    });
}

// Delete a note
function deleteNote(note) {
  // Check whether the note has a server ID
  if (!note._id) {
    showMessage("Cannot delete this note because its ID is missing.");
    return;
  }

  // Delete the note from CRUDCRUD
  axios
    .delete(API_URL + "/" + encodeURIComponent(note._id))
    .then(function () {
      // Remove the note from our array
      notes = notes.filter(function (item) {
        return item._id !== note._id;
      });

      // Update the screen
      displayNotes();

      showMessage("Note deleted successfully!");
    })
    .catch(function (error) {
      console.log("Error deleting note:", error.response || error);

      showMessage("Unable to delete note. Please try again.");
    });
}

// Run addNote when the form is submitted
noteForm.addEventListener("submit", addNote);

// Update the displayed notes when searching
searchInput.addEventListener("input", displayNotes);

// Load saved notes when the page opens
getNotes();
