import Head from 'next/head'
import { siteConfig } from '@app/config/siteConfig'
import { ReactNode } from 'react'

interface SeoProps {
  description?: string
  title?: string
  favicon?: string
  canonical?: string
  image?: string
  children?: ReactNode
}

export default function SEO({ description, title, favicon, canonical, image, children }: SeoProps) {
  return (
    <Head>
      <title>{title ? `${title} | ${siteConfig.title}` : siteConfig.title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description || siteConfig.description} />
      <meta itemProp="name" content={title || siteConfig.title} />
      <meta itemProp="description" content={description || siteConfig.description} />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title || siteConfig.title} />
      <meta property="og:description" content={description || siteConfig.description} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={`@${siteConfig.social.twitter.username}`} />
      <meta property="twitter:title" content={title || siteConfig.title} />
      <meta property="twitter:description" content={description || siteConfig.description} />
      {image && (
        <>
          <meta name="image" content={image} />
          <meta itemProp="image" content={image} />
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={title || siteConfig.title} />
          <meta property="twitter:image:src" content={image} />
        </>
      )}
      {canonical && (
        <>
          <meta property="og:url" content={canonical} />
          <link property="canonical" href={canonical} />
        </>
      )}
      <link rel="icon" href={favicon || '/favicon.ico'} />
      {children}
    </Head>
  )
}
