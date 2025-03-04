'use server';
import { redirect } from 'next/navigation';

import { createAuthSession, destroySession } from '@/lib/auth';
import { hashPassword, isValidPassword } from '@/lib/hashPassword';
import db from '@/db/db';
import { loginSchema } from '@/schemas';

export async function getUserById(id: number) {
    const user = await db.users.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
        }
    });
    return user;
}

export async function addUserMut() {
    const pass = await hashPassword("Arab!!!clinic123")
    await db.users.create({
        data: {
            email: "arabclinic@arabclinic.com",
            password: pass
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