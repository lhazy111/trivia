let formInput = document.getElementById('add-question');
formInput.addEventListener("submit", createNewQuestion);

function createNewQuestion() {
    let newQuestionObject = {
        question: formInput.question.value,
        choiceA: formInput.choiceA.value,
        choiceB: formInput.choiceB.value,
        choiceC: formInput.choiceC.value,
        choiceD: formInput.choiceD.value,
        correct: formInput.correct.value,
    };


    if (localStorage.getItem("Questions")) {
        let Questions = JSON.parse(localStorage.getItem("Questions"));
        //alert('dodanie1');
        //alert(questionsStorage.question);
        //alert(newQuestionObject.question);
        Questions.push(newQuestionObject);
        //alert('dodanie2');
        localStorage.setItem('Questions', JSON.stringify(Questions));
        //alert('dodano?');
    } else {
        // alert(newQuestion.question);
        localStorage.setItem("Questions", JSON.stringify([newQuestionObject]));

    }
    formInput.reset();
}

