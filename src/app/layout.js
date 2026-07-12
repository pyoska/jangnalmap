import "./globals.css";

export const metadata = {
  title: "장날맵.com | 대한민국 전국 오일장 지도 - 오늘 개장 정보 & 주차 꿀팁",
  description: "대한민국 전국 1,300여 개 전통 오일장(5일장)의 날짜 주기, 오늘 개장 여부, 위치 지도, 주차 정보 및 여행 블로거가 추천하는 먹거리 정보를 확인하세요.",
  keywords: "오일장, 5일장, 전통시장, 장날, 모란시장, 정선아리랑시장, 전국 오일장 날짜, 전국 오일장 지도",
  authors: [{ name: "장날맵" }],
  alternates: {
    canonical: "https://jangnalmap.com/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#060913] text-[#F3F4F6]">
        {children}
      </body>
    </html>
  );
}
