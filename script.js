function openTextEditor() {
    const textEditor = document.getElementById("textbox");
    textEditor.style.display = "block";
}

function playAud() {
    const displayAud = document.getElementById('audio-display');
        const aud = document.querySelector('input.audio-file').files[0];
        document.querySelector('form').style.display = 'none';
        const audURL = URL.createObjectURL(aud);
        var playaud = document.getElementById("audio")
        playaud.setAttribute('src', audURL);
        document.getElementById('audio-display').style.display = "none";
        playaud.style.display = "block";
}

// Called when submit button is pressed
function submit() {
    const textEditor = document.getElementById("textbox");
    const audio = document.getElementById("audio");

    const time = audio.currentTime;
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds <= 9)
        seconds = "0" + seconds
    
    
    const formattedTime = minutes + ":" + seconds;
    displayNote(formattedTime, textEditor.value);

    const notes = localStorage.notes ? JSON.parse(localStorage.notes) : {};
    notes[formattedTime] = textEditor.value;
    localStorage.notes = JSON.stringify(notes);

    textEditor.value = "";
}

let count = 0;

// Display note on screen
function displayNote(timestamp, text) {
    const textDisplay = document.getElementById("text-display");
    const box = document.createElement("div");
    
    if (count % 2 == 0) {
        box.classList.add("even");
    } else {
        box.classList.add("odd");
    }

    box.innerHTML += timestamp + " " + text + "</div>";
    textDisplay.appendChild(box);

    count++;
}


// Load notes from local storage
if (localStorage.notes) {
    const notes = JSON.parse(localStorage.notes);

    for (const key in notes)
        displayNote(key, notes[key]);
}