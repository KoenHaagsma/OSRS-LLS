# ⚙ Old school Runescape Live loot splitter (OSRS-LLS)

![Screenshot of live page]()<br>
[⚙ Link to live product](http://osrslls.herokuapp.com/)


## 📂 Assignment
The assignment is to build a real-time application, where an open connection between the client and the server is needed, and make it so that the client and server can communicate both ways in real time at the same time

## 🧾 Table of contents
-   [About the project](##About-the-project)
      * [Built with](###Built-with)
      * [Features](###Features)
      * [Micro libraries](###Micro-libraries)
-   [Activity Diagram](##Activity-Diagram)
-   [Getting started](##Getting-started)
      * [Installation](##Installation)
-   [Packages/dependecies](##Packages/dependecies)
      * [Packages/dependecies](###Dependecies/Packages)
-   [License](##License)
-   [Contributers and their role](##Contributers)

## 📖 About the project
My project is about a game I play, the game is called [Old school runescape](https://oldschool.runescape.com/) a MMORPG where you can play with friends and grind for better gameplay. In this game you can also fight bosses with friends, for that purpose I built a live loot splitter, where everyone can fill in the loot that they gathered so it can be evenly split between the teammates that were fighting with you.

### 🛠 Built with
The project is built with Socket.io, Javascript, Pug and SCSS

### 🌟 Features
- Filling in your username, the username is not connected to your account because such an API is non-existent.
- Search for an item that you have redeemed in the boss fight, with the data from my own API the: [OSRS-LLS-API](https://github.com/KoenHaagsma/OSRS-LLS-API)
- Filling in the items that you have redeemed in the boss fight.
- Removing an item if you fill in a wrong item.
- See live price data from the [OSRS real-time prices API](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices)
- See the gold split that is based on the players connected.

### 🔁 API
In this application I used 2 API's, one I created myself and one that was already existing.

#### OSRS LLS API

### 📚 Micro libraries
I used one micro library because of not accesible features in the browser on Windows by that i mean the Barcode detector. ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API))
So i searched for another option because i really wanted a barcode scanner in my application, i used [Quagga.js](https://serratus.github.io/quaggaJS/), the documentation is easy to read and also the scanner is easy to use. The experience with this library was good and i would people recommend this scanner, but also it's a pity that i could not use the scanner from JS itself. I hope when i start some other project i can use the native scanner.

### 🙌 MoSCoW
**Must have**
- Users must be able to scan a product;
- Users must be able to view the details of a product;
- Users must be able to view useful details of a product on the detail page;
- Users must have an alternative way to search for a product instead of scanning;
- Users must have a fast way to scan/search (for) a product;
- Users must have a way to sort the list of searched products;
- Users must have a way to see if the app is loading.

**Should have**
- Users should have an easy experience with finding a product;
- Users should have another alternative showed if the scanning of a product takes too long;
- Users should have a way to sort on more categories than the app sorts on now;
- Users should not be able to click buttons that do nothing yet;
- Users shuld have a way to see if a button is clickable or not;

**Could have**
- Users could have a way to compare products to eachother;
- Users could have a way to add products to a list;
- Users could have a way to show added products.

**Won't have**
- Users won't have a way to register in the app;
- Users won't have a way to login to the app;
- Users won't have a way to scan with the native Barcode API.

### ✔ Checklist
Checklist for showing what is done and what still can be done.<br>
- [x] Scanning a product
- [x] Show the details of a product
- [x] Alternative way of searching for a product
- [x] Fast way of searching for a product
- [x] Sorting list of searched products
- [x] Detailed loading states
- [x] Easy experience with finding a product
- [x] 404 if hash is not found
- [x] Lazy loading products if last product is reached
- [x] Loading state when needed
- [x] Details on the detail page are useful
- [ ] Alternative way provided if scanning takes to long
- [ ] Buttons not clickable when nog needed
- [x] Sort on popularity
- [ ] Sort on kcal
- [ ] Sort on nutritional grade
- [ ] Compare products
- [ ] Alternative healthier product showed for searched product
- [ ] Add products to a list
- [ ] Show products that are added to the list

## 🎱 Activity Diagram
**Activity diagram iteration 1:** <br><br>

![Activity Diagram](./images/activityDiagram.png)<br>

**Activity diagram iteration 2:** <br><br>
![Activity Diagram](./images/activityDiagram_2.png)<br>

## 🔍 Getting started
*Before you can start you need to follow the installation*

## 🔨 Installation
1. Open the terminal, or use the terminal in your IDE

2. Clone the repository
```
git clone https://github.com/KoenHaagsma/Food-Finder-PWA.git
```
3. Go to the cloned repository
```
cd Food-Finder-PWA
```
4. Install all packages
```
npm install || npm i
```
5. Start the application for development
```
npm run dev
```
6. Open de server and go to the browser: [Localhost:4242](http://localhost:4242). If this doesn't work change your port to another portbottom: 'Go live'

## 🧰 Packages/dependecies

### 🧱 Dependecies/Packages
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [path](https://www.npmjs.com/package/path)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [toastify-js](https://www.npmjs.com/package/toastify-js)
- [pug](https://www.npmjs.com/package/pug)
- [nodemon](https://www.npmjs.com/package/nodemon)

## 📑 Sources
- [toastify-js](https://apvarun.github.io/toastify-js/)
- [WDS socket io](https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=1418s)


## 🔖 License
[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)]()
