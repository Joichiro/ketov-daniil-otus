<template>
    <div class="timer"
         :class="{blink: currentTime < 10}"
         :style="`background: linear-gradient(to right, #f6f6f6 ${barValue}%, #e2f5ec ${barValue}%)`">
        {{timeToView}}
    </div>
</template>

<script>
  export default {
    name: "Timer",
    props: {
      isWorked: Boolean,
      roundTime: Number,
      currentTime: Number
    },
    computed: {
      timeToView() {
        const
          options = {minute: '2-digit', second: '2-digit'},
          rule = new Intl.DateTimeFormat("en-US", options).format,
          time = new Date(this.currentTime * 1000);

        return rule(time)
      },
      barValue() {
        return Math.floor((this.roundTime - this.currentTime) * 100 / this.roundTime)
      }
    }
  }
</script>

<style scoped>
    .timer {
        position: absolute;
        width: 5.25em;
        height: 1.65em;
        top: 1.6em;
        right: 2em;
        text-align: center;
        line-height: 1.65em;
        text-transform: uppercase;
        font-size: 1.3em;
        color: #41b883;
        background-color: #e2f5ec;
        border: 2px solid #e2f5ec;
    }

    .blink {
        animation: blink 1s linear infinite;
    }

    @keyframes blink {
        0% {
            color: #FFAEAE;
        }
        100% {
            color: #41b883;
        }
        0% {
            color: #FFAEAE;
        }
    }
</style>