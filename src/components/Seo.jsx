import { Helmet } from 'react-helmet-async'

const SITE = 'Glover, Mast & Purl LLP'
const HOST = 'https://glovermastpurl.com'
const DEFAULT_DESC = 'Premier litigation counsel for entities who cannot independently retain or instruct legal representation. New York, London, Geneva.'
const DEFAULT_IMAGE = `${HOST}/og-default.png`

export default function Seo({ title, description, image, type = 'website', canonicalPath = '/', jsonLd }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Counsel for Those Who Cannot Speak for Themselves`
  const desc = description || DEFAULT_DESC
  const url = `${HOST}${canonicalPath}`
  const img = image ? (image.startsWith('http') ? image : `${HOST}${image}`) : DEFAULT_IMAGE
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={SITE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
