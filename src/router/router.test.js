import { beforeEach, describe, expect, it } from 'vitest'

import router from './index'
import { pinia } from '../stores'
import { useAuthStore } from '../stores/authStore'

describe('favorites route guard', () => {
  let authStore

  beforeEach(async () => {
    window.localStorage.clear()
    window.scrollTo = () => {}
    authStore = useAuthStore(pinia)
    authStore.logout()
    await router.replace('/')
  })

  it('redirects logged-out users to home', async () => {
    await router.push('/favorites')

    expect(router.currentRoute.value.name).toBe('home')
    expect(router.currentRoute.value.query.redirect).toBe('/favorites')
  })

  it('allows a logged-in user to open favorites', async () => {
    authStore.login('Oliwia')
    await router.push('/favorites')

    expect(router.currentRoute.value.name).toBe('favorites')
  })
})
