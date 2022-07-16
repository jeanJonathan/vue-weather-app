<template>
  <div class="grid-container">
    <WeatherHeader class="header" v-bind:title="title"></WeatherHeader>
    <WeatherBanner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></WeatherBanner>
    <WeatherSearch class="weather-search" v-on:search-city="searchCity"></WeatherSearch>
    <WeatherResult class="weather-results" v-bind="weatherData" v-if="validWeatherData" v-on:clear-weather-data="resetData"></WeatherResult>
    <WeatherFooter class="footer" v-bind:message="footerMessage"></WeatherFooter>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WeatherFooter from '@/components/WeatherFooter.vue'
import WeatherHeader from '@/components/WeatherHeader.vue'
import WeatherBanner from '@/components/WeatherBanner.vue'
import WeatherSearch from '@/components/WeatherSearch.vue'
import WeatherResult from '@/components/WeatherResult.vue'
import axios from 'axios'

// ----
// Data
// ----

// Title of the application
const title = ref('Vue Weather App')

// Message to display in the footer
const footerMessage = ref('testdriven.io - 2022')

// Weather data collected from openweathermap.org
const weatherData = ref({
  city: '',
  weatherSummary: '',
  weatherDescription: '',
  currentTemperature: 0.0,
  highTemperature: 0.0,
  lowTemperature: 0.0
})

// Flag indicating if valid weather data has been loaded
const validWeatherData = ref(false)

// Message to display on banner
const messageToDisplay = ref('')

// Message type (Info, Success, or Error) to display on banner
const messageType = ref('Info')

// API key from openweathermap.org - Unique to each person
const openweathermapApiKey = ref('')

// ---------------
// Lifecycle Hooks
// ---------------
onMounted(() => {
  console.log('Content.vue: onMounted() called!')

  // Perform a check that the API key from openweathermap.org is defined
  if (openweathermapApiKey.value === '') {
    messageType.value = 'Error'
    messageToDisplay.value = 'Error! API Key needs to be loaded to use openweathermap.org!'
  }
})

// -------
// Methods
// -------
const searchCity = (inputCity) => {
  // GET request for user data
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + inputCity + '&units=imperial&APPID=' + openweathermapApiKey.value)
    .then((response) => {
      // handle success
      console.log(response)

      weatherData.value.city = response.data.name
      weatherData.value.weatherSummary = response.data.weather[0].main
      weatherData.value.weatherDescription = response.data.weather[0].description
      weatherData.value.currentTemperature = response.data.main.temp
      weatherData.value.lowTemperature = response.data.main.temp_min
      weatherData.value.highTemperature = response.data.main.temp_max
      validWeatherData.value = true
    })
    .catch((error) => {
      // handle error
      messageType.value = 'Error'
      messageToDisplay.value = 'ERROR! Unable to retrieve weather data for ' + inputCity + '!'
      console.log(error.message)
      resetData()
    })
    .finally((response) => {
      // always executed
      console.log('HTTP GET Finished!')
    })
}

const resetData = () => {
  weatherData.value = {
    city: '',
    weatherSummary: '',
    weatherDescription: '',
    currentTemperature: 0.0,
    lowTemperature: 0.0,
    highTemperature: 0.0
  }
  validWeatherData.value = false
}

const clearMessage = () => {
  messageToDisplay.value = ''
  messageType.value = 'Info'
}
</script>

<style>
@import './assets/base.css';

.grid-container {
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(20px, auto);
  gap: 20px;
  max-width: 1080px;
}

.header {
  grid-column: span 3;
}
.banner {
  grid-column: span 3;
}
.weather-search {
  grid-column: 2 / span 1;
}
.weather-results {
  grid-column: 2 / span 1;
}
.footer {
  grid-column: span 3;
}

</style>
