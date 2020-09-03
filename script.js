/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, nowPlayer, isGamePlaying

reset()

// document.querySelector('#current-' + nowPlayer).innerHTML = dice

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (isGamePlaying) {
    // random number
    let dice = Math.floor(Math.random() * 6 + 1)

    // display result
    let diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block'
    diceDom.src = 'dice-' + dice + '.png'

    // update round score if the rolled number was not a 1
    if (dice !== 1) {
      //add score
      roundScore += dice
      document.querySelector('#current-' + nowPlayer).textContent = roundScore
    } else {
      changePlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (isGamePlaying) {
    scores[nowPlayer] += roundScore
    document.getElementById('score-' + nowPlayer).textContent =
      scores[nowPlayer]

    if (scores[nowPlayer] >= 100) {
      document.getElementById('name-' + nowPlayer).textContent = 'WINNER!'
      document.querySelector('.dice').style.display = 'none'
      document
        .querySelector('.player-' + nowPlayer + '-panel')
        .classList.add('winner')
      document
        .querySelector('.player-' + nowPlayer + '-panel')
        .classList.remove('active')
      isGamePlaying = false
    } else {
      changePlayer()
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', reset)

function reset() {
  scores = [0, 0]
  nowPlayer = 0
  roundScore = 0
  isGamePlaying = true

  document.querySelector('.dice').style.display = 'none'

  document.getElementById('score-0').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')

  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')

  document.querySelector('.player-0-panel').classList.add('active')

  document.getElementById('name-0').textContent = 'PLAYER 1'
  document.getElementById('name-1').textContent = 'PLAYER 2'
}
function changePlayer() {
  nowPlayer == 0 ? (nowPlayer = 1) : (nowPlayer = 0)
  roundScore = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  document.querySelector('.dice').style.display = 'none'
}
