import { getMarkets } from '@/lib/db';

export const revalidate = 600; // Cache API response for 10 minutes

export async function GET() {
  try {
    const markets = await getMarkets();
    return Response.json(markets);
  } catch (error) {
    console.error('API markets fetch failed', error);
    return Response.json({ error: 'Failed to fetch markets' }, { status: 500 });
  }
}
