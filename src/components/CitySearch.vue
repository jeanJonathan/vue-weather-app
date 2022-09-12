<template>
  <div class="city-search">
    <div class="city-search-title">
      <h2>Weather Search</h2>
    </div>
    <div class="city-search-input">
      <label for="cityInput">City:</label>
      <input type="text" id="cityInput" v-model="inputCity" placeholder="Enter a city name...">
      <br>
      <div class="city-search-buttons">
        <button type="submit" v-on:click="searchCity" v-bind:disabled="searchDisabled">Search</button>
        <button type="reset" v-on:click="clearCity" v-bind:disabled="clearDisabled">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['search-city'])

// ----
// Data
// ----
const inputCity = ref('')

// -------------------
// Computed Properties
// -------------------
const searchDisabled = computed(() => {
  if (inputCity.value) {
    return false
  }
  return true
})
const clearDisabled = computed(() => {
  if (inputCity.value) {
    return false
  }
  return true
})

// -------
// Methods
// -------
const searchCity = () => {
  emit('search-city', inputCity.value)
}

const clearCity = () => {
  inputCity.value = ''
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-search {
  margin: auto;
}

.city-search-title h2 {
  text-align: center;
  margin-bottom: 0.5em;
}

.city-search-buttons {
  margin: 0.5em;
}

.city-search-input {
  text-align: center;
}

.city-search-input label {
  font-size: 1.35em;
  margin-right: 0.5em;
}

.city-search-input input {
  font-size: 1.1em;
}

.city-search-buttons button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  margin: 6px;
}

.city-search-buttons button:hover {
  color: black;
  cursor: pointer;
}

.city-search-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
