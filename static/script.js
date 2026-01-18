let currentQuestionIndex = 0;
let score = 0;
let questions = [];

document.addEventListener("DOMContentLoaded", function() {
    // Fetch quiz questions from Flask API
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion();
        });

    document.getElementById('next-btn').addEventListener('click', nextQuestion);
});

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    const optionsList = document.getElementById('options');
    optionsList.innerHTML = ''; // Clear previous options

    question.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => checkAnswer(option);
        optionsList.appendChild(li);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    // Show "Next" button after answer is selected
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('next-btn').disabled = true;
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = score + '/' + questions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    loadQuestion();
    document.getElementById('next-btn').disabled = true;
}
