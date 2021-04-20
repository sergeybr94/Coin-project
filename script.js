const coins = document.querySelectorAll('.coin')

coins.forEach((coin) => {
  // The larger the number, the slower the animation
  coin.maxMoveLoopCount = 100

  coin.addEventListener('click', () => {
    if (coin.clicked) return

    coin.classList.add('clicked')

    // Wait to start flipping the coin because of the button tilt animation
    setTimeout(() => {
      // Randomize the flipping speeds just for fun
      coin.maxFlipAngle = (Math.floor(Math.random() * 10) + 3) * Math.PI
      coin.clicked = true
      flipCoin()
    }, 50)
  })

  const flipCoin = () => {
    coin.moveLoopCount = 0
    coin.shineOpacity = 0.2
    coin.shineBG = 50
    flipCoinLoop()
  }

  const resetCoin = () => {
    coin.moveLoopCount -= 5
    let percentageCompleted = coin.moveLoopCount / coin.maxMoveLoopCount

    coin.shineOpacity = 0.2 + ((coin.shineOpacity - 0.2) * percentageCompleted)
    coin.shineBG = 50 + ((coin.shineOpacity - 50) * percentageCompleted)

    coin.style.setProperty('--coin-scale-multiplier', percentageCompleted * 0.6)
    coin.style.setProperty('--shine-opacity-multiplier', coin.shineOpacity)
    coin.style.setProperty('--shine-bg-multiplier', coin.shineBG + '%')

    if (coin.moveLoopCount > 0) {
      window.requestAnimationFrame(resetCoin)
    } else {
      setTimeout(() => {
        coin.clicked = false
      }, 300)
    }
  }

  const flipCoinLoop = () => {
    coin.moveLoopCount++
    coin.shineOpacity = 4 * Math.sin((coin.angle + Math.PI / 2) % Math.PI) - 3.6
    coin.shineBG = -40 * (Math.cos((coin.angle + Math.PI / 2) % Math.PI) - 0.5)

    let percentageCompleted = coin.moveLoopCount / coin.maxMoveLoopCount

    percentageCompletedX = percentageCompleted;
    if(percentageCompletedX >= 0.5) {
      percentageCompletedX = 1 - percentageCompletedX;
    }
    
    coin.angle = -coin.maxFlipAngle * Math.pow((percentageCompleted - 1), 2) + coin.maxFlipAngle
    
    // Calculate the scale and position of the coin moving through the air
    coin.style.setProperty('--coin-y-multiplier', -11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11)
    coin.style.setProperty('--coin-x-multiplier', percentageCompletedX)
    coin.style.setProperty('--coin-scale-multiplier', percentageCompleted * 0.6)

    // Calculate the scale and position values for the different coin faces
    // The math uses sin/cos wave functions to similate the circular motion of 3D spin
    coin.style.setProperty('--front-scale-multiplier', Math.max(Math.cos(coin.angle), 0))
    coin.style.setProperty('--front-y-multiplier', Math.sin(coin.angle))

    coin.style.setProperty('--middle-scale-multiplier', Math.abs(Math.cos(coin.angle), 0))
    coin.style.setProperty('--middle-y-multiplier', Math.cos((coin.angle + Math.PI / 2) % Math.PI))

    coin.style.setProperty('--back-scale-multiplier', Math.max(Math.cos(coin.angle - Math.PI), 0))
    coin.style.setProperty('--back-y-multiplier', Math.sin(coin.angle - Math.PI))

    coin.style.setProperty('--shine-opacity-multiplier',coin.shineOpacity)
    coin.style.setProperty('--shine-bg-multiplier', coin.shineBG + '%')

    // Repeat animation loop
    if (coin.moveLoopCount < coin.maxMoveLoopCount) {
      window.requestAnimationFrame(flipCoinLoop)
    } else {
      setTimeout(() => {
        coin.classList.remove('clicked')
        setTimeout(() => {
          resetCoin()
        }, 300)
      }, 1500)
    }
  }
})