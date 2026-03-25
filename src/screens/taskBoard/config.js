export const PRIORITY_CONFIG = {
  High: { color: "#ff4d6d", bg: "rgba(255,77,109,0.15)", dot: "#ff4d6d" },
  Medium: { color: "#f4a261", bg: "rgba(244,162,97,0.15)", dot: "#f4a261" },
  Low: { color: "#2ec4b6", bg: "rgba(46,196,182,0.15)", dot: "#2ec4b6" },
};

export const COLUMN_CONFIG = {
  todo: {
    title: "To Do",
    emoji: "⏳",
    statusLabel: "Pending",
    accent: "#f4a261",
    glow: "rgba(244,162,97,0.2)",
    border: "rgba(244,162,97,0.3)",
    headerBg: "rgba(244,162,97,0.08)",
  },
  progress: {
    title: "In Progress",
    emoji: "🚧",
    statusLabel: "In Progress",
    accent: "#4cc9f0",
    glow: "rgba(76,201,240,0.2)",
    border: "rgba(76,201,240,0.3)",
    headerBg: "rgba(76,201,240,0.08)",
  },
  done: {
    title: "Completed",
    emoji: "✅",
    statusLabel: "Completed",
    accent: "#2ec4b6",
    glow: "rgba(46,196,182,0.2)",
    border: "rgba(46,196,182,0.3)",
    headerBg: "rgba(46,196,182,0.08)",
  },
};