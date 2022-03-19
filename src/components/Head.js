import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import '../css/index.css'

// ページコンポーネントから、titleをpropしています
const Head = (props) => {
  const {title} = props
  return (
    <Helmet>
      <title>{title}</title>
      <meta
          name="description"
          content="footlogは、Jリーグサポートターのための観戦記録サービスです。"
      />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@footlog_j" />
      <meta name="twitter:title" content="footlog" />
      <meta name="twitter:description" content="footlogは、Jリーグサポートターのための観戦記録サービスです。" />
      <meta name="twitter:image" content="https://footlog.net/" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
    </Helmet>
  )
}

export default Head