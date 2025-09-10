import { getAllTransactions } from "@/lib/firebase/actions/user.action";
import { getAllUsers } from "@/lib/firebase/actions/user.action";
import TransactionManagementDashboard from "./_components/TransactionManagementDashboard";

export default async function TransactionsPage() {
  const transactions = await getAllTransactions({ role: "admin" });
  const users = await getAllUsers();

  if (!transactions || !Array.isArray(transactions)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Unable to load transactions</h2>
          <p className="text-muted-foreground">Please check your permissions or try again later.</p>
        </div>
      </div>
    );
  }

  // Serialize data to remove Firestore timestamp objects
  const serializedTransactions = JSON.parse(JSON.stringify(transactions));
  const serializedUsers = JSON.parse(JSON.stringify(users || []));

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <TransactionManagementDashboard 
        transactions={serializedTransactions} 
        users={serializedUsers}
      />
    </div>
  );
}