import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  Grid,
  createTheme,
  ThemeProvider,
  CssBaseline,
  type GridProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SelectChangeEvent } from "@mui/material/Select";

interface Product {
  id: string;
  model: string;
  brand: string;
  type: string;
  focalLength: string;
  maxAperture: string;
  mount: string;
  weight: number;
  hasStabilization: boolean;
  active: boolean;
}

interface PaginatedResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const GridItem = ({
  children,
  xs,
  sm,
  md,
  sx,
  ...props
}: GridProps & { xs?: number; sm?: number; md?: number }) => (
  <Grid
    item
    component="div"
    xs={xs}
    sm={sm}
    md={md}
    sx={{ display: "flex", ...sx }}
    {...props}
  >
    {children}
  </Grid>
);

const theme = createTheme({
  palette: {
    primary: { main: "#2b89a2" },
    secondary: { main: "#424242" },
    background: { default: "#f4f6f8" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSize: 14,
  },
});

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = {
        page,
        limit,
      };
      if (search) params.search = search;
      if (filterType) params.type = filterType;

      const response = await api.get("/products", { params });
      const data: PaginatedResponse = response.data;

      setProducts(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setSnackbar({
        open: true,
        message: "Erro ao carregar produtos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, filterType, page]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setSnackbar({
        open: true,
        message: "Produto removido com sucesso.",
        severity: "success",
      });
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchProducts();
      }
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      setSnackbar({
        open: true,
        message: "Erro ao remover produto.",
        severity: "error",
      });
    }
  };

  const handleFilterTypeChange = (e: SelectChangeEvent) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ px: 2, py: 4, maxWidth: "1300px", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <img
            src={logo}
            alt="Logo da Empresa"
            style={{ height: 150, objectFit: "contain" }}
          />
          <Typography variant="h2" color="#2b89a2">
            Gestão de Produtos
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TextField
            label="Buscar por modelo"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            size="small"
            sx={{ minWidth: 220 }}
          />

          <Select
            value={filterType}
            onChange={handleFilterTypeChange}
            displayEmpty
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Todos os Tipos</MenuItem>
            <MenuItem value="Prime">Prime</MenuItem>
            <MenuItem value="Zoom">Zoom</MenuItem>
            <MenuItem value="Macro">Macro</MenuItem>
            <MenuItem value="Tilt-Shift">Tilt-Shift</MenuItem>
          </Select>

          <Button
            variant="contained"
            component={Link}
            to="/products/create"
            sx={{ height: 42, px: 2, backgroundColor: "#2b89a2" }}
          >
            + Novo Produto
          </Button>
        </Box>

        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
          >
            Mostrando {products.length} de {total} produtos
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Carregando produtos...
            </Typography>
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum produto encontrado
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
              <GridItem key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="#2b89a2"
                      fontWeight={600}
                      gutterBottom
                      noWrap
                    >
                      {product.model}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Marca:</strong> {product.brand}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Tipo:</strong> {product.type}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Focal:</strong> {product.focalLength}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Abertura:</strong> {product.maxAperture}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Montagem:</strong> {product.mount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Peso:</strong> {product.weight}g
                    </Typography>
                    <Typography variant="body2">
                      <strong>Estabilização:</strong>{" "}
                      {product.hasStabilization ? "Sim" : "Não"}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      gap: 1,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`/products/edit/${product.id}`}
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleDelete(product.id)}
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      Excluir
                    </Button>
                  </Box>
                </Card>
              </GridItem>
            ))}
          </Grid>
        )}

        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="outlined"
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Anterior
          </Button>

          <Typography variant="body1" fontWeight="bold" color="text.secondary">
            Página {page} de {totalPages}
          </Typography>

          <Button
            variant="outlined"
            disabled={page === totalPages || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Próxima
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default ProductListPage;
