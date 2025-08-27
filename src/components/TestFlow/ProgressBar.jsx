import { LinearProgress, Box } from "@mui/material";

export default function ProgressBar({ value }) {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: "#e0f2e9",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#006400"
          }
        }}
      />
    </Box>
  );
}
