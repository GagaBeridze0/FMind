const buttons = document.querySelectorAll(".btn");

for (const button of buttons) {
  button.addEventListener("mousedown", createRipple);
  button.addEventListener("mouseup", removeRipple);
}

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

function removeRipple(event) {
  const button = event.currentTarget;

  // Remove the ripple after a short delay
  setTimeout(() => {
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
  }, 600); // 600ms is the duration of the ripple animation
}








// Get the search input element
const searchInput = document.getElementById('search-input');

// Define an array of placeholder texts for the animation
const placeholders = [
  "ბიოლოგია",
  "გეოგრაფია",
  "ისტორია",
  "მათემატიკა",
  "ინგლისური",
  "მოქალაქეობა",
];

// Set an interval to update the placeholder text with a removal and typing animation
let index = 0;
setInterval(() => {
  const placeholderText = placeholders[index];
  animateRemoval(() => animateTyping(placeholderText));

  // Increment the index or reset to 0 if it exceeds the array length
  index = (index + 1) % placeholders.length;
}, 5000); // Change the interval (in milliseconds) according to your preference

// Function to animate removal
function animateRemoval(callback) {
  let i = searchInput.placeholder.length;

  const removalInterval = setInterval(() => {
    if (i > 0) {
      searchInput.placeholder = searchInput.placeholder.substring(0, i - 1);
      i--;
    } else {
      clearInterval(removalInterval);
      callback();
    }
  }, 50); // Adjust removal speed if needed
}

// Function to animate typing
function animateTyping(text) {
  let i = 0;
  searchInput.placeholder = '';

  const typingInterval = setInterval(() => {
    if (i < text.length) {
      searchInput.placeholder += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100); // Adjust typing speed if needed
}

const menu = document.querySelector('.flex-shrink-0');
const menuBtn = document.getElementById("menu-btn");
const mainContent = document.getElementById("main-content")

// Check if both elements are found in the DOM
if (menu && menuBtn) {
  // Add a click event listener to the menuBtn
  menuBtn.addEventListener("click", function () {
    // Toggle the visibility of the menu element
    menu.classList.toggle("active");
    mainContent.classList.toggle("active");
  });
}