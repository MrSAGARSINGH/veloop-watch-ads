import {
  Wallet,
  ArrowRight,
  CircleDollarSign,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import "./EarningsInfo.scss";

const earningHighlights = [
  {
    label: "CONVERSION",
    title: "1 VE = ₹1",
    description: "Simple & transparent value",
    icon: CircleDollarSign,
    type: "purple",
  },
  {
    label: "WITHDRAWAL",
    title: "₹500 minimum",
    description: "Withdraw once you reach the limit",
    icon: Landmark,
    type: "blue",
  },
  {
    label: "SECURE REWARDS",
    title: "100% Tracked",
    description: "Your completed ads are recorded",
    icon: ShieldCheck,
    type: "green",
  },
];

function EarningsInfo() {
  return (
    <section
      className="earningsInfo"
      aria-label="Earnings information"
    >
      {/* =========================
          MAIN EARNINGS CARD
      ========================= */}
      <div className="earningsCard">
        <div className="earningsCardGlow" />

        <div className="earningsIcon">
          <Wallet
            size={21}
            strokeWidth={1.8}
          />
        </div>

        <div className="earningsContent">
          <span className="earningsEyebrow">
            YOUR EARNINGS
          </span>

          <h2>
            Every second watched,
            <span> every VE earned.</span>
          </h2>

          <p>
            Complete advertisements to earn VEs.
            Your rewards are tracked automatically
            and can be converted when you reach
            the required threshold.
          </p>
        </div>

        <button
          type="button"
          className="earningsArrow"
          aria-label="View earnings details"
        >
          <ArrowRight
            size={18}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* =========================
          INFORMATION CARDS
      ========================= */}
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
              className="earningMiniCard"
              key={label}
            >
              <div
                className={`miniIcon ${type}`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <span>{label}</span>

                <strong>{title}</strong>

                <small>
                  {description}
                </small>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

export default EarningsInfo;