<template>
  <div>
    <button @click="startQuizFunc()">click</button>
    <div class="time-progress">
      <progress class="mt-2 mb-2" max="300" height="4px" :value="countDown">
      </progress>
      <p class="progress-text">{{ countDown }}</p>
      <p>
        {{ count }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      countDown: 300,
      timer: null,
      startQuiz: false,
    };
  },
  methods: {
    startQuizFunc() {
      this.startQuiz = true;
      this.countDownTimer();
    },
    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        // this.handleAnswerClick(false);
        this.count = 20;
      }
    },
  },
};
</script>
