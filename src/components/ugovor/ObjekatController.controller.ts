import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddUgovorValidator, IAddUgovorDto } from './dto/IAddUgovor.dto';
import { EditUgovorValidator, IEditUgovorDto } from "./dto/IEditUgovor.dto";

class UgovorController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.ugovor.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.ugovor.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Ugovor nije pronadjen!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddUgovorDto;

        if (!AddUgovorValidator(data)) {
            return res.status(400).send(AddUgovorValidator.errors);
        }

        this.services.ugovor.add({
            ime: data.ime,
            cena: data.cena
        })
        .then(result =>{
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error?.message);
        });
    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;
        const data = req.body as IEditUgovorDto;

        if (!EditUgovorValidator(data)) {
            return res.status(400).send(EditUgovorValidator.errors);
        }

        this.services.ugovor.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Ugovor nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.ugovor.edit(
                id,
                {
                    ime: data.ime,
                    cena: data.cena,
                }
            )
        })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    async delete(req: Request, res: Response) {
        const ugovorId: number     = +req.params?.id;

        this.services.ugovor.getById(ugovorId, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Ugovor nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.ugovor.deleteById(ugovorId)
        })
        .then(() => {
            res.send('Ugovor je izbrisan!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }
}

export default UgovorController;
