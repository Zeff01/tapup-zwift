import { DashboardCards } from "./dashboard-cards";
import { DashboardChart } from "./dashboard-chart";
import { DashboardTable } from "./dashboard-table";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Social Dashboard
          </h1>
        </div>
        <DashboardCards />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <DashboardChart className="lg:col-span-4" />
          <DashboardTable className="lg:col-span-3" />
        </div>
      </main>
    </div>
  );
}
