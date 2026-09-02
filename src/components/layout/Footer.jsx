import {
  ShieldCheck,
  Sparkles,
  ArrowUp,
  ArrowRight,
  Activity,
} from "lucide-react";

import "./Footer.scss";

const liveActivities = [
  "Someone just earned +25 VEs",
  "Daily reward progress updated",
  "New earning opportunity available",
  "Reward session completed",
];

function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToAds = () => {
    const section = document.getElementById("available-ads");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      scrollToTop();
    }
  };

  return (
    <footer className="siteFooter">
      {/* =========================
          BACKGROUND MOTION
      ========================= */}

      <div className="footerAmbient footerAmbientOne" aria-hidden="true" />

      <div className="footerAmbient footerAmbientTwo" aria-hidden="true" />

      <div className="footerGrid" aria-hidden="true" />

      <div className="footerOrb footerOrbOne" aria-hidden="true" />

      <div className="footerOrb footerOrbTwo" aria-hidden="true" />

      {/* =========================
          FLOATING REWARD SIGNALS
      ========================= */}

      <div className="rewardSignal rewardSignalOne" aria-hidden="true">
        <span>+</span>25 VEs
      </div>

      <div className="rewardSignal rewardSignalTwo" aria-hidden="true">
        <span>+</span>18 VEs
      </div>

      <div className="rewardSignal rewardSignalThree" aria-hidden="true">
        <span>+</span>35 VEs
      </div>

      {/* =========================
          FOOTER CONTENT
      ========================= */}

      <div className="footerInner">
        {/* TOP */}

        <div className="footerTop">
          <div className="footerBrand">
            <div className="footerLogo">
              <span>V</span>
            </div>

            <div className="footerBrandText">
              <strong>VELOOP</strong>
              <span>REWARDS</span>
            </div>
          </div>

          <div className="footerStatus">
            <span className="footerStatusPulse">
              <span />
            </span>

            <span>Reward system active</span>
          </div>
        </div>

        {/* MAIN */}

        <div className="footerMain">
          <div className="footerMessage">
            <div className="footerEyebrow">
              <Sparkles size={11} />
              KEEP EARNING
            </div>

            <h3>
              Watch.
              <span> Earn.</span>
              <br />
              Repeat.
            </h3>

            <p>Turn your time into meaningful rewards with VELOOP.</p>
          </div>

          {/* LIVE ACTIVITY */}

          <div className="footerLive">
            <div className="footerLiveHeader">
              <div>
                <Activity size={12} />
                <span>LIVE ACTIVITY</span>
              </div>

              <span className="liveIndicator">LIVE</span>
            </div>

            <div className="footerLiveTrack">
              {liveActivities.map((activity, index) => (
                <div
                  className="liveActivity"
                  key={activity}
                  style={{
                    "--activity-index": index,
                  }}
                >
                  <span className="liveDot" />

                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}

          <nav className="footerLinks" aria-label="Footer navigation">
            <span className="footerLinksTitle">QUICK ACCESS</span>

            <button type="button" onClick={scrollToAds}>
              Watch Ads
              <ArrowRight size={12} />
            </button>

            <button type="button" onClick={() => onNavigate?.("dashboard")}>
              Dashboard
              <ArrowRight size={12} />
            </button>

            <button type="button" onClick={() => onNavigate?.("offers")}>
              Offers
              <ArrowRight size={12} />
            </button>

            <button type="button" onClick={() => onNavigate?.("support")}>
              Support
              <ArrowRight size={12} />
            </button>
          </nav>

          {/* TOP BUTTON */}

          <button
            type="button"
            className="footerTopButton"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={16} strokeWidth={2} />

            <span>TOP</span>
          </button>
        </div>

        {/* DIVIDER */}

        <div className="footerDivider" />

        {/* BOTTOM */}

        <div className="footerBottom">
          <span className="footerCopyright">© 2026 VELOOP Rewards</span>

          <span className="footerAuthor">
            Crafted with
            <Sparkles size={11} />
            by{" "}
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
              <ShieldCheck size={13} />
              Secure experience
            </span>

            <span>
              <Sparkles size={13} />
              Built for rewards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
