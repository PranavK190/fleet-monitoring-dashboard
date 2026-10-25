import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardMetrics from "../../components/dashboard/DashboardMetrics";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
        color: "#F8FAFC",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <DashboardHeader />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(230px, 270px) minmax(0, 1fr)",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            backgroundColor: "#111B2E",
            borderRight: "1px solid #26364D",
            minWidth: 0,
          }}
        >
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main
          style={{
            minWidth: 0,
            padding: "clamp(20px, 3vw, 42px)",
            boxSizing: "border-box",
            backgroundColor: "#0B1220",
          }}
        >
          <DashboardMetrics />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;