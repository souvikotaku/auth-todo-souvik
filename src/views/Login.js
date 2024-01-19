import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  FormHelperText,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import retro from "../assets/retro.gif";
import cyberpunk from "../assets/cyberpunk.png";
import cyberblack from "../assets/cyberblack.png";
import backgroundMusic from "../assets/afterdark.mp3";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
  position: "relative",
  background: `url(${retro}) no-repeat center center fixed`,
  backgroundSize: "cover",
  minHeight: "100vh",
});

const StyledForm = styled(Form)({
  width: "100%",
  marginTop: "1em",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1em",
  "& .MuiOutlinedInput-root": {
    background: "#4A235A",
    "& fieldset": {
      borderColor: "pink",
    },
    "&:hover fieldset": {
      borderColor: "#39FF14",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#39FF14",
    },
  },
  "& .MuiInputLabel-root": {
    color: "pink",
  },
  "& .MuiOutlinedInput-input": {
    color: "pink",
  },
});

const ErrorText = styled(FormHelperText)({
  color: "yellow",
  marginTop: "5px",
  fontWeight: "bold",
});

const StyledButton = styled(Button)({
  marginTop: "1em",
  width: "200px",
  borderRadius: "70px",
  background: "purple",
  color: "yellow",
  transition: "background 0.3s, color 0.3s, box-shadow 0.3s",

  "&:hover": {
    background: "yellow",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    color: "purple",
  },

  position: "relative",
  "&.loading": {
    backgroundColor: "#4CAF50",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width:600px)");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Play background music
    const audio = new Audio(backgroundMusic);
    audio.loop = true;

    audio.play();

    return () => {
      // Stop background music when leaving the login page
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

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
    <StyledContainer
      component="main"
      maxWidth="xs"
      className="custom-container-login"
    >
      <CssBaseline />

      <img src={cyberblack} className="cyberimg" />
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <div className="fieldlogin1">
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

            <div className="fieldlogin" style={{ position: "relative" }}>
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <StyledTextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                    <Tooltip
                      title={showPassword ? "Hide Password" : "Show Password"}
                      arrow
                    >
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "40%",
                          transform: "translateY(-50%)",
                          color: "pink",
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </Tooltip>
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
              className={isSubmitting ? "loading" : ""}
            >
              {isSubmitting && <CircularProgress size={20} color="inherit" />}
              {!isSubmitting && "Login"}
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default Login;
