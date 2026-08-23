# seeit - Movie Discovery

seeit is a Vue 3 application for finding movies and saving favorites. I built it for the MovieBase assignment as part of my Multimedia Design studies.

## Features

- Search the OMDb catalogue by movie title
- Open a detail page with the poster, year, genre, director, plot and IMDb rating
- Add and remove movies from a personal favorites list
- Protected favorites route with a Vue Router navigation guard
- Login form validation with VeeValidate
- Pinia stores for authentication and favorites
- Loading, error, no-results and empty-list states
- Responsive layouts for desktop, tablet and mobile
- Local storage for the session, favorites and recent searches
- Demo data when an OMDb key has not been added yet
- CSS, Vue and GSAP animations

## Technology

- Vue 3
- Vite
- Vue Router
- Pinia
- PrimeVue 4
- VeeValidate
- OMDb API
- GSAP
- SCSS
- Vitest

## Project structure

```text
src/
|-- main.js
|-- App.vue
|-- router/
|   `-- index.js
|-- stores/
|   |-- index.js
|   |-- authStore.js
|   `-- favoritesStore.js
|-- services/
|   `-- omdb.js
|-- data/
|   `-- demoMovies.js
|-- views/
|   |-- HomeView.vue
|   |-- SearchView.vue
|   |-- MovieDetail.vue
|   `-- FavoritesView.vue
|-- components/
|   |-- MovieCard.vue
|   `-- EmptyState.vue
`-- styles/
    `-- main.scss
```

## Local setup

You need Node.js 20 or newer and a free OMDb API key.

1. Install the dependencies:

```bash
npm install
```

2. Copy `.env.example` and rename the copy to `.env`.

3. Add your OMDb key:

```env
VITE_OMDB_API_KEY=your_real_key
VITE_ENABLE_DEMO_FALLBACK=true
```

4. Start the development server:

```bash
npm run dev
```

Request a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) and activate it through the confirmation email. Restart the development server after changing `.env`.

The app uses six local demo movies when no key is configured. A valid key enables the full OMDb search and detail requests.

## Demo login

This assignment does not require a real authentication server. Use any username with at least 3 characters and any password with at least 6 characters.

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run test
```

## Checks before submission

1. Open `/favorites` while logged out and confirm that the app redirects to `/`.
2. Submit an empty login form and check both validation messages.
3. Log in and confirm that the app opens `/search`.
4. Search for a movie and check the loading and error states.
5. Open a movie and check all required details.
6. Add the movie to favorites.
7. Remove it from the Favorites page.
8. Log out and confirm that the app returns to `/`.

## Deployment

Push the project to GitHub and import the repository into Vercel. Select Vite as the framework and add `VITE_OMDB_API_KEY` in the project environment variables. The included `vercel.json` handles direct access to Vue Router URLs.

See [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for the full setup and submission process. The assignment mapping is available in [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md).

Created by Oliwia Kmiecik.
