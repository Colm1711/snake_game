//This contains the code for the score board that can either be displayed by clicking button to reveal//
//Or will display on end of game//

//collecting user name to set as Key 
function setUserName(){
    let checkName = sessionStorage.getItem('PlayerName');
    //if statement to if username is set in session storage
    if(checkName){
        alert(`Welcome back ${checkName}!`)
    }else{
    let player = prompt("Please enter your name:");
    //setting to session storage in case change of player
    sessionStorage.setItem('PlayerName', JSON.stringify(player));
    }
}

setUserName();
