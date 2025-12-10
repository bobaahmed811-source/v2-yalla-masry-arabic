
'use server';
/**
 * @fileOverview Server actions for the Dialogue Challenge feature.
 */

import { z } from 'zod';
import { getDialogueEvaluationFlow, DialogueEvaluationInputSchema } from '@/ai/flows/dialogue-evaluation-flow';


/**
 * Server action to get an evaluation for a user's dialogue choice.
 * @param values The user's answer and the type of choice made.
 * @returns A promise that resolves to the AI's evaluation.
 */
export async function getDialogueEvaluation(values: z.infer<typeof DialogueEvaluationInputSchema>) {
  try {
    const result = await getDialogueEvaluationFlow(values);
    return { success: result };
  } catch (e: any) {
    console.error("Error in getDialogueEvaluation action:", e);
    return { error: "Failed to get evaluation from the AI. " + (e.message || "Please try again later.") };
  }
}
