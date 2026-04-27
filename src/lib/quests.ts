export type PostedQuest = {
  id: string;
  title: string;
  category: string;
  reward: number;
  currency: "SOL" | "USDC";
  deadline: string;
  description: string;
  postedBy: string;
  createdAt: number;
};

const KEY = "mckwork:posted-quests";

export function getPostedQuests(): PostedQuest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PostedQuest[]) : [];
  } catch {
    return [];
  }
}

export function savePostedQuest(q: PostedQuest) {
  const all = getPostedQuests();
  all.unshift(q);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}
