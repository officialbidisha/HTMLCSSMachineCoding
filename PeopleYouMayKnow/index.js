let url = "https://run.mocky.io/v3/d647c886-3563-481b-b05d-b03bf8817451";
let result = [];
let lastIndex = 0;
document.getElementsByClassName('list')[0].addEventListener('click', handleListener);

function handleListener(event){
  let node = event.target;
  if(node.className === 'connect'){
     removeNode(node.id);
  }

  if(node.className === 'close'){
      removeNode(node.id);
  }
}

async function getUsers() {
  let res = await fetch(url);
  let x = await res.json();
  result = x.slice(0, 5);
  lastIndex += 5;
  renderUsers();
  addNext();
}

function removeNode(id){
    let list = document.getElementsByClassName('list');
    let child = document.getElementById(id);
    list[0].removeChild(child);
}

function renderUsers() {
  let listDom = document.getElementsByClassName("list");

  for (let res of result) {
    let rowElement = document.createElement("div");
    rowElement.classList.add("row", 'container');
    rowElement.id = res.id

    // insert the next few elements inside this row
    //column1
    let imgSrc = document.createElement("img");
    imgSrc.src = res.thumbnailUrl;
    imgSrc.classList.add("image", "column");

    // column2
    let column2 = document.createElement("div");
    column2.classList.add("column", "column2");

    let row1 = document.createElement("div");
    row1.class = "row";
    let text = res.name + ", works at " + res.company.name;
    let textNode = document.createTextNode(text);
    row1.append(textNode);

    let row2 = document.createElement("div");
    row2.class = "row";
    row2.innerHTML = `<button id=${res.id}  class='connect' style="cursor:pointer">+ Connect</button>`;

    column2.append(row1);
    row1.insertAdjacentElement("afterend", row2);

    let column3 = document.createElement("div");
    column3.classList.add("column", "spanlist");
    let span = document.createElement("span");
    span.id = "close";
    span.innerHTML = `<button id=${res.id} class='close' style="cursor:pointer">X</button>`;
    column3.appendChild(span);

    rowElement.appendChild(imgSrc);

    imgSrc.insertAdjacentElement("afterEnd", column3);
    imgSrc.insertAdjacentElement("afterEnd", column2);

    listDom[0].append(rowElement);
  }
}

async function loadMore(){
    debugger;
    let res = await fetch(url);
    let x = await res.json();
    result = x.slice(lastIndex, lastIndex+5);
    lastIndex += 5;
  
    renderUsers();
}

function addNext(){
    let seeMode = document.createElement('div');
    seeMode.innerHTML = `<button class="seemore" onclick="loadMore()"> See More >></button>`;
    let listDom = document.getElementsByClassName("list");
    listDom[0].insertAdjacentElement('afterEnd', seeMode);
}

window.addEventListener("onload", getUsers());
