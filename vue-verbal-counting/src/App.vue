<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'App',

    methods: {
      ...mapMutations([
        'setLastGameDate'
      ]),
    },

    beforeMount() {
      if (this.$store.state.lastGameDate === null) {
        this.setLastGameDate({amount: Date.now()});
      }
    }
  }

</script>

<style>
    #app {
        font-family: "Arial", sans-serif;
        position: relative;
        width: 400px;
        height: 600px;
        margin: 2rem auto;
        color: #35495e;
        outline: 1px solid #f6f6f6;
        user-select: none;
    }

    h1, h2, p {
        margin: 0;
    }

    h1 {
        font-size: 1.6em;
        font-weight: 500;
        margin-bottom: 1em;
    }

    h2 {
        font-weight: 500;
        font-size: 1.2em;
        margin-bottom: 0.3em;
    }

    p {
        margin-bottom: 0.1em;
        line-height: 1.5em;
    }

    ul {
        list-style: none;
        margin: 0 0 1.5em 0;
        padding-left: 0;
    }

    button {
        padding: 0.6em 1em;
        color: #35495e;
        background: none;
        border: 1px solid transparent;
        border-radius: 3px;
        box-shadow: 0 2px 2px 1px lightgray;
        font-size: 1em;
        cursor: pointer;
    }

    button:active, button:focus {
        outline: none;
    }

    button:active {
        box-shadow: none;
    }
</style>
