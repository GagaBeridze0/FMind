// Create the audio element outside of the function to make it global
var audio = new Audio('../Assets/Media/Audio/mindia.mp3');

function handleInput() {
  var input = document.getElementById("search-input").value;
  
  if (input.startsWith("/ქურდულები")) {
    // Play MP3 music
    playMP3();
  } else if (input.startsWith("/edr")) {
    // Open image
    openImage();
  } else if (input.startsWith("/fr")) {
    // Write MP3
    writeMP3();
  }
}

function playMP3() {
  // Reset the audio to the beginning in case it's already playing
  audio.currentTime = 0;
  
  // Play the audio
  audio.play();
}

function openImage() {
  // Add your code to open an image here
  console.log("Opening image");
}

function writeMP3() {
  // Add your code to write MP3 here
  console.log("Writing MP3");
}