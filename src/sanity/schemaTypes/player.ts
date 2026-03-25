import { defineField, defineType } from "sanity";

export default defineType({
  name: "player",
  title: "Player",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "team",
      type: "string",
      options: { list: ["men", "women"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "year", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "position",
      type: "string",
      options: { list: ["goalkeeper", "defender", "midfielder", "forward"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
  ],
});
