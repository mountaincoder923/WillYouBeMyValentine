/******************************************
 * script.js powers the GitHub Pages site. *
 * Used by index.html.                     *
 * Full file: WillYouBeMyValentine.html    *
 ******************************************/

const heartsContainer = document.getElementById('hearts-container');
const celebrationContainer = document.getElementById('celebration-container');
const yesBox = document.getElementById('yes_box');
const yesButton = document.getElementById('yes_button');
const noButton = document.getElementById('no_button');
const NO_BUTTON_SIZES = ["14px 28px", "7px 14px"];
const YES_BUTTON_SIZES = ["56px 102px", "102px 204px"];
const FACES = ["😟","😔","😭"];
let noCount = 0;
let mouseX = 0;
let mouseY = 0;

// Event Listeners
window.onload = () => {
    initHearts(50);
};

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

noButton.addEventListener('click', () => {
    handleNoClick();
});

yesButton.addEventListener('click', () => {
    yesBox.classList.add('active');
    document.querySelector('.button-container').style.display = 'none';
    document.querySelector('.bubble').style.display = 'none';
    document.querySelector('.face').style.display = 'none';
    initHearts(50);
    initCelebration(50);
});

function handleNoClick() {
    if (noCount < 2) {
        noButton.style.setProperty("padding", NO_BUTTON_SIZES[noCount]);
        noButton.style.setProperty("font-size", `calc(25px - ${noCount} * 10px)`);
        yesButton.style.setProperty("padding", YES_BUTTON_SIZES[noCount]);
        yesButton.style.setProperty("font-size", `calc(75px + ${noCount} * 10px)`);
        document.querySelector('.face').textContent =  FACES[noCount];
        noCount++;
    } else {
        document.querySelector('.face').textContent =  FACES[noCount];
        moveNoButton(300, 400);
        flashYesButton();
        runNoButton();
    }
}

// Functions
function createHeart() {
    const heartElement = document.createElement('div');
    heartElement.classList.add('heart');
    heartElement.style.left = Math.random() * 100 + 'vw';
    const fallDuration = 5 + Math.random() * 5;
    const fallDelay = Math.random() * 5;
    heartElement.style.animationDuration = fallDuration + 's';
    heartElement.style.animationDelay = fallDelay + 's';
    const size = 20 + Math.random() * 20;
    heartElement.style.setProperty('--heart-size', size + 'px');
    const extraRotation = -30 + Math.random() * 60;
    heartElement.style.transform = `rotate(-45deg) rotate(${extraRotation}deg)`;
    heartElement.addEventListener('animationend', () => {
        heartElement.remove();
    });
    heartsContainer.appendChild(heartElement);
}

function initHearts(count) {
    for (let i = 0; i < count; i++) {
        createHeart();
    }
    setInterval(createHeart, 1000);
}

function createCelebration() {
    const celebrationElement = document.createElement('div');
    celebrationElement.classList.add('celebration');
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    celebrationElement.textContent = randomNumber === 1 ? "🌹" : "🎉";
    celebrationElement.style.left = Math.random() * 100 + 'vw';
    const fallDuration = 5 + Math.random() * 5;
    const fallDelay = Math.random() * 5;
    celebrationElement.style.animationDuration = fallDuration + 's';
    celebrationElement.style.animationDelay = fallDelay + 's';
    const size = 30 + Math.random() * 20;
    celebrationElement.style.fontSize = size + 'px';
    celebrationElement.addEventListener('animationend', () => {
        celebrationElement.remove();
    });
    celebrationContainer.appendChild(celebrationElement);
}

function initCelebration(count) {
    for (let i = 0; i < count; i++) {
        createCelebration();
    }
    setInterval(createCelebration, 1000);
}

function moveNoButton(newLeft, newTop) {
    noButton.style.position = "absolute";
    noButton.style.margin = "0";
    noButton.style.left = newLeft + "px";
    noButton.style.top = newTop + "px";
}

function flashYesButton() {
    let toggle = false;
    setInterval(() => {
        toggle = !toggle;
        yesButton.style.setProperty("color", toggle ? "yellow" : "white");
    }, 325);
}

function runNoButton() {
    const getNumericStyle = (element, property) => parseFloat(element.style[property]) || 0;
    const runSpeed = 10;         // Speed of running away
    const fearDistance = 120;      // Distance to trigger running
    const cornerThreshold = 10;    // If near edge, teleport

    setInterval(() => {
        let buttonX = getNumericStyle(noButton, "left");
        let buttonY = getNumericStyle(noButton, "top");

        // Distance from mouse
        const dx = buttonX - mouseX;
        const dy = buttonY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Boundaries
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;

        if (
            buttonX < cornerThreshold ||
            buttonX > maxX - cornerThreshold ||
            buttonY < cornerThreshold ||
            buttonY > maxY - cornerThreshold
        ) {
            const newX = Math.random() * (maxX - 60) + 30;
            const newY = Math.random() * (maxY - 60) + 30;
            noButton.style.left = newX + "px";
            noButton.style.top = newY + "px";
            return;
        }

        if (distance < fearDistance) {
            const angle = Math.atan2(dy, dx);
            let newX = buttonX + runSpeed * Math.cos(angle);
            let newY = buttonY + runSpeed * Math.sin(angle);

            newX = Math.min(Math.max(newX, 0), maxX);
            newY = Math.min(Math.max(newY, 0), maxY);

            noButton.style.left = newX + "px";
            noButton.style.top = newY + "px";
        }
    }, 15); // ~60 FPS
}