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
  const currentYear =
    new Date().getFullYear();

  const activityUpdates =
    recentActivities.length > 0
      ? recentActivities
          .slice(0, 4)
          .map((activity) => ({
            id: activity.id,
            text: `${activity.title} · ${activity.reward}`,
            icon: CheckCircle2,
          }))
      : defaultUpdates;

  const handleNavigate = (page) => {
    if (onNavigate) {
      onNavigate(page);
      return;
    }

    window.location.hash = `/${page}`;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToAds = () => {
    const section =
      document.getElementById("available-ads");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    handleNavigate("watch-ads");
  };

  return (
    <footer className="siteFooter">
      {/* Background decoration */}

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
        {/* Footer top */}

        <div className="footerTop">
          <button
            type="button"
            className="footerBrand"
            onClick={() =>
              handleNavigate("watch-ads")
            }
            aria-label="Go to Watch Ads"
          >
            <div
              className="footerLogo"
              aria-hidden="true"
            >
              <span>V</span>
              <i />
            </div>

            <div className="footerBrandText">
              <strong>VELOOP</strong>
              <span>REWARDS</span>
            </div>
          </button>

          <div className="footerStatus">
            <span
              className="footerStatusPulse"
              aria-hidden="true"
            >
              <span />
            </span>

            <span>Reward system active</span>
          </div>
        </div>

        {/* Main footer content */}

        <div className="footerMain">
          <div className="footerMessage">
            <div className="footerEyebrow">
              <Sparkles
                size={12}
                aria-hidden="true"
              />

              YOUR TIME, REWARDED
            </div>

            <h3>
              Watch.
              <span> Earn.</span>
              <br />
              Keep growing.
            </h3>

            <p>
              Discover campaigns, complete them and
              keep every reward organized in one place.
            </p>

            <button
              type="button"
              className="footerPrimaryButton"
              onClick={scrollToAds}
            >
              <span className="footerPrimaryIcon">
                <Zap
                  size={14}
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>

              Explore available ads

              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Activity updates */}

          <div className="footerLive">
            <div className="footerLiveHeader">
              <div>
                <Activity
                  size={13}
                  aria-hidden="true"
                />

                <span>PLATFORM UPDATES</span>
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
                      <Icon size={12} />
                    </span>

                    <span>{text}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Quick links */}

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
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("dashboard")
              }
            >
              <span>Dashboard</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("offers")
              }
            >
              <span>Offers</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate("support")
              }
            >
              <span>Support</span>
              <ArrowRight size={13} />
            </button>
          </nav>

          {/* Scroll to top */}

          <button
            type="button"
            className="footerTopButton"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp
              size={16}
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
                size={13}
                aria-hidden="true"
              />

              Secure experience
            </span>

            <span>
              <Sparkles
                size={13}
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