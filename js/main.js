const currentNumberTotalHTML = document.querySelector('h2')
const currentNumberTotalResults = document.querySelector('h3')
const currentPlayerCardsHTML = document.querySelector('ul')

const playersArray = ['Human', 'AI']

//hidden number to compare with current number total
const hiddenNumber = createNumber(2)

let currentNumberTotal = 0

let currentPlayerId = 0

function createNumber(exponent) {
    //if 2 digits, it would be at least 10, if 3 digits, it would be at least 100, etc...
    let gameNumber = Math.floor(Math.random() * (10 ** exponent)) 

    //if 2 digits, it would be 10, if 3 digits, it would be 100, etc...
    if (gameNumber < (10 ** (exponent - 1))) gameNumber = (10 ** (exponent - 1))
    //if 2 digits, it would be 99, if 3 digits, it would be 999, etc...
    if (gameNumber > (10 ** exponent) - 1) gameNumber = (10 ** exponent) - 1

    return gameNumber
}

//board state showing current accumulated total
function setCurrentNumberTotal(number) {
    currentNumberTotal += parseInt(number)
    currentNumberTotalHTML.textContent = 'The current total is ' + currentNumberTotal
}

//set html player cards
function setPlayerCards(number) {
    currentPlayerCardsHTML.innerText = ''
    for (let i = 0; i < number; i++){
        const li = document.createElement('li')
        const btn = document.createElement('button')
        btn.textContent = Math.floor(Math.random() * 10)
        li.appendChild(btn)
        currentPlayerCardsHTML.appendChild(li)
    }
}

//get winner
function getWinner() {
    let winner
    currentPlayerId === 0 ? winner = 'AI' : winner = 'Human'
    if (currentNumberTotal >= hiddenNumber) {
        return currentNumberTotalResults.textContent = `${winner} Wins! The hidden number is ${hiddenNumber}! Refresh the page to play again!`
    }
}

//for AI logic
function getComputerChoice() {
    //if game ends, disable buttons
    if (currentNumberTotal >= hiddenNumber) {
            //prevent click events during AI turn
        const buttons = currentPlayerCardsHTML.querySelectorAll("button")

        Array.from(buttons).forEach(btn => {
            btn.disabled = true
        })
        return
    }
    
    currentPlayerId = 1
    currentNumberTotalResults.textContent = `${playersArray[1]} is thinking...`
    setTimeout(() => {
        let computerChoice = Math.floor(Math.random() * 10)
        currentNumberTotal += computerChoice
        currentNumberTotalHTML.textContent = 'The current total is ' + currentNumberTotal
        currentNumberTotalResults.textContent = `${playersArray[1]} chose the number ` + computerChoice
    }, 900)
    setTimeout(() => {
        currentNumberTotalResults.textContent = 'Your turn...'
        getWinner()
        //get a new set of random cards
        setPlayerCards(3)
    }, 2000)
}

function playGame() {
    currentPlayerCardsHTML.addEventListener('click', selectCard)

    function selectCard(e) {
        //if game ends, disable buttons
        if (currentNumberTotal >= hiddenNumber)  {
            //prevent click events during AI turn
            const buttons = currentPlayerCardsHTML.querySelectorAll("button")

            Array.from(buttons).forEach(btn => {
                btn.disabled = true
            })
            return 
        }

        currentPlayerId = 0
        //reenable click if players turn
        const buttons = currentPlayerCardsHTML.querySelectorAll("button")

        Array.from(buttons).forEach(btn => {
            btn.disabled = false
        })

        if (!e.target.closest("button")) return
        setCurrentNumberTotal(e.target.textContent)

        getWinner()

        //await some time for computer to decide
        getComputerChoice()

        currentPlayerCardsHTML.removeEventListener('mouseup', selectCard)
    }
}

function initGame() {
    setPlayerCards(3)

    setCurrentNumberTotal(currentNumberTotal)

    currentNumberTotalResults.textContent = 'Your turn...'

    playGame()
    
}

//run the game
initGame()