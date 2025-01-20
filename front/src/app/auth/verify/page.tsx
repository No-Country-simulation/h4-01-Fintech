
import { VerifyEmail } from '@/components/organisms/clientVerify';
import { EmailVerificationSkeleton } from '@/components/skeletons/emailVerificationSkeleton';
import { Suspense } from 'react';

export default function Page() {
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

