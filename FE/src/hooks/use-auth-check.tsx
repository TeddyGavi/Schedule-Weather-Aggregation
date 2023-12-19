import { GETProfile } from '../fetching/GET-profile';
import useSWR from 'swr';

export function useAuthCheck() {
  const { data: user, error } = useSWR('/users/profile', GETProfile);

  return {
    user,
    isLoading: !user && !error,
    error,
  };
}
