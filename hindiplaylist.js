let play = document.getElementById("play");
let forward = document.getElementById("next");
let backward = document.getElementById("backward");
let replay = document.getElementById("replay");
let songClick = document.getElementsByClassName("song");
let auidoProgress = document.getElementById("audioProgress");
let songIndex = 0;
let songCount = 8;

let song = [
  {
    name: "Aisi raaton",
    artist: "anupam roy",
    status: "liked",
    duration: "03:34",
    track: "songs\\Aisi Raaton by Anupom Roy lyrical video.mp3",
    cover: "cover\\1.jpg",
  },
  {
    name: "Lavender",
    artist: "azooz",
    status: "liked",
    duration: "03:00",
    track: "songs\\Lavender Ft Azooz Lyrical Video Pixxiebae 🌸.mp3",
    cover: "cover\\2.jpg",
  },
  {
    name: "Bande",
    artist: "sivam",
    status: "liked",
    duration: "03:13",
    track: "songs\\Bande - Vikram Vedha.mp3",
    cover: "cover\\3.jpg",
  },
  {
    name: "Rasiya",
    artist: "sivam",
    status: "liked",
    duration: "03:13",
    track: "songs\\Rasiya(PagalWorld.com.se).mp3",
    cover: "cover\\4.jpg",
  },
  {
    name: "Shiva theme",
    artist: "Javed Ali",
    status: "liked",
    duration: "03:13",
    track: "songs\\Shiva Theme(PagalWorld.com.se).mp3",
    cover: "cover\\5.jpg",
  },
  {
    name: "Barisheein",
    artist: "Anuv jain",
    status: "liked",
    duration: "03:13",
    track:
      "songs\\BAARISHEIN Studio Anuv JainMP3 70K (sameergyaani.wapqiz.com).mp3",
    cover: "cover\\6.jpg",
  },
  {
    name: "Tose naina",
    artist: "sivam",
    status: "liked",
    duration: "03:13",
    track: "songs\\02. Tose Naina.mp3",
    cover: "cover\\7.jpg",
  },
  {
    name: "Kaise hua",
    artist: "sivam",
    status: "liked",
    duration: "03:13",
    track: "songs\\Kaise Hua - Kabir Singh.mp3",
    cover: "cover\\8.jpg",
  },
  {
    name: "Agar tum saath ho",
    artist: "sivam",
    status: "liked",
    duration: "03:13",
    track: "songs\\03 Tum Saath Ho - Tamasha (Arijit Singh) 320Kbps.mp3",
    cover: "cover\\9.jpg",
  },
];

var music = new Audio(song[songIndex].track);

//on clicking on the song selected
for (let i = 0; i < songClick.length; i++) {
  songClick[i].addEventListener("click", function (event) {
    let id = event.target.id;

    //adding css effects for selected song
    let allSongs = document.getElementsByClassName("song");
    for (let i = 0; i < allSongs.length; i++) {
      if (allSongs[i].classList.contains("selectedSong")) {
        allSongs[i].classList.remove("selectedSong");
      }
    }
    event.target.classList.add("selectedSong");

    //playing the song
    if (music.currentTime != 0) {
      music.pause();
    }
    // changing icon too
    play.setAttribute("src", "images\\pause.png");
    songIndex = id - 1;
    music = new Audio(song[songIndex].track);
    music.play();

    document
      .getElementById("currentSongImg")
      .setAttribute("src", song[songIndex].cover);
    document.getElementById("currentSongName").innerHTML = song[songIndex].name;
  });
}

// On clicking the play button
play.addEventListener("click", function () {
  if (/* Paused or Not started */ music.paused || music.currentTime == 0) {
    play.setAttribute("src", "images\\pause.png");
    music.play();
  } else {
    music.pause();
    play.setAttribute("src", "images\\play-button.png");
  }
});

// on clicking the forward button
forward.addEventListener("click", function () {
  // stop old song
  music.pause();
  //for edge case of last song
  if (songIndex == songCount) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  //changing the music
  music = new Audio(song[songIndex].track);
  music.play();
  //changing the effects accordingly
  let allSongs = document.getElementsByClassName("song");
  for (let i = 0; i < allSongs.length; i++) {
    if (allSongs[i].classList.contains("selectedSong")) {
      allSongs[i].classList.remove("selectedSong");
    }
  }
  document.getElementById(songIndex + 1).classList.add("selectedSong");
  document
    .getElementById("currentSongImg")
    .setAttribute("src", song[songIndex].cover);
  document.getElementById("currentSongName").innerHTML = song[songIndex].name;
});

// on clicking the backward button
backward.addEventListener("click", function () {
  // stop old song
  music.pause();
  //for edge case of first song
  if (songIndex == 0) {
    songIndex = songCount;
  } else {
    songIndex--;
  }
  //changing the music
  music = new Audio(song[songIndex].track);
  music.play();
  //changing the effects accordingly
  let allSongs = document.getElementsByClassName("song");
  for (let i = 0; i < allSongs.length; i++) {
    if (allSongs[i].classList.contains("selectedSong")) {
      allSongs[i].classList.remove("selectedSong");
    }
  }
  document.getElementById(songIndex + 1).classList.add("selectedSong");
  document
    .getElementById("currentSongImg")
    .setAttribute("src", song[songIndex].cover);
  document.getElementById("currentSongName").innerHTML = song[songIndex].name;
});

//song progress bar
music = new Audio(song[songIndex].track);
music.addEventListener("timeupdate", function () {
  auidoProgress.value = (music.currentTime / music.duration) * 100;
});

// auidoProgress.addEventListener("change",function{
//     music.currentTime=(auidoProgress.value/100)*music.duration;
// })

//volume changer
document.getElementById("volume").addEventListener("change", function () {
  music.volume = document.getElementById("volume").value / 100;
});

//replays
let replayC = false;
// on clicking replay button
replay.addEventListener("click", function () {
  document.getElementById("replay").classList.toggle("replayOn");
  replayC = !replayC;
});

//merging
let mergeC = false;
document.getElementById("remix").addEventListener("click", function () {
  document.getElementById("remix").classList.toggle("replayOn");
  mergeC = !mergeC;
});

music.addEventListener("ended", function () {
  if (mergeC && !replayC) {
    songIndex = Math.floor(Math.random() * songCount) + 1;
    music = new Audio(song[songIndex].track);
    music.play();
    let allSongs = document.getElementsByClassName("song");
    for (let i = 0; i < allSongs.length; i++) {
      if (allSongs[i].classList.contains("selectedSong")) {
        allSongs[i].classList.remove("selectedSong");
      }
    }
    document.getElementById(songIndex + 1).classList.add("selectedSong");
    //cover img and name
    document
      .getElementById("currentSongImg")
      .setAttribute("src", song[songIndex].cover);
    document.getElementById("currentSongName").innerHTML = song[songIndex].name;
  } else if (!replayC) {
    if (songIndex == songCount) {
      songIndex = 0;
    } else {
      songIndex++;
    }
    music = new Audio(song[songIndex].track);
    music.play();
    let allSongs = document.getElementsByClassName("song");
    for (let i = 0; i < allSongs.length; i++) {
      if (allSongs[i].classList.contains("selectedSong")) {
        allSongs[i].classList.remove("selectedSong");
      }
    }
    document.getElementById(songIndex + 1).classList.add("selectedSong");
    document
      .getElementById("currentSongImg")
      .setAttribute("src", song[songIndex].cover);
    document.getElementById("currentSongName").innerHTML = song[songIndex].name;
  } else if (replayC) {
    music = new Audio(song[songIndex].track);
    music.play();
  }
});

//tap to change play status
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    if (/* Paused or Not started */ music.paused || music.currentTime == 0) {
      play.setAttribute("src", "images\\pause.png");
      music.play();
    } else {
      music.pause();
      play.setAttribute("src", "images\\play-button.png");
    }
  }
});

let allSongs = document.getElementsByClassName("song");
for (let i = 0; i < allSongs.length; i++) {
  if (allSongs[i].classList.contains("selectedSong")) {
    allSongs[i].classList.remove("selectedSong");
  }
}
document.getElementById(songIndex + 1).classList.add("selectedSong");
