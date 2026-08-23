<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import EmptyState from '../components/EmptyState.vue'
import MovieCard from '../components/MovieCard.vue'
import { useAuthStore } from '../stores/authStore'
import { useFavoritesStore } from '../stores/favoritesStore'

const router = useRouter()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const { favorites, favoriteCount } = storeToRefs(favoritesStore)

const openMovie = (movie) => {
  router.push({ name: 'detail', params: { id: movie.imdbID } })
}
</script>

<template>
  <div class="favorites-view container page-section">
    <header class="favorites-header">
      <div>
        <p class="eyebrow">{{ authStore.username }}'s private shelf</p>
        <h1>Films worth <em>remembering.</em></h1>
        <p>Your saved collection stays here until you decide to remove a title.</p>
      </div>
      <div class="favorites-header__count">
        <strong>{{ favoriteCount.toString().padStart(2, '0') }}</strong>
        <span>saved films</span>
      </div>
    </header>

    <TransitionGroup v-if="favorites.length" name="results" tag="section" class="movie-grid favorites-grid">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.imdbID"
        :movie="movie"
        show-remove
        @select="openMovie"
        @remove="favoritesStore.removeFavorite"
      />
    </TransitionGroup>

    <EmptyState
      v-else
      icon="pi pi-heart"
      eyebrow="Your shelf is empty"
      title="Save the films you do not want to forget."
      description="Discover a title, open its details and add it to your personal favorites."
      action-label="Discover movies"
      @action="router.push({ name: 'search' })"
    />
  </div>
</template>
