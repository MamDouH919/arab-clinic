import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create example users

    const arrayBuffer = await crypto.subtle.digest(
        "SHA-512",
        new TextEncoder().encode("Mamdouh123!!!")
    )

    const pass = Buffer.from(arrayBuffer).toString("base64")

    await prisma.users.createMany({
        data: [
            { email: 'admin@gmail.com', password: pass },
        ],
    });

    console.log('Seed data inserted');
}

main()
    .catch((e) => {
        console.log(e);

        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
