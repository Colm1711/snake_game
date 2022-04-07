//This contains the code for the score board that can either be displayed by clicking button to reveal//
//Or will display on end of game//

//collecting user name to set as Key 
function setUserName(){
    let player = prompt("Please enter your name:");
    //setting to session storage in case change of player
    sessionStorage.setItem('PlayerName', JSON.stringify(player));
}

setUserName();
