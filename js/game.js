"use strict";

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('platform', 'assets/platform.png');

    game.load.image('star', 'assets/star.png');
    game.load.image('tessa', 'assets/tessa.png');
}

var player;
var platformsGroup;
var cursors;

var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    platformsGroup = game.add.group();

    //  We will enable physics for any object that is created in this group
    platformsGroup.enableBody = true;

    //  Now let's create two ledges
    var ledge = platformsGroup.create(150, 450, 'platform');
    ledge.body.immovable = true;

    var ledge = platformsGroup.create(-150, 250, 'platform');
    ledge.body.immovable = true;

    ledge = platformsGroup.create(350, 300, 'platform');
    ledge.body.immovable = true;

    // The player and its settings
    // player = game.add.sprite(32, game.world.height - 150, 'tessa');
    player = game.add.sprite(150, 150, 'tessa');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 200;
    // player.body.collideWorldBounds = true;

    player.checkWorldBounds = true;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(player, platformsGroup);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }

    if (player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    if (player.position.y >= 551) {
      player.kill();
      const scoreText = game.add.text(50, 50, 'Game over', { fontSize: '32px', fill: '#000' });
    }
}
