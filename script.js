const menuButton = document.querySelector('#menuButton');
const toggleMenu = document.querySelector('#toggleMenu');
const gridSizeInput = document.querySelector('#gridSizeInput');
const gridContainer = document.querySelector('#gridContainer');
const red = document.querySelector('#red');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');
const clearGridButton = document.querySelector('#clearGridButton');


// START OF THE GRID MODIFICATION

// Function to create a new grid with the specified number of rows and columns
function createCustomGrid(rows, columns) {
    // Calculate the size of each grid square based on the container size
    const containerSize = 625; // Container size in pixels
    const squareSize = containerSize / Math.max(rows, columns);

    // Create and append the new grid
    gridContainer.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        for (let j = 0; j < columns; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `${squareSize}px`; // Set square width
            square.style.height = `${squareSize}px`; // Set square height
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }

    // Set the grid template rows and columns based on the user's input
    gridContainer.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
}

// Event listener for grid size input
gridSizeInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the user's input for rows and columns
        const newSize = parseInt(gridSizeInput.value);
        if (!isNaN(newSize) && newSize >= 1 && newSize <= 100) {
            // Call a function to create a custom-sized grid
            createCustomGrid(newSize, newSize);
        } else {
            alert("Please enter a valid grid size between 1 and 100.");
        }
    }
});

// Initial grid creation with default size (16x16)
createCustomGrid(16, 16);







// START OF THE COLORING

// Variables to track drawing state and mode
let isDrawing = false;
let pencilMode = true; // Pencil mode by default
let currentColor = 'rgb(200, 200, 200)'; // Default color

// Function to handle mouse down event on the grid
gridContainer.addEventListener('mousedown', () => {
    isDrawing = true;
    if (pencilMode) {
        // Get the current color from the color range inputs
        currentColor = `rgb(${red.value},${green.value},${blue.value})`;
    }
});

// Function to handle mouse up event on the grid
gridContainer.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Function to handle mouse over event on the grid
gridContainer.addEventListener('mouseover', (e) => {
    if (isDrawing && e.target.classList.contains('square')) {
        if (pencilMode) {
            // Apply the current color when in pencil mode
            e.target.style.backgroundColor = currentColor;
        } else {
            // Erase by setting the background color to white when in eraser mode
            e.target.style.backgroundColor = 'transparent';
        }
    }
});

// Event listener for the pencil tool
document.getElementById("pencil").addEventListener("click", function () {
    pencilMode = true;
    // Set the cursor to the pencil SVG image
    gridContainer.style.cursor = `url('photos/pencil.PNG'), auto`;
});

// Event listener for the eraser tool
document.getElementById("eraser").addEventListener("click", function () {
    pencilMode = false;
    // Set the cursor to the eraser SVG image
    gridContainer.style.cursor = `url('photos/eraser.PNG'), auto`;
});

// Function to update the color based on the color range inputs
function updateColor() {
    const redValue = red.value;
    const greenValue = green.value;
    const blueValue = blue.value;

    // Update the current color in pencil mode
    if (pencilMode) {
        currentColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    }
}

// Event listeners for color range inputs
red.addEventListener("input", updateColor);
green.addEventListener("input", updateColor);
blue.addEventListener("input", updateColor);

// Initial update of the current color
updateColor();





// START OF THE TOGGLE MENU
let isClicked = false;

menuButton.addEventListener('click', () => {
    if (isClicked === false && toggleMenu.style.right === '-400px') {
        menuButton.style.transform = 'rotate(90deg)';
        toggleMenu.style.right = '0';
        toggleMenu.style.boxShadow = 
        '0 0 0 rgba(0, 0, 0), ' +
        '-10px 10px 40px rgba(0, 0, 0, 0.5), ' +
        '0 0 10px rgba(170, 170, 170, 0.5), ' +
        '0 0 10px rgba(170, 170, 170, 0.5)';
        isClicked = true;
    } else {
        menuButton.style.transform = 'rotate(0deg)';
        toggleMenu.style.right = '-400px';
        toggleMenu.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0.5)';
        isClicked = false;
    }
});








// RESET BUTTON
clearGridButton.addEventListener("click", function () {
    // Erase the grid by setting all square backgrounds to transparent
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundColor = 'transparent';
    });

    // Select the pencil tool and set the cursor to the pencil SVG image
    pencilMode = true;
    gridContainer.style.cursor = `url('photos/pencil.PNG'), auto`;
});

