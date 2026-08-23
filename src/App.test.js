import { createPinia, setActivePinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'

import App from './App.vue'
import HomeView from './views/HomeView.vue'

const SearchStub = { template: '<section><h1>Search screen</h1></section>' }

describe('application smoke flow', () => {
  let pinia
  let router

  beforeEach(async () => {
    window.localStorage.clear()
    window.matchMedia = window.matchMedia || (() => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
    pinia = createPinia()
    setActivePinia(pinia)
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/search', name: 'search', component: SearchStub },
      ],
    })
    await router.push('/')
    await router.isReady()
  })

  it('renders the home screen and validates login before navigating', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [pinia, router, PrimeVue],
      },
    })

    expect(wrapper.text()).toContain('The Dark Knight.')

    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.findAll('.field-error')).toHaveLength(2)

    await wrapper.find('#username').setValue('Oliwia')
    await wrapper.find('#password').setValue('seeit123')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('search')
    expect(wrapper.text()).toContain('Search screen')
  })
})
