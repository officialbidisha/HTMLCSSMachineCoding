const TOTAL_NUMBER_OF_IMAGES = 5;
const carouselContainer = document.getElementsByClassName('carousel-container');
const data= ['./assets/image1.jpg', 
'./assets/image2.jpg',
'./assets/image3.jpg',
'./assets/image4.jpg',
'./assets/image5.jpg',
];

const nextBtn = document.getElementsByClassName('next-btn')[0];
const prevBtn = document.getElementsByClassName('prev-btn')[0];
let activeIndex = 0;
nextBtn.addEventListener('click', handleNext);
prevBtn.addEventListener('click', handlePrev);
/**
 * Render images
 * @param {*} numberOfImages 
 */
function renderImages(numberOfImages = TOTAL_NUMBER_OF_IMAGES){
    const inner= createElement('div');
    inner.classList.add('inner');
    for(let i=0;i<numberOfImages;i++){

        const item = createElement('div');
        const image = createElement('img');
        image.alt = `image ${i+1}`;
        image.src= `${data[i]}`;
        item.appendChild(image);
        item.classList.add('carousel-item');
        inner.appendChild(item);
        inner.style.transform= 'translateX(-0%)';
        carouselContainer[0].appendChild(inner);
    }
}

/**
 * Create element
 * @param {*} elementName 
 * @returns 
 */
function createElement(elementName){
    return document.createElement(elementName);
}

renderImages(TOTAL_NUMBER_OF_IMAGES);

function handlePrev(event){
    if(activeIndex === 0){
        activeIndex = TOTAL_NUMBER_OF_IMAGES-1;
    }else{
        activeIndex--;
    }
    let inner = document.getElementsByClassName('inner');
    inner[0].style.transform = `translateX(-${activeIndex* 100}%)`;
    
}

function handleNext(event){
    if(activeIndex === TOTAL_NUMBER_OF_IMAGES-1){
        activeIndex = 0;
    }else{
        activeIndex++;
    }
    let inner = document.getElementsByClassName('inner');
    inner[0].style.transform = `translateX(-${activeIndex* 100}%)`;
    
}

function handleKeyboardNav(e) {
    if (!e) e = window.event;
    var kc = e.keyCode;
    if (kc == 37) navigatePrev();
    if (kc == 39) navigateNext();
  }
  
  function bindKeyDownListener() {
    window.addEventListener("keydown", handleKeyboardNav, false);
  }
  
  //start the binding
  bindKeyDownListener();
  
  window.addEventListener('unload', ()=>{
    document.removeEventListener('keydown')
  })


