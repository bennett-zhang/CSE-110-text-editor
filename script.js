function openTextEditor() {
    const textEditor = document.getElementById("textbox");
    textEditor.style.display = "block";
}

const audioInput = document.querySelector("input.audio-file");

/* Display audio file on screen */
audioInput.addEventListener("change", () => {
    const aud = audioInput.files[0];
    document.querySelector("form").style.display = "none";
    const audURL = URL.createObjectURL(aud);
    const playaud = document.getElementById("audio");
    playaud.setAttribute("src", audURL);
    playaud.style.display = "block";

    openTextEditor();
});
/* End of function for audio display */ 

/* Called when submit button is pressed */
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

/* End of function for note submission*/ 

let count = 0;

/* Display note on screen */
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
/* End of function for note display */

// Load notes from local storage
if (localStorage.notes) {
    const notes = JSON.parse(localStorage.notes);

    for (const key in notes)
        displayNote(key, notes[key]);
}
