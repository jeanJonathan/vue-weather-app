<template>
  <footer>
    <h1>{{ message }}</h1>
  </footer>
</template>

<script setup>
const props = defineProps({
  message: String
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  margin: auto;
}
</style>
