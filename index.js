// Basic Fighting game mechanics
// Project setup, done !
// Create Player and Enemy, done !!
// Move characters with event listeners, done !!
// Attacks (make hitboxes and define sprites as hurtboxes), done !!
// Health bar and interface, done !!
// Game Timers and Game Over, done !!

// sprites and animation done !!
// background sprite done !!
// shop sprite with animation done !!
// player sprite (samurai mack)
// idle done !!
// run
// jump
// attack
// enemy spirte (kenshi)
// interface design and animation
// pushing live

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'

})

const shop = new Sprite({
  position: {
    x: 600,
    y: 130
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6,
})

const player = new Fighter ({
  position: {
    x : 0,
    y : 0
  },
  velocity: {
    x: 0,
    y : 10
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/Idle.png',
      FramesMax: 8
    },
    // start from player sprite run 2:36
    run: {

    }
  }
})


const enemy = new Fighter ({
position: {
  x : 400,
  y : 100
},
velocity: {
  x: 0,
  y : 0
},
color : 'blue ',
offset: {
  x: -50,
  y : 0
}
})

console.log(player);
console.log(enemy);

const keys = {
  a : {
    pressed : false
  },
  d : {
    pressed : false
  },
  w : {
    pressed : false
  },
  ArrowRight : {
    pressed : false
  },
  ArrowLeft : {
    pressed : false
  },
  ArrowUp : {
    pressed : false
  }
}


decreaseTimer()

function animate () {
  window.requestAnimationFrame(animate) // creates an infinite loop
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  // enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  if (keys.a.pressed && player.LastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.LastKey === 'd') {
    player.velocity.x = 5
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.LastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.LastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  // detect for collision // 1h mark progress, need to add in 'is attacking' conditional
  if ( rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) &&
    player.isAttacking) {
    player.isAttacking = false
    console.log("hit")
    enemy.health -= 20
    document.querySelector("#EnemyHealth").style.width = enemy.health + '%'
  }

  if ( rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) &&
    enemy.isAttacking) {
    enemy.isAttacking = false
    console.log("enemy hit")
    player.health -= 20
    document.querySelector("#PlayerHealth").style.width = player.health + '%'
  }
  // end game based on health
  if (enemy.health <= 0 || player.health <= 0 ) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  console.log(event.key) ;
  switch (event.key) {
    case 'd' :
      keys.d.pressed = true
      player.LastKey = 'd'
      break
    case 'a' :
      keys.a.pressed = true
      player.LastKey = 'a'
      break
    case 'w' :
      player.velocity.y = -20
      break

    case 'ArrowRight' :
      keys.ArrowRight.pressed = true
      enemy.LastKey = 'ArrowRight'
      break
    case 'ArrowLeft' :
      keys.ArrowLeft.pressed = true
      enemy.LastKey = 'ArrowLeft'
      break
    case 'ArrowUp' :
      enemy.velocity.y = -20
      break
    case ' ' :
      player.attack()
      break
    case 'ArrowDown' :
      enemy.attack()
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd' :
      keys.d.pressed = false
      break
    case 'a' :
      keys.a.pressed = false
      break
    case 'w' :
      keys.w.pressed = false
      break
  }
  switch (event.key) {
    case 'ArrowRight' :
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft' :
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowUp' :
      keys.ArrowUp.pressed = false
      break
  }
  console.log(event.key)
})
