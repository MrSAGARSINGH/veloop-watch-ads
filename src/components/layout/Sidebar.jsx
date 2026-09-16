import {
  ArrowDownToLine,
  ChevronRight,
  ClipboardList,
  Flame,
  Gift,
  Headphones,
  History,
  LayoutDashboard,
  PlaySquare,
  Settings,
  Sparkles,
  UserRound,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

import "./Sidebar.scss";

const navigationGroups = [
  {
    label: "EARNING",
    items: [
      {
        label: "Watch Ads",
        key: "watch-ads",
        icon: PlaySquare,
      },
      {
        label: "Dashboard",
        key: "dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Tasks",
        key: "tasks",
        icon: ClipboardList,
      },
      {
        label: "Offers",
        key: "offers",
        icon: Gift,
      },
      {
        label: "Refer & Earn",
        key: "refer",
        icon: Users,
        badge: "NEW",
      },
    ],
  },
  {
    label: "REWARDS",
    items: [
      {
        label: "Wallet",
        key: "wallet",
        icon: Wallet,
      },
      {
        label: "Withdraw",
        key: "withdraw",
        icon: ArrowDownToLine,
      },
      {
        label: "History",
        key: "history",
        icon: History,
      },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      {
        label: "Profile",
        key: "profile",
        icon: UserRound,
      },
      {
        label: "Support",
        key: "support",
        icon: Headphones,
      },
      {
        label: "Settings",
        key: "settings",
        icon: Settings,
      },
    ],
  },
];

function Sidebar({
  isOpen = false,
  onClose,
  activePage = "watch-ads",
  onNavigate,
  userName = "Sagar Singh",
  userLevel = 8,
  userTitle = "Reward Explorer",
  currentXp = 3250,
  nextLevelXp = 5000,
  streakDays = 7,
}) {
  const safeCurrentXp = Math.max(
    Number(currentXp) || 0,
    0,
  );

  const safeNextLevelXp = Math.max(
    Number(nextLevelXp) || 1,
    1,
  );

  const xpPercentage = Math.min(
    Math.round(
      (safeCurrentXp / safeNextLevelXp) * 100,
    ),
    100,
  );

  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join("");

  const handleNavigation = (key) => {
    onNavigate?.(key);
    onClose?.();
  };

  return (
    <aside
      className={`sidebar ${
        isOpen ? "sidebarOpen" : ""
      }`}
      aria-label="Main navigation"
    >
      {/* Sidebar top */}

      <div className="sidebarTop">
        <button
          type="button"
          className="logoArea"
          onClick={() =>
            handleNavigation("watch-ads")
          }
          aria-label="Go to Watch Ads"
        >
          <div
            className="logoMark"
            aria-hidden="true"
          >
            <span>V</span>

            <i />
          </div>

          <div className="logoText">
            <strong>VELOOP</strong>
            <span>REWARDS</span>
          </div>
        </button>

        <button
          type="button"
          className="sidebarClose"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Navigation groups */}

      <nav
        id="main-navigation"
        className="navigation"
        aria-label="Primary navigation"
      >
        {navigationGroups.map((group) => (
          <div
            className="navGroup"
            key={group.label}
          >
            <span className="navGroupLabel">
              {group.label}
            </span>

            <div className="navGroupItems">
              {group.items.map(
                ({
                  label,
                  key,
                  icon: Icon,
                  badge,
                }) => {
                  const active =
                    activePage === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`navItem ${
                        active ? "active" : ""
                      }`}
                      onClick={() =>
                        handleNavigation(key)
                      }
                      aria-current={
                        active
                          ? "page"
                          : undefined
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

                      <ChevronRight
                        className="navChevron"
                        size={14}
                        strokeWidth={2}
                        aria-hidden="true"
                      />

                      {active && (
                        <span
                          className="activeRail"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Streak card */}

      <div className="streakCard">
        <div
          className="streakGlow"
          aria-hidden="true"
        />

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
            <strong>
              {streakDays} day streak
            </strong>

            <span className="streakLive">
              <span />
              ACTIVE
            </span>
          </div>

          <span>Keep your momentum going</span>

          <div
            className="streakProgress"
            role="progressbar"
            aria-label="Weekly streak progress"
            aria-valuemin={0}
            aria-valuemax={7}
            aria-valuenow={Math.min(
              streakDays,
              7,
            )}
          >
            <div
              className="streakProgressFill"
              style={{
                width: `${Math.min(
                  (streakDays / 7) * 100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* User information */}

      <button
        type="button"
        className="userCard"
        onClick={() =>
          handleNavigation("profile")
        }
        aria-label={`Open ${userName}'s profile`}
      >
        <div className="avatar">
          <span>{userInitials || "U"}</span>

          <span
            className="avatarStatus"
            aria-label="Online"
          />
        </div>

        <div className="userInfo">
          <div className="userNameRow">
            <strong>{userName}</strong>

            <span className="levelBadge">
              LVL {userLevel}
            </span>
          </div>

          <span className="levelText">
            {userTitle}
          </span>

          <div
            className="xpTrack"
            role="progressbar"
            aria-label="Experience progress"
            aria-valuemin={0}
            aria-valuemax={safeNextLevelXp}
            aria-valuenow={Math.min(
              safeCurrentXp,
              safeNextLevelXp,
            )}
          >
            <div
              className="xpFill"
              style={{
                width: `${xpPercentage}%`,
              }}
            />
          </div>

          <div className="xpBottom">
            <small>
              {safeCurrentXp.toLocaleString()} /{" "}
              {safeNextLevelXp.toLocaleString()} XP
            </small>

            <span>{xpPercentage}%</span>
          </div>
        </div>

        <ChevronRight
          className="userCardArrow"
          size={15}
          aria-hidden="true"
        />
      </button>

      {/* Invite card */}

      <div className="inviteCard">
        <div
          className="inviteGlow"
          aria-hidden="true"
        />

        <div className="inviteTop">
          <div className="inviteContent">
            <div className="inviteLabel">
              <Sparkles
                size={12}
                aria-hidden="true"
              />

              REWARDS BOOST
            </div>

            <strong>Invite friends</strong>

            <span>
              Earn up to 250 bonus VEs
            </span>
          </div>

          <div
            className="gift"
            aria-hidden="true"
          >
            <Gift size={22} />
          </div>
        </div>

        <button
          type="button"
          className="inviteButton"
          onClick={() =>
            handleNavigation("refer")
          }
        >
          <span>Invite now</span>

          <Zap
            size={15}
            fill="currentColor"
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;