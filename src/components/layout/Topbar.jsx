import {
  Search,
  Bell,
  ChevronDown,
  Wallet,
  Plus,
  Menu,
} from "lucide-react";

import "./Topbar.scss";

const pageTitles = {
  "watch-ads": "Watch Ads",
  dashboard: "Dashboard",
  tasks: "Tasks",
  offers: "Offers",
  refer: "Refer & Earn",
  wallet: "Wallet",
  withdraw: "Withdraw",
  history: "History",
  profile: "Profile",
  support: "Support",
  settings: "Settings",
};

function Topbar({
  onMenuClick,
  activePage = "watch-ads",
  onNavigate,
}) {
  const currentTitle =
    pageTitles[activePage] ||
    "Watch Ads";

  const handleNavigate = (page) => {
    onNavigate?.(page);
  };

  return (
    <header className="topbar">
      {/* =========================
          LEFT
      ========================= */}

      <div className="topbarLeft">
        <button
          type="button"
          className="mobileMenuButton"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-controls="main-navigation"
        >
          <Menu
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="mobilePageTitle"
          onClick={() =>
            handleNavigate(activePage)
          }
          aria-label={`Current page: ${currentTitle}`}
        >
          <span>VELOOP</span>
          <strong>{currentTitle}</strong>
        </button>

        {/* SEARCH */}

        <div className="searchBox">
          <Search
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <input
            type="search"
            placeholder="Search ads, offers..."
            aria-label="Search ads and offers"
            autoComplete="off"
          />

          <kbd aria-hidden="true">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* =========================
          RIGHT
      ========================= */}

      <div className="topbarRight">
        {/* BALANCE */}

        <div
          className="balancePill"
          aria-label="Available balance: 12,450 VEs"
        >
          <button
            type="button"
            className="balanceIcon"
            onClick={() =>
              handleNavigate("wallet")
            }
            aria-label="Open wallet"
          >
            <Wallet
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="balanceInfo"
            onClick={() =>
              handleNavigate("wallet")
            }
            aria-label="Open wallet"
          >
            <span>
              Available Balance
            </span>

            <strong>
              12,450{" "}
              <small>VEs</small>
            </strong>
          </button>

          <button
            type="button"
            className="addBalance"
            onClick={() =>
              handleNavigate("wallet")
            }
            aria-label="Open wallet"
          >
            <Plus
              size={14}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          className="notificationButton"
          onClick={() =>
            handleNavigate("history")
          }
          aria-label="View notifications"
        >
          <Bell
            size={19}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span
            className="notificationDot"
            aria-hidden="true"
          />
        </button>

        {/* PROFILE */}

        <button
          type="button"
          className="profileMenu"
          onClick={() =>
            handleNavigate("profile")
          }
          aria-label="Open profile"
        >
          <div
            className="profileAvatar"
            aria-hidden="true"
          >
            S
          </div>

          <div className="profileInfo">
            <strong>
              Sagar Singh
            </strong>

            <span>
              Premium Member
            </span>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}

export default Topbar;