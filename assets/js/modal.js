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
let audio = document.querySelector('audio')
mute.addEventListener('click', run);

function run(){
    if (mute.innerclass === 'fa-solid fa-volume-xmark'){
        mute.innerclass = "fa-solid fa-volume"
        audio.play();
    }
    else{
        mute.innerclass = "fa-solid fa-volume-xmark"
        audio.pause();
    }
        
}