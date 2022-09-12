import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCitiesStore } from '@/stores/cities'

describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useCitiesStore()
  })
  
  it('initializes with correct values', () => {
    expect(store.weatherData.length).toEqual(0)
  })

  it('test adding a new city', () => {
    // Call the 'addCity' action
    store.addCity('Chicago', 'Illinois', 'US', 'cloudy', 75.6, 78.9, 65.2)

    // Check that the city was added
    let savedCities = store.weatherData
    expect(savedCities.length).toEqual(1)
    expect(savedCities[0].cityName).toMatch('Chicago')
    expect(savedCities[0].stateName).toMatch('Illinois')
    expect(savedCities[0].countryAbbreviation).toMatch('US')
    expect(savedCities[0].weatherSummary).toMatch('cloudy')
    expect(savedCities[0].currentTemperature).toEqual(75.6)
    expect(savedCities[0].dailyHigh).toEqual(78.9)
    expect(savedCities[0].dailyLow).toEqual(65.2)
  })

  it('test adding a duplicate city', () => {
    // Call the 'addCity' action
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    // Check that the city was added
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')

    // Attempt to add the same city
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)

    // Check that only 1 instance of the city name is saved
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')
  })
  
  it('test removing a city', () => {
    // Add two cities to the data store
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)
    store.addCity('Denver', 'Colorado', 'US', 'windy', 94.5, 95.6, 56.7)

    // Check that the cities were added
    expect(store.weatherData.length).toEqual(2)

    // Remove a city
    store.removeCity('New Orleans')

    // Check that only 1 city remains in the data store
    expect(store.weatherData.length).toEqual(1)
    expect(store.weatherData[0].cityName).toMatch('Denver')
  })

  it('test attempting to remove a city that is not in the data store', () => {
    // Add two cities to the data store
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)
    store.addCity('Denver', 'Colorado', 'US', 'windy', 94.5, 95.6, 56.7)

    // Attempt to remove a city not in the data store
    store.removeCity('Nashville')
    
    // Check that both cities remain in the data store
    expect(store.weatherData.length).toEqual(2)
    expect(store.weatherData[0].cityName).toMatch('New Orleans')
    expect(store.weatherData[1].cityName).toMatch('Denver')
  })

  it('test removing all cities', () => {
    // Add two cities to the data store
    store.addCity('New Orleans', 'Louisiana', 'US', 'sunny', 87.6, 78.9, 65.2)
    store.addCity('Denver', 'Colorado', 'US', 'windy', 94.5, 95.6, 56.7)

    // Check that the cities were added
    expect(store.weatherData.length).toEqual(2)

    // Remove a city
    store.clearAllCities()

    // Check that zero cities remain in the data store
    expect(store.weatherData.length).toEqual(0)
  })
})
