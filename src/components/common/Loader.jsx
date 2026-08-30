import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(
          previous + increment,
          100,
        );

        if (next >= 100) {
          clearInterval(timer);

          setFinishing(true);

          setTimeout(() => {
            onComplete?.();
          }, 420);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const roundedProgress = Math.round(progress);

  const status =
    roundedProgress < 35
      ? "Preparing your rewards"
      : roundedProgress < 70
        ? "Loading your experience"
        : roundedProgress < 100
          ? "Almost ready"
          : "Welcome to VELOOP";

  return (
    <div
      className={`appLoader ${
        finishing ? "loaderFinishing" : ""
      }`}
      aria-label="Loading VELOOP Rewards"
      role="status"
    >
      {/* BACKGROUND */}

      <div className="loaderGrid" />
      <div className="loaderGlow loaderGlowOne" />
      <div className="loaderGlow loaderGlowTwo" />

      {/* FLOATING PARTICLES */}

      <span className="loaderParticle particleOne" />
      <span className="loaderParticle particleTwo" />
      <span className="loaderParticle particleThree" />
      <span className="loaderParticle particleFour" />

      <div className="loaderContent">
        {/* BRAND MARK */}

        <div className="loaderLogoWrap">
          <div className="loaderOrbit orbitOne" />
          <div className="loaderOrbit orbitTwo" />

          <div className="loaderMark">
            <span>V</span>
          </div>

          <div className="loaderSpark">
            <Sparkles
              size={13}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* BRAND */}

        <div className="loaderBrand">
          VELOOP
        </div>

        <div className="loaderSubtitle">
          REWARDS
        </div>

        <div className="loaderTagline">
          Turn time into rewards
        </div>

        {/* FEATURE STRIP */}

        <div className="loaderFeatures">
          <span>
            <Zap size={11} />
            Earn
          </span>

          <i />

          <span>
            <Sparkles size={11} />
            Grow
          </span>

          <i />

          <span>
            <ShieldCheck size={11} />
            Secure
          </span>
        </div>

        {/* PROGRESS */}

        <div className="loaderProgressWrapper">
          <div className="loaderProgressHeader">
            <span>{status}</span>

            <strong>
              {String(roundedProgress).padStart(
                2,
                "0",
              )}
              %
            </strong>
          </div>

          <div className="loaderProgress">
            <div
              className="loaderProgressBar"
              style={{
                width: `${progress}%`,
              }}
            >
              <span className="loaderProgressShine" />
            </div>
          </div>

          <div className="loaderProgressMeta">
            <span>VELOOP EXPERIENCE</span>
            <span>READY</span>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="loaderBottom">
          <span className="loaderLiveDot" />
          Initializing reward dashboard
        </div>
      </div>
    </div>
  );
}

export default Loader;