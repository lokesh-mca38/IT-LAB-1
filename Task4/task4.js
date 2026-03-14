const form = document.getElementById("task4Form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");
const strengthText = document.getElementById("strength");

function showError(input, message) {
    input.nextElementSibling.textContent = message;
}

function clearError(input) {
    input.nextElementSibling.textContent = "";
}

nameInput.addEventListener("input", () => {
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(nameInput.value)) {
        showError(nameInput, "Only alphabets allowed");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailInput.value)) {
        showError(emailInput, "Invalid email format");
    } else {
        clearError(emailInput);
    }
});

passwordInput.addEventListener("input", () => {
    let score = 0;

    if (passwordInput.value.length >= 8) score++;
    if (/[A-Z]/.test(passwordInput.value)) score++;
    if (/[a-z]/.test(passwordInput.value)) score++;
    if (/[0-9]/.test(passwordInput.value)) score++;
    if (/[@$!%*?&]/.test(passwordInput.value)) score++;

    let strength = Math.floor((score / 5) * 100);

    if (strength < 40) {
        strengthText.textContent = "Weak Password";
        strengthText.style.color = "red";
        showError(passwordInput, "Password too weak");
    } else if (strength < 80) {
        strengthText.textContent = "Medium Password";
        strengthText.style.color = "orange";
        showError(passwordInput, "Add more strength");
    } else {
        strengthText.textContent = "Strong Password";
        strengthText.style.color = "green";
        clearError(passwordInput);
    }
});

dobInput.addEventListener("change", () => {
    const dob = new Date(dobInput.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
        showError(dobInput, "Must be at least 18 years old");
    } else {
        clearError(dobInput);
    }
});

phoneInput.addEventListener("input", () => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phoneInput.value)) {
        showError(phoneInput, "Enter exactly 10 digits");
    } else {
        clearError(phoneInput);
    }
});

form.addEventListener("submit", (e) => {
    if (
        nameInput.nextElementSibling.textContent ||
        emailInput.nextElementSibling.textContent ||
        passwordInput.nextElementSibling.textContent ||
        dobInput.nextElementSibling.textContent ||
        phoneInput.nextElementSibling.textContent
    ) {
        e.preventDefault();
        alert("Please fix all errors before submitting");
    } else {
        alert("Form submitted successfully");
    }
});
