const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "You win!";
    return;
  }
  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Not this time. :-( Try again later";
    return;
  }
  question.innerText = data.question;
  for (const i in data.answers) {
    const answerElement = document.querySelector(`#answer${Number(i) + 1}`);
    answerElement.innerText = data.answers[i];
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

const goodAnswersSpan = document.querySelector("#good-answers");

function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => {
      handleAnswerFeedback(data);
    });
}
const buttons = document.querySelectorAll(".answer-btn");

for (const butoon of buttons) {
  butoon.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
const tipDiv = document.querySelector("#tip");

function handleFriendsAnswer(data) {
  tipDiv.innerText = data.text;
}

function callToAFriend() {
  fetch("/help/friend", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      handleFriendsAnswer(data);
    });
}
document
  .querySelector("#call-to-a-friend")
  .addEventListener("click", callToAFriend);

function handleHalfOnHalfAnswer(data) {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = " ";
      }
    }
  }
}

function halfOnHalf() {
  fetch("/help/half", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      handleHalfOnHalfAnswer(data);
    });
}
document.querySelector("#half-on-half").addEventListener("click", halfOnHalf);

function handleQuestionToTheCrowd(data) {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    data.chart.forEach((percent, index) => {
      buttons[index].innerText = `${buttons[index].innerText} : ${percent}%`;
    });
  }
}

function questionToTheCrowd() {
  fetch("/help/crowd", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => {
      handleQuestionToTheCrowd(data);
    });
}
document
  .querySelector("#question-to-the-crowd")
  .addEventListener("click", questionToTheCrowd);
