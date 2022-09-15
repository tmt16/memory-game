const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter]; //random index position's value
    array[counter] = array[index]; //take the array at the random index and swap it for the value at the index position of the loop
    array[index] = temp; //target the index position in the loop passing and put them temp in that
  }

  return array;
}

let shuffledColors = shuffle(COLORS); //return to shuffle method on the result
let firstColor = null;
let secondColor = null;
let firstCard = null;
let secondCard = null;
let hasFlippedCard = false;
let enableClick = true;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
      // console.log("you just clicked", event);

      if (!enableClick) {
        return;
      }

      const cardColor = event.target.className; // grab className from 
      event.target.style.backgroundColor = cardColor;  // change background color of cards

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
      } 
      else {
        hasFlippedCard = false;
        secondCard = this;
      }

      if (firstCard === secondCard) {
        hasFlippedCard = true;
        secondCard = null;
        return;
      }

      console.log(firstCard, secondCard)

      if (firstCard !== null && secondCard !== null) {
        enableClick = false;
      }


      if (firstColor === null) {
        firstColor = cardColor;
        firstCard = event.target;
      } else if (secondColor === null){
        secondColor = cardColor;
        secondCard = event.target;
      }

      if (firstCard !== null && secondCard !== null) {

        if (firstColor !== secondColor) {
          setTimeout(function () {
            turnOffColor(firstCard);
            turnOffColor(secondCard);
            firstColor = null;
            secondColor = null;
            firstCard = null;
            secondCard = null;
            enableClick = true;
          }, 2000);
      }

        if (firstColor === secondColor && firstCard !== secondCard) {
          firstColor = null;
          secondColor = null;
          firstCard = null;
          secondCard = null;
          enableClick = true;
      }
      } 

}

function turnOffColor(divElement) {
      divElement.style.backgroundColor = "black";
}


// when the DOM loads
createDivsForColors(shuffledColors);

