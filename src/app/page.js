import { getMarkets } from '@/lib/db';
import HomeClient from '@/components/HomeClient';

export const revalidate = 600; // 10 minutes ISR cache

export default async function Home() {
  const markets = await getMarkets();
  
  return <HomeClient initialMarkets={markets} />;
}
