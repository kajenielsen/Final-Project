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

// DRAGGABLE GUINEA PIGS

export function InitializeFarmPage() {
    document.addEventListener('DOMContentLoaded', function () {
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

                // Adjust the position based on the offset of the mouse click based on ID
                let offsetX = 0;
                let offsetY = 0;
        
                if (draggedElement.id === 'pigA') { /* Different pigs need different offsets due to different crop sizings */
                    offsetX = draggedElement.clientWidth / 2;
                    offsetY = draggedElement.clientHeight *1.5;
                } else if (draggedElement.id === 'pigB') {
                    offsetX = draggedElement.clientWidth / 2;
                    offsetY = draggedElement.clientHeight * 1.5;
                } else if (draggedElement.id === 'pigC') {
                    offsetX = draggedElement.clientWidth / 2;
                    offsetY = draggedElement.clientHeight * 1.5;
                } else if (draggedElement.id === 'pigD') {
                    offsetX = draggedElement.clientWidth / 2;
                    offsetY = draggedElement.clientHeight * 1.5;
                } else if (draggedElement.id === 'pigE') {
                    offsetX = draggedElement.clientWidth / 2;
                    offsetY = draggedElement.clientHeight * 1.5;
                }

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

        // Attach event listeners to each piggie
        const piggies = document.querySelectorAll('.piggie');
        piggies.forEach(function (piggie) {
            piggie.addEventListener('dragstart', handleDragStart);
        });

        // Attach event listeners to the drag container
        dragContainer.addEventListener('dragover', handleDragOver);
        dragContainer.addEventListener('dragleave', handleDragLeave);
        dragContainer.addEventListener('drop', handleDrop);
    });
}
