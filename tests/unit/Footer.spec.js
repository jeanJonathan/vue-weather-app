import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'


describe('Footer.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Footer, {
      propsData: {
        message: 'testdriven.io 2019'
      }
    })

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('Footer')

    // check that the title is rendered
    expect(wrapper.text()).toMatch('testdriven.io 2019')
  })
})
