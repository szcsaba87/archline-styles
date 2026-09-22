import { sampleTreeData } from "./sampleTreeData";

// Each leaf category can hold "items" — the thumbnails shown in the right
// pane. Real product data would come from the CAD engine; here each item
// just points at a placeholder image, with a two-line caption underneath.

// Recent and Favourites are independent of the category tree — rendered in
// their own loop, not part of treeData.map().
export const pinnedTreeData = [
  { id: "recent", label: "Recent", count: 0, children: [], icon: "Clock", pinned: true },
  { id: "favourites", label: "Favourites", count: 0, children: [], icon: "Star", pinned: true },
];

export const treeData = [
  {
    id: "wall",
    label: "Wall",
    count: 9,
    expanded: true,
    children: [
      { id: "wall-composite", label: "Composite", count: 41 },
      { id: "wall-framed", label: "Framed construction", count: 1 },
    ],
    items: [
      { id: "w1", lines: ["1 layered", "06 wide wall"], styleKind: "factory" },
      { id: "w2", lines: ["1 layered", "08 wide wall"], styleKind: "user" },
      { id: "w3", lines: ["1 layered", "10 wide wall"], styleKind: "project" },
      { id: "w4", lines: ["1 layered", "12 wide composite"], styleKind: "factory" },
      { id: "w5", lines: ["1 layered", "25 wide composite"], styleKind: "user" },
      { id: "w6", lines: ["1 layered", "25 wide wall"], styleKind: "project" },
      { id: "w7", lines: ["1 layered", "30 wide wall"], styleKind: "factory" },
      { id: "w8", lines: ["1 layered", "38 wide wall"], selected: true, styleKind: "user" },
      { id: "w9", lines: ["Wall U Profile", "file"], styleKind: "project" },
    ],
  },
  { id: "door", label: "Door", count: 8, children: [] },
  {
    id: "window",
    label: "Window",
    count: 6,
    children: [
      { id: "window-fixed", label: "Fixed", count: 2 },
      { id: "window-casement", label: "Casement", count: 2 },
      { id: "window-sliding", label: "Sliding", count: 2 },
    ],
  },
  { id: "curtain", label: "Curtain wall", count: 4, children: [] },
  {
    id: "slab",
    label: "Slab",
    count: 19,
    children: [
      { id: "slab-composite", label: "Composite", count: 12 },
      { id: "slab-concrete", label: "Concrete", count: 5 },
      { id: "slab-timber", label: "Timber", count: 2 },
    ],
  },
  {
    id: "column",
    label: "Column",
    count: 8,
    children: [
      { id: "column-concrete", label: "Concrete", count: 4 },
      { id: "column-steel", label: "Steel", count: 3 },
      { id: "column-timber", label: "Timber", count: 1 },
    ],
  },
  { id: "beam", label: "Beam", count: 1, children: [] },
  { id: "roof", label: "Roof", count: 4, children: [] },
  { id: "stair", label: "Stair", count: 7, children: [] },
  { id: "ramp", label: "Ramp", count: 4, children: [] },
  { id: "railing", label: "Railing", count: 16, children: [] },
  { id: "room", label: "Room and area", count: 9, children: [] },
  { id: "truss", label: "Truss", count: 1, children: [] },
  { id: "surveyed", label: "Surveyed room", count: 1, children: [] },
  { id: "pointcloud", label: "Point cloud", count: 0, children: [] },
  { id: "freeform", label: "Freeform Surface", count: 1, children: [] },
  { id: "spacezone", label: "Space Zone", count: 0, children: [] },
  { id: "revcloud", label: "Revision cloud", count: 2, children: [] },
  { id: "grid", label: "Grid", count: 2, children: [] },
  { id: "niche", label: "Niche", count: 3, children: [] },
  { id: "stairstringer", label: "Stair stringer", count: 9, children: [] },
];

// One level above the category tree: Architecture / Structure / MEP.
// Architecture's children are the existing Wall/Door/... category tree above.
// Structure and MEP have no subcategories — just 8 flat placeholder items.
export const disciplines = [
  {
    id: "architecture",
    label: "Architecture",
    icon: "Building2",
    children: treeData,
  },
  {
    id: "structure",
    label: "Structure",
    icon: "Boxes",
    children: sampleTreeData,
  },
  {
    id: "mep",
    label: "MEP",
    icon: "Zap",
    children: sampleTreeData,
  },
];
