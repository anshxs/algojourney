"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  Braces,
  Check,
  Code2,
  Flame,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Medal,
  Send,
  Share2,
  Trophy,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import CodeforcesHeader from "../codeforces/CodeforcesHeader";
import CodeforcesOverview from "../codeforces/CodeforcesOverview";
import CodeforcesRating from "../codeforces/CodeforcesRating";
import CodeforcesSubmissions from "../codeforces/CodeforcesSubmissions";
import LeetCodeActivity from "./LeetCodeActivity";
import LeetCodeBadges from "./LeetCodeBadges";
import LeetCodeContests from "./LeetCodeContests";
import LeetCodeHeader from "./LeetCodeHeader";
import LeetCodeOverview from "./LeetCodeOverview";
import LeetCodeSkills from "./LeetCodeSkills";
import LeetCodeStats from "./LeetCodeStats";
import LeetCodeSubmissions from "./LeetCodeSubmissions";
import RandomQuestionCard from "./RandomQuestionCard";

function PlatformButton({ active, disabled, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-[#ff6a3d]/50 bg-[linear-gradient(135deg,rgba(255,47,125,0.22),rgba(255,116,24,0.18))] text-white shadow-[0_0_28px_rgba(255,106,61,0.14)]"
          : "border-white/10 bg-[#181818]/90 text-zinc-300 hover:border-white/20 hover:bg-[#242424] hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function FloatingNav({ sections, activeSection, onChange }) {
  return (
    <aside className="min-w-0 lg:sticky lg:top-5 lg:h-fit">
      <Card className="flex max-w-full gap-2 overflow-x-auto border-white/10 bg-[#121212]/90 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.28)] lg:w-52 lg:flex-col lg:overflow-visible">
        {sections.map((section) => {
          const Icon = section.icon;
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onChange(section.id)}
              className={`group relative flex h-10 shrink-0 items-center gap-2 overflow-hidden rounded-lg px-3 text-sm transition duration-200 ${
                active
                  ? "bg-[linear-gradient(135deg,#f5f5f5,#dcdcdc)] text-zinc-950 shadow-[0_10px_24px_rgba(255,255,255,0.08)]"
                  : "text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {active ? <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#ff6a3d]" /> : null}
              <Icon className={`h-4 w-4 transition ${active ? "text-[#ff6a3d]" : "group-hover:text-[#ff9a6d]"}`} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </Card>
      <RandomQuestionCard />
    </aside>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <Card className="p-5">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
    </Card>
  );
}

export default function LeetCodeProfile({ leetcode, codeforces }) {
  const [leetcodeUserInfo, setLeetcodeUserInfo] = useState(null);
  const [leetcodeContests, setLeetcodeContests] = useState(null);
  const [leetcodeSubmissions, setLeetcodeSubmissions] = useState(null);
  const [leetcodeCalendar, setLeetcodeCalendar] = useState(null);
  const [leetcodeBadges, setLeetcodeBadges] = useState(null);
  const [leetcodeSkills, setLeetcodeSkills] = useState(null);
  const [isLoadingLeetCode, setIsLoadingLeetCode] = useState(false);
  const [leetCodeStatus, setLeetCodeStatus] = useState("idle");
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codeforcesStats, setCodeforcesStats] = useState(null);
  const [codeforcesRating, setCodeforcesRating] = useState(null);
  const [codeforcesStatus, setCodeforcesStatus] = useState("idle");

  useEffect(() => {
    if (!leetcode) return;

    const fetchData = async () => {
      setIsLoadingLeetCode(true);
      setLeetCodeStatus("loading");

      try {
        const userInfoRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}`);
        const userInfoJson = await userInfoRes.json();

        if (userInfoJson?.detail) {
          setLeetcodeUserInfo(userInfoJson);
          setLeetCodeStatus("not-found");
          return;
        }

        const contestsRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}/contests`);
        const contestsJson = await contestsRes.json();
        const submissionsRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}/submissions`);
        const submissionsJson = await submissionsRes.json();
        const calendarRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}/calendar`);
        const calendarJson = await calendarRes.json();
        const badgesRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}/badges`);
        const badgesJson = await badgesRes.json();
        const skillsRes = await fetch(`https://leetcode-api-pied.vercel.app/user/${leetcode}/skills`);
        const skillsJson = await skillsRes.json();

        setLeetcodeUserInfo(userInfoJson);
        setLeetcodeContests(contestsJson);
        setLeetcodeSubmissions(submissionsJson);
        setLeetcodeCalendar(calendarJson);
        setLeetcodeBadges(badgesJson);
        setLeetcodeSkills(skillsJson);
        setLeetCodeStatus("ready");
      } catch (error) {
        setLeetCodeStatus("error");
        console.error(error);
      } finally {
        setIsLoadingLeetCode(false);
      }
    };

    fetchData();
  }, [leetcode]);

  useEffect(() => {
    if (!codeforces) return;

    const fetchData = async () => {
      setCodeforcesStatus("loading");

      try {
        const infoRes = await fetch(`https://codeforces.com/api/user.info?handles=${codeforces}`);
        const infoJson = await infoRes.json();

        if (infoJson?.status !== "OK") {
          setCodeforcesData(infoJson);
          setCodeforcesStatus("not-found");
          return;
        }

        const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${codeforces}&from=1&count=100`);
        const statusJson = await statusRes.json();
        const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${codeforces}`);
        const ratingJson = await ratingRes.json();

        setCodeforcesData(infoJson);
        setCodeforcesStats(statusJson);
        setCodeforcesRating(ratingJson);
        setCodeforcesStatus("ready");
      } catch (err) {
        setCodeforcesStatus("error");
        console.error(err);
      }
    };

    fetchData();
  }, [codeforces]);

  const isLeetCodeReady =
    leetcodeUserInfo &&
    leetcodeContests &&
    leetcodeSubmissions &&
    leetcodeCalendar &&
    leetcodeBadges &&
    leetcodeSkills;
  const isCodeforcesReady = codeforcesData && codeforcesStats && codeforcesRating;
  const leetcodeAvailable = leetCodeStatus === "ready" && isLeetCodeReady;
  const codeforcesAvailable = codeforcesStatus === "ready" && isCodeforcesReady;
  const [platform, setPlatform] = useState(leetcode ? "leetcode" : "codeforces");
  const [activeSection, setActiveSection] = useState("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (platform === "leetcode" && !leetcode && codeforces) {
      setPlatform("codeforces");
    }

    if (platform === "codeforces" && !codeforces && leetcode) {
      setPlatform("leetcode");
    }
  }, [codeforces, leetcode, platform]);

  useEffect(() => {
    setActiveSection("overview");
  }, [platform]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const leetcodeSections = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-4">
          <LeetCodeHeader userInfo={leetcodeUserInfo} contestInfo={leetcodeContests} calendar={leetcodeCalendar} />
          <LeetCodeOverview userInfo={leetcodeUserInfo} contestInfo={leetcodeContests} calendar={leetcodeCalendar} />
        </div>
      ),
    },
    {
      id: "stats",
      label: "Stats",
      icon: BarChart3,
      content: <LeetCodeStats submitStats={leetcodeUserInfo?.submitStats} />,
    },
    {
      id: "contests",
      label: "Contests",
      icon: Trophy,
      content: <LeetCodeContests contestInfo={leetcodeContests} />,
    },
    {
      id: "submissions",
      label: "Submissions",
      icon: Send,
      content: <LeetCodeSubmissions submissions={leetcodeSubmissions} />,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
      content: <LeetCodeActivity calendar={leetcodeCalendar} />,
    },
    {
      id: "badges",
      label: "Badges",
      icon: Award,
      content: <LeetCodeBadges badgesInfo={leetcodeBadges} />,
    },
    {
      id: "skills",
      label: "Skills",
      icon: Braces,
      content: <LeetCodeSkills skills={leetcodeSkills} />,
    },
  ];

  const codeforcesSections = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-4">
          <CodeforcesHeader info={codeforcesData} />
          <CodeforcesOverview stats={codeforcesStats} />
        </div>
      ),
    },
    {
      id: "rating",
      label: "Rating",
      icon: Medal,
      content: <CodeforcesRating rating={codeforcesRating} />,
    },
    {
      id: "submissions",
      label: "Submissions",
      icon: ListChecks,
      content: <CodeforcesSubmissions stats={codeforcesStats} />,
    },
  ];

  const sections = platform === "leetcode" ? leetcodeSections : codeforcesSections;
  const selectedSection = sections.find((section) => section.id === activeSection) || sections[0];

  let content = null;

  if (platform === "leetcode") {
    if (!leetcode || leetCodeStatus === "not-found") {
      content = <EmptyState title="LeetCode profile not found" subtitle="Choose Codeforces above or search with a valid LeetCode handle." />;
    } else if (leetcodeAvailable) {
      content = selectedSection.content;
    } else if (isLoadingLeetCode) {
      content = <EmptyState title="Loading LeetCode..." subtitle="Fetching profile, contests, submissions, badges, activity, and skills." />;
    } else {
      content = <EmptyState title="LeetCode data not found" />;
    }
  } else if (!codeforces || codeforcesStatus === "not-found") {
    content = <EmptyState title="Codeforces profile not found" subtitle="Choose LeetCode above or search with a valid Codeforces handle." />;
  } else if (codeforcesAvailable) {
    content = selectedSection.content;
  } else if (codeforcesStatus === "loading") {
    content = <EmptyState title="Loading Codeforces..." subtitle="Fetching profile, rating history, and recent submissions." />;
  } else {
    content = <EmptyState title="Codeforces data not found" />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#090909] bg-[radial-gradient(circle_at_20%_0%,rgba(255,47,125,0.16),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,116,24,0.12),transparent_30%),linear-gradient(180deg,#090909,#101010_42%,#080808)] px-2 py-3 text-zinc-100 sm:px-5 sm:py-4">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4 flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-[#151515]/90 p-3 shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">AlgoJourney</p>
            <h1 className="mt-1 break-words text-xl font-semibold text-white">Profile dashboard</h1>
            {platform === "leetcode" && leetcodeCalendar?.streak ? (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#ff6a3d]/20 bg-[#ff6a3d]/10 px-2.5 py-1 text-xs font-medium text-[#ffb088]">
                <Flame className="h-3.5 w-3.5" />
                {leetcodeCalendar.streak} day fire streak
              </div>
            ) : null}
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            <PlatformButton
              active={platform === "leetcode"}
              disabled={!leetcode}
              icon={Code2}
              label="LeetCode"
              onClick={() => setPlatform("leetcode")}
            />
            <PlatformButton
              active={platform === "codeforces"}
              disabled={!codeforces}
              icon={GitBranch}
              label="Codeforces"
              onClick={() => setPlatform("codeforces")}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className={`col-span-2 sm:col-span-1 ${copied ? "border-[#28d17c]/30 bg-[#28d17c]/10 text-[#9ff2c4]" : ""}`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Copied" : "Share"}
            </Button>
          </div>
        </header>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <FloatingNav sections={sections} activeSection={activeSection} onChange={setActiveSection} />
          <section
            key={`${platform}-${activeSection}`}
            className="min-w-0 rounded-2xl border border-white/10 bg-[#111111]/70 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur [animation:soft-in_240ms_ease-out] sm:p-3"
          >
            {content}
          </section>
        </div>
      </div>
    </main>
  );
}
