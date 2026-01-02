import type { SheetLink } from "../sheets";

type Props = {
  sheets: SheetLink[];
  activeId: string;
  onSelect: (s: SheetLink) => void;
};

export default function Sidebar({ sheets, activeId, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Google Sheets</div>

      <div className="sidebarList">
        {sheets.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              className={`navBtn ${isActive ? "active" : ""}`}
              onClick={() => onSelect(s)}
              type="button"
              title={s.id}
            >
              {s.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
