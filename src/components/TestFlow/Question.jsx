import { Box, Button, Typography } from "@mui/material";

export default function Question({ data, onAnswer, questionNumber, total }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pregunta {questionNumber} de {total}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {data.question}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {data.options.map((option, i) => (
          <Button
            key={i}
            variant="outlined"
            onClick={() => onAnswer(option === data.answer)}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
