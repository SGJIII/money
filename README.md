# ContentAI - AI-Powered Content Generation Platform

A SaaS platform that helps freelancers and small businesses generate high-quality content using AI.

## Features

- AI-powered content generation for social media, blogs, and marketing
- Multiple content tones and styles
- Copy to clipboard functionality
- Modern, responsive UI
- Secure authentication
- Freemium pricing model

## Tech Stack

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Clerk for authentication
- OpenAI API for content generation
- Stripe for payments
- Supabase for database

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Required Accounts

1. [Clerk](https://clerk.com/) - Authentication
2. [OpenAI](https://openai.com/) - AI API
3. [Stripe](https://stripe.com/) - Payments
4. [Supabase](https://supabase.com/) - Database
5. [Vercel](https://vercel.com/) - Deployment

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel
4. Deploy!

## Making Money

1. **Freemium Model**
   - Free tier: 5 AI generations/month
   - Pro tier ($29/month): 100 generations + scheduling
   - Business tier ($99/month): Unlimited + priority + advanced features

2. **Marketing Strategy**
   - Focus on content creators, social media managers, and small businesses
   - Use content marketing and SEO to drive organic traffic
   - Implement referral program
   - Run targeted ads on platforms where your audience is (LinkedIn, Instagram)

3. **Revenue Optimization**
   - Upsell features like bulk generation and API access
   - Offer annual plans with discount
   - Create enterprise custom plans
   - Add done-for-you services

## License

MIT
