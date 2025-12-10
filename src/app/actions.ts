
"use server";

import { z } from "zod";
import { getTutorResponseFlow, AITutorInputSchema } from "@/ai/flows/tutor-flow";

// Re-using the schema from the flow for consistency.
const InputSchema = AITutorInputSchema;

export async function getTutorResponse(values: z.infer<typeof InputSchema>) {
  try {
    const result = await getTutorResponseFlow(values);
    return { answer: result.answer };
  } catch (e: any) {
    console.error("Error in getTutorResponse action:", e);
    return { error: "Failed to get a response from the AI tutor. " + (e.message || "Please try again later.") };
  }
}
