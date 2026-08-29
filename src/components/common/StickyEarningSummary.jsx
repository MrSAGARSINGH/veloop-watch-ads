import { Target, Tv, WalletCards } from "lucide-react";

function StickyEarningSummary({
  todayEarnings = 0,
  adsWatchedToday = 0,
  totalAds = 6,
  dailyGoal = 200,
}) {
  const remaining = Math.max(
    dailyGoal - todayEarnings,
    0
  );

  const goalCompleted = todayEarnings >= dailyGoal;

  return (
    <div className="stickyEarningSummary">
      <div className="stickyEarningInner">

        <div className="stickyBrand">
          <span className="stickyDot" />
          <strong>Today’s Progress</strong>
        </div>

        <div className="stickyStats">

          <div className="stickyStat">
            <WalletCards size={15} />
            <span>Today</span>
            <strong>{todayEarnings} VEs</strong>
          </div>

          <div className="stickyDivider" />

          <div className="stickyStat">
            <Tv size={15} />
            <span>Ads</span>
            <strong>
              {adsWatchedToday}/{totalAds}
            </strong>
          </div>

          <div className="stickyDivider" />

          <div className="stickyStat">
            <Target size={15} />
            <span>
              {goalCompleted ? "Goal" : "To Goal"}
            </span>
            <strong>
              {goalCompleted
                ? "Completed"
                : `${remaining} VEs`}
            </strong>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StickyEarningSummary;