<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

import MovieCard from '../components/MovieCard.vue'
import { demoMovies } from '../data/demoMovies'
import { useAuthStore } from '../stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
const featuredMovie = demoMovies.find((movie) => movie.imdbID === 'tt0468569')
const featuredMovies = demoMovies

const { handleSubmit, isSubmitting } = useForm()

const {
  value: username,
  errorMessage: usernameError,
  handleBlur: blurUsername,
} = useField('username', (value) => {
  if (!value?.trim()) return 'Enter your username.'
  if (value.trim().length < 3) return 'Username must contain at least 3 characters.'
  return true
})

const {
  value: password,
  errorMessage: passwordError,
  handleBlur: blurPassword,
} = useField('password', (value) => {
  if (!value) return 'Enter your password.'
  if (value.length < 6) return 'Password must contain at least 6 characters.'
  return true
})

const wasRedirected = computed(() => Boolean(route.query.redirect))

const login = handleSubmit(async (values) => {
  authStore.login(values.username)
  await router.push(route.query.redirect || { name: 'search' })
})

const openMovie = (movie) => {
  router.push({ name: 'detail', params: { id: movie.imdbID } })
}
</script>

<template>
  <div class="home-view home-view--streaming">
    <section class="hero stream-hero">
      <div class="hero__inner container" :class="{ 'hero__inner--signed-in': isLoggedIn }">
        <div class="hero__copy">
          <p class="hero__welcome">
            <template v-if="isLoggedIn">
              Welcome back, {{ authStore.username }}.
              <RouterLink :to="{ name: 'search' }">Go to search</RouterLink>
            </template>
            <template v-else>Welcome to seeit.</template>
          </p>
          <h1>The Dark <em>Knight.</em></h1>
          <div class="hero__movie-meta">
            <span>2008</span>
            <span>PG-13</span>
            <span>2h 32m</span>
            <strong><i class="pi pi-star-fill"></i> 9.0</strong>
          </div>
          <p class="hero__lead">
            Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes
            to their moral limits.
          </p>
          <div class="hero__actions">
            <Button
              label="Browse movies"
              @click="router.push({ name: 'search' })"
            />
            <Button
              label="View details"
              severity="secondary"
              outlined
              @click="openMovie(featuredMovie)"
            />
          </div>
        </div>

        <Card v-if="!isLoggedIn" class="login-card login-card--overlay">
          <template #content>
            <div class="login-card__heading">
              <div>
                <p class="eyebrow">Start your watchlist</p>
                <h2>Sign in to seeit</h2>
              </div>
            </div>

            <Message v-if="wasRedirected" severity="warn" :closable="false">
              Sign in to open your favorites.
            </Message>

            <form class="login-form" novalidate @submit="login">
              <div class="form-field">
                <label for="username">Username</label>
                <InputText
                  id="username"
                  v-model="username"
                  autocomplete="username"
                  placeholder="e.g. oliwia"
                  :invalid="Boolean(usernameError)"
                  fluid
                  @blur="blurUsername"
                />
                <small v-if="usernameError" class="field-error">
                  <i class="pi pi-exclamation-circle"></i>{{ usernameError }}
                </small>
              </div>

              <div class="form-field">
                <div class="form-field__label">
                  <label for="password">Password</label>
                  <span>6+ characters</span>
                </div>
                <InputText
                  id="password"
                  v-model="password"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Enter any password"
                  :invalid="Boolean(passwordError)"
                  fluid
                  @blur="blurPassword"
                />
                <small v-if="passwordError" class="field-error">
                  <i class="pi pi-exclamation-circle"></i>{{ passwordError }}
                </small>
              </div>

              <Button type="submit" label="Enter seeit" :loading="isSubmitting" fluid />
              <p class="login-form__note">
                <i class="pi pi-lock"></i> Demo login. No account is created, and any valid
                username and password will work.
              </p>
            </form>
          </template>
        </Card>
      </div>
      <div class="stream-hero__scroll"><span>Scroll to explore</span><i class="pi pi-arrow-down"></i></div>
    </section>

    <section class="featured-shelf container">
      <div class="featured-shelf__heading">
        <div>
          <p class="eyebrow">Popular on seeit</p>
          <h2>Choose your next movie</h2>
        </div>
        <Button
          label="View all movies"
          severity="secondary"
          text
          @click="router.push({ name: 'search' })"
        />
      </div>

      <div class="featured-shelf__track">
        <MovieCard
          v-for="movie in featuredMovies"
          :key="movie.imdbID"
          :movie="movie"
          @select="openMovie"
        />
      </div>
    </section>
  </div>
</template>
