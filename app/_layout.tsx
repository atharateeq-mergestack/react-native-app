import { Fragment } from 'react';
import * as SplashScreen from 'expo-splash-screen';
// import { useDataPersist, DataPersistKeys } from '@/hooks';
// import useColorScheme from '@/hooks/useColorScheme';
// import { loadImages, loadFonts } from '@/theme';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAppSlice } from '@/slices';
import Provider from '@/providers';
// import { User } from '@/types';

// keep the splash screen visible while complete fetching resources
SplashScreen.preventAutoHideAsync();

function Router() {
  const router = useRouter();
  // const { isDark } = useColorScheme();
  const {
    // dispatch,
    // setUser,
    // setLoggedIn,
    loggedIn,
  } = useAppSlice();
  // const { setPersistData, getPersistData } = useDataPersist();
  // const [isOpen, setOpen] = useState(false);

  /**
   * preload assets and user info
   */
  useEffect(() => {
    async function preload() {
      try {
        // preload assets
        // await Promise.all([loadImages(), loadFonts()]);

        // // fetch & store user data to store (fake promise function to simulate async function)
        // const user = await fetchUser();
        // dispatch(setUser(user));
        // dispatch(setLoggedIn(!!user));
        // if (user) setPersistData<User>(DataPersistKeys.USER, user);

        // hide splash screen
        SplashScreen.hideAsync();
        // setOpen(true);
      } catch {
        // if preload failed, try to get user data from persistent storage
        // getPersistData<User>(DataPersistKeys.USER)
        //   .then(user => {
        //     if (user) dispatch(setUser(user));
        //     dispatch(setLoggedIn(!!user));
        //   })
        //   .finally(() => {
        //     // hide splash screen
        //     SplashScreen.hideAsync();
        //     // show bottom sheet
        //     setOpen(true);
        //   });
      }
    }
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to main screen after initial load
  useEffect(() => {
    if (loggedIn) {
      router.push('/(main)');
    } else {
      router.push('/(auth)'); // Redirect to login page if not logged in
    }
  }, [router, loggedIn]);

  return (
    <Fragment>
      <Slot />
      <StatusBar style="light" />
    </Fragment>
  );
}

export default function RootLayout() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}
