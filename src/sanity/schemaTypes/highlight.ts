import { defineField, defineType } from "sanity";

export default defineType({
  name: "highlight",
  title: "Highlight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Label for reference (e.g. 'GCMGC Final 2025')",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
});
