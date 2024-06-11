const NUMBER_OF_STARS = 5;
let starContainer = document.getElementsByClassName("star-container")[0];

function handleMouseHover(event) {
  let target = event.target;
  let dataId = target.getAttribute("data-id");
  let stars = document.getElementsByTagName("input");

  /**
   * UnChecking the data
   */
  if(document.getElementById(dataId).checked){
    for(let i=NUMBER_OF_STARS-1;i>=dataId-1;i--){
        let element =  document.getElementById(i);
        element.checked = false;
    }
  }
  /**
   * Checking the data
   */
  for (let i = 0; i <=NUMBER_OF_STARS-1; i++) {
    if (stars[i].getAttribute("data-id") <= dataId && !stars[i].checked) {
      stars[i].checked = true;
    }
  }
}

function renderStars(numberOfStars = NUMBER_OF_STARS) {
  for (let index = 0; index < numberOfStars; index++) {
    let label = document.createElement("label");
    label.setAttribute("data-id", index);
    label.classList.add("star-label");
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("data-id", index);
    input.setAttribute("id", index);
    input.style.width=0;
    input.style.height=0;
    label.addEventListener("mouseover", handleMouseHover, false);
    starContainer.appendChild(input);
    starContainer.appendChild(label);
  }
}

renderStars(NUMBER_OF_STARS);
