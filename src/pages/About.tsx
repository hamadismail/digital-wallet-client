import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Users,
  Globe,
  Smartphone,
  CreditCard,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            About Our Digital Wallet
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Revolutionizing Digital Payments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building a secure, fast, and accessible financial platform
            that empowers individuals and businesses to manage their money with
            confidence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              To democratize financial services by providing everyone with
              access to secure, convenient, and affordable digital payment
              solutions.
            </p>
            <p className="text-gray-600">
              Whether you're an individual looking to send money to family, a
              business owner needing to accept payments, or an agent providing
              financial services to your community, our platform is designed to
              meet your needs.
            </p>
            <div className="mt-8 flex gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-100">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 p-2 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Bank-level security to protect your transactions and personal
                  information
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-100">
              <CardHeader className="pb-2">
                <div className="bg-green-100 p-2 rounded-full w-fit">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Instant transfers and payments, 24/7 availability
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-100">
              <CardHeader className="pb-2">
                <div className="bg-purple-100 p-2 rounded-full w-fit">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Designed for everyone, regardless of technical expertise
                </p>
              </CardContent>
            </Card>
            <Card className="bg-amber-50 border-amber-100">
              <CardHeader className="pb-2">
                <div className="bg-amber-100 p-2 rounded-full w-fit">
                  <Globe className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-lg">Global</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Connect with a worldwide network of users and merchants
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Mobile Payments</CardTitle>
                <CardDescription>
                  Send and receive money with just a phone number
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Bill Payments</CardTitle>
                <CardDescription>
                  Pay utilities, subscriptions, and more with ease
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Tailored experiences for Users, Agents, and Admins
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white mb-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">500K+</p>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">$250M+</p>
              <p className="text-blue-100">Transactions Processed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">99.9%</p>
              <p className="text-blue-100">Uptime Reliability</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center py-12 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </CardTitle>
            <CardDescription className="text-lg">
              Join thousands of satisfied users who trust us with their
              financial transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg">Create Account</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
