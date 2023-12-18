import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { logOut } = useAuth();
  const router = useNavigate();

  const handleLogout = async () => {
    return await logOut(() => router('/login'));
  };
  return (
    <Button onClick={handleLogout} className=" border border-black">
      Logout
    </Button>
  );
}
