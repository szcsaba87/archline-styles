// Shown in the tree pane whenever the discipline selector is set to
// something other than "Architecture" (Structure, MEP). Swap this out for
// real per-discipline data later — for now it's just a generic stand-in.

export const sampleTreeData = [
  {
    id: "sample-items",
    label: "Sample Items (Categories)",
    count: 3,
    expanded: true,
    children: [
      { id: "sample-cat-1", label: "Category 1", count: 1 },
      { id: "sample-cat-2", label: "Category 2", count: 1 },
      { id: "sample-cat-3", label: "Category 3", count: 1 },
    ],
    items: [
      { id: "s1", lines: ["Sample", "Item 1"], color: "e5e5e5" },
      { id: "s2", lines: ["Sample", "Item 2"], color: "e5e5e5" },
      { id: "s3", lines: ["Sample", "Item 3"], color: "e5e5e5" },
    ],
  },
];
