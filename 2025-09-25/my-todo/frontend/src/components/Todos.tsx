import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import SubmitTodo from "./SubmitTodo.tsx"

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error"
  }>({ open: false, 
    message: "", 
    severity: "success", 
  })

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos")
      const data = await response.json()
      setTodos(data)
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch todos",
        severity: "error",
      })
    }
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Todo deleted successfully",
          severity: "success",
        })
        fetchTodos()
      } else {
        const error = await res.json()
        setSnackbar({
          open: true,
          message: error.message || "Failed to delete todo",
          severity: "error",
        })
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete todo",
        severity: "error",
      })
    }
  }

  const updateTodo = async (id: string, title: string, completed: boolean) => {
    try {
      const res = await fetch(`http://localhost:3000/todos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, completed }),
      })
      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Todo updated successfully",
          severity: "success",
        })
        fetchTodos()
      } else {
        const error = await res.json()
        setSnackbar({
          open: true,
          message: error.message || "Failed to update todo",
          severity: "error",
        })
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update todo",
        severity: "error",
      })
    }
  }

  return(
    <Box>
      <Typography variant="h4" mb={2}>
        My Todos
      </Typography>
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      <SubmitTodo fetchTodos={fetchTodos} setSnackbar={setSnackbar} />
    </Box>
  )
}

type TodoListProps = {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo }) => {
  const [editId, setEditId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>("")
  const [editCompleted, setEditCompleted] = useState<boolean>(false)

  return (
    <List>
      {todos.map((todo) => (
        <ListItem 
          key={todo.id}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {editId === todo.id ? (
            <>
              <TextField
                size="small"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <Checkbox
                checked={editCompleted}
                onChange={event => setEditCompleted(event.target.checked)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateTodo(todo.id, editTitle, editCompleted)
                  setEditId(null)
                }}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditId(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Checkbox
                checked={todo.completed}
                onChange={() => updateTodo(todo.id, todo.title, !todo.completed)}
              />
              {todo.title}
              <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setEditId(todo.id)
                setEditTitle(todo.title)
              }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
            </>
          )}
        </ListItem>
      ))}
    </List>
  )
}


export default Todos