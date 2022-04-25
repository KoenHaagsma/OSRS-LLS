import { renderElementAndClean, renderElement, cleanElement } from './modules/renderElement.js';
const socket = io();
const supplyForm = document.querySelector('.supplyForm');
const supplyValue = document.querySelector('#supplyValue');
const lootForm = document.querySelector('.lootForm');
const lootValue = document.querySelector('#lootValue');
const countContainer = document.querySelector('.count');

supplyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    supplyValue.value = '';
});

lootForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

socket.on('connected', (msg) => {
    console.log(msg);
});

socket.on('disconnected', (msg) => {
    console.log(msg);
});

socket.on('userCount', (count) => {
    console.log(countContainer);
    countContainer.textContent = `Connected Users: ${count}`;
});
