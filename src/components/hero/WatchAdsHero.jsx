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
  const today = Math.max(Number(todayEarnings) || 0, 0);
  const lifetime = Math.max(
    Number(lifetimeEarnings) || 0,
    0
  );

  const watched = Math.max(
    Number(adsWatchedToday) || 0,
    0
  );

  const available = Math.max(
    Number(remainingAds) || 0,
    0
  );

  const goal = Math.max(
    Number(dailyGoal) || DEFAULT_DAILY_GOAL,
    1
  );

  const percentage = Math.min(
    Math.round((today / goal) * 100),
    100
  );

  const remaining = Math.max(
    goal - today,
    0
  );

  const potential = available > 0
    ? remaining
    : 0;

  const goalReached = today >= goal;

  return (
    <section
      className="watchHero"
      aria-labelledby="watch-hero-title"
    >
      {/* Ambient background */}
      <div
        className="heroGlow heroGlowOne"
        aria-hidden="true"
      />

      <div
        className="heroGlow heroGlowTwo"
        aria-hidden="true"
      />

      <div
        className="heroGridLines"
        aria-hidden="true"
      />

      {/* =================================================
          LEFT CONTENT
      ================================================= */}

      <div className="heroContent">

        <div className="heroBadge">
          <span className="liveDot" />

          <span>EARNING CENTER</span>

          <Sparkles
            size={13}
            strokeWidth={1.8}
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

        {/* Quick stats */}

        <div className="heroQuickStats">

          <div className="quickStat">
            <div className="quickStatIcon purple">
              <CircleDollarSign size={17} />
            </div>

            <div>
              <span>Total Earned</span>

              <strong>
                {lifetime.toLocaleString()} VEs
              </strong>
            </div>
          </div>

          <div className="quickStatDivider" />

          <div className="quickStat">
            <div className="quickStatIcon green">
              <TrendingUp size={17} />
            </div>

            <div>
              <span>Today</span>

              <strong>
                +{today.toLocaleString()} VEs
              </strong>
            </div>
          </div>

          <div className="quickStatDivider" />

          <div className="quickStat">
            <div className="quickStatIcon blue">
              <Play size={17} />
            </div>

            <div>
              <span>Available</span>

              <strong>
                {available}{" "}
                {available === 1 ? "Ad" : "Ads"}
              </strong>
            </div>
          </div>

        </div>

        {/* Daily progress */}

        <div className="heroProgress">

          <div className="progressHeader">

            <div>
              <span>
                Today's earning goal
              </span>

              <strong>
                {today.toLocaleString()} /{" "}
                {goal.toLocaleString()} VEs
              </strong>
            </div>

            <span className="progressPercent">
              {percentage}%
            </span>

          </div>

          <div
            className="progressTrack"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={Math.min(today, goal)}
            aria-label="Today's earning goal"
          >
            <div
              className="progressFill"
              style={{
                width: `${percentage}%`,
              }}
            >
              <span className="progressShine" />
            </div>
          </div>

          <div className="progressFooter">

            <span>
              {goalReached
                ? "Daily goal reached 🎉"
                : `${remaining.toLocaleString()} VEs remaining`}
            </span>

            <span>
              {goalReached
                ? "Bonus reward unlocked"
                : "Keep watching to unlock bonus rewards"}
            </span>

          </div>

        </div>
      </div>

      {/* =================================================
          RIGHT VISUAL
      ================================================= */}

      <div
        className="heroVisual"
        aria-hidden="true"
      >

        <div className="visualOrb orbOne" />
        <div className="visualOrb orbTwo" />

        {/* Reward chip */}

        <div className="floatingReward rewardOne">
          <Zap size={14} />
          <span>+38 VEs</span>
        </div>

        {/* Main ad card */}

        <div className="adVisual">

          <div className="adTopLabel">
            <span>AD • 30 SEC</span>
          </div>

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

            <strong>
              WATCH &amp; REWARD
            </strong>
          </div>

        </div>

        {/* Second reward */}

        <div className="floatingReward rewardTwo">
          <TrendingUp size={14} />
          <span>+20 VEs</span>
        </div>

        {/* Potential earning */}

        <div className="heroFloatingCard">

          <div className="floatingCardIcon">
            <Zap size={16} />
          </div>

          <div>
            <span>Potential today</span>

            <strong>
              +{potential.toLocaleString()} VEs
            </strong>
          </div>

          <ArrowUpRight size={17} />

        </div>

      </div>
    </section>
  );
}

export default WatchAdsHero;