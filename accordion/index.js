const data = {
  steps: ["Step 1", "Step 2", "Step 3"],
  description: [
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  ],
};

function togglePanel(event) {
  let accordionBody = document.getElementsByClassName("accordion-panel")[event.target.id];
  let accordionArrow = document.getElementsByClassName("accordion-arrow")[event.target.id];
  console.log(accordionArrow);
  let computedStyle = getComputedStyle(accordionBody);
  if (computedStyle.display === "none") {
    accordionBody.style.display = "block";
    accordionArrow.style.transform = "rotate(180deg)";
    accordionArrow.classList.add("rotate");
  } else {
    accordionBody.style.display = "none";
    accordionArrow.style.transform = "rotate(0deg)";
    if (accordionArrow.classList.contains("rotate")) {
      accordionArrow.classList.remove("rotate");
    }
  }
}

let accordion = document.getElementsByClassName("accordion")[0];
accordion.addEventListener('click', togglePanel)
function createHeader(index) {
    let accordionHeader = document.createElement("div");
    accordionHeader.classList.add("accordion-header");
    let accordionArrow = document.createElement("div");
    accordionArrow.classList.add("accordion-arrow");
    accordionHeader.id = index;
    accordion.appendChild(accordionHeader);
    /**
     * Insert sibling
     */
    let accordionName = document.createElement("h2");
    accordionName.classList.add("accordion-name");
    let textElement = document.createTextNode(data.steps[index]);
    accordionName.append(textElement);
    accordionHeader.insertAdjacentElement("beforeend", accordionName);
    accordionHeader.appendChild(accordionArrow);
}

function createBody(index) {
 
    let accordionPanel = document.createElement("div");
    accordionPanel.classList.add("accordion-panel");
    accordionPanel.id = index;
    let accordionBody = document.createElement('p');
    let textNode = document.createTextNode(data.description[index]);
    accordionBody.append(textNode);
    accordionPanel.append(accordionBody);
    console.log(accordion);
    accordion.appendChild(accordionPanel);
}

function generateAccordion() {
 for(let i=0;i<data.steps.length;i++){
  createHeader(i);
  createBody(i);
 }
}

generateAccordion();
