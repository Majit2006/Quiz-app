const quizApp = {
  data() {
    return {
      isScoreVisible: false,
      questionCount: 0,
      selectedAnswer: "",
      correctAnswers: [],
      results: [
        {
          question: 'The book "The Little Prince" was written by...',
          correct_answer: "Antoine de Saint-Exupéry",
          selectedAnswer: "",
          incorrect_answers: [
            "Miguel de Cervantes Saavedra",
            "Jane Austen",
            "F. Scott Fitzgerald",
          ],
        },
        {
          question:
            "Which novel by John Grisham was conceived on a road trip to Florida while thinking about stolen books with his wife?",
          selectedAnswer: "",
          correct_answer: "Camino Island",
          incorrect_answers: [
            "Rogue Lawyer",
            "Gray Mountain",
            "The Litigators",
          ],
        },
        {
          question:
            'In Terry Pratchett\'s Discworld novel "Wyrd Sisters", which of these are not one of the three main witches?',
          selectedAnswer: "",
          correct_answer: "Winny Hathersham",
          incorrect_answers: [
            "Granny Weatherwax",
            "Nanny Ogg",
            "Magrat Garlick",
          ],
        },
      ],
    };
  },
  methods: {
    nextQuestion() {
      if (this.questionCount < this.results.length - 1) {
        this.questionCount++;
      }
      // Clear selected answer as you advance through the questions
      this.selectedAnswer = "";
    },
    prevQuestion() {
      if (this.questionCount >= 1) {
        this.questionCount--;
      }
    },
    checkAnswer(answer) {
      let answersList = document.querySelectorAll("ul.answers li");
      answersList.forEach(function (item) {
        item.removeAttribute("class");
      });

      // check if the clicked anwser is equal to the correct answer
      this.selectedAnswer = answer;
      if (answer == this.results[this.questionCount].correct_answer) {
        // Update the correct answers arary (make sure thare are no duplicates)
        if (this.correctAnswers.indexOf(answer) === -1) {
          this.correctAnswers.push(answer);
        }
        // Add correct answer class
        event.target.classList.add("text-white", "bg-success");
      } else {
        // Add incorrect answer
        event.target.classList.add("text-white", "bg-danger");
      }
    },
    showScore() {
      // Answers J
      this.isScoreVisible = true;
    },
    resetQuiz() {
      // Score Reset
      this.questionCount = 0;
      this.correctAnswers = [];
      this.selectedAnswer = "";
      this.isScoreVisible = false;
    },
    removeElementFromArray(arr, elm) {
      return arr.filter((el) => el !== elm);
    },
    shuffle(arr) {
      var len = arr.length;
      var d = len;
      var array = [];
      var k, i;
      for (i = 0; i < d; i++) {
        k = Math.floor(Math.random() * len);
        array.push(arr[k]);
        arr.splice(k, 1);
        len = arr.length;
      }
      for (i = 0; i < d; i++) {
        arr[i] = array[i];
      }
      return arr;
    },
  },
  computed: {
    answers() {
      let incorrectAnswers = this.results[this.questionCount].incorrect_answers;
      let correctAnswer = this.results[this.questionCount].correct_answer;
      // return all answers, shuffled
      return this.shuffle(incorrectAnswers.concat(correctAnswer));
    },
    showScoreBtn() {
      return (
        this.questionCount + 1 == this.results.length &&
        this.selectedAnswer != ""
      );
    },
  },
};

Vue.createApp(quizApp).mount("#quiz_app");
