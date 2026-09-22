import "./NotesPanel.css";

// Plain notes section underneath the Styles / Design Center panels —
// describes the reasoning behind their design. Deliberately has no panel
// chrome (border, title bar, pin/close icons): it's not meant to look like
// a third instance of the same UI, just a text block.
export default function NotesPanel() {
  return (
    <div className="notes-panel">
      <h2 className="notes-panel__heading">Notes</h2>

      <section className="notes-panel__section">
        <h3>Major changes — Styles panel</h3>
        <ul>
          <li>
            Items can be displayed in compact, list, or grid view — see the
            toggle button in the top-right.
          </li>
          <li>
            Commands for manipulating all or multiple items (bulk actions)
            are available via the gear icon in the top-right.
          </li>
          <li>
            Commands for manipulating a single item are available via the
            pencil icon shown on hover (alternative: right-click).
          </li>
          <li>The group selector (Architecture, ...) has been repositioned.</li>
          <li>The "Recent" group has been repositioned.</li>
          <li>
            A new "Favourites" group has been added (new function — not a
            high priority for me).
          </li>
          <li>The search bar can now search across all subcategories.</li>
          <li>More padding.</li>
          <li>Narrower scrollbars.</li>
        </ul>
      </section>

      <section className="notes-panel__section">
        <h3>Bulk actions (gear icon)</h3>
        <ul>
          <li>No change: "Export Styles" / "Import Styles".</li>
          <li>
            The "List View" toggle was removed from here — a new dedicated
            button now toggles the display mode instead.
          </li>
        </ul>
      </section>

      <section className="notes-panel__section">
        <h3>Single actions (pencil icon)</h3>
        <ul>
          <li>
            No change: "Create Similar", "Properties", "Make a copy",
            "Update all instances".
          </li>
          <li>
            Needs further study: "Replace", "New default style for other
            projects", "Replace another style with this".
          </li>
          <li>
            No change (only project styles): "Delete", "Rename / Sort in Categories"
          </li>
          <li>
            Needs further study (only project styles): "Move to Style package: My", "Upload content to ArchLine.XP Warehouse"
          </li>
          <li>New: "Add to Favourites".</li>
          <li>
            To remove: "Activate" (selecting an item will make it active
            automatically).
          </li>
          <li>
            To remove: "Add to Dashboard" (use Recent/Favourites instead).
          </li>
          <li>To remove: "Change picture material" (unnecessary function).</li>
        </ul>
      </section>
    </div>
  );
}
