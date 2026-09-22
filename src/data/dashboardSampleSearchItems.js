// Shown in the Dashboard grid when the search icon is clicked, in place of
// whatever category was active — a stand-in "search results" set for now.
const STYLE_KIND_CYCLE = ["factory", "user", "project"];

export const dashboardSampleSearchItems = Array.from({ length: 9 }, (_, i) => ({
  id: `dash-search-sample-${i + 1}`,
  lines: ["Sample", `Result ${i + 1}`],
  styleKind: STYLE_KIND_CYCLE[i % STYLE_KIND_CYCLE.length],
}));
