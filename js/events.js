import getUserData from "./utils.js";

const searchUserInput = document.querySelector('#searchUser');
const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getUserData(searchUserInput.value);
    searchUserInput.value = null;
});