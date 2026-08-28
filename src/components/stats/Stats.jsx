import {
  CircleDollarSign,
  PlayCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

import "./Stats.scss";

function Stats({
  todayEarnings = 96,
  lifetimeEarnings = 12450,
  adsWatchedToday = 0,
  remainingAds = 6,
  dailyAdLimit = 6,
}) {
  const totalAds = Math.max(dailyAdLimit, 0);

  const watched = Math.max(
    Math.min(adsWatchedToday, totalAds),
    0
  );

  const remaining = Math.max(
    remainingAds,
    0
  );

  const remainingPercentage =
    totalAds > 0
      ? Math.round((remaining / totalAds) * 100)
      : 0;

  const stats = [
    {
      label: "Today's Earnings",
      value: Number(todayEarnings).toLocaleString(),
      unit: "VEs",
      change: "+18.4%",
      description: "vs. yesterday",
      icon: CircleDollarSign,
      type: "purple",
    },
    {
      label: "Lifetime Earnings",
      value: Number(lifetimeEarnings).toLocaleString(),
      unit: "VEs",
      change: "+1,260",
      description: "this week",
      icon: TrendingUp,
      type: "green",
    },
    {
      label: "Ads Watched Today",
      value: watched.toLocaleString(),
      unit: "Ads",
      change: `${watched} / ${totalAds}`,
      description: "daily completed",
      icon: PlayCircle,
      type: "blue",
    },
    {
      label: "Remaining Ads",
      value: remaining.toLocaleString(),
      unit: "Ads",
      change: `${remainingPercentage}%`,
      description: "still available",
      icon: Clock3,
      type: "orange",
    },
  ];

  return (
    <section
      className="statsSection"
      aria-labelledby="stats-title"
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="sectionIntro">
        <div>
          <span className="sectionEyebrow">
            YOUR EARNINGS
          </span>

          <h2 id="stats-title">
            Today at a glance
          </h2>
        </div>

        <span className="updatedText">
          Updated just now
        </span>
      </div>

      {/* =========================
          STATS GRID
      ========================= */}

      <div className="statsGrid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className="statCard"
              key={stat.label}
            >
              {/* Icon */}

              <div
                className={`statIcon ${stat.type}`}
                aria-hidden="true"
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                />
              </div>

              {/* Content */}

              <div className="statMain">
                <span className="statLabel">
                  {stat.label}
                </span>

                <div className="statValue">
                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.unit}
                  </span>
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

              {/* Decorative Element */}

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