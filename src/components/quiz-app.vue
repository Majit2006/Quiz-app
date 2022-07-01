<template>
  <div>
    <div class="card quiz-start text-center" v-if="count < 0">
      <h1>Hellow World</h1>
    </div>

    <div class="d-flex justify-content-center flex-wrap m-3" v-if="count < 20">
      <div class="card col-md-6">
        <div class="time">
          <input type="text" id="minutes" disabled />
          <input type="text" id="seconds" disabled />
        </div>
        <div class="card-header bg-dark text-light  text-center">
          {{ questions[count].category }}
        </div>
        <div class="card-body bg-dark text-light">
          <h5 class="card-title text-center">
            {{ count }} / {{ questions[count].question }}
          </h5>
          <ul class="list-group  answers">
            <li
              class="list-group-item bg-dark text-light border-light m-2 border-2"
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
      class="card col-md-5 d-flex justify-content-center  algin-item-center m-auto mt-4 bg-dark text-light"
      v-else
    >
      <div class="card-body">
        <h1 class="card-title text-center border-bottom pb-2">Quiz Result</h1>
        <div class="answers">
          <p>correct answers: {{ correctAns }}</p>
          <p>wrong answers: {{ wrongAnswers }}</p>
        </div>
        <div class="answers-btn border-top">
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
      questionsLength: 20,
      questions: [],
      selectedAnswers: [],
      correctAnswers: [],
      correctAns: 0,
      wrongAnswers: 0,
      disabled: true,
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
    var mins = 5;
    var secs = mins * 60;
    function countdown() {
      setTimeout("Decrement()", 1000);
    }

    function Decrement() {
      if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
      }
      if (seconds < 59) {
        seconds.value = secs;
      } else {
        minutes.value = getminutes();
        seconds.value = getseconds();
      }
      if (secs !== 0) {
        secs--;
        setTimeout("Decrement()", 1000);
      } else {
        this.count = 20;
      }
    }

    function getminutes() {
      // minutes is seconds divided by 60, rounded down
      mins = Math.floor(secs / 60);
      return mins;
    }
    function getseconds() {
      // take mins remaining (as seconds) away from total seconds remaining
      return secs - Math.round(mins * 60);
    }
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
    resetQuiz() {
      this.count = 0;
      this.correctAnswers = [];
      this.selectedAnswers = [];
    },
  },
};
</script>

<style>
[type="radio"] {
  box-shadow: none !important;
}

.answers-btn {
  font-size: 20px;
}
li {
  border: 3px solid #fff;
  list-style: none;
  margin: 10px;
  padding: 8px;
}

li:checked {
  color: black;
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
</style>
