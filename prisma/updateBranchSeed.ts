import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.branches.updateMany({
        where: {
            longitude: undefined,
            latitude: undefined
        },
        data: {
            latitude: 1,
            longitude: 1,
        },
    });

    console.log('Updated empty latitude values to NULL');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
