import usedCars from "./usedCars.js";

const carGridContainer = document.getElementById("car-grid-container");

// Function that creates all individual car cards that the user see's
function createCarCards() {
  usedCars.forEach((car) => {
    //creates a div element/container for each car
    const carDiv = document.createElement("div");
    carDiv.className = "car-card";
    carDiv.setAttribute("id", `${car.model}`);
    carDiv.innerHTML = `
    <img src="${car.image}" alt="${car.make} ${car.model}"/>
    <br>
    <h1>${car.year} ${car.make} ${car.model}</h1>
    <h2>$${car.price}</h2>
    <br>
    <hr>
    <h3><u>Info</u></h3>
    <p><b>Color:</b> ${car.color}</p>
    <p><b>Mileage:</b> ${car.mileage}</p>
    <p><b>Gas Mileage:</b> ${car.gasMileage}</p>
    <br>
    `;
    carGridContainer.appendChild(carDiv);
  });
} //end of createCards()

// Call to the createCarCads function to populate the page with the cars available
createCarCards();

/*---------------Store radio button Choices Code Section---------------------*/

let choiceArr = []; //Stores the user's selected filtering options
const radioButtons = document.querySelectorAll('input[type="radio"]'); //List of all radio buttons
console.log(radioButtons);

//Function to store the values of the selected radio buttons and stores them in the array
function storeChoices() {
  choiceArr.length = 0; //Resets the array
  radioButtons.forEach((button) => {
    if (button.checked) {
      choiceArr.push(button.value);
    }
  });
  console.log(choiceArr);
} //end storeChoices()

//Adding an eventlistener to every radio button
radioButtons.forEach((button) => {
  button.addEventListener("click", storeChoices);
});

/*---------------Filter Cars Code Section------------------------------------*/

const applyBtn = document.getElementById("apply-button");
const carDiv = document.querySelectorAll(".car-card"); //List of all the car-card divs
const resetBtn = document.getElementById("reset-button");

//Function to filter the cars based on the values in the array that includes the checkboxes that are checked
function filterCars() {
  /*
  1) Iterate through each car div (card)
  2) First check if the array is empty, if it is, then no radio buttons were selected, therefore show all cars (cards)
  3) Else, check to see if every word in the array is contained in each car card, if it is, then only display the card(s) 
      that contains every word from the array
  4) If the car card doesn't contain every word, then don't show that card

   */
  carDiv.forEach((card) => {
    if (choiceArr.length === 0) {
      card.style.display = "flex";
    } else {
      if (choiceArr.every((word) => card.innerText.includes(word))) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });
} //end filterCars()

//Function to reset all filtering choices when the user clicks the reset-filter button
function resetFilter() {
  radioButtons.forEach((button) => {
    button.checked = false;
  });
  choiceArr.length = 0;
  carDiv.forEach((card) => {
    card.style.display = "flex";
  });
} //end resetFilter()

//Adds event listener to the apply and reset filter buttons
applyBtn.addEventListener("click", filterCars);
resetBtn.addEventListener("click", resetFilter);
