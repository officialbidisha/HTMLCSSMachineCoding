let numberOfSlides = 4;
let slideShowContainer = document.getElementsByClassName(
  "slideshow-container"
)[0];
let prev = document.getElementsByClassName("prev")[0];
let next = document.getElementsByClassName("next")[0];

let slideIndex = 0; // Initialize slideIndex before using it

prev.addEventListener("click", () => plusSlides(-1)); // Use arrow functions to pass the correct argument
next.addEventListener("click", () => plusSlides(1));

for (let i = 0; i < numberOfSlides; i++) {
  let img = document.createElement("img");
  let span = document.createElement("span");
  span.innerHTML = `${i}`;
  img.classList.add("image", "mySlides");
  slideShowContainer.appendChild(span);
  slideShowContainer.appendChild(img);
}

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n >= slides.length) {
    slideIndex = 0; // Reset to the first slide if n exceeds the number of slides
  }
  if (n < 0) {
    slideIndex = slides.length - 1; // Wrap around to the last slide if n is less than 0
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide all slides
  }
  slides[slideIndex].style.display = "block"; // Show the current slide
}
