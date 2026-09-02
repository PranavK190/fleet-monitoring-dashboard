import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardMetrics from "../../components/dashboard/DashboardMetrics";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
      }}
    >
      <DashboardHeader />

      <div
        style={{
          display: "flex",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "320px",
            borderRight: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "40px",
          }}
        >
          <DashboardMetrics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;