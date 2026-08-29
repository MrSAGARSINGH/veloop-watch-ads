import { ArrowRight, Sparkles, Target } from "lucide-react";

function KeepEarning({
  earned = 0,
  dailyGoal = 200,
  remainingAds = 0,
}) {
  const remaining = Math.max(dailyGoal - earned, 0);
  const goalCompleted = earned >= dailyGoal;

  const handleContinue = () => {
    const adsSection = document.getElementById("available-ads");

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

      <div className="keepEarningIcon">
        {goalCompleted ? (
          <Sparkles size={24} />
        ) : (
          <Target size={24} />
        )}
      </div>

      <div className="keepEarningContent">
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

          {remainingAds > 0 && !goalCompleted && (
            <span>
              <strong>{remainingAds}</strong> ads available
            </span>
          )}
        </div>

        {!goalCompleted && remainingAds > 0 && (
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
    </section>
  );
}

export default KeepEarning;