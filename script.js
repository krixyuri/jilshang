const questions = [
    {
        questions: "Ano ang pinaka-masakit marinig?",
        answer: [
            { text: "Friend lang tingin ko sa’yo.", correct: false },
            { text: "Hindi ikaw ang pinili", correct: true },
            { text: "Move on ka na", correct: false },
            { text: "Masaya na ako sa iba.", correct: false },
        ]
    },
    {
        questions: "Ano ang masakit tanggapin?",
        answer: [
            { text: "Hindi ka sapat", correct: false },
            { text: "Hindi ka niya pinaglaban", correct: false },
            { text: "May mahal siyang iba", correct: false },
            { text: "Hindi na siya babalik", correct: true },
        ]
    },
    {
        questions: "Ano ang pinaka-masakit na chat?",
        answer: [
            { text: "Sorry", correct: false },
            { text: "Salamat sa lahat", correct: false },
            { text: "Hanggang dito na lang tayo", correct: true },
            { text: "May iba na ako.", correct: false },
        ]
    },
    {
        questions: "Ano ang pinaka-mahirap tanggapin?",
        answer: [
            { text: "Nagbago siya", correct: false },
            { text: "Hindi ka na niya kailangan", correct: false },
            { text: "May iba na siyang kasama", correct: false },
            { text: "Hindi na siya babalik", correct: true },
        ]
    },
    {
        questions: "Ano ang pinaka-mahirap marinig mula sa taong mahal mo?",
        answer: [
            { text: "Pagod na ako.", correct: false },
            { text: "Ayoko na.", correct: false },
            { text: "Mas mahal ko siya.", correct: false },
            { text: "Hindi na kita mahal.", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const videoElement = document.getElementById("result-video");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    videoElement.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.style.background = "green";
        score++;
    } else {
        selectedBtn.style.background = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.background = "green";
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNext() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showVideo();
    }
}

function showVideo() {
    resetState();

    questionElement.innerHTML = "Masakit??:(";

    videoElement.style.display = "block";
    videoElement.play();

    nextButton.style.display = "none";
}

nextButton.addEventListener("click", handleNext);

startQuiz();