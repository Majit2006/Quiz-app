<template>
  <div>
    <div
      id="quiz_app"
      class="container d-flex flex-column justify-content-center my-3"
    >
      <h2 class="display-4 category-name">
        {{ results[questionCount].category }}
      </h2>
      <div class="questions d-flex flex-column algin-items-center">
        <div
          class="card shadow-sm"
          v-if="results.length"
          :class="{ 'bg-light': isScoreVisible }"
        >
          <div class="results my-auto text-center">
            <h5 class="mb-3">
              Your Result: {{ correctAnswers.length }} / {{ results.length }}
            </h5>
            <a href="#" class="btn btn-md bg-dark" @click="resetQuiz">
              <i class="fas fa-sync-alt"></i> Play again
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="template">
      <div class="card-header bg-light h6">
        {{ results[questionCount].question }}
      </div>
      <div class="card-body">
        <ul class="answers list-unstyled m-0">
          <li
            v-for="(answer, index) in results[questionCount].incorrectAnswers"
            :key="index.id"
            @click="checkAnswer(answer)"
          >
            {{ answer }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card-footer bg-white">
      <ul class="page">
        <li>
          <a href="#" class="bg-dark" :class="{ disabled: questionCount == 0 }"
            >Previous</a
          >
        </li>
        <li
          class="d-flex algin-items-center text-secondary font-weight-bold small"
        >
          Question {{ questionCount + 1 }} of {{ results.length }}
        </li>
        <li v-if="howScoreBtn">
          <a href="#" class="bg-dark" @click="showScore">Score</a>
        </li>
        <li>
          <a
            href="#"
            class="bg-dark"
            :class="{ disabled: selectedAnswer == '' }"
            @click="nextQuestion"
            >Next</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isScoreVisible: false,
      questionCount: 0,
      selectedAnswer: [],
      correctAnswers: [],
      results: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=arts_and_literature,food_and_drink,film_and_tv,general_knowledge,geography,history,music,science,society_and_culture,sport_and_leisure&limit=20&difficulty=hard"
      )
      .then((response) => {
        this.results = response.data;
        this.results.forEach((question) => {
          question.incorrectAnswers.push(question.correctAnswer);
          question.incorrectAnswers.sort(() => Math.random() - 0.5);
        });
        console.log(response.data);
      });
  },
  methods: {
    nextQuestion() {
      if (this.questionCount < this.results.length - 1) {
        this.questionCount++;
      }
    },
    prevQuestion() {
      if (this.questionCount >= 1) {
        this.questionCount--;
      }
    },
    checkAnswer(answer) {
      let answerList = document.querySelectorAll("ul.answers li");
      answerList.forEach(function(item) {
        item.removeAttribute("class");
      });
      this.selectedAnswer = answer;
      if (answer == this.results[this.questionCount].correctAnswers) {
        if (this.correctAnswers.indexOf(answer) === -1) {
          this.correctAnswers.push(answer);
        }
        event.target.classList.add("text-white", "bg-success");
      } else {
        event.target.classList.add("text-white", "bg-danger");
      }
    },
    showScore() {
      this.isScoreVisible = true;
    },
    resetQuiz() {
      this.questionCount = 0;
      this.correctAnswers = [];
      this.selectedAnswer = "";
      this.isScoreVisible = false;
    },
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
  computed: {
    // answers() {
    //   let incorrectAnswers = this.results[this.questionCount].incorrectAnswers;
    //   let correctAnswers = this.results[this.questionCount].correctAnswer;
    // },
    showScoreBtn() {
      return (
        this.questionCount + 1 == this.results.length &&
        this.selectedAnswer != ""
      );
    },
  },
};
</script>
