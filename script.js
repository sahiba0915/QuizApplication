document.addEventListener('DOMContentLoaded', ()=> {
     const startBtn = document.getElementById('start-btn')
     const nextBtn = document.getElementById('next-btn')
     const restartBtn = document.getElementById('restart-btn')
     const questionContainer = document.getElementById('question-container')
     const questionText = document.getElementById('question-text')
     const choicesList = document.getElementById('choices-list')
     const resultContainer = document.getElementById('result-container')
     const scoreDisplay = document.getElementById('score')

     let currentQuestionIndex = 0;
     let score = 0;


    const questions = [
        {
            question: "What is the capital of India ?",
            choices: ["Delhi", "Haryana", "Gurgaon", "Mumbai"],
            answer: "Delhi"
        },
        {
            question: "What is the national flower of India ?",
            choices: ["Lotus", "Jasmine", "Lily", "Rose"],
            answer: "Lotus"
        },
    ]

    startBtn.addEventListener('click', startQuiz)

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }else{
            showResult()
        }
    })

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hidden');
        startQuiz();
    })

    function startQuiz(){
      questionContainer.classList.remove('hidden');
      startBtn.classList.add('hidden');
      resultContainer.classList.add('hidden');
      showQuestion();

    }

    function showQuestion() {
        nextBtn.classList.remove('hidden');
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML="";
        questions[currentQuestionIndex].choices.forEach((choice) =>{
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(choice))
            choicesList.appendChild(li)
        })
    }

    function selectAnswer(choice){
        const correctAnswer = questions[currentQuestionIndex].answer;
        if(choice === correctAnswer){
            score++
        }
        nextBtn.classList.remove('hidden')
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }
    
})