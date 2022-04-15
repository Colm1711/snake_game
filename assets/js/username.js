//Display username on load and user will be able to update

//event listeners for when the overlay button is clicked on screen
let overlay = document.getElementById('overlay');
overlay.addEventListener('click',  function(){overlay.style.display = 'none';
  });
//collecting user name to set as Key 
function setUserName(){
    let checkName = sessionStorage.getItem('PlayerName');
    //if statement to if no username or is null is set in session storage
    if(JSON.parse(checkName) === null){
        //prompt user to set it
        let player = prompt("Please enter your name:");
        //setting to session storage in case change of player
        sessionStorage.setItem('PlayerName', JSON.stringify(player));
        ///otherswise write name to welcome message and display on load
    }
    else{
        document.getElementById('usernameMessage').innerHTML = `Let's play snake ${JSON.parse(checkName)}!`;
        window.onload = function(){document.getElementById('overlay').style.display = 'block'; };
    }
  }

  setUserName();