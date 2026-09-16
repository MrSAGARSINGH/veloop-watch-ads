import {
  ArrowUpRight,
  ChevronRight,
  CircleDollarSign,
  Play,
  ShieldCheck,
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
  const lifetime = Math.max(Number(lifetimeEarnings) || 0, 0);
  const watched = Math.max(Number(adsWatchedToday) || 0, 0);
  const available = Math.max(Number(remainingAds) || 0, 0);
  const goal = Math.max(Number(dailyGoal) || DEFAULT_DAILY_GOAL, 1);

  const percentage = Math.min(
    Math.round((today / goal) * 100),
    100,
  );

  const remaining = Math.max(goal - today, 0);
  const potential = available > 0 ? remaining : 0;
  const goalReached = today >= goal;

  const handleWatchNext = () => {
    document.getElementById("available-ads")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="watchHero"
      aria-labelledby="watch-hero-title"
    >
      {/* Background effects */}

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

      {/* Left content */}

      <div className="heroContent">
        <div className="heroBadge">
          <span className="liveDot" />

          <span>LIVE REWARD HUB</span>

          <Sparkles
            size={13}
            strokeWidth={1.8}
          />
        </div>

        <h1 id="watch-hero-title">
          Your attention.
          <br />
          <span>Your rewards.</span>
        </h1>

        <p className="heroDescription">
          Discover short campaigns worth your time. Watch,
          earn VEs instantly and turn every spare moment into
          measurable progress.
        </p>

        {/* Main action */}

        <div className="heroActions">
          <button
            type="button"
            className="heroPrimaryAction"
            onClick={handleWatchNext}
          >
            <span className="heroActionIcon">
              <Play
                size={15}
                fill="currentColor"
                strokeWidth={0}
              />
            </span>

            <span>Watch next ad</span>

            <ChevronRight size={17} />
          </button>

          <div className="heroTrustNote">
            <ShieldCheck size={16} />

            <span>
              Instant credit after completion
            </span>
          </div>
        </div>

        {/* Quick statistics */}

        <div className="heroQuickStats">
          <div className="quickStat">
            <div className="quickStatIcon purple">
              <CircleDollarSign size={17} />
            </div>

            <div>
              <span>Total earned</span>

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
              <span>Earned today</span>

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
              <span>Watched today</span>

              <strong>
                {watched} completed
              </strong>
            </div>
          </div>
        </div>

        {/* Daily progress */}

        <div className="heroProgress">
          <div className="progressHeader">
            <div>
              <span>Today&apos;s earning goal</span>

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

      {/* Right visual */}

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

        {/* Featured campaign card */}

        <div className="adVisual">
          <div className="adTopLabel">
            <span>FEATURED • 30 SEC</span>
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
            <span>NEXT CAMPAIGN</span>

            <strong>
              DISCOVER. WATCH. EARN.
            </strong>
          </div>
        </div>

        <div className="floatingReward rewardTwo">
          <TrendingUp size={14} />
          <span>+20 VEs</span>
        </div>

        <div className="heroFloatingCard">
          <div className="floatingCardIcon">
            <Zap size={16} />
          </div>

          <div>
            <span>Still available today</span>

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