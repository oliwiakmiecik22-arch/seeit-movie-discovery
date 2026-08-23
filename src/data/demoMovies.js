const rawMovies = [
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Genre: 'Action, Sci-Fi',
    Director: 'Lana Wachowski, Lilly Wachowski',
    Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    Language: 'English',
    Released: '31 Mar 1999',
    Runtime: '136 min',
    Rated: 'R',
    imdbRating: '8.7',
    Plot: 'A computer hacker discovers that the world he knows is a simulated reality and joins a rebellion to break free from its control.',
    Poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
  },
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    Language: 'English, Japanese, French',
    Released: '16 Jul 2010',
    Runtime: '148 min',
    Rated: 'PG-13',
    imdbRating: '8.8',
    Plot: 'A skilled thief who steals secrets through dream-sharing technology is offered a chance to erase his past by planting an idea.',
    Poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  },
  {
    imdbID: 'tt0110912',
    Title: 'Pulp Fiction',
    Year: '1994',
    Genre: 'Crime, Drama',
    Director: 'Quentin Tarantino',
    Actors: 'John Travolta, Uma Thurman, Samuel L. Jackson',
    Language: 'English, Spanish, French',
    Released: '14 Oct 1994',
    Runtime: '154 min',
    Rated: 'R',
    imdbRating: '8.9',
    Plot: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four stories of violence and redemption.',
    Poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Genre: 'Drama, Thriller',
    Director: 'Bong Joon Ho',
    Actors: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
    Language: 'Korean, English',
    Released: '08 Nov 2019',
    Runtime: '132 min',
    Rated: 'R',
    imdbRating: '8.5',
    Plot: 'A struggling family gradually enters the home of a wealthy household, with consequences none of them can predict.',
    Poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
  {
    imdbID: 'tt0468569',
    Title: 'The Dark Knight',
    Year: '2008',
    Genre: 'Action, Crime, Drama',
    Director: 'Christopher Nolan',
    Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    Language: 'English, Mandarin',
    Released: '18 Jul 2008',
    Runtime: '152 min',
    Rated: 'PG-13',
    imdbRating: '9.0',
    Plot: 'Batman faces a criminal mastermind whose reign of chaos pushes Gotham and its heroes to their moral limits.',
    Poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    imdbID: 'tt3783958',
    Title: 'La La Land',
    Year: '2016',
    Genre: 'Comedy, Drama, Music',
    Director: 'Damien Chazelle',
    Actors: 'Ryan Gosling, Emma Stone, Rosemarie DeWitt',
    Language: 'English, Cantonese',
    Released: '25 Dec 2016',
    Runtime: '128 min',
    Rated: 'PG-13',
    imdbRating: '8.0',
    Plot: 'An aspiring actress and a jazz musician fall in love while pursuing their dreams in Los Angeles.',
    Poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  },
]

export const demoMovies = rawMovies.map((movie) => ({
  ...movie,
  Type: 'movie',
}))

export const searchDemoMovies = (query) => {
  const normalizedQuery = query.trim().toLowerCase()

  return demoMovies.filter((movie) =>
    [movie.Title, movie.Year, movie.Genre, movie.Director]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery),
  )
}

export const getDemoMovie = (imdbID) =>
  demoMovies.find((movie) => movie.imdbID === imdbID)
