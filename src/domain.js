import { SaveData, LoadData, getRandomWord, ModifyGold, GetGoldAmmount, CreateNewPig, piggies, ModifyWater, GetWaterAmmount, ModifyFood, GetFoodAmmount } from "./svc.js";
import { ColorBoxes, UpdateGoldDisplay, UpdateFoodStats, UpdateWaterStats, UpdateRarityList, DynamicallyRenderPiggies, InitializeFarmPage, UpdateWinningsHeader } from "./ui.js"

var secretWord = null;

export async function InitializeMenuDomainElements() { // Wasn't sure what to name this.
    document.addEventListener('DOMContentLoaded', function () {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        if (username === null && password === null) {
            return;
        }
        LoadData()
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

        
        console.log(`Domain has username and password as ${username} and ${password}, and gold as ${GetGoldAmmount()}`);
        // Wordle and Farm link click events
        document.querySelector('.wordlebutton').addEventListener('click', async function () {
            if (username !== null && password !== null) {
                event.preventDefault();
                try {
                    const data = await SaveData();
                    // Code to execute on SaveData success
                    console.log("SaveData successful:", data);
                    redirectToPage(`wordle.html?username=${username}&password=${password}`);
                    console.log("Redirecting...");
                } catch (error) {
                    // Code to execute on SaveData error
                    console.error("SaveData error:", error);
                    // Handle the error or stop execution
                }
            }
            else {
                event.preventDefault();
                redirectToPage('menu.html');
                window.alert("You must log in to access Wordle.");
            }
        });
        document.querySelector('.farmbutton').addEventListener('click', function () {
            if (username !== null && password !== null) {
                event.preventDefault();
                SaveData();
                redirectToPage(`farm.html?username=${username}&password=${password}`);
                console.log("Redirecting...");
            }
            else {
                event.preventDefault();
                redirectToPage('menu.html');
                window.alert("You must log in to access Farm.");
            }
        });
    });
}

export async function InitializeWordleDomainElements() {
    secretWord = getRandomWord();
    secretWord = secretWord.toUpperCase();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const username = urlSearchParams.get('username');
    const password = urlSearchParams.get('password');
    LoadData()
        .then(userData => {
            // Code to execute on success
            console.log("LoadData successful:", userData);
            let gold = GetGoldAmmount();
            ModifyGold("set", gold);
            console.log("Gold: ", gold);
            UpdateWinningsHeader();
        })
        .catch(error => {
            // Code to execute on error
            console.error("LoadData error:", error);
            // Handle the error or stop execution
        });
    document.querySelector('.returntohome').addEventListener('click', async function () {
        event.preventDefault();
        try {
            const data = await SaveData();
            // Code to execute on SaveData success
            console.log("SaveData successful:", data);
            redirectToPage(`menu.html?username=${username}&password=${password}`);
            console.log("Redirecting...");
        } catch (error) {
            // Code to execute on SaveData error
            console.error("SaveData error:", error);
            // Handle the error or stop execution
        }
    });

    await LoadData(username);
}

export async function InitializeFarmDomainElements() {
    LoadData()
        .then(userData => {
            // Code to execute on success
            console.log("LoadData successful:", userData);
            let gold = GetGoldAmmount();
            ModifyGold("set", gold);
            console.log("Gold: ", gold);
            // Dynamically Render the Piggies
            console.log("Domain is initializing farm page");
            InitializeFarmPage();
            UpdateGoldDisplay();
            //Set Food and Water Data
            UpdateFoodStats();
            UpdateWaterStats();
            UpdateRarityList();
        })
        .catch(error => {
            // Code to execute on error
            console.error("LoadData error:", error);
            // Handle the error or stop execution
        });
    document.querySelector('.returntohome').addEventListener('click', async function () {
        event.preventDefault();
        try {
            const data = await SaveData();
        } catch (error) {
            // Code to execute on SaveData error
            console.error("SaveData error:", error);
            // Handle the error or stop execution
        }
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        redirectToPage(`menu.html?username=${username}&password=${password}`);
        console.log("Redirecting...");
    }); // Buying Guinea Pigs
    document.getElementById("BuyPiggie").addEventListener('click', function () {
        const gold = GetGoldAmmount();
        if (gold < 1500 || SafeToBuyPiggie() === false) {
            if (SafeToBuyPiggie() === false) {
                window.alert("There will not be sufficient food and water to care for a new piggie. Cannot purchase.");
            }
            else {
                window.alert("Insufficient funds to buy piggie");
            }
        }
        else {
            // Create the form
            const form = document.createElement('form');
            form.innerHTML = `
            <label for="guineaPigName">Enter Guinea Pig Name:</label>
            <input type="text" id="guineaPigName" required>
            <button type="submit">Buy Guinea Pig</button>
            <button type="reset">Cancel</button>
        `;

            // Add form styles if needed
            form.style.border = '1px solid #ccc';
            form.style.padding = '10px';

            // Append the form to the document
            const buyPiggieBody = document.getElementById("newpiggieinfo");
            buyPiggieBody.appendChild(form);

            // Handle form submission
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const guineaPigName = document.getElementById('guineaPigName').value;

                if (guineaPigName) { // HERE IS WHAT TO DO IF A PIG IS PURCHASED
                    // User entered a name, you can handle the purchase logic here
                    window.alert(`You bought a guinea pig named ${guineaPigName}!`);
                    ModifyGold("sub", 1500);
                    UpdateGoldDisplay();
                    // Remove the form from the document
                    buyPiggieBody.removeChild(form);
                    CreateNewPig(guineaPigName, false);
                    UpdateRarityList();
                    try {
                        const data = await SaveData();
                    } catch (error) {
                        // Code to execute on SaveData error
                        console.error("SaveData error:", error);
                        // Handle the error or stop execution
                    }
                    location.reload();
                    console.log(piggies);
                } else {
                    window.alert("Please enter a name for your guinea pig.");
                }
            });
            form.addEventListener('reset', function (event) {
                event.preventDefault();
                buyPiggieBody.removeChild(form);
            });
        }
    }) // Buying Rare Piggie
    document.getElementById("BuyRarePiggie").addEventListener('click', function () {
        const gold = GetGoldAmmount();
        if (gold < 2000 || SafeToBuyPiggie() === false) {
            if (SafeToBuyPiggie() === false) {
                window.alert("There will not be sufficient food and water to care for a new piggie. Cannot purchase.");
            }
            else {
                window.alert("Insufficient funds to buy piggie");
            }
        }
        else {
            // Create the form
            const form = document.createElement('form');
            form.innerHTML = `
            <label for="guineaPigName">Enter Guinea Pig Name:</label>
            <input type="text" id="guineaPigName" required>
            <button type="submit">Buy Guinea Pig</button>
            <button type="reset">Cancel</button>
        `;

            // Add form styles if needed
            form.style.border = '1px solid #ccc';
            form.style.padding = '10px';

            // Append the form to the document
            const buyPiggieBody = document.getElementById("newrarepiggieinfo");
            buyPiggieBody.appendChild(form);

            // Handle form submission
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const guineaPigName = document.getElementById('guineaPigName').value;

                if (guineaPigName) { // HERE IS WHAT TO DO IF A PIG IS PURCHASED
                    // User entered a name, you can handle the purchase logic here
                    window.alert(`You bought a guinea pig named ${guineaPigName}!`);
                    ModifyGold("sub", 2000);
                    UpdateGoldDisplay();
                    // Remove the form from the document
                    buyPiggieBody.removeChild(form);
                    CreateNewPig(guineaPigName, true);
                    UpdateRarityList();
                    try {
                        const data = await SaveData();
                    } catch (error) {
                        // Code to execute on SaveData error
                        console.error("SaveData error:", error);
                        // Handle the error or stop execution
                    }
                    location.reload();
                    console.log(piggies);
                } else {
                    window.alert("Please enter a name for your guinea pig.");
                }
            });
            form.addEventListener('reset', function (event) {
                event.preventDefault();
                buyPiggieBody.removeChild(form);
            });
        }
    }) // Buying Water
    document.getElementById("BuyWater").addEventListener('click', function () {
        event.preventDefault();
        const gold = GetGoldAmmount();
        if (gold < 100) {
            window.alert("Insufficient funds to buy water bottle");
        }
        else {
            console.log("Bought water");
            ModifyWater("add", 1);
            ModifyGold("sub", 100);
            UpdateGoldDisplay();
            UpdateWaterStats();
            window.alert(`Purchased a water bottle! Now you have ${GetWaterAmmount()}`);
        }
    }) // Buying Food
    document.getElementById("BuyFood").addEventListener('click', function () {
        event.preventDefault();
        const gold = GetGoldAmmount();
        if (gold < 500) {
            window.alert("Insufficient funds to buy magic food bowl");
        }
        else {
            console.log("Bought food");
            ModifyFood("add", 1);
            ModifyGold("sub", 500);
            UpdateGoldDisplay();
            UpdateFoodStats();
            window.alert(`Purchased a magic food bowl! Now you have ${GetFoodAmmount()}`);
        }
    })
}

function redirectToPage(url) {
    window.location.href = url;
}

export function CurrentWordleRow(boxClicked) {
    const classes = boxClicked.className.split(' ');

    for (const className of classes) {
        if (className.startsWith('box')) {
            const rowNumber = parseInt(className.slice(3), 10);
            return rowNumber;
        }
    }

    // If the class doesn't match any expected pattern, return null or handle it as needed
    return null;
}

export async function CheckWord(rowofBoxes, currentGuess) { // Checks to see if the right word was chosen
    const letters = Array.from(rowofBoxes).map(box => (box.textContent || '').trim());
    const guessedWord = letters.join('');
    const secretLetters = Array.from(secretWord);

    // console.log("Letters: ", letters); // Console logs for debugging. Delete later.
    // console.log("Guessed Word: ", guessedWord);
    // console.log("Secret Letters: ", secretLetters);
    // console.log("Secret Word: ", secretWord);
    // console.log("Row of Boxes: ", rowofBoxes);

    if (guessedWord === secretWord) { // The word is correct
        // Initiate Victory Sequence. Implement Later.
        console.log("You won!");
        var boxColors = ['green', 'green', 'green', 'green', 'green'];
        ColorBoxes(rowofBoxes, boxColors);

        // Hide the guess button
        const guessButton = document.querySelector('.GuessButton');
        guessButton.style.display = 'none';
        guessButton.disabled = true;
        const goldWon = CalculateGoldWon(currentGuess);
        ModifyGold("add", goldWon);

        setTimeout(async function () { // This is to give the boxes time to color before the window alert.

            window.alert(`Congratulations! You won ${goldWon} gold!`);
            try {
                const data = await SaveData();
            } catch (error) {
                // Code to execute on SaveData error
                console.error("SaveData error:", error);
                // Handle the error or stop execution
            }
            const urlSearchParams = new URLSearchParams(window.location.search);
            const username = urlSearchParams.get('username');
            const password = urlSearchParams.get('password');
            redirectToPage(`menu.html?username=${username}&password=${password}`);
            console.log("Redirecting...");
            // Maybe you can pretty this up with sweet alert later.
        }, 300);


        return false;
        // Delete guess box
    }
    else { // The word is incorrect, so color it.
        var boxColors = [];
        for (let i = 0; i < guessedWord.length; i++) {
            const guessedLetter = guessedWord[i];
            const secretLetter = secretLetters[i];

            if (guessedLetter === secretLetter) {
                boxColors.push('green');
            } else if (secretLetters.includes(guessedLetter)) {
                boxColors.push('yellow');
            } else {
                boxColors.push('red');
            }
        }
        console.log("Box colors: ", boxColors);
        ColorBoxes(rowofBoxes, boxColors); // Implement
        return true;
    }
}

function CalculateGoldWon(currentGuess) {
    const _baseWinnings = BaseWordleWinnings();
    console.log(`CalculateGoldWon has currentGuess as ${currentGuess}`);

    switch (currentGuess) {
        case 1:
            return _baseWinnings * 7;
            break;
        case 2:
            return _baseWinnings * 4;
            break;
        case 3:
            return _baseWinnings * 3
            break;
        case 4:
            return _baseWinnings * 2;
            break;
        case 5:
            return _baseWinnings;
            break;
        default:
            return 100;
            break;
    }
}

// Generate a random integer between min (inclusive) and max (exclusive)
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Determines if it is safe to buy a new piggie based on the food and water available
function SafeToBuyPiggie() {
    const dailyWaterConsumption = piggies.length * 5;
    const dailyWaterAvailable = GetWaterAmmount() * 20;
    const dailyFoodConsumption = piggies.length * 5;
    const dailyFoodAvailable = GetFoodAmmount() * 10;

    if (dailyWaterConsumption + 5 > dailyWaterAvailable || dailyFoodConsumption + 5 > dailyFoodAvailable) {
        return false;
    }
    else {
        return true;
    }
}

export function DetermineRarestPiggies() {
    const sortedPiggies = piggies.sort((a, b) => b.rarity - a.rarity);

    const rarestPiggies = [];
    for (let i = 0; i < 3; i++) {
        if (sortedPiggies[i]) {
            // If there is a piggy at this position, add its name to the array
            rarestPiggies.push(sortedPiggies[i].name);
        } else {
            // If no piggy at this position, add an empty string
            rarestPiggies.push("");
        }
    }

    return rarestPiggies;
}

export function BaseWordleWinnings() { // BALANCE GAME DIFFICULTY HERE
    const _pigQuantity = piggies.length;

    // Find the rarest value
    let highestRarityValue = 0;
    if (_pigQuantity > 0) {
        // Find the piggie with the highest rarity
        const highestRarityPiggie = piggies.reduce((prev, current) => {
            return (prev.rarity > current.rarity) ? prev : current;
        });

        // Get the rarity value of the rarest piggie
        highestRarityValue = highestRarityPiggie.rarity;

        // Now, 'highestRarityValue' contains the rarity value of the rarest piggie
        console.log("Rarest piggie rarity value:", highestRarityValue);

    } else {
        highestRarityValue = 0;
    }

    let baseWordleWinnings = 100;
    baseWordleWinnings += _pigQuantity * 10;
    const multiplier = 1 + (highestRarityValue / 10);
    baseWordleWinnings *= multiplier;

    // Round baseWordleWinnings to the nearest integer
    baseWordleWinnings = Math.round(baseWordleWinnings);

    return baseWordleWinnings;
}

// When you win a Wordle game, this stat will multiply by the number of remaining guesses you had to determine how much you won. This stat is determined by the quanitity, and rarity of your owned guinea pigs.

