import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Resultados
      </Typography>
      <Typography variant="h6" gutterBottom>
        Tu puntuación: {state?.score} / {state?.total}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
}