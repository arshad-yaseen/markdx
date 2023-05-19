import * as z from "zod"

export const postPatchSchema = z.object({
  postCodes: z.array(
    z.object({
      id: z.number().optional(),
      section_id: z.number(),
      section: z.string(),
      content: z.string(),
    })
  ),
})
