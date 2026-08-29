import {
  ArrowRight,
  Check,
  Sparkles,
  Target,
} from "lucide-react";

function KeepEarning({
  earned = 0,
  dailyGoal = 200,
  remainingAds = 0,
}) {
  const progress = Math.min(
    Math.round((earned / dailyGoal) * 100),
    100
  );

  const remaining = Math.max(
    dailyGoal - earned,
    0
  );

  const goalCompleted = earned >= dailyGoal;

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
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
    <section className="keepEarning">
      <div className="keepEarningGlow" />

      <div className="keepEarningContent">
        <div className="keepEarningIcon">
          {goalCompleted ? (
            <Sparkles size={23} />
          ) : (
            <Target size={23} />
          )}
        </div>

        <span className="keepEarningEyebrow">
          {goalCompleted
            ? "DAILY GOAL COMPLETED"
            : "KEEP YOUR MOMENTUM"}
        </span>

        <h2>
          {goalCompleted
            ? "You’ve earned today’s reward."
            : "Ready to earn more?"}
        </h2>

        <p>
          {goalCompleted
            ? "Amazing work! Come back tomorrow to keep your streak going."
            : `You've made ${earned} VEs today. Keep watching to reach your ${dailyGoal} VEs daily goal.`}
        </p>

        <div className="keepEarningMeta">
          <span>
            <strong>{earned}</strong> / {dailyGoal} VEs
          </span>

          {!goalCompleted && (
            <span>
              <strong>{remaining}</strong> VEs to goal
            </span>
          )}

          {!goalCompleted &&
            remainingAds > 0 && (
              <span>
                <strong>{remainingAds}</strong>{" "}
                ads available
              </span>
            )}
        </div>

        {!goalCompleted &&
          remainingAds > 0 && (
            <button
              type="button"
              className="keepEarningButton"
              onClick={handleContinue}
            >
              Continue Watching
              <ArrowRight size={18} />
            </button>
          )}
      </div>

      {/* GOAL CIRCLE */}

      <div className="goalCircle">
        <div className="goalCircleGlow" />

        <svg
          className="goalCircleSvg"
          viewBox="0 0 140 140"
          aria-label={`${progress}% daily goal progress`}
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
              <Check size={22} />
              <strong>100%</strong>
            </>
          ) : (
            <>
              <strong>{progress}%</strong>
              <span>complete</span>
            </>
          )}
        </div>

        <div className="goalCircleLabel">
          <strong>
            {earned} / {dailyGoal}
          </strong>
          <span>VEs today</span>
        </div>
      </div>
    </section>
  );
}

export default KeepEarning;