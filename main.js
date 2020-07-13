

document.getElementById("navbar").style.opacity = "0.7";
document.getElementById("questionBox").style.opacity = "0.9";
let question = document.getElementById("question");
let answerA = document.getElementById("choiceA");
let answerB = document.getElementById("choiceB");
let answerC = document.getElementById("choiceC");
let answerD = document.getElementById("choiceD");
let submit = document.getElementById('submit');
let quizStatus = document.getElementById('quizStatus'); //shows question counter  n-th question/all
let questionNumber = 0;


let questions = [];             //array to store questions
let isUserAnswerOK = [];         //Store true if answered OK otherwise false
let defaultQuestions = [];      //Store a default set of 5 questions
let userQuestions;             //Store user-submitted questions in local storage
let choices = document.getElementsByName('choices');


defaultQuestions = [
    {
        question: "Where are the three smallest bones in the human body?",
        choiceA: "middle ear",
        choiceB: "nose",
        choiceC: "toes",
        choiceD: "eyes",
        correct: "A"
    },
    {
        question: "What is the most abundant element in the Universe?",
        choiceA: "Helium",
        choiceB: "Oxygen",
        choiceC: "Lithium",
        choiceD: "Hydrogen",
        correct: "D"
    },
    {
        question: "Approximately how long does it take for light to travel from the Sun's surface to the Earth?",
        choiceA: "8 days",
        choiceB: "8 seconds",
        choiceC: "8 minutes",
        choiceD: "8 hours",
        correct: "C"
    }
];


if (localStorage.getItem("Questions")) {
    questions = defaultQuestions.concat(JSON.parse(localStorage.getItem("Questions")));
} else {
    questions = defaultQuestions;
}



questionSetDisplay(questionNumber); //display first question
submit.addEventListener('click', whichAnswer);





function whichAnswer() {
    for (i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            isUserAnswerOK.push(compareAnswer(choices[i].value, questions[questionNumber].correct));
            choices[i].checked = false;
            nextQuestion();
            return;
        }
    } alert('choose answer');
}


function nextQuestion() {
    if (questionNumber + 1 == questions.length) {
        //submit.removeEventListener ('click', nextQuestion);
        document.getElementById('questionBox').style.display = 'none';
        endGame();
    } else {
        questionNumber++;
        questionSetDisplay(questionNumber)
    }
}

function questionSetDisplay(qNumber) {
    question.innerText = questions[qNumber].question;
    answerA.innerText = `  ${questions[qNumber].choiceA}`;
    answerB.innerText = `  ${questions[qNumber].choiceB}`;
    answerC.innerText = `  ${questions[qNumber].choiceC}`;
    answerD.innerText = `  ${questions[qNumber].choiceD}`;
    quizStatus.innerText = 'Question ' + (qNumber + 1) + '/' + questions.length;
}

function compareAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        return true;
    } else {
        return false;
    }

}

function endGame() {
    let finalMessage = document.getElementById('finalMessage');
    finalMessage.style.display = 'initial';
    let scoreList = document.createElement('ul');
    finalMessage.appendChild(scoreList);
    for (i = 0; i < questions.length; i++) {
        let listElement = document.createElement('li');
        if (isUserAnswerOK[i]) {
            listElement.style.color = 'green';
            listElement.innerHTML = 'Question ' + (i + 1) + ': CORRECT';
        } else {
            listElement.style.color = 'red';
            listElement.innerHTML = 'Question ' + (i + 1) + ': WRONG';
        }
        scoreList.appendChild(listElement);
    }
    document.getElementById('options').style.display = 'initial';

}
