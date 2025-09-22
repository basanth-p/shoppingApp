import { Redirect } from 'expo-router';

export default function Index() {
  // Check if user is logged in, for now redirect to onboarding
  // In a real app, you'd check authentication state here
  return <Redirect href="/onboarding" />;
}
