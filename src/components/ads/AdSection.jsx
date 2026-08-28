import { useEffect } from "react";
import {
  Clock3,
  Play,
  Sparkles,
  CheckCircle2,
  Zap,
  LoaderCircle,
  CircleCheck,
} from "lucide-react";

import ads from "../../data/ads";
import useAdWatch from "../../hooks/useAdWatch";

import "./AdSection.scss";

function AdSection({ onAdCompleted }) {
  const {
    rewardEarned,
    startWatching,
    isWatching,
    isCompleted,
    getTimeLeft,
  } = useAdWatch();

  /*
   * Notify App when an advertisement
   * has been successfully completed.
   */
  useEffect(() => {
    if (!rewardEarned) {
      return;
    }

    onAdCompleted?.(rewardEarned);
  }, [rewardEarned, onAdCompleted]);

  /*
   * Only show advertisements that are
   * still available to watch.
   */
  const availableAds = ads.filter(
    (ad) => !isCompleted(ad.id)
  );

  return (
    <section
      className="adSection"
      aria-label="Available advertisements"
    >
      {/* =========================
          HEADER
      ========================= */}

      <div className="adSectionHeader">
        <div>
          <div className="adEyebrow">
            <span
              className="eyebrowDot"
              aria-hidden="true"
            />

            AVAILABLE OPPORTUNITIES
          </div>

          <h2>Watch & earn</h2>

          <p>
            Choose an advertisement, watch it completely
            and collect your VEs instantly.
          </p>
        </div>

        <div className="adCount">
          <strong>{availableAds.length}</strong>

          <span>
            {availableAds.length === 1
              ? "ad available"
              : "ads available"}
          </span>
        </div>
      </div>

      {/* =========================
          REWARD SUCCESS
      ========================= */}

      {rewardEarned && (
        <div
          className="rewardSuccess"
          role="status"
          aria-live="polite"
        >
          <div className="successIcon">
            <CircleCheck size={20} />
          </div>

          <div>
            <strong>
              Reward successfully earned!
            </strong>

            <span>
              +{rewardEarned.reward} VEs added to your balance
            </span>
          </div>

          <Sparkles
            size={18}
            aria-hidden="true"
          />
        </div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}

      {availableAds.length === 0 ? (
        <div
          className="adsEmptyState"
          role="status"
        >
          <div className="emptyIcon">
            <CheckCircle2 size={28} />
          </div>

          <h3>All ads completed</h3>

          <p>
            You've watched all available advertisements
            for now. Check back later for new
            opportunities.
          </p>
        </div>
      ) : (
        <div className="adsGrid">
          {availableAds.map((ad) => {
            const watching = isWatching(ad.id);
            const completed = isCompleted(ad.id);
            const timeLeft = getTimeLeft(ad.id);

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

            return (
              <article
                className={`adCard ${ad.accent} ${
                  completed ? "completed" : ""
                }`}
                key={ad.id}
              >
                <div className="cardGlow" />

                {/* =========================
                    TOP
                ========================= */}

                <div className="adCardTop">
                  <div className="brandInfo">
                    <div className="brandIcon">
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

                {/* =========================
                    ILLUSTRATION
                ========================= */}

                <div className="adIllustration">
                  <div className="illustrationOrb" />

                  <div className="illustrationIcon">
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
                    +{ad.reward} VEs
                  </div>
                </div>

                {/* =========================
                    CONTENT
                ========================= */}

                <div className="adCardContent">
                  <div className="adMeta">
                    <span>
                      <Clock3 size={12} />
                      {ad.duration} sec
                    </span>

                    <span className="rewardText">
                      <Sparkles size={12} />
                      +{ad.reward} VEs
                    </span>
                  </div>

                  <h3>{ad.title}</h3>

                  <p>{ad.description}</p>

                  {/* WATCH PROGRESS */}

                  {watching && (
                    <div className="adWatchProgress">
                      <div className="watchProgressTop">
                        <span>
                          Watching advertisement
                        </span>

                        <strong>
                          {timeLeft}s
                        </strong>
                      </div>

                      <div className="watchProgressTrack">
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

                {/* =========================
                    ACTION
                ========================= */}

                <button
                  type="button"
                  className={`watchButton ${
                    watching ? "watching" : ""
                  } ${
                    completed
                      ? "completedButton"
                      : ""
                  }`}
                  onClick={() => startWatching(ad)}
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
                        <CheckCircle2 size={14} />
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

                {/* =========================
                    FOOTER
                ========================= */}

                <div className="adCardFooter">
                  <span>
                    {completed ? (
                      <>
                        <CheckCircle2 size={11} />
                        Reward received
                      </>
                    ) : watching ? (
                      <>
                        <Clock3 size={11} />
                        Please keep watching
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={11} />
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
    </section>
  );
}

export default AdSection;