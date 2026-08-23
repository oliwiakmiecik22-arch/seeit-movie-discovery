<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'

import EmptyState from '../components/EmptyState.vue'
import { getMovieDetails } from '../services/omdb'
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const favoritesStore = useFavoritesStore()
const movie = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const detailContent = ref(null)

const isFavorite = computed(() =>
  movie.value ? favoritesStore.isFavorite(movie.value.imdbID) : false,
)

const genres = computed(() =>
  movie.value?.Genre && movie.value.Genre !== 'N/A'
    ? movie.value.Genre.split(',').map((genre) => genre.trim())
    : [],
)

const actors = computed(() =>
  movie.value?.Actors && movie.value.Actors !== 'N/A'
    ? movie.value.Actors.split(',').map((actor) => actor.trim()).slice(0, 3)
    : [],
)

const hasPoster = computed(() => movie.value?.Poster && movie.value.Poster !== 'N/A')

const detailStyle = computed(() =>
  hasPoster.value ? { '--movie-backdrop': `url(${movie.value.Poster})` } : {},
)

const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')

const loadMovie = async () => {
  isLoading.value = true
  errorMessage.value = ''
  movie.value = null

  try {
    movie.value = await getMovieDetails(props.id)
    await nextTick()

    if (detailContent.value) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) {
        gsap.from(detailContent.value.children, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
        })
      }
    }
  } catch (error) {
    errorMessage.value = error.message || 'We could not load this movie.'
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = () => {
  if (!movie.value) return

  if (isFavorite.value) {
    favoritesStore.removeFavorite(movie.value.imdbID)
  } else {
    favoritesStore.addFavorite(movie.value)
  }
}

watch(() => props.id, loadMovie, { immediate: true })
</script>

<template>
  <div class="detail-view detail-view--cinematic" :style="detailStyle">
    <div class="detail-view__topbar container">
      <Button
        label="All movies"
        severity="secondary"
        text
        @click="router.push({ name: 'search' })"
      />
      <span v-if="movie">IMDb ID: {{ movie.imdbID }}</span>
    </div>

    <div v-if="isLoading" class="loading-state detail-loading container">
      <ProgressSpinner stroke-width="3" />
      <div><h2>Loading movie details...</h2><p>Getting the story, director and rating.</p></div>
    </div>

    <div v-else-if="errorMessage" class="detail-error container">
      <Message severity="error" :closable="false">{{ errorMessage }}</Message>
      <EmptyState
        icon="pi pi-exclamation-triangle"
        eyebrow="Movie unavailable"
        title="This movie could not be loaded"
        description="Return to search and choose another title."
        action-label="Back to search"
        @action="router.push({ name: 'search' })"
      />
    </div>

    <article v-else-if="movie" class="cinema-detail container">
      <div ref="detailContent" class="cinema-detail__content">
        <div class="movie-detail__eyebrow">
          <span>{{ movie.Type || 'Movie' }}</span>
          <span>/</span>
          <span>{{ movie.Rated && movie.Rated !== 'N/A' ? movie.Rated : 'Not rated' }}</span>
          <span>/</span>
          <span>{{ movie.Runtime && movie.Runtime !== 'N/A' ? movie.Runtime : movie.Year }}</span>
        </div>

        <h1>{{ movie.Title }}</h1>

        <div class="movie-detail__genres">
          <Tag v-for="genre in genres" :key="genre" :value="genre" severity="secondary" rounded />
        </div>

        <p class="movie-detail__plot">{{ movie.Plot }}</p>

        <dl class="cinema-detail__facts">
          <div>
            <dt>Director</dt>
            <dd>{{ movie.Director }}</dd>
          </div>
          <div>
            <dt>Released</dt>
            <dd>{{ movie.Released && movie.Released !== 'N/A' ? movie.Released : movie.Year }}</dd>
          </div>
          <div>
            <dt>Language</dt>
            <dd>{{ movie.Language && movie.Language !== 'N/A' ? movie.Language : 'Not listed' }}</dd>
          </div>
        </dl>

        <div class="movie-detail__actions">
          <Button
            :icon="isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
            severity="secondary"
            rounded
            outlined
            class="favorite-heart-button"
            :class="{ 'is-favorite': isFavorite }"
            :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            :aria-pressed="isFavorite"
            :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
            @click="toggleFavorite"
          />

          <div class="rating-card">
            <i class="pi pi-star-fill"></i>
            <div><strong>{{ movie.imdbRating }}</strong><span>/ 10 IMDb</span></div>
          </div>
        </div>
      </div>

      <aside class="cinema-detail__side">
        <div class="cinema-detail__poster-card">
          <img v-if="hasPoster" :src="movie.Poster" :alt="`${movie.Title} poster`" />
          <div v-else class="cinema-detail__poster-empty"><i class="pi pi-video"></i></div>
          <span>{{ movie.Year }}</span>
        </div>

        <section v-if="actors.length" class="cast-panel" aria-label="Main cast">
          <div class="cast-panel__heading">
            <p class="eyebrow">Main cast</p>
            <span>{{ actors.length }} actors</span>
          </div>
          <div class="cast-panel__list">
            <div v-for="actor in actors" :key="actor" class="cast-card">
              <span>{{ getInitials(actor) }}</span>
              <p>{{ actor }}</p>
            </div>
          </div>
        </section>
      </aside>
    </article>
  </div>
</template>