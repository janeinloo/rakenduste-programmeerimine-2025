const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");


app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})