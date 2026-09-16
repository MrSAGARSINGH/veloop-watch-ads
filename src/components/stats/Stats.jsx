import {
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import "./Stats.scss";

const DEFAULT_DAILY_GOAL = 200;
const DEFAULT_AD_LIMIT = 6;

function Stats({
  todayEarnings = 96,
  lifetimeEarnings = 12450,
  adsWatchedToday = 0,
  remainingAds = 6,
  dailyAdLimit = DEFAULT_AD_LIMIT,
  dailyGoal = DEFAULT_DAILY_GOAL,
}) {
  const today = Math.max(Number(todayEarnings) || 0, 0);
  const lifetime = Math.max(
    Number(lifetimeEarnings) || 0,
    0,
  );

  const totalAds = Math.max(
    Number(dailyAdLimit) || DEFAULT_AD_LIMIT,
    1,
  );

  const watched = Math.max(
    Math.min(Number(adsWatchedToday) || 0, totalAds),
    0,
  );

  const remaining = Math.max(
    Math.min(Number(remainingAds) || 0, totalAds),
    0,
  );

  const goal = Math.max(
    Number(dailyGoal) || DEFAULT_DAILY_GOAL,
    1,
  );

  const earningProgress = Math.min(
    Math.round((today / goal) * 100),
    100,
  );

  const watchedProgress = Math.min(
    Math.round((watched / totalAds) * 100),
    100,
  );

  const availableProgress = Math.min(
    Math.round((remaining / totalAds) * 100),
    100,
  );

  const stats = [
    {
      label: "Today’s earnings",
      value: today.toLocaleString(),
      unit: "VEs",
      change: `${earningProgress}%`,
      description: "of daily goal",
      progress: earningProgress,
      icon: CircleDollarSign,
      type: "purple",
    },
    {
      label: "Lifetime earnings",
      value: lifetime.toLocaleString(),
      unit: "VEs",
      change: "All time",
      description: "total rewards",
      progress: 100,
      icon: TrendingUp,
      type: "green",
    },
    {
      label: "Ads completed",
      value: watched.toLocaleString(),
      unit: "Ads",
      change: `${watched}/${totalAds}`,
      description: "watched today",
      progress: watchedProgress,
      icon: PlayCircle,
      type: "blue",
    },
    {
      label: "Still available",
      value: remaining.toLocaleString(),
      unit: remaining === 1 ? "Ad" : "Ads",
      change: `${availableProgress}%`,
      description: "earning slots left",
      progress: availableProgress,
      icon: Clock3,
      type: "orange",
    },
  ];

  return (
    <section
      className="statsSection"
      aria-labelledby="stats-title"
    >
      {/* Section heading */}

      <div className="sectionIntro">
        <div>
          <span className="sectionEyebrow">
            <Sparkles
              size={13}
              aria-hidden="true"
            />

            YOUR PERFORMANCE
          </span>

          <h2 id="stats-title">
            Today at a glance
          </h2>

          <p className="statsDescription">
            A live snapshot of your rewards and daily
            activity.
          </p>
        </div>

        <div className="updatedText">
          <span
            className="updatedDot"
            aria-hidden="true"
          />

          Updated just now
        </div>
      </div>

      {/* Stats cards */}

      <div className="statsGrid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className={`statCard statCard-${stat.type}`}
              key={stat.label}
            >
              <div
                className={`statCardAccent ${stat.type}`}
                aria-hidden="true"
              />

              <div className="statCardTop">
                <div
                  className={`statIcon ${stat.type}`}
                  aria-hidden="true"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <ArrowUpRight
                  className="statArrow"
                  size={17}
                  aria-hidden="true"
                />
              </div>

              <div className="statMain">
                <span className="statLabel">
                  {stat.label}
                </span>

                <div className="statValue">
                  <strong>{stat.value}</strong>
                  <span>{stat.unit}</span>
                </div>

                <div className="statMeta">
                  <span
                    className={`statChange ${stat.type}`}
                  >
                    {stat.change}
                  </span>

                  <span className="statDescription">
                    {stat.description}
                  </span>
                </div>
              </div>

              {/* Dynamic card progress */}

              <div className="statProgress">
                <div className="statProgressHeader">
                  <span>Progress</span>
                  <span>{stat.progress}%</span>
                </div>

                <div
                  className="statProgressTrack"
                  role="progressbar"
                  aria-label={`${stat.label} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={stat.progress}
                >
                  <div
                    className={`statProgressFill ${stat.type}`}
                    style={{
                      width: `${stat.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="statDecor"
                aria-hidden="true"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;