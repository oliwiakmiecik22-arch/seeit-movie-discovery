<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import Tag from 'primevue/tag'

import { useAuthStore } from './stores/authStore'
import { useFavoritesStore } from './stores/favoritesStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const { isLoggedIn, username } = storeToRefs(authStore)
const { favoriteCount } = storeToRefs(favoritesStore)

const items = computed(() => [
  {
    label: 'Home',
    class: route.name === 'home' ? 'is-active' : '',
    command: () => router.push({ name: 'home' }),
  },
  {
    label: 'Search',
    class: ['search', 'detail'].includes(route.name) ? 'is-active' : '',
    command: () => router.push({ name: 'search' }),
  },
  {
    label: 'Favorites',
    class: route.name === 'favorites' ? 'is-active' : '',
    command: () => router.push({ name: 'favorites' }),
  },
])

const logout = () => {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="app-shell seeit-dark">
    <header class="site-header">
      <Menubar :model="items" aria-label="Primary navigation">
        <template #start>
          <button class="wordmark" aria-label="seeit home" @click="router.push({ name: 'home' })">
            <span class="wordmark__text">seeit</span>
          </button>
        </template>

        <template #end>
          <div class="account-actions">
            <template v-if="isLoggedIn">
              <div class="account-chip">
                <span class="account-chip__avatar">{{ username.charAt(0).toUpperCase() }}</span>
                <span class="account-chip__name">{{ username }}</span>
              </div>
              <Tag
                v-if="favoriteCount"
                :value="`${favoriteCount} saved`"
                severity="secondary"
                rounded
                class="saved-count"
              />
              <Button
                label="Log out"
                severity="secondary"
                text
                size="small"
                @click="logout"
              />
            </template>
            <Button
              v-else
              label="Sign in"
              severity="secondary"
              outlined
              size="small"
              @click="router.push({ name: 'home' })"
            />
          </div>
        </template>
      </Menubar>
    </header>

    <main id="main-content" class="main-content">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="currentRoute.name" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <div>
        <span class="wordmark__text">seeit</span>
        <p>A movie discovery app built with Vue 3 and the OMDb API.</p>
      </div>
      <p>Created by Oliwia Kmiecik, 2026</p>
    </footer>
  </div>
</template>