import { EmailVerificationSkeleton } from '@/app/components/skeletons/emailVerificationSkeleton';
import VerifyEmail from '@/app/auth/verify/clientVerify';
import { Suspense } from 'react';

export default function page() {
    return (
        <>
            <section className="flex items-center justify-center min-h-screen">
                <Suspense fallback={<EmailVerificationSkeleton />}>
                    <VerifyEmail />
                </Suspense>
            </section>
        </>
    );
}

