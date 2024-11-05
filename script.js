// Initial game state
let money = 0;
let buildProgress = 0;
const buildParts = {};
const partPrices = {
    cpu: 100,
    gpu: 300,
    ram: 50,
    motherboard: 369,
    storage: 75,
    psu: 120,
    case: 80,
};

// DOM elements
const moneyDisplay = document.getElementById("money");
const clickerBtn = document.getElementById("clicker-btn");
const parts = document.querySelectorAll(".part");
const slots = document.querySelectorAll(".slot");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const generatePcBtn = document.getElementById("generate-pc-btn");
const buildSummary = document.getElementById("build-summary");

// Function to update money display
function updateMoneyDisplay() {
    moneyDisplay.textContent = `$${money}`;
}

// Money clicker functionality with sound and animation
clickerBtn.addEventListener("click", () => {
    money += 10;  // Earn $10 per click
    updateMoneyDisplay();
    
    // Add pop effect to the button
    clickerBtn.classList.add("pop");
    setTimeout(() => {
        clickerBtn.classList.remove("pop");
    }, 300);

    // Coin effect animation
    const coin = document.createElement("span");
    coin.classList.add("coin");
    coin.textContent = "+$10";
    clickerBtn.appendChild(coin);
    setTimeout(() => {
        coin.remove();
    }, 600);

    // Play sound on click
    const clickSound = new Audio('click-sound.mp3');
    clickSound.play();
});

// Add drag-and-drop functionality for parts
parts.forEach(part => {
    part.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("part", event.target.dataset.part);
    });
});

// Allow parts to be dropped into slots
slots.forEach(slot => {
    slot.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    slot.addEventListener("drop", (event) => {
        const partType = event.dataTransfer.getData("part");
        const part = document.querySelector(`[data-part=${partType}]`);
        const slotType = event.target.dataset.part;

        if (part && slotType === partType && money >= partPrices[partType]) {
            buildParts[partType] = partType;
            money -= partPrices[partType];
            updateMoneyDisplay();

            // Update the slot with the part
            event.target.textContent = `${part.dataset.name} installed!`;
            part.remove();
            updateBuildProgress();
        }
    });
});

// Update the build progress bar and text
function updateBuildProgress() {
    buildProgress = (Object.keys(buildParts).length / 7) * 100;  // 7 parts in total
    progressBar.style.width = `${buildProgress}%`;
    progressText.textContent = `Build Completion: ${Math.round(buildProgress)}%`;

    if (buildProgress === 100) {
        buildSummary.textContent = `PC Build Complete! Total Money: $${money}`;
        generatePcBtn.disabled = false;
    }
}

// Generate the PC when the button is clicked
generatePcBtn.addEventListener("click", () => {
    if (buildProgress === 100) {
        alert("Congratulations! You have completed your PC build.");
    } else {
        alert("You need to complete your PC build first!");
    }
});
document.getElementById('generateButton').addEventListener('click', function() {
    // Get the image container and set the image source
    const imageContainer = document.getElementById('imageContainer');
    const generatedImage = document.getElementById('generatedImage');
});
