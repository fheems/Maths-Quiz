const questions = [
    {
        question: "What is 12 x 2 ?",
        choices: ["31", "4", "24", "26"],
        answer: "24"
    },
    {
        question: "What is 112 x 2 ?",
        choices: ["31", "224", "124", "526"],
        answer: "224"
    },
    {
        question: "What is 1017 + 2?",
        choices: ["1018", "1004", "598", "1019"],
        answer: "1019"
    },
    {
        question: "What is 222 x 2 ?",
        choices: ["444", "4", "24", "26"],
        answer: "444"
    },
    {
        question: "What is 120 x 2 ?",
        choices: ["31", "4", "240", "26"],
        answer: "240"
    },
    {
        question: "What is 52 x 2 ?",
        choices: ["31", "104", "24", "26"],
        answer: "104"
    },
    {
        question: "What is 12 x 6 ?",
        choices: ["31", "72", "24", "26"],
        answer: "72"
    },
    {
        question: "What is 92 x 2 ?",
        choices: ["31", "4", "24", "184"],
        answer: "184"
    },
    {
        question: "What is 80 x 80 ?",
        choices: ["31", "4", "24", "1600"],
        answer: "1600"
    },
    {
        question: "What is 12 x 20 ?",
        choices: ["31", "4", "240", "26"],
        answer: "240"
    }
];
// quiz questions above 
let currentQuestionIndex = 0;
let timeLeft = 10;
let timer;
let correctAnswers = 0;
// function to start timer below 
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            skipQuestion();
        }
    }, 1000);
}
// function to load questions below 
function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    startTimer();

    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    questionElement.textContent = questions[currentQuestionIndex].question;
    choicesElement.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        choicesElement.appendChild(button);
    });

    document.getElementById("total-questions").textContent = questions.length;
    document.getElementById("correct-count").textContent = correctAnswers;
}
// function to check if answer is right below 

function checkAnswer(selectedChoice) {
    if (selectedChoice === questions[currentQuestionIndex].answer) {
        correctAnswers++;
    }
    showMessage(selectedChoice === questions[currentQuestionIndex].answer ? "Correct!" : "Wrong!");
}

function skipQuestion() {
    showMessage("Skipped! You get 0 points for this question.");
}

function showMessage(message) {
    clearInterval(timer);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("message-container").style.display = "block";
    document.getElementById("message").textContent = message;
}

function continueQuiz() {
    document.getElementById("message-container").style.display = "none";
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("quiz-container").style.display = "block";
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("message-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("result").textContent = `You got ${correctAnswers} out of ${questions.length} correct!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    loadQuestion();
}

window.onload = () => {
    loadQuestion();
};
