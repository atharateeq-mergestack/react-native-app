import { getUserInfo, loginUser } from '@/api';
import { useAppSlice } from '@/slices';
import { showToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { DataPersistKeys, useDataPersist } from './useDataPersist';
import { router } from 'expo-router';

export const useLoginUser = () => {
  const { dispatch, setUser, setLoggedIn } = useAppSlice();
  const { setPersistData } = useDataPersist();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async data => {
      const response = await getUserInfo();
      if (response.success) {
        // Set user in Redux
        dispatch(setUser(response.data));
        dispatch(setLoggedIn(true));

        // Persist user data
        await setPersistData(DataPersistKeys.USER, response.data);
        router.push('/(main)');
      }
    },
    onError: error => {
      showToast('error', 'Opps!', error.message);
    },
  });
};
