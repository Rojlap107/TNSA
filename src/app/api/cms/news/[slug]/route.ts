import { NextResponse } from "next/server";
import { sanityClient } from "../../../../../sanity/client";
import { NEWS_ONE } from "../../../../../sanity/queries";

export const dynamic = "force-dynamic";

export async function GET(_: Request, context: any) {
  const slug = context?.params?.slug as string | undefined;
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const data = await sanityClient.fetch(NEWS_ONE, { slug });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}
