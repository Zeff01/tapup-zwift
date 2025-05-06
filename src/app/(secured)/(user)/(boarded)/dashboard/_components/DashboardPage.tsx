import { DashboardCards } from "./dashboard-cards";
import { DashboardChart } from "./dashboard-chart";
import { DashboardTable } from "./dashboard-table";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
            Social Dashboard
          </h1>
        </div>
        <DashboardCards />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-7">
          <DashboardChart className="lg:col-span-4" />
          <DashboardTable className="lg:col-span-3" />
        </div>
      </main>
    </div>
  );
}
