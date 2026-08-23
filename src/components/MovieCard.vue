<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

defineProps({
  movie: {
    type: Object,
    required: true,
  },
  showRemove: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select', 'remove'])

const hasPoster = (poster) => poster && poster !== 'N/A'
</script>

<template>
  <Card
    class="movie-card"
    role="button"
    tabindex="0"
    :aria-label="`Open details for ${movie.Title}`"
    @click="emit('select', movie)"
    @keydown.enter="emit('select', movie)"
    @keydown.space.prevent="emit('select', movie)"
  >
    <template #header>
      <div class="movie-card__visual">
        <img
          v-if="hasPoster(movie.Poster)"
          :src="movie.Poster"
          :alt="`${movie.Title} poster`"
          class="movie-card__poster"
          loading="lazy"
        />
        <div v-else class="movie-card__poster-fallback" aria-hidden="true">
          <i class="pi pi-video"></i>
          <span>{{ movie.Title }}</span>
        </div>

        <span class="movie-card__year">{{ movie.Year }}</span>
        <Button
          v-if="showRemove"
          label="Remove"
          severity="danger"
          size="small"
          class="movie-card__remove"
          :aria-label="`Remove ${movie.Title} from favorites`"
          @click.stop="emit('remove', movie.imdbID)"
        />
        <div class="movie-card__open" aria-hidden="true">
          <i class="pi pi-arrow-up-right"></i>
        </div>
      </div>
    </template>

    <template #content>
      <div class="movie-card__copy">
        <p>{{ movie.Type || 'movie' }}</p>
        <h3>{{ movie.Title }}</h3>
      </div>
    </template>
  </Card>
</template>
