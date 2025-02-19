// app/api/getFile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const filePath = path.join(process.cwd(), 'prisma', 'dev.db'); // Path to your SQLite file

        // Read the file from disk
        const fileBuffer = fs.readFileSync(filePath);

        // Return the file as a response with the appropriate headers
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/x-sqlite3', // Correct MIME type for SQLite file
                'Content-Disposition': 'attachment; filename=dev.db',
            },
        });
    } catch (error) {
        console.error('Error reading the file:', error);
        return new NextResponse('Error reading the file', { status: 500 });
    }
}
