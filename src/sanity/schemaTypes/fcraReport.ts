import { defineField, defineType } from "sanity";

export const FCRA_CATEGORIES = [
  { title: "Registration Certificate", value: "registration" },
  { title: "Annual Report", value: "annual-report" },
  { title: "Quarterly Receipt", value: "quarterly-receipt" },
  { title: "Financial Report", value: "financial-report" },
] as const;

export const FCRA_QUARTERS = [
  { title: "Q1 (Apr – Jun)", value: "Q1" },
  { title: "Q2 (Jul – Sep)", value: "Q2" },
  { title: "Q3 (Oct – Dec)", value: "Q3" },
  { title: "Q4 (Jan – Mar)", value: "Q4" },
] as const;

export default defineType({
  name: "fcraReport",
  title: "FCRA Report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "FCRA Annual Report 2024-25"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: FCRA_CATEGORIES.map((c) => ({ title: c.title, value: c.value })),
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fiscalYear",
      title: "Fiscal Year",
      type: "string",
      description: 'Format: "2024-25". Required for Annual, Quarterly, and Financial reports.',
      hidden: ({ parent }) => parent?.category === "registration",
    }),
    defineField({
      name: "quarter",
      title: "Quarter",
      type: "string",
      options: {
        list: FCRA_QUARTERS.map((q) => ({ title: q.title, value: q.value })),
        layout: "radio",
      },
      hidden: ({ parent }) => parent?.category !== "quarterly-receipt",
    }),
    defineField({
      name: "file",
      title: "Document (PDF)",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      fiscalYear: "fiscalYear",
      quarter: "quarter",
    },
    prepare({ title, category, fiscalYear, quarter }) {
      const catLabel =
        FCRA_CATEGORIES.find((c) => c.value === category)?.title || category;
      const parts = [catLabel, fiscalYear, quarter].filter(Boolean);
      return {
        title: title || "Untitled FCRA Report",
        subtitle: parts.join(" • "),
      };
    },
  },
  orderings: [
    {
      title: "Fiscal Year (newest)",
      name: "fiscalYearDesc",
      by: [
        { field: "fiscalYear", direction: "desc" },
        { field: "quarter", direction: "asc" },
      ],
    },
    {
      title: "Published (newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
