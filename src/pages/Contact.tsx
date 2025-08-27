import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function Contact() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by going to your profile settings and selecting 'Change Password'. If you've forgotten your password, use the 'Forgot Password' link on the login page."
    },
    {
      question: "What should I do if a transaction fails?",
      answer: "Failed transactions are usually refunded within 24 hours. If you don't see a refund after this period, please contact our support team with your transaction ID."
    },
    {
      question: "How do I become an agent?",
      answer: "To become an agent, you need to apply through our Agent Registration portal. Requirements include a valid business license and minimum initial deposit."
    },
    {
      question: "What are your customer support hours?",
      answer: "Our customer support team is available 24/7 through live chat and email. Phone support is available from 8 AM to 10 PM every day."
    },
    {
      question: "How secure is my financial information?",
      answer: "We use bank-level encryption and security protocols to protect your data. All transactions are monitored for suspicious activity, and we never share your information with third parties."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold">
            Get In Touch
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            We're Here to Help
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? Our support team is ready to help you with any issues.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Speak directly with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-900 mb-2">+1 (555) 123-4567</p>
              <p className="text-gray-600 mb-4">International: +1 (555) 987-6543</p>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Mon-Fri: 8am - 10pm | Sat-Sun: 9am - 6pm</span>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Email Us</CardTitle>
              <CardDescription>Send us a message anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900 mb-2">support@digitalwallet.com</p>
              <p className="text-gray-600 mb-4">For general inquiries</p>
              <p className="text-lg font-semibold text-gray-900 mb-2">business@digitalwallet.com</p>
              <p className="text-gray-600">For partnership opportunities</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Instant help from our agents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Get immediate assistance through our live chat system</p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Chat
              </Button>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>Available 24/7</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form and Info Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Info and FAQ */}
          <div className="space-y-8">
            {/* Office Address */}
            <Card>
              <CardHeader>
                <CardTitle>Our Office</CardTitle>
                <CardDescription>Visit us during business hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Digital Wallet Headquarters</p>
                    <p className="text-gray-600">123 Finance Street, Suite 456</p>
                    <p className="text-gray-600">San Francisco, CA 94103</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqItems.slice(0, 3).map((item, index) => (
                  <div key={index}>
                    <button
                      className="flex items-center justify-between w-full text-left font-medium"
                      onClick={() => toggleQuestion(index)}
                    >
                      <span>{item.question}</span>
                      {activeQuestion === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {activeQuestion === index && (
                      <p className="text-gray-600 mt-2 text-sm">{item.answer}</p>
                    )}
                  </div>
                ))}
                <Button variant="link" className="p-0 text-blue-600">
                  View all FAQs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Resources */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Additional Support Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto">
                  <HelpCircle className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Browse our comprehensive knowledge base with articles and guides.
                </p>
                <Button variant="outline">Visit Help Center</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-indigo-100 p-3 rounded-full w-fit mx-auto">
                  <MessageSquare className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Community Forum</CardTitle>
                <CardDescription>Connect with other users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join discussions, ask questions, and share experiences with our community.
                </p>
                <Button variant="outline">Join the Forum</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-pink-100 p-3 rounded-full w-fit mx-auto">
                  <Clock className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Status Page</CardTitle>
                <CardDescription>Check system status</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  View real-time status of our services and any ongoing incidents.
                </p>
                <Button variant="outline">Check Status</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Support Notice */}
        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardHeader>
            <CardTitle className="text-amber-800">Urgent Support Needed?</CardTitle>
            <CardDescription className="text-amber-700">
              If you're experiencing a critical issue such as unauthorized transactions or account compromise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-amber-800 font-medium">
                Call our emergency line: <span className="font-bold">+1 (555) 911-WALLET</span>
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
