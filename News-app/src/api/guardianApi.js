import axios from 'axios'


const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY

const client = axios.create({
  baseURL: 'https://content.guardianapis.com',
})

/**
 * Search for articles.
 * @param {{ query?: string, section?: string, page?: number, pageSize?: number }} params
 * Returns { results, currentPage, pages, total }
 */
export async function searchArticles({ query = '', section = '', page = 1, pageSize = 12 } = {}) {
  const { data } = await client.get('/search', {
    params: {
      'api-key': API_KEY,
      q: query || undefined,
      section: section || undefined,
      page,
      'page-size': pageSize,
      'order-by': 'newest',
      'show-fields': 'thumbnail,trailText,byline,firstPublicationDate',
    },
  })

  return {
    results: data.response.results,
    currentPage: data.response.currentPage,
    pages: data.response.pages,
    total: data.response.total,
  }
}

/**
 * Fetch one article's full content by its Guardian id
 * (the id looks like "world/2026/sep/12/some-headline-slug").
 */
export async function fetchArticleById(id) {
  const { data } = await client.get(`/${id}`, {
    params: {
      'api-key': API_KEY,
      'show-fields': 'headline,trailText,thumbnail,bodyText,byline,firstPublicationDate',
    },
  })

  return data.response.content
}
