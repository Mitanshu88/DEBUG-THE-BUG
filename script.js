const questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the largest planet in our solar system?", answers: ["Earth", "Jupiter", "Saturn", "Mars"], correct: 1 },
    { question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
    { question: "What is the fastest land animal?", answers: ["Elephant", "Lion", "Cheetah", "Horse"], correct: 2 },
    { question: "Who painted the Mona Lisa?", answers: ["Picasso", "Da Vinci", "Van Gogh", "Michelangelo"], correct: 1 },
    { question: "What is the boiling point of water?", answers: ["100°C", "50°C", "0°C", "150°C"], correct: 0 },
    { question: "What is the longest river in the world?", answers: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
    { question: "Who is the author of 'Harry Potter'?", answers: ["J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling", "C.S. Lewis"], correct: 2 },
    { question: "Which element has the chemical symbol 'O'?", answers: ["Oxygen", "Osmium", "Ozone", "Opium"], correct: 0 },
    { question: "What is the smallest country in the world?", answers: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Venus", "Jupiter"], correct: 1 },
    { question: "What is the largest animal on Earth?", answers: ["Elephant", "Blue Whale", "Shark", "Giraffe"], correct: 1 },
    { question: "Who developed the theory of relativity?", answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Marie Curie"], correct: 1 },
    { question: "What is the hardest natural substance?", answers: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2 },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 90;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap elements
    }
}

function startQuiz() {
    shuffleQuestions(); // Shuffle questions every time the quiz starts

    // Request Fullscreen
    enterFullscreen();

    // Hide intro screen and show quiz container
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
    disableExitFullscreen();  // Prevent exit attempt after entering fullscreen
}

function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome and Safari
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function disableExitFullscreen() {
    // Disable the Escape key press to prevent exiting fullscreen mode
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            event.preventDefault(); // Prevent the escape key from exiting fullscreen
            enterFullscreen();  // Re-enter fullscreen mode if the user presses Escape
        }
    });
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    // Display question number along with the question text
    document.getElementById("question").textContent = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    const answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.onclick = () => checkAnswer(index);
        answersElement.appendChild(answerButton);
    });

    timeLeft = 90;
    startTimer();
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        score++;
    }
    stopTimer();
    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("next-button").disabled = true;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const percentage = (score / questions.length) * 100;
    document.getElementById("quiz-container").innerHTML = `
        <h1>Quiz Complete!</h1>
        <p>Your Score: ${score} out of ${questions.length}</p>
        <p>Your Percentage: ${percentage.toFixed(2)}%</p>
    `;
}

window.onload = () => {
    // Initially show the intro page
    document.getElementById("intro-container").style.display = "block";
};
