import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import CityList from '@/components/CityList.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCitiesStore } from '@/stores/cities'

describe('CityList.vue Test', () => {
  it('initializes with zero elements displayed', () => {
    // render the component
    const wrapper = shallowMount(CityList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    // check that zero city cards are displayed
    expect(wrapper.findAll('h2').length).toEqual(0)

    // check that the 'Clear Weather Data' button is not displayed 
    expect(wrapper.findAll('button').length).toEqual(1)
    expect(wrapper.findAll('button')[0].isVisible()).toBeFalsy()
  })

  it('displays city weather from the data store', async () => {
    // render the component and initialize the data store
    // to contain weather data for (2) cities
    const wrapper = shallowMount(CityList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              cities: { 
                weatherData: [
                  {
                    'cityName': 'New Orleans',
                    'stateName': 'Louisiana',
                    'countryAbbreviation': 'US',
                    'weatherSummary': 'sunny',
                    'currentTemperature': 77.6,
                    'dailyHigh': 78.9,
                    'dailyLow': 65.2        
                  },
                  {
                    'cityName': 'Dublin',
                    'stateName': '',
                    'countryAbbreviation': 'IE',
                    'weatherSummary': 'windy',
                    'currentTemperature': 64.5,
                    'dailyHigh': 65.6,
                    'dailyLow': 46.7        
                  }
                ]
              }
            }
          })
        ]
      }
    })

    // check that two city cards are displayed
    const cityHeadings = wrapper.findAll('h2')
    expect(cityHeadings.length).toEqual(2)
    expect(cityHeadings[0].text()).toMatch('New Orleans, Louisiana')
    expect(cityHeadings[1].text()).toMatch('Dublin')
    const citySubHeadings = wrapper.findAll('h3')
    expect(citySubHeadings.length).toEqual(2)
    expect(citySubHeadings[0].text()).toMatch('US')
    expect(citySubHeadings[1].text()).toMatch('IE')
    const cityWeatherData = wrapper.findAll('p')
    expect(cityWeatherData.length).toEqual(6)
    expect(cityWeatherData[0].text()).toMatch('Weather Summary: sunny')
    expect(cityWeatherData[1].text()).toMatch('Current Temperature: 77.6')
    expect(cityWeatherData[2].text()).toMatch('High: 78.9°F / Low: 65.2°F')
    expect(cityWeatherData[3].text()).toMatch('Weather Summary: windy')
    expect(cityWeatherData[4].text()).toMatch('Current Temperature: 64.5')
    expect(cityWeatherData[5].text()).toMatch('High: 65.6°F / Low: 46.7°F')

    // check that the 'Clear Weather Data' button is displayed 
    expect(wrapper.findAll('button').length).toEqual(1)
    expect(wrapper.findAll('button')[0].isVisible()).toBeTruthy()
    expect(wrapper.findAll('button')[0].text()).toMatch('Clear Weather Data (2)')
  })

  it('calls the correct action on the data store when the weather data is cleared', async () => {
    // render the component and initialize the data store
    // to contain weather data for (1) city
    const wrapper = shallowMount(CityList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              cities: { 
                weatherData: [
                  {
                    'cityName': 'New Orleans',
                    'stateName': 'Louisiana',
                    'countryAbbreviation': 'US',
                    'weatherSummary': 'sunny',
                    'currentTemperature': 87.6,
                    'dailyHigh': 78.9,
                    'dailyLow': 65.2        
                  }
                ]
              }
            }
          })
        ]
      }
    })

    // create the data store using the testing pinia
    const store = useCitiesStore()

    // trigger an event when the 'Clear Weather Data' button is clicked
    wrapper.findAll('button').at(0).trigger('click')

    // check that the 'clearAllCities' action was called on the data store
    expect(store.clearAllCities).toHaveBeenCalledTimes(1)
  })
})
