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

import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import "./Dashboard.css";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
});

const StyledTodo = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginBottom: "15px",
  backgroundColor: "#f9f9f9",
  width: "100%",
  maxWidth: "400px",
  maxWidth: "100% !important",
  transition: "background-color 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow
  "&:hover": {
    backgroundColor: "#e8e8e8",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Box shadow on hover
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    minWidth: "100%",
  },
}));

const TodoText = styled(ListItemText)({
  flex: "1",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  "& > span": {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});
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

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobileView = useMediaQuery("(max-width:600px)");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
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
    dispatch(deleteTodo(index));
    notify("Todo deleted successfully");
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
      <ToastContainer position="top-right" autoClose={3000} />
      <AppBar position="static">
        <Toolbar>
          <>
            <img
              src="your-logo-url-here"
              alt="logo"
              style={{ marginRight: "10px" }}
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
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
          <div>
            <Typography variant="h6" style={{ margin: "20px" }}>
              Hello
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
        <Typography variant="h6">Welcome!</Typography>
        <Typography variant="h5">{localStorage.getItem("username")}</Typography>

        <TextField
          label="Add Todo"
          variant="outlined"
          margin="normal"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className={!isMobileView ? "desktop-textfield" : ""}
        />

        <Button onClick={handleAddTodo} variant="contained" color="primary">
          {editingIndex !== null ? "Edit Todo" : "Add Todo"}
        </Button>

        <StyledGrid container spacing={2}>
          {todoList.map((todo, index) => (
            <Grid
              item
              md={3}
              sm={12}
              key={index}
              className={isMobileView ? "mobile-todo-grid" : ""}
            >
              <StyledTodo key={index}>
                <TodoText
                  primary={todo?.text}
                  secondary={todo?.completed ? "Completed" : "Incomplete"}
                  style={{
                    textDecoration: todo?.completed ? "line-through" : "none",
                  }}
                />
                <ButtonsContainer>
                  <IconButton
                    onClick={() => handleEditTodo(index)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTodo(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleCompleteTodo(index)}
                    aria-label="complete"
                  >
                    <CheckCircleOutlineIcon
                      style={{ color: todo?.completed ? "green" : "inherit" }}
                    />
                  </IconButton>
                </ButtonsContainer>
              </StyledTodo>
            </Grid>
          ))}
        </StyledGrid>
      </StyledContainer>
    </div>
  );
};

export default Dashboard;
