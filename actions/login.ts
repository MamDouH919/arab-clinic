'use server';
import { redirect } from 'next/navigation';

import { createAuthSession, destroySession } from '@/lib/auth';
import { isValidPassword } from '@/lib/hashPassword';
import db from '@/db/db';
import { loginSchema } from '@/schemas';

export async function addUserMut() {
    await db.users.create({
        data:{
            email:"arabclinic@user.com",
            password:"Arab!!!clinic123"
        }
    });  
}
export async function login(email: string, password: string) {
    const result = loginSchema.safeParse({
        email,
        password
    })

    if (!result.success) {
        return {
            errors: {
                email: result.error.formErrors.fieldErrors.email
            },
        };
    }    

    const existingUser = await db.users.findUnique({ where: { email: email } });    

    if (!existingUser) {
        return {
            errors: {
                email: "emailNotExist",
            },
        };
    }

    const isValidPasswords = await isValidPassword(existingUser.password, password);    

    if (!isValidPasswords) {
        return {
            errors: {
                password: 'checkYourCredentials',
            },
        };
    }

    await createAuthSession(String(existingUser.id));
    redirect('/admin');
}

export async function logout() {
    await destroySession();
    redirect('/');
}