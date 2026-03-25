import { defineField, defineType } from "sanity";

export default defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "documents",
      title: "Attached Documents",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "file", type: "file" }),
          ],
        },
      ],
    }),
  ],
});
