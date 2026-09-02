import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Wallet,
  Plus,
  Menu,
  ArrowUpRight,
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

const searchSuggestions = [
  {
    id: 1,
    title: "Adidas Summer Campaign",
    category: "Fashion",
    type: "Ad",
    page: "watch-ads",
  },
  {
    id: 2,
    title: "Amazon Rewards Offer",
    category: "Shopping",
    type: "Offer",
    page: "offers",
  },
  {
    id: 3,
    title: "Apple Premium Ad",
    category: "Technology",
    type: "Ad",
    page: "watch-ads",
  },
  {
    id: 4,
    title: "Flipkart Mega Rewards",
    category: "Shopping",
    type: "Offer",
    page: "offers",
  },
  {
    id: 5,
    title: "Gaming Rewards",
    category: "Gaming",
    type: "Ad",
    page: "watch-ads",
  },
  {
    id: 6,
    title: "Refer & Earn",
    category: "Rewards",
    type: "Feature",
    page: "refer",
  },
  {
    id: 7,
    title: "Wallet & Earnings",
    category: "Account",
    type: "Feature",
    page: "wallet",
  },
];

function Topbar({
  onMenuClick,
  activePage = "watch-ads",
  onNavigate,
  lifetimeEarnings = 12450,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const currentTitle =
    pageTitles[activePage] || "Watch Ads";

  const formattedBalance = Number(
    lifetimeEarnings || 0
  ).toLocaleString("en-IN");

  const handleNavigate = (page) => {
    onNavigate?.(page);
    setSearchValue("");
    setShowSuggestions(false);
  };

  const filteredSuggestions = searchSuggestions.filter(
    (item) => {
      const query = searchValue.trim().toLowerCase();

      if (!query) return false;

      return (
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    }
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSuggestionClick = (item) => {
    handleNavigate(item.page);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearchValue("");
      setShowSuggestions(false);
      return;
    }

    if (
      event.key === "Enter" &&
      filteredSuggestions.length > 0
    ) {
      handleSuggestionClick(
        filteredSuggestions[0]
      );
    }
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setShowSuggestions(searchInputRef.current?.value.trim().length > 0);
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <header className="topbar">
      {/* LEFT */}

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

        <div
          className="searchWrapper"
          ref={searchRef}
        >
          <div
            className={`searchBox ${
              showSuggestions
                ? "searchBoxActive"
                : ""
            }`}
          >
            <Search
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <input
              ref={searchInputRef}
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchValue.trim()) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search ads, offers..."
              aria-label="Search ads and offers"
              aria-expanded={showSuggestions}
              aria-autocomplete="list"
              autoComplete="off"
            />

            {searchValue ? (
              <button
                type="button"
                className="searchClear"
                onClick={() => {
                  setSearchValue("");
                  setShowSuggestions(false);
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            ) : (
              <kbd aria-hidden="true">
                ⌘ K
              </kbd>
            )}
          </div>

          {showSuggestions && (
            <div
              className="searchSuggestions"
              role="listbox"
              aria-label="Search suggestions"
            >
              {filteredSuggestions.length > 0 ? (
                <>
                  <div className="suggestionsHeader">
                    <span>Suggestions</span>

                    <small>
                      {filteredSuggestions.length}{" "}
                      result
                      {filteredSuggestions.length !== 1
                        ? "s"
                        : ""}
                    </small>
                  </div>

                  {filteredSuggestions
                    .slice(0, 6)
                    .map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        className="suggestionItem"
                        onClick={() =>
                          handleSuggestionClick(item)
                        }
                        role="option"
                      >
                        <span className="suggestionIcon">
                          <Search
                            size={15}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="suggestionContent">
                          <strong>
                            {item.title}
                          </strong>

                          <small>
                            {item.category}
                            <span>•</span>
                            {item.type}
                          </small>
                        </span>

                        <ArrowUpRight
                          className="suggestionArrow"
                          size={15}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                </>
              ) : (
                <div className="searchEmpty">
                  <span className="searchEmptyIcon">
                    <Search
                      size={18}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </span>

                  <strong>
                    No results found
                  </strong>

                  <small>
                    Try another keyword
                  </small>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}

      <div className="topbarRight">
        {/* BALANCE */}

        <div
          className="balancePill"
          aria-label={`Available balance: ${formattedBalance} VEs`}
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
            <span>Available Balance</span>

            <strong>
              {formattedBalance}
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