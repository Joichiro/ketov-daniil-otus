<template>
    <div class="main-page">
        <h1>Привет!</h1>
        <p>Добро пожаловать на {{setGameDay}} тренировочный день.</p>
        <p>Ваш последний результат - решено {{trueAnswersCount}} из {{turnCount}}.</p>
        <p>Общая точность {{setAccuracy}} %.</p>
        <Settings class="settings"
                  @submit="handleSubmit"/>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {OPERATIONS, MSEC_IN_DAY} from "../constants";
  import Settings from "../components/Settings";

  export default {
    id: 'MainPage',

    components: {
      Settings
    },

    data() {
      return {
        turnCount: this.$store.state.turnCount,
        trueAnswersCount: this.$store.state.trueAnswersCount,
        lastGameDate: this.$store.state.lastGameDate
      }
    },

    computed: {
      setGameDay() {
        return Math.floor((Date.now() - this.lastGameDate) / MSEC_IN_DAY) + 1
      },

      setAccuracy() {
        if (!this.turnCount || !this.trueAnswersCount) {
          return 0
        }

        return Math.floor(this.trueAnswersCount / this.turnCount * 100)
      }
    },

    methods: {
      ...mapMutations([
        'setTime',
        'setLevel',
        'setOperations',
      ]),

      handleSubmit(form) {
        const data = new FormData(form);

        const
          time = data.get('time'),
          level = data.get('level'),
          operations = OPERATIONS
            .map(({id}) => {
              if (data.get(id) !== null) {
                return id
              }
            })
            .filter(item => item);

        this.setTime({amount: time});
        this.setLevel({amount: level});
        this.setOperations({amount: operations});

        if (operations.length > 0) {
          this.$router.push('/game')
        }
      }
    }
  }
</script>

<style scoped>
    .main-page {
        display: inline-block;
        margin: 1.5em 1em 2em 2em;
    }

    .settings {
        margin-top: 2em;
    }
</style>
