'use client';

import { useEffect, useRef } from 'react';

export default function AdSenseAd({ client = 'ca-pub-3887993426553204', slot, format = 'auto', responsive = 'true', layoutKey }) {
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only push once per mount to prevent duplicate push errors
    if (!hasLoaded.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          hasLoaded.current = true;
        }
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, []);

  return (
    <div className="adsense-container w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
      />
    </div>
  );
}
