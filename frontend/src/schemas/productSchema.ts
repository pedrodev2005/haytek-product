import { z } from "zod";

export const productSchema = z.object({
  model: z.string().min(1, "Modelo é obrigatório"),
  brand: z.string().min(1, "Marca é obrigatória"),
  type: z.enum(["Prime", "Zoom", "Macro", "Tilt-Shift"]),
  focalLength: z.string().min(1, "Focal Length é obrigatório"),
  maxAperture: z
    .string()
    .regex(/^f\/\d+(\.\d+)?$/, "Formato deve ser f/número"),
  mount: z.string().min(1, "Mount é obrigatório"),
  weight: z.number().int().positive("Peso deve ser positivo"),
  hasStabilization: z.boolean(),
});
