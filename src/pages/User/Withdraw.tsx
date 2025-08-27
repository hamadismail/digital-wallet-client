// import { useWithdrawMutation } from "@/redux/features/user/user.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Banknote,
  Smartphone,
  Shield,
  ArrowDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useUserOverviewQuery,
  useWithdrawMutation,
} from "@/redux/features/user/user.api";
// import { useUserWalletQuery } from "@/redux/features/user/user.api";

const withdrawSchema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .min(1, "Withdrawal amount must be at least 1")
    .max(50000, "Maximum withdrawal amount is 50,000"),
  method: z.string().min(1, "Please select a withdrawal method"),
  accountNumber: z.string().optional(),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export default function Withdraw() {
  const [withdraw, { isLoading, isSuccess }] = useWithdrawMutation();
  const {
    data: walletData,
    isLoading: walletLoading,
    refetch,
  } = useUserOverviewQuery(undefined);
  const cashInAmount = walletData?.data?.cashIn?.amount;
  const sendAmount = walletData?.data?.send?.amount;
  const withdrawAmount = walletData?.data?.withdraw?.amount;

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      method: "",
      accountNumber: "",
    },
  });

  const watchedAmount = form.watch("amount");
  const currentBalance = cashInAmount - (sendAmount + withdrawAmount);
  const isInsufficient = watchedAmount > currentBalance;

  const onSubmit = async (data: WithdrawFormValues) => {
    if (data.amount > currentBalance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      await withdraw({ amount: data.amount }).unwrap();
      toast.success("Withdrawal successful!");
      form.reset();
      refetch(); // Refresh wallet balance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process withdrawal");
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const withdrawalMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Banknote className="h-5 w-5" />,
      description: "Transfer to your bank account",
      fee: "15 ৳",
      processing: "1-2 business days",
      requiresAccount: true,
    },
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: <Smartphone className="h-5 w-5" />,
      description: "bKash, Nagad, Rocket",
      fee: "10 ৳",
      processing: "Instant",
      requiresAccount: true,
    },
    {
      id: "agent",
      name: "Agent Cashout",
      icon: <Wallet className="h-5 w-5" />,
      description: "Collect cash from nearby agent",
      fee: "5 ৳",
      processing: "Instant",
      requiresAccount: false,
    },
  ];

  const selectedMethod = withdrawalMethods.find(
    (method) => method.id === form.watch("method")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <ArrowDown className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Withdraw Money
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transfer funds from your wallet to your preferred account
          </p>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Withdraw Form Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Withdrawal Details</CardTitle>
              <CardDescription>
                Enter the amount you want to withdraw
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Balance Display */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Balance:</span>
                  {walletLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="text-2xl font-bold text-green-600">
                      ৳ {currentBalance.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Withdrawal Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your funds will be processed according to your selected
                    method.
                  </p>
                  <Button
                    onClick={() => {
                      form.reset();
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    Make Another Withdrawal
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Amount Input */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (৳)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="text-lg py-6 pl-12 pr-4"
                                {...field}
                                value={field.value === 0 ? "" : field.value}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <span className="text-gray-500 text-lg">৳</span>
                              </div>
                            </div>
                          </FormControl>
                          {isInsufficient && (
                            <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                              <AlertCircle className="h-4 w-4" />
                              Insufficient balance
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Quick Amount Buttons */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Quick select</p>
                      <div className="flex flex-wrap gap-2">
                        {quickAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="rounded-lg"
                            onClick={() => form.setValue("amount", amount)}
                            disabled={amount > currentBalance}
                          >
                            ৳ {amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Withdrawal Method */}
                    <FormField
                      control={form.control}
                      name="method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Withdrawal Method</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select withdrawal method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {withdrawalMethods.map((method) => (
                                <SelectItem key={method.id} value={method.id}>
                                  <div className="flex items-center gap-3">
                                    {method.icon}
                                    <div>
                                      <p className="font-medium">
                                        {method.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {method.description}
                                      </p>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Account Number (if required) */}
                    {selectedMethod?.requiresAccount && (
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {selectedMethod.id === "bank"
                                ? "Bank Account Number"
                                : "Mobile Number"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={
                                  selectedMethod.id === "bank"
                                    ? "Enter your account number"
                                    : "Enter your mobile number"
                                }
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Fee and Net Amount */}
                    {watchedAmount > 0 && selectedMethod && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Withdrawal amount:</span>
                            <span className="font-medium">
                              ৳ {watchedAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing fee:</span>
                            <span className="font-medium text-red-600">
                              - {selectedMethod.fee}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-blue-200 pt-2">
                            <span className="font-semibold">
                              You'll receive:
                            </span>
                            <span className="font-bold text-green-600">
                              ৳{" "}
                              {(
                                watchedAmount - parseInt(selectedMethod.fee)
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full py-6 text-lg font-semibold"
                      disabled={isLoading || isInsufficient || walletLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-5 w-5 mr-2" />
                          Withdraw Now
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* Security Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-800">
                    Secure Withdrawals
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Encrypted transaction processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Instant confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    24/7 transaction monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Withdrawal Methods Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Withdrawal Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {withdrawalMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {method.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Fee: {method.fee}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {method.processing}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Limits Info */}
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-800 text-lg">
                  Withdrawal Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-amber-700">
                  <div className="flex justify-between">
                    <span>Minimum withdrawal:</span>
                    <span className="font-medium">৳ 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum per transaction:</span>
                    <span className="font-medium">৳ 50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily limit:</span>
                    <span className="font-medium">৳ 100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly limit:</span>
                    <span className="font-medium">৳ 500,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
