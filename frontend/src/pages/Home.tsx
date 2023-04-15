import React, { useState } from "react";
import { Header } from "../components/Header";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface Todo {
  id: number;
  text: string;
}

export const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: inputValue.trim() },
      ]);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <h1>Todo List</h1>
        <TextField
          fullWidth
          label="New Task"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          startIcon={<AddIcon />}
          sx={{ my: 2 }}
        >
          Add Task
        </Button>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};