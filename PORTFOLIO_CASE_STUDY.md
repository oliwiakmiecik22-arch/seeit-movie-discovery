# seeit - Movie Discovery

## Project summary

seeit is a responsive movie search application built with Vue 3 and the OMDb API. I designed and developed it as a school project and prepared it for my portfolio.

## Problem

Movie catalogues often show too much information at once. I wanted to create a simpler experience that helps users search for a movie, check the most important details and save a short list for later.

## Goal

The main goals were to:

- make movie search quick and clear;
- present movie information in a readable way;
- let users save and remove favorites;
- support desktop, tablet and mobile screens;
- handle loading, errors and empty results properly.

## My role

I was responsible for the interface design, user flow, front-end development, API integration, responsive styling and testing.

## User flow

1. The user signs in with a demo login.
2. The user searches for a movie.
3. The results appear as a card grid.
4. The user opens a movie to view more information.
5. The user saves the movie to Favorites.
6. The movie can later be removed from the personal list.

## Design choices

I used a restrained monochrome palette with black, graphite, soft gray, and white. The minimal interface gives movie artwork room to stand out while keeping every action clear. The Home screen follows a streaming-service layout with a full-width featured movie and a horizontal movie shelf. The detail view uses the selected poster as an atmospheric background while keeping the movie information readable. Search results and favorites use the same card component to keep the interface consistent.

The application includes visible focus states, keyboard-accessible cards and reduced-motion support. It also includes clear feedback for loading, failed searches, missing results and an empty favorites list.

## Technical work

The application uses Vue Router for page navigation and route protection, Pinia for shared state, VeeValidate for the login form, PrimeVue for interface components and GSAP for the movie detail animation. Favorites, recent searches and login state are stored in local storage.

## Result

The final result is a complete single-page application that meets the assignment requirements and can be deployed as a portfolio project.

## Possible next steps

- Filters for year and genre
- Several named movie lists
- Real user accounts
- A backend API proxy
- Recommendations based on saved movies
