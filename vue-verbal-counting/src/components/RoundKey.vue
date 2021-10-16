<template>
    <button :class="[roundKeyClass, getClassForColor]"
            :disabled="disabled"
            @click="$emit('handleKeyClick', keyTitle)">
        {{keyTitle}}
    </button>
</template>

<script>
  export default {
    name: "RoundKey",
    props: {
      keyTitle: String,
      disabled: Boolean
    },
    data() {
      return {
        numberColorClass: 'green',
        stringColorClass: 'black',
        roundKeyClass: 'round-key'
      }
    },
    computed: {
      getClassForColor() {
        if (this.keyTitle === '') {
          return 'blank'
        } else if (parseInt(this.keyTitle)) {
          return 'orange'
        }
        return 'grey'
      }
    }
  }
</script>

<style scoped>
    .round-key {
        margin: 0 auto;
        padding: 0;
        width: 2.2em;
        height: 2.2em;
        border: 1px solid;
        border-radius: 1.1em;
        text-align: center;
        line-height: 2.2em;
        font-size: 1.5em;
        font-weight: bold;
        box-shadow: 0 3px 5px 1px gray;
        cursor: pointer;
    }

    .orange {
        border-color: orange;
        background-color: orange;
    }

    .grey {
        color: black;
        border-color: #7A7A7A;
        background-color: #7A7A7A;
    }

    .blank {
        box-shadow: none;
        border-color: transparent;
        background: none;
        cursor: auto;
    }

    .round-key:active {
        box-shadow: none;
    }
</style>