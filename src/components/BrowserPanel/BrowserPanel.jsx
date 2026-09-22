import { useRef, useState } from "react";
import {
  Search,
  Pencil,
  Settings,
  List,
  LayoutGrid,
  AlignJustify,
  ChevronDown,
  ChevronsUp,
  Pin,
  X,
} from "lucide-react";
import TreeNode from "../TreeNode/TreeNode";
import ContextMenu from "../ContextMenu/ContextMenu";
import { placeholderUrl } from "../../utils/placeholder";
import "./BrowserPanel.css";

// BrowserPanel is the shared engine behind both the Styles panel and the
// Dashboard panel: identical layout, view-mode toggle, tree/grid mechanics,
// and context-menu behavior — only the data (and a couple of default
// selections) differ per instance. See StylesPanel.jsx / DashboardPanel.jsx
// for the two thin wrappers that supply that data.
export default function BrowserPanel({
  panelTitle,
  pinnedTreeData,
  disciplines,
  disciplineIcons,
  menuItems,
  folderMenuItems,
  sampleSearchItems,
  defaultDisciplineId,
  defaultCategoryId,
  defaultItemId,
}) {
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(defaultCategoryId);
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId);
  const [expandedIds, setExpandedIds] = useState(new Set([defaultCategoryId]));
  const [itemMenu, setItemMenu] = useState(null); // { itemId, items, top, left }
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list" | "compact"
  const [showSearchSamples, setShowSearchSamples] = useState(false);
  const [activeDisciplineId, setActiveDisciplineId] = useState(defaultDisciplineId);
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
      // Default to the discipline's first category, same as the initial state
      setSelectedCategoryId(next.children[0].id);
      setExpandedIds(new Set([next.children[0].id]));
    } else {
      // No subcategories — select the discipline itself so its flat items
      // show in the grid
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
    console.log(`[${panelTitle}] Menu action:`, menuItemId, "on item:", itemMenu?.itemId);
  }

  const activeDiscipline =
    disciplines.find((d) => d.id === activeDisciplineId) || disciplines[0];
  const categoryChildren = activeDiscipline.children || [];
  const ActiveDisciplineIcon = disciplineIcons[activeDiscipline.icon];

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
    <div className="browser-panel">
      {/* Title bar */}
      <div className="browser-panel__titlebar">
        <span>{panelTitle}</span>
        <div className="browser-panel__titlebar-icons">
          <Pin size={13} />
          <X size={13} />
        </div>
      </div>

      {/* Search row */}
      <div className="browser-panel__search-row">
        <div className="browser-panel__search-box">
          <input
            className="browser-panel__search-input"
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
          className="browser-panel__icon-button"
          onClick={(e) => openContextMenu(e, folderMenuItems)}
          aria-label="Folder options"
        >
          <Settings size={13} color="#6b6b6b" />
        </button>
        <button
          className="browser-panel__icon-button"
          onClick={() =>
            setViewMode((mode) =>
              mode === "grid" ? "list" : mode === "list" ? "compact" : "grid"
            )
          }
          aria-label="Toggle view mode"
        >
          {viewMode === "grid" ? (
            <List size={13} color="#6b6b6b" />
          ) : viewMode === "list" ? (
            <AlignJustify size={13} color="#6b6b6b" />
          ) : (
            <LayoutGrid size={13} color="#6b6b6b" />
          )}
        </button>
      </div>

      {/* Body: tree + grid */}
      <div className="browser-panel__body">
        <div className="browser-panel__tree browser-panel-scroll">
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
          <div className="browser-panel__discipline-wrapper">
            <div
              className="tree-node-row browser-panel__discipline-row"
              style={{ paddingLeft: 8 }}
              onClick={() => setDisciplineMenuOpen((open) => !open)}
            >
              <span className="tree-node-toggle">
                {ActiveDisciplineIcon && (
                  <ActiveDisciplineIcon
                    size={13}
                    className="browser-panel__discipline-icon"
                  />
                )}
              </span>
              <span className="tree-node-label browser-panel__discipline-label">
                {activeDiscipline.label}
              </span>
              <button
                type="button"
                className="browser-panel__discipline-arrow"
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
                <div className="browser-panel__discipline-dropdown">
                  {disciplines.map((d) => {
                    const DIcon = disciplineIcons[d.icon];
                    return (
                      <div
                        key={d.id}
                        className={`browser-panel__discipline-option ${
                          d.id === activeDisciplineId
                            ? "browser-panel__discipline-option--active"
                            : ""
                        }`}
                        onClick={() => handleDisciplineSelect(d.id)}
                      >
                        {DIcon && (
                          <DIcon
                            size={13}
                            className="browser-panel__discipline-option-icon"
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
          className={`browser-panel__grid browser-panel-scroll ${
            viewMode === "list" ? "browser-panel__grid--list" : ""
          } ${viewMode === "compact" ? "browser-panel__grid--compact" : ""}`}
          ref={gridRef}
        >
          {filteredItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
              <div
                key={item.id}
                className={`browser-panel__grid-item ${
                  viewMode === "list" ? "browser-panel__grid-item--list" : ""
                } ${
                  viewMode === "compact" ? "browser-panel__grid-item--compact" : ""
                } ${isSelected ? "browser-panel__grid-item--selected" : ""}`}
                onClick={() => setSelectedItemId(item.id)}
              >
                <button
                  type="button"
                  className={`browser-panel__item-edit-btn ${
                    itemMenu?.itemId === item.id
                      ? "browser-panel__item-edit-btn--open"
                      : ""
                  }`}
                  onClick={(e) => openContextMenu(e, menuItems, item.id)}
                  aria-label="Item options"
                >
                  <Pencil
                    size={viewMode === "compact" ? 15 : 12}
                    color={viewMode === "compact" ? "#232323" : "#4a4a4a"}
                  />
                </button>
                {viewMode !== "compact" && (
                  <img
                    className="browser-panel__thumb"
                    src={placeholderUrl()}
                    alt={item.lines.join(" ")}
                    width={84}
                    height={112}
                  />
                )}
                <div className="browser-panel__caption">
                  <span className="browser-panel__caption-lead">
                    <span
                      className={`style-icon style-icon--${item.styleKind}`}
                      aria-hidden="true"
                    />
                    {item.lines[0]}
                  </span>{" "}
                  {item.lines[1]}
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
