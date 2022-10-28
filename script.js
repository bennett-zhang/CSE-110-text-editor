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

let count = 0;

function submit() {
    const textEditor = document.getElementById("textbox");
    const textDisplay = document.getElementById("text-display");
    const audio = document.getElementById("audio");

    const time = audio.currentTime;
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (seconds <= 9)
        seconds = "0" + seconds
    
    const box = document.createElement("div");
    

    if (count % 2 == 0) {
        box.classList.add("even");
    } else {
        box.classList.add("odd");
    }

    box.innerHTML += minutes + ":" + seconds + " " + textEditor.value + "</div>";
    textDisplay.appendChild(box);

    textEditor.value = "";

    count++;
}