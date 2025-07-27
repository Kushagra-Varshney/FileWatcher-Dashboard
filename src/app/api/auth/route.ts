import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id, password } = await request.json();
    
    if (id === 'test' && password === 'test123') {
      return NextResponse.json({ success: true, token: 'valid-token' });
    }
    
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}