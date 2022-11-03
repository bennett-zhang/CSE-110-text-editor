// Add all your HTML DOM elements here as global variables
const audioForm = document.getElementById("audio-form");
const audioInput = document.getElementById("audio-input");
const editor = document.getElementById("editor");
const audioPlayer = document.getElementById("audio-player");
const textEditor = document.getElementById("text-editor");
const noteDisplay = document.getElementById("note-display");
const clearButton = document.getElementById("clear-button");

// Set the source of the audio player, hide the audio input form,
// and show the text editor
function loadAudio(src) {
    audioPlayer.src = src;
    audioForm.style.display = "none";
    editor.style.display = "block";
}

// When an audio file is uploaded
audioInput.addEventListener("change", () => {
    // Display audio file on screen
    const audioFile = audioInput.files[0];
    const audioURL = URL.createObjectURL(audioFile);
    loadAudio(audioURL);

    // Store audio file in local storage
    getData(audioFile, base64 => {
        localStorage.audio = base64;
    });
});

// Convert audio file to Base64
function getData(audioFile, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onload = evt => {
        callback(evt.target.result);
    };
}

// Takes input as seconds and returns time formatted as mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    // Add an additional '0' if seconds is only one digit
    if (seconds <= 9)
        return `${minutes}:0${seconds}`;
    
    return `${minutes}:${seconds}`;
}

// Takes formatted time and returns the number of seconds
function timeToSeconds(time) {
    time = time.split(":");
    return time[0] * 60 + parseInt(time[1]);
}

// Called when submit button is pressed
function submit() {
    const timestamp = formatTime(audioPlayer.currentTime);
    displayNote(timestamp, textEditor.value);

    // Store notes in local storage
    const notes = localStorage.notes ? JSON.parse(localStorage.notes) : {};
    notes[timestamp] = textEditor.value;
    localStorage.notes = JSON.stringify(notes);

    // Clear text editor
    textEditor.value = "";
}

// Display note on screen
function displayNote(timestamp, text) {
    // Create note
    const note = document.createElement("div");
    note.className = "note";

    // Create a link that, when clicked, sets the audio player
    // to the timestamp
    const timestampLink = document.createElement("a");
    timestampLink.className = "timestamp";
    timestampLink.textContent = timestamp;

    timestampLink.addEventListener("click", () => {
        audioPlayer.currentTime = timeToSeconds(timestamp);
    });

    // Create a container for the text
    const textDiv = document.createElement("div");
    textDiv.innerText = text;

    // Populate note and display it on screen
    note.appendChild(timestampLink);
    note.appendChild(textDiv);
    noteDisplay.appendChild(note);
}

// Load audio from local storage
if (localStorage.audio)
    loadAudio(localStorage.audio);

// Load notes from local storage
if (localStorage.notes) {
    const notes = JSON.parse(localStorage.notes);

    // Loop through notes and display them on screen
    for (const timestamp in notes)
        displayNote(timestamp, notes[timestamp]);
}

// Clear local storage when button is pressed
clearButton.addEventListener("click", () => {
    localStorage.clear();
});