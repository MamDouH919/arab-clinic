import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const contacts = await db.doctors.findMany({
        select: {
            id: true,
            name: true,
            nameAr: true,
            branch: true,
            service: true,
            createdAt: true,
            expertise: true,
            expertiseAr: true,
            imagePath: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const total = await db.clients.count()

    return NextResponse.json({ data: contacts, page, pageSize, total });
}