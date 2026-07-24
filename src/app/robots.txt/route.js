export async function GET() {
  const content = `#DaumWebMasterTool:023c1289d870bf1ef220d312c4d43cf2afb61d34658beef7bd2649554e210e2e:JbtVqj5ycYCrCKnoguOyqw==

User-agent: *
Allow: /

User-agent: Daumoa
Allow: /

Sitemap: https://jangnalmap.com/sitemap.xml
Sitemap: https://www.jangnalmap.com/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  });
}
