<template>
  <div>
    <label :for="id">{{labelText}}
      <input :id="id" :name="id" checked="checked" type="checkbox" v-bind:value="isChecked"
             v-on:input="$emit('input', $event.target.checked)">
    </label>
  </div>
</template>

<script>
  export default {
    name: "Checkbox",
    props: {
      id: String,
      labelText: String,
      isChecked: Boolean,
    }
  }
</script>

<style scoped>
  label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 2.5em;
    margin: 0.2em 0;
    font-size: 1em;
  }

  input[type=checkbox] {
    display: none;
  }

  label:before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    position: absolute;
    left: 0;
    bottom: 1px;
    border: 2px solid #35495e;
    border-radius: 3px;
  }

  input[type=checkbox]:checked + label:before {
    content: "\2713";
    font-size: 1em;
    font-weight: bolder;
    background-color: #41b883;
    color: #35495e;
    text-align: center;
    line-height: 1em;
  }

</style>