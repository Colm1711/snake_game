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

let mute = document.getElementById('mute-button');
mute.addEventListener('click', run);
let audio = document.querySelector('audio');
function run(){
    let muteClassList = mute.classList[1];
    if(muteClassList === 'fa-volume-xmark'){
        document.getElementById('mute-button').classList.remove('fa-volume-xmark');
        document.getElementById('mute-button').classList.add('fa-volume-high');
        console.log('something went wrong 1');
        audio.play();
    }
    if(muteClassList === "fa-volume-high"){
        document.getElementById('mute-button').classList.remove('fa-volume-high');
        document.getElementById('mute-button').classList.add('fa-volume-xmark');
        console.log('something went wrong 2');
        audio.pause();
    }
    else{
        console.log('something went wrong 3');
    }   
}


