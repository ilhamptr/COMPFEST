import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    // This ensures proper routing initialization for standalone builds
  }, []);

  // Redirect to the welcome page when the app starts
  return <Redirect href="/(root)/welcomepage" />;
}
