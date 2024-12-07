"use client";

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PlanTier {
  name: string;
  id: string;
  price: string;
  features: string[];
  cta: string;
  href?: string;
  mostPopular?: boolean;
}

export default function Home() {
  const router = useRouter();

  const handlePricing = async (planId: string) => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const plans: PlanTier[] = [
    {
      name: "Free",
      id: "free",
      price: "$0",
      features: [
        "5 AI generations/month",
        "Basic templates",
        "24h support",
        "1 user",
      ],
      cta: "Start Free",
      href: "/sign-up",
    },
    {
      name: "Pro",
      id: "pro",
      price: "$29",
      features: [
        "100 AI generations/month",
        "All templates",
        "Social scheduling",
        "Priority support",
        "Analytics dashboard",
      ],
      cta: "Get Started",
      mostPopular: true,
    },
    {
      name: "Business",
      id: "business",
      price: "$99",
      features: [
        "Unlimited generations",
        "Custom templates",
        "Advanced analytics",
        "Dedicated support",
        "API access",
        "Team collaboration",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Enhanced with blur effect and shadow */}
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">QuickWrite</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
              <Link href="/sign-up" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced with animated gradient and floating elements */}
      <div className="relative isolate pt-14">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
            style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
          ></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center relative">
            {/* Floating shapes for visual interest */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-10 left-10 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-8">
              Create Amazing Content
              <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">10x Faster with AI</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Generate engaging social media posts, blog articles, and marketing copy in seconds.
              Perfect for content creators, marketers, and businesses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/sign-up"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl">
                Try for Free
              </Link>
              <a href="#features" className="text-lg font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors">
                Learn more <span aria-hidden="true" className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced with better cards and hover effects */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Write Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to create amazing content
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              QuickWrite combines AI power with intuitive design to help you create content that converts.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'AI-Powered Writing',
                  description: 'Advanced AI technology that understands your brand voice and creates content that resonates with your audience.',
                  icon: (
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                },
                {
                  name: 'Multiple Content Types',
                  description: 'Create social media posts, blog articles, marketing copy, and more - all optimized for engagement.',
                  icon: (
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  ),
                },
                {
                  name: 'Schedule & Analyze',
                  description: 'Plan your content calendar and track performance with built-in analytics and scheduling tools.',
                  icon: (
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.name} 
                  className="group relative flex flex-col bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials - Enhanced with better cards and hover effects */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by content creators
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Social Media Manager',
                  text: 'QuickWrite has revolutionized our content creation process. What used to take hours now takes minutes.',
                  avatar: '👩‍💼',
                },
                {
                  name: 'Michael Chen',
                  role: 'Marketing Director',
                  text: 'The quality of content is consistently high, and the AI really understands our brand voice.',
                  avatar: '👨‍💼',
                },
                {
                  name: 'Emma Davis',
                  role: 'Content Creator',
                  text: 'This tool has helped me scale my content creation business. My clients are amazed by the results.',
                  avatar: '👩‍💻',
                },
              ].map((testimonial) => (
                <div key={testimonial.name} 
                  className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center gap-x-4 mb-6">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 italic">"{testimonial.text}"</blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Enhanced with better visual hierarchy */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose your plan
            </p>
          </div>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {plans.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 ring-1 ${
                  tier.mostPopular
                    ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white ring-gray-900 scale-105 shadow-xl'
                    : 'bg-white text-gray-900 ring-gray-200 hover:shadow-lg'
                } transition-all duration-200 hover:-translate-y-1`}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-xs font-medium text-white ring-1 ring-inset ring-indigo-600">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold leading-8">{tier.name}</h3>
                <p className="mt-4 text-5xl font-bold tracking-tight">{tier.price}</p>
                <p className={`mt-6 text-base leading-7 ${tier.mostPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                  per month
                </p>
                <ul className={`mt-8 space-y-3 text-sm leading-6 ${tier.mostPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg className={`h-6 w-5 flex-none ${tier.mostPopular ? 'text-white' : 'text-indigo-600'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.id === "free" && tier.href ? (
                  <Link
                    href={tier.href}
                    className={`mt-8 block rounded-lg px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      tier.mostPopular
                        ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 focus-visible:outline-indigo-600'
                    } transition-all duration-200`}
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePricing(tier.id)}
                    className={`mt-8 block w-full rounded-lg px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      tier.mostPopular
                        ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 focus-visible:outline-indigo-600'
                    } transition-all duration-200`}
                  >
                    {tier.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section - Enhanced with better interaction */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {[
                {
                  question: "How does QuickWrite work?",
                  answer: "QuickWrite uses advanced AI to understand your requirements and generate high-quality content. Simply choose your content type, enter your topic, and let our AI do the rest.",
                },
                {
                  question: "Can I customize the AI's writing style?",
                  answer: "Yes! You can select different tones (professional, casual, humorous) and provide specific instructions to match your brand voice.",
                },
                {
                  question: "Is there a limit to how much content I can generate?",
                  answer: "Free users can generate 5 pieces of content per month. Pro users get 100 generations, and Business users have unlimited access.",
                },
                {
                  question: "Can I schedule my content directly from QuickWrite?",
                  answer: "Yes, Pro and Business plans include social media scheduling features to help you plan and automate your content distribution.",
                },
              ].map((faq) => (
                <div key={faq.question} className="pt-6 group">
                  <dt className="text-lg font-semibold leading-7 text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer - Enhanced with better spacing and hover effects */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} QuickWrite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/sign-up"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-200">
          <span>Get Started</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
