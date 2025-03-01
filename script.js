// Import required module for handling command line input/output
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define difficulty levels with their respective attempts
const DIFFICULTY_LEVELS = {
  1: { name: "Easy", attempts: 10 },
  2: { name: "Medium", attempts: 5 },
  3: { name: "Hard", attempts: 3 },
};

// Helper function to prompt user with questions and return answers
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Function to handle difficulty level selection
async function selectDifficulty() {
  let choice;
  while (true) {
    console.log("\nPlease select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");
    choice = await askQuestion("Enter your choice (1-3): ");

    if (["1", "2", "3"].includes(choice)) break;
    console.log("Invalid input! Please enter 1, 2, or 3.");
  }
  return parseInt(choice);
}

// Function to validate user's guess input
async function getValidGuess() {
  let guess;
  while (true) {
    guess = await askQuestion("Enter your guess: ");
    const number = parseInt(guess);

    if (!isNaN(number) && number >= 1 && number <= 100) {
      return number;
    }
    console.log("Invalid input! Please enter a number between 1 and 100.");
  }
}

// Main game logic
async function playGame() {
  // Display welcome message
  console.log("\nWelcome to the Number Guessing Game!");
  console.log("I'm thinking of a number between 1 and 100.");

  // Get difficulty level
  const difficultyChoice = await selectDifficulty();
  const { name: levelName, attempts } = DIFFICULTY_LEVELS[difficultyChoice];
  console.log(
    `\nGreat! You've chosen ${levelName} difficulty with ${attempts} attempts.`
  );

  // Generate random number
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let attemptsLeft = attempts;
  let attemptsUsed = 0;

  // Game loop
  while (attemptsLeft > 0) {
    console.log(
      `\nYou have ${attemptsLeft} ${
        attemptsLeft === 1 ? "chance" : "chances"
      } left.`
    );

    // Get valid guess from user
    const guess = await getValidGuess();
    attemptsUsed++;
    attemptsLeft--;

    // Check guess against target number
    if (guess === targetNumber) {
      console.log(
        `\nCongratulations! You guessed the number in ${attemptsUsed} attempts!`
      );
      rl.close();
      return;
    }

    // Provide hint
    console.log(
      `Incorrect! The number is ${
        guess < targetNumber ? "greater" : "less"
      } than ${guess}.`
    );
  }

  // Player ran out of attempts
  console.log(
    `\nGame Over! The number was ${targetNumber}. Better luck next time!`
  );
  rl.close();
}

// Start the game
playGame();
