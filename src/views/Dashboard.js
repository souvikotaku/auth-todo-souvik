import React, { useEffect } from "react";
import { Button, Container, Typography, CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
});

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5">Dashboard</Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </StyledContainer>
  );
};

export default Dashboard;
