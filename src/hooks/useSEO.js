import { useEffect } from 'react'

const BASE_URL = 'https://www.imakash.in'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.png`

/**
 * useSEO — Imperatively manages <head> meta tags for a CSR React app.
 *
 * Writes/updates: <title>, meta description, canonical, OG tags, Twitter Card tags,
 * and robots meta. Cleans up on unmount so navigating away resets to defaults.
 *
 * Usage:
 *   useSEO({
 *     title: 'Page Title',
 *     description: 'Page description ...',
 *     canonical: '/about',           // path or full URL
 *     ogImage: '/og/about.png',      // path under public/
 *     ogType: 'website',             // default 'website'
 *     noindex: false,                // default false
 *   })
 */
export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} – Akash Gangurde` : 'Akash Gangurde – UX/UI Designer Portfolio'
    const fullCanonical = canonical
      ? canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`
      : null
    const fullOgImage = ogImage
      ? ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
      : DEFAULT_OG_IMAGE
    const metaDesc = description || 'UX/UI Designer crafting thoughtful, user-centered digital experiences and products.'

    // ── <title> ──────────────────────────────────────────────────────────────
    const prevTitle = document.title
    document.title = fullTitle

    // ── Helper to upsert a <meta> tag ────────────────────────────────────────
    const setMeta = (selector, attr, value) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrVal] = attr.split('=').map(s => s.replace(/['"]/g, ''))
        el.setAttribute(attrName, attrVal)
        el.dataset.seoManaged = '1'
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
      return el
    }

    // ── Helper to upsert a <link> tag ────────────────────────────────────────
    const setLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        el.dataset.seoManaged = '1'
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
      return el
    }

    // ── Standard meta ────────────────────────────────────────────────────────
    setMeta('meta[name="description"]', 'name="description"', metaDesc)
    setMeta(
      'meta[name="robots"]',
      'name="robots"',
      noindex ? 'noindex,nofollow' : 'index,follow'
    )

    // ── Canonical ────────────────────────────────────────────────────────────
    let canonicalEl = null
    if (fullCanonical) {
      canonicalEl = setLink('canonical', fullCanonical)
    }

    // ── Open Graph ───────────────────────────────────────────────────────────
    setMeta('meta[property="og:type"]', 'property="og:type"', ogType)
    setMeta('meta[property="og:title"]', 'property="og:title"', fullTitle)
    setMeta('meta[property="og:description"]', 'property="og:description"', metaDesc)
    setMeta('meta[property="og:image"]', 'property="og:image"', fullOgImage)
    setMeta('meta[property="og:image:width"]', 'property="og:image:width"', '1200')
    setMeta('meta[property="og:image:height"]', 'property="og:image:height"', '630')
    if (fullCanonical) {
      setMeta('meta[property="og:url"]', 'property="og:url"', fullCanonical)
    }
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', 'Akash Gangurde Portfolio')
    setMeta('meta[property="og:locale"]', 'property="og:locale"', 'en_US')

    // ── Twitter Card ─────────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', metaDesc)
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', fullOgImage)
    setMeta('meta[name="twitter:creator"]', 'name="twitter:creator"', '@imakash_in')

    // ── Cleanup on unmount / route change ─────────────────────────────────────
    return () => {
      document.title = prevTitle
      document.head.querySelectorAll('[data-seo-managed]').forEach(el => el.remove())
    }
  }, [title, description, canonical, ogImage, ogType, noindex])
}
