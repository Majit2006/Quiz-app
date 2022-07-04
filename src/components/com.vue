<template>
  <div class="container">
    <h1>{{ timestamp }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timestamp: "",
    };
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function() {
      const today = new Date('5:0');
      today.getDate();
      const time = today.getMinutes() + ":" + today.getSeconds();
      this.timestamp = time;
    },
  },
};
</script>
// const date = // today.getFullYear() + // "-" + // (today.getMonth() + 1) + //
"-" + // const dateTime = date + " " + time;



