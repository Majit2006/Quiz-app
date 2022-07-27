<template>
  <div>
   <div v-if="count == -1">
     <div class="container rounded mt-4 col-sm-6 bg-primary d-flex flex-column">
    <h1 class="text-light text-center">Quiz Start</h1>
    <div class="d-flex flex-column m-auto  form-group col-sm-8 justify-content-center align-content-center">
    <form novalidate="true">
    <input type="text" v-model.trim="name"  class="border-0 mt-3 form-control" placeholder="User name" required>
    <input type="text" v-model.trim="lastname"  class="border-0 mt-4 form-control text-capitalize" placeholder="Last name" required>
    <input type="number" v-model.number="countDown" class="border-0 mt-4 form-control text-capitalize" placeholder="Minutes" required>
    <input type="button" @click="count++, test()" class="text-light h4 mt-3 bg-dark rounded text-decoration-none " value="Start">
    </form>
    </div>
    </div>
  </div>
    <div class="d-flex justify-content-center flex-wrap mt-4 mr-5" v-else-if="count < 20">
      <div class="card col-md-6 box">
        <div class="card-header bg-light text-dark text-center">
          {{ questions[count].category }}
        </div>
        <div class="card-body bg-light text-dark">
          <h5 class="card-title text-center">
            {{ count }} / {{ questions[count].question }}
          </h5>

          <ul class="list-group answers">
            <li
              class="list-group-item bg-primary text-light  m-2 "
              v-for="option in questions[count].incorrectAnswers"
              :key="option"
              @click="checkAnswer(option), ++count"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mintes">
          <div class="time-progress text-dark bg-light d-flex flex-column p-4">
            <p class="h4 border-bottom border-primary pb-2" id="tmerelmen">
            Secound: <span>{{timer}}</span>
            </p>
            <p class="h5 text-capitalize pb-2 border-bottom border-primary">Player name:{{name}}</p>
            <p class="h5 text-capitalize">Player lastname:{{lastname}}</p>
          </div>
      </div>
    </div>
      <div
      class="card col-md-5 d-flex justify-content-center  algin-item-center m-auto mt-4 box" v-else>
      <div class="card-body">
        <h1 class="card-title text-center border-bottom border-dark pb-2">
          Quiz Result
        </h1>
        <div class="answers">
          <p>correct answers: {{ correctAns }}</p>
          <p>wrong answers: {{ wrongAnswers }}</p>
          <p>Player name: {{name}}</p>
          <p>Player lastname: {{lastname}}</p>
        </div>
        <div class="answers-btn border-top border-dark">
          <button  @click="resetQuiz()" class="btn btn-sm btn-primary mt-4">
            Go To Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            count: -1,
            questions: [],
            name: "",
            lastname: "",
            timer: 0,
            countDown: 5,
            questionsLength: 20,
            selectedAnswers: [],
            correctAnswers: [],
            correctAns: 0,
            wrongAnswers: 0,
        };
    },
  async created() {
     await axios
      .get(
        "https://the-trivia-api.com/api/questions?categories=arts_and_literature,food_and_drink,film_and_tv,general_knowledge,geography,history,music,science,society_and_culture,sport_and_leisure&limit=20&difficulty=hard"
      )
      .then((response) => {
        this.questions = response.data;
        this.questions.forEach((question) => {
          question.incorrectAnswers.push(question.correctAnswer);
          question.incorrectAnswers.sort(() => Math.random() - 0.5);
        });
      });
    },
    methods: {
        checkAnswer(option) {
            this.selectedAnswers[this.count] = option;
            if (option == this.questions[this.count].correctAnswer) {
                if (this.correctAnswers.indexOf(option) === -1) {
                    this.correctAnswers.push(option);
                }
                this.correctAns++;
            }
            else {
                this.wrongAnswers++;
            }
        },
        resetQuiz(){
          this.count = -1,
          this.correctAns = 0,
          this.selectedAnswers = [],
          this.wrongAnswers = 0
          this.name = '',
          this.lastname = '',
          this.countDown = 5
        },
        test() {
          this.timer = this.countDown * 60;
          this.countDownTimer();
        },
        countDownTimer() {
          let timerelment;
            if (this.timer > 0) {
              if(this.timer <= 20 && this.timer > 10){
               timerelment = document.querySelector("span");
                timerelment.classList.add("text-warning");
              }
              else if(this.timer <= 10 && this.timer > 0){
               timerelment = document.querySelector('span')
                 timerelment.classList.add("text-red");
              }
                 setTimeout(() => {
                    this.timer -= 1;
                     this.countDownTimer();
                }, 1000);
            }
            else {
                this.count = 20;
            }
        },
    },
};
</script>

<style>
@import url('../assets/bootstrap.css');
@import url('../assets/style.css');
</style>