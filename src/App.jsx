import { useCallback, useEffect, useState } from "react";

import usePersistentState from "./hooks/usePersistentState";
import useDailyPersistentState from "./hooks/useDailyPersistentState";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import WatchAdsHero from "./components/hero/WatchAdsHero";
import Stats from "./components/stats/Stats";
import DailyProgress from "./components/progress/DailyProgress";
import AdSection from "./components/ads/AdSection";
import EarningsInfo from "./components/earnings/EarningsInfo";
import HowItWorks from "./components/earnings/HowItWorks";
import RecentActivity from "./components/activity/RecentActivity";

import ScrollReveal from "./components/common/ScrollReveal";
import KeepEarning from "./components/cta/KeepEarning";
import Loader from "./components/common/Loader";
import StickyEarningSummary from "./components/common/StickyEarningSummary";
import NavigationPage from "./components/common/NavigationPage";
import Footer from "./components/layout/Footer";

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

const getInitialPage = () => {
  const hash = window.location.hash.replace(/^#\/?/, "").trim();

  return hash || "watch-ads";
};

function App() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activePage, setActivePage] = useState(getInitialPage);

  /* =========================
     DAILY USER DATA
  ========================= */

  const [todayEarnings, setTodayEarnings] = useDailyPersistentState(
    "veloop_today_earnings",
    INITIAL_TODAY_EARNINGS,
  );

  const [adsWatchedToday, setAdsWatchedToday] = useDailyPersistentState(
    "veloop_ads_watched_today",
    0,
  );

  /* =========================
     LIFETIME USER DATA
  ========================= */

  const [lifetimeEarnings, setLifetimeEarnings] = usePersistentState(
    "veloop_lifetime_earnings",
    INITIAL_LIFETIME_EARNINGS,
  );

  const [activities, setActivities] = usePersistentState(
    "veloop_recent_activities",
    initialActivities,
  );

  /* =========================
     DERIVED VALUES
  ========================= */

  const remainingAds = Math.max(TOTAL_ADS - adsWatchedToday, 0);

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
     NAVIGATION
  ========================= */

  const handleNavigation = useCallback((page) => {
    if (!page) return;

    setActivePage(page);

    window.location.hash = `/${page}`;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setSidebarOpen(false);
  }, []);

  /* =========================
     BROWSER BACK / FORWARD
  ========================= */

  useEffect(() => {
    const handleHashChange = () => {
      const page =
        window.location.hash.replace(/^#\/?/, "").trim() || "watch-ads";

      setActivePage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  /* =========================
     AD COMPLETION
  ========================= */

  const handleAdCompleted = useCallback(
    (ad) => {
      if (!ad) return;

      const reward = Number(ad.reward) || 0;

      if (reward <= 0) return;

      setTodayEarnings((previous) => previous + reward);

      setLifetimeEarnings((previous) => previous + reward);

      setAdsWatchedToday((previous) => Math.min(previous + 1, TOTAL_ADS));

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
    },
    [setTodayEarnings, setLifetimeEarnings, setAdsWatchedToday, setActivities],
  );

  /* =========================
     DAILY BONUS
  ========================= */

  const handleBonusClick = useCallback(() => {
    window.location.assign("/watchAd-bonus");
  }, []);

  /* =========================
     INITIAL LOADER
  ========================= */

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="page">
      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* =========================
          TOPBAR
      ========================= */}

      <Topbar
        onMenuClick={toggleSidebar}
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebarOverlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="mainContent">
        {activePage === "watch-ads" ? (
          <>
            {/* =========================
                HERO
            ========================= */}

            <ScrollReveal>
              <WatchAdsHero
                todayEarnings={todayEarnings}
                lifetimeEarnings={lifetimeEarnings}
                adsWatchedToday={adsWatchedToday}
                remainingAds={remainingAds}
                dailyGoal={DAILY_GOAL}
              />
            </ScrollReveal>

            {/* =========================
                STICKY EARNING SUMMARY
            ========================= */}

            <StickyEarningSummary
              todayEarnings={todayEarnings}
              adsWatchedToday={adsWatchedToday}
              totalAds={TOTAL_ADS}
              dailyGoal={DAILY_GOAL}
            />

            {/* =========================
                STATS
            ========================= */}

            <ScrollReveal delay={80}>
              <Stats
                todayEarnings={todayEarnings}
                lifetimeEarnings={lifetimeEarnings}
                adsWatchedToday={adsWatchedToday}
                remainingAds={remainingAds}
              />
            </ScrollReveal>

            {/* =========================
                DAILY PROGRESS
            ========================= */}

            <ScrollReveal delay={100}>
              <DailyProgress
                earned={todayEarnings}
                onBonusClick={handleBonusClick}
              />
            </ScrollReveal>

            {/* =========================
                AVAILABLE ADS
            ========================= */}

            <ScrollReveal delay={100}>
              <div id="available-ads">
                <AdSection onAdCompleted={handleAdCompleted} />
              </div>
            </ScrollReveal>

            {/* =========================
                EARNINGS INFORMATION
            ========================= */}

            <ScrollReveal delay={100}>
              <EarningsInfo />
            </ScrollReveal>

            {/* =========================
                HOW IT WORKS
            ========================= */}

            <ScrollReveal delay={100}>
              <HowItWorks />
            </ScrollReveal>

            {/* =========================
                RECENT ACTIVITY
            ========================= */}

            <ScrollReveal delay={100}>
              <RecentActivity activities={activities} />
            </ScrollReveal>

            {/* =========================
                KEEP EARNING
            ========================= */}

            <ScrollReveal delay={100}>
              <KeepEarning
                earned={todayEarnings}
                dailyGoal={DAILY_GOAL}
                remainingAds={remainingAds}
              />
            </ScrollReveal>

            <Footer />
          </>
        ) : (
          /* =========================
             OTHER NAVIGATION PAGES
          ========================= */

          <NavigationPage page={activePage} onNavigate={handleNavigation} />
        )}
      </main>
    </div>
  );
}

export default App;
