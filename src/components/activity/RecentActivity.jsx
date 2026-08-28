import {
  Play,
  CheckCircle2,
  Clock3,
  ChevronRight,
} from "lucide-react";

import "./RecentActivity.scss";

function RecentActivity({ activities = [] }) {
  return (
    <section
      className="recentActivity"
      aria-label="Recent reward activity"
    >
      {/* =========================
          HEADER
      ========================= */}
      <div className="activityHeader">
        <div className="activityHeaderContent">
          <span className="activityEyebrow">
            REWARD HISTORY
          </span>

          <h2>Recent activity</h2>
        </div>

        <button
          type="button"
          className="viewAllButton"
          aria-label="View all reward activity"
        >
          <span>View all</span>

          <ChevronRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* =========================
          ACTIVITY LIST
      ========================= */}
      {activities.length > 0 ? (
        <div className="activityList">
          {activities.map((activity) => (
            <article
              className="activityItem"
              key={activity.id}
            >
              {/* ICON */}
              <div className="activityIcon">
                <Play
                  size={15}
                  fill="currentColor"
                  strokeWidth={1.8}
                />
              </div>

              {/* MAIN INFO */}
              <div className="activityMain">
                <strong title={activity.title}>
                  {activity.title}
                </strong>

                <div className="activityMeta">
                  <span>{activity.time}</span>

                  <span
                    className="metaDot"
                    aria-hidden="true"
                  />

                  <span>
                    <Clock3
                      size={10}
                      strokeWidth={1.8}
                    />
                    {activity.duration}
                  </span>
                </div>
              </div>

              {/* STATUS */}
              <div className="activityStatus">
                <CheckCircle2
                  size={13}
                  strokeWidth={1.8}
                />

                <span>{activity.status}</span>
              </div>

              {/* REWARD */}
              <strong className="activityReward">
                {activity.reward}
              </strong>
            </article>
          ))}
        </div>
      ) : (
        /* =========================
           EMPTY STATE
        ========================= */
        <div className="activityEmpty">
          <div className="activityEmptyIcon">
            <Clock3 size={18} />
          </div>

          <strong>No recent activity</strong>

          <span>
            Complete an advertisement to see your
            reward history here.
          </span>
        </div>
      )}
    </section>
  );
}

export default RecentActivity;