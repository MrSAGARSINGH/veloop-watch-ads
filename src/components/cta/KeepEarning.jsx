import {
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import "./KeepEarning.scss";

function KeepEarning({
  earned = 0,
  dailyGoal = 200,
  remainingAds = 0,
}) {
  const safeEarned = Math.max(
    0,
    Number(earned) || 0
  );

  const safeDailyGoal = Math.max(
    1,
    Number(dailyGoal) || 200
  );

  const safeRemainingAds = Math.max(
    0,
    Number(remainingAds) || 0
  );

  const progress = Math.min(
    Math.round(
      (safeEarned / safeDailyGoal) * 100
    ),
    100
  );

  const remaining = Math.max(
    safeDailyGoal - safeEarned,
    0
  );

  const goalCompleted =
    safeEarned >= safeDailyGoal;

  const radius = 58;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) * circumference;

  const handleContinue = () => {
    const adsSection =
      document.getElementById("available-ads");

    if (adsSection) {
      adsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
      {/* =========================
          AMBIENT BACKGROUND
      ========================= */}

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

      {/* =========================
          CONTENT
      ========================= */}

      <div className="keepEarningContent">
        {/* ICON */}

        <div
          className="keepEarningIcon"
          aria-hidden="true"
        >
          {goalCompleted ? (
            <Sparkles size={23} />
          ) : (
            <Target size={23} />
          )}

          <span className="iconPulse" />
        </div>

        {/* EYEBROW */}

        <span className="keepEarningEyebrow">
          <span className="eyebrowLine" />

          {goalCompleted
            ? "DAILY GOAL COMPLETED"
            : "KEEP YOUR MOMENTUM"}

          <Sparkles
            size={13}
            className="eyebrowSparkle"
          />
        </span>

        {/* HEADING */}

        <h2 id="keep-earning-title">
          {goalCompleted ? (
            <>
              You’ve earned
              <span> today’s reward.</span>
            </>
          ) : (
            <>
              Ready to
              <span> earn more?</span>
            </>
          )}
        </h2>

        {/* DESCRIPTION */}

        <p className="keepEarningDescription">
          {goalCompleted
            ? "Amazing work! Come back tomorrow to keep your streak going."
            : `You've made ${safeEarned} VEs today. Keep watching to reach your ${safeDailyGoal} VEs daily goal.`}
        </p>

        {/* =========================
            META STATS
        ========================= */}

        <div className="keepEarningMeta">
          <span className="metaItem">
            <span className="metaIcon">
              <Target size={13} />
            </span>

            <strong>
              {safeEarned}
            </strong>

            <small>
              / {safeDailyGoal} VEs
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
                  {remaining}
                </strong>

                <small>
                  VEs to goal
                </small>
              </span>
            </>
          )}

          {!goalCompleted &&
            safeRemainingAds > 0 && (
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

        {/* =========================
            CTA
        ========================= */}

        {!goalCompleted &&
          safeRemainingAds > 0 && (
            <button
              type="button"
              className="keepEarningButton"
              onClick={handleContinue}
            >
              <span>
                Continue Watching
              </span>

              <span className="buttonIcon">
                <ArrowRight size={18} />
              </span>

              <span
                className="buttonShine"
                aria-hidden="true"
              />
            </button>
          )}

        {goalCompleted && (
          <div
            className="goalSuccessMessage"
            role="status"
          >
            <Check size={15} />
            <span>
              Daily reward unlocked
            </span>
            <Zap
              size={13}
              fill="currentColor"
            />
          </div>
        )}
      </div>

      {/* =========================
          GOAL CIRCLE
      ========================= */}

      <div
        className="goalCircle"
        aria-hidden="true"
      >
        <div className="goalCircleGlow" />

        <div className="goalCirclePulse" />

        <svg
          className="goalCircleSvg"
          viewBox="0 0 140 140"
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
          {goalCompleted ? (
            <>
              <Check
                size={22}
                className="successIcon"
              />

              <strong>100%</strong>

              <span>COMPLETE</span>
            </>
          ) : (
            <>
              <strong>
                {progress}%
              </strong>

              <span>COMPLETE</span>
            </>
          )}
        </div>

        <div className="goalCircleLabel">
          <strong>
            {safeEarned} / {safeDailyGoal}
          </strong>

          <span>
            VEs today
          </span>
        </div>
      </div>

      {/* =========================
          FLOATING REWARD SIGNALS
      ========================= */}

      {!goalCompleted && (
        <>
          <div
            className="keepRewardSignal rewardSignalLeft"
            aria-hidden="true"
          >
            <Zap size={12} />
            <span>
              +{Math.min(
                safeRemainingAds * 5,
                remaining
              )} VEs
            </span>
          </div>

          <div
            className="keepRewardSignal rewardSignalRight"
            aria-hidden="true"
          >
            <Sparkles size={12} />
            <span>
              Keep going
            </span>
          </div>
        </>
      )}
    </section>
  );
}

export default KeepEarning;