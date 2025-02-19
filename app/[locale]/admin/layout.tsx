import React from 'react'
import DashboardLayout from './_component/Layout';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const dynamic = "force-dynamic"

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const CLIENT_ID = "723297942068-76ia2of9j52a68a3saab68gs19eggpgp.apps.googleusercontent.com"; // Replace with your actual Client ID
const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const result = await verifyAuth();

    if (!result.user) {
        return redirect('/login');
    }
    // await delay(2000); // 2-second delay

    return (
        <div>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </GoogleOAuthProvider>
        </div>
    )
}

export default Layout
