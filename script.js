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

// Takes input as seconds and returns time formatted as hh:mm:ss
function formatTime(time) {
    const hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time % 60);
    
    // Append a 0 if seconds is only one digit
    if (seconds < 10)
        seconds = `0${seconds}`;

    // If the time is an hour or longer
    if (hours) {
        // Append a 0 if minutes is only one digit
        if (minutes < 10)
            minutes = `0${minutes}`;
        
        return `${hours}:${minutes}:${seconds}`;
    }
    
    // If the time is shorter than an hour
    return `${minutes}:${seconds}`;
}

// Called when submit button is pressed
function submit() {
    const timestamp = Math.floor(audioPlayer.currentTime);
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
    note.style.order = timestamp; // Order the notes by timestamp

    // Create a link that, when clicked, sets the audio player
    // to the timestamp
    const timestampLink = document.createElement("a");
    timestampLink.className = "timestamp";
    timestampLink.textContent = formatTime(timestamp);

    timestampLink.addEventListener("click", () => {
        audioPlayer.currentTime = timestamp;
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