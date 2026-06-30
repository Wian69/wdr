import { cookies } from 'next/headers';
import Storefront from './components/Storefront';

export default async function Home() {
  // We read the cookie set by our Edge Middleware (which intercepted the Vercel IP header)
  const cookieStore = await cookies();
  const countryCookie = cookieStore.get('user-country');
  
  // Default to US if the header wasn't present (e.g. local development without Vercel)
  const country = countryCookie?.value || 'US';

  return <Storefront initialCountry={country} />;
}
