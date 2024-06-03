const words = ['Practice Leetcode', 'Work on BFE.DEV'];

let dynamic_text = document.getElementsByClassName('dynamic_text')?.[0];
let index = 0;
let wordLength = words.length;

let wordIndex = 0;
let characterIndex = 0;
let shouldReverse = false;
const interval = setInterval(()=>{

   if(!shouldReverse){
    dynamic_text.textContent += words[wordIndex][characterIndex];
    characterIndex++;
   }
   else{
      dynamic_text.textContent= dynamic_text.textContent.slice(0,dynamic_text.textContent.length-1);
   }
   if(characterIndex === words[wordIndex].length){
    shouldReverse = true;
   }

   if(dynamic_text.textContent.length===0 && shouldReverse){
     shouldReverse=false;
     characterIndex = 0;
     wordIndex+=1
   }

   if(wordIndex === words.length){
    wordIndex = 0;
   }

}, 200)