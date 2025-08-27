import {
  useAllUserQuery,
  useSendMoneyMutation,
} from "@/redux/features/user/user.api";
import { useUserOverviewQuery } from "@/redux/features/user/user.api";
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
  Send,
  User,
  Shield,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Search,
  QrCode,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";
import type { IUser } from "@/types";

const sendMoneySchema = z.object({
  userId: z.string().min(1, "Please select a recipient"),
  amount: z
    .number({ message: "Amount is required" })
    .min(1, "Amount must be at least 1")
    .max(50000, "Maximum send amount is 50,000"),
  note: z.string().max(50, "Note must be less than 50 characters").optional(),
});

type SendMoneyFormValues = z.infer<typeof sendMoneySchema>;

export default function SendMoney() {
  const [sendMoney, { isLoading, isSuccess }] = useSendMoneyMutation();
  const { data: walletData, isLoading: walletLoading } =
    useUserOverviewQuery(undefined);
  const { data: userData, isLoading: userLoading } = useAllUserQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [showRecipientList, setShowRecipientList] = useState(false);

  const userInfo = userData?.data;

  const cashInAmount = walletData?.data?.cashIn?.amount;
  const sendAmount = walletData?.data?.send?.amount;
  const withdrawAmount = walletData?.data?.withdraw?.amount;

  const form = useForm<SendMoneyFormValues>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      userId: "",
      amount: 0,
    },
  });

  const watchedAmount = form.watch("amount");
  const currentBalance = cashInAmount - (sendAmount + withdrawAmount);
  const isInsufficient = watchedAmount > currentBalance;

  // Filter recipients based on search
  const filteredRecipients = userInfo?.filter(
    (recipient: IUser) =>
      recipient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async (data: SendMoneyFormValues) => {
    if (data.amount > currentBalance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      await sendMoney({
        userId: selectedRecipient?._id,
        amount: data.amount,
      }).unwrap();

      toast.success("Money sent successfully!");
      form.reset();
      setSelectedRecipient(null);
      setSearchQuery("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send money");
    }
  };

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleRecipientSelect = (recipient: IUser) => {
    setSelectedRecipient(recipient);
    form.setValue("userId", recipient?._id);
    setSearchQuery(`${recipient.name}`);
    setShowRecipientList(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quickly and securely send money to friends, family, or businesses
          </p>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Send Money Form Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Send Money</CardTitle>
              <CardDescription>Transfer funds to another user</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Balance Display */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Balance:</span>
                  {walletLoading || userLoading ? (
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
                    Money Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ৳ {watchedAmount.toLocaleString()} has been sent to{" "}
                    {selectedRecipient?.name}
                  </p>
                  <Button
                    onClick={() => {
                      form.reset();
                      setSelectedRecipient(null);
                      setSearchQuery("");
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    Send More Money
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Recipient Search */}
                    <FormField
                      control={form.control}
                      name="userId"
                      render={() => (
                        <FormItem>
                          <FormLabel>Send To</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Search by name, phone, or email"
                                className="text-lg py-6 pl-12 pr-4"
                                value={searchQuery}
                                onChange={(e) => {
                                  setSearchQuery(e.target.value);
                                  setShowRecipientList(true);
                                  if (e.target.value === "") {
                                    setSelectedRecipient(null);
                                    form.setValue("userId", "");
                                  }
                                }}
                                onFocus={() => setShowRecipientList(true)}
                              />
                              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Search className="h-5 w-5 text-gray-500" />
                              </div>

                              {/* Recipient dropdown */}
                              {showRecipientList && searchQuery && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                                  {filteredRecipients?.length > 0 ? (
                                    filteredRecipients?.map(
                                      (recipient: IUser) => (
                                        <div
                                          key={recipient._id}
                                          className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                          onClick={() =>
                                            handleRecipientSelect(recipient)
                                          }
                                        >
                                          <div className="font-medium">
                                            {recipient.name}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            {recipient.phone}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            {recipient.email}
                                          </div>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <div className="p-4 text-center text-gray-500">
                                      No recipients found
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Selected Recipient Info */}
                    {selectedRecipient && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {selectedRecipient.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {selectedRecipient.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

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

                    {/* Note Input */}
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this for?"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Transaction Summary */}
                    {watchedAmount > 0 && selectedRecipient && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Recipient:</span>
                            <span className="font-medium">
                              {selectedRecipient.name}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span className="font-medium">
                              ৳ {watchedAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fee:</span>
                            <span className="font-medium text-green-600">
                              Free
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-green-200 pt-2">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold text-green-600">
                              ৳ {watchedAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full py-6 text-lg font-semibold"
                      disabled={
                        isLoading ||
                        isInsufficient ||
                        !selectedRecipient ||
                        walletLoading
                      }
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Money
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
                    Secure Transfers
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Instant money transfers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    No hidden fees
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    24/7 transaction monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recent Contacts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userInfo?.slice(0, 3).map((recipient: IUser) => (
                  <div
                    key={recipient._id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRecipientSelect(recipient)}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {recipient.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {recipient.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-800 text-lg">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan QR Code
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Send to Phone Number
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send via Email
                </Button>
              </CardContent>
            </Card>

            {/* Limits Info */}
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-800 text-lg">
                  Transfer Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-amber-700">
                  <div className="flex justify-between">
                    <span>Minimum per transaction:</span>
                    <span className="font-medium">৳ 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maximum per transaction:</span>
                    <span className="font-medium">৳ 50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily limit:</span>
                    <span className="font-medium">৳ 100,000</span>
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
