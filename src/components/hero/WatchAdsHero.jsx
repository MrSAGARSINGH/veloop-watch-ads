import {
  ArrowUpRight,
  CircleDollarSign,
  Play,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

import "./WatchAdsHero.scss";

const DEFAULT_DAILY_GOAL = 200;

function WatchAdsHero({
  todayEarnings = 96,
  lifetimeEarnings = 12450,
  adsWatchedToday = 0,
  remainingAds = 6,
  dailyGoal = DEFAULT_DAILY_GOAL,
}) {
  const safeTodayEarnings = Math.max(
    0,
    Number(todayEarnings) || 0
  );

  const safeLifetimeEarnings = Math.max(
    0,
    Number(lifetimeEarnings) || 0
  );

  const safeAdsWatched = Math.max(
    0,
    Number(adsWatchedToday) || 0
  );

  const safeRemainingAds = Math.max(
    0,
    Number(remainingAds) || 0
  );

  const safeDailyGoal = Math.max(
    1,
    Number(dailyGoal) || DEFAULT_DAILY_GOAL
  );

  const goalPercentage = Math.min(
    Math.round(
      (safeTodayEarnings / safeDailyGoal) * 100
    ),
    100
  );

  const remainingGoal = Math.max(
    safeDailyGoal - safeTodayEarnings,
    0
  );

  /*
   * Potential earning is based on the remaining
   * amount required to reach today's goal.
   */
  const potentialToday =
    safeRemainingAds > 0
      ? remainingGoal
      : 0;

  return (
    <section
      className="watchHero"
      aria-labelledby="watch-hero-title"
    >
      <div
        className="heroGlow heroGlowOne"
        aria-hidden="true"
      />

      <div
        className="heroGlow heroGlowTwo"
        aria-hidden="true"
      />

      {/* =========================
          HERO CONTENT
      ========================= */}

      <div className="heroContent">
        <div className="heroBadge">
          <span
            className="liveDot"
            aria-hidden="true"
          />

          <span>EARNING CENTER</span>

          <Sparkles
            size={13}
            aria-hidden="true"
          />
        </div>

        <h1 id="watch-hero-title">
          Watch Ads.
          <br />
          <span>Earn More VEs.</span>
        </h1>

        <p className="heroDescription">
          Turn a few seconds of your time into real
          rewards. Watch short advertisements, collect
          VEs and grow your daily earnings.
        </p>

        {/* =========================
            QUICK STATS
        ========================= */}

        <div className="heroQuickStats">
          <div className="quickStat">
            <div
              className="quickStatIcon purple"
              aria-hidden="true"
            >
              <CircleDollarSign size={17} />
            </div>

            <div>
              <span>Total Earned</span>

              <strong>
                {safeLifetimeEarnings.toLocaleString()} VEs
              </strong>
            </div>
          </div>

          <div
            className="quickStatDivider"
            aria-hidden="true"
          />

          <div className="quickStat">
            <div
              className="quickStatIcon green"
              aria-hidden="true"
            >
              <TrendingUp size={17} />
            </div>

            <div>
              <span>Today</span>

              <strong>
                +{safeTodayEarnings.toLocaleString()} VEs
              </strong>
            </div>
          </div>

          <div
            className="quickStatDivider"
            aria-hidden="true"
          />

          <div className="quickStat">
            <div
              className="quickStatIcon blue"
              aria-hidden="true"
            >
              <Play size={17} />
            </div>

            <div>
              <span>Available</span>

              <strong>
                {safeRemainingAds}{" "}
                {safeRemainingAds === 1
                  ? "Ad"
                  : "Ads"}
              </strong>
            </div>
          </div>
        </div>

        {/* =========================
            DAILY PROGRESS
        ========================= */}

        <div className="heroProgress">
          <div className="progressHeader">
            <div>
              <span>
                Today's earning goal
              </span>

              <strong>
                {safeTodayEarnings.toLocaleString()} /{" "}
                {safeDailyGoal.toLocaleString()} VEs
              </strong>
            </div>

            <span className="progressPercent">
              {goalPercentage}%
            </span>
          </div>

          <div
            className="progressTrack"
            role="progressbar"
            aria-valuenow={Math.min(
              safeTodayEarnings,
              safeDailyGoal
            )}
            aria-valuemin={0}
            aria-valuemax={safeDailyGoal}
            aria-valuetext={`${goalPercentage}% of today's earning goal completed`}
            aria-label="Today's earning goal"
          >
            <div
              className="progressFill"
              style={{
                width: `${goalPercentage}%`,
              }}
            >
              <span
                className="progressShine"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="progressFooter">
            <span>
              {remainingGoal === 0
                ? "Daily goal reached 🎉"
                : `${remainingGoal.toLocaleString()} VEs remaining`}
            </span>

            <span>
              {remainingGoal === 0
                ? "Bonus reward unlocked"
                : "Keep watching to unlock bonus rewards"}
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          HERO VISUAL
      ========================= */}

      <div
        className="heroVisual"
        aria-hidden="true"
      >
        <div className="visualOrb orbOne" />
        <div className="visualOrb orbTwo" />

        <div className="floatingReward rewardOne">
          <Zap size={14} />
          <span>+38 VEs</span>
        </div>

        <div className="floatingReward rewardTwo">
          <TrendingUp size={14} />
          <span>+20 VEs</span>
        </div>

        <div className="adVisual">
          <div className="adVisualGlow" />

          <div className="playRing">
            <div className="playCircle">
              <Play
                size={30}
                fill="currentColor"
                strokeWidth={0}
              />
            </div>
          </div>

          <div className="adVisualLines">
            <span />
            <span />
            <span />
          </div>

          <div className="adVisualLabel">
            <span>READY TO EARN</span>
            <strong>WATCH &amp; REWARD</strong>
          </div>
        </div>

        <div className="heroFloatingCard">
          <div className="floatingCardIcon">
            <Zap size={16} />
          </div>

          <div>
            <span>Potential today</span>

            <strong>
              +{potentialToday.toLocaleString()} VEs
            </strong>
          </div>

          <ArrowUpRight size={17} />
        </div>
      </div>
    </section>
  );
}

export default WatchAdsHero;