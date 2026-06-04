export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}
export function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  // fall back to full date for anything older than a week
  return formatDate(dateString);
}
