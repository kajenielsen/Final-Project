import { SaveData, LoadData, getRandomWord, ModifyGold, GetGoldAmmount, CreateNewPig, piggies, ModifyWater, GetWaterAmmount, ModifyFood, GetFoodAmmount } from "./svc.js";
import { ColorBoxes, UpdateGoldDisplay } from "./ui.js"

var secretWord = null;

export async function InitializeMenuDomainElements() { // Wasn't sure what to name this.
    document.addEventListener('DOMContentLoaded', function () {
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

        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
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
            UpdateGoldDisplay();
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
        if (gold < 1500) {
            window.alert("Insufficient funds to buy piggie");
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
            form.addEventListener('submit', function (event) {
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
        if (gold < 2000) {
            window.alert("Insufficient funds to buy piggie");
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
            form.addEventListener('submit', function (event) {
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

export function CheckWord(rowofBoxes) { // Checks to see if the right word was chosen
    const letters = Array.from(rowofBoxes).map(box => (box.textContent || '').trim());
    const guessedWord = letters.join('');
    const secretLetters = Array.from(secretWord);

    console.log("Letters: ", letters); // Console logs for debugging. Delete later.
    console.log("Guessed Word: ", guessedWord);
    console.log("Secret Letters: ", secretLetters);
    console.log("Secret Word: ", secretWord);

    if (guessedWord === secretWord) { // The word is correct
        // Initiate Victory Sequence. Implement Later.
        console.log("You won!");
        var boxColors = ['green', 'green', 'green', 'green', 'green'];
        ColorBoxes(rowofBoxes, boxColors);

        setTimeout(function () { // This is to give the boxes time to color before the window alert.
            const goldWon = CalculateGoldWon();
            ModifyGold("add", 100);
            window.alert(`Congratulations! You won ${goldWon} gold! Refresh to play again or return to menu with the button in the top left.`)
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

function CalculateGoldWon() {
    // Implement More Later
    return 100;
}

// Generate a random integer between min (inclusive) and max (exclusive)
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}