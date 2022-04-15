//Setting object vars
let openBtn = document.getElementById('openModal');
let closBtn = document.getElementById('closeModal');
let modalObj = document.getElementById('myModal');

//open modal event handler
openBtn.addEventListener('click', (e) =>{
    modalObj.style.display='block';
});

//close modal event handler
closBtn.addEventListener('click', (e) =>{
    modalObj.style.display='none';
});

//This add mute/unmute funcationaltiy to button on screen
//define mute button
let mute = document.getElementById('mute-button');
//add event listener
mute.addEventListener('click', run);
//define audio
let audio = document.querySelector('audio');
//This function updates the button on display by altering class list and also plays and pauses the audio
function run(){
    let muteClassList = mute.classList[1];
    if(muteClassList === 'fa-volume-xmark'){
        document.getElementById('mute-button').classList.remove('fa-volume-xmark');
        document.getElementById('mute-button').classList.add('fa-volume-high');
        console.log('something went wrong 1');
        audio.play();
    }
    if(muteClassList === 'fa-volume-high'){
        document.getElementById('mute-button').classList.remove('fa-volume-high');
        document.getElementById('mute-button').classList.add('fa-volume-xmark');
        console.log('something went wrong 2');
        audio.pause();
    }
    //if this function fails will priont to console
    else{
        console.log('something went wrong 3');
    }   
}


