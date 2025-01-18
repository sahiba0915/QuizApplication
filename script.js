document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedChoice = null;

    const questions = [
        {
            question: "What is the capital of India?",
            choices: ["Delhi", "Haryana", "Gurgaon", "Mumbai"],
            answer: "Delhi"
        },
        {
            question: "What is the national flower of India?",
            choices: ["Lotus", "Jasmine", "Lily", "Rose"],
            answer: "Lotus"
        },
    ];

    // Load progress from localStorage
    function loadProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('quizProgress'));
        if (savedProgress) {
            currentQuestionIndex = savedProgress.currentQuestionIndex || 0;
            score = savedProgress.score || 0;
        }
    }

    // Save progress to localStorage
    function saveProgress() {
        localStorage.setItem('quizProgress', JSON.stringify({
            currentQuestionIndex,
            score
        }));
    }

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        if (selectedChoice) {
            const correctAnswer = questions[currentQuestionIndex].answer;
            if (selectedChoice.textContent === correctAnswer) {
                score++;
            }
        }
        currentQuestionIndex++;
        selectedChoice = null;
        saveProgress(); // Save progress after each question

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        selectedChoice = null;
        resultContainer.classList.add('hidden');
        localStorage.removeItem('quizProgress'); // Clear progress on restart
        startQuiz();
    });

    function startQuiz() {
        loadProgress(); // Load progress if available
        questionContainer.classList.remove('hidden');
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add('hidden');
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach((choice) => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.classList.add('choice-item');
            li.addEventListener('click', () => selectAnswer(li));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(choiceElement) {
        if (selectedChoice) {
            selectedChoice.style.backgroundColor = "";
        }
        selectedChoice = choiceElement;
        selectedChoice.style.backgroundColor = "lightblue";
        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }

    // Initialize quiz
    loadProgress();
    if (currentQuestionIndex > 0 || score > 0) {
        // If there is progress, show the quiz interface directly
        startQuiz();
    }
});
