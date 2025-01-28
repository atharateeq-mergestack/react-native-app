import { Fragment } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import { useDataPersist, DataPersistKeys } from '@/hooks';
// import useColorScheme from '@/hooks/useColorScheme';
// import { loadImages, loadFonts } from '@/theme';
import { Slot } from 'expo-router';
// import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { useAppSlice } from '@/slices';
import Provider from '@/providers';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
// import { getToken } from '@/api';
// import { User } from '@/types';

// keep the splash screen visible while complete fetching resources
// SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
function Router() {
  // const router = useRouter();
  // // const { isDark } = useColorScheme();
  // const {
  //   // dispatch,
  //   // setUser,
  //   // setLoggedIn,
  //   loggedIn,
  // } = useAppSlice();
  // const { setPersistData, getPersistData } = useDataPersist();
  // const [isOpen, setOpen] = useState(false);

  /**
   * preload assets and user info
  //  */
  // useEffect(() => {
  //   async function preload() {
  //     try {
  //       const token = await getToken();
  //       if (loggedIn || token) {
  //         router.push('/(main)');
  //       } else {
  //         router.push('/(auth)');
  //       }
  //       SplashScreen.hideAsync();
  //       // setOpen(true);
  //     } catch {
  //     } finally {
  //     }
  //   }
  //   preload();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Navigate to main screen after initial load
  // useEffect(() => {

  // }, [router, loggedIn]);

  return (
    <Fragment>
      <Slot />
      <StatusBar style="light" />
    </Fragment>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router />
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
