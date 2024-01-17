import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

const ErrorText = styled(FormHelperText)({
  color: "red",
  marginTop: "5px",
});

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if username exists in localStorage
    const username = localStorage.getItem("username");
    if (username) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const { username } = values;
      localStorage.setItem("username", username);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1800,
      }).then(() => {
        setSubmitting(false);
        navigate("/dashboard");
      });
      setSubmitting(false);
    }, 1000);
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
              <Field name="username">
                {({ field, meta }) => (
                  <>
                    <StyledTextField
                      {...field}
                      type="text"
                      id="username"
                      label="Username"
                      variant="outlined"
                      fullWidth
                    />
                    {meta.touched && meta.error && (
                      <ErrorText
                        style={{
                          marginTop: "-10px",
                          marginBottom: "15px",
                        }}
                      >
                        {meta.error}
                      </ErrorText>
                    )}
                  </>
                )}
              </Field>
            </div>

            <div>
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <StyledTextField
                      {...field}
                      type="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                    {meta.touched && meta.error && (
                      <ErrorText
                        style={{
                          marginTop: "-10px",
                          marginBottom: "15px",
                        }}
                      >
                        {meta.error}
                      </ErrorText>
                    )}
                  </>
                )}
              </Field>
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
