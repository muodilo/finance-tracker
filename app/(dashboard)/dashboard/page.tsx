import { Navbar } from "@/components/navbar";
import { Metrics } from "@/components/metrics";
import { BalanceTrend } from "@/components/balance-trend";
import { RecentTransactions } from "@/components/recent-transactions";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-6">
        <Metrics />
        <BalanceTrend />
        <RecentTransactions />
      </main>
    </div>
  );
}