import { useDepositMutation } from "@/redux/features/user/user.api";
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
  // Wallet,
  CreditCard,
  Banknote,
  Smartphone,
  Shield,
  Zap,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const depositSchema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .min(1, "Deposit amount must be at least 1")
    .max(100000, "Maximum deposit amount is 100,000"),
  method: z.string().min(1, "Please select a deposit method"),
});

type DepositFormValues = z.infer<typeof depositSchema>;

export default function Deposit() {
  const [deposit, { isLoading, isSuccess }] = useDepositMutation();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0,
      method: "",
    },
  });

  const onSubmit = async (data: DepositFormValues) => {
    try {
      await deposit({ amount: data.amount }).unwrap();
      toast.success("Deposit successful!");
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process deposit");
    }
  };

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const paymentMethods = [
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Banknote className="h-5 w-5" />,
      description: "Transfer from your bank account",
      fee: "Free",
      processing: "1-2 business days",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Instant deposit with card",
      fee: "1.5%",
      processing: "Instant",
    },
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: <Smartphone className="h-5 w-5" />,
      description: "bKash, Nagad, Rocket",
      fee: "0.8%",
      processing: "Instant",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Wallet className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Money to Wallet
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Securely deposit funds using your preferred payment method
          </p>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Deposit Form Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Deposit Amount</CardTitle>
              <CardDescription>
                Enter the amount you want to add
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Deposit Successful!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your funds have been added to your wallet successfully.
                  </p>
                  <Button
                    onClick={() => {
                      form.reset();
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    Make Another Deposit
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
                          >
                            ৳ {amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <FormField
                      control={form.control}
                      name="method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethods.map((method) => (
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

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full py-6 text-lg font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Deposit Now
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
                    Secure Transactions
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Bank-level encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    PCI DSS compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    24/7 fraud monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment Methods Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
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
                  Deposit Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-amber-700">
                  <div className="flex justify-between">
                    <span>Minimum deposit:</span>
                    <span className="font-medium">৳ 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum deposit:</span>
                    <span className="font-medium">৳ 100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily limit:</span>
                    <span className="font-medium">৳ 50,000</span>
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
