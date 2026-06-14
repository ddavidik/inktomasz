import { z } from "zod";

export const inquirySchema = z
  .object({
    name: z.string().trim().min(1, "Your name is required."),
    email: z.union([z.literal(""), z.email("That doesn't look like a valid email.").trim()]),
    instagram: z.string().trim(),
    idea: z.string().trim().min(10, "Tell me the idea — story, mood, what it means."),
  })
  .refine(({ email, instagram }) => email || instagram, {
    message: "Provide your email or Instagram — at least one is required.",
    path: ["email"],
  });

export type InquiryFormValues = z.infer<typeof inquirySchema>;
