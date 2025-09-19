import {
  Box, Typography, List,
  ListItem, ListItemText,
  TextField, Button, Container
} from "@mui/material"

export default function About() {
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
        />
        <TextField
          fullWidth
          label="Sinu email"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sõnum"
          margin="normal"
          multiline
          rows={4}
          />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Saada
        </Button>
      </Box>
    </Container>
  )
}