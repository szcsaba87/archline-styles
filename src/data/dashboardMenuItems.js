// Sample context menu commands for the Dashboard panel — generic
// placeholders standing in for whatever Dashboard's real actions turn out
// to be. Icon names must exist in ContextMenu.jsx's ICONS map.

export const dashboardMenuItems = [
  { id: "command-1", label: "Command 1", icon: "Star", color: "#4a4a4a" },
  { id: "command-2", label: "Command 2", icon: "Pencil", color: "#4a4a4a" },
  { id: "command-3", label: "Command 3", icon: "Copy", color: "#4a4a4a" },
  { id: "command-4", label: "Command 4", icon: "ArrowRightCircle", color: "#4a4a4a" },
  { id: "command-5", label: "Command 5", icon: "Files", color: "#4a4a4a" },
  {
    id: "command-6",
    label: "Command 6",
    icon: "RefreshCw",
    color: "#ffffff",
    variant: "badge",
    badgeColor: "#3f7fac",
  },
  { id: "command-7", label: "Command 7", icon: "ThumbsUp", color: "#4a4a4a" },
];

// Shown when clicking the toolbar's gear icon.
export const dashboardFolderMenuItems = [
  { id: "folder-command-1", label: "Folder Command 1", icon: "FolderOutput", color: "#4a4a4a" },
  { id: "folder-command-2", label: "Folder Command 2", icon: "FileInput", color: "#4a4a4a" },
];
