import { Box, List, ListItem, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const AdminTools = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos/admin");
      const data = await response.json();
      setTodos(data);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch todos",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleDeleted = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/todos/admin/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        const updatedTodo = await res.json();
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setSnackbar({
          open: true,
          message: "Todo status toggled successfully",
          severity: "success",
        });
      } else {
        const error = await res.json();
        setSnackbar({
          open: true,
          message: error.message || "Failed to update todo status",
          severity: "error",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update todo status",
        severity: "error",
      });
    }
  }

  return (
    <Box>
      <Typography variant="h4" mb={2}>Admin TODOs</Typography>
      <List>
        {todos.map(todo => (
          <ListItem key={todo.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ textDecoration: todo.deleted ? "line-through" : "none" }}>{todo.title}</span>
            <Button
              variant="outlined"
              color={todo.deleted ? "success" : "error"}
              onClick={() => toggleDeleted(todo.id)}
            >
              {todo.deleted ? "Restore" : "Delete"}
            </Button>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default AdminTools