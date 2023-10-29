'use strict';

const form = document.querySelector('form'); // Select the form element

const validateForm = (event) => {
    let expression = document.querySelector('#mail').value;
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result = pattern.test(expression);

    if (!result) {
        alert('Neispravna email adresa');
        event.preventDefault(); // Prevent form submission only if the email is invalid
        return false;
    }
}

form.addEventListener('submit', validateForm);
