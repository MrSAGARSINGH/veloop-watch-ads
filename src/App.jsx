import { useCallback, useState } from "react";

import usePersistentState from "./hooks/usePersistentState";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import WatchAdsHero from "./components/hero/WatchAdsHero";
import Stats from "./components/stats/Stats";
import DailyProgress from "./components/progress/DailyProgress";
import AdSection from "./components/ads/AdSection";
import EarningsInfo from "./components/earnings/EarningsInfo";
import HowItWorks from "./components/earnings/HowItWorks";
import RecentActivity from "./components/activity/RecentActivity";

import "./styles/globals.scss";

const TOTAL_ADS = 6;
const DAILY_GOAL = 200;

const INITIAL_TODAY_EARNINGS = 96;
const INITIAL_LIFETIME_EARNINGS = 12450;

const initialActivities = [
  {
    id: 1,
    title: "TechNova — Product Ad",
    time: "Just now",
    duration: "30 sec",
    reward: "+25 VEs",
    status: "Completed",
  },
  {
    id: 2,
    title: "FinEdge — Finance",
    time: "12 min ago",
    duration: "45 sec",
    reward: "+35 VEs",
    status: "Completed",
  },
  {
    id: 3,
    title: "UrbanCart — Shopping",
    time: "28 min ago",
    duration: "20 sec",
    reward: "+18 VEs",
    status: "Completed",
  },
  {
    id: 4,
    title: "Learnly — Education",
    time: "1 hour ago",
    duration: "60 sec",
    reward: "+42 VEs",
    status: "Completed",
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =========================
     PERSISTENT USER DATA
  ========================= */

  const [todayEarnings, setTodayEarnings] =
    usePersistentState(
      "veloop_today_earnings",
      INITIAL_TODAY_EARNINGS
    );

  const [lifetimeEarnings, setLifetimeEarnings] =
    usePersistentState(
      "veloop_lifetime_earnings",
      INITIAL_LIFETIME_EARNINGS
    );

  const [adsWatchedToday, setAdsWatchedToday] =
    usePersistentState(
      "veloop_ads_watched_today",
      0
    );

  const [activities, setActivities] =
    usePersistentState(
      "veloop_recent_activities",
      initialActivities
    );

  /* =========================
     DERIVED VALUES
  ========================= */

  const remainingAds = Math.max(
    TOTAL_ADS - adsWatchedToday,
    0
  );

  /* =========================
     SIDEBAR
  ========================= */

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((previous) => !previous);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  /* =========================
     AD COMPLETION
  ========================= */

  const handleAdCompleted = useCallback((ad) => {
    if (!ad) return;

    const reward = Number(ad.reward) || 0;

    if (reward <= 0) return;

    setTodayEarnings(
      (previous) => previous + reward
    );

    setLifetimeEarnings(
      (previous) => previous + reward
    );

    setAdsWatchedToday(
      (previous) =>
        Math.min(
          previous + 1,
          TOTAL_ADS
        )
    );

    setActivities((previous) => [
      {
        id: `${ad.id}-${Date.now()}`,
        title: `${ad.brand} — ${ad.title}`,
        time: "Just now",
        duration: `${ad.duration} sec`,
        reward: `+${reward} VEs`,
        status: "Completed",
      },
      ...previous,
    ]);
  }, [
    setTodayEarnings,
    setLifetimeEarnings,
    setAdsWatchedToday,
    setActivities,
  ]);

  /* =========================
     DAILY BONUS
  ========================= */

  const handleBonusClick = useCallback(() => {
    window.location.assign(
      "/watchAd-bonus"
    );
  }, []);

  return (
    <div className="page">

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* TOPBAR */}

      <Topbar
        onMenuClick={toggleSidebar}
      />

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebarOverlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      {/* MAIN CONTENT */}

      <main className="mainContent">

        {/* HERO */}

        <WatchAdsHero
          todayEarnings={todayEarnings}
          lifetimeEarnings={lifetimeEarnings}
          adsWatchedToday={adsWatchedToday}
          remainingAds={remainingAds}
          dailyGoal={DAILY_GOAL}
        />

        {/* STATS */}

        <Stats
          todayEarnings={todayEarnings}
          lifetimeEarnings={lifetimeEarnings}
          adsWatchedToday={adsWatchedToday}
          remainingAds={remainingAds}
        />

        {/* DAILY PROGRESS */}

        <DailyProgress
          earned={todayEarnings}
          onBonusClick={handleBonusClick}
        />

        {/* AVAILABLE ADS */}

        <AdSection
          onAdCompleted={handleAdCompleted}
        />

        {/* EARNINGS INFORMATION */}

        <EarningsInfo />

        {/* HOW IT WORKS */}

        <HowItWorks />

        {/* RECENT ACTIVITY */}

        <RecentActivity
          activities={activities}
        />

      </main>
    </div>
  );
}

export default App;