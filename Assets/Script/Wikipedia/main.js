// Get the input field for search terms
var searchTermInput = document.getElementById("freshBot-input");
var queryBtn = document.getElementById("querysendBtn");
var recognition; // Declare recognition outside the function

// Search keydown event listener
searchTermInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (
      searchTermInput.value.trim() !== "" &&
      parseInt(searchTermInput.value) !== 0
    ) {
      fetchWikipediaContentWithTypingEffect();
    }
  }
});

// Function to update button state based on input value
function updateButtonState() {
  if (
    searchTermInput.value.trim() === "" ||
    parseInt(searchTermInput.value) === 0
  ) {
    queryBtn.disabled = true;
  } else {
    queryBtn.disabled = false;
  }
}

// Initial state setup
updateButtonState();

// Add event listener to update button state on input change
searchTermInput.addEventListener("input", updateButtonState);

let isMicActive = false; // Variable to track the microphone state

// Voice search button click event listener
function startVoiceRecognition() {
  recognition = new webkitSpeechRecognition() || SpeechRecognition();
  recognition.lang = "ka-GE"; // Set the language (may not support Georgian)
  recognition.onresult = (event) => {
    const voiceResult = event.results[0][0].transcript;
    const modifiedResult =
      voiceResult.charAt(0).toLowerCase() + voiceResult.slice(1);
    const sanitizedResult = modifiedResult.replace(
      /[,.!@#$%^&*()_+={}\[\]:;"'<>\?/\|\\`~]/g,
      ""
    );
    searchTermInput.value = sanitizedResult;
    fetchWikipediaContentWithTypingEffect();
  };

  recognition.onstart = () => {
    isMicActive = true;
    voiceBtn.classList.add("active"); // Add the 'active' class when the microphone is on
  };

  recognition.onend = () => {
    isMicActive = false;
    voiceBtn.classList.remove("active"); // Remove the 'active' class when the microphone is off
  };

  recognition.start();
}

const voiceBtn = document.getElementById("voice-btn");

voiceBtn.addEventListener("click", function () {
  // Toggle the microphone state and 'active' class
  if (isMicActive) {
    recognition.stop(); // Stop the recognition if the microphone is active
  } else {
    startVoiceRecognition();
  }
});

// Function to fetch Wikipedia content with typing effect
async function fetchWikipediaContentWithTypingEffect() {
  const searchTermInput = document.getElementById("freshBot-input");
  const searchTerms = searchTermInput.value.split(",");
  const contentContainer = document.getElementById("information-container");

  // Clear previous content
  contentContainer.innerHTML = "";

  try {
    for (const searchTerm of searchTerms) {
      const apiUrl = `https://ka.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Display Wikipedia content with typing effect
      await displayWikipediaContentWithTypingEffect(data);
    }
  } catch (error) {
    console.log("Error fetching Wikipedia content", error);
  }
}

// Function to display Wikipedia content with typing effect
async function displayWikipediaContentWithTypingEffect(data) {
  const contentContainer = document.getElementById("information-container");
  const freshBotheader = document.getElementById("freshBot-header");

  if (data.title && data.extract) {
    freshBotheader.style.display = "none";

    // Display content with typing effect for title
    await typeText(data.title, "query-title");

    // Display content with typing effect for extract
    await typeText(data.extract, "query-info");

    // Array of link variants
    const linkVariants = [
      '<i class="fi fi-sr-link-alt"></i> <span>სრული ინფორმაცია</span>',
      '<i class="fi fi-sr-link-alt"></i> <span>ვრცლად</span>',
      '<i class="fi fi-sr-link-alt"></i> <span>შეიტყვეთ მეტი</span>',
      '<i class="fi fi-sr-link-alt"></i> <span>გაიგე მეტი</span>',
      '<i class="fi fi-sr-link-alt"></i> <span>ნახეთ სრულად</span>',
      '<i class="fi fi-sr-link-alt"></i> <span>მეტის ნახვა</span>',
    ];

    // Randomly choose a link variant
    const randomLinkVariant = linkVariants[Math.floor(Math.random() * linkVariants.length)];

    // Create a hyperlink for Wikipedia page URL with the randomly chosen variant
    const linkContainer = document.createElement("div");
    const link = document.createElement("a");
    link.innerHTML = randomLinkVariant;
    link.href = data.content_urls.desktop.page;
    link.target = "_blank"; // Open link in a new tab
    linkContainer.appendChild(link);
    contentContainer.appendChild(linkContainer);
  } else {
    freshBotheader.style.display = "none";
    // Display custom message when content is not found
    const notFoundMessage = document.createElement("h5");
    await typeText(notFoundMessage.textContent = "სამწუხაროდ თქვენი მოთხოვნა ვერ დამუშავდა. იქნებ მეტი კონტექსტი მოგვაწოდოთ ან სხვა შესატყვისი გამოიყენოთ?");
  }
}

// Function to simulate typing effect
async function typeText(text, className) {
  const contentContainer = document.getElementById("information-container");

  // Create and append an element with the specified class
  const element = document.createElement("div");
  element.classList.add(className);
  contentContainer.appendChild(element);

  // Iterate over each character and display with delay
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await sleep(7); // Adjust the delay (in milliseconds) to control typing speed
  }
}

// Helper function for introducing delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
