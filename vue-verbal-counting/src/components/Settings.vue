<template>
    <form @submit.prevent="$emit('submit', $event.target)">
        <h2>Настройки</h2>
        <ul>
            <li>
                <Range :label-text="`Длительность ${time} минут${setTimeLabelTextEnding}`"
                       id="time"
                       max="5"
                       v-model="time"/>
            </li>
            <li>
                <Range :label-text="`Сложность ${setLevelTitle}`"
                       id="level"
                       max="3"
                       v-model="level"/>
            </li>
        </ul>
        <ul>
            <li v-for="task of tasks" :key="task.id">
                <Checkbox :id="task.id"
                          :label-text="task.title"
                          :is-checked="checkOperations.indexOf(task.id) > -1"/>
            </li>
        </ul>
        <button type="submit">Играть!</button>
    </form>
</template>

<script>
  import Checkbox from './Checkbox'
  import Range from './Range'
  import {OPERATIONS} from '../constants';

  export default {
    id: 'Settings',

    components: {
      Checkbox,
      Range,
    },

    data() {
      return {
        time: this.$store.state.time,
        level: this.$store.state.level,
        tasks: OPERATIONS,
        checkOperations: this.$store.state.operations
      }
    },

    computed: {
      setTimeLabelTextEnding() {
        switch (this.time) {
          case '1':
            return 'а';
          case '5':
            return '';
          default:
            return 'ы';
        }
      },

      setLevelTitle() {
        switch (this.level) {
          case '1':
            return 'легкая';
          case '3':
            return 'трудная';
          default:
            return 'средняя';
        }
      }
    }
  }
</script>

<style scoped>
    button {
        position: absolute;
        bottom: 1.5em;
        right: 2em;
    }
</style>
