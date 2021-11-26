document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')

  // set initial score
  let score = 0
  scoreDisplay.innerHTML = score

  // 28 * 28 = 784
  const width = 28

  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]

  const squareArr = []

  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      // create square
      const square = document.createElement('div')
      // put square in grid
      grid.appendChild(square)
      // put square in squares array
      squareArr.push(square)
      // style squares
      if (layout[i] === 0) {
        squareArr[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squareArr[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squareArr[i].classList.add('ghost-lair')
      } else if (layout[i] === 3) {
        squareArr[i].classList.add('power-pellet')
      }
    }
  }
  createBoard()

  // starting position of pac-man
  let pacmanCurrentIndex = 490
  squareArr[pacmanCurrentIndex].classList.add('pac-man')

  function movePacman(e) {
    squareArr[pacmanCurrentIndex].classList.remove('pac-man')
    switch (e.keyCode) {
      case 37:
        if (
          // check if there is no ghost-lair
          !squareArr[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
          // check if there is no wall
          !squareArr[pacmanCurrentIndex - 1].classList.contains('wall') &&
          // check if there is a border
          pacmanCurrentIndex % width !== 0)
          // move pac-man left
          pacmanCurrentIndex -= 1
        // move pac-man when in shortcut
        if (pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if (
          // check if there is no ghost-lair
          !squareArr[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
          // check if there is no wall
          !squareArr[pacmanCurrentIndex - width].classList.contains('wall') &&
          // check if there is a border
          pacmanCurrentIndex - width >= 0)
          // move pac-man up
          pacmanCurrentIndex -= width
        break
      case 39:
        if (
          // check if there is no ghost-lair
          !squareArr[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
          // check if there is no wall
          !squareArr[pacmanCurrentIndex + 1].classList.contains('wall') &&
          // check if there is a border
          pacmanCurrentIndex % width < width - 1)
          // move pac-man right
          pacmanCurrentIndex += 1
        // move pac-man when in shortcut
        if (pacmanCurrentIndex === 391) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          // check if there is no ghost-lair
          !squareArr[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
          // check if there is no wall
          !squareArr[pacmanCurrentIndex + width].classList.contains('wall') &&
          // check if there is a border
          pacmanCurrentIndex + width < width * width)
          // move pac-man down
          pacmanCurrentIndex += width
        break
    }
    squareArr[pacmanCurrentIndex].classList.add('pac-man')
    eatDot()
    eatPellet()
    checkWin()
    checkGameOver()
  }
  document.addEventListener('keyup', movePacman)

  // when pac-man eats a pac-dot
  function eatDot() {
    // if square pacman contains pac-dot
    if (squareArr[pacmanCurrentIndex].classList.contains('pac-dot')) {
      // add a score point
      score++
      // display score
      scoreDisplay.innerHTML = score
      squareArr[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }

  // when pac-man eats a power-pellet
  function eatPellet() {
    // if square pacman is in contains a power pellet
    if (squareArr[pacmanCurrentIndex].classList.contains('power-pellet')) {
      // add a score of 10
      score += 10
      // display score
      scoreDisplay.innerHTML = score
      // change each of the four ghosts to isScared
      ghosts.forEach(ghost => ghost.isScared = true)
      // use setTimeout to unscare ghosts after 10 seconds
      setTimeout(unScareGhosts, 10000)
      // remove class of power-pellet from square
      squareArr[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  // ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // define ghosts
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
  ]

  // insert the ghosths in the grid
  ghosts.forEach(ghost => {
    squareArr[ghost.startIndex].classList.add(ghost.className)
    squareArr[ghost.currentIndex].classList.add('ghost')
  })

  // move the ghosts
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    // array of possible directions
    const directions = [-1, +1, -width, +width]
    // apply random direction
    let direction = directions[Math.floor(Math.random() * directions.length)]
    // move ghosts
    ghost.timerId = setInterval(function () {
      // if next square is not a wall or a ghost
      if (
        !squareArr[ghost.currentIndex + direction].classList.contains('wall') &&
        !squareArr[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
        // remove any ghost
        squareArr[ghost.currentIndex].classList.remove(ghost.className)
        squareArr[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        // add direction to current Index
        ghost.currentIndex += direction
        // add ghost class
        squareArr[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
      }
      // if the ghost is currently scared
      if (ghost.isScared) {
        squareArr[ghost.currentIndex].classList.add('scared-ghost')
      }
      // if the ghost is currently scared and pacman eats it
      if (ghost.isScared && squareArr[ghost.currentIndex].classList.contains('pac-man')) {
        // remove classnames ghost.className, 'ghost' and 'scared-ghost'
        squareArr[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        // change ghosts currentIndex back to its startIndex
        ghost.currentIndex = ghost.startIndex
        // re-add classnames of ghost.className and 'ghost' to the ghosts new postion
        squareArr[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      checkGameOver()
    }, ghost.speed)
  }

  // check for game over
  function checkGameOver() {
    // if the square pac-man is in contains a ghost and the square does not contain a scared ghost
    if (
      squareArr[pacmanCurrentIndex].classList.contains('ghost') &&
      !squareArr[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
      // for each ghost stop it moving
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      // remove eventlistener from movePacman function
      document.removeEventListener('keyup', movePacman)
      // tell user the game is over
      setTimeout(function () { alert("Game Over"); }, 500)
    }
  }

  // check for win
  function checkWin() {
    if (score === 274) {
      // stop ghosts
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      // remove the event listener for the movePacman function
      document.removeEventListener('keyup', movePacman)
      // tell user the game is won
      setTimeout(function () { alert("You have WON!"); }, 500)
    }
  }
})