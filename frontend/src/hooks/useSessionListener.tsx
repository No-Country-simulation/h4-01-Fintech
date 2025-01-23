import { SessionProvider, useSession } from 'next-auth/react';
import '@/hooks/useSessionList.module.css';
import WelcomeDialog from '@/components/common/WelcomeDialog';

import { AppProps } from 'next/app';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <AuthListener />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

function AuthListener() {
    const { data: session } = useSession();

    if (session?.user?.email === 'orlandocardenas@gmail.com') {
        return <WelcomeDialog />;
    }

    return null;
}

export default App;
