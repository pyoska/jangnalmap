import "./globals.css";
import Script from 'next/script';
import { Outfit, Noto_Sans_KR } from 'next/font/google';
import PwaInstallBanner from '@/components/PwaInstallBanner';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import MobileNav from '@/components/MobileNav';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata = {
  title: "장날맵.com | 대한민국 전국 오일장 지도 - 오늘 개장 정보 & 주차 꿀팁",
  description: "대한민국 전국 1,300여 개 전통 오일장(5일장)의 날짜 주기, 오늘 개장 여부, 위치 지도, 주차 정보 및 여행 블로거가 추천하는 먹거리 정보를 확인하세요.",
  keywords: "오일장, 5일장, 전통시장, 장날, 모란시장, 정선아리랑시장, 전국 오일장 날짜, 전국 오일장 지도",
  authors: [{ name: "장날맵" }],
  metadataBase: new URL("https://jangnalmap.com"),
  alternates: {
    canonical: "/",
    types: {
      'application/rss+xml': '/rss.xml',
      'text/markdown': [
        { title: 'LLMs.txt Summary', url: '/llms.txt' },
        { title: 'LLMs Full Context', url: '/llms-full.txt' }
      ]
    },
  },
  verification: {
    google: "fT2emzV4r4ASbRJZXiA21iwBfm5XjOokGoQg5UJ-4_k",
    other: {
      "naver-site-verification": "56f00ee05a771d2a8d5d35c4f0d9ba206ecfd7ab",
    }
  },
  openGraph: {
    title: "장날맵.com | 대한민국 전국 오일장 지도 - 오늘 개장 정보 & 주차 꿀팁",
    description: "대한민국 전국 1,300여 개 전통 오일장(5일장)의 날짜 주기, 오늘 개장 여부, 위치 지도, 주차 정보 및 여행 블로거가 추천하는 먹거리 정보를 확인하세요.",
    url: "https://jangnalmap.com",
    siteName: "장날맵.com",
    images: [
      {
        url: "https://jangnalmap.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "장날맵 - 전국 5일장 지도",
      }
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "장날맵.com | 대한민국 전국 오일장 지도",
    description: "대한민국 전국 1,300여 개 전통 오일장(5일장)의 날짜 주기, 오늘 개장 여부, 위치 지도 및 주차 정보",
    images: ["https://jangnalmap.com/og-image.png"],
  },
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-3887993426553204"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

import AnalyticsTracker from '@/components/AnalyticsTracker';
import { GA_TRACKING_ID } from '@/lib/gtag';

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${notoSansKr.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A] overflow-x-hidden font-sans">
        <AnalyticsTracker />
        
        {/* Google Analytics GA4 Script */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3887993426553204"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* PWA Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('PWA ServiceWorker registered successfully:', registration.scope);
                }).catch(function(err) {
                  console.log('PWA ServiceWorker registration failed:', err);
                });
              });
            }
          `}
        </Script>

        {/* Naver Search Advisor 3 Rich Exposure Elements (Associated Channels, Sublinks, WebSite) */}
        <Script id="naver-seo-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://jangnalmap.com/#website",
                "url": "https://jangnalmap.com/",
                "name": "장날맵.com",
                "alternateName": "장날맵",
                "description": "대한민국 전국 오일장 지도 - 오늘 개장 정보 & 주차 꿀팁",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://jangnalmap.com/?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://jangnalmap.com/#organization",
                "name": "장날맵.com",
                "url": "https://jangnalmap.com/",
                "logo": "https://jangnalmap.com/og-image.png",
                "sameAs": [
                  "https://blog.naver.com/jangnalmap",
                  "https://instagram.com/jangnalmap"
                ],
                "founder": {
                  "@type": "Person",
                  "name": "장날맵 편집국"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "support@jangnalmap.com",
                  "contactType": "customer service"
                },
                "publishingPrinciples": "https://jangnalmap.com/about"
              },
              {
                "@type": "Person",
                "@id": "https://jangnalmap.com/#author",
                "name": "장날맵 대표 에디터",
                "jobTitle": "전통 오일장 전문 아카이비스트",
                "url": "https://jangnalmap.com/about",
                "knowsAbout": ["전통시장", "국내여행", "5일장", "지역경제"]
              },
              {
                "@type": "ItemList",
                "name": "Sublinks",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "전국 오일장 지도",
                    "url": "https://jangnalmap.com/"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "경기 오일장 날짜",
                    "url": "https://jangnalmap.com/region/gyeonggi"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "강원 오일장 날짜",
                    "url": "https://jangnalmap.com/region/gangwon"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "충청 오일장 날짜",
                    "url": "https://jangnalmap.com/region/chungbuk"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "경상 오일장 날짜",
                    "url": "https://jangnalmap.com/region/gyeongbuk"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 6,
                    "name": "전라 오일장 날짜",
                    "url": "https://jangnalmap.com/region/jeonbuk"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 7,
                    "name": "온누리상품권 10% 혜택",
                    "url": "https://jangnalmap.com/guide/onnuri"
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 8,
                    "name": "장날맵 브랜드 소개",
                    "url": "https://jangnalmap.com/about"
                  }
                ]
              }
            ]
          })}
        </Script>

        {children}
        <PwaInstallBanner />
        <ScrollToTopButton />
        <MobileNav />
      </body>
    </html>
  );
}
