import StylesPanel from "./components/StylesPanel/StylesPanel";
import DashboardPanel from "./components/DashboardPanel/DashboardPanel";
import NotesPanel from "./components/NotesPanel/NotesPanel";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <div className="app">
        <div className="app__top-row">
          <StylesPanel />
          <DashboardPanel />
        </div>
        <NotesPanel />
      </div>
    </div>
  );
}
