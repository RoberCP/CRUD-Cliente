import { AppDataSource } from "../data-source"
import {Request, Response} from "express"
import {Cliente} from "../models/cliente"

export const getClientes = async (req: Request, res: Response) => {
    try {
        const clientes:Cliente[] = await AppDataSource.getRepository(Cliente).find()
        res.status(200).json(clientes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar clientes' })
    }
}

export const getCliente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results: Cliente = await AppDataSource.getRepository(Cliente).findOneBy({id: id})
    if(results == null)
        return res.status(500).json({ message: 'Cliente não encontrada' });

    return res.status(200).send(results)
}

export const addCliente = async (req: Request, res: Response) => {
    const cliente: Cliente[] = AppDataSource.getRepository(Cliente).create(req.body)
    const results: Cliente[] = await AppDataSource.getRepository(Cliente).save(cliente)
    return res.send(results)
}

export const updateCliente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const cliente: Cliente = await AppDataSource.
        getRepository(Cliente).
        findOneBy({ id: id })

    AppDataSource.getRepository(Cliente).merge(cliente, req.body)
    const results: Cliente = await AppDataSource.getRepository(Cliente).save(cliente)
    return res.send(results)
}

export const deleteCliente = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Cliente).delete(id)
    return res.send(results)
}