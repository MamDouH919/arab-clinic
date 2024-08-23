import Footer from '@/component/ui/Footer'
import Navbar from '@/component/ui/Navbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout
