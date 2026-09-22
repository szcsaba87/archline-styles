// Sample data powering the Dashboard panel's tree + grid — mirrors the
// shape of treeData.js's `disciplines` (Group -> Category -> Subcategory,
// with items at the Category level) but with fully generic placeholder
// content, since Dashboard's real data model doesn't exist yet.
//
// Every id is built from its group + category, so ids stay unique across
// groups even though the labels repeat (Category 1 appears in every group).

const STYLE_KIND_CYCLE = ["factory", "user", "project"];

function makeCategory(groupId, catIndex) {
  const catId = `${groupId}-cat${catIndex}`;
  return {
    id: catId,
    label: `Category ${catIndex}`,
    count: 3,
    children: [1, 2, 3].map((subIndex) => ({
      id: `${catId}-sub${subIndex}`,
      label: `Subcategory ${subIndex}`,
      count: 1,
    })),
    items: [1, 2, 3].map((itemIndex) => ({
      id: `${catId}-item${itemIndex}`,
      lines: ["Sample", `Item ${itemIndex}`],
      styleKind: STYLE_KIND_CYCLE[(itemIndex - 1) % STYLE_KIND_CYCLE.length],
    })),
  };
}

function makeGroup(groupIndex, icon) {
  const groupId = `dash-group${groupIndex}`;
  return {
    id: groupId,
    label: `Group ${groupIndex}`,
    icon,
    children: [1, 2, 3].map((catIndex) => makeCategory(groupId, catIndex)),
  };
}

// Recent / Favourites — same generic pinned rows as the Styles panel.
export const dashboardPinnedTreeData = [
  { id: "dash-recent", label: "Recent", count: 0, children: [], icon: "Clock", pinned: true },
  { id: "dash-favourites", label: "Favourites", count: 0, children: [], icon: "Star", pinned: true },
];

// The top-level switcher (Dashboard's equivalent of Architecture/Structure/MEP).
export const dashboardDisciplines = [
  makeGroup(1, "LayoutGrid"),
  makeGroup(2, "Grid3x3"),
  makeGroup(3, "Layers"),
];
