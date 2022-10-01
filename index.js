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
// run done !!
// jump(2:49:54!!)
// attack done !!
// enemy spirte (kenshi) (3:01) done !!

// 3:33:35
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
  offset: {
    x: 215,
    y: 157
  },
  framesMax: 8,
  scale: 2.5,
  sprites: {
    idle: {
      imageSrc: './img/Idle.png',
      framesMax: 8
    },
    // start from player sprite run 2:36
    run: {
      imageSrc: './img/Run.png',
      framesMax: 8,
      image: new Image()
    },
    jump: {
      imageSrc: './img/Jump.png',
      framesMax: 2,
      image: new Image()
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2,
      image: new Image()
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6,
      image: new Image()
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4,
      image: new Image()
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6,
      image: new Image()
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 155,
    height: 50
  },
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
},
imageSrc: './img/kenji/Idle.png',
offset: {
  x: 215,
  y: 167
},
framesMax: 4,
scale: 2.5,
sprites: {
  idle: {
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4
  },
  // start from player sprite run 2:36
  run: {
    imageSrc: './img/kenji/Run.png',
    framesMax: 8,
    image: new Image()
  },
  jump: {
    imageSrc: './img/kenji/Jump.png',
    framesMax: 2,
    image: new Image()
  },
  fall: {
    imageSrc: './img/kenji/Fall.png',
    framesMax: 2,
    image: new Image()
  },
  attack1: {
    imageSrc: './img/kenji/Attack1.png',
    framesMax: 4,
    image: new Image()
  },
  takeHit: {
    imageSrc: './img/kenji/Take hit.png',
    framesMax: 3,
    image: new Image()
  },
  death: {
    imageSrc: './img/kenji/Death.png',
    framesMax: 7,
    image: new Image()
  }
},
attackBox: {
  offset: {
    x: -170,
    y: 50
  },
  width: 170,
  height: 50
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
  c.fillStyle = 'rgba(255, 255, 255, 0.10)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.LastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
    console.log(player.image)
  } else if (keys.d.pressed && player.LastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
    console.log(player.image)
  } else {
    player.switchSprite('idle')
  }

  // player jump
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.LastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.LastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // enemy jump
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit //
  if ( rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) &&
    player.isAttacking
    && player.framesCurrent === 4) {
    enemy.takehit()
    player.isAttacking = false
    console.log("hit")
    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // player gets hit


  if ( rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) &&
    enemy.isAttacking && enemy.framesCurrent === 2) {
    player.takehit()
    enemy.isAttacking = false
    console.log("enemy dealt damage to player")
    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }
  // end game based on health
  if (enemy.health <= 0 || player.health <= 0 ) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  console.log(event.key) ;
  if (!player.dead) {
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
      case 's' :
        player.attack()
        break
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
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
      case 'ArrowDown' :
        enemy.attack()
        break
    }
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
