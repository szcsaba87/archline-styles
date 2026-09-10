import { ChevronDown, ChevronRight, Clock, Star } from "lucide-react";
import "./TreeNode.css";

// Maps the string icon names used in treeData.js to actual icon components.
// Only a couple of nodes (Recent, Favourites) use this for now.
const ICONS = { Clock, Star };

export default function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
  expandedIds,
  onToggle,
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const Icon = node.icon ? ICONS[node.icon] : null;

  return (
    <div> 
      <div
        className={`tree-node-row ${isSelected ? "tree-node-row--selected" : ""}`}
        style={{ paddingLeft: Math.max(0, 8 + depth * 16) }}
        onClick={() => onSelect(node.id)}
      >
        <span
          className="tree-node-toggle"
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(node.id);
          }}
        >
          {node.pinned ? (
            Icon && <Icon size={13} />
          ) : hasChildren ? (
            isExpanded ? (
              <ChevronDown size={12} />
            ) : (
              <ChevronRight size={12} />
            )
          ) : null}
        </span>
        <span
          className={`tree-node-label ${
            node.count === 0 ? "tree-node-label--empty" : ""
          } ${node.pinned ? "tree-node-label--pinned" : ""}`}
        >
          {node.label}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
