import React from 'react'
import DashboardLayout from './_component/Layout';

export const dynamic = "force-dynamic"

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    )
}

export default Layout
