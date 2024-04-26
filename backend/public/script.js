const question = document.querySelector("#question");

function fillQuestionElements(data) {
  question.innerText = data.question;
  for (const i in data.answers) {
    const answerElement = document.querySelector(`#answer${Number(i)+1}`);
    answerElement.innerText = data.answers[i]
}
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      fillQuestionElements(data);
    });
}

showNextQuestion();
