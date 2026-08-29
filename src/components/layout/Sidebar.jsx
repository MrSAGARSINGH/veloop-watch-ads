import {
  PlaySquare,
  LayoutDashboard,
  ClipboardList,
  Gift,
  Users,
  Wallet,
  ArrowDownToLine,
  History,
  UserRound,
  Headphones,
  Settings,
  Flame,
  ChevronRight,
  X,
  Sparkles,
  Zap,
} from "lucide-react";

import "./Sidebar.scss";

const navigation = [
  {
    label: "Watch Ads",
    icon: PlaySquare,
    active: true,
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    icon: ClipboardList,
  },
  {
    label: "Offers",
    icon: Gift,
  },
  {
    label: "Refer & Earn",
    icon: Users,
    badge: "NEW",
  },
  {
    label: "Wallet",
    icon: Wallet,
  },
  {
    label: "Withdraw",
    icon: ArrowDownToLine,
  },
  {
    label: "History",
    icon: History,
  },
  {
    label: "Profile",
    icon: UserRound,
  },
  {
    label: "Support",
    icon: Headphones,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function Sidebar({ isOpen = false, onClose }) {
  const handleNavigation = () => {
    onClose?.();
  };

  return (
    <aside
      className={`sidebar ${
        isOpen ? "sidebarOpen" : ""
      }`}
      aria-label="Main navigation"
    >
      {/* =========================
          MOBILE CLOSE
      ========================= */}

      <button
        type="button"
        className="sidebarClose"
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <X
          size={18}
          strokeWidth={1.8}
        />
      </button>

      {/* =========================
          LOGO
      ========================= */}

      <div className="logoArea">
        <div
          className="logoMark"
          aria-hidden="true"
        >
          <span>V</span>
        </div>

        <div className="logoText">
          <strong>VELOOP</strong>
          <span>REWARDS</span>
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav
        className="navigation"
        aria-label="Primary"
      >
        {navigation.map(
          ({
            label,
            icon: Icon,
            active = false,
            badge,
          }) => (
            <button
              key={label}
              type="button"
              className={`navItem ${
                active ? "active" : ""
              }`}
              onClick={handleNavigation}
              aria-current={
                active ? "page" : undefined
              }
            >
              <span className="navIcon">
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <span className="navLabel">
                {label}
              </span>

              {badge && (
                <span className="navBadge">
                  {badge}
                </span>
              )}

              {active && (
                <span
                  className="activeIndicator"
                  aria-hidden="true"
                >
                  <ChevronRight
                    size={14}
                    strokeWidth={2}
                  />
                </span>
              )}
            </button>
          )
        )}
      </nav>

      {/* =========================
          STREAK
      ========================= */}

      <div className="streakCard">
        <div
          className="streakIcon"
          aria-hidden="true"
        >
          <Flame
            size={22}
            strokeWidth={1.8}
          />
        </div>

        <div className="streakContent">
          <div className="streakHeading">
            <strong>7 Days Streak</strong>

            <span className="streakLive">
              <span />
              ACTIVE
            </span>
          </div>

          <span>
            Keep it up!
          </span>

          <div className="streakProgress">
            <div className="streakProgressFill" />
          </div>
        </div>
      </div>

      {/* =========================
          USER PROFILE
      ========================= */}

      <div className="userCard">
        <div className="avatar">
          <span>S</span>

          <span
            className="avatarStatus"
            aria-label="Online"
          />
        </div>

        <div className="userInfo">
          <div className="userNameRow">
            <strong>Sagar Singh</strong>

            <span className="levelBadge">
              LVL 8
            </span>
          </div>

          <span className="levelText">
            Reward Explorer
          </span>

          <div
            className="xpTrack"
            role="progressbar"
            aria-label="Experience progress"
            aria-valuemin="0"
            aria-valuemax="5000"
            aria-valuenow="3250"
          >
            <div
              className="xpFill"
              style={{
                width: "65%",
              }}
            />
          </div>

          <div className="xpBottom">
            <small>
              3,250 / 5,000 XP
            </small>

            <span>
              65%
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          INVITE
      ========================= */}

      <div className="inviteCard">
        <div className="inviteGlow" />

        <div className="inviteTop">
          <div className="inviteContent">
            <div className="inviteLabel">
              <Sparkles size={12} />
              REWARDS BOOST
            </div>

            <strong>
              Invite Friends
            </strong>

            <span>
              Earn up to 250 bonus VEs
            </span>
          </div>

          <div
            className="gift"
            aria-hidden="true"
          >
            🎁
          </div>
        </div>

        <button
          type="button"
          className="inviteButton"
          onClick={handleNavigation}
        >
          <span>Invite Now</span>

          <Zap
            size={15}
            fill="currentColor"
          />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;