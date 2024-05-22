let modal = document.getElementById('simpleModal');
let openModalButton = document.getElementsByClassName('btn')[0];
let closeBtn = document.getElementsByClassName('closeBtn')[0];

openModalButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);
function openModal(){
  modal.style.display = 'block';
}
function closeModal(){
    modal.style.display = 'none';
}

function clickOutside(e){
    console.log('e.', e.target);
    if(e.target === modal){
        modal.style.display = 'none';
    }
}