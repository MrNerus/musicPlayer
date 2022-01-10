function toggleTab(id) {
    let ids = ["nowPlaying", "songLists", "settings"];
    for (i in ids) {
        if (id != ids[i]) {
            document.getElementById(ids[i] + "Btn").classList.remove("active");
            document.getElementById(ids[i]).classList.add("hidden");
        }
    }
    document.getElementById(id + "Btn").classList.add("active");
    document.getElementById(id).classList.remove("hidden");
}

function toggleClass(where, what) {
    document.getElementById(where).classList.toggle(what);
}

function deFocusSidebar() {
    document.getElementById("sidebar").classList.remove("sideOpen");
}

function playThis(x) {
    pauseSong();
    current = x;
    audioElement = new Audio(`${songs[current].filePath}`);
    playSong();
}

function playPause() {
    if (
        player.getAttribute("data-isPlaying") == "false"
    ) {
        playSong();
    } else {
        pauseSong();
    }
}

function playAnother(direction) {
    pauseSong();
    // Not sure how to implement Repeat function
    
    if (direction == 'next') {
        if (shuffle.getAttribute("data-isShuffle") == "true" ) {
            current = rngInt(0, songs.length - 1);
        } else {
            // if currently playing song is last song of list, make it so that next song if played is first one of the list.
            current = (current == songs.length - 1) ? 0 : (current + 1);
        }
    }
    else if (direction == 'previous') {
        if (shuffle.getAttribute("data-isShuffle") == "true" ) {
            current = rngInt(0, songs.length - 1);
        } else {
            // if currently playing song is first song of list, make it so that previous song if played is last one of the list.
            current = (current == 0) ? (songs.length - 1) : (current - 1);
        }
    }
    // Select current song
    audioElement = new Audio(`${songs[current].filePath}`);

    playSong();
}

function toggleShuffle() {
    if (shuffle.getAttribute('data-isShuffle') == 'true'){
        shuffle.classList.remove('active')
    } else {
        shuffle.classList.add('active')
    }
    toggleDataAttribute('shuffle', 'data-isShuffle', "true", "false")  
}

function toggleRepeat() {
    // Nothing happens. I don't know how to implement repeat feature
    if (repeat.getAttribute('data-isRepeat') == 'true'){
        repeat.classList.remove('active')
    } else {
        shuffle.classList.add('active')
    }
    toggleDataAttribute('repeat', 'data-isRepeat', "true", "false")  
}

function toggleDataAttribute(where, which, opt1, opt2){
    // if current data is opt1, set opt2 else set opt1
    document.getElementById(where).setAttribute(which, ((document.getElementById(where).getAttribute(which) == opt1)? opt2 : opt1))
}

function playSong() {
    player.setAttribute("data-isPlaying", "true");
    player.textContent = "pause_circle_outline";
    playGroundIcon.style.animationPlayState = "running";
    audioElement.play();
    let dhours = Math.floor(audioElement.duration / (60*60));
    let dmins = Math.floor((audioElement.duration % (60*60)) / 60);
    let dsecs = Math.floor((audioElement.duration % (60*60)) % 60);
    totalDuration.textContent = `${dhours}:${dmins}:${dsecs}`
    listen();
}

function pauseSong() {
    player.setAttribute("data-isPlaying", "false");
    player.textContent = "play_circle_outline";
    playGroundIcon.style.animationPlayState = "paused";
    audioElement.pause();
}

function listen() {
    audioElement.addEventListener("timeupdate", () => {
        seekbar.value = parseInt(
            (audioElement.currentTime / audioElement.duration) * 1000
        );
        let hours = parseInt(audioElement.currentTime / (60*60));
        let mins = parseInt((audioElement.currentTime % (60*60)) / 60);
        let secs = parseInt((audioElement.currentTime % (60*60)) % 60);
        elapsed.textContent = `${hours}:${mins}:${secs}`
    });
}

function seeked() {
    audioElement.currentTime = parseInt(
        (seekbar.value / 1000) * audioElement.duration
    );
}

function populate() {
    child = "";
    for (let i = 0; i < songs.length; i += 1) {
        child += `<div class='songs' onclick="playThis(${i})">
                <i class="material-icons">music_note</i>
                <div class='songTitle'>${songs[i].songName}</div>
                <div class='fontSizeQuarter'>I don't know who wrote this song</div>
            </div>`;
    }
    document.getElementById("songLists").innerHTML = child;
}
function volumeChange() {
    audioElement.volume = parseFloat(volbar.value / 100);
    vol.textContent = volbar.value;
}

function rngInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mouseDownEffect(x){
    x.classList.add('active');
}
function mouseUpEffect(x){
    x.classList.remove('active');
}

var audioElement = new Audio(`${songs[rngInt(0, songs.length - 1)].filePath}`);
var current = 0;
const seekbar = document.getElementById("seekBar");
const volbar = document.getElementById("volBar");
const repeat = document.getElementById("repeat");
const shuffle = document.getElementById("shuffle");
const previous = document.getElementById("previous");
const player = document.getElementById("player");
const next = document.getElementById("next");
const playGroundIcon = document.getElementById("playGroundIcon");
const vol = document.getElementById("vol");
const elapsed = document.getElementById("elapsed");
const totalDuration = document.getElementById("duration");


populate();
listen();
volumeChange();
seekbar.value = 0;

