import {
  ArrowRight,
  Check,
  LockKeyhole,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import "./DailyProgress.scss";

const DEFAULT_DAILY_GOAL = 200;
const BONUS_REWARD = 50;

function DailyProgress({
  earned = 96,
  dailyGoal = DEFAULT_DAILY_GOAL,
  onBonusClick,
}) {
  const safeEarned = Math.max(Number(earned) || 0, 0);
  const goal = Math.max(
    Number(dailyGoal) || DEFAULT_DAILY_GOAL,
    1,
  );

  const percentage = Math.min(
    Math.round((safeEarned / goal) * 100),
    100,
  );

  const remaining = Math.max(goal - safeEarned, 0);
  const goalReached = safeEarned >= goal;

  const handleBonusClick = () => {
    if (!goalReached) return;

    onBonusClick?.();
  };

  return (
    <section
      className="dailyProgress"
      aria-labelledby="daily-progress-title"
    >
      {/* Main progress card */}

      <div className="progressMain">
        <div
          className="progressAmbientGlow"
          aria-hidden="true"
        />

        <div className="progressTop">
          <div className="progressTitle">
            <div className="progressIcon">
              <Target
                size={20}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div>
              <span>
                <Sparkles
                  size={12}
                  aria-hidden="true"
                />

                DAILY EARNING GOAL
              </span>

              <h2 id="daily-progress-title">
                {goalReached
                  ? "You crushed today’s goal!"
                  : "You’re getting closer"}
              </h2>

              <p>
                {goalReached
                  ? "Your daily bonus is ready to claim."
                  : "Complete more ads to unlock today’s bonus."}
              </p>
            </div>
          </div>

          <div
            className="progressAmount"
            aria-label={`${safeEarned} of ${goal} VEs earned`}
          >
            <strong>
              {safeEarned.toLocaleString()}
            </strong>

            <span>
              / {goal.toLocaleString()} VEs
            </span>
          </div>
        </div>

        {/* Progress bar */}

        <div className="progressBarWrapper">
          <div
            className="bigProgress"
            role="progressbar"
            aria-valuenow={Math.min(safeEarned, goal)}
            aria-valuemin={0}
            aria-valuemax={goal}
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

            {percentage > 0 && (
              <div
                className="progressMarker"
                style={{
                  left: `${Math.min(
                    Math.max(percentage, 2),
                    98,
                  )}%`,
                }}
                aria-hidden="true"
              >
                <span>
                  {goalReached ? (
                    <Check size={11} />
                  ) : (
                    <Zap size={10} />
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Progress milestones */}

          <div
            className="progressMilestones"
            aria-hidden="true"
          >
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>{goal}</span>
          </div>
        </div>

        {/* Progress information */}

        <div className="progressBottom">
          <div className="progressStatus">
            <Zap
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              <strong>{percentage}%</strong>{" "}
              of today&apos;s goal completed
            </span>
          </div>

          <span
            className={`remainingText ${
              goalReached ? "completed" : ""
            }`}
          >
            {goalReached
              ? "Goal reached 🎉"
              : `${remaining.toLocaleString()} VEs remaining`}
          </span>
        </div>
      </div>

      {/* Bonus card */}

      <button
        type="button"
        className={`progressReward ${
          goalReached ? "bonusUnlocked" : "bonusLocked"
        }`}
        onClick={handleBonusClick}
        disabled={!goalReached}
        aria-label={
          goalReached
            ? `Claim ${BONUS_REWARD} VEs daily bonus`
            : `Daily bonus locked. Earn ${remaining} more VEs to unlock`
        }
      >
        <span
          className="bonusGlow"
          aria-hidden="true"
        />

        <span
          className="rewardBadge"
          aria-hidden="true"
        >
          {goalReached ? (
            <Trophy
              size={20}
              strokeWidth={1.8}
            />
          ) : (
            <LockKeyhole
              size={19}
              strokeWidth={1.8}
            />
          )}
        </span>

        <span className="rewardContent">
          <span>
            {goalReached
              ? "BONUS READY"
              : "DAILY BONUS"}
          </span>

          <strong>
            +{BONUS_REWARD} VEs
          </strong>

          <small>
            {goalReached
              ? "Tap to claim your reward"
              : `Earn ${remaining.toLocaleString()} more VEs`}
          </small>
        </span>

        <span
          className="rewardArrow"
          aria-hidden="true"
        >
          <ArrowRight
            size={18}
            strokeWidth={1.8}
          />
        </span>
      </button>
    </section>
  );
}

export default DailyProgress;