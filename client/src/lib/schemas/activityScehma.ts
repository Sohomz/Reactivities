import { z } from "zod";

const requiredString = (fieldName: string) =>
  z.string({ error: `${fieldName} is required` }).min(1, { error: `${fieldName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date:
    requiredString("Date") &&
    z.coerce.date().refine((date) => date > new Date(), {
      message: "Date must be in the future",
    }),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});

export type ActivitySchema = z.input<typeof activitySchema>;
