import { defineStore } from 'pinia'

const STORAGE_KEY = 'seeit-auth'

const getSavedSession = () => {
  if (typeof window === 'undefined') return null

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('authStore', {
  state: () => {
    const savedSession = getSavedSession()

    return {
      isLoggedIn: Boolean(savedSession?.isLoggedIn),
      username: savedSession?.username || '',
    }
  },

  actions: {
    login(username) {
      this.isLoggedIn = true
      this.username = username.trim()
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ isLoggedIn: this.isLoggedIn, username: this.username }),
      )
    },

    logout() {
      window.localStorage.removeItem(STORAGE_KEY)
      this.$reset()
    },
  },
})
