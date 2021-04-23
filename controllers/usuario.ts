import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';

export const getUsuarios = async(req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ usuarios });
    } catch (error) {
        console.log('Error en la conección a la base de datos-getUsuarios');
        res.status(500).json({
            msg: `Error interno de base de datos`
        });
    }
}

export const getUsuario = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if(usuario){
            res.json({ usuario });
        }else{
            res.status(404).json({
                msg: `No existe usuario con id`
            });
        }
    } catch (error) {
        console.log('Error en la conección a la base de datos-getUsuario');
        res.status(500).json({
            msg: `Error interno de base de datos`
        });
    }
}

export const postUsuario = async(req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = Usuario.build(body);
        await usuario.save();
        res.json({ usuario });
    } catch (error) {
        console.log('Error en la conección a la base de datos-postUsuarios');
        res.status(500).json({
            msg: `Error interno de base de datos`
        });
    }
}

export const putUsuario = async(req: Request, res: Response) => {   
    const { id }   = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con id ' + id
            });
        }
        await usuario.update(body);
        res.json({ usuario });
    } catch (error) {
        console.log('Error en la conección a la base de datos-postUsuarios');
        res.status(500).json({
            msg: `Error interno de base de datos`
        });
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {  
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg: 'No existe un usuario con id ' + id
            });
        }  
        // eliminación física
        // await usuario.destroy();
        // eliminación suave cambiando el estado
        await usuario.update({estado: false});
        res.json({
            msg: 'Usuario eliminado',
            usuario
        });
    } catch (error) {
        console.log('Error en la conección a la base de datos-deleteUsuario');
        res.status(500).json({
            msg: `Error interno de base de datos`
        });
    }
}