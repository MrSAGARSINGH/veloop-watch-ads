import {
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

import "./EarningsInfo.scss";

function EarningsInfo({
  conversionRate = "1 VE = ₹1",
  withdrawalMinimum = "₹500 minimum",
  onNavigate,
}) {
  const earningHighlights = [
    {
      label: "CONVERSION",
      title: conversionRate,
      description:
        "A simple and transparent reward value",
      icon: CircleDollarSign,
      type: "purple",
    },
    {
      label: "WITHDRAWAL",
      title: withdrawalMinimum,
      description:
        "Withdraw after reaching the required limit",
      icon: Landmark,
      type: "blue",
    },
    {
      label: "SECURE REWARDS",
      title: "Fully tracked",
      description:
        "Every completed campaign is recorded",
      icon: ShieldCheck,
      type: "green",
    },
  ];

  const handleViewWallet = () => {
    if (onNavigate) {
      onNavigate("wallet");
      return;
    }

    window.location.hash = "/wallet";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="earningsInfo"
      aria-labelledby="earnings-info-title"
    >
      {/* Main earnings card */}

      <article className="earningsCard">
        <div
          className="earningsCardGlow earningsGlowOne"
          aria-hidden="true"
        />

        <div
          className="earningsCardGlow earningsGlowTwo"
          aria-hidden="true"
        />

        <div
          className="earningsGrid"
          aria-hidden="true"
        />

        <div className="earningsCardTop">
          <div
            className="earningsIcon"
            aria-hidden="true"
          >
            <Wallet
              size={23}
              strokeWidth={1.8}
            />
          </div>

          <div className="earningsLive">
            <span
              className="earningsLiveDot"
              aria-hidden="true"
            />

            <span>REWARD SYSTEM ACTIVE</span>
          </div>
        </div>

        <div className="earningsContent">
          <span className="earningsEyebrow">
            <Sparkles
              size={12}
              aria-hidden="true"
            />

            YOUR EARNINGS
          </span>

          <h2 id="earnings-info-title">
            Every second watched,
            <span> every VE earned.</span>
          </h2>

          <p>
            Complete verified campaigns to earn VEs.
            Your rewards are tracked automatically and
            remain visible in your wallet and activity
            history.
          </p>

          <div className="earningsTrust">
            <span>
              <CheckCircle2
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

              Instant tracking
            </span>

            <span>
              <ShieldCheck
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

              Secure rewards
            </span>

            <span>
              <Sparkles
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

              Transparent value
            </span>
          </div>

          <button
            type="button"
            className="earningsWalletButton"
            onClick={handleViewWallet}
          >
            View your wallet

            <ArrowUpRight
              size={16}
              aria-hidden="true"
            />
          </button>
        </div>

        <button
          type="button"
          className="earningsArrow"
          onClick={handleViewWallet}
          aria-label="Open your wallet"
        >
          <ArrowUpRight
            size={19}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </button>

        <div
          className="earningsCornerBadge"
          aria-hidden="true"
        >
          <TrendingUp
            size={13}
            strokeWidth={2}
          />

          <span>LIVE</span>
        </div>
      </article>

      {/* Information cards */}

      <div className="earningsCards">
        {earningHighlights.map(
          (
            {
              label,
              title,
              description,
              icon: Icon,
              type,
            },
            index,
          ) => (
            <article
              className={`earningMiniCard ${type}`}
              key={label}
            >
              <div className="miniCardTop">
                <div
                  className={`miniIcon ${type}`}
                  aria-hidden="true"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <span
                  className="miniCardIndex"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>

              <div className="miniContent">
                <span className="miniLabel">
                  {label}
                </span>

                <strong>{title}</strong>

                <small>{description}</small>
              </div>

              <div
                className="miniCardGlow"
                aria-hidden="true"
              />

              <div
                className="miniCardAccent"
                aria-hidden="true"
              />
            </article>
          ),
        )}
      </div>
    </section>
  );
}

export default EarningsInfo;