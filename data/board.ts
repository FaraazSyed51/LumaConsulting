export type BoardMember = {
  name: string;
  role: string;
  email?: string;
};

export const boardMembers: BoardMember[] = [
  { name: "Azra Narvel", role: "Co-President", email: "narvel.4@osu.edu" },
  { name: "Faraaz Syed", role: "Co-President", email: "syed.217@osu.edu" },
  { name: "Alishba Hussain", role: "Vice President" },
  { name: "Samiya Salman", role: "Treasurer" },
  { name: "Zaneb Zafar", role: "Outreach Chair" },
  { name: "Nesrin Allalen", role: "Co-Marketing Lead" },
  { name: "Zaynab Huweih", role: "Co-Marketing Lead" },
  { name: "Najma Gureye", role: "Co-Events Lead" },
  { name: "Jowhara Sharan", role: "Co-Events Lead" },
  { name: "Ahmed Bah", role: "Luma Lead" },
  { name: "Zayed Ali", role: "Luma Lead" },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
