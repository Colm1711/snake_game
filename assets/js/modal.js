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