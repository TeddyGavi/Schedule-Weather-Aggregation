import { useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';

export function useAuth() {
  return useContext(AuthContext);
}
