# JobFinder

**Topic:** Job Finding

**Group members:** Almansur Maxym, Adilbek Kairov (IT-2501)

**Website:** https://alwoosh0.github.io/WEB_Technologies_Frontend_MidTerm/

**Repository:** https://github.com/alwoosh0/WEB_Technologies_Frontend_MidTerm

## Description

JobFinder is a responsive multi-page website for finding jobs in Kazakhstan. Users can search local vacancies, browse international vacancies from a public API, see hiring companies, register, sign in and read answers to common questions.

## Pages

- **Home**: hero with a job search form, categories, featured jobs
- **Jobs**: search and filters, international vacancies from the API, vacancy table with CRUD
- **Companies**: company cards and an image gallery with a lightbox
- **About**: mission, statistics and FAQ
- **Contact**: contact form and registration form
- **Sign in**: sign-in form and profile of the signed-in user

## Features

- Light/dark theme toggle saved in localStorage
- Sign in and sign out with localStorage (only name and email are saved, never the password)
- FAQ with jQuery `.slideToggle()` and a + / − indicator
- Arbeitnow API integration with `fetch()`: search, remote filter, pages, refresh and error handling
- Registration form with RegEx email check, password strength indicator and real-time feedback
- Live search and category filters for local vacancies
- Vacancy table with Create, Read, Update and Delete
- Image gallery with a lightbox and jQuery fade effects
- Responsive design with Flexbox, Grid, media queries and the Bootstrap grid

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript, jQuery 3.7, Fetch API, localStorage, Arbeitnow API, Google Fonts, GitHub Pages

The full report is in [REPORT.md](REPORT.md).
