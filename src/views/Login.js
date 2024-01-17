import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
});

const StyledForm = styled(Form)({
  width: "100%",
  marginTop: "1em",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1em",
});

const StyledButton = styled(Button)({
  marginTop: "1em",
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    alert("Login successful!");
    setSubmitting(false);
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5">Login</Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <div>
              <StyledTextField
                type="text"
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <StyledTextField
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <StyledButton
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              Login
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default Login;
