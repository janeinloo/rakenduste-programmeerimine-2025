import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import SubmitCat from "./SubmitCat.tsx"

type Cat = {
  id: string
  name: string
  createdAt: number
  updatedAt: number | null
  deleted: boolean
}

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([])
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error"
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  const fetchCats = async () => {
    try {
      const response = await fetch("http://localhost:3000/cats")
      const data = await response.json()
      setCats(data)
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch cats",
        severity: "error",
      })
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  const deleteCat = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/cats`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Cat deleted successfully",
          severity: "success",
        })
        fetchCats()
      } else {
        const error = await res.json()
        setSnackbar({
          open: true,
          message: error.message || "Failed to delete cat",
          severity: "error",
        })
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete cat",
        severity: "error",
      })
    }
  }

  const updateCat = async (id: string, name: string) => {
    try {
      const res = await fetch(`http://localhost:3000/cats`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name }),
      })
      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Cat updated successfully",
          severity: "success",
        })
        fetchCats()
      } else {
        const error = await res.json()
        setSnackbar({
          open: true,
          message: error.message || "Failed to update cat",
          severity: "error",
        })
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to update cat",
        severity: "error",
      })
    }
  }

  return (
    <Box>
      <Typography
        variant="h4"
        mb={2}
      >
        Cats
      </Typography>
      <CatsList
        cats={cats}
        deleteCat={deleteCat}
        updateCat={updateCat}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
      <SubmitCat fetchCats={fetchCats} setSnackbar={setSnackbar} />
    </Box>
  )
}

type CatsListProps = {
  cats: Cat[]
  deleteCat: (id: string) => void
  updateCat: (id: string, name: string) => void
}

const CatsList: React.FC<CatsListProps> = ({ cats, deleteCat, updateCat }) => {
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>("")
  return (
    <List>
      {cats.map(cat => (
        <ListItem
          key={cat.id}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {editId === cat.id ? (
            <>
              <TextField
                size="small"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateCat(cat.id, editName)
                  setEditId(null)
                }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditId(null)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              {cat.name}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setEditId(cat.id)
                  setEditName(cat.name)
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteCat(cat.id)}
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

export default Cats
