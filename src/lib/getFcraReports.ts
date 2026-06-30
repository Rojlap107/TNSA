import { sanityClient } from "../sanity/client";

export type FcraCategory =
  | "registration"
  | "annual-report"
  | "quarterly-receipt"
  | "financial-report";

export interface FcraReport {
  id: string;
  title: string;
  category: FcraCategory;
  fiscalYear?: string;
  quarter?: "Q1" | "Q2" | "Q3" | "Q4";
  file: string;
  publishedAt?: string;
  description?: string;
}

const QUERY = `*[_type=="fcraReport"]|order(fiscalYear desc, quarter asc, publishedAt desc){
  "id": _id,
  title,
  category,
  fiscalYear,
  quarter,
  "file": file.asset->url,
  publishedAt,
  description
}`;

export async function getAllFcraReports(): Promise<FcraReport[]> {
  const jsonData: FcraReport[] = (
    await import("../data/fcra-reports.json").then((m) => m.default)
  ) as FcraReport[];

  let sanityData: FcraReport[] = [];
  try {
    const raw: any[] = await sanityClient.fetch(QUERY);
    sanityData = raw
      .filter((r) => r.file)
      .map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        fiscalYear: r.fiscalYear || undefined,
        quarter: r.quarter || undefined,
        file: r.file,
        publishedAt: r.publishedAt || undefined,
        description: r.description || undefined,
      }));
  } catch {}

  const map = new Map<string, FcraReport>();
  for (const r of jsonData) map.set(r.id, r);
  for (const r of sanityData) map.set(r.id, r);

  return Array.from(map.values());
}

export async function getFcraReportsByCategory(
  category: FcraCategory,
): Promise<FcraReport[]> {
  const all = await getAllFcraReports();
  return all.filter((r) => r.category === category);
}

export async function getFcraReportsByYear(
  category: FcraCategory,
  fiscalYear: string,
): Promise<FcraReport[]> {
  const all = await getAllFcraReports();
  return all.filter(
    (r) => r.category === category && r.fiscalYear === fiscalYear,
  );
}
