import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useAuthStore } from './authStore'
import { useFavoritesStore } from './favoritesStore'

const movie = {
  imdbID: 'tt0133093',
  Title: 'The Matrix',
  Year: '1999',
}

describe('Pinia stores', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setActivePinia(createPinia())
  })

  it('logs a user in and resets the auth state on logout', () => {
    const authStore = useAuthStore()

    authStore.login('  Oliwia  ')
    expect(authStore.isLoggedIn).toBe(true)
    expect(authStore.username).toBe('Oliwia')

    authStore.logout()
    expect(authStore.isLoggedIn).toBe(false)
    expect(authStore.username).toBe('')
  })

  it('adds a favorite only once and removes it by imdbID', () => {
    const favoritesStore = useFavoritesStore()

    favoritesStore.addFavorite(movie)
    favoritesStore.addFavorite(movie)

    expect(favoritesStore.favoriteCount).toBe(1)
    expect(favoritesStore.isFavorite(movie.imdbID)).toBe(true)

    favoritesStore.removeFavorite(movie.imdbID)
    expect(favoritesStore.favoriteCount).toBe(0)
    expect(favoritesStore.isFavorite(movie.imdbID)).toBe(false)
  })
})
