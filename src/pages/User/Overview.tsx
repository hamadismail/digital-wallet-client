import { useUserOverviewQuery } from "@/redux/features/user/user.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Wallet, ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Overview() {
  const { data, isLoading, isError } = useUserOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load summary
      </div>
    );
  }

  const { send, withdraw, cashIn } = data.data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Transaction Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cash In</CardTitle>
            <Wallet className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">৳ {cashIn.amount}</p>
            <CardDescription>{cashIn.count} deposits</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Send</CardTitle>
            <ArrowUp className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">৳ {send.amount}</p>
            <CardDescription>{send.count} transfers</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Withdraw</CardTitle>
            <ArrowDown className="h-6 w-6 text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">৳ {withdraw.amount}</p>
            <CardDescription>{withdraw.count} withdrawals</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Transactions Preview */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash In</CardTitle>
              <CardDescription>Last few deposits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {cashIn.transactions.slice(0, 5).map((t, i) => (
                <p key={i} className="text-sm text-gray-700">
                  +৳ {t.amount}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send</CardTitle>
              <CardDescription>Last few transfers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {send.transactions.slice(0, 5).map((t, i) => (
                <p key={i} className="text-sm text-gray-700">
                  -৳ {t.amount}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
              <CardDescription>Last few withdrawals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {withdraw.transactions.slice(0, 5).map((t, i) => (
                <p key={i} className="text-sm text-gray-700">
                  -৳ {t.amount}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
