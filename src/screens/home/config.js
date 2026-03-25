export const PRIORITY_CONFIG = {
  High: { color: "#ff4d6d", bg: "rgba(255,77,109,0.15)", icon: "🔴" },
  Medium: { color: "#f4a261", bg: "rgba(244,162,97,0.15)", icon: "🟠" },
  Low: { color: "#2ec4b6", bg: "rgba(46,196,182,0.15)", icon: "🟢" },
};

export const STATUS_CONFIG = {
  Pending: { color: "#f4a261", bg: "rgba(244,162,97,0.12)" },
  "In Progress": { color: "#4cc9f0", bg: "rgba(76,201,240,0.12)" },
  Completed: { color: "#2ec4b6", bg: "rgba(46,196,182,0.12)" },
};

export const REPEAT_ICONS = {
  daily: "🔁 Daily",
  weekly: "📆 Weekly",
  monthly: "🗓 Monthly",
  none: null,
};

export const STATUS_BAR_CONFIG = (stats) => {
  return [
    { label: "Total", value: stats.total, accent: "#a78bfa" },
    { label: "Completed", value: stats.completed, accent: "#2ec4b6" },
    { label: "Pending", value: stats.pending, accent: "#f4a261" },
    { label: "In Progress", value: stats.inProgress, accent: "#b1eb3e" },
    { label: "Overdue", value: stats.overdue, accent: "#ff4d6d" },
  ];
};
