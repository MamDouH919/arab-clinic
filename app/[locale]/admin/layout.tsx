import React from 'react'
import DashboardLayout from './_component/Layout';

export const dynamic = "force-dynamic"

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    await delay(2000); // 2-second delay

    return (
        <div>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    )
}

export default Layout
