<template>
    <div class="game-display">
        <p>
            <span>{{firstNumber}}</span>
            <span> {{setSign}} </span>
            <span :style="`color: ${userInputColor}`">{{userAnswer}}</span>
            <span> = </span>
            <span>{{resultNumber}} </span>
            <span>? </span>
        </p>
    </div>
</template>

<script>
  import {OPERATIONS} from "../constants";

  export default {
    name: "GameDisplay",

    props: {
      operation: String,
      userAnswer: String,
      firstNumber: Number,
      resultNumber: Number,
      userInputColor: String
    },

    computed: {
      setSign() {
        return OPERATIONS
          .filter(({id}) => id === this.operation)[0]
          .sign
      },
    }
  }
</script>

<style scoped>
    .game-display {
        display: inline-block;
        width: 100%;
        margin: 4em 0 0.5em 0;
        text-align: center;
        font-size: 2em;
        font-weight: 500;
    }
</style>