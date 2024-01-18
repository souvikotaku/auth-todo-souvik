import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Container,
  Typography,
  CssBaseline,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import todoReducer, {
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} from "../redux/todoSlice";
import VideoBackground from "./components/VideoBackground"; // Adjust the path based on your project structure

import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import dashback from "../assets/dashback2.mp4";
import logo from "../assets/umbrella.png";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";

import "./Dashboard.css";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
});

const StyledTodo = styled(ListItem)(({ theme, completed, isDeleting }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  border: `1px solid ${completed ? "#58D68D" : "#D7BDE2"}`,
  borderRadius: "8px",
  marginBottom: "15px",
  backgroundColor: completed ? "#58D68D" : "#D7BDE2",
  width: "100%",
  maxWidth: "400px",
  maxWidth: "100% !important",
  transition: "background-color 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

  //animation on delete
  opacity: isDeleting ? 0 : 1,
  maxHeight: isDeleting ? 0 : "100px",
  overflow: "hidden",
  transition: "opacity 0.5s, max-height 0.5s",
  //animation on delete

  "&:hover": {
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.5) inset, 0 8px 16px rgba(0, 0, 0, 0.2)`,
    marginTop: "-5px",
    border: `1px solid grey`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    minWidth: "100%",
  },
}));

const TodoText = styled(ListItemText)(({ completed }) => ({
  flex: "1",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  "& > span": {
    textDecoration: "none", // Remove text decoration from the entire text
    "&:hover": {
      textDecoration: "underline",
    },
    "&:first-child": {
      textDecoration: completed ? "line-through" : "none", // Apply line-through to the primary text
    },
  },
}));
const ButtonsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const StyledGrid = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "stretch",
  marginTop: "15px",
});

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todoList = useSelector((state) => state.todos);

  const notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message, { backgroundColor: "#5cb85c" }); // Green color for success
        break;
      case "error":
        toast.error(message, { backgroundColor: "#d9534f" }); // Red color for error
        break;
      default:
        toast(message);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("username");
  //   navigate("/");
  // };

  const [deletingIndex, setDeletingIndex] = useState(null);

  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addTodoError, setAddTodoError] = useState("");

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ECC71",
      cancelButtonColor: "#EC7063",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out Successfully",
          text: "You have been logged out successfully.",
          icon: "success",
        });
        localStorage.removeItem("username");
        navigate("/");
      }
    });
    if (isMobileView) {
      handleDrawerClose();
    }
  };

  const isMobileView = useMediaQuery("(max-width:600px)");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // const handleAddTodo = () => {
  //   if (newTodo.trim() !== "") {
  //     if (editingIndex !== null) {
  //       dispatch(editTodo({ index: editingIndex, text: newTodo }));
  //       setEditingIndex(null);
  //       notify("Todo edited successfully");
  //     } else {
  //       dispatch(addTodo({ text: newTodo, completed: false }));
  //       notify("Todo added successfully", "success");
  //     }
  //     setNewTodo("");
  //   }
  // };
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      setAddTodoError("Todo cannot be blank");
    } else {
      setAddTodoError(""); // Reset the error state
      if (editingIndex !== null) {
        dispatch(editTodo({ index: editingIndex, text: newTodo }));
        setEditingIndex(null);
        notify("Todo edited successfully");
      } else {
        dispatch(addTodo({ text: newTodo, completed: false }));
        notify("Todo added successfully", "success");
      }
      setNewTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todoList[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setDeletingIndex(index);

    // Delay the actual deletion to allow the animation to play
    setTimeout(() => {
      dispatch(deleteTodo(index));
      notify("Todo deleted successfully");
      setDeletingIndex(null); // Reset deleting index after deletion
    }, 500);
  };

  const handleCompleteTodo = (index) => {
    dispatch(toggleComplete(index));
    const action = todoList[index]?.completed
      ? "marked incomplete"
      : "marked complete";
    notify(`Todo ${action}`, todoList[index]?.completed ? "error" : "success");
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <VideoBackground videoSource={dashback} />
      <ToastContainer position="top-right" autoClose={3000} />
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#333", color: "#58D68D" }}
      >
        <Toolbar>
          <>
            <img
              src={logo}
              alt="logo"
              style={{ marginRight: "10px" }}
              width={40}
            />
            <Typography variant="h6">Souvik's todo list</Typography>
          </>
          <div style={{ flexGrow: 1 }} />
          {isMobileView ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {isMobileView && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          sx={{ width: "250px" }}
        >
          <div
            style={{ backgroundColor: "#333", padding: "20px", height: "100%" }}
          >
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{
                color: "#2ECC71",
                width: "100%",
                margin: "0 auto",
                border: "1px solid #2ECC71",
                borderRadius: "4px",
              }}
            >
              Logout
            </Button>
            <Typography
              variant="h6"
              style={{ margin: "20px", color: "#2ECC71" }}
            >
              Made by Souvik
            </Typography>
          </div>
        </Drawer>
      )}

      <StyledContainer
        component="main"
        maxWidth="xs"
        className="custom-container"
      >
        <CssBaseline />
        <div style={{ zIndex: 1 }}>
          <Typography
            variant="h6"
            style={{ color: "#2ECC71", width: "80%", margin: "0 auto" }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h5"
            // style={{
            //   color: "#2ECC71",
            //   width: "80%",
            //   margin: "0 auto",
            //   wordBreak: "break-word",
            // }}
            className="usernameline"
          >
            {localStorage.getItem("username")}
          </Typography>
        </div>

        <TextField
          // label="Add Todo"
          // variant="outlined"
          // margin="normal"
          // fullWidth
          // value={newTodo}
          // onChange={(e) => setNewTodo(e.target.value)}
          // className={!isMobileView ? "desktop-textfield" : ""}
          label="Add Todo"
          variant="outlined"
          margin="normal"
          fullWidth
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
            setAddTodoError(""); // Reset the error when the user types
          }}
          className={!isMobileView ? "desktop-textfield" : ""}
          error={Boolean(addTodoError)}
          helperText={addTodoError}
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "black", // Change background color
              "& fieldset": {
                borderColor: "#39FF14", // Change border color
              },
              "&:hover fieldset": {
                borderColor: "#39FF14", // Change border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#39FF14", // Change border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "#39FF14", // Change label color
            },
            "& .MuiOutlinedInput-input": {
              color: "#39FF14", // Change input text color
            },
            "& .MuiFormHelperText-root": {
              color: "white", // Change the color of the general error text
            },
            "&.Mui-error .MuiFormHelperText-root": {
              color: "white", // Change the color of the specific error text
            },
          }}
        />
        {!isMobileView ? (
          <Tooltip
            title={editingIndex !== null ? "Edit Todo" : "Add Todo"}
            arrow
          >
            <Button
              onClick={handleAddTodo}
              variant="contained"
              color="primary"
              sx={{
                color: "black",
                backgroundColor: "#2ECC71", // Change background color
                "&:hover": {
                  color: "#2ECC71",
                  backgroundColor: "#333", // Change background color on hover
                },
              }}
            >
              <span>{editingIndex !== null ? "Edit Todo" : "Add Todo"}</span>
              {/* {editingIndex !== null ? "Edit Todo" : "Add Todo"} */}
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={handleAddTodo}
            variant="contained"
            color="primary"
            sx={{
              color: "black",
              backgroundColor: "#2ECC71", // Change background color
              "&:hover": {
                color: "#2ECC71",
                backgroundColor: "#333", // Change background color on hover
              },
            }}
          >
            <span>{editingIndex !== null ? "Edit Todo" : "Add Todo"}</span>
            {/* {editingIndex !== null ? "Edit Todo" : "Add Todo"} */}
          </Button>
        )}

        <div className={"scrolldiv"}>
          <StyledGrid container spacing={2}>
            {todoList.map((todo, index) => (
              <Grid
                item
                md={3}
                sm={12}
                key={index}
                className={isMobileView ? "mobile-todo-grid" : ""}
              >
                <StyledTodo
                  key={index}
                  completed={todo?.completed}
                  isDeleting={deletingIndex === index}
                >
                  <TodoText
                    primary={todo?.text}
                    secondary={todo?.completed ? "Completed" : "Incomplete"}
                    completed={todo?.completed}
                  />

                  {!isMobileView ? (
                    <ButtonsContainer>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => handleEditTodo(index)}
                          aria-label="edit"
                          style={{ color: "#3498DB" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          onClick={() => handleDeleteTodo(index)}
                          aria-label="delete"
                          style={{ color: "#EC7063" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          todo?.completed
                            ? "Mark as Incomplete"
                            : "Mark as Complete"
                        }
                        arrow
                      >
                        <IconButton
                          onClick={() => handleCompleteTodo(index)}
                          aria-label="complete"
                        >
                          <CheckCircleOutlineIcon
                            style={{
                              color: todo?.completed ? "green" : "inherit",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </ButtonsContainer>
                  ) : (
                    <ButtonsContainer>
                      <IconButton
                        onClick={() => handleEditTodo(index)}
                        aria-label="edit"
                        style={{ color: "#3498DB" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTodo(index)}
                        aria-label="delete"
                        style={{ color: "#EC7063" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleCompleteTodo(index)}
                        aria-label="complete"
                      >
                        <CheckCircleOutlineIcon
                          style={{
                            color: todo?.completed ? "green" : "inherit",
                          }}
                        />
                      </IconButton>
                    </ButtonsContainer>
                  )}
                </StyledTodo>
              </Grid>
            ))}
          </StyledGrid>
        </div>
      </StyledContainer>
    </div>
  );
};

export default Dashboard;
