"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const [leetdata, setLeetData] = useState(null);
  const [codeforcesdata, setCodeforcesData] = useState(null);
  const [codefstats, setCodeFStats] = useState(null);
  const searchParams = useSearchParams();
  const leetcode = searchParams.get("leetcode");
  const codeforces = searchParams.get("codeforces");

  useEffect(() => {
    if (!leetcode) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://leetcode-api-theta.vercel.app/${leetcode}`,
        );
        const json = await res.json();
        setLeetData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [leetcode]);

  useEffect(() => {
    if (!codeforces) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://codeforces.com/api/user.info?handles=${codeforces}`,
        );
        const res2 = await fetch(
          `https://codeforces.com/api/user.status?handle=${codeforces}&from=1&count=100`,
        );
        const json = await res.json();
        const json2 = await res2.json();
        setCodeforcesData(json);
        setCodeFStats(json2);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [codeforces]);

  return (
    <div>
      <div>Leetcode: {leetcode}</div>
      <div>Codeforces: {codeforces}</div>

      <pre>{leetdata ? JSON.stringify(leetdata, null, 2) : "Loading..."}</pre>
      <pre>
        {codeforcesdata
          ? JSON.stringify(codeforcesdata, null, 2)
          : "Loading..."}
      </pre>
      <pre>
        {codefstats ? JSON.stringify(codefstats, null, 2) : "Loading..."}
      </pre>
    </div>
  );
}
