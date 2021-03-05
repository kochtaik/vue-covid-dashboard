<template>
  <config-bar></config-bar>
</template>

<script>
import configBar from './components/configBar.vue'

export default {
  name: 'Covid dashboard',
  components: {
    configBar,
  }
}
</script>

<style>
html, select, input {
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}
</style>
