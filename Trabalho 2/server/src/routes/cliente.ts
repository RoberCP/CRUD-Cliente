import * as express from "express"
import {addCliente, deleteCliente, getCliente, getClientes, updateCliente} from "../controllers/cliente"


const routerCliente = express.Router()

routerCliente.post("/clientes/registrar", addCliente)
routerCliente.get("/clientes/listar", getClientes)
routerCliente.put("/clientes/atualizar", updateCliente)
routerCliente.delete("/clientes/remover/:id", deleteCliente)
routerCliente.get("/clientes/buscar/:id", getCliente)

export default routerCliente