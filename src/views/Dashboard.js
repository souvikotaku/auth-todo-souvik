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
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
});

const StyledTodo = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  marginBottom: "15px",
  backgroundColor: "#f9f9f9",
});

const TodoText = styled(ListItemText)({
  flex: "1",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const ButtonsContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const [todoList, setTodoList] = useState([]);
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
        // Editing existing todo
        const updatedTodoList = [...todoList];
        updatedTodoList[editingIndex] = { text: newTodo, completed: false };
        setTodoList(updatedTodoList);
        setEditingIndex(null);
      } else {
        // Adding new todo
        setTodoList([...todoList, { text: newTodo, completed: false }]);
      }

      // Clear input field
      setNewTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todoList[index].text);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate]);

  const handleCompleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = {
      ...todoList[index],
      completed: !todoList[index].completed,
    };
    setTodoList(updatedTodoList);
  };

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
      <StyledContainer component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5">Dashboard</Typography>

        <TextField
          label="Add Todo"
          variant="outlined"
          margin="normal"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <Button onClick={handleAddTodo} variant="contained" color="primary">
          {editingIndex !== null ? "Edit Todo" : "Add Todo"}
        </Button>

        <List>
          {todoList.map((todo, index) => (
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
          ))}
        </List>
      </StyledContainer>
    </div>
  );
};

export default Dashboard;
