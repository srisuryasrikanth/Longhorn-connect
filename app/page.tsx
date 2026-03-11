import HomePageClient from "@/components/home-page-client";
import { getHomePageData } from "@/lib/services/alumni";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { initialSearch, filterOptions, leaderboard } = await getHomePageData();

  return <HomePageClient initialSearch={initialSearch} filterOptions={filterOptions} leaderboard={leaderboard} />;
}

