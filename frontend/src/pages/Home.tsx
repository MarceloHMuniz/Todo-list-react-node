import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { Container, TextField, Button, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { TaskItem } from "../components/TaskItem";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/task`);
      setTodos(response.data);
    }

    fetchTasks();
  }, []);

  const handleAddTodo = async () => {
    const userId = 1;
    if (inputValue.trim()) {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/task`, {
        title: inputValue.trim(),
        userId,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setInputValue("");
    }
  };

  const handleToggleCompleted = async (id: number, completed: boolean) => {
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/task/${id}`, {
      completed: !completed,
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const handleRemoveTodo = async (id: number) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/task/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ backgroundColor: "#white", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg">
        <h1 style={{ color: "#fff" }}>Todo List</h1>
        <TextField
          fullWidth
          label="New Task"
          variant="filled"
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
        <Grid container spacing={2}>
        {todos.map((todo) => (
<Grid item xs={12} sm={6} md={4} key={todo.id}>
  <TaskItem
    id={todo.id}
    text={todo.title}
    completed={todo.completed}
    onRemove={handleRemoveTodo}
    onToggleCompleted={handleToggleCompleted}
  />
</Grid>
))}
        </Grid>
      </Container>
    </div>
  );
};
