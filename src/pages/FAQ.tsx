import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  User,
  Users,
  CreditCard,
  Lock,
  Smartphone,
} from "lucide-react";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const categories = [
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "What is Digital Wallet?",
          answer:
            "Digital Wallet is a secure mobile payment system that allows you to send and receive money, pay bills, and make purchases using your smartphone. It's similar to services like bKash or Nagad but with enhanced security features and user experience.",
        },
        {
          question: "Is Digital Wallet free to use?",
          answer:
            "Basic account usage is free. There are no fees for creating an account, checking your balance, or receiving money. Some transactions may incur small fees, which are clearly displayed before you confirm any payment.",
        },
        {
          question: "How do I create an account?",
          answer:
            "Download our app from the App Store or Google Play Store. Open the app and follow the registration process. You'll need to provide your phone number, email address, and some identification details to verify your account.",
        },
        {
          question: "Which countries do you operate in?",
          answer:
            "We currently operate in multiple countries across Asia, with plans to expand to other regions. Check our website for the most current list of supported countries.",
        },
      ],
    },
    {
      id: "account",
      name: "Account Management",
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "On the login screen, tap 'Forgot Password'. Enter your registered phone number or email address. We'll send you a verification code. Enter the code and follow the instructions to create a new password.",
        },
        {
          question: "Can I have multiple accounts?",
          answer:
            "No, for security and verification purposes, each individual can only have one personal account. Businesses can apply for merchant accounts which have different requirements.",
        },
        {
          question: "How do I update my personal information?",
          answer:
            "Go to your Profile section in the app, tap 'Edit Profile', make your changes, and save. Some changes may require verification for security purposes.",
        },
        {
          question: "What should I do if my phone is lost or stolen?",
          answer:
            "Immediately contact our customer support to temporarily freeze your account. You can also login from another device and disable your account from the security settings.",
        },
      ],
    },
    {
      id: "transactions",
      name: "Transactions",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "How long do transactions take?",
          answer:
            "Most transactions are instant. In rare cases where additional security checks are needed, it may take up to 24 hours. You'll receive a notification once the transaction is completed.",
        },
        {
          question: "Is there a transaction limit?",
          answer:
            "Yes, transaction limits vary based on your account verification level. Basic accounts have lower limits, while fully verified accounts have higher transaction limits. You can check your limits in the app settings.",
        },
        {
          question: "What should I do if a transaction fails?",
          answer:
            "First, check your internet connection and ensure you have sufficient balance. If the problem persists, check your transaction history to see if the transaction was actually completed. If funds were deducted but not received, contact support with the transaction ID.",
        },
        {
          question: "How do I send money to someone?",
          answer:
            "Tap 'Send Money' in the app, enter the recipient's phone number or scan their QR code, enter the amount, add a note (optional), and confirm. The recipient will get the money instantly.",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: <Lock className="h-5 w-5" />,
      questions: [
        {
          question: "How secure is my money?",
          answer:
            "Very secure. We use bank-level encryption, two-factor authentication, and continuous monitoring for suspicious activity. Your funds are also protected by our guarantee policy.",
        },
        {
          question: "What is two-factor authentication?",
          answer:
            "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code sent to your phone or email in addition to your password when logging in from a new device.",
        },
        {
          question: "How do I enable biometric authentication?",
          answer:
            "Go to Settings > Security > Biometric Authentication. Follow the prompts to set up fingerprint or face recognition based on your device's capabilities.",
        },
        {
          question: "What should I do if I notice suspicious activity?",
          answer:
            "Immediately change your password and enable two-factor authentication if you haven't already. Then contact our support team with details of the suspicious activity. We'll help secure your account and investigate.",
        },
      ],
    },
    {
      id: "agents",
      name: "Agent Services",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "How do I find an agent near me?",
          answer:
            "In the app, go to the 'Agent' section and tap 'Find Agents'. The app will show you a map of nearby agents along with their addresses, operating hours, and current status.",
        },
        {
          question: "What services can agents provide?",
          answer:
            "Agents can help you cash-in (deposit money into your account), cash-out (withdraw money from your account), and assist with account registration and verification.",
        },
        {
          question: "Are there fees for agent services?",
          answer:
            "Agents may charge a small fee for cash-out transactions. Cash-in transactions are usually free. All fees are displayed before you confirm any transaction.",
        },
        {
          question: "How do I become an agent?",
          answer:
            "Visit our website and navigate to the 'Become an Agent' section. You'll need to submit an application with required documents and meet certain criteria. Our team will review your application and contact you.",
        },
      ],
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: <Smartphone className="h-5 w-5" />,
      questions: [
        {
          question: "The app keeps crashing. What should I do?",
          answer:
            "First, try closing and reopening the app. If that doesn't work, check for updates in your app store. You can also try uninstalling and reinstalling the app (make sure you know your login credentials first).",
        },
        {
          question: "I'm not receiving verification codes. What's wrong?",
          answer:
            "Check that your phone number is correct in your profile. Ensure you have good network coverage. Sometimes codes can be delayed by your mobile carrier. If problems persist, contact support.",
        },
        {
          question: "Why is my transaction being declined?",
          answer:
            "Transactions can be declined for several reasons: insufficient balance, exceeded transaction limits, security concerns, or technical issues. Check your balance and limits first. If everything seems correct, contact support.",
        },
        {
          question: "How do I update the app?",
          answer:
            "Visit the App Store (iOS) or Google Play Store (Android), search for Digital Wallet, and tap Update if available. We recommend enabling automatic updates for the best experience.",
        },
      ],
    },
  ];

  // Filter questions based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const currentCategory =
    filteredCategories.find((cat) => cat.id === activeCategory) ||
    filteredCategories[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about Digital Wallet and our
            services.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search questions or keywords..."
              className="pl-10 pr-4 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filteredCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      activeCategory === category.id ? "default" : "ghost"
                    }
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="mr-2">{category?.icon}</span>
                    {category?.name}
                    <Badge variant="secondary" className="ml-auto">
                      {category.questions.length}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="sticky top-48 mt-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  Still need help?
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Can't find what you're looking for?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 text-sm mb-4">
                  Our support team is available 24/7 to assist you with any
                  questions or issues.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Questions Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <span className="mr-2 text-blue-600">
                    {currentCategory?.icon}
                  </span>
                  <CardTitle>{currentCategory?.name} Questions</CardTitle>
                </div>
                <CardDescription>
                  {searchQuery
                    ? `Showing ${currentCategory?.questions.length} results for "${searchQuery}"`
                    : `Browse common questions about ${currentCategory?.name.toLowerCase()}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentCategory?.questions.length > 0 ? (
                  <div className="space-y-4">
                    {currentCategory?.questions.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden"
                      >
                        <button
                          className="flex items-center justify-between w-full p-4 text-left font-medium bg-white hover:bg-gray-50"
                          onClick={() => toggleItem(index)}
                        >
                          <span>{item.question}</span>
                          {expandedItems.includes(index) ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        {expandedItems.includes(index) && (
                          <div className="p-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{item.answer}</p>
                            <div className="mt-4">
                              <Button variant="outline" size="sm">
                                Was this helpful?
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No results found
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Try different keywords or browse our categories for help.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Questions */}
            {!searchQuery && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Popular Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {categories
                    .flatMap((cat) => cat?.questions)
                    .filter((_, index) => index < 4)
                    .map((item, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-900 mb-2">
                            {item.question}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.answer}
                          </p>
                          <Button
                            variant="link"
                            className="p-0 text-blue-600 text-sm mt-2"
                            onClick={() => {
                              const categoryId = categories.find((cat) =>
                                cat?.questions.some(
                                  (q) => q.question === item.question
                                )
                              )?.id;
                              if (categoryId) setActiveCategory(categoryId);
                            }}
                          >
                            Read more
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
