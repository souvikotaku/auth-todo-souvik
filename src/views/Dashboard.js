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
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      if (editingIndex !== null) {
        // Editing existing todo
        const updatedTodoList = [...todoList];
        updatedTodoList[editingIndex] = newTodo;
        setTodoList(updatedTodoList);
        setEditingIndex(null);
      } else {
        // Adding new todo
        setTodoList([...todoList, newTodo]);
      }

      // Clear input field
      setNewTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todoList[index]);
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

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h5">Dashboard</Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>

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
          <ListItem key={index}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => handleEditTodo(index)}
                edge="end"
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteTodo(index)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </StyledContainer>
  );
};

export default Dashboard;
