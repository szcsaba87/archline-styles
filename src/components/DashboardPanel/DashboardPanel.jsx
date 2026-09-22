import { LayoutGrid, Grid3x3, Layers } from "lucide-react";
import BrowserPanel from "../BrowserPanel/BrowserPanel";
import { dashboardPinnedTreeData, dashboardDisciplines } from "../../data/dashboardTreeData";
import { dashboardMenuItems, dashboardFolderMenuItems } from "../../data/dashboardMenuItems";
import { dashboardSampleSearchItems } from "../../data/dashboardSampleSearchItems";

// Maps the string icon names used in dashboardTreeData.js's `dashboardDisciplines`
// array to actual icon components.
const DASHBOARD_DISCIPLINE_ICONS = { LayoutGrid, Grid3x3, Layers };

// The Design Center panel (displayed title — internal identifiers still say
// "Dashboard" since that was the original working name): same shared
// BrowserPanel engine as Styles, fed with its own independent sample data
// instead. Works completely independently of the Styles panel — separate
// component instance, separate state.
export default function DashboardPanel() {
  return (
    <BrowserPanel
      panelTitle="Design Center"
      pinnedTreeData={dashboardPinnedTreeData}
      disciplines={dashboardDisciplines}
      disciplineIcons={DASHBOARD_DISCIPLINE_ICONS}
      menuItems={dashboardMenuItems}
      folderMenuItems={dashboardFolderMenuItems}
      sampleSearchItems={dashboardSampleSearchItems}
      defaultDisciplineId="dash-group1"
      defaultCategoryId="dash-group1-cat1"
      defaultItemId="dash-group1-cat1-item1"
    />
  );
}
