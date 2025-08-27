import { useUserOverviewQuery } from "@/redux/features/user/user.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Wallet,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { ITransaction } from "@/types";

export default function Overview() {
  const { data, isLoading, isError } = useUserOverviewQuery(undefined);

  const { send, withdraw, cashIn } = data?.data || {};
  const totalTransactions = send?.count + withdraw?.count + cashIn?.count;
  const netFlow = cashIn?.amount - (send?.amount + withdraw?.amount);

  // Prepare data for pie chart
  const pieChartData = [
    { name: "Cash In", value: cashIn?.amount, color: "#10b981" },
    { name: "Send", value: send?.amount, color: "#3b82f6" },
    { name: "Withdraw", value: withdraw?.amount, color: "#ef4444" },
  ];

  const barChartData = [
    { type: "Send", amount: send?.amount, color: "#10b981" },
    { type: "Withdraw", amount: withdraw?.amount, color: "#3b82f6" },
    { type: "Cash In", amount: cashIn?.amount, color: "#ef4444" },
  ];

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Summary of your transaction history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Month
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Net Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-white">Net Balance Flow</CardTitle>
          <TrendingUp className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">৳ {netFlow.toLocaleString()}</div>
          <p className="text-blue-100 mt-1">
            {netFlow >= 0 ? "Positive" : "Negative"} cash flow this period
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {totalTransactions} total transactions
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cash In</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <Wallet className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +৳ {cashIn.amount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {cashIn.count} deposits
            </p>
            <Progress
              value={
                (cashIn.amount /
                  (cashIn.amount + send.amount + withdraw.amount)) *
                100
              }
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Money Sent</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              -৳ {send.amount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">{send.count} transfers</p>
            <Progress
              value={
                (send.amount /
                  (cashIn.amount + send.amount + withdraw.amount)) *
                100
              }
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowDown className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -৳ {withdraw.amount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {withdraw.count} withdrawals
            </p>
            <Progress
              value={
                (withdraw.amount /
                  (cashIn.amount + send.amount + withdraw.amount)) *
                100
              }
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Transaction Trends</CardTitle>
            <CardDescription>Your activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  {/* <Bar dataKey="amount" fill="#3b82f6" /> */}
                  <Bar dataKey="amount">
                    {barChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Distribution</CardTitle>
            <CardDescription>Breakdown by transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {pieChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

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
