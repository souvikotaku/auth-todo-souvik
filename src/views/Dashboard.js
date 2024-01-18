import React, { useState, useEffect } from "react";
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
import {
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
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    minWidth: "100%",
  },
}));

const TodoText = styled(ListItemText)({
  flex: "1",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
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

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("todos");
    navigate("/");
  };

  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
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
        // Update existing todo
        const updatedTodos = [...todoList];
        updatedTodos[editingIndex] = { text: newTodo, completed: false };
        setTodoList(updatedTodos);
        dispatch(editTodo({ index: editingIndex, text: newTodo }));
        setEditingIndex(null);
      } else {
        // Add new todo
        const updatedTodos = [...todoList, { text: newTodo, completed: false }];
        setTodoList(updatedTodos);
        dispatch(addTodo({ text: newTodo, completed: false }));
      }
      setNewTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todoList[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    // Delete todo
    const updatedTodos = todoList.filter((_, i) => i !== index);
    setTodoList(updatedTodos);
    dispatch(deleteTodo(index));
  };

  const handleCompleteTodo = (index) => {
    // Toggle completion status
    const updatedTodos = [...todoList];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodoList(updatedTodos);
    dispatch(toggleComplete(index));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
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
                  primary={todo.text}
                  secondary={todo.completed ? "Completed" : "Incomplete"}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
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
                      style={{ color: todo.completed ? "green" : "inherit" }}
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
