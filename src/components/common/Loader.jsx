import { useEffect, useState } from "react";

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const interval = 25;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(
          previous + increment,
          100
        );

        if (next >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            onComplete?.();
          }, 180);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="appLoader">
      <div className="loaderGlow" />

      <div className="loaderContent">
        <div className="loaderMark">
          V
        </div>

        <div className="loaderBrand">
          VELOOP
        </div>

        <div className="loaderSubtitle">
          REWARDS
        </div>

        <div className="loaderTagline">
          Turn time into rewards
        </div>

        <div className="loaderProgress">
          <div
            className="loaderProgressBar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="loaderStatus">
          <span>Loading your rewards</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;