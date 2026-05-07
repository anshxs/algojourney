import LeetCodeProfile from "../../components/leetcode/LeetCodeProfile";

export default async function ProfilePage({ searchParams }) {
  const params = await searchParams;
  const leetcode = params.leetcode || "";
  const codeforces = params.codeforces || "";

  return (
    <LeetCodeProfile leetcode={leetcode} codeforces={codeforces} />
  );
}