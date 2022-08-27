import { defineStore } from 'pinia'

export const useCitiesStore = defineStore('cities', {
  // state is the data being stored in the data store
  state: () => ({
    // List of saved cities
    cities: []
  }),
  
  // getters return data from the data store
  getters: {
    getCities: (state) => { return state.cities }
  },
  
  // actions are operations that change the state
  actions: {
    addCity(cityName) { 
      // Check if the city is already saved
      if (this.cities.indexOf(cityName) === -1) {
        this.cities.push(cityName)
      }
    },
    removeCity(cityName) {
      // Check that the city is in the list before attempting to delete it
      if (this.cities.indexOf(cityName) >= 0) {
        this.cities.splice(this.cities.indexOf(cityName), 1)
      }
    }
  }
})
