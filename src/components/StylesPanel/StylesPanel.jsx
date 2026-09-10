import { useRef, useState } from "react";
import {
  Search,
  Pencil,
  Folder,
  List,
  LayoutGrid,
  ChevronDown,
  ChevronsUp,
  Pin,
  X,
  Building2,
  Boxes,
  Zap,
} from "lucide-react";
import TreeNode from "../TreeNode/TreeNode";
import ContextMenu from "../ContextMenu/ContextMenu";
import { pinnedTreeData, disciplines } from "../../data/treeData";
import { menuItems, folderMenuItems } from "../../data/menuItems";
import { sampleSearchItems } from "../../data/sampleSearchItems";
import { placeholderUrl } from "../../utils/placeholder";
import "./StylesPanel.css";

// Maps the string icon names used in treeData.js's `disciplines` array to
// actual icon components.
const DISCIPLINE_ICONS = { Building2, Boxes, Zap };

export default function StylesPanel() {
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("wall");
  const [selectedItemId, setSelectedItemId] = useState("w8");
  const [expandedIds, setExpandedIds] = useState(new Set(["wall"]));
  const [itemMenu, setItemMenu] = useState(null); // { itemId, items, top, left }
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [showSearchSamples, setShowSearchSamples] = useState(false);
  const [activeDisciplineId, setActiveDisciplineId] = useState("architecture");
  const [disciplineMenuOpen, setDisciplineMenuOpen] = useState(false);
  const gridRef = useRef(null);

  function handleSearchClick() {
    setShowSearchSamples(true);
    setSelectedItemId(null); // the previously "selected: true" item loses its selection
    setSelectedCategoryId(null); // no category should read as active (blue) either
  }

  function handleCategorySelect(id) {
    setShowSearchSamples(false); // browsing a category exits the search-samples view
    setSelectedCategoryId(id);
  }

  function handleDisciplineSelect(id) {
    const next = disciplines.find((d) => d.id === id);
    if (!next) return;
    setActiveDisciplineId(id);
    setDisciplineMenuOpen(false);
    setShowSearchSamples(false);
    setSelectedItemId(null);
    if (next.children && next.children.length > 0) {
      // Architecture: default to its first category, same as the initial state
      setSelectedCategoryId(next.children[0].id);
      setExpandedIds(new Set([next.children[0].id]));
    } else {
      // Structure / MEP: no subcategories, select the discipline itself so
      // its flat "Sample" items show in the grid
      setSelectedCategoryId(next.id);
      setExpandedIds(new Set());
    }
  }

  function openContextMenu(e, items, itemId = null) {
    e.stopPropagation(); // don't also trigger the item's onClick (selection)
    const paneRect = gridRef.current.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();
    setItemMenu({
      itemId,
      items,
      top: btnRect.top,
      left: paneRect.right + 6, // flyout appears just right of the grid pane
    });
  }

  function handleMenuSelect(menuItemId) {
    // Wire up real actions here; for now this is just a stub.
    console.log("Menu action:", menuItemId, "on item:", itemMenu?.itemId);
  }

  const activeDiscipline =
    disciplines.find((d) => d.id === activeDisciplineId) || disciplines[0];
  const categoryChildren = activeDiscipline.children || [];
  const ActiveDisciplineIcon = DISCIPLINE_ICONS[activeDiscipline.icon];

  const activeCategory =
    pinnedTreeData.find((n) => n.id === selectedCategoryId) ||
    categoryChildren.find((n) => n.id === selectedCategoryId) ||
    (selectedCategoryId === activeDiscipline.id ? activeDiscipline : null) ||
    categoryChildren[0] ||
    activeDiscipline;
  const items = showSearchSamples ? sampleSearchItems : activeCategory.items || [];

  const filteredItems = showSearchSamples ? sampleSearchItems : items;

  function toggleExpand(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="styles-panel">
      {/* Title bar */}
      <div className="styles-panel__titlebar">
        <span>Styles</span>
        <div className="styles-panel__titlebar-icons">
          <Pin size={13} />
          <X size={13} />
        </div>
      </div>

      {/* Active style summary / dropdown 
      <div className="styles-panel__summary-row">
        <div className="styles-panel__summary">
          <div className="styles-panel__summary-text">
            <div className="styles-panel__summary-category">
              Architectural elements - Wall
            </div>
            <div className="styles-panel__summary-current">
              1 layered 38 wide wall
            </div>
          </div>
          <ChevronDown size={16} color="#6b6b6b" />
        </div>
      </div>*/}

      {/* Search row */}
      <div className="styles-panel__search-row">
        <div className="styles-panel__search-box">
          <input
            className="styles-panel__search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in all categories"
          />
          <Search
            size={14}
            color="#6b6b6b"
            style={{ cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        </div>
        <button
          className="styles-panel__icon-button"
          onClick={(e) => openContextMenu(e, folderMenuItems)}
          aria-label="Folder options"
        >
          <Folder size={13} color="#6b6b6b" />
        </button>
        <button
          className="styles-panel__icon-button"
          onClick={() =>
            setViewMode((mode) => (mode === "grid" ? "list" : "grid"))
          }
          aria-label="Toggle list view"
        >
          {viewMode === "grid" ? (
            <List size={13} color="#6b6b6b" />
          ) : (
            <LayoutGrid size={13} color="#6b6b6b" />
          )}
        </button>
      </div>

      {/* "Recent" collapse bar 
      <div className="styles-panel__recent-bar">
        <ChevronsUp size={12} />
        <span>Recent</span>
      </div>
    */}


      {/* Body: tree + grid */}
      <div className="styles-panel__body">
        <div className="styles-panel__tree styles-panel-scroll">
          {pinnedTreeData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedCategoryId}
              onSelect={handleCategorySelect}
              expandedIds={expandedIds}
              onToggle={toggleExpand}
            />
          ))}

          {/* Active discipline row, placed right below Favourites.
              Not a selectable category — clicking it (icon, label, or
              arrow) only opens the discipline picker. */}
          <div className="styles-panel__discipline-wrapper">
            <div
              className="tree-node-row styles-panel__discipline-row"
              style={{ paddingLeft: 8 }}
              onClick={() => setDisciplineMenuOpen((open) => !open)}
            >
              <span className="tree-node-toggle">
                {ActiveDisciplineIcon && (
                  <ActiveDisciplineIcon
                    size={13}
                    className="styles-panel__discipline-icon"
                  />
                )}
              </span>
              <span className="tree-node-label styles-panel__discipline-label">
                {activeDiscipline.label}
              </span>
              <button
                type="button"
                className="styles-panel__discipline-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setDisciplineMenuOpen((open) => !open);
                }}
                aria-label="Switch discipline"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {disciplineMenuOpen && (
              <>
                <div
                  className="discipline-dropdown-backdrop"
                  onClick={() => setDisciplineMenuOpen(false)}
                />
                <div className="styles-panel__discipline-dropdown">
                  {disciplines.map((d) => {
                    const DIcon = DISCIPLINE_ICONS[d.icon];
                    return (
                      <div
                        key={d.id}
                        className={`styles-panel__discipline-option ${
                          d.id === activeDisciplineId
                            ? "styles-panel__discipline-option--active"
                            : ""
                        }`}
                        onClick={() => handleDisciplineSelect(d.id)}
                      >
                        {DIcon && (
                          <DIcon
                            size={13}
                            className="styles-panel__discipline-option-icon"
                          />
                        )}
                        <span>{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Swapped content: only this part changes when the discipline changes */}
          {categoryChildren.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedCategoryId}
              onSelect={handleCategorySelect}
              expandedIds={expandedIds}
              onToggle={toggleExpand}
            />
          ))}
        </div>

        <div
          className={`styles-panel__grid styles-panel-scroll ${
            viewMode === "list" ? "styles-panel__grid--list" : ""
          }`}
          ref={gridRef}
        >
          {filteredItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <div
                key={item.id}
                className={`styles-panel__grid-item ${
                  viewMode === "list" ? "styles-panel__grid-item--list" : ""
                } ${isSelected ? "styles-panel__grid-item--selected" : ""}`}
                onClick={() => setSelectedItemId(item.id)}
              >
                <button
                  type="button"
                  className={`styles-panel__item-edit-btn ${
                    itemMenu?.itemId === item.id
                      ? "styles-panel__item-edit-btn--open"
                      : ""
                  }`}
                  onClick={(e) => openContextMenu(e, menuItems, item.id)}
                  aria-label="Item options"
                >
                  <Pencil size={12} color="#4a4a4a" />
                </button>
                <img
                  className="styles-panel__thumb"
                  src={placeholderUrl()}
                  alt={item.lines.join(" ")}
                  width={84}
                  height={112}
                />
                <div className="styles-panel__caption">
                  <div>{item.lines[0]}</div>
                  <div>{item.lines[1]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {itemMenu && (
        <ContextMenu
          items={itemMenu.items}
          top={itemMenu.top}
          left={itemMenu.left}
          onSelect={handleMenuSelect}
          onClose={() => setItemMenu(null)}
        />
      )}
    </div>
  );
}
