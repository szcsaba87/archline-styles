// Shown in the tree pane whenever the discipline selector is set to
// something other than "Architecture" (Structure, MEP). Swap this out for
// real per-discipline data later — for now it's just a generic stand-in.

export const sampleTreeData = [
  {
    id: "sample-category-1",
    label: "Category 1",
    count: 3,
    expanded: true,
    children: [
      { id: "sample-cat-1-1", label: "Subcategory 1", count: 1 },
      { id: "sample-cat-1-2", label: "Subcategory 2", count: 1 },
      { id: "sample-cat-1-3", label: "Subcategory 3", count: 1 },
    ],
    items: [
      { id: "cat1-s1", lines: ["Sample", "Item 1"], color: "e5e5e5", styleKind: "factory" },
      { id: "cat1-s2", lines: ["Sample", "Item 2"], color: "e5e5e5", styleKind: "user" },
      { id: "cat1-s3", lines: ["Sample", "Item 3"], color: "e5e5e5", styleKind: "project" },
    ],
  },
  {
    id: "sample-category-2",
    label: "Category 2",
    count: 3,
    expanded: true,
    children: [
      { id: "sample-cat-2-1", label: "Subcategory 1", count: 1 },
      { id: "sample-cat-2-2", label: "Subcategory 2", count: 1 },
      { id: "sample-cat-2-3", label: "Subcategory 3", count: 1 },
    ],
    items: [
      { id: "cat2-s1", lines: ["Sample", "Item 1"], color: "e5e5e5", styleKind: "factory" },
      { id: "cat2-s2", lines: ["Sample", "Item 2"], color: "e5e5e5", styleKind: "user" },
      { id: "cat2-s3", lines: ["Sample", "Item 3"], color: "e5e5e5", styleKind: "project" },
    ],
  },
  {
    id: "sample-category-3",
    label: "Category 3",
    count: 3,
    expanded: true,
    children: [
      { id: "sample-cat-3-1", label: "Subcategory 1", count: 1 },
      { id: "sample-cat-3-2", label: "Subcategory 2", count: 1 },
      { id: "sample-cat-3-3", label: "Subcategory 3", count: 1 },
    ],
    items: [
      { id: "cat3-s1", lines: ["Sample", "Item 1"], color: "e5e5e5", styleKind: "factory" },
      { id: "cat3-s2", lines: ["Sample", "Item 2"], color: "e5e5e5", styleKind: "user" },
      { id: "cat3-s3", lines: ["Sample", "Item 3"], color: "e5e5e5", styleKind: "project" },
    ],
  },
];
