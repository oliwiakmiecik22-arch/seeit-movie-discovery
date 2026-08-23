<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'

import MovieCard from '../components/MovieCard.vue'
import EmptyState from '../components/EmptyState.vue'
import {
  getDemoCollection,
  isDemoMode,
  searchMovies,
} from '../services/omdb'

const RECENT_KEY = 'seeit-recent-searches'
const route = useRoute()
const router = useRouter()
const searchTerm = ref('')
const results = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)
const recentSearches = ref([])
const demoMode = isDemoMode()

const loadRecentSearches = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(RECENT_KEY))
    recentSearches.value = Array.isArray(saved) ? saved.slice(0, 4) : []
  } catch {
    recentSearches.value = []
  }
}

const rememberSearch = (query) => {
  recentSearches.value = [
    query,
    ...recentSearches.value.filter((item) => item.toLowerCase() !== query.toLowerCase()),
  ].slice(0, 4)
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches.value))
}

const performSearch = async (preset) => {
  if (preset) searchTerm.value = preset
  const query = searchTerm.value.trim()

  if (!query) {
    errorMessage.value = 'Enter a movie title to begin your search.'
    results.value = []
    hasSearched.value = true
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  hasSearched.value = true

  try {
    results.value = await searchMovies(query)
    rememberSearch(query)
    await router.replace({ name: 'search', query: { q: query } })
  } catch (error) {
    results.value = []
    errorMessage.value = error.message || 'Something went wrong while searching for movies.'
  } finally {
    isLoading.value = false
  }
}

const openMovie = (movie) => {
  router.push({ name: 'detail', params: { id: movie.imdbID } })
}

onMounted(() => {
  loadRecentSearches()

  if (typeof route.query.q === 'string' && route.query.q.trim()) {
    searchTerm.value = route.query.q
    performSearch()
  } else if (demoMode) {
    results.value = getDemoCollection()
  }
})
</script>

<template>
  <div class="search-view container page-section">
    <header class="search-hero">
      <div>
        <div class="search-hero__meta">
          <p class="eyebrow">The catalogue</p>
          <Tag v-if="demoMode" value="Demo data" severity="secondary" rounded />
        </div>
        <h1>What do you want to <em>feel</em> tonight?</h1>
        <p>Search by title, then open a film to see its story, rating and creative team.</p>
      </div>

      <form class="search-form" role="search" @submit.prevent="performSearch()">
        <div class="search-form__field">
          <i class="pi pi-search" aria-hidden="true"></i>
          <InputText
            v-model="searchTerm"
            aria-label="Movie title"
            placeholder="Search for a movie, for example Inception"
            autocomplete="off"
            fluid
          />
        </div>
        <Button
          type="submit"
          label="Search movies"
          :loading="isLoading"
        />
      </form>

      <div v-if="recentSearches.length" class="recent-searches">
        <span>Recent</span>
        <Button
          v-for="item in recentSearches"
          :key="item"
          :label="item"
          severity="secondary"
          text
          size="small"
          @click="performSearch(item)"
        />
      </div>
    </header>

    <section class="results-section" aria-live="polite" :aria-busy="isLoading">
      <div class="results-heading">
        <div>
          <p class="eyebrow">{{ hasSearched ? 'Search results' : 'Curated starting point' }}</p>
          <h2>
            {{ hasSearched ? `${results.length} title${results.length === 1 ? '' : 's'} found` : 'Featured titles' }}
          </h2>
        </div>
        <span v-if="results.length">{{ results.length.toString().padStart(2, '0') }} films</span>
      </div>

      <div v-if="isLoading" class="loading-state">
        <ProgressSpinner stroke-width="3" />
        <div>
          <h2>Searching the catalogue...</h2>
          <p>Finding results for "{{ searchTerm }}".</p>
        </div>
      </div>

      <Message v-else-if="errorMessage" severity="error" :closable="false" class="results-error">
        {{ errorMessage }}
      </Message>

      <TransitionGroup v-else-if="results.length" name="results" tag="div" class="movie-grid">
        <MovieCard
          v-for="movie in results"
          :key="movie.imdbID"
          :movie="movie"
          @select="openMovie"
        />
      </TransitionGroup>

      <EmptyState
        v-else
        title="No films on this reel"
        description="Try a different title or check the spelling of your search."
        action-label="Search for Inception"
        @action="performSearch('Inception')"
      />
    </section>

    <Message v-if="demoMode" severity="info" :closable="false" class="demo-note">
      <strong>Demo data:</strong> the app is using a small local collection because no OMDb key is
      configured. Add your key to <code>.env</code> to search the full catalogue.
    </Message>
  </div>
</template>
