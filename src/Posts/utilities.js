import React from 'react';
import { Helmet } from 'react-helmet';
import posts from './posts.json';

export const postData = slug => posts.find(post => post.slug === slug);

export function getHelmet(slug) {
  const { title, date, summary } = postData(slug);
  return {
    helmet: (
      <Helmet>
        <title>{`${title} - Jason Forbes`}</title>
        <meta name="description" content={summary} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css"
          integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y"
          crossOrigin="anonymous"
        />
      </Helmet>
    ),
    title,
    date,
  };
}

export default getHelmet;
