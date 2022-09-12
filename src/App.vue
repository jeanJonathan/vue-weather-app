<template>
    <div class="container">
        <WeatherHeader class="header" v-bind:title="title"></WeatherHeader>
        <WeatherContent class="content"></WeatherContent>
        <WeatherFooter class="footer" v-bind:message="footerMessage"></WeatherFooter>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherFooter from '@/components/WeatherFooter.vue'
import WeatherContent from '@/components/WeatherContent.vue'
import WeatherHeader from '@/components/WeatherHeader.vue'

// ----
// Data
// ----

// Title of the application
const title = ref('Vue Weather App')

// Message to display in the footer
const footerMessage = ref('testdriven.io - 2022')
</script>

<style>
@import './assets/base.css';

.container {
  margin: auto;
  padding: 20px;
  max-width: 1080px;
}
</style>
