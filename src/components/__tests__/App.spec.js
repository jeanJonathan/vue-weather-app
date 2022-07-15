import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import App from '../../App.vue'
import axios from 'axios'

// Mock the axios library
vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});


describe('Implementation Test for App.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = { data:
      {
        name: 'Chicago',
        weather: [
          {
            main: 'Cloudy',
            description: 'Cloudy with a chance of rain'
          }
        ],
        main: {
          temp: 56.3,
          temp_min: 53.8,
          temp_max: 58.6
        }
      }
    }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)

    // render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    axios.get.mockReset()
    wrapper.unmount()
  })

  it('renders sub-components when the component is created', () => {
    // check that 4 of the 5 child components are rendered
    const header = wrapper.findAll('.header')
    expect(header.length).toEqual(1)
    const footer = wrapper.findAll('.footer')
    expect(footer.length).toEqual(1)
    const banner = wrapper.findAll('.banner')
    expect(banner.length).toEqual(1)
    const search = wrapper.findAll('.weather-search')
    expect(search.length).toEqual(1)
    const results = wrapper.findAll('.weather-results')
    expect(results.length).toEqual(0)

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('does load the weather data when a successful HTTP GET occurs', async () => {
    wrapper.vm.searchCity('Chicago')

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch('Chicago')
    expect(wrapper.vm.weatherData.weatherSummary).toMatch('Cloudy')
    expect(wrapper.vm.weatherData.weatherDescription).toMatch('Cloudy with a chance of rain')
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(56.3)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(53.8)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(58.6)
    expect(wrapper.vm.validWeatherData).toBe(true)
  })

  it('resets the weather data when resetData() is called', () => {
    // set the input data for the user
    wrapper.vm.weatherData = {
      city: 'Boise',
      weatherSummary: 'Sunny',
      weatherDescription: 'No clouds in the sky',
      currentTemperature: 75.5,
      highTemperature: 78.6,
      lowTemperature: 48.9
    }
    wrapper.vm.validWeatherData = false

    wrapper.vm.resetData()

    // check that the user data is properly set
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)
  })

  it('resets the banner data when clearMessage() is called', () => {
    // set the input data for the user
    wrapper.vm.messageToDisplay = 'Great search results!'
    wrapper.vm.messageType = 'Success!!!'

    wrapper.vm.clearMessage()

    // check that the banner message is reset
    expect(wrapper.vm.messageToDisplay).toMatch(/^$/)
    expect(wrapper.vm.messageType).toMatch('Info')
  })
})

describe('Implementation Test for App.vue with Failed HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    // Set the mock call to GET to return a failed GET request
    axios.get.mockRejectedValue(new Error('BAD REQUEST'))

    // Render the component
    wrapper = shallowMount(App)
  })

  afterEach(() => {
    axios.get.mockReset()
    wrapper.unmount()
  })

  it('does not load the weather data when a failed HTTP GET occurs', async () => {
    wrapper.vm.searchCity('Chicago')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toBeCalledWith(expect.stringMatching(/Chicago/))

    // Wait until all Promises are resolved and the DOM updates
    await flushPromises()

    // Check that there is no user data loaded when the GET request fails
    expect(wrapper.vm.weatherData.city).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherSummary).toMatch(/^$/)
    expect(wrapper.vm.weatherData.weatherDescription).toMatch(/^$/)
    expect(wrapper.vm.weatherData.currentTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.lowTemperature).toEqual(0)
    expect(wrapper.vm.weatherData.highTemperature).toEqual(0)
    expect(wrapper.vm.validWeatherData).toBe(false)

    // check that the banner message indicates failure
    expect(wrapper.vm.messageToDisplay).toMatch('ERROR! Unable to retrieve weather data for Chicago!')
    expect(wrapper.vm.messageType).toMatch('Error')
  })
})

describe('Behavioral Test for App.vue with Successful HTTP GET', () => {
  let wrapper = null

  beforeEach(() => {
    const responseGet = { data:
      {
        name: 'Chicago',
        weather: [
          {
            main: 'Cloudy',
            description: 'Cloudy with a chance of rain'
          }
        ],
        main: {
          temp: 56.3,
          temp_min: 53.8,
          temp_max: 58.6
        }
      }
    }

    // Set the mock call to GET to return a successful GET response
    axios.get.mockResolvedValue(responseGet)

    // render the component (including all sub-components)
    wrapper = mount(App)
  })

  afterEach(() => {
    axios.get.mockReset()
    wrapper.unmount()
  })

  it('initializes with the two buttons disabled and no weather data displayed', () => {
    // check that 2 buttons are created and are disabled
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(2)
    expect(buttons.at(0).text()).toMatch('Search')
    expect(buttons.at(1).text()).toMatch('Clear')
    expect(buttons.at(0).element.disabled).toBeTruthy()
    expect(buttons.at(1).element.disabled).toBeTruthy()

    // check that there is only 1 h2 element
    const headers = wrapper.findAll('h2')
    expect(headers.length).toEqual(1)
    expect(headers.at(0).text()).toMatch('Weather Search')

    // check that 0 fields of weather data are displayed
    const texts = wrapper.findAll('p')
    expect(texts.length).toEqual(1)  // 1st element is the Banner Message
  })

  it('displays the weather data for a valid search', async () => {
    // Set the input data
    const inputs = wrapper.findAll('input')
    inputs.at(0).setValue('Chicago')

    // Wait until the DOM updates
    await flushPromises()

    // check that the 2 buttons are enabled
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toEqual(2)
    expect(buttons.at(0).text()).toMatch('Search')
    expect(buttons.at(1).text()).toMatch('Clear')
    expect(buttons.at(0).element.disabled).toBeFalsy()
    expect(buttons.at(1).element.disabled).toBeFalsy()

    // trigger an event when the 'Search' button is clicked
    wrapper.findAll('button').at(0).trigger('click')

    // Wait until the DOM updates
    await flushPromises()

    // check that the heading text is rendered
    const headers = wrapper.findAll('h2')
    expect(headers.length).toEqual(3)
    expect(headers.at(0).text()).toMatch('Weather Search')
    expect(headers.at(1).text()).toMatch('Weather Summary')
    expect(headers.at(2).text()).toMatch('Temperatures')

    // check that 6 fields of weather data are displayed
    const texts = wrapper.findAll('p')
    expect(texts.length).toEqual(7)  // 1st element is the Banner Message
    expect(texts.at(1).text()).toMatch('City: Chicago')
    expect(texts.at(2).text()).toMatch('Summary: Cloudy')
    expect(texts.at(3).text()).toMatch('Details: Cloudy with a chance of rain')
    expect(texts.at(4).text()).toMatch('Current: 56.3° F')
    expect(texts.at(5).text()).toMatch('High (Today): 58.6° F')
    expect(texts.at(6).text()).toMatch('Low (Today): 53.8° F')

    // check that the 3 buttons are enabled
    const buttons2 = wrapper.findAll('button')
    expect(buttons2.length).toEqual(3)
    expect(buttons2.at(0).text()).toMatch('Search')
    expect(buttons2.at(1).text()).toMatch('Clear')
    expect(buttons2.at(2).text()).toMatch('Clear Weather Data')
    expect(buttons2.at(0).element.disabled).toBeFalsy()
    expect(buttons2.at(1).element.disabled).toBeFalsy()
    expect(buttons2.at(2).element.disabled).toBeFalsy()
  })
})
