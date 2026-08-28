import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import WatchAdsHero from "../components/hero/WatchAdsHero";
import Stats from "../components/stats/Stats";
import DailyProgress from "../components/progress/DailyProgress";
import AdSection from "../components/ads/AdSection";
import EarningsInfo from "../components/earnings/EarningsInfo";
import HowItWorks from "../components/earnings/HowItWorks";
import RecentActivity from "../components/activity/RecentActivity";

import "./WatchAds.scss";

function WatchAds() {
  return (
    <div className="watchAdsPage">
      <Sidebar />

      <Topbar />

      <main className="mainContent">
        <WatchAdsHero />

        <Stats />

        <DailyProgress />

        <AdSection />

        <EarningsInfo />

        <HowItWorks />

        <RecentActivity />
      </main>
    </div>
  );
}

export default WatchAds;