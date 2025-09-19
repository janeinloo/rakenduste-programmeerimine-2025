import {
  Box, Typography, List,
  ListItem, ListItemText,
  TextField, Button, Container
} from "@mui/material"
import { useLocalStorage } from "./useLocalStorage"

export default function About() {
  const [name, setName] = useLocalStorage("name", "")
  const [email, setEmail] = useLocalStorage("email", "")
  const [message, setMessage] = useLocalStorage("message", "")

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Jan Aaron Einloo
      </Typography>
      <Typography variant="body1" gutterBottom>
        Olen tudeng Tallinna Ülikoolis
      </Typography>
      <Box mt={3}>
        <Typography variant="h6">Minu hobid:</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Muusika" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sport" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mängimine" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Programmeerimine" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Loodus (huvitavates kohtades ujumine)" />
          </ListItem>
        </List>
      </Box>
      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Võta minuga ühendust:
        </Typography>
        <TextField
          fullWidth
          label="Sinu nimi"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Sinu email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Sõnum"
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Saada
        </Button>
      </Box>
    </Container>
  )
}