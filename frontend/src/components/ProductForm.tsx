import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schemas/productSchema";
import { z } from "zod";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

const typeOptions = ["Prime", "Zoom", "Macro", "Tilt-Shift"];

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}
      noValidate
    >
      <TextField
        label="Modelo"
        {...register("model")}
        error={!!errors.model}
        helperText={errors.model?.message}
        required
      />
      <TextField
        label="Marca"
        {...register("brand")}
        error={!!errors.brand}
        helperText={errors.brand?.message}
        required
      />
      <TextField
        select
        label="Tipo"
        {...register("type")}
        error={!!errors.type}
        helperText={errors.type?.message}
        required
      >
        {typeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Focal Length"
        {...register("focalLength")}
        error={!!errors.focalLength}
        helperText={errors.focalLength?.message}
        required
      />
      <TextField
        label="Abertura Máxima"
        {...register("maxAperture")}
        error={!!errors.maxAperture}
        helperText={errors.maxAperture?.message}
        required
      />
      <TextField
        label="Mount"
        {...register("mount")}
        error={!!errors.mount}
        helperText={errors.mount?.message}
        required
      />
      <TextField
        label="Peso (g)"
        type="number"
        {...register("weight", { valueAsNumber: true })}
        error={!!errors.weight}
        helperText={errors.weight?.message}
        required
      />
      <FormControlLabel
        control={<Checkbox {...register("hasStabilization")} />}
        label="Tem Estabilização"
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : "Salvar"}
      </Button>
    </Box>
  );
};

export default ProductForm;
