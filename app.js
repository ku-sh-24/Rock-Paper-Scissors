const compChoiceDisp = document.getElementById('Computer-Choice');
const userChoiceDisp = document.getElementById('User-choice'); // so this will 
const resultDisp = document.getElementById('result');
const possChoices = document.querySelectorAll('button'); // this will give us all the possible buttons
let userChoice;
let computerChoice;
let result;
const disableTime = 3000; 
// we want to get all the possible choices
// using query selector: The Document method querySelectorAll() returns a static (not live) NodeList 
// representing a list of the document's elements that match the specified group of selectors.

const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 3,
  decay: 0.96,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function disableButton(callback) {
  possChoices.forEach(possChoice => possChoice.disabled = true);
  if (callback) callback();
}

// Function to enable buttons
function enableButtons() {
  possChoices.forEach(possChoice => possChoice.disabled = false);
}

function resetChoices() {
  userChoice = '';
  computerChoice = '';
  result = '';
  userChoiceDisp.textContent = '';
  compChoiceDisp.textContent = '';
  resultDisp.textContent = '';
}

possChoices.forEach(possChoice => possChoice.addEventListener('click',(e) => {
  userChoice = e.target.id; // whatever button i clicked i will get that id and save it globally
  // userChoiceDisp.innerHTML = userChoice; // innerHTML is not a safe method, it changes the html doc itself
  userChoiceDisp.textContent = userChoice;
  getComputerChoice();
  getResult();
  disableButton(()=>{
    setTimeout(() => {
      resetChoices();
      enableButtons();
    }, disableTime);
  });
}))

function getComputerChoice() {
  // to get a random number
  // i made an error here by adding +1 after the semicolon
  randomNumber = Math.floor(Math.random() * possChoices.length);
  // Math.random() returns a number between 0 and 1
  // When you multiply Math.random() by the length of your array (possChoices.length)
  // you're scaling the random number from the [0, 1) range to a [0, possChoices.length) range.
  
  const choices = ['Rock', 'Scissors', 'Paper'];
  computerChoice = choices[randomNumber];
  compChoiceDisp.textContent = computerChoice;
}

function getResult(){
  if(userChoice === computerChoice){
    // console.log('DRAW');
    result = "It's a Draw!";
    resultDisp.style.color = 'blue';
  }
  else if(userChoice === 'Rock' && computerChoice === "Scissors" || (userChoice === 'Paper' && computerChoice === "Rock")
    || (userChoice === 'Scissors' && computerChoice === "Paper")
  )
  {
    // console.log('i mean you win!');
    result = "You Win!";
    shoot();
    resultDisp.style.color = 'green';
  }
  else{
    result="You Lose!";
    resultDisp.style.color = 'red';
  }
  resultDisp.textContent = result;
}

function shoot() {
  confetti({
    ...defaults,
    particleCount: 300,
    scalar: 1.2,
    spread: 90,
    shapes: ["star"],
    origin: { x: 0, y: 0.9 }
  });

  confetti({
    ...defaults,
    particleCount: 300,
    scalar: 1.2,
    spread:90,
    shapes: ["star"],
    origin: { x: 1, y: 0.9 }
  });
}