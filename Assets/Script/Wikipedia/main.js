var searchTermInput = document.getElementById('freshBot-input');

// Voice search button click event listener
function startVoiceRecognition() {
  const recognition = new webkitSpeechRecognition() || SpeechRecognition();
  recognition.lang = 'ka-GE'; // Set the language (may not support Georgian)
  recognition.onresult = (event) => {
    const voiceResult = event.results[0][0].transcript;
    const modifiedResult = voiceResult.charAt(0).toLowerCase() + voiceResult.slice(1);
    const sanitizedResult = modifiedResult.replace(/[,.!@#$%^&*()_+={}\[\]:;"'<>\?/\|\\`~]/g, '');
    searchTermInput.value = sanitizedResult;
    fetchWikipediaContentWithTypingEffect();
  };
  recognition.start();
}


// Function to fetch Wikipedia content with typing effect
async function fetchWikipediaContentWithTypingEffect() {
  const searchTermInput = document.getElementById('freshBot-input');
  const searchTerms = searchTermInput.value.split(',');
  const contentContainer = document.getElementById('information-container');

  // Clear previous content
  contentContainer.innerHTML = '';

  try {
    for (const searchTerm of searchTerms) {
      const apiUrl = `https://ka.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Display Wikipedia content with typing effect
      await displayWikipediaContentWithTypingEffect(data);
    }
  } catch (error) {
    console.log('Error fetching Wikipedia content', error);
  }
}

// Function to display Wikipedia content with typing effect
async function displayWikipediaContentWithTypingEffect(data) {
  const contentContainer = document.getElementById('information-container');
  const freshBotheader = document.getElementById('freshBot-header');

  if (data.title && data.extract) {
    freshBotheader.style.display = 'none';

    // Display content with typing effect for title
    await typeText(data.title, 'query-title');

    // Display content with typing effect for extract
    await typeText(data.extract, 'query-info');
  } else {
    freshBotheader.style.display = 'none';
    // Display custom message when content is not found
    const notFoundMessage = document.createElement('h5');
    notFoundMessage.textContent =
      'ვერაფერი მოიძებნა ):';
    contentContainer.appendChild(notFoundMessage);
  }
}

// Function to simulate typing effect
async function typeText(text, className) {
  const contentContainer = document.getElementById('information-container');

  // Create and append an element with the specified class
  const element = document.createElement('div');
  element.classList.add(className);
  contentContainer.appendChild(element);

  // Iterate over each character and display with delay
  for (let i = 0; i < text.length; i++) {
    element.textContent += text.charAt(i);
    await sleep(10); // Adjust the delay (in milliseconds) to control typing speed
  }
}

// Helper function for introducing delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get the input field for search terms
var searchTermInput = document.getElementById('freshBot-input');

// Search keydown event listener
searchTermInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    fetchWikipediaContentWithTypingEffect();
  }
});
