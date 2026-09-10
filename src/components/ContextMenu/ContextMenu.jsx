import {
  List,
  Pencil,
  Star,
  Copy,
  ArrowRightCircle,
  FolderOutput,
  FileInput,
  Files,
  RefreshCw,
  ThumbsUp,
  Folder,
} from "lucide-react";
import "./ContextMenu.css";

// Maps the string names stored in menuItems.js to actual icon components,
// so the data file can stay framework-agnostic (plain strings, easy to edit).
const ICONS = {
  List,
  Pencil,
  Star,
  Copy,
  ArrowRightCircle,
  FolderOutput,
  FileInput,
  Files,
  RefreshCw,
  ThumbsUp,
  Folder,
};

export default function ContextMenu({ items, top, left, onSelect, onClose }) {
  return (
    <>
      {/* Full-screen transparent backdrop closes the menu on outside click */}
      <div className="context-menu-backdrop" onClick={onClose} />
      <div className="context-menu" style={{ top, left }}>
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div
              key={item.id}
              className="context-menu__row"
              onClick={() => {
                onSelect(item.id);
                onClose();
              }}
            >
              <span
                className={`context-menu__icon ${
                  item.variant === "badge" ? "context-menu__icon--badge" : ""
                }`}
                style={
                  item.variant === "badge"
                    ? { background: item.badgeColor }
                    : undefined
                }
              >
                <Icon size={15} color={item.color} />
              </span>
              <span className="context-menu__label">{item.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
