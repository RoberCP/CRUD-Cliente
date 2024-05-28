import * as express from "express"
import {addUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario} from "../controllers/usuario"


const routerUsuario = express.Router()

routerUsuario.post("/usuarios/registrar", addUsuario)
routerUsuario.get("/usuarios/listar", getUsuarios)
routerUsuario.put("/usuarios/atualizar", updateUsuario)
routerUsuario.delete("/usuarios/remover/:id", deleteUsuario)
routerUsuario.get("/usuarios/buscar/:id", getUsuario)

export default routerUsuario