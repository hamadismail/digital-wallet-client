import { useUserOverviewQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { ITransaction } from "@/types";

export default function TransactionHistory() {
  const { data, isLoading, isError } = useUserOverviewQuery(undefined);
  const { send, withdraw, cashIn } = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
        <p className="text-gray-500">Loading your financial overview...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-red-500">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h2 className="text-lg font-semibold">Failed to load data</h2>
          <p className="text-sm text-gray-600 mt-1">
            Please try refreshing the page
          </p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cash In Transactions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Recent Deposits</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {cashIn.count} total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {cashIn.transactions
                .slice(0, 5)
                .map((t: ITransaction, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Wallet className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deposit</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-green-600 font-semibold">
                      +৳ {t.amount}
                    </p>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Send Transactions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Recent Transfers</CardTitle>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {send.count} total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {send.transactions
                .slice(0, 5)
                .map((t: ITransaction, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <ArrowUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">To: User {i + 1}</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <p className="text-red-600 font-semibold">-৳ {t.amount}</p>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Withdraw Transactions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Recent Withdrawals</CardTitle>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  {withdraw.count} total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {withdraw.transactions
                .slice(0, 5)
                .map((t: ITransaction, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cash Withdrawal</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <p className="text-red-600 font-semibold">-৳ {t.amount}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
