import { z } from "zod";

export const zodworkspaceSchema = z.object({
    name: z.string().min(3).max(50)
});