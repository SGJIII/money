import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">ContentAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link href="/signup" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 text-center px-4">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Create Amazing Content<br/>
          <span className="text-indigo-600">10x Faster with AI</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Generate engaging social media posts, blog articles, and marketing copy in seconds. 
          Schedule your content and watch your engagement soar.
        </p>
        <div className="mt-10">
          <Link href="/signup"
            className="rounded-md bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow hover:bg-indigo-500">
            Try for Free
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Free",
              price: "$0",
              features: [
                "5 AI generations/month",
                "Basic templates",
                "24h support",
              ]
            },
            {
              title: "Pro",
              price: "$29",
              features: [
                "100 AI generations/month",
                "All templates",
                "Social scheduling",
                "Priority support",
              ]
            },
            {
              title: "Business",
              price: "$99",
              features: [
                "Unlimited generations",
                "Custom templates",
                "Advanced analytics",
                "Dedicated support",
              ]
            }
          ].map((plan) => (
            <div key={plan.title} className="rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold leading-8">{plan.title}</h3>
              <p className="mt-4 text-5xl font-bold tracking-tight text-gray-900">{plan.price}</p>
              <p className="mt-6 text-base leading-7 text-gray-600">per month</p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup"
                className="mt-8 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
