import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./App.css";
import { Routes, Route, Link } from "react-router";
import Home from "./Components/Home.tsx";
import About from "./Components/About.tsx";
import Something from "./Components/Something.tsx";

function App() {
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <Button component={Link} to="/" variant="contained">
          Home
        </Button>
        <Button component={Link} to="/about" variant="contained">
          About
        </Button>
        <Button component={Link} to="/something" variant="contained">
          Something
        </Button>
      </Stack>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/something" element={<Something />} />
      </Routes>
    </>
  );
}

export default App;
