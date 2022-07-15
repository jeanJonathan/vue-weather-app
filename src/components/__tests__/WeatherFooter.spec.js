import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import WeatherFooter from '../WeatherFooter.vue'

describe('WeatherFooter.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(WeatherFooter, {
      propsData: {
        message: 'testdriven.io - 2022'
      }
    })

    // check that the title is rendered
    expect(wrapper.text()).toMatch('testdriven.io - 2022')
  })
})
