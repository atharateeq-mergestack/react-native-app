import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputField } from '@/components/common/InputField';
import Button from '@/components/common/Button';
import LoginSchema from '@/app/(auth)/authScreen/loginSection/validation';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import * as SplashScreen from 'expo-splash-screen';
// import { useAppSlice } from '@/slices';
// import { useDataPersist } from '@/hooks';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const LoginSection = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  // const { dispatch, setUser, setLoggedIn, loggedIn } = useAppSlice();
  // const { setPersistData, getPersistData } = useDataPersist();

  const onSubmit = async (data: any) => {
    try {
      //   const response = await loginUser(data);
      const response = { success: true, message: 'ASSA' };
      // Show a success toast
      if (response.success) {
        // dispatch(setUser({}));
        // dispatch(setLoggedIn(!!user));
        showToast('success', 'Congrats', response.message);
        router.replace('/main/drawer');
      }
      // You can set the token here if required or rely on cookies
    } catch (error: any) {
      showToast('error', 'Error', error.message || 'Failed to fetch profile.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../../../assets/images/logo-lg.png')} style={styles.logo} />
        </View>

        {/* Heading */}
        <Text style={styles.heading}>Get Started now</Text>
        <Text style={styles.subheading}>Create an account or log in to explore about our app</Text>

        {/* Auth Form */}
        <View style={styles.authFormContainer}>
          <View style={styles.container}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View style={styles.inputContainer}>
                  <InputField
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...field}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View style={styles.inputContainer}>
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...field}
                  />
                </View>
              )}
            />

            <View style={styles.haveAccount}>
              <TouchableOpacity onPress={() => router.push('/(auth)/authScreen/signUpSection')}>
                <Text style={styles.signupText}>Already have an account?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              onPress={handleSubmit(onSubmit)}
              buttonText="Log In"
              variant="primary"
              iconRight={<Ionicons name="log-in-outline" size={20} color="#fff" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  haveAccount: {
    flex: 1,
    alignItems: 'flex-end',
  },
  subheading: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
  authFormContainer: {
    marginTop: 32,
  },
  container: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  signupText: {
    textAlign: 'center',
    color: '#007BFF', // Link color
    fontSize: 16,
    marginBottom: 16, // Space before button
  },
});

export default LoginSection;
