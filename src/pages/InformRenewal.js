import React from 'react';
import { Container } from 'react-bootstrap';
import AdsCard from '../components/AdsCard';

const Privacy = () => {
  return (
    <Container>
      <h1 className="text-center">現在、サービスをリニューアルしております。</h1>
      <h2 className="text-center">投稿いただいておりますデータは削除されません。</h2>
      <h2 className="text-center">サービス再開まで、今しばらくお待ち下さい。</h2>
      <div className="my-5">
        <AdsCard />
      </div>
    </Container>
  )
}
export default Privacy;
