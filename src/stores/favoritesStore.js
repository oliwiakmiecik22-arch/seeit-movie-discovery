import { defineStore } from 'pinia'

const STORAGE_KEY = 'seeit-favorites'

const getSavedFavorites = () => {
  if (typeof window === 'undefined') return []

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favoritesStore', {
  state: () => ({
    favorites: getSavedFavorites(),
  }),

  getters: {
    isFavorite: (state) => (imdbID) =>
      state.favorites.some((movie) => movie.imdbID === imdbID),
    favoriteCount: (state) => state.favorites.length,
  },

  actions: {
    persist() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites))
    },

    addFavorite(movie) {
      if (!this.isFavorite(movie.imdbID)) {
        this.favorites.push(movie)
        this.persist()
      }
    },

    removeFavorite(imdbID) {
      this.favorites = this.favorites.filter((movie) => movie.imdbID !== imdbID)
      this.persist()
    },
  },
})
