import { useEffect } from 'react';
import { router } from 'expo-router';

// This tab acts as the FAB — immediately redirects to the add animal modal
export default function AddTab() {
  useEffect(() => {
    router.push('/animal/add');
  }, []);
  return null;
}
