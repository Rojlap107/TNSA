import { NextResponse } from "next/server";
import { sanityClient } from "../../../../sanity/client";
import { NEWS_LIST } from "../../../../sanity/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await sanityClient.fetch(NEWS_LIST);
  return NextResponse.json(data);
}
