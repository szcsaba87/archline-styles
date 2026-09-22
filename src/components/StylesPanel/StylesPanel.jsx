import { Building2, Boxes, Zap } from "lucide-react";
import BrowserPanel from "../BrowserPanel/BrowserPanel";
import { pinnedTreeData, disciplines } from "../../data/treeData";
import { menuItems, folderMenuItems } from "../../data/menuItems";
import { sampleSearchItems } from "../../data/sampleSearchItems";

// Maps the string icon names used in treeData.js's `disciplines` array to
// actual icon components.
const STYLES_DISCIPLINE_ICONS = { Building2, Boxes, Zap };

// The Styles panel: a thin wrapper that feeds the shared BrowserPanel engine
// its Architecture/Structure/MEP data. See BrowserPanel.jsx for the actual
// layout, view-mode toggle, and interaction logic (shared with Dashboard).
export default function StylesPanel() {
  return (
    <BrowserPanel
      panelTitle="Styles"
      pinnedTreeData={pinnedTreeData}
      disciplines={disciplines}
      disciplineIcons={STYLES_DISCIPLINE_ICONS}
      menuItems={menuItems}
      folderMenuItems={folderMenuItems}
      sampleSearchItems={sampleSearchItems}
      defaultDisciplineId="architecture"
      defaultCategoryId="wall"
      defaultItemId="w8"
    />
  );
}
