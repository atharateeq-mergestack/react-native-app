import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="authScreen/loginSection/index"
        options={{
          headerTitle: 'Login',
        }}
      />
      <Stack.Screen
        name="authScreen/signUpSection/index"
        options={{
          headerTitle: 'Sign up',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
