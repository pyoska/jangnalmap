import "./globals.css";
import Script from 'next/script';
import { Outfit, Noto_Sans_KR } from 'next/font/google';

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
  },
  verification: {
    google: "fT2emzV4r4ASbRJZXiA21iwBfm5XjOokGoQg5UJ-4_k",
    other: {
      "naver-site-verification": "56f00ee05a771d2a8d5d35c4f0d9ba206ecfd7ab",
    }
  },
  other: {
    "google-adsense-account": "ca-pub-3887993426553204"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${notoSansKr.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#060913] text-[#F3F4F6]">
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3887993426553204"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}
