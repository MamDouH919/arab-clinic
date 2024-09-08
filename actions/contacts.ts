"use server"

import { AddContactsSchema } from "@/schemas"
import db from "@/db/db"

export async function addContacts(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const branch = formData.get("branch") as string | null;
    const message = formData.get("message") as string;

    console.log(branch);


    const parsedData = {
        name,
        email,
        mobile,
        branch,
        message,
    };

    console.log(parsedData);


    const result = AddContactsSchema.safeParse(parsedData);
    if (!result.success) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await db.contacts.create({
        data: {
            name: data.name,
            email: data.email,
            branch: data.branch,
            message: data.message,
            mobile: data.mobile,
        }
    });
}

