import {
  Wallet,
  ArrowUpRight,
  CircleDollarSign,
  Landmark,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import "./EarningsInfo.scss";

const earningHighlights = [
  {
    label: "CONVERSION",
    title: "1 VE = ₹1",
    description: "Simple and transparent value",
    icon: CircleDollarSign,
    type: "purple",
  },
  {
    label: "WITHDRAWAL",
    title: "₹500 minimum",
    description: "Withdraw when you reach the limit",
    icon: Landmark,
    type: "blue",
  },
  {
    label: "SECURE REWARDS",
    title: "100% tracked",
    description: "Completed ads are recorded",
    icon: ShieldCheck,
    type: "green",
  },
];

function EarningsInfo() {
  return (
    <section
      className="earningsInfo"
      aria-labelledby="earnings-info-title"
    >
      {/* =====================================================
          MAIN EARNINGS CARD
      ===================================================== */}

      <article className="earningsCard">
        <div
          className="earningsCardGlow earningsGlowOne"
          aria-hidden="true"
        />

        <div
          className="earningsCardGlow earningsGlowTwo"
          aria-hidden="true"
        />

        <div className="earningsCardTop">
          <div className="earningsIcon">
            <Wallet
              size={21}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div className="earningsLive">
            <span aria-hidden="true" />
            REWARDS ACTIVE
          </div>
        </div>

        <div className="earningsContent">
          <span className="earningsEyebrow">
            YOUR EARNINGS
          </span>

          <h2 id="earnings-info-title">
            Every second watched,
            <span> every VE earned.</span>
          </h2>

          <p>
            Complete advertisements to earn VEs.
            Your rewards are tracked automatically
            and can be converted once you reach the
            required withdrawal threshold.
          </p>

          <div className="earningsTrust">
            <span>
              <CheckCircle2
                size={13}
                aria-hidden="true"
              />
              Instant tracking
            </span>

            <span>
              <ShieldCheck
                size={13}
                aria-hidden="true"
              />
              Secure rewards
            </span>

            <span>
              <Sparkles
                size={13}
                aria-hidden="true"
              />
              Transparent value
            </span>
          </div>
        </div>

        <button
          type="button"
          className="earningsArrow"
          aria-label="View earnings details"
        >
          <ArrowUpRight
            size={18}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </button>
      </article>

      {/* =====================================================
          INFORMATION CARDS
      ===================================================== */}

      <div className="earningsCards">
        {earningHighlights.map(
          ({
            label,
            title,
            description,
            icon: Icon,
            type,
          }) => (
            <article
              className={`earningMiniCard ${type}`}
              key={label}
            >
              <div
                className={`miniIcon ${type}`}
                aria-hidden="true"
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div className="miniContent">
                <span>{label}</span>

                <strong>{title}</strong>

                <small>{description}</small>
              </div>

              <div
                className="miniCardGlow"
                aria-hidden="true"
              />
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default EarningsInfo;