import ClientVerify from './ClientVerify';
import { Suspense } from 'react';
import { EmailVerificationSkeleton } from '../../app-components/skeletons/EmailVerificationSkeleton'; // Ajusta la ruta según sea necesario

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

