<template>
  <h2>{{ title }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">{{ counter }}</p>

  <div>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Counter',
    },
    start: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
  },

  data() {
    return {
      counter: this.start,
    };
  },

  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
  },

  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
  },
};
</script>

<style scoped>
button {
  background-color: #64bb87;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  transition: 0.3s ease-in-out;
}
</style>
