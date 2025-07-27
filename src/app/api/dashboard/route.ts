import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'This route is deprecated. Use the new client-based API endpoints.' 
  }, { status: 410 });
}