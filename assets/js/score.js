//This contains the code for the score board that can either be displayed by clicking button to reveal//
//Or will display on end of game//

//importing score var from gameOver
import {score} from './script.js';


//collecting user name to set as Key 
function myMsg(){
    let player = prompt("Please enter your name:");
    //setting to session storage in case change of player
    sessionStorage.setItem('PlayerName', player);
    var storedNames = localStorage.player;
    console.log(typeof(player));
    console.log(storedNames);
}


  

// add event listener to button where user can update there score to list on HTML doc
let btn = document.getElementById('scoreButton');
   
btn.addEventListener('click', function scoreBoard(){
    let listItem = document.createElement('li');
    let newScore = document.createTextNode(score);
    let theList = document.getElementById('scoreList');
    let scoreValue = newScore.nodeValue;

    //let Maxlength = theList.children.length = 3;

    listItem.appendChild(newScore);
    theList.appendChild(listItem);
});

// });


myMsg();
