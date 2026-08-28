import {
  Search,
  PlayCircle,
  WalletCards,
  ArrowRight,
} from "lucide-react";

import "./HowItWorks.scss";

const steps = [
  {
    id: "01",
    icon: Search,
    title: "Choose an Ad",
    description:
      "Pick any available advertisement that matches your preference.",
  },
  {
    id: "02",
    icon: PlayCircle,
    title: "Watch Completely",
    description:
      "Watch the advertisement for the required duration without skipping.",
  },
  {
    id: "03",
    icon: WalletCards,
    title: "Earn VEs",
    description:
      "Complete the ad and receive your reward in your VE balance.",
  },
];

function HowItWorks() {
  return (
    <section
      className="howItWorks"
      aria-label="How Veloop works"
    >
      {/* =========================
          HEADER
      ========================= */}
      <div className="howHeader">
        <div className="howHeaderContent">
          <span className="howEyebrow">
            SIMPLE & TRANSPARENT
          </span>

          <h2>How it works</h2>

          <p>
            Turn a few seconds of your time into
            meaningful rewards in three simple steps.
          </p>
        </div>

        <div className="howBadge">
          <span>3</span>
          <strong>Easy Steps</strong>
        </div>
      </div>

      {/* =========================
          STEPS
      ========================= */}
      <div className="stepsGrid">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              className="stepWrapper"
              key={step.id}
            >
              <article className="stepCard">
                <div className="stepTop">
                  <span className="stepNumber">
                    {step.id}
                  </span>

                  <div className="stepIcon">
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div className="stepContent">
                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>

                <div className="stepLine" />
              </article>

              {index < steps.length - 1 && (
                <ArrowRight
                  className="stepArrow"
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;