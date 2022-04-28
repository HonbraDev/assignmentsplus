import { Box, Button, Card, Link, Typography } from "@mui/material";
import { loginRequest } from "@config/authConfig";
import { useMsal } from "@azure/msal-react";

function Login() {
  const { instance } = useMsal();
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "min-content",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" textAlign="center">
          Assignments+
        </Typography>
        <Card
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 400,
          }}
        >
          <Box>
            <Typography variant="body1" gutterBottom>
              Please sign in to view your assignments.
            </Typography>
            <Typography variant="body1">
              Only internal accounts from the mensagym tenant are currently
              supported due to API restrictions.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => window.safari !== undefined ? instance.loginRedirect(loginRequest) : instance.loginPopup(loginRequest)}
            sx={{
              marginLeft: "auto",
              display: "block",
            }}
          >
            Sign in with Microsoft
          </Button>
        </Card>
        <Box>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Assignments+ is free and open-source software powered by Microsoft
            Teams.{" "}
            <Link href="https://github.com/honbradev/assignmentsplus">
              View&nbsp;the&nbsp;source&nbsp;code
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
