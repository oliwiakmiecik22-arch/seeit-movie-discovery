import { describe, expect, it } from 'vitest'

import { getMovieDetails, isDemoMode, searchMovies } from './omdb'

describe('OMDb service demo fallback', () => {
  it('reports demo mode when no API key is configured', () => {
    expect(isDemoMode()).toBe(true)
  })

  it('returns matching demo movies', async () => {
    const results = await searchMovies('Matrix')
    expect(results).toHaveLength(1)
    expect(results[0].imdbID).toBe('tt0133093')
  })

  it('returns details by IMDb id', async () => {
    const movie = await getMovieDetails('tt1375666')
    expect(movie.Title).toBe('Inception')
    expect(movie.Director).toBe('Christopher Nolan')
  })

  it('returns a useful no-results error', async () => {
    await expect(searchMovies('not-a-demo-film')).rejects.toThrow('No demo titles match')
  })
})
