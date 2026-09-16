import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Play,
  PlayCircle,
  Search,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";

import "./HowItWorks.scss";

const steps = [
  {
    id: "01",
    icon: Search,
    eyebrow: "DISCOVER",
    title: "Choose a campaign",
    description:
      "Browse the available campaigns and select the reward opportunity you prefer.",
    meta: "Multiple options",
  },
  {
    id: "02",
    icon: PlayCircle,
    eyebrow: "ENGAGE",
    title: "Watch completely",
    description:
      "Watch the selected advertisement for its required duration without skipping.",
    meta: "20–45 seconds",
  },
  {
    id: "03",
    icon: WalletCards,
    eyebrow: "REWARD",
    title: "Receive your VEs",
    description:
      "Once the campaign is completed, your reward is automatically added to your balance.",
    meta: "Instant credit",
  },
];

function HowItWorks() {
  const handleStartEarning = () => {
    document.getElementById("available-ads")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="howItWorks"
      aria-labelledby="how-it-works-title"
    >
      {/* Header */}

      <div className="howHeader">
        <div className="howHeaderContent">
          <span className="howEyebrow">
            <Sparkles
              size={13}
              aria-hidden="true"
            />

            SIMPLE &amp; TRANSPARENT
          </span>

          <h2 id="how-it-works-title">
            From watching to rewarding
          </h2>

          <p>
            Start earning in three clear steps. No
            complicated process, hidden actions or
            unnecessary waiting.
          </p>
        </div>

        <div className="howHeaderActions">
          <div className="howBadge">
            <span>3</span>

            <div>
              <strong>Easy steps</strong>
              <small>to start earning</small>
            </div>
          </div>

          <button
            type="button"
            className="howStartButton"
            onClick={handleStartEarning}
          >
            <span>
              <Play
                size={13}
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
            </span>

            Start earning

            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Steps */}

      <div className="stepsGrid">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              className="stepWrapper"
              key={step.id}
            >
              <article className="stepCard">
                <div
                  className="stepGlow"
                  aria-hidden="true"
                />

                <div className="stepTop">
                  <span className="stepNumber">
                    {step.id}
                  </span>

                  <div
                    className="stepIcon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                <div className="stepContent">
                  <span className="stepEyebrow">
                    {step.eyebrow}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>

                <div className="stepMeta">
                  {index === 0 && (
                    <Search
                      size={13}
                      aria-hidden="true"
                    />
                  )}

                  {index === 1 && (
                    <Clock3
                      size={13}
                      aria-hidden="true"
                    />
                  )}

                  {index === 2 && (
                    <Zap
                      size={13}
                      aria-hidden="true"
                    />
                  )}

                  <span>{step.meta}</span>

                  <CheckCircle2
                    className="stepCheck"
                    size={14}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className="stepLine"
                  aria-hidden="true"
                />
              </article>

              {index < steps.length - 1 && (
                <div
                  className="stepConnector"
                  aria-hidden="true"
                >
                  <span />

                  <ArrowRight
                    className="stepArrow"
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;