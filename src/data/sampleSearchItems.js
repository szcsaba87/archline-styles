// Shown in the grid when the search icon is clicked, in place of whatever
// category was active — a stand-in "search results" set for now.
const STYLE_KIND_CYCLE = ["factory", "user", "project"];

export const sampleSearchItems = Array.from({ length: 9 }, (_, i) => ({
  id: `search-sample-${i + 1}`,
  lines: ["Sample", `Item ${i + 1}`],
  styleKind: STYLE_KIND_CYCLE[i % STYLE_KIND_CYCLE.length],
}));
