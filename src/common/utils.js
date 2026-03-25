export const mapStatus = (status) => {
  switch (status) {
    case "Pending":
      return "todo";
    case "In Progress":
      return "progress";
    case "Completed":
      return "done";
    default:
      return "todo";
  }
};

export const reverseMapStatus = (status) => {
  switch (status) {
    case "todo":
      return "Pending";
    case "progress":
      return "In Progress";
    case "done":
      return "Completed";
    default:
      return "Pending";
  }
};
