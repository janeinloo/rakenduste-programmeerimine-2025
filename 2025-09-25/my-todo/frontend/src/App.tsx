import './App.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Todos from './components/Todos'
import AdminTools from './components/AdminTools.tsx'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Todos</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/admin" element={<AdminTools />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
