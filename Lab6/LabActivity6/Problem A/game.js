/* Variables to store the game scores */
let wins = 0;
let losses = 0;
let draws = 0;

/* Store all round results */
let results = [];

/* Store game status */
let gameStarted = false;

/* Store round number */
let round = 0;

/* Function to start the game */
function startGame() {

    // Get player's name
    let name = document.getElementById("playerName").value;

    // Check if the name is empty
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    // Set game status to started
    gameStarted = true;

    // Display welcome message
    document.getElementById("welcome").innerHTML =
        "Welcome, " + name + "!";

    // Display start date and time
    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();

}


/* Function to generate computer choice */
function getComputerChoice() {

    // Array containing three choices
    let choices = ["rock", "paper", "scissors"];

    // Generate random number from 0 to 2
    let randomIndex = Math.floor(Math.random() * 3);

    // Return computer choice
    return choices[randomIndex];

}

/* Function to play one round */
function playRound(playerChoice) {

    // Check whether the game has started
    if (gameStarted === false) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer choice
    let computerChoice = getComputerChoice();

    // Variables for result and image
    let result = "";
    let resultColor = "";

    // Check the winner
    if (playerChoice === computerChoice) {

        result = "Draw";
        resultColor = "grey";
        draws++;

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {

        result = "Win";
        resultColor = "green";
        wins++;

    } else {

        result = "Lose";
        resultColor = "red";
        losses++;

    }

    // Change player image
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    // Change computer image
    document.getElementById("computerImg").src =
        computerChoice + ".png";

    // Display result and colour
    document.getElementById("result").innerHTML =
        "You chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". You " + result + "!";

    document.getElementById("result").style.color =
        resultColor;

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array
    results.push(result);

    // Increase round number
    round++;

    // Set table row colour according to the result
    let rowColor = "";

    if (result === "Win") {
        rowColor = "win";
    } else if (result === "Lose") {
        rowColor = "lose";
    } else {
        rowColor = "draw";
    }

    // Add round information to history table
    document.getElementById("history").innerHTML +=
        "<tr class='" + rowColor + "'>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + result + "</td>" +
        "</tr>";

    // Clear previous summary
    document.getElementById("summary").innerHTML = "";

}

/* Function to show game summary */
function showSummary() {
    let totalWins = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let totalRounds = results.length;
    let percentage = 0;

    if (totalRounds > 0) {
        percentage = Math.round((totalWins / totalRounds) * 100);
    }

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";
}

/* Function to reset the game */
function resetGame() {

    // Reset all scores
    wins = 0;
    losses = 0;
    draws = 0;

    // Empty results array
    results = [];

    // Reset round number
    round = 0;

    // Set game status to not started
    gameStarted = false;

    // Update scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear history table but keep header
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";

    // Clear result and summary
    document.getElementById("result").innerHTML =
        "Start the game to play!";

    document.getElementById("summary").innerHTML = "";

    // Clear welcome message and start time
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    // Clear player's name
    document.getElementById("playerName").value = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

}
