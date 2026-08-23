import { demoMovies, getDemoMovie, searchDemoMovies } from '../data/demoMovies'

const API_URL = 'https://www.omdbapi.com/'
const configuredKey = import.meta.env.VITE_OMDB_API_KEY?.trim()
const hasApiKey = Boolean(configuredKey && configuredKey !== 'your_api_key_here')
const demoFallbackEnabled = import.meta.env.VITE_ENABLE_DEMO_FALLBACK !== 'false'

const request = async (params) => {
  const url = new URL(API_URL)
  url.search = new URLSearchParams({ ...params, apikey: configuredKey }).toString()

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The movie service returned HTTP ${response.status}.`)
  }

  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error || 'No movies found.')
  }

  return data
}

export const isDemoMode = () => !hasApiKey && demoFallbackEnabled

export const getDemoCollection = () => demoMovies

export const searchMovies = async (query) => {
  if (!hasApiKey) {
    if (!demoFallbackEnabled) {
      throw new Error('The OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env file.')
    }

    await new Promise((resolve) => setTimeout(resolve, 450))
    const results = searchDemoMovies(query)

    if (!results.length) {
      throw new Error('No demo titles match that search. Try "Matrix", "Nolan" or "Drama".')
    }

    return results
  }

  const data = await request({ s: query.trim(), type: 'movie' })
  return data.Search
}

export const getMovieDetails = async (imdbID) => {
  if (!hasApiKey) {
    if (!demoFallbackEnabled) {
      throw new Error('The OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env file.')
    }

    await new Promise((resolve) => setTimeout(resolve, 350))
    const movie = getDemoMovie(imdbID)

    if (!movie) {
      throw new Error('This title is not available in the demo collection.')
    }

    return movie
  }

  return request({ i: imdbID, plot: 'full' })
}
