export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: https://jangnalmap.com/sitemap.xml

#DaumWebMasterTool:31e1c1e9a77ec5eaba225de70a3afe1eb1ed94099e0576c16c85bb140568ac89:JbtVqj5ycYCrCKnoguOyqw==
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  });
}
