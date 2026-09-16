import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  History,
  Play,
  Sparkles,
} from "lucide-react";

import "./RecentActivity.scss";

const MAX_VISIBLE_ACTIVITIES = 5;

function RecentActivity({
  activities = [],
  onViewAll,
}) {
  const safeActivities = Array.isArray(activities)
    ? activities
    : [];

  const visibleActivities = safeActivities.slice(
    0,
    MAX_VISIBLE_ACTIVITIES,
  );

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
      return;
    }

    window.location.hash = "/history";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="recentActivity"
      aria-labelledby="recent-activity-title"
    >
      {/* Header */}

      <div className="activityHeader">
        <div className="activityHeaderContent">
          <span className="activityEyebrow">
            <Sparkles
              size={12}
              aria-hidden="true"
            />

            REWARD HISTORY
          </span>

          <h2 id="recent-activity-title">
            Recent activity
          </h2>

          <p>
            Your latest completed campaigns and earned
            rewards.
          </p>
        </div>

        <div className="activityHeaderActions">
          <div className="activityCount">
            <History
              size={14}
              aria-hidden="true"
            />

            <span>
              {safeActivities.length}{" "}
              {safeActivities.length === 1
                ? "activity"
                : "activities"}
            </span>
          </div>

          <button
            type="button"
            className="viewAllButton"
            aria-label="View all reward activity"
            onClick={handleViewAll}
          >
            <span>View all</span>

            <ChevronRight
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Activity list */}

      {visibleActivities.length > 0 ? (
        <div className="activityList">
          {visibleActivities.map(
            (activity, index) => (
              <article
                className="activityItem"
                key={activity.id}
              >
                <div
                  className="activityTimeline"
                  aria-hidden="true"
                >
                  <span />

                  {index <
                    visibleActivities.length - 1 && (
                    <i />
                  )}
                </div>

                <div
                  className="activityIcon"
                  aria-hidden="true"
                >
                  <Play
                    size={14}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </div>

                <div className="activityMain">
                  <strong title={activity.title}>
                    {activity.title}
                  </strong>

                  <div className="activityMeta">
                    <span>
                      {activity.time || "Recently"}
                    </span>

                    <span
                      className="metaDot"
                      aria-hidden="true"
                    />

                    <span>
                      <Clock3
                        size={11}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />

                      {activity.duration ||
                        "Completed"}
                    </span>
                  </div>
                </div>

                <div className="activityStatus">
                  <CheckCircle2
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>
                    {activity.status ||
                      "Completed"}
                  </span>
                </div>

                <div className="activityRewardWrap">
                  <span>Reward</span>

                  <strong className="activityReward">
                    {activity.reward}
                  </strong>
                </div>

                <ChevronRight
                  className="activityItemArrow"
                  size={16}
                  aria-hidden="true"
                />
              </article>
            ),
          )}

          {safeActivities.length >
            MAX_VISIBLE_ACTIVITIES && (
            <button
              type="button"
              className="activityMoreButton"
              onClick={handleViewAll}
            >
              View{" "}
              {safeActivities.length -
                MAX_VISIBLE_ACTIVITIES}{" "}
              more activities

              <ChevronRight
                size={14}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      ) : (
        // Empty state

        <div className="activityEmpty">
          <div
            className="activityEmptyGlow"
            aria-hidden="true"
          />

          <div
            className="activityEmptyIcon"
            aria-hidden="true"
          >
            <Clock3 size={20} />
          </div>

          <strong>No recent activity</strong>

          <span>
            Complete your first advertisement to see
            your reward history here.
          </span>

          <button
            type="button"
            className="activityEmptyButton"
            onClick={() =>
              document
                .getElementById("available-ads")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
          >
            <Play
              size={13}
              fill="currentColor"
              aria-hidden="true"
            />

            Explore available ads
          </button>
        </div>
      )}
    </section>
  );
}

export default RecentActivity;