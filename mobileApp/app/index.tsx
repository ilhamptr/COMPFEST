import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the welcome page when the app starts
  return <Redirect href="/(root)/welcomepage" />;
}
