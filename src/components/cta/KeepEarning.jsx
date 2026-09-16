import {
  ArrowRight,
  Check,
  Clock3,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import "./KeepEarning.scss";

const DEFAULT_DAILY_GOAL = 200;
const ESTIMATED_REWARD_PER_AD = 25;

function KeepEarning({
  earned = 0,
  dailyGoal = DEFAULT_DAILY_GOAL,
  remainingAds = 0,
}) {
  const safeEarned = Math.max(
    Number(earned) || 0,
    0,
  );

  const safeDailyGoal = Math.max(
    Number(dailyGoal) || DEFAULT_DAILY_GOAL,
    1,
  );

  const safeRemainingAds = Math.max(
    Number(remainingAds) || 0,
    0,
  );

  const progress = Math.min(
    Math.round(
      (safeEarned / safeDailyGoal) * 100,
    ),
    100,
  );

  const remaining = Math.max(
    safeDailyGoal - safeEarned,
    0,
  );

  const goalCompleted =
    safeEarned >= safeDailyGoal;

  const hasAvailableAds =
    safeRemainingAds > 0;

  const estimatedPotential = Math.min(
    safeRemainingAds *
      ESTIMATED_REWARD_PER_AD,
    remaining,
  );

  const radius = 58;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) * circumference;

  const handleContinue = () => {
    document
      .getElementById("available-ads")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      className={`keepEarning ${
        goalCompleted
          ? "goalCompleted"
          : ""
      }`}
      aria-labelledby="keep-earning-title"
    >
      {/* Background effects */}

      <div
        className="keepEarningGlow keepGlowOne"
        aria-hidden="true"
      />

      <div
        className="keepEarningGlow keepGlowTwo"
        aria-hidden="true"
      />

      <div
        className="keepEarningOrb keepOrbOne"
        aria-hidden="true"
      />

      <div
        className="keepEarningOrb keepOrbTwo"
        aria-hidden="true"
      />

      {/* Main content */}

      <div className="keepEarningContent">
        <div
          className="keepEarningIcon"
          aria-hidden="true"
        >
          {goalCompleted ? (
            <Trophy size={23} />
          ) : (
            <Target size={23} />
          )}

          <span className="iconPulse" />
        </div>

        <span className="keepEarningEyebrow">
          <span
            className="eyebrowLine"
            aria-hidden="true"
          />

          {goalCompleted
            ? "DAILY GOAL COMPLETED"
            : hasAvailableAds
              ? "KEEP YOUR MOMENTUM"
              : "TODAY’S PROGRESS"}

          <Sparkles
            size={13}
            className="eyebrowSparkle"
            aria-hidden="true"
          />
        </span>

        <h2 id="keep-earning-title">
          {goalCompleted ? (
            <>
              You crushed
              <span> today’s goal.</span>
            </>
          ) : hasAvailableAds ? (
            <>
              You’re closer than
              <span> you think.</span>
            </>
          ) : (
            <>
              Great progress,
              <span> more coming soon.</span>
            </>
          )}
        </h2>

        <p className="keepEarningDescription">
          {goalCompleted
            ? `Amazing work! You earned ${safeEarned.toLocaleString()} VEs today and unlocked your daily reward.`
            : hasAvailableAds
              ? `You’ve earned ${safeEarned.toLocaleString()} VEs today. Keep watching to reach your ${safeDailyGoal.toLocaleString()} VEs goal.`
              : `You’ve earned ${safeEarned.toLocaleString()} VEs today. New earning opportunities will appear here when available.`}
        </p>

        {/* Summary stats */}

        <div className="keepEarningMeta">
          <span className="metaItem">
            <span className="metaIcon">
              <Target
                size={13}
                aria-hidden="true"
              />
            </span>

            <strong>
              {safeEarned.toLocaleString()}
            </strong>

            <small>
              / {safeDailyGoal.toLocaleString()} VEs
            </small>
          </span>

          {!goalCompleted && (
            <>
              <span
                className="metaDivider"
                aria-hidden="true"
              />

              <span className="metaItem">
                <strong>
                  {remaining.toLocaleString()}
                </strong>

                <small>VEs to goal</small>
              </span>
            </>
          )}

          {!goalCompleted &&
            hasAvailableAds && (
              <>
                <span
                  className="metaDivider"
                  aria-hidden="true"
                />

                <span className="metaItem">
                  <strong>
                    {safeRemainingAds}
                  </strong>

                  <small>
                    {safeRemainingAds === 1
                      ? "ad available"
                      : "ads available"}
                  </small>
                </span>
              </>
            )}
        </div>

        {/* Available ads CTA */}

        {!goalCompleted && hasAvailableAds && (
          <button
            type="button"
            className="keepEarningButton"
            onClick={handleContinue}
          >
            <span>Continue watching</span>

            <span className="buttonIcon">
              <ArrowRight
                size={18}
                aria-hidden="true"
              />
            </span>

            <span
              className="buttonShine"
              aria-hidden="true"
            />
          </button>
        )}

        {/* No ads message */}

        {!goalCompleted && !hasAvailableAds && (
          <div
            className="noAdsMessage"
            role="status"
          >
            <Clock3
              size={15}
              aria-hidden="true"
            />

            <span>
              New campaigns will be available soon
            </span>
          </div>
        )}

        {/* Completed state */}

        {goalCompleted && (
          <div
            className="goalSuccessMessage"
            role="status"
          >
            <Check
              size={15}
              aria-hidden="true"
            />

            <span>Daily reward unlocked</span>

            <Zap
              size={13}
              fill="currentColor"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Circular progress */}

      <div
        className="goalCircle"
        role="img"
        aria-label={`${progress}% of daily earning goal completed`}
      >
        <div
          className="goalCircleGlow"
          aria-hidden="true"
        />

        <div
          className="goalCirclePulse"
          aria-hidden="true"
        />

        <svg
          className="goalCircleSvg"
          viewBox="0 0 140 140"
          aria-hidden="true"
        >
          <circle
            className="goalCircleTrack"
            cx="70"
            cy="70"
            r={radius}
          />

          <circle
            className="goalCircleProgress"
            cx="70"
            cy="70"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        <div className="goalCircleCenter">
          {goalCompleted && (
            <Check
              size={21}
              className="successIcon"
              aria-hidden="true"
            />
          )}

          <strong>{progress}%</strong>

          <span>
            {goalCompleted
              ? "COMPLETE"
              : "PROGRESS"}
          </span>
        </div>

        <div className="goalCircleLabel">
          <strong>
            {safeEarned.toLocaleString()} /{" "}
            {safeDailyGoal.toLocaleString()}
          </strong>

          <span>VEs today</span>
        </div>
      </div>

      {/* Floating reward signals */}

      {!goalCompleted &&
        hasAvailableAds && (
          <>
            <div
              className="keepRewardSignal rewardSignalLeft"
              aria-hidden="true"
            >
              <Zap size={12} />

              <span>
                Up to +
                {estimatedPotential.toLocaleString()} VEs
              </span>
            </div>

            <div
              className="keepRewardSignal rewardSignalRight"
              aria-hidden="true"
            >
              <Sparkles size={12} />

              <span>Keep going</span>
            </div>
          </>
        )}
    </section>
  );
}

export default KeepEarning;