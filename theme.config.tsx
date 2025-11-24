import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>RN Shad UI</span>,
  project: {
    link: 'https://github.com/yourusername/rn-shad',
  },
  docsRepositoryBase: 'https://github.com/yourusername/rn-shad/tree/main/apps/docs',
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} © RN Shad UI - React Native shadcn/ui Components
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="RN Shad UI" />
      <meta property="og:description" content="Beautiful and accessible React Native components" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: Infinity,
  },
  toc: {
    backToTop: true
  },
}

export default config
