import { renderElementAndClean, renderElement, cleanElement } from './modules/renderElement.js';
import { ListItem } from './modules/listItem.js';
const socket = io();
const lootForm = document.querySelector('.lootForm');
const lootValue = document.querySelector('#lootValue');
const countContainer = document.querySelector('.count');
const userList = document.querySelector('.userlist');

let myName = '';

lootForm.addEventListener('submit', (event) => {
    event.preventDefault();
    lootValue.value = '';
});

socket.on('users', (users) => {
    countContainer.textContent = `Connected Users: ${users.total}`;
});

socket.on('update-peers', (peers) => {
    userList.innerHTML = '';

    const template = `<li class=“flex items-center space-x-3 lg:pl-2”>
    <div class=“flex-shrink-0 w-2 h-2 rounded-full bg-%PEER_COLOR%-600”></div>
        <span>%PEER_NAME%</span>
    </li>`;

    for (const peer of peers) {
        let name = peer;
        if (name === myName) {
            name += ' (you)';
        }
        userList.innerHTML += template.replace('%PEER_NAME%', name).replace('%PEER_COLOR%', peer.split('-')[0]);
    }
});

socket.on('name-generated', (name) => {
    myName = name;
});
