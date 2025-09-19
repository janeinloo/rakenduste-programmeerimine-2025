import "./index.css"
import { HashRouter, Routes, Route } from "react-router-dom"
import ReactDOM from "react-dom/client"
import React from "react"
import Layout from "./App.tsx"
import Home from "./Components/Home.tsx"
import About from "./Components/About.tsx"
import Something from "./Components/Something.tsx"

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="something" element={<Something />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
