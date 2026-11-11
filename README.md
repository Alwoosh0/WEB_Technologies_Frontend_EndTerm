# JobFinder

**Topic:** Job Finding

## Group members

- Almansur Maxym (IT-2501)
- Adilbek Kairov (IT-2501)

## Description

JobFinder is a multi-page responsive website for finding jobs in Kazakhstan. Students, graduates and professionals can browse vacancies, see companies that are hiring, register and contact the platform.

For the endterm we used our midterm project as the base and added interactivity with JavaScript and jQuery: a registration form with real-time validation, live search and filters for vacancies, a vacancy table with CRUD operations and an image gallery with a lightbox.

## Pages

- **Home**: hero section with a job search form, popular categories, featured jobs, how it works
- **Jobs**: live search, category filters, job cards and a table for managing vacancies
- **Companies**: companies that are hiring and an image gallery with a lightbox
- **About**: mission of the platform, advantages and statistics
- **Contact**: contact form, office information and a registration form

## Features implemented

### Midterm

- Navigation bar with logo on all pages (Flexbox)
- Semantic HTML5: `header`, `nav`, `main`, `section`, `article`, `address`, `footer`
- Table with vacancies and forms (job search, contact form)
- External stylesheet `css/style.css`, no inline or internal styles
- CSS variables in `:root` and the Poppins font from Google Fonts
- Layout with Flexbox and CSS Grid, positioning, `:hover`, `:focus` and `:nth-child()`
- `loading="lazy"` on images below the fold
- Mobile-first responsive design with media queries for tablet (768px) and desktop (992px)
- Bootstrap grid and utility classes

### Endterm

**1. Registration form with validation (Contact page)**
- Required field checks for name, email, password and password confirmation
- Email format check with a regular expression
- Password strength indicator (weak, medium, strong) with a colored bar
- Password confirmation check
- Real-time feedback while typing (green or red border, ✔ / ✖ messages)
- The form is not submitted if there are errors, and a Bootstrap alert shows what to do

**2. Dynamic search and filter (Jobs page)**
- Search bar that filters vacancies by position, company or city while the user types (`.on("input")`)
- Category buttons: All, Full-time, Part-time, Internship, Remote
- Search and category filter work together, case-insensitive, without page reload
- The search form on the Home page opens the Jobs page with the keyword already filled in

**3. Vacancy table with CRUD (Jobs page)**
- Create: add a new vacancy with a form
- Read: all vacancies are displayed in a table generated with jQuery
- Update: the Edit button loads a vacancy into the form, Save changes updates it
- Delete: the Delete button removes a vacancy after a confirmation prompt
- Job cards and the table use the same data, so changes appear in both places

**4. Image gallery with lightbox (Companies page)**
- Responsive gallery grid made with the Bootstrap grid
- Clicking an image opens it in a lightbox with previous and next arrows
- Smooth transitions with jQuery `.fadeIn()`, `.fadeOut()` and `.animate()`
- Keyboard support: arrow keys and Escape

## Technologies used

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript
- jQuery 3.7
- Google Fonts (Poppins)
- GitHub Pages

## Project structure

```
index.html, jobs.html, companies.html, about.html, contact.html
css/style.css
js/script.js
images/
README.md
```

## Individual contribution

- **Almansur Maxym**: vacancy search and category filters, vacancy table with CRUD operations
- **Adilbek Kairov**: registration form validation with password strength indicator, image gallery with lightbox
- **Together**: midterm pages and design, testing on different screen sizes, README and publishing

## Published website

https://alwoosh0.github.io/WEB_Technologies_Frontend_MidTerm/
