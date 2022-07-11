<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
const props = defineProps({
  title: String
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  margin: auto;
}

header h1 {
  font-size: 2.5em;
}
</style>
