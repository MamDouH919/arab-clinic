import React from 'react'
import db from '@/db/db';
import List from './_List';


const Page = async () => {
    return (
        <Data />
    )
}

export default Page

const Data = async () => {
    const total = await db.doctors.count();
    return <List total={total}/>
}