import { SaveData, LoadData, getRandomWord } from "./svc.js";
import {ColorBoxes} from "./ui.js"

var secretWord = null;

export function InitializeMenuDomainElements() { // Wasn't sure what to name this.
    document.addEventListener('DOMContentLoaded', function () {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        console.log(`Domain has username and password as ${username} and ${password}.`);
        // Wordle and Farm link click events
        document.querySelector('.wordlebutton').addEventListener('click', function () {
            if (username !== null && password !== null) {
                event.preventDefault();
                redirectToPage(`wordle.html?username=${username}&password=${password}`);
                console.log("Redirecting...");
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
                redirectToPage(`farm.html?username=${username}&password=${password}`);
                console.log("Redirecting...");
            }
            else {
                event.preventDefault();
                redirectToPage('menu.html');
                window.alert("You must log in to access Farm.");
            }
        });
        SaveData();
    });
}

export function InitializeWordleDomainElements() {
    secretWord = getRandomWord();
    secretWord = secretWord.toUpperCase();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const username = urlSearchParams.get('username');
    const password = urlSearchParams.get('password');
    document.querySelector('.returntohome').addEventListener('click', function () {
        event.preventDefault();
        redirectToPage(`menu.html?username=${username}&password=${password}`);
        console.log("Redirecting...");
    });
    LoadData(username);
}

export function InitializeFarmDomainElements() {
    document.querySelector('.returntohome').addEventListener('click', function () {
        event.preventDefault();
        const urlSearchParams = new URLSearchParams(window.location.search);
        const username = urlSearchParams.get('username');
        const password = urlSearchParams.get('password');
        redirectToPage(`menu.html?username=${username}&password=${password}`);
        console.log("Redirecting...");
    });
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
    }
}