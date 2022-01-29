import React from 'react';
import Layout from '../components/Layout';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';

const Contact = () => {

  return (
    <HelmetProvider>
      <Layout>
        <Head title="お問合せ" />
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScNaff-RbSIkR-l1_3jOsTrVfmmoeaj3ytfMdurpwnQjUMzYQ/viewform?usp=sf_link" title="google-forms" width="100%" height="1030" frameBorder="0" marginHeight="0" marginWidth="0">読み込んでいます…</iframe>
      </Layout>
    </HelmetProvider>
  )
}

export default Contact;