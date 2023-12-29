const gridContainer = document.querySelector('#gridContainer');
const resetButton = document.querySelector('#reset-button');
const menuButton = document.querySelector('#menuButton');
const toggleMenu = document.querySelector('#toggleMenu');

function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        gridContainer.appendChild(square);
    }
}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

function darkenColor(color) {
    const [r, g, b] = color.slice(4, -1).split(',').map(Number);
    const dr = Math.floor(r * 0.9);
    const dg = Math.floor(g * 0.9);
    const db = Math.floor(b * 0.9);
    return `rgb(${dr},${dg},${db})`;
}

gridContainer.addEventListener('mousedown', () => {
    isDrawing = true;
});

gridContainer.addEventListener('mouseup', () => {
    isDrawing = false;
});

let isClicked = false;

menuButton.addEventListener('click', () => {
    if (isClicked === false && toggleMenu.style.right === '-400px') {
        menuButton.style.transform = 'rotate(90deg)';
        toggleMenu.style.right = '0';
        toggleMenu.style.boxShadow = '-10px 0 40px rgba(0, 0, 0, 0.5)';
        isClicked = true;
    } else {
        menuButton.style.transform = 'rotate(0deg)';
        toggleMenu.style.right = '-400px';
        toggleMenu.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0.5)';
        isClicked = false;
    }
});

gridContainer.addEventListener('mouseover', (e) => {
    if (isDrawing && e.target.classList.contains('square')) {
        const currentColor = e.target.style.backgroundColor || 'rgb(255,255,255)';
        e.target.style.backgroundColor = darkenColor(currentColor);
    }
});

resetButton.addEventListener('click', () => {
    const newSize = prompt('Enter the number of squares per side (max 100):');
    const size = Math.min(Math.max(parseInt(newSize) || 16, 1), 100);
    createGrid(size);
});

// Initial grid creation
createGrid(25);

// document.addEventListener('DOMContentLoaded', function () {
//     menuButton.addEventListener('click', function () {
//         // Toggle the menu's visibility by changing its right position
//         if (toggleMenu.style.right === '-400px') {
//             toggleMenu.style.right = '0';
//         } else {
//             toggleMenu.style.right = '-400px';
//         }
//     });
// });

