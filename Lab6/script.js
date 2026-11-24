// Array that stores all quiz questions, options and correct answers.
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<p>"],
        answer: "<a>"
    },
    {
        question: "Which CSS property changes the text colour?",
        options: [
            "font-style",
            "background-color",
            "color",
            "text-size"
        ],
        answer: "color"
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: "#"
    },
    {
        question: "Which language is used to add interactivity to a web page?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword declares a variable that cannot be reassigned?",
        options: ["var", "let", "const", "new"],
        answer: "const"
    },
    {
        question: "Which HTML tag is used to display an image?",
        options: ["<image>", "<img>", "<picture-text>", "<src>"],
        answer: "<img>"
    },
    {
        question: "Which CSS property controls the space outside an element?",
        options: ["padding", "border", "margin", "spacing"],
        answer: "margin"
    },
    {
        question: "Which method displays a message in the browser console?",
        options: [
            "console.log()",
            "document.write()",
            "alert.console()",
            "print()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which HTML attribute provides alternative text for an image?",
        options: ["title", "src", "alt", "href"],
        answer: "alt"
    }
];

// Get HTML elements
const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const timeElement = document.getElementById("time");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

const submitButton = document.getElementById("submit-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// Variables used by the quiz
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 15;
let answerSubmitted = false;

// Randomly rearranges the questions
function shuffleQuestions() {

    for (let i = questions.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
        [questions[j], questions[i]];
    }
}

// Starts the countdown timer
function startTimer() {

    clearInterval(timer);

    timeLeft = 15;
    timeElement.textContent = timeLeft;

    timer = setInterval(function() {

        timeLeft--;

        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            checkAnswer(true);
        }

    }, 1000);
}

// Displays the current question and answer options
function displayQuestion() {

    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionElement.textContent = currentQuestion.question;

    answerOptions.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "";

    selectedAnswer = null;
    answerSubmitted = false;

    submitButton.disabled = false;
    nextButton.disabled = true;

    progressBar.style.width =
        `${(currentQuestionIndex / questions.length) * 100}%`;


    currentQuestion.options.forEach(function(option) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = option;
        button.className = "answer-option";

        button.addEventListener("click", function() {

            if (answerSubmitted) return;

            selectedAnswer = option;

            const allOptions =
                answerOptions.querySelectorAll(".answer-option");

            allOptions.forEach(function(item) {

                item.classList.remove("selected");

            });

            button.classList.add("selected");

        });

        answerOptions.appendChild(button);

    });

    startTimer();
}

// Checks whether the selected answer is correct
function checkAnswer(timeExpired = false) {

    if (answerSubmitted) return;

    if (selectedAnswer === null && !timeExpired) {

        feedback.textContent = "Please select an answer first.";

        feedback.className = "feedback-incorrect";

        return;
    }

    answerSubmitted = true;

    clearInterval(timer);

    submitButton.disabled = true;
    nextButton.disabled = false;

    const currentQuestion = questions[currentQuestionIndex];

    const allOptions =
        answerOptions.querySelectorAll(".answer-option");

    allOptions.forEach(function(button) {

        button.disabled = true;

        if (button.textContent === currentQuestion.answer) {

            button.classList.add("correct");

        } else if (button.textContent === selectedAnswer) {

            button.classList.add("incorrect");

        }

    });

    if (timeExpired) {

        feedback.textContent =
            `Time is up! The correct answer is: ${currentQuestion.answer}`;

        feedback.className = "feedback-incorrect";

    } else if (selectedAnswer === currentQuestion.answer) {

        score++;

        feedback.textContent = "Correct! Well done.";

        feedback.className = "feedback-correct";

    } else {

        feedback.textContent =
            `Incorrect. The correct answer is: ${currentQuestion.answer}`;

        feedback.className = "feedback-incorrect";

    }


    if (currentQuestionIndex === questions.length - 1) {

        nextButton.textContent = "View Results";

    }
}

// Moves to the next question
function nextQuestion() {

    if (!answerSubmitted) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        displayQuestion();

    } else {

        showResult();

    }
}

// Displays the final result
function showResult() {

    clearInterval(timer);

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;


    if (score === questions.length) {

        resultMessage.textContent =
            "Excellent! You answered all questions correctly.";

    } else if (score >= questions.length / 2) {

        resultMessage.textContent =
            "Good job! Keep practising to improve your score.";

    } else {

        resultMessage.textContent =
            "Keep learning and try the quiz again!";

    }
}

// Starts the quiz
function startQuiz() {

    clearInterval(timer);

    currentQuestionIndex = 0;

    score = 0;

    shuffleQuestions();

    quizSection.classList.remove("hidden");

    resultSection.classList.add("hidden");

    nextButton.textContent = "Next Question";

    displayQuestion();
}

// Button event listeners
submitButton.addEventListener("click", function() {

    checkAnswer();

});

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", startQuiz);

// Start the quiz when the page loads
startQuiz();
