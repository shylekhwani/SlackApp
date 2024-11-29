import { z } from "zod";

//const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const zodPostSchema = z.object({
    caption: z
      .string({message: 'Caption is Required'})
      .min(1),

    // image: z
    //   .any()
    //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    //   .refine(
    //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //     "Only .jpg, .jpeg, .png and .webp formats are supported."
    //   )

  });
