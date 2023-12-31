import { CurrentWordleRow, CheckWord, DetermineRarestPiggies, BaseWordleWinnings } from "./domain.js";
import { GetGoldAmmount, getRandomWord, GetWaterAmmount, GetFoodAmmount, GuineaPig, piggies, GetPassword, LoadData} from "./svc.js";

// For description that toggles on Wordle Page
export function toggleHowToPlay() {
    console.log("Button Clicked");
    var content = document.getElementById('howToPlayContent');
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}

export function InitializeWordlePage() {
    var playing = true;
    // For Wordle rules toggler
    var descriptionToggler = document.getElementById('showDescriptionButton');
    descriptionToggler.addEventListener('click', toggleHowToPlay);
    toggleHowToPlay(); // Hides on page load

    // Dynamic Header

    WishGoodLuckToUser();

    // DIGITAL TYPING FUNCTIONALITY

    document.addEventListener('DOMContentLoaded', function () {
        var currentGuess = 1;
        // Get all the Wordle grid box elements
        const boxElements = document.querySelectorAll('#wordbox');

        // Get all the keyboard key elements
        const keyElements = document.querySelectorAll('.wordlekey');

        const guessButton = document.querySelector('.GuessButton');

        // Variable to keep track of the selected box
        let selectedBox = null;

        let selectedBoxIndex = 0;

        // Function to handle box selection
        const handleBoxSelection = function (event) {
            if (playing) {
                const boxClicked = event.target
                const selectedRow = CurrentWordleRow(boxClicked); // Logic to find current row
                console.log("Row selected: ", selectedRow);

                if (selectedRow === currentGuess) {

                    // Remove the "selected" class from all boxes for safety
                    boxElements.forEach(function (box) {
                        box.classList.remove('selected');
                    })

                    // Add the "selected" class to the clicked box
                    event.target.classList.add('selected');

                    // Update the selectedBox variable
                    // selectedBox = event.target;

                    selectedBoxIndex = Array.from(boxElements).indexOf(event.target);
                    console.log("Box Index: ", selectedBoxIndex)
                }
            }
        };

        // Function to handle keyboard key click
        const handleKeyClick = function (event) {
            if (playing) {
                // Check if a box is selected
                if (selectedBoxIndex !== null) {
                    // Set the inner text of the selected box to the clicked key
                    boxElements[selectedBoxIndex].textContent = event.target.textContent;

                    // This big if statement is to make sure it doesn't loop back around at the end of a row.
                    if (selectedBoxIndex !== 20 && selectedBoxIndex !== 21 && selectedBoxIndex !== 22 && selectedBoxIndex !== 23 && selectedBoxIndex !== 24) {
                        // Move to the next box to the right
                        selectedBoxIndex = (selectedBoxIndex + 5) % boxElements.length;

                        // Remove the old ones first
                        boxElements.forEach(function (box) {
                            box.classList.remove('selected');
                        })

                        // Add the "selected" class to the new selected box
                        boxElements[selectedBoxIndex].classList.add('selected');
                    }
                    console.log("Box Index: ", selectedBoxIndex)
                }
            }
        };

        const selectFirstBoxInRow = (row) => { // Does what the name suggests
            const boxElements = document.querySelectorAll(`.box${row}`);
            const allBoxElements = document.querySelectorAll('.box');

            // Remove the "selected" class from all boxes for safety
            allBoxElements.forEach(function (box) {
                box.classList.remove('selected');
            });

            // Add the "selected" class to the first box in the row
            boxElements[0].classList.add('selected');

            // A switch statement to set the next box index
            // selectedBoxIndex -=19;
            switch (row) {
                case 1:
                    selectedBoxIndex = 0;
                    break;
                case 2:
                    selectedBoxIndex = 1;
                    break;
                case 3:
                    selectedBoxIndex = 2;
                    break;
                case 4:
                    selectedBoxIndex = 3;
                    break;
                case 5:
                    selectedBoxIndex = 4;
                    break;

            }
        };

        const HandleGuessClick = function (event) {
            event.preventDefault();
            const whiteBox = document.querySelector('.selected');
            const currentRow = CurrentWordleRow(whiteBox);
            console.log(`The box is in row ${currentRow}`);
            const rowofBoxes = document.querySelectorAll(`.box${currentRow}`);
            console.log("rowofBoxes: ", rowofBoxes);
            playing = CheckWord(rowofBoxes, currentGuess);

            if (playing) {

                // Select the first box in the next row
                if (currentGuess >= 5) {
                    console.log("You lost");
                    window.alert("Sorry, out of guesses. Refresh the page to try again, or return to the menu with the button at the top left.");
                    playing = false; // Disable typing more
                }
                else {
                    currentGuess += 1;
                    selectFirstBoxInRow(currentGuess);
                }
            }
        };

        // Event listeners for keyboard stuff to work

        boxElements.forEach(function (box) {
            box.addEventListener('click', handleBoxSelection);
        });

        keyElements.forEach(function (key) {
            key.addEventListener('click', handleKeyClick);
        })

        // Guess button event listener

        guessButton.addEventListener('click', HandleGuessClick)
    })
}

// DRAGGABLE GUINEA PIGS

export function InitializeFarmPage() {
    // document.addEventListener('DOMContentLoaded', function () {
    console.log("UI For Farm Loaded");

    DynamicallyRenderPiggies();

    // Dynamic Owner Banner
    SetOwnerBanner();

    // Set the winnings stat
    UpdateWinningsStat();

    // Grabbing Drag Container Element
    const dragContainer = document.getElementById('dragContainer');

    // Additional variable to keep track of the dragged element
    let draggedElement = null;

    // Event listeners for drag and drop
    const handleDragStart = function (e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        draggedElement = e.target;
    };

    const handleDragOver = function (e) {
        e.preventDefault();
        dragContainer.classList.add('dragOver');
    };

    const handleDragLeave = function () {
        dragContainer.classList.remove('dragOver');
    };

    const handleDrop = function (e) {
        e.preventDefault();
        if (draggedElement) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate the offset dynamically based on the pig's size
            const offsetX = draggedElement.clientWidth / 2;
            const offsetY = draggedElement.clientHeight * 2;

            // // Adjust the position based on the offset of the mouse click based on ID // Giving me issues
            // let offsetX = 0;
            // let offsetY = 0;
            // if (draggedElement.id === 'pigA') { /* Different pigs need different offsets due to different crop sizings */
            //     offsetX = draggedElement.clientWidth - 50;
            //     offsetY = draggedElement.clientHeight + 100;
            // } else if (draggedElement.id === 'pigB') {
            //     offsetX = draggedElement.clientWidth - 50;
            //     offsetY = draggedElement.clientHeight + 100;
            // } else if (draggedElement.id === 'pigC') {
            //     offsetX = draggedElement.clientWidth - 50;
            //     offsetY = draggedElement.clientHeight + 100;
            // } else if (draggedElement.id === 'pigD') {
            //     offsetX = draggedElement.clientWidth - 50;
            //     offsetY = draggedElement.clientHeight + 100;
            // } else if (draggedElement.id === 'pigE') {
            //     offsetX = draggedElement.clientWidth - 50;
            //     offsetY = draggedElement.clientHeight + 100;
            // }

            // Dropped in specified spot
            draggedElement.style.position = 'absolute';
            draggedElement.style.left = `${mouseX - offsetX}px`;
            draggedElement.style.top = `${mouseY - offsetY}px`;

            // Explicitly set width and height to maintain consistency
            draggedElement.style.width = `${draggedElement.clientWidth}px`;
            draggedElement.style.height = `${draggedElement.clientHeight}px`;

            draggedElement = null;

            dragContainer.classList.remove('dragOver');
        }
    };

    const handlePigClicked = function (e) { // piggie CLICKED functionality
        e.preventDefault();
        // Change the Piggie Stats based on the pig clicked
        const clickedPigId = e.target.parentNode.id;
        console.log("Clicked Pig Id: ", clickedPigId);

        // Convert NodeList to array using Array.from
        const piggieArray = piggies;
        console.log("piggiesArray contains: ", piggieArray);
        console.log("piggies contains: ", piggies);

        // Alternatively, you can use the spread operator:
        // const piggiesArray = [...piggies];

        const parsedClickedPigId = parseInt(clickedPigId.match(/\d+/)[0], 10);

        // Access the clicked pig directly
        const clickedPig = piggieArray[parsedClickedPigId];
        console.log("Clicked pig: ", clickedPig);
        UpdatePigStats(clickedPig);
    }

    // Attach event listeners to each piggie
    const piggiesElements = document.querySelectorAll('.piggie');
    piggiesElements.forEach(function (piggie) {
        piggie.addEventListener('dragstart', handleDragStart);
        piggie.addEventListener('click', handlePigClicked);
    });

    // Attach event listeners to the drag container
    dragContainer.addEventListener('dragover', handleDragOver);
    dragContainer.addEventListener('dragleave', handleDragLeave);
    dragContainer.addEventListener('drop', handleDrop);
    // });
}
// // Puts the pigs in random positions
// export function RandomizePigPositions(container) {
//     document.addEventListener('DOMContentLoaded', function () {
//         const piggies = container.querySelectorAll('.piggie');
//         console.log(piggies);
//         piggies.forEach(function (piggie) {
//             // Calculate random positions within the container
//             const minContainerSize = piggie.clientWidth; // Minimum container size to ensure variation
//             const randomX = Math.floor(Math.random() * (container.clientWidth - minContainerSize));
//             const randomY = Math.floor(Math.random() * (container.clientHeight - piggie.clientHeight));

//             // Set the position
//             piggie.style.position = 'absolute'; // Add this line
//             piggie.style.left = `${randomX}px`;
//             piggie.style.top = `${randomY}px`;

//             // Explicitly set width and height to maintain consistency
//             // piggie.style.width = `${piggie.clientWidth}px`;
//             // piggie.style.height = `${piggie.clientHeight}px`; // This might have been causing issues
//         });
//     });
// }
// Fixed positions version
export function RandomizePigPositions(container) {
    document.addEventListener('DOMContentLoaded', function () {
        const piggies = container.querySelectorAll('.piggie');

        // Specify the number of rows and columns in the grid
        const numRows = 3;
        const numCols = 3;

        // Calculate the width and height of each grid cell
        const cellWidth = container.clientWidth / numCols;
        const cellHeight = container.clientHeight / numRows;

        // Loop through the piggies and position them in the grid
        let currentRow = 0;
        let currentCol = 0;

        piggies.forEach(function (piggie) {
            // Calculate the position of the pig in the grid
            const x = currentCol * cellWidth;
            const y = currentRow * cellHeight;

            // Set the position
            piggie.style.position = 'absolute';
            piggie.style.left = `${x}px`;
            piggie.style.top = `${y}px`;

            // Move to the next column
            currentCol++;

            // Move to the next row if the current row is filled
            if (currentCol === numCols) {
                currentCol = 0;
                currentRow++;
            }

            // Explicitly set width and height to maintain consistency
            piggie.style.width = `${piggie.clientWidth}px`;
            piggie.style.height = `${piggie.clientHeight}px`;
        });
    });
}

// Menu Box Popup

export function ToggleLoginBox() {
    document.addEventListener('DOMContentLoaded', async function () {
        const loginBoxContainer = document.getElementById('popup-container');
        const logoutButtonContainer = document.getElementById('logout-button-container');
        const WelcomeContainer = document.getElementById('UserWelcome');
        console.log("Welcome Container:", WelcomeContainer);
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        console.log("username: ", username);
        const password = urlSearchParams.get('password');
        console.log("password: ", password);
        var isLoggedIn;
        await LoadData()
            .then(userData => {
                // Code to execute on success
                console.log("LoadData successful:", userData);
                let gold = GetGoldAmmount();
                console.log("Gold: ", gold);
            })
            .catch(error => {
                // Code to execute on error
                console.error("LoadData error:", error);
                // Handle the error or stop execution
            });
        if (username === null || password === null) {
            isLoggedIn = false;
        }
        else {
            // Check if the entered password matches the stored password
            const storedPassword = GetPassword();
            isLoggedIn = storedPassword !== null && storedPassword === password;
            if (isLoggedIn === false) {
                window.alert("Password is incorrect");
            }
        }
        if (isLoggedIn) {
            logoutButtonContainer.style.display = 'block';
            loginBoxContainer.style.display = 'none';
            WelcomeContainer.textContent = `Welcome, ${username}!`;
        }
        else {
            logoutButtonContainer.style.display = 'none';
            loginBoxContainer.style.display = 'block';
            WelcomeContainer.textContent = "Welcome! Please Log in!"
        }
    });
}

function WishGoodLuckToUser() {
    const LuckContainer = document.getElementById('goodLuckBanner');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const username = urlSearchParams.get('username');
    LuckContainer.textContent = `Good luck, ${username}!`;
}

function SetOwnerBanner() {
    const LuckContainer = document.getElementById('ownerbanner');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const username = urlSearchParams.get('username');
    LuckContainer.textContent = `${username}'s`;
}

export function ColorBoxes(rowofBoxes, boxColors) { // Colors the Wordle boxes after a guess
    rowofBoxes.forEach((box, i) => {
        const color = boxColors[i];

        // Assuming you have predefined CSS classes for each color
        box.classList.remove('green', 'yellow', 'red');
        box.classList.add(color);
    });
}

export function UpdateGoldDisplay() {
    const goldDisplay = document.getElementById('GoldNum');
    const currentGold = GetGoldAmmount();
    goldDisplay.textContent = currentGold.toString();
}

export function UpdateFoodStats() {
    console.log("Piggie Array Length: ", piggies.length);
    console.log("Food bowls: ", GetFoodAmmount());
    const foodStatDisplay = document.getElementById('FoodStats');
    const dailyFoodConsumption = piggies.length * 5;
    const dailyFoodAvailable = GetFoodAmmount() * 10;
    const statData = `${dailyFoodAvailable} food units/${dailyFoodConsumption} food units`;
    foodStatDisplay.textContent = statData;
}

export function UpdateWaterStats() {
    const waterStatDisplay = document.getElementById('WaterStats');
    const dailyWaterConsumption = piggies.length * 5;
    const dailyWaterAvailable = GetWaterAmmount() * 20;
    const statData = `${dailyWaterAvailable} water units/${dailyWaterConsumption} water units`;
    waterStatDisplay.textContent = statData;
}

export function UpdateRarityList() {
    const rarestPiggieNames = DetermineRarestPiggies();
    const rareContainer = document.getElementById("Rare");
    const rarerContainer = document.getElementById("Rarer");
    const rarestContainer = document.getElementById("Rarest");
    rareContainer.textContent = rarestPiggieNames[2];
    rarerContainer.textContent = rarestPiggieNames[1];
    rarestContainer.textContent = rarestPiggieNames[0];
}

// Call AttachDragDropListeners after dynamically rendering piggies
export function DynamicallyRenderPiggies() {
    console.log("Dynamically Rendered Piggies");
    const piggieArray = piggies;
    const dragContainer = document.getElementById('dragContainer');

    // Clear the existing content in the dragContainer
    dragContainer.innerHTML = '';

    // Iterate through the piggies array and create elements for each piggie
    piggieArray.forEach((piggie, index) => {
        const piggieElement = CreatePiggieElement(piggie, index);
        dragContainer.appendChild(piggieElement);
    });

    // Attach event listeners to the dynamically created piggies
    // AttachDragDropListeners();
}

function CreatePiggieElement(piggie, arrayIndex) {
    const piggieElement = document.createElement('div');
    piggieElement.classList.add('piggie');
    piggieElement.setAttribute('draggable', 'true');
    piggieElement.id = `${piggie.name}${arrayIndex}`;

    const pigPicElement = document.createElement('img');
    pigPicElement.classList.add('pigPic');
    pigPicElement.src = piggie.image;
    pigPicElement.alt = piggie.name;

    // Dynamically set the id based on the piggie name
    const pigPicId = `pig${piggie.image.charAt(piggie.image.length - 5)}`;
    console.log("Pig Pic ID: ", pigPicId);
    pigPicElement.id = pigPicId;

    piggieElement.appendChild(pigPicElement);

    console.log("Piggie Element:", piggieElement);

    return piggieElement;
}

function AttachDragDropListeners() {
    const piggies = document.querySelectorAll('.piggie');
    piggies.forEach(function (piggie) {
        piggie.addEventListener('dragstart', handleDragStart);
    })
}

function UpdatePigStats(piggieSelected) {
    const nameStat = document.getElementById("NameStat");
    nameStat.textContent = piggieSelected.name;
    const rareStat = document.getElementById("RarityStat");
    rareStat.textContent = piggieSelected.rarity;
    const personalityStat = document.getElementById("PersonalityStat");
    personalityStat.textContent = piggieSelected.personality;
    const _foodStat = document.getElementById("PiggieEats");
    _foodStat.textContent = "5 food units daily";
    const _waterStat = document.getElementById("PiggieDrinks");
    _waterStat.textContent = "5 water units daily";
}

function UpdateWinningsStat() {
    const winningsContainer = document.getElementById("BaseWordleWins");
    const goldPerGame = BaseWordleWinnings();
    winningsContainer.textContent = `${goldPerGame} Gold`;
}

export function UpdateWinningsHeader() {
    const winningsContainer = document.getElementById("WinningsBase");
    const goldPerGame = BaseWordleWinnings();
    winningsContainer.textContent = `You will win: ${goldPerGame} Gold X Remaining Guesses`;
}

