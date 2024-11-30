const questions = [
    {
        question: "Го няшится?",
        answers: ["A: Го", "B: Не("],
        correct: "A"
    },
    {
        question: "Я ушел за хлебом, твои дейсвия?",
        answers: ["A: Кинуть в лютый игнорчик", "B: Погладить по головке", "C: Нагнуть у тумбочки"],
        correct: "C"
    },
    {
        question: "А теперь доверься своей интуиции!",
        answers: ["A: Этот вариант", "B: Этот", "C: Или этот"],
        correct: "B"
    },
    {
        question: "Сколько мне лет?",
        correct: "17"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

function showQuestion() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("result");

    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        answersElement.innerHTML = "";

        if (currentQuestion === 3) {
            // Создаем поле для ввода для четвертого вопроса
            const input = document.createElement("input");
            input.type = "text";
            input.id = "answerInput";
            input.placeholder = "Введите ответ";
            answersElement.appendChild(input);

            const submitBtn = document.createElement("button");
            submitBtn.textContent = "Отправить";
            submitBtn.id = "submitBtn";
            submitBtn.onclick = () => checkInputAnswer();
            answersElement.appendChild(submitBtn);
        } else {
            // Для остальных вопросов создаем кнопки
            questions[currentQuestion].answers.forEach(answer => {
                const btn = document.createElement("button");
                btn.textContent = answer;
                btn.className = "answer-btn";
                btn.onclick = () => checkAnswer(answer[0]);
                answersElement.appendChild(btn);
            });
        }

        resultElement.textContent = "";
    } else {
        questionElement.textContent = `Поздравляем! Вы умничка и вас сегодня будут обнимать у тумбочки! Правильных ответов: ${correctAnswers} из ${questions.length}`;
        answersElement.innerHTML = "";
        resultElement.textContent = "";
        document.getElementById("music").play();
    }
}

function checkAnswer(answer) {
    const resultElement = document.getElementById("result");
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        if (btn.textContent[0] === answer) {
            if (answer === questions[currentQuestion].correct) {
                btn.classList.add("correct");
                resultElement.textContent = "Умничка :)";
                correctAnswers++;
            } else {
                btn.classList.add("incorrect");
                resultElement.textContent = "А хуй тебе!";
            }
        }
    });

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500); // Увеличим задержку, чтобы пользователь успел прочитать сообщение
}

function checkInputAnswer() {
    const resultElement = document.getElementById("result");
    const input = document.getElementById("answerInput");
    const answer = input.value.trim();

    if (answer === questions[currentQuestion].correct) {
        resultElement.textContent = "Умничка :)";
        input.classList.add("correct");
        correctAnswers++;
    } else {
        resultElement.textContent = "А хуй тебе!";
        input.classList.add("incorrect");
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500); // Увеличим задержку, чтобы пользователь успел прочитать сообщение
}

showQuestion();
