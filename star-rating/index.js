const starContainer = document.getElementsByClassName("star-container")[0];
const starCount = 5;

let rating = 0;
let filled = 0; // to reduce the iterations
let unfilled = 0; // to reduce the iterations

function displayStars() {
  let index = 0;
  while (index < starCount) {
    let btn = document.createElement("button");
    btn.classList.add("star");
    btn.classList.add("star-empty");
    btn.id = index;
    index++;
    starContainer.append(btn);
  }
}

starContainer.addEventListener("mouseover", hoverListener);
starContainer.addEventListener("mouseleave", leaveListener);
starContainer.addEventListener("click", clickListener);

function fillStars(count) {
  const stars = document.querySelectorAll(".star");
  console.log(stars);
  console.log(filled);
  for (let i = filled; i <count; i++) {
    stars[i].classList.add("star-filled");
    stars[i].classList.remove("star-empty");
  }

  for (let i = count; i < unfilled; i++) {
    stars[i].classList.remove("star-filled");
    stars[i].classList.add("star-empty");
  }

  filled = count;
  unfilled = count;
}

function hoverListener(event) {
  const target = event.target;
  if (target.classList.contains("star")) {
    const index = target.id;
    fillStars(+index);
  }
}

function clickListener(event) {
  const target = event.target;
  if (target.classList.contains("star")) {
    rating = +target.id;
    fillStars(rating);
  }
}

function leaveListener() {
  fillStars(+(rating));
}

displayStars();
