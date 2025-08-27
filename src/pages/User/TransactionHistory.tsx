import { useState } from "react";
import { useUserOverviewQuery } from "@/redux/features/user/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Wallet,
  ArrowUp,
  ArrowDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { ITransaction } from "@/types";

type TransactionType = "all" | "deposit" | "transfer" | "withdraw";

export default function TransactionHistory() {
  const { data, isLoading, isError } = useUserOverviewQuery(undefined);
  const { send, withdraw, cashIn } = data?.data || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [filterType, setFilterType] = useState<TransactionType>("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Combine all transactions
  const allTransactions = [
    ...cashIn.transactions.map((t: ITransaction) => ({
      ...t,
      type: "deposit" as const,
    })),
    ...send.transactions.map((t: ITransaction) => ({
      ...t,
      type: "transfer" as const,
    })),
    ...withdraw.transactions.map((t: ITransaction) => ({
      ...t,
      type: "withdraw" as const,
    })),
  ].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  // Filter transactions based on type and search query
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      transaction.amount.toString().includes(searchQuery) ||
      (transaction.type === "transfer" &&
        "To: User".toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <Wallet className="h-4 w-4 text-green-600" />;
      case "transfer":
        return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case "withdraw":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Wallet className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-green-600";
      case "transfer":
        return "text-red-600";
      case "withdraw":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTransactionPrefix = (type: string) => {
    return type === "deposit" ? "+" : "-";
  };

  const getTransactionDescription = (type: string, index: number) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "transfer":
        return `To: User ${index + 1}`;
      case "withdraw":
        return "Cash Withdrawal";
      default:
        return "Transaction";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMinutes > 0)
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header with Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Transaction History
          </h2>
          <p className="text-gray-600">
            View and manage your transaction history
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Type Filter */}
          <Select
            value={filterType}
            onValueChange={(value: string) => {
              setFilterType(value as TransactionType);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="transfer">Transfers</SelectItem>
              <SelectItem value="withdraw">Withdrawals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Type Filter Tabs */}
      <Tabs
        value={filterType}
        onValueChange={(value: string) => {
          setFilterType(value as TransactionType);
          setCurrentPage(1);
        }}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="deposit">Deposits</TabsTrigger>
          <TabsTrigger value="transfer">Transfers</TabsTrigger>
          <TabsTrigger value="withdraw">Withdrawals</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Transaction Count Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposits
            </CardTitle>
            <Wallet className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {cashIn.count}
            </div>
            <p className="text-xs text-green-700">
              ৳ {cashIn.amount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transfers
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{send.count}</div>
            <p className="text-xs text-blue-700">
              ৳ {send.amount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawals
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {withdraw.count}
            </div>
            <p className="text-xs text-red-700">
              ৳ {withdraw.amount.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          <Badge variant="outline">
            {filteredTransactions.length} transactions found
          </Badge>
        </CardHeader>
        <CardContent>
          {currentTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No transactions found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {getTransactionDescription(transaction.type, index)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    {getTransactionPrefix(transaction.type)}৳{" "}
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
