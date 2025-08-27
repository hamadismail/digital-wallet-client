import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
// import { useCashInMutation } from "@/redux/services/walletApi"; // Adjust path
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
import { useCashInMutation } from "@/redux/features/agent/agent.api";

// Validation schema
const addMoneySchema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .min(1, "Amount must be at least 1")
    .max(1000000, "Maximum amount is 1,000,000"),
});

type AddMoneyFormValues = z.infer<typeof addMoneySchema>;

export default function AddMoney() {
  const [cashIn, { isLoading }] = useCashInMutation();
  const form = useForm<AddMoneyFormValues>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = async (values: AddMoneyFormValues) => {
    try {
      await cashIn(values).unwrap();
      toast.success("Money added successfully!");
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add money");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Money</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="text-lg py-3 px-4"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Add Money"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
