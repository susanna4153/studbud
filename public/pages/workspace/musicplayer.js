//Based off tutorial: https://www.geeksforgeeks.org/create-a-music-player-using-javascript/ (sayantanm19, 2022)
//Collect DOM elements
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let playlist = document.querySelector(".playlist");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement("audio");

// Define the tracks that have to be played
let track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image:
      "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image:
      "https://images.pexels.com/photos/11502645/pexels-photo-11502645.jpeg?auto=compress&cs=tinysrgb&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image:
      "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
  {
    name: "Dytopian Delight",
    artist: "Wax Lyricist",
    image:
      "https://images.pexels.com/photos/12017866/pexels-photo-12017866.jpeg?auto=compress&cs=tinysrgb&h=250&w=250",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//tracks//mesfvUXBR1sw8n0kpM28IeO4VAFLaWd7urAmemK7.mp3",
  },
  {
    name: "Out of the Labyrinth",
    artist: "Loco Lobo",
    image:
      "https://images.pexels.com/photos/11908917/pexels-photo-11908917.jpeg?auto=compress&cs=tinysrgb&h=250&w=250",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//tracks//9AezUI2VAW0uduoEyEjNKdBTUViSxucd1XqOC7mK.mp3",
  },
  {
    name: "Strategy",
    artist: "Scott Holmes",
    image:
      "https://images.pexels.com/photos/10027235/pexels-photo-10027235.jpeg?auto=compress&cs=tinysrgb&h=250&w=250",
    path: "https://files.freemusicarchive.org//storage-freemusicarchive-org//tracks//PJdJdbexAvuFVlOXDv4j2zxLIb428hlyvFVSIWPf.mp3",
  },
];

//Function to load up tracks
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  // Set an interval of 1000 milliseconds for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current one finishes playing
  curr_track.addEventListener("ended", nextTrack);

  // Clear the playlist
  playlist.querySelectorAll(".playlist-card").forEach((card) => {
    card.remove();
  });

  // Load playlist
  track_list.map((track, index) => {
    const newTrackCard = document
      .getElementById("playlist-card-template")
      .cloneNode(true);
    newTrackCard.id = `playlist-card-${index}`;
    newTrackCard.classList.remove("hidden");
    newTrackCard.classList.add("playlist-card");
    newTrackCard.querySelector(".playlist-track-number").textContent =
      index + 1;
    newTrackCard.querySelector(".playlist-track-image").src = track.image;
    newTrackCard.querySelector(".playlist-track-name").textContent = track.name;
    newTrackCard.querySelector(".playlist-track-artist").textContent =
      track.artist;

    // Apply active styling to the current playing track
    if (index === track_index) {
      newTrackCard.classList.add("active");
    }

    // Add event listener to the track card
    newTrackCard.addEventListener("click", () => {
      loadTrack(index);
    });

    playlist.querySelector(".playlist-body").appendChild(newTrackCard);
  });
}

// Reset Values
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Adding a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);
