import { createUser } from '@/api';
import { IUserData } from '@/utils/helper';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

// React Query Hook to create user
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data: any) => {
      if (data.success) {
        showToast('success', 'Horray', data.message);
        router.push('/(auth)/authScreen/loginSection');
      }
    },
    onError: (error: any) => {
      showToast('error', 'Opps', error.message);
    },
  });
};
