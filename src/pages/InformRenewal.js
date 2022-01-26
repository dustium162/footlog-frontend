import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import { Container } from 'react-bootstrap';

const Privacy = () => {
  return (
    <HelmetProvider>
      <Container>
        <Head title="footlog" />
        <h1 className="text-center">現在、サービスをリニューアルしております。</h1>
        <h2 className="text-center">投稿いただいておりますデータは削除されません。</h2>
        <h2 className="text-center">サービス再開まで、今しばらくお待ち下さい。</h2>
      </Container>
    </HelmetProvider>
  )
}

export default Privacy;