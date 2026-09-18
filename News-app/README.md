# Dispatch — a React news reader

A small news app built with **React**, **Axios**, **React Router DOM**, and
**Tailwind CSS**, pulling live articles from the **Guardian Open Platform**
API.

## Features

- Browse recent articles with images, summaries, sections, and dates
- Click any article for a full detail page
- Search by keyword
- Filter by section (World, Business, Technology, Science, Sport, Environment, Culture)
- "Load more" pagination
- Responsive: one column on mobile, two on tablet, three on desktop

## Project structure

```
src/
  api/
    guardianApi.js      # every Axios call to the Guardian API lives here
  components/
    Header.jsx           # masthead + section nav
    Footer.jsx
    SearchBar.jsx
    Filters.jsx           # section filter chips (also exports SECTIONS)
    NewsList.jsx          # grid + loading/error/empty states + load more
    NewsItem.jsx           # one article card
    Loader.jsx
    ErrorMessage.jsx
  pages/
    Home.jsx               # search + filters + list, owns the fetching logic
    ArticleDetail.jsx      # full article, fetched by id
    NotFound.jsx
  App.jsx                   # routes
  index.css                 # Tailwind directives + a couple of global rules
  lib/layout.js             # shared "wrap" container class used on every page
tailwind.config.cjs          # design tokens: colors (navy, blue, ink...) and fonts
postcss.config.cjs
```

## Live Demo

[View the live site on vercel]( https://dispatch-news-app-ivory.vercel.app/)

## Getting started

**1. Get a free API key**
Register at https://open-platform.theguardian.com/access/ — it's instant and
free for non-commercial use.

**2. Add your key**
Copy `.env.example` to `.env` and paste your key in:

```
VITE_GUARDIAN_API_KEY=your_key_here
```

**3. Install and run**

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

**4. Build for production** (optional)

```bash
npm run build
npm run preview
```

## How the pieces fit together (if you're new to this)

- **Axios calls** all live in `src/api/guardianApi.js`, so `Home.jsx` and
  `ArticleDetail.jsx` never talk to the API directly — they just call
  `searchArticles(...)` or `fetchArticleById(...)`.
- **Routing** is set up in `App.jsx` with `react-router-dom`. Notice the
  article route is `/article/*` (a "splat" route) rather than `/article/:id` —
  Guardian article ids look like `world/2026/sep/12/some-slug`, which contain
  slashes, so a normal `:id` param would only capture the first segment.
- **Search and filters** are stored in the URL as query params
  (`?q=...&section=...`) via `useSearchParams`, not component state. That
  means a search is shareable/bookmarkable and survives a page refresh.
- **Clicking an article** passes the already-fetched article data along via
  `<Link state={{ preview: article }}>`, so the detail page can render
  instantly while it fetches the full body text in the background.

## Notes

- Article content comes from the Guardian's public API under its
  non-commercial developer terms — the footer and each article link back to
  theguardian.com, which their terms ask for.
- The free tier is capped at 12 requests/second and 5,000/day, more than
  enough for this app.