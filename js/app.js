/**
 * Enemies
 */

// Enemies our player must avoid

var Enemy = function (x, y, speed) {
    'use strict ';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above

// Each individual ladyBug
let ladyBug1 = new Enemy(-100, 60, 100);
let ladyBug2 = new Enemy(-500, 60, 200);
let ladyBug3 = new Enemy(-185, 140, 300);
let ladyBug4 = new Enemy(-510, 140, 100);
let ladyBug5 = new Enemy(-500, 220, 200);
let ladyBug6 = new Enemy(-200, 220, 300);

// Array of all the ladyBugs

let allEnemies = [ladyBug1, ladyBug2, ladyBug3, ladyBug4, ladyBug5, ladyBug6];

// Modal  variables

let modal = document.getElementById('modal');
let modalContent = document.getElementsByClassName('modal-content');
let modalBtn = document.getElementsByClassName('btn');

// adds event listener to load window

window.addEventListener('keypress', closeModal, false);

// function closes modal when enter is pressed

function closeModal(key) {
    'use strict ';
    if (key.keyCode == '13') {
        modal.style.display = 'none';
    }
}

// function opens modal

function openModal() {
    'use strict ';
    modal.style.display = 'block';
}

// function closes modal

function ladyBugs(x) {
    'use strict ';
    let ladyBug = new Enemy(0, x, 200)
    for (i = 0; i < allEnemies.length; i++) {
        allEnemies.push(ladyBug);
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    'use strict ';
    this.x = this.x + this.speed * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // ladybug vanish at 505 repeats at -40

    if (this.x > 505) {
        this.x = -40;

        // speed = 150 - gernates random whole intiger * 180

        this.speed = 150 + Math.floor(Math.random() * 180);
    };

    // Colision for enemy and player

    if (player.x < this.x + 60 &&
        player.x + 60 > this.x &&
        player.y < this.y + 30 &&
        30 + player.y > this.y) {

        // after coliding player is sent back to specified position

        player.x = 200;
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function () {
    'use strict ';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Player 
 */

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function (x, y, speed) {
    'use strict ';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

let player = new Player(200, 400);

function winner() {
    alert('winner');

}

Player.prototype.update = function (dt) {
    'use strict ';

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Canvas Blocker for player

    if (this.y > 395) {
        this.y = 395;
    }

    if (this.x > 395) {
        this.x = 395;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y <= -30) {
        this.y = -30;
    }
};

// Draw the player on the screen, required method for game

Player.prototype.render = function () {
    'use strict ';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//input handeler moves player with arrows

player.handleInput = function (control) {
    'use strict ';
    let timeout = 750;

    if (control === 'left') {
        this.x -= 100;
    }
    if (control === 'up') {
        this.y -= 85;
    }
    if (control === 'right') {
        this.x += 100;
    }
    if (control === 'down') {
        this.y += 85;
    }
    if (this.y <= -30) {
        setTimeout(() => {
            this.x = 200;
            this.y = 400;
        }, timeout);
    }

    if (this.y === -30) {
        setTimeout(() => {
            openModal();
        }, timeout);
    }

}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
    'use strict ';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});