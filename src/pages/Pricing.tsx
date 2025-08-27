import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, HelpCircle, User, Users, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Pricing() {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Simple, Fair Pricing for Everyone
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. No hidden fees, no
            surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <Label
              htmlFor="billing-mode"
              className="text-lg font-medium text-gray-700"
            >
              Monthly
            </Label>
            <Switch
              id="billing-mode"
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label
              htmlFor="billing-mode"
              className="text-lg font-medium text-gray-700"
            >
              Annual{" "}
              <span className="text-sm text-green-600 ml-1">(Save 20%)</span>
            </Label>
          </div>
        </div>

        {/* User Type Tabs */}
        <Tabs defaultValue="user" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger
              value="user"
              className="data-[state=active]:bg-blue-100"
            >
              <User className="w-4 h-4 mr-2" />
              User Plans
            </TabsTrigger>
            <TabsTrigger
              value="agent"
              className="data-[state=active]:bg-green-100"
            >
              <Users className="w-4 h-4 mr-2" />
              Agent Plans
            </TabsTrigger>
            <TabsTrigger
              value="merchant"
              className="data-[state=active]:bg-purple-100"
            >
              <Shield className="w-4 h-4 mr-2" />
              Merchant Plans
            </TabsTrigger>
          </TabsList>

          {/* User Plans */}
          <TabsContent value="user">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For casual users</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-gray-600">/ forever</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Send money to other users
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Basic wallet functionality
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Transaction history (30 days)
                    </li>
                    <li className="flex items-center text-gray-400">
                      <Check className="h-4 w-4 text-gray-400 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center text-gray-400">
                      <Check className="h-4 w-4 text-gray-400 mr-2" />
                      Higher transaction limits
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center border-2 border-blue-200 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For active users</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "2.50" : "3.00"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Basic
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Higher transaction limits ($1,000/day)
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Extended transaction history (1 year)
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority customer support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Cashback rewards (0.5% on transactions)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Upgrade Now
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Family</CardTitle>
                  <CardDescription>For families & groups</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "4.00" : "5.00"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Premium
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Manage up to 5 family accounts
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Parental controls & spending limits
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Shared wallet for family expenses
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Higher cashback (1% on transactions)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Agent Plans */}
          <TabsContent value="agent">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Starter Agent</CardTitle>
                  <CardDescription>For new agents</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "9.99" : "12.99"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Basic cash-in/cash-out services
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Up to 50 transactions daily
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      1.0% commission on transactions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Basic reporting dashboard
                    </li>
                    <li className="flex items-center text-gray-400">
                      <Check className="h-4 w-4 text-gray-400 mr-2" />
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center border-2 border-green-200 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-3 py-1">
                    Best Value
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>Professional Agent</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "19.99" : "24.99"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Starter
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Up to 200 transactions daily
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      1.2% commission on transactions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced reporting & analytics
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Priority customer support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Upgrade Now
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Enterprise Agent</CardTitle>
                  <CardDescription>For high-volume operations</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "49.99" : "59.99"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Professional
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited transactions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      1.5% commission on transactions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Custom integration options
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Merchant Plans */}
          <TabsContent value="merchant">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Small Business</CardTitle>
                  <CardDescription>For small shops & startups</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "14.99" : "19.99"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Accept digital payments
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      1.9% transaction fee
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Basic payment gateway
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Up to $5,000 monthly volume
                    </li>
                    <li className="flex items-center text-gray-400">
                      <Check className="h-4 w-4 text-gray-400 mr-2" />
                      Advanced analytics
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center border-2 border-purple-200 shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>Growing Business</CardTitle>
                  <CardDescription>For established businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? "29.99" : "39.99"}
                    </span>
                    <span className="text-gray-600">/ month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Small Business
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      1.5% transaction fee
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Advanced payment gateway
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Up to $20,000 monthly volume
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Basic analytics & reporting
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Upgrade Now
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Custom</span>
                    <span className="text-gray-600"> pricing</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Growing Business
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Custom transaction fees (volume-based)
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      White-label solutions
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Unlimited transaction volume
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Dedicated support & API access
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                  Are there any hidden fees?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, we believe in transparent pricing. All fees are clearly
                  outlined in your plan details. The only additional charges
                  would be for transactions that exceed your plan's limits.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                  Can I change plans anytime?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can upgrade your plan at any time. Downgrades take
                  effect at the end of your current billing cycle. No questions
                  asked.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                  What payment methods do you accept?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept all major credit cards, bank transfers, and for some
                  regions, mobile money payments. All payments are processed
                  securely.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                  Is there a free trial available?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer a 14-day free trial for all paid plans. You can
                  explore all features without any commitment. No credit card
                  required to start.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center py-12 border-none shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </CardTitle>
            <CardDescription className="text-lg">
              Our team is here to help you choose the right plan for your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg">Contact Support</Button>
              <Button variant="outline" size="lg">
                See Full Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
