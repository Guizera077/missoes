let total = 0;
const meta = 4500;

document.addEventListener("DOMContentLoaded", () => {
    loadSavedValue();
});

function addMoney() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    total += amount;
    if (total > meta) total = meta;

    saveValue();
    document.getElementById("amount").value = "";
}

function removeMoney() {
    let amount = parseFloat(document.getElementById("amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Digite um valor válido!");
        return;
    }

    total -= amount;
    if (total < 0) total = 0;

    saveValue();
    document.getElementById("amount").value = "";
}

function revealAmount() {
    document.querySelector(".value-display").style.visibility = "visible";
    updateThermometer(true);
}

function updateThermometer(isInstant = false) {
    let percentage = (total / meta) * 100;
    let progress = document.querySelector(".progress");
    
    progress.style.transition = isInstant ? "height 3s ease-in-out, background 3s ease-in-out" : "height 7s ease-in-out, background 7s ease-in-out";
    progress.style.height = `${percentage}%`;

    if (percentage < 50) {
        progress.style.background = "red";
    } else if (percentage < 100) {
        progress.style.background = "yellow";
    } else {
        progress.style.background = "green";
    }

    animateValueDisplay(total);
}

function animateValueDisplay(finalValue) {
    let valueDisplay = document.querySelector(".value-display");
    let startValue = parseFloat(valueDisplay.textContent.replace("R$ ", "")) || 0;
    let duration = 3000;
    let startTime = null;

    function updateValue(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / duration;
        if (progress > 1) progress = 1;

        let currentValue = startValue + (finalValue - startValue) * progress;
        valueDisplay.textContent = `R$ ${currentValue.toFixed(2)}`;

        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }

    requestAnimationFrame(updateValue);
}

function saveValue() {
    localStorage.setItem("totalDonations", total);
}

function loadSavedValue() {
    let savedValue = localStorage.getItem("totalDonations");
    if (savedValue) {
        total = parseFloat(savedValue);
    }
    document.querySelector(".value-display").style.visibility = "hidden";
}