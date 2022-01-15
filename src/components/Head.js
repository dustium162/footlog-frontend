import * as React from 'react';
import { Helmet } from 'react-helmet';
// import '../css/index.css'

// ページコンポーネントから、titleをpropしています
const Head = (props) => {
  const {title} = props
  return (
    <Helmet>
      <title>{title}</title>
      <meta
          name="description"
          content="ポートフォリオサイトです。"
      />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta>
    </Helmet>
  )
}

export default Head