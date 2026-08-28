import {
  Search,
  Bell,
  ChevronDown,
  Wallet,
  Plus,
  Menu,
} from "lucide-react";

import "./Topbar.scss";

function Topbar({ onMenuClick }) {
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

        <div
          className="mobilePageTitle"
          aria-label="Current page: Watch Ads"
        >
          <span>VELOOP</span>
          <strong>Watch Ads</strong>
        </div>

        {/* Search */}
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

          <kbd aria-hidden="true">⌘ K</kbd>
        </div>
      </div>

      {/* =========================
          RIGHT
      ========================= */}
      <div className="topbarRight">
        {/* Balance */}
        <div
          className="balancePill"
          aria-label="Available balance: 12,450 VEs"
        >
          <div
            className="balanceIcon"
            aria-hidden="true"
          >
            <Wallet
              size={16}
              strokeWidth={1.8}
            />
          </div>

          <div className="balanceInfo">
            <span>Available Balance</span>

            <strong>
              12,450 <small>VEs</small>
            </strong>
          </div>

          <button
            type="button"
            className="addBalance"
            aria-label="Add to balance"
          >
            <Plus
              size={14}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="notificationButton"
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

        {/* Profile */}
        <button
          type="button"
          className="profileMenu"
          aria-label="Open profile menu"
          aria-haspopup="menu"
        >
          <div
            className="profileAvatar"
            aria-hidden="true"
          >
            S
          </div>

          <div className="profileInfo">
            <strong>Sagar Singh</strong>
            <span>Premium Member</span>
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