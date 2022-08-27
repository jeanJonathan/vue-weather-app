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
    expect(store.cities.length).toEqual(0)
  })

  it('test adding a new city', () => {
    // Call the 'addCity' action
    store.addCity('Chicago')

    // Check that the city was added
    let savedCities = store.getCities
    expect(savedCities.length).toEqual(1)
    expect(savedCities[0]).toMatch('Chicago')
  })

  it('test adding a duplicate city', () => {
    // Call the 'addCity' action
    store.addCity('New Orleans')

    // Check that the city was added
    expect(store.cities.length).toEqual(1)
    expect(store.cities[0]).toMatch('New Orleans')

    // Attempt to add the same city
    store.addCity('New Orleans')

    // Check that only 1 instance of the city name is saved
    expect(store.cities.length).toEqual(1)
    expect(store.cities[0]).toMatch('New Orleans')
  })
  
  it('test removing a city', () => {
    // Add two cities to the data store
    store.addCity('New Orleans')
    store.addCity('Denver')

    // Check that the cities were added
    expect(store.cities.length).toEqual(2)

    // Remove a city
    store.removeCity('New Orleans')

    // Check that only 1 city remains in the data store
    expect(store.cities.length).toEqual(1)
    expect(store.cities[0]).toMatch('Denver')
  })

  it('test attempting to remove a city that is not in the data store', () => {
    // Add two cities to the data store
    store.addCity('New Orleans')
    store.addCity('Denver')

    // Attempt to remove a city not in the data store
    store.removeCity('Nashville')
    
    // Check that both cities remain in the data store
    expect(store.cities.length).toEqual(2)
    expect(store.cities[0]).toMatch('New Orleans')
    expect(store.cities[1]).toMatch('Denver')
  })
})
