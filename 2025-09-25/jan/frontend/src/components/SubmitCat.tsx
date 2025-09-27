import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: "success" | "error" }>>;
};

const SubmitCat = ({ fetchCats, setSnackbar }: SubmitCatProps) => {
  const [name, setName] = useState("");

  const submitCat = async () => {
    try {
      const response = await fetch("http://localhost:3000/cats", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setSnackbar({open: true, message: "Cat added successfully", severity: "success"});
        setName("");
        fetchCats();
      } else {
        const error = await response.json();
        setSnackbar({open: true, message: error.message || "Failed to add cat", severity: "error"});
      }
    } catch {
      setSnackbar({open: true, message: "Failed to add cat", severity: "error"});
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitCat();
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}
    >
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Cat name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitCat;