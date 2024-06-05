const progress = document.getElementById('progress');
let isInProgress = false;
let reqAniFrameId;
let queue = [];
let index = 1;

const progressController = document.querySelector('.progress-controller');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

stopButton.disabled = true;
progressController.addEventListener('click', clickHandler);

function clickHandler(e) {
  const id = e.target.id;
  if(id === 'start' && isInProgress){
    index++;
    queue.push(index);
    console.log('queue', queue);
  }
  if (id === 'start' && !isInProgress) {
    queue.push(index);
    onStart();
  } else if (id === 'stop' && isInProgress) {
    onStop();
    queue.shift();
  } else if (id === 'reset') {
    onStop();
    queue.shift();
    setProgressWidth(0);
  }
}

function onStart(){
  isInProgress = true;
  stopButton.disabled = false;
  startProgress();
}

function onStop(){
     isInProgress = false;
    stopButton.disabled = true;
    stopProgress();
}


function startProgress(){
    let progressPercentage =  0.1+ getProgressWidth();
    if (progressPercentage<=100) {

        setProgressWidth(progressPercentage);
        reqAniFrameId = requestAnimationFrame(startProgress);
    }
    else{
         queue.shift();
         if(queue.length>0){
            setProgressWidth(0);
            startProgress();
         }
    }
}

function stopProgress() {
     cancelAnimationFrame(reqAniFrameId);
}

function getProgressWidth() {
  return +progress.style.width.split('%')[0];
}

function setProgressWidth(progressPercent) {
  progress.style.width = progressPercent + '%';
}