<template>
  <div>
    <div class="d-flex justify-content-center flex-wrap m-3" v-if="count < 20">
      <div class="card col-md-5">
        <div class="card-header bg-dark text-light  text-center">
          {{ questions[count].category }}
        </div>
        <div class="card-body bg-dark text-light">
          <h5 class="card-title text-center">
            {{ questions[count].question }}
          </h5>
          <ul class="list-group  answers">
            <li
              class="list-group-item bg-dark text-light border-light"
              v-for="(option, index) in questions[count].incorrectAnswers"
              :key="index.id"
            >
              <label for="radio">
                <input
                  class="form-check-input me-1"
                  type="radio"
                  id="radio"
                  name="radio"
                  @click="checkAnswer(option)"
                />
                {{ option }}
              </label>
            </li>
          </ul>
          <button type="submit" class="btn btn-primary mt-4" @click="++count">
            Next
          </button>
        </div>
      </div>
      {{ count }}
    </div>
    <div
      class="card col-md-5 d-flex justify-content-center  algin-item-center m-auto mt-4 bg-dark text-light"
      v-else
    >
      <div class="card-body">
        <h1 class="card-title text-center border-bottom pb-2">Quiz Result</h1>
        <div class="answers">
          <p>correct answers:{{ correctAnswers }}</p>
          <p>wrong answers:{{ wrongAnswers }}</p>
        </div>
        <div class="answers-btn border-top">
          <a href="/" class="btn btn-sm btn-primary mt-4">Go To Home</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      count: 0,
      questionsLength: 20,
      questions: [],
      selectedAnswers: [],
      correctAnswers: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=arts_and_literature,food_and_drink,film_and_tv,general_knowledge,geography,history,music,science,society_and_culture,sport_and_leisure&limit=20&difficulty=hard"
      )
      .then((response) => {
        this.questions = response.data;
        this.questions.forEach((question) => {
          question.incorrectAnswers.push(question.correctAnswer);
          question.incorrectAnswers.sort(() => Math.random() - 0.5);
        });
        console.log(response.data);
      });
  },
  methods: {
    checkAnswer(option) {
      let answersList = document.querySelectorAll("label");
      answersList.forEach(function(item) {
        item.removeAttribute("class");
      });

      this.selectedAnswers[this.count] = option;
      if (option == this.questions[this.count].correctAnswer) {
        if (this.correctAnswers.indexOf(option) === -1) {
          this.correctAnswers.push(option);
        }
        event.target.classList.add("text-white", "bg-success");
      } else {
        event.target.classList.add("text-white", "bg-danger");
      }
    },
  },
};
</script>

<style>
[type="radio"] {
  box-shadow: none !important;
}

.answers {
  display: flex;
  text-transform: capitalize;
  flex-direction: column;
}

.answers-btn {
  font-size: 20px;
}
</style>
