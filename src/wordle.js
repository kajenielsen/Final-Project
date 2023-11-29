import { InitializeWordlePage, toggleHowToPlay } from "./ui.js";
import {getRandomWord} from "./svc.js"
import {InitializeWordleDomainElements} from "./domain.js"
console.log("Using script"); // Making sure the path is correct
InitializeWordlePage();
InitializeWordleDomainElements();

// Picking Random Word

let secretWord = getRandomWord();
secretWord = secretWord.toUpperCase();
console.log("Word: ", secretWord); // DELETE LATER

// These are for adding more words to your list locally when needed. It formats them correctly for the array.
// function formatWordsArray(words) {
//     const formattedArray = words.split('\n').map(word => `"${word.trim()}"`).join(', ');
//     console.log(formattedArray);
// }

// const wordsList = `

// `;

// formatWordsArray(wordsList);

