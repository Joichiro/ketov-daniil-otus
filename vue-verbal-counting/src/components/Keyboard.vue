<template>
    <div class="keyboard">
        <div class="key"
             v-for="(keyTitle, index) of keyTitles"
             :key="index">
            <RoundKey :key-title="keyTitle"
                      :disabled="pause"
                      @handleKeyClick="handleKeyClick"/>
        </div>
    </div>
</template>

<script>
  import RoundKey from './RoundKey'

  export default {
    name: 'Keyboard',
    components: {RoundKey},
    props: {
      handleKeyClick: Function,
      pause: Boolean
    },
    data() {
      return {
        keyTitles: [
          '1', '2', '3', '<',
          '4', '5', '6', '',
          '7', '8', '9', '?',
          '', '0', '', '='
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
    .keyboard {
        margin: 2em;
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .key {
        flex: 0 25%;
        margin-bottom: 2em;
        text-align: center;
        vertical-align: center;
    }
</style>
