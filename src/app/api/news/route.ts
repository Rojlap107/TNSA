import { NextResponse } from 'next/server';
import posts from '../../../data/facebook-posts.json';

export async function GET() {
  return NextResponse.json(posts);
}
