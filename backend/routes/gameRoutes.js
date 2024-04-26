function gameRoutes(app) {
  let goodAnswers = 0;
  let callToAFriendUsed = false;
  let questionToTheCrowd = false;
  let halfOnHalf = false;

  const questions = [
    {
      question: "What`s the most popular programming language?",
      answers: ["C++", "Java", "JavaScript", "C"],
      correctAnswer: 2,
    },
    {
      question: "Which continent is the largest?",
      answers: ["Europe", "Asia", "Africa", "North America"],
      correctAnswer: 1,
    },
    {
      question: "What`s the most popular language in the world?",
      answers: ["Spain", "Hindi", "Arabian", "English"],
      correctAnswer: 3,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;
      res.json({
        question,
        answers,
      });
    }
  });
}
module.exports = gameRoutes;
