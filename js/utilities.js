
function rectangularCollision({ rectangle1,rectangle2 }) {
  return (
    rectangle1.attackbox.position.x + rectangle1.attackbox.width >= rectangle2.position.x &&
    rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y &&
    rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

function determineWinner({player, enemy, timerId}) {
  clearTimeout(timerId)
  console.log("player health:", player.health)
  console.log(timer)
  // document.querySelector(".typed").style.display = 'flex'
  if (player.health === enemy.health) {
    console.log("tie")
    var tie = new Typed('.p1wins', {
      stringsElement: '#typed-tie',
      typeSpeed: 30
    });
    console.log(tie.stringsElement)
    // where message is passed through to html
  } else if (player.health > enemy.health ) {
    var p1wins = new Typed('.p1wins', {
      stringsElement: '#typed-strings',
      typeSpeed: 30
    });
    console.log(p1wins.stringsElement)
    // document.querySelector(".typed").style.display = 'flex'
  } else if (enemy.health > player.health ) {
    // where message is passed through to html
    var p2wins = new Typed('.p1wins', {
      stringsElement: '#typed-p2wins',
      typeSpeed: 30
    });
    console.log(p2wins.stringsElement)
  }
}


let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#Timer').innerHTML = timer
  }

  if (timer === 0 ) {
    // end game based on time
    determineWinner({ player, enemy, timerId })
  }
}
