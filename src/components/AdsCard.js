import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';

const AdsCard = ({className}) => {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
        window.adsbygoogle.push({});
    }
  }, [])

  return (
    <Card>
      <ins className={`adsbygoogle ${className}`}
        style={{ "display": "block" }}
        data-ad-client={process.env.REACT_APP_GOOGLE_AD_CLIENT}
        data-ad-slot={process.env.REACT_APP_GOOGLE_AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </Card>
  );
}

export default AdsCard;