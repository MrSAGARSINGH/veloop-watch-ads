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
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}
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
        <X size={18} strokeWidth={1.8} />
      </button>

      {/* =========================
          LOGO
      ========================= */}
      <div className="logoArea">
        <div
          className="logoMark"
          aria-hidden="true"
        >
          V
        </div>

        <div className="logoText">
          <strong>VELOOP</strong>
          <span>REWARDS</span>
        </div>
      </div>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="navigation">
        {navigation.map(
          ({
            label,
            icon: Icon,
            active = false,
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
              <Icon
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>{label}</span>

              {active && (
                <span
                  className="activeIndicator"
                  aria-hidden="true"
                >
                  <ChevronRight
                    size={14}
                    strokeWidth={1.8}
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
          <strong>7 Days Streak</strong>
          <span>Keep it up!</span>
        </div>
      </div>

      {/* =========================
          USER PROFILE
      ========================= */}
      <div className="userCard">
        <div
          className="avatar"
          aria-hidden="true"
        >
          S
        </div>

        <div className="userInfo">
          <strong>Sagar Singh</strong>
          <span>Level 8</span>

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
              style={{ width: "65%" }}
            />
          </div>

          <small>3,250 / 5,000 XP</small>
        </div>
      </div>

      {/* =========================
          INVITE
      ========================= */}
      <div className="inviteCard">
        <div className="inviteTop">
          <div>
            <strong>Invite Friends</strong>

            <span>
              Earn up to 250 bonus VEs
            </span>
          </div>

          <span
            className="gift"
            aria-hidden="true"
          >
            🎁
          </span>
        </div>

        <button
          type="button"
          className="inviteButton"
        >
          Invite Now
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;