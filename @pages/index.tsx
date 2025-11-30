import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Redirect based on role
    switch (session.user.role) {
      case 'ELDER':
        router.push('/elder');
        break;
      case 'FAMILY':
        router.push('/family');
        break;
      case 'CAREGIVER':
        router.push('/caregiver');
        break;
      case 'DOCTOR':
        router.push('/doctor');
        break;
      default:
        router.push('/auth/signin');
    }
  }, [session, status, router]);

  return <div>Redirecting...</div>;
}