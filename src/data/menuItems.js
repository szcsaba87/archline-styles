// Each entry describes one row of the right-click / pencil-icon flyout menu.
// `variant: "badge"` renders the icon on a colored square (matching the
// orange "update" icons in the reference menu); the default variant just
// renders a plain colored icon.

export const menuItems = [
  { id: "add-favs", label: "Add to Favourites", icon: "Star", color: "#4a4a4a" },
  { id: "create-similar", label: "Create Similar", icon: "Pencil", color: "#4a4a4a" },
  { id: "properties", label: "Properties", icon: "Star", color: "#4a4a4a" },
  { id: "make-copy", label: "Make a copy", icon: "Copy", color: "#4a4a4a" },
  { id: "replace", label: "Replace", icon: "ArrowRightCircle", color: "#4a4a4a" },
  { id: "new-default", label: "New default style for other projects", icon: "Files", color: "#4a4a4a" },
  {
    id: "update-instances",
    label: "Update all instances",
    icon: "RefreshCw",
    color: "#ffffff",
    variant: "badge",
    badgeColor: "#e07b39",
  },
  {
    id: "replace-instance",
    label: "Replace another style to this",
    icon: "RefreshCw",
    color: "#ffffff",
    variant: "badge",
    badgeColor: "#e07b39",
  },
];

// Shown when clicking the toolbar's folder icon. Reuses the exact same
// icon + color values as the export/import rows above — no new colors.
export const folderMenuItems = [
  { id: "export-styles-folder", label: "Export Styles", icon: "FolderOutput", color: "#4a4a4a" },
  { id: "import-styles-folder", label: "Import Styles", icon: "FileInput", color: "#4a4a4a" },
];
