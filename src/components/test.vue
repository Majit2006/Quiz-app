<template>
  <div>
    <div class="card shadow-sm">
      <div class="card-header text-category">
        {{ results[answercount].category }}
      </div>
      <div class="card-body text-question text-center">
        {{ results[answercount].question }}
      </div>
      <div class="question-answers border-top border-bottom">
        <ul class="answers list-unstyled m-3">
          <li
            class="list-item mb-3 border p-2"
            v-for="(option, index) in results[answercount].incorrectAnswers"
            :key="index.id"
            @click="checkAnswer(option)"
          >
            {{ option }}
          </li>
        </ul>
        <a
          href="#"
          class="btn btn-sm text-light bg-primary m-3"
          @click="nextcount()"
          >next</a
        >
      </div>
      <p class="text-center text-danger mt-4 ">
        {{ answercount }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      results: [],
      correctanswers: [],
      selectedAnswer: [],
      answercount: 0,
      questionsLength: 20,
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
    nextcount() {
      if (this.answercount < this.results.length - 1) {
        this.answercount++;
      }
    },
    checkAnswer(option) {
      let answerList = document.querySelectorAll("li label");
      answerList.forEach((item) => {
        item.removeAttribute("class");
      });
      this.selectedAnswer[this.answercount] = option;
      if (option == this.results[this.answercount].correctAnswer) {
        if (this.correctanswers.indexOf(option) === -1) {
          this.correctanswers.push(option);
        }
        event.target.classList.add("text-light", "bg-success");
      } else {
        event.target.classList.add("text-light", "bg-danger");
      }
    },
  },
};
</script>

<style>
@import url("../../src/assets/bootstrap.css");
.text-category {
  text-align: center;
}
[type="radio"] {
  display: none;
}
</style>
