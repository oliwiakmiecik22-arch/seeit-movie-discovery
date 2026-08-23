# seeit - Project Guide

This guide explains how to open, run, test and submit the project.

## 1. Open the project

1. Extract `SEEIT-MovieBase-Portfolio.zip`.
2. Open Visual Studio Code.
3. Select **File > Open Folder**.
4. Choose the `moviebase-portfolio` folder.
5. Select **Terminal > New Terminal**.

Check your Node.js version:

```bash
node -v
```

Use Node.js 20 or newer. Install the current LTS version from [nodejs.org](https://nodejs.org/) if the command does not work.

## 2. Install the dependencies

Run this command inside the project folder:

```bash
npm install
```

The command creates a `node_modules` folder. Do not upload that folder to GitHub.

## 3. Request an OMDb API key

1. Open [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).
2. Select the free plan.
3. Enter your email address and use a short description such as `Student Vue movie project`.
4. Open the confirmation email from OMDb.
5. Activate and copy the key.

Request the key early because activation may take some time.

## 4. Add the API key

1. Find `.env.example` in Visual Studio Code.
2. Make a copy and name it `.env`.
3. Replace the placeholder with your key.

The file should look like this:

```env
VITE_OMDB_API_KEY=your_real_key
VITE_ENABLE_DEMO_FALLBACK=true
```

Do not add spaces or quotation marks. The `.env` file is ignored by Git and should not be committed.

## 5. Run the application

Use this command:

```bash
npm run dev
```

Open the local address shown in the terminal. It is usually `http://localhost:5173`.

Restart the server after adding or changing the `.env` file.

## 6. Log in

The login is only used to demonstrate form validation and the protected route.

- Username: at least 3 characters, for example `Oliwia`
- Password: at least 6 characters, for example `seeit123`

Any values that meet these rules will work.

## 7. Test the full flow

Complete these checks before submission:

1. Open `/favorites` while logged out. The app should redirect to Home and show a login message.
2. Submit the empty login form. Both fields should show an error.
3. Enter a valid username and password. The Search page should open.
4. Search for `Inception`. A spinner should appear while the request is running.
5. Open a movie card.
6. Check the poster, title, year, genre, director, plot and IMDb rating.
7. Select **Add to favorites**. The button should change to **Remove from favorites**.
8. Open Favorites from the navigation bar.
9. Remove the movie with the **Remove** button on the card.
10. Log out and confirm that the Home page opens.
11. Check the layout on desktop and mobile.

## 8. Run the automated checks

Use both commands:

```bash
npm run test
npm run build
```

The tests and production build should finish without errors.

## 9. Create a GitHub repository

1. Sign in to GitHub.
2. Create a new repository called `seeit-movie-discovery`.
3. Do not add another README or `.gitignore`.
4. Create the repository.

Run the following commands in Visual Studio Code. Replace the example URL with your own repository URL.

```bash
git init
git add .
git commit -m "Build seeit movie discovery app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/seeit-movie-discovery.git
git push -u origin main
```

Check the GitHub repository and confirm that `.env` is not visible.

## 10. Deploy to Vercel

1. Sign in to [vercel.com](https://vercel.com/) with GitHub.
2. Select **Add New > Project**.
3. Import `seeit-movie-discovery`.
4. Select Vite as the framework preset.
5. Open **Environment Variables**.
6. Add `VITE_OMDB_API_KEY` and paste your key as the value.
7. Deploy the project.
8. Open the Vercel URL and repeat the checks from section 7.

The included `vercel.json` makes direct links such as `/favorites` and `/movie/:id` work after deployment.

## 11. Submit the project

Submit:

1. The public GitHub repository URL.
2. The public Vercel URL.

If the submission form accepts only one URL, use the Vercel URL and add the GitHub URL in the description or README.

## 12. Add the project to a portfolio

Take screenshots of:

1. Home with the login form.
2. Search with movie results.
3. Movie Detail.
4. Favorites with several saved movies.
5. One mobile layout.

The portfolio description can cover:

- the problem and goal;
- your role;
- the main user flow;
- the design choices;
- Vue, Pinia, Router, PrimeVue, VeeValidate, OMDb and GSAP;
- loading, errors, responsive layouts and accessibility;
- the final result and possible next steps.

Use `PORTFOLIO_CASE_STUDY.md` as a starting point and adjust it to match your own presentation style.

## Common problems

### The app still shows Demo data

Check that the file is named `.env`, not `.env.txt`. Check the variable name and restart the development server.

### OMDb returns Invalid API key

Open the OMDb confirmation email and activate the key. Wait a few minutes, then restart the application.

### The terminal shows npm: command not found

Install Node.js LTS, restart Visual Studio Code and try again.

### A Vercel route returns 404 after refresh

Check that `vercel.json` is in the project root and redeploy the project.
