import { z } from "zod";
import site from "@content/site.json";

export const inquirySchema = z
  .object({
    name: z.string().trim().min(1, site.inquiry.validationName),
    email: z.union([z.literal(""), z.email(site.inquiry.validationEmail).trim()]),
    instagram: z.string().trim(),
    idea: z.string().trim().min(10, site.inquiry.validationIdea),
  })
  .refine(({ email, instagram }) => email || instagram, {
    message: site.inquiry.validationContact,
    path: ["email"],
  });

export type InquiryFormValues = z.infer<typeof inquirySchema>;
