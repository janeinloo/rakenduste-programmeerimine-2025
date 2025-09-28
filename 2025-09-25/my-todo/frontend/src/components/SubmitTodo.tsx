import { Box, Button, Stack, TextField, FormControlLabel, Checkbox } from "@mui/material"
import React, { useState } from "react"

type SubmitTodoProps = {
  fetchTodos: () => void
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      open: boolean
      message: string
      severity: "success" | "error"
    }>
  >
}

const SubmitTodo = ({ fetchTodos, setSnackbar }: SubmitTodoProps) => {
  const [title, setTitle] = useState("")
  const [completed, setCompleted] = useState(false)

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      })
      if (response.ok) {
        setSnackbar({
          open: true,
          message: "Todo added successfully",
          severity: "success",
        })
        setTitle("")
        setCompleted(false)
        fetchTodos()
      } else {
        const error = await response.json()
        setSnackbar({
          open: true,
          message: error.message || "Failed to add todo",
          severity: "error",
        })
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to add todo",
        severity: "error",
      })
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitTodo()
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <TextField
            label="Todo title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={event => setCompleted(event.target.checked)}
              />
            }
            label="Completed"
          />
          <Button variant="contained" color="success" type="submit">
            Add Todo
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default SubmitTodo
