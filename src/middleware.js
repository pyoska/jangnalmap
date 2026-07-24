import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/robots.txt') {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://jangnalmap.com/sitemap.xml

#DaumWebMasterTool:31e1c1e9a77ec5eaba225de70a3afe1eb1ed94099e0576c16c85bb140568ac89:JbtVqj5ycYCrCKnoguOyqw==
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
