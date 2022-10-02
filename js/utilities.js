
var options = {
  strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
  typeSpeed: 40
};

var typed = new Typed('.element', options);

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
  document.querySelector("#DisplayText").style.display = 'flex'
  if (player.health === enemy.health) {
    console.log("tie")
    // where message is passed through to html
    document.querySelector("#DisplayText").innerHTML = 'Tie'
  } else if (player.health > enemy.health ) {
    // where message is passed through to html
    console.log(typed)
    document.querySelector("#DisplayText").innerHTML = 'Player 1 Wins'
  } else if (enemy.health > player.health ) {
    // where message is passed through to html
    document.querySelector("#DisplayText").innerHTML = 'Player 2 Wins'
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
