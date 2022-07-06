<template>
  <div>
    <div class="d-flex justify-content-center flex-wrap m-3 " v-if="count < 20">
      <div class="card col-md-6 box">
        <div class="card-header bg-light text-dark text-center">
          {{ questions[count].category }}
        </div>
        <div class="card-body bg-light text-dark">
          <h5 class="card-title text-center">
            {{ count }} / {{ questions[count].question }}
          </h5>
          <div class="time-progress">
            <progress
              class="mt-2 mb-2"
              max="300"
              height="4px"
              :value="countDown"
            >
            </progress>
            <!-- <p class="progress-text">{{ countDown }}</p> -->
          </div>
          <ul class="list-group  answers">
            <li
              class="list-group-item bg-primary text-light  m-2 "
              v-for="option in questions[count].incorrectAnswers"
              :key="option"
              @click="checkAnswer(option), ++count"
            >
              {{ option }}
            </li>
          </ul>
          <!-- <button
            type="submit"
            class="btn btn-primary btn-sm mt-4"
            @click="++count"
          >
            Next
          </button> -->
        </div>
      </div>
    </div>
    <div
      class="card col-md-5 d-flex justify-content-center  algin-item-center m-auto mt-4 box"
      v-else
    >
      <div class="card-body">
        <h1 class="card-title text-center border-bottom border-dark pb-2">
          Quiz Result
        </h1>
        <div class="answers">
          <p>correct answers: {{ correctAns }}</p>
          <p>wrong answers: {{ wrongAnswers }}</p>
        </div>
        <div class="answers-btn border-top border-dark">
          <a href="#" @click="resetQuiz()" class="btn btn-sm btn-primary mt-4">
            Go To Home
          </a>
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
      countDown: 300,
      timer: null,
      questionsLength: 20,
      questions: [],
      selectedAnswers: [],
      correctAnswers: [],
      correctAns: 0,
      wrongAnswers: 0,
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

    this.countDownTimer();
  },
  methods: {
    checkAnswer(option) {
      let answersList = document.querySelectorAll("ul.answers li");
      answersList.forEach(function(item) {
        item.removeAttribute("class");
      });

      this.selectedAnswers[this.count] = option;
      if (option == this.questions[this.count].correctAnswer) {
        if (this.correctAnswers.indexOf(option) === -1) {
          this.correctAnswers.push(option);
        }
        event.target.classList.add("text-white", "bg");
        this.correctAns++;
      } else {
        event.target.classList.add("text-white", "bg");
        this.wrongAnswers++;
      }
    },

    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        // this.checkAnswer(false);
        this.count = 20;
      }
    },
  },
};
</script>

<style>
@import url("../assets/bootstrap.css");
body {
  background-color: rgb(0 114 255 / 12%);
}
.box {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}
[type="radio"] {
  box-shadow: none !important;
}
.time-progress {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
}

.answers-btn {
  font-size: 20px;
}
.bg-light {
  background-color: rgb(255, 255, 255) !important;
}
li {
  border: none !important;
  list-style: none;
  margin: 10px;
  padding: 8px;
  transition: 0.3s, all 0.3s;
}

li:hover {
  background: rgb(161, 0, 235) !important;
  color: rgb(255, 255, 255) !important;
}
.bg {
  background-color: rgba(115, 180, 255, 0);
  color: red;
}
input {
  font-size: 20px;
  width: 30px;
  text-align: center;
  background: none;
  border: none;
  color: #fff;
}
progress {
  width: 300px;
  height: 30px;
}
.progress-text {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
