import { getRandomWord } from "./svc.js";

// For description that toggles on Wordle Page
export function toggleHowToPlay() {
    console.log("Button Clicked");
    var content = document.getElementById('howToPlayContent');
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}

export function InitializeWordlePage() {
    // For Wordle rules toggler
    var descriptionToggler = document.getElementById('showDescriptionButton');
    descriptionToggler.addEventListener('click', toggleHowToPlay);
    toggleHowToPlay(); // Hides on page load
    const randomWord = getRandomWord(); // DELETE LATER OR PEOPLE CAN CHEAT
    console.log('Random Word: ', randomWord);
}