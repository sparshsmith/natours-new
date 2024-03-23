import '@babel/polyfill'
import { login, logout, signup } from './login'
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const accountForm = document.querySelector('.form-user-data');
const passwordForm = document.querySelector('.form-user-password');
const bookbtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
// VALUES


// DELEGATIONS
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        e.preventDefault();
        login(email, password)
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout)
}

if (accountForm) {
    accountForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0])
        updateSettings(form, 'data');
    })
}

if (passwordForm) {
    passwordForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn-save--password').textContent = 'Updating...';
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
        document.querySelector('.btn-save--password').textContent = 'Save password'
    })
}

if (bookbtn) {
    bookbtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...'
        const tourId = e.target.dataset.tourId;
        bookTour(tourId)
    })
}

if (signupForm) {
    signupForm.addEventListener('submit', ev => {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        ev.preventDefault();
        signup(email, name, password, passwordConfirm)
    })
}