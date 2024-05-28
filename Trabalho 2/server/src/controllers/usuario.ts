import {Request, Response} from "express"
import {AppDataSource} from "../data-source"
import {Usuario} from "../models/usuario"

export const addUsuario = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    if(usuarioRegistrado(id)) {
        return res.status(409)
    }

    const usuario: Usuario[] = AppDataSource.getRepository(Usuario).create(req.body)
    const results: Usuario[] = await AppDataSource.getRepository(Usuario).save(usuario)
    return res.status(200).send(results)
}

export const getUsuarios = async (req: Request, res: Response) => {
    const results: Usuario[] = await AppDataSource.getRepository(Usuario).find()
    return res.status(200).send(results)
}

export const updateUsuario = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const usuario: Usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id: id })

    AppDataSource.getRepository(Usuario).merge(usuario, req.body)
    const results: Usuario = await AppDataSource.getRepository(Usuario).save(usuario)
    return res.send(results)
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Usuario).delete(id)
    return res.send(results)
}

export const getUsuario = async (req: Request, res: Response) => {
    const id: number = +req.params.id
    const results = await AppDataSource.getRepository(Usuario).findOneBy({id: id})
    return res.send(results)
}

export const usuarioRegistrado = async (id: number) => {
    const usuario: Usuario = await AppDataSource.getRepository(Usuario).findOneBy({ id: id })
    return !!usuario // funciona da mesma forma que um operador ternario
}