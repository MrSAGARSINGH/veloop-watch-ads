import {
  Target,
  Zap,
  Trophy,
  ArrowRight,
} from "lucide-react";

import "./DailyProgress.scss";

const DAILY_GOAL = 200;

function DailyProgress({ earned = 96, onBonusClick }) {
  const safeEarned = Math.max(0, earned);

  const percentage = Math.min(
    Math.round((safeEarned / DAILY_GOAL) * 100),
    100
  );

  const remaining = Math.max(
    DAILY_GOAL - safeEarned,
    0
  );

  const goalReached = safeEarned >= DAILY_GOAL;

  const handleBonusClick = () => {
    onBonusClick?.();
  };

  return (
    <section
      className="dailyProgress"
      aria-label="Daily earning progress"
    >
      {/* =========================
          PROGRESS MAIN
      ========================= */}
      <div className="progressMain">
        <div className="progressTop">
          <div className="progressTitle">
            <div className="progressIcon">
              <Target size={19} strokeWidth={1.8} />
            </div>

            <div>
              <span>DAILY EARNING GOAL</span>

              <h2>
                {goalReached
                  ? "Daily goal completed!"
                  : "Keep your streak going"}
              </h2>
            </div>
          </div>

          <div
            className="progressAmount"
            aria-label={`${safeEarned} of ${DAILY_GOAL} VEs earned`}
          >
            <strong>{safeEarned}</strong>
            <span>/ {DAILY_GOAL} VEs</span>
          </div>
        </div>

        {/* =========================
            PROGRESS BAR
        ========================= */}
        <div
          className="bigProgress"
          role="progressbar"
          aria-valuenow={Math.min(
            safeEarned,
            DAILY_GOAL
          )}
          aria-valuemin={0}
          aria-valuemax={DAILY_GOAL}
          aria-valuetext={`${percentage}% completed`}
          aria-label="Daily earning progress"
        >
          <div
            className="bigProgressFill"
            style={{
              width: `${percentage}%`,
            }}
          >
            <span className="progressGlow" />
          </div>

          <div
            className="progressMarker"
            style={{
              left: `${Math.min(
                Math.max(percentage, 2),
                98
              )}%`,
            }}
            aria-hidden="true"
          >
            <span />
          </div>
        </div>

        {/* =========================
            PROGRESS BOTTOM
        ========================= */}
        <div className="progressBottom">
          <div className="progressStatus">
            <Zap size={13} strokeWidth={1.8} />

            <span>
              <strong>{percentage}%</strong>{" "}
              of today's goal completed
            </span>
          </div>

          <span className="remainingText">
            {goalReached
              ? "Goal reached 🎉"
              : `${remaining} VEs remaining`}
          </span>
        </div>
      </div>

      {/* =========================
          DAILY BONUS BUTTON
      ========================= */}
      <button
        type="button"
        className={`progressReward ${
          goalReached ? "bonusUnlocked" : ""
        }`}
        onClick={handleBonusClick}
        aria-label={
          goalReached
            ? "View unlocked daily bonus"
            : `View daily bonus for reaching ${DAILY_GOAL} VEs`
        }
      >
        <span
          className="rewardBadge"
          aria-hidden="true"
        >
          <Trophy
            size={18}
            strokeWidth={1.8}
          />
        </span>

        <span className="rewardContent">
          <span>DAILY BONUS</span>

          <strong>
            {goalReached
              ? "Bonus unlocked"
              : `Reach ${DAILY_GOAL} VEs`}
          </strong>

          <small>
            {goalReached
              ? "You've reached today's earning goal"
              : "Unlock your bonus reward"}
          </small>
        </span>

        <span
          className="rewardArrow"
          aria-hidden="true"
        >
          <ArrowRight
            size={17}
            strokeWidth={1.8}
          />
        </span>
      </button>
    </section>
  );
}

export default DailyProgress;