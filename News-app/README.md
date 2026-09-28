
# Dispatch — a React news reader

A news app built with **React**, **Axios**, **React Router DOM**, and
**Tailwind CSS**, pulling live articles from the **Guardian Open Platform**
API. Built as a learning project.

## Features

- A large "top story" hero on the homepage, plus a responsive grid of
  the rest (one column on mobile, two on tablet, three on desktop)
- A scrolling headline ticker under the header, pulling the 10 newest
  articles site-wide
- Click any article for a full detail page
- Search by keyword
- Filter by section (World, Business, Technology, Science, Sport,
  Environment, Culture)
- "Load more" pagination
- A Blog page pulling the Guardian's opinion/commentary section
  (`commentisfree`) — the closest thing to a "blog" in their API
- About and Contact pages, linked from the footer
- SVG favicon

## Project structure

```
src/
  api/
    guardianApi.js         # every Axios call to the Guardian API lives here
  hooks/
    useArticleFeed.js      # shared fetch/pagination logic, used by Home and Blog
  components/
    Header.jsx              # masthead + section nav
    Ticker.jsx               # scrolling headline strip under the header
    Footer.jsx                # Sections + More (About/Blog/Contact) columns
    SearchBar.jsx
    Filters.jsx                # section filter chips (also exports SECTIONS)
    NewsList.jsx                # grid + loading/error/empty states + load more
    FeaturedArticle.jsx          # the large top-story hero
    NewsItem.jsx                  # one article card
    Loader.jsx
    ErrorMessage.jsx
  pages/
    Home.jsx                       # search + filters + list, owns the fetching logic
    ArticleDetail.jsx                # full article, fetched by id
    Blog.jsx                          # opinion/commentary feed
    About.jsx
    Contact.jsx
    NotFound.jsx
  App.jsx                             # routes
  index.css                            # Tailwind directives + a couple of global rules
  lib/layout.js                         # shared "wrap" container class used on every page
public/
  favicon.svg
tailwind.config.cjs                      # design tokens: colors, fonts, marquee animation
postcss.config.cjs
```

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

- **Axios calls** all live in `src/api/guardianApi.js` — nothing else in
  the app imports `axios` directly. It exports `searchArticles(...)` and
  `fetchArticleById(...)`, which everything else calls instead.
- **`useArticleFeed`** wraps the fetch/pagination logic (loading, error,
  "load more", retry) in one hook, shared by `Home.jsx` (search + section
  filters) and `Blog.jsx` (fixed to the `commentisfree` section).
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
- **The homepage's top story** is just the first article from the current
  feed (`NewsList` splits it off when given a `featured` prop) — it isn't a
  separate fetch, so it naturally follows whatever search or section filter
  is active.
- **Tailwind** is configured in `tailwind.config.cjs` (colors, fonts, and the
  ticker's `marquee` keyframe animation live there) and wired in via
  `postcss.config.cjs`, which Vite picks up automatically.

## Notes

- Article content comes from the Guardian's public API under its
  non-commercial developer terms — the footer and each article link back to
  theguardian.com, which their terms ask for.
- The free tier is capped at 12 requests/second and 5,000/day, more than
  enough for this app.
- The email on the Contact page (`src/pages/Contact.jsx`) is a placeholder —
  swap it for a real one before sharing the site.
```

## Live Demo

[View the live site on vercel]( https://dispatch-news-app21.vercel.app/)