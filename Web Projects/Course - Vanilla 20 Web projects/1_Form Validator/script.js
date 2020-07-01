const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let verifyPassword = false;

// Functions

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(input.value).toLowerCase())) {
        showError(input, `Email is not valid`);
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} length should be atleast ${min}`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} length should be atmost ${max}`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value.trim() === '') {
        showError(input2, `Passwords do not match`);
    } else if (input1.value !== input2.value) {
        showError(input2, `Passwords do not match`);
    } else {
        showSuccess(input2);
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});