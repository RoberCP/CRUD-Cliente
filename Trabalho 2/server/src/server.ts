import express from "express"
import routerCliente from "./routes/cliente"
import {AppDataSource} from "./data-source"
import cors from "cors"
import routerUsuario from "./routes/usuario";
import routerLogin from "./routes/login";

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use("/", routerCliente)
app.use("/", routerUsuario)
app.use("/", routerLogin)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
