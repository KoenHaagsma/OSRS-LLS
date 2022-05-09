import { renderElementAndClean, renderElement, cleanElement } from './modules/renderElement.js';
import { capitalize } from './modules/capitalize.js';
const socket = io();
const lootForm = document.querySelector('.lootForm');
const lootValue = document.querySelector('#lootValue');
const lootButton = document.querySelector('.group > button:nth-child(2)');
const lootList = document.querySelector('.lootList');
const countContainer = document.querySelector('.count');
const userList = document.querySelector('.userlist');

let myName = '';

// Add item to list
lootForm.addEventListener('submit', (event) => {
    event.preventDefault();
    lootButton.disabled = true;

    let formattedValue = encodeURIComponent(lootValue.value.trim());
    let capitalized = capitalize(formattedValue);
    console.log(capitalized);

    // Using my own item API on: https://github.com/KoenHaagsma/OSRS-LLS-API
    fetch(`http://osrsllsapi.herokuapp.com/api/getOne/${capitalized}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                Toastify({
                    text: `${data.error}`,
                    duration: 2000,
                    close: true,
                    style: {
                        background: '#FBD9DF',
                        color: '#CD324E',
                    },
                }).showToast();
            }
            socket.emit('addItem', data);
            lootButton.disabled = false;
        })
        .catch((error) => {
            lootButton.disabled = false;
            Toastify({
                text: `${error}`,
                duration: 2000,
                close: true,
                style: {
                    background: '#FBD9DF',
                    color: '#CD324E',
                },
            }).showToast();
        });

    lootValue.value = '';
});

// Update the itemlist on every item added or deleted
socket.on('updateItems', (items) => {
    const template = `<ul>
        ${items
            .map(
                (item, index) =>
                    `<li class='${index}'><p class="remove ${index}">Remove</p><a target="_blank" rel="noreferrer noopener" href=${item.url}><p>${item.name}</p><img src='${item.icon}'>${item.price}</a></li>`,
            )
            .join('\n ')}
    </ul>`;
    renderElementAndClean(lootList, template, 'afterbegin');

    const removeButtonsAfter = document.querySelectorAll('.remove');

    removeButtonsAfter.forEach((removeButton) => {
        removeButton.addEventListener('click', (event) => {
            event.preventDefault();
            socket.emit('deleteItem', removeButton.classList[1]);
        });
    });
});

// Set current split
socket.on('priceChange', (cost) => {
    console.log(cost);
});

// Show count of users
socket.on('users', (users) => {
    countContainer.textContent = `Connected Users: ${users.total}`;
});

// Add connected users to unordered list
socket.on('update-peers', (peers) => {
    const template = `<ul>${peers
        .map((peer) => `<li class=${peer === myName ? 'self' : ''}>${peer}</li>`)
        .join('\n ')}</ul>`;

    renderElementAndClean(userList, template, 'afterbegin');
});

socket.on('error', (errorMessage) => {
    Toastify({
        text: `${errorMessage.error}`,
        duration: 2000,
        close: true,
        style: {
            background: '#FBD9DF',
            color: '#CD324E',
        },
    }).showToast();
});

// Update name on every connect
socket.on('name-generated', (name) => {
    myName = name;
});
