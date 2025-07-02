import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import api from "../api/axiosConfig";
import { Container, Typography, Alert, Snackbar } from "@mui/material";

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/products/${id}`)
        .then((response) => {
          setInitialData(response.data);
        })
        .catch(() => {
          setError("Produto não encontrado");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    try {
      if (id) {
        await api.put(`/products/${id}`, data);
        setSuccessMsg("Produto atualizado com sucesso!");
      } else {
        await api.post("/products", data);
        setSuccessMsg("Produto criado com sucesso!");
      }
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch {
      setError("Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        {id ? "Editar Produto" : "Novo Produto"}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <ProductForm
        initialData={initialData || undefined}
        onSubmit={onSubmit}
        isLoading={loading}
      />

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductFormPage;
