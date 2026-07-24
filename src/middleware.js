import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/robots.txt') {
    const robotsContent = `#DaumWebMasterTool:023c1289d870bf1ef220d312c4d43cf2afb61d34658beef7bd2649554e210e2e:JbtVqj5ycYCrCKnoguOyqw==

User-agent: *
Allow: /

User-agent: Daumoa
Allow: /

Sitemap: https://jangnalmap.com/sitemap.xml
Sitemap: https://www.jangnalmap.com/sitemap.xml
`;
    return new NextResponse(robotsContent, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  }
}

export const config = {
  matcher: '/robots.txt',
};
