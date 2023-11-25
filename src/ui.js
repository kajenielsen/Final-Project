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

                // Calculate the offset dynamically based on the pig's size
                const offsetX = draggedElement.clientWidth / 2;
                const offsetY = draggedElement.clientHeight * 1.5;

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
