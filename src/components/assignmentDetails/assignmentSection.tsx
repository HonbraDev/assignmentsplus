import { Box, Typography } from "@mui/material";

function AssignmentSection({
  title,
  children,
  text = false,
}: {
  title: string;
  children: any;
  text?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.25,
        width: "100%",
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      {text ? <Typography variant="body1">{children}</Typography> : children}
    </Box>
  );
}

export default AssignmentSection;
