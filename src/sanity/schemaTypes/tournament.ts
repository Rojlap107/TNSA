import { defineField, defineType } from "sanity";

export default defineType({
  name: "tournament",
  title: "Tournament",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
  ],
});
