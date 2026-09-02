import { useEffect, useMemo, useState } from "react";

import {
  Clock3,
  Play,
  Sparkles,
  CheckCircle2,
  Zap,
  LoaderCircle,
  CircleCheck,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

import ads from "../../data/ads";
import useAdWatch from "../../hooks/useAdWatch";

import "./AdSection.scss";

function AdSection({ onAdCompleted, initialCompletedAds = [1, 2, 3, 4] }) {
  const {
    rewardEarned,
    startWatching,
    isWatching,
    isCompleted,
    getTimeLeft,
  } = useAdWatch(initialCompletedAds);

  const [sortBy, setSortBy] = useState("recommended");
  const [expandedAd, setExpandedAd] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /* =========================================================
     REWARD SUCCESS CALLBACK
  ========================================================= */

  useEffect(() => {
    if (!rewardEarned) {
      return;
    }

    onAdCompleted?.(rewardEarned);
  }, [rewardEarned, onAdCompleted]);

  /* =========================================================
     AVAILABLE + COMPLETED ADS
  ========================================================= */

  const availableAds = useMemo(
    () => ads.filter((ad) => !isCompleted(ad.id)),
    [isCompleted]
  );

  const completedAds = useMemo(
    () => ads.filter((ad) => isCompleted(ad.id)),
    [isCompleted]
  );

  /* =========================================================
     SORT AVAILABLE ADS
  ========================================================= */

  const sortedAds = useMemo(() => {
    const result = [...availableAds];

    if (sortBy === "highestReward") {
      return result.sort(
        (a, b) => Number(b.reward) - Number(a.reward)
      );
    }

    if (sortBy === "shortest") {
      return result.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    return result;
  }, [availableAds, sortBy]);

  /* =========================================================
     EXPAND / COLLAPSE DETAILS
  ========================================================= */

  const toggleDetails = (adId) => {
    setExpandedAd((previous) =>
      previous === adId ? null : adId
    );
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    if (refreshing) {
      return;
    }

    setExpandedAd(null);
    setRefreshing(true);

    window.setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  return (
    <section
      className="adSection"
      aria-label="Available advertisements"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="adSectionHeader">
        <div>
          <div className="adEyebrow">
            <span
              className="eyebrowDot"
              aria-hidden="true"
            />

            AVAILABLE OPPORTUNITIES
          </div>

          <h2>Watch &amp; earn</h2>

          <p>
            Choose an advertisement, watch it completely
            and collect your VEs instantly.
          </p>
        </div>

        <div className="adSectionControls">
          {/* COUNT */}

          <div className="adCount">
            <strong>{availableAds.length}</strong>

            <span>
              {availableAds.length === 1
                ? "ad available"
                : "ads available"}
            </span>
          </div>

          {/* REFRESH */}

          <button
            type="button"
            className={`adRefreshButton ${
              refreshing ? "refreshing" : ""
            }`}
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh advertisements"
          >
            <RefreshCw
              size={14}
              className={
                refreshing ? "refreshIcon" : ""
              }
              aria-hidden="true"
            />

            <span>
              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </span>
          </button>

          {/* SORT */}

          {availableAds.length > 1 && (
            <label className="adSort">
              <span>Sort by</span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                aria-label="Sort advertisements"
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="highestReward">
                  Highest Reward
                </option>

                <option value="shortest">
                  Shortest Duration
                </option>
              </select>
            </label>
          )}
        </div>
      </div>

      {/* =====================================================
          REWARD SUCCESS
      ===================================================== */}

      {rewardEarned && !refreshing && (
        <div
          className="rewardSuccess"
          role="status"
          aria-live="polite"
        >
          <div
            className="successIcon"
            aria-hidden="true"
          >
            <CircleCheck size={20} />
          </div>

          <div>
            <strong>
              Reward successfully earned!
            </strong>

            <span>
              +{rewardEarned.reward} VEs added to
              your balance
            </span>
          </div>

          <Sparkles
            size={18}
            aria-hidden="true"
          />
        </div>
      )}

      {/* =====================================================
          AVAILABLE ADS
      ===================================================== */}

      {refreshing ? (
        /* ===================================================
           LOADING / SKELETON
        =================================================== */

        <div
          className="adsGrid"
          aria-label="Loading advertisements"
          aria-busy="true"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              className="adSkeleton"
              key={item}
              aria-hidden="true"
            >
              <div className="skeletonTop" />

              <div className="skeletonImage" />

              <div className="skeletonLine large" />

              <div className="skeletonLine" />

              <div className="skeletonLine small" />

              <div className="skeletonButton" />
            </div>
          ))}
        </div>
      ) : availableAds.length === 0 ? (
        /* ===================================================
           EMPTY STATE
        =================================================== */

        <div
          className="adsEmptyState"
          role="status"
          aria-live="polite"
        >
          <div
            className="emptyIcon"
            aria-hidden="true"
          >
            <CheckCircle2 size={28} />
          </div>

          <h3>All ads completed</h3>

          <p>
            You've watched all available
            advertisements for now. Check back later
            for new opportunities.
          </p>

          <button
            type="button"
            className="emptyRefreshButton"
            onClick={handleRefresh}
          >
            <RefreshCw size={15} />
            Check for new ads
          </button>
        </div>
      ) : (
        /* ===================================================
           ADS GRID
        =================================================== */

        <div className="adsGrid">
          {sortedAds.map((ad) => {
            const watching = isWatching(ad.id);
            const completed = isCompleted(ad.id);
            const timeLeft = getTimeLeft(ad.id);
            const isExpanded = expandedAd === ad.id;

            const duration = Math.max(
              Number(ad.duration) || 1,
              1
            );

            const watchProgress = watching
              ? Math.min(
                  Math.max(
                    ((duration - timeLeft) /
                      duration) *
                      100,
                    0
                  ),
                  100
                )
              : 0;

            const detailsId = `ad-details-${ad.id}`;

            return (
              <article
                className={`adCard ${ad.accent || ""} ${
                  completed ? "completed" : ""
                } ${
                  watching ? "watchingCard" : ""
                } ${
                  isExpanded ? "detailsExpanded" : ""
                }`}
                key={ad.id}
              >
                <div
                  className="cardGlow"
                  aria-hidden="true"
                />

                {/* =================================================
                    TOP
                ================================================= */}

                <div className="adCardTop">
                  <div className="brandInfo">
                    <div
                      className="brandIcon"
                      aria-hidden="true"
                    >
                      {ad.icon}
                    </div>

                    <div>
                      <strong>{ad.brand}</strong>

                      <span>{ad.category}</span>
                    </div>
                  </div>

                  <div
                    className={`availableBadge ${
                      completed ? "done" : ""
                    }`}
                  >
                    <span />

                    {completed
                      ? "Completed"
                      : watching
                        ? "Watching"
                        : "Available"}
                  </div>
                </div>

                {/* =================================================
                    ILLUSTRATION
                ================================================= */}

                <div className="adIllustration">
                  <div
                    className="illustrationOrb"
                    aria-hidden="true"
                  />

                  <div
                    className="illustrationIcon"
                    aria-hidden="true"
                  >
                    {watching ? (
                      <LoaderCircle
                        size={30}
                        className="loadingIcon"
                      />
                    ) : completed ? (
                      <CheckCircle2 size={31} />
                    ) : (
                      ad.icon
                    )}
                  </div>

                  <div className="rewardFloating">
                    <Zap size={12} />
                    <span>+{ad.reward} VEs</span>
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="adCardContent">
                  <div className="adMeta">
                    <span>
                      <Clock3
                        size={12}
                        aria-hidden="true"
                      />

                      {ad.duration} sec
                    </span>

                    <span className="rewardText">
                      <Sparkles
                        size={12}
                        aria-hidden="true"
                      />

                      +{ad.reward} VEs
                    </span>
                  </div>

                  <h3>{ad.title}</h3>

                  <p>{ad.description}</p>

                  {/* =================================================
                      DETAILS
                  ================================================= */}

                  <button
                    type="button"
                    className="detailsToggle"
                    onClick={() =>
                      toggleDetails(ad.id)
                    }
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                  >
                    <span>
                      {isExpanded
                        ? "Hide Details"
                        : "View Details"}
                    </span>

                    <ChevronDown
                      size={15}
                      className={
                        isExpanded
                          ? "detailsChevron open"
                          : "detailsChevron"
                      }
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <div
                      className="adDetails"
                      id={detailsId}
                    >
                      <div className="detailRow">
                        <span>Campaign</span>

                        <strong>
                          {ad.category}
                        </strong>
                      </div>

                      <div className="detailRow">
                        <span>Watch time</span>

                        <strong>
                          {ad.duration} sec
                        </strong>
                      </div>

                      <div className="detailRow">
                        <span>Reward</span>

                        <strong>
                          +{ad.reward} VEs
                        </strong>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      WATCH PROGRESS
                  ================================================= */}

                  {watching && (
                    <div
                      className="adWatchProgress"
                      aria-label={`Advertisement watching progress, ${timeLeft} seconds remaining`}
                    >
                      <div className="watchProgressTop">
                        <span>
                          Watching advertisement
                        </span>

                        <strong>
                          {timeLeft}s
                        </strong>
                      </div>

                      <div
                        className="watchProgressTrack"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={duration}
                        aria-valuenow={
                          duration - timeLeft
                        }
                        aria-label="Advertisement watch progress"
                      >
                        <div
                          className="watchProgressFill"
                          style={{
                            width: `${watchProgress}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* =================================================
                    ACTION
                ================================================= */}

                <button
                  type="button"
                  className={`watchButton ${
                    watching ? "watching" : ""
                  } ${
                    completed
                      ? "completedButton"
                      : ""
                  }`}
                  onClick={() =>
                    startWatching(ad)
                  }
                  disabled={watching || completed}
                  aria-label={
                    completed
                      ? `${ad.title} completed`
                      : watching
                        ? `Watching ${ad.title}`
                        : `Watch ${ad.title}`
                  }
                >
                  {watching ? (
                    <>
                      <span className="watchIcon">
                        <LoaderCircle
                          size={14}
                          className="loadingIcon"
                          aria-hidden="true"
                        />
                      </span>

                      <span>
                        Watching Advertisement...
                      </span>

                      <span className="buttonReward">
                        {timeLeft}s
                      </span>
                    </>
                  ) : completed ? (
                    <>
                      <span className="watchIcon">
                        <CheckCircle2
                          size={14}
                          aria-hidden="true"
                        />
                      </span>

                      <span>
                        Advertisement Completed
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="watchIcon">
                        <Play
                          size={13}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      </span>

                      <span>
                        Watch Advertisement
                      </span>

                      <span className="buttonReward">
                        +{ad.reward}
                      </span>
                    </>
                  )}
                </button>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="adCardFooter">
                  <span>
                    {completed ? (
                      <>
                        <CheckCircle2
                          size={11}
                          aria-hidden="true"
                        />

                        Reward received
                      </>
                    ) : watching ? (
                      <>
                        <Clock3
                          size={11}
                          aria-hidden="true"
                        />

                        Please keep watching
                      </>
                    ) : (
                      <>
                        <CheckCircle2
                          size={11}
                          aria-hidden="true"
                        />

                        Reward after completion
                      </>
                    )}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* =========================================================
          COMPLETED ADS
          IMPORTANT:
          Completed ads are intentionally kept separate from
          available ads so users can see their completed history.
      ========================================================= */}

      {!refreshing && completedAds.length > 0 && (
        <section
          className="completedAdsSection"
          aria-labelledby="completed-ads-title"
        >
          <div className="completedAdsHeader">
            <div>
              <div className="adEyebrow">
                <span
                  className="eyebrowDot"
                  aria-hidden="true"
                />

                YOUR ACTIVITY
              </div>

              <h3 id="completed-ads-title">
                Completed advertisements
              </h3>

              <p>
                Rewards you've already earned from
                completed advertisements.
              </p>
            </div>

            <div className="completedCount">
              <CheckCircle2
                size={15}
                aria-hidden="true"
              />

              <span>
                {completedAds.length} completed
              </span>
            </div>
          </div>

          <div className="completedAdsList">
            {completedAds.map((ad) => (
              <article
                className={`completedAdItem ${
                  ad.accent || ""
                }`}
                key={ad.id}
              >
                <div
                  className="completedAdIcon"
                  aria-hidden="true"
                >
                  <CheckCircle2 size={19} />
                </div>

                <div className="completedAdInfo">
                  <strong>{ad.title}</strong>

                  <span>
                    {ad.brand} · {ad.duration} sec
                  </span>
                </div>

                <div className="completedAdReward">
                  <span>Reward received</span>

                  <strong>
                    +{ad.reward} VEs
                  </strong>
                </div>

                <div className="completedAdStatus">
                  <CheckCircle2
                    size={14}
                    aria-hidden="true"
                  />

                  Completed
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default AdSection;