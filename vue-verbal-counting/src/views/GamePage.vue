<template>
    <div>
        <button @click="stop">&#215; Отмена</button>
        <Timer :round-time="roundTime"
               :current-time="currentTime"/>
        <GameDisplay :operation="currentOperation"
                     :user-input-color="userInputColor"
                     :user-answer="userAnswer"
                     :first-number="firstNumber"
                     :result-number="resultNumber"/>
        <Keyboard :handle-key-click="handleKeyClick"
                  :pause="pause"/>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {DIF, DIV, MUL, SUM, PAUSE} from "../constants";
  import Timer from '../components/Timer'
  import Keyboard from '../components/Keyboard'
  import GameDisplay from "../components/GameDisplay";

  export default {
    name: 'GamePage',

    components: {
      GameDisplay,
      Timer,
      Keyboard
    },

    data() {
      return {
        roundTime: this.$store.getters.roundTime,
        level: this.$store.state.level,
        operations: this.$store.state.operations,
        currentOperation: SUM,
        currentTime: 0,
        timer: null,
        userInput: [],
        firstNumber: 0,
        secondNumber: 0,
        resultNumber: 0,
        turnCount: 0,
        trueAnswersCount: 0,
        pause: false,
        userInputColor: 'lightgray'
      }
    },

    computed: {
      userAnswer() {
        const underscoreCount = this.level - this.userInput.length;

        return ('_'.repeat(underscoreCount) + this.userInput.join(''))
          .substring(0, this.level)
      }
    },

    methods: {
      ...mapMutations([
        'setTurnCount',
        'setTrueAnswersCount'
      ]),

      start() {
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.currentTime > 0) {
              if (!this.pause) {
                this.currentTime--
              }

            } else {
              this.pause = true;

              this.setTurnCount({amount: this.turnCount});
              this.setTrueAnswersCount({amount: this.trueAnswersCount});

              setTimeout(this.stop(), PAUSE)
            }
          }, 1000)
        }
      },

      stop() {
        clearInterval(this.timer);
        this.$router.push('/')
      },

      handleKeyClick(value) {
        if (this.userInput.length < this.level && /^\d/.test(value)) {
          this.userInput.push(value)
        }

        if (value === '<' && this.userInput.length) {
          this.userInput.pop()
        }

        if (value === '?') {
          this.userInput = this.secondNumber.toFixed().split('');
          this.userInputColor = '#35495e';
          this.pause = true;
          setTimeout(this.generateTask, PAUSE)
        }

        if (value === '=' && this.userInput.length > 0) {
          if (this.checkAnswer()) {
            this.trueAnswersCount++;
            this.userInputColor = '#41b883';
          } else {
            this.userInputColor = 'red';
          }

          this.pause = true;
          setTimeout(this.generateTask, PAUSE)
        }
      },

      generateTask() {
        this.pause = false;

        if (this.currentTime < 5) {
          return
        }

        this.turnCount++;

        const opIndex = Math.floor(Math.random() * this.operations.length);
        this.currentOperation = this.operations[opIndex];

        this.userInput = [];
        this.userInputColor = 'lightgray';

        const levelRange = Math.pow(10, this.level) - 2;
        this.prepareTask(levelRange);
      },

      prepareTask(levelRange) {
        let tempVar;

        this.firstNumber = Math.floor(Math.random() * levelRange) + 1;
        this.secondNumber = Math.floor(Math.random() * levelRange) + 1;

        switch (this.currentOperation) {
          case SUM:
            this.resultNumber = this.firstNumber + this.secondNumber;
            return;

          case DIF:
            tempVar = this.firstNumber;
            this.resultNumber = this.firstNumber + this.secondNumber;
            this.firstNumber = this.resultNumber;
            this.resultNumber = tempVar;
            return;

          case MUL:
            this.resultNumber = this.firstNumber * this.secondNumber;
            return;

          case DIV:
            tempVar = this.firstNumber;
            this.resultNumber = this.firstNumber * this.secondNumber;
            this.firstNumber = this.resultNumber;
            this.resultNumber = tempVar;
            return;
        }
      },

      checkAnswer() {
        return parseInt(this.userInput.join('')) === this.secondNumber
      }
    },

    mounted() {
      this.currentTime = this.roundTime;
      this.generateTask();
      this.start();
    }
  }
</script>

<style scoped>
    button {
        position: absolute;
        top: 2em;
        left: 2em;
        text-transform: uppercase;
    }
</style>
