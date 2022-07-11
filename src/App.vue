<template>
  <div class="grid-container">
    <Header class="header" v-bind:title="title"></Header>
    <Banner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></Banner>
    <Search class="weather-search" v-on:search-city="searchCity"></Search>
    <Weather class="weather-results" v-bind="weatherData" v-if="validWeatherData" v-on:clear-weather-data="resetData"></Weather>
    <Footer class="footer" v-bind:message="footerMessage"></Footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import Search from '@/components/Search.vue'
import Weather from '@/components/Weather.vue'
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
const openweathermapApiKey = ref('b0477c33959d9d3fa5a71d3ed1353c1a')

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

/* CSS Grid Styling
*******************/
.header {
  grid-area: header;
}
.banner {
  grid-area: banner;
}
.weather-search {
  grid-area: search;
}
.weather-results {
  grid-area: results;
}
.footer {
  grid-area: footer;
}

.grid-container {
  display: grid;
  grid-template-columns: 10% 35% 35% 10%;
  grid-auto-rows: minmax(20px, auto);
  grid-gap: 10px;
  max-width: 1080px;
  margin: auto;
  grid-template-areas:
    "header   header     header    header"
    "banner   banner     banner    banner"
    "...      search     search    ..."
    "...      results    results   ..."
    "footer   footer     footer    footer";
}
</style>
