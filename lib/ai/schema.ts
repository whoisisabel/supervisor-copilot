import { z } from "zod";

export const SessionAnalysisSchema = z.object({
  summary: z.string().describe("A 3-sentence summary of the session"),
  contentCoverage: z.object({
    score: z.number().min(1).max(3),
    justification: z.string(),
  }),
  facilitationQuality: z.object({
    score: z.number().min(1).max(3),
    justification: z.string(),
  }),
  protocolSafety: z.object({
    score: z.number().min(1).max(3),
    justification: z.string(),
  }),
  riskDetection: z.object({
    flag: z.enum(["SAFE", "RISK"]),
    quote: z
      .string()
      .nullable()
      .describe("Extract quote if self-harm is detected"),
  }),
});
export type SessionAnalysis = z.infer<typeof SessionAnalysisSchema>;
