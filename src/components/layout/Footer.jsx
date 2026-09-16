import {
  Activity,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import "./Footer.scss";

const defaultUpdates = [
  {
    id: "tracking",
    text: "Reward tracking is active",
    icon: CheckCircle2,
  },
  {
    id: "progress",
    text: "Daily progress updates instantly",
    icon: Activity,
  },
  {
    id: "opportunities",
    text: "New campaigns appear automatically",
    icon: Sparkles,
  },
  {
    id: "rewards",
    text: "Completed rewards stay in history",
    icon: ShieldCheck,
  },
];

function Footer({
  onNavigate,
  recentActivities = [],
}) {
  const currentYear = new Date().getFullYear();

  const validActivities = Array.isArray(
    recentActivities,
  )
    ? recentActivities
    : [];

  const activityUpdates =
    validActivities.length > 0
      ? validActivities
          .slice(0, 4)
          .map((activity, index) => ({
            id:
              activity.id ??
              `footer-activity-${index}`,
            text: [
              activity.title,
              activity.reward,
            ]
              .filter(Boolean)
              .join(" · "),
            icon: CheckCircle2,
          }))
      : defaultUpdates;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigate = (page) => {
    if (typeof onNavigate === "function") {
      onNavigate(page);
      scrollToTop();
      return;
    }

    window.location.hash = `/${page}`;
    scrollToTop();
  };

  const scrollToAds = () => {
    const adsSection =
      document.getElementById("available-ads");

    if (adsSection) {
      adsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    handleNavigate("watch-ads");
  };

  return (
    <footer className="siteFooter">
      {/* Background decorations */}

      <div
        className="footerAmbient footerAmbientOne"
        aria-hidden="true"
      />

      <div
        className="footerAmbient footerAmbientTwo"
        aria-hidden="true"
      />

      <div
        className="footerGrid"
        aria-hidden="true"
      />

      <div
        className="footerOrb footerOrbOne"
        aria-hidden="true"
      />

      <div
        className="footerOrb footerOrbTwo"
        aria-hidden="true"
      />

      <div className="footerInner">
        {/* Footer header */}

        <div className="footerTop">
          <button
            type="button"
            className="footerBrand"
            onClick={() =>
              handleNavigate("watch-ads")
            }
            aria-label="Go to Watch Ads"
          >
            <span
              className="footerLogo"
              aria-hidden="true"
            >
              <span>V</span>
              <i />
            </span>

            <span className="footerBrandText">
              <strong>VELOOP</strong>
              <span>REWARDS</span>
            </span>
          </button>

          <div
            className="footerStatus"
            role="status"
          >
            <span
              className="footerStatusPulse"
              aria-hidden="true"
            >
              <span />
            </span>

            <span>Reward system active</span>
          </div>
        </div>

        {/* Main footer */}

        <div className="footerMain">
          <section
            className="footerMessage"
            aria-labelledby="footer-heading"
          >
            <div className="footerEyebrow">
              <Sparkles
                size={14}
                aria-hidden="true"
              />

              YOUR TIME, REWARDED
            </div>

            <h2 id="footer-heading">
              Watch.
              <span> Earn.</span>
              <br />
              Keep growing.
            </h2>

            <p>
              Discover available campaigns, complete
              them and keep every reward organized in
              one convenient place.
            </p>

            <button
              type="button"
              className="footerPrimaryButton"
              onClick={scrollToAds}
            >
              <span
                className="footerPrimaryIcon"
                aria-hidden="true"
              >
                <Zap
                  size={16}
                  fill="currentColor"
                />
              </span>

              <span>Explore available ads</span>

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </button>
          </section>

          {/* Platform updates */}

          <section
            className="footerLive"
            aria-labelledby="footer-updates-title"
          >
            <div className="footerLiveHeader">
              <div>
                <Activity
                  size={15}
                  aria-hidden="true"
                />

                <span id="footer-updates-title">
                  PLATFORM UPDATES
                </span>
              </div>

              <span className="liveIndicator">
                ACTIVE
              </span>
            </div>

            <div className="footerLiveTrack">
              {activityUpdates.map(
                (
                  {
                    id,
                    text,
                    icon: Icon,
                  },
                  index,
                ) => (
                  <div
                    className="liveActivity"
                    key={id}
                    style={{
                      "--activity-index": index,
                    }}
                  >
                    <span
                      className="footerActivityIcon"
                      aria-hidden="true"
                    >
                      <Icon size={14} />
                    </span>

                    <span>{text}</span>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Quick navigation */}

          <nav
            className="footerLinks"
            aria-label="Footer navigation"
          >
            <span className="footerLinksTitle">
              QUICK ACCESS
            </span>

            <button
              type="button"
              onClick={scrollToAds}
            >
              <span>Watch ads</span>

              <ArrowRight
                size={14}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("dashboard")
              }
            >
              <span>Dashboard</span>

              <ArrowRight
                size={14}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("offers")
              }
            >
              <span>Offers</span>

              <ArrowRight
                size={14}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("support")
              }
            >
              <span>Support</span>

              <ArrowRight
                size={14}
                aria-hidden="true"
              />
            </button>
          </nav>

          {/* Back to top */}

          <button
            type="button"
            className="footerTopButton"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />

            <span>TOP</span>
          </button>
        </div>

        <div
          className="footerDivider"
          aria-hidden="true"
        />

        {/* Footer bottom */}

        <div className="footerBottom">
          <span className="footerCopyright">
            © {currentYear} VELOOP Rewards
          </span>

          <span className="footerAuthor">
            Crafted by{" "}
            <a
              href="https://www.linkedin.com/in/sagarsinghkhangarot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sagar Singh Khangarot on LinkedIn"
            >
              Sagar Singh Khangarot
            </a>
          </span>

          <div className="footerTrust">
            <span>
              <ShieldCheck
                size={15}
                aria-hidden="true"
              />

              Secure experience
            </span>

            <span>
              <Sparkles
                size={15}
                aria-hidden="true"
              />

              Transparent rewards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;