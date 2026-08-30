import {
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
  Sparkles,
} from "lucide-react";

import "./NavigationPage.scss";

const pageData = {
  dashboard: {
    title: "Your Dashboard",
    eyebrow: "OVERVIEW",
    description:
      "Track your rewards, progress and earning activity from one place.",
    icon: LayoutDashboard,
  },

  tasks: {
    title: "Tasks",
    eyebrow: "AVAILABLE TASKS",
    description:
      "Complete simple tasks and unlock additional VEs.",
    icon: ClipboardList,
  },

  offers: {
    title: "Offers",
    eyebrow: "REWARD OFFERS",
    description:
      "Explore curated offers and discover more ways to earn.",
    icon: Gift,
  },

  refer: {
    title: "Refer & Earn",
    eyebrow: "REWARDS BOOST",
    description:
      "Invite friends and earn bonus VEs together.",
    icon: Users,
  },

  wallet: {
    title: "Your Wallet",
    eyebrow: "VE BALANCE",
    description:
      "View your available balance and reward activity.",
    icon: Wallet,
  },

  withdraw: {
    title: "Withdraw",
    eyebrow: "REDEEM REWARDS",
    description:
      "Manage your reward redemption options.",
    icon: ArrowDownToLine,
  },

  history: {
    title: "Reward History",
    eyebrow: "ACTIVITY",
    description:
      "Review your completed activities and earned rewards.",
    icon: History,
  },

  profile: {
    title: "Your Profile",
    eyebrow: "ACCOUNT",
    description:
      "Manage your VELOOP profile and account information.",
    icon: UserRound,
  },

  support: {
    title: "Support Center",
    eyebrow: "HELP & SUPPORT",
    description:
      "Find assistance and answers whenever you need them.",
    icon: Headphones,
  },

  settings: {
    title: "Settings",
    eyebrow: "PREFERENCES",
    description:
      "Manage your experience and application preferences.",
    icon: Settings,
  },
};

function NavigationPage({
  page,
  onNavigate,
}) {
  const data =
    pageData[page] ||
    pageData.dashboard;

  const Icon = data.icon;

  return (
    <section className="navigationPage">
      <div className="navigationPageGlow" />

      <div className="navigationPageIcon">
        <Icon size={32} />
      </div>

      <div className="navigationPageEyebrow">
        <Sparkles size={13} />
        {data.eyebrow}
      </div>

      <h1>{data.title}</h1>

      <p>{data.description}</p>

      <div className="navigationPageCard">
        <div>
          <span>VELOOP Rewards</span>
          <strong>Coming next</strong>
        </div>

        <div className="navigationPageStatus">
          <span />
          Ready
        </div>
      </div>

      <button
        type="button"
        className="navigationBackButton"
        onClick={() =>
          onNavigate("watch-ads")
        }
      >
        Back to Watch Ads
      </button>
    </section>
  );
}

export default NavigationPage;