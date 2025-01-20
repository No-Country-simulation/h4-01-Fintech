import { EmailVerificationSkeleton } from '@/components/skeletons/EmailVerificationSkeleton';
import ClientVerify from './ClientVerify';
import { Suspense } from 'react';

export default function Verify() {
    return (
        <>
            <section className="flex items-center justify-center min-h-screen">
                <Suspense fallback={<EmailVerificationSkeleton />}>
                    <ClientVerify />
                </Suspense>
            </section>
        </>
    );
}

