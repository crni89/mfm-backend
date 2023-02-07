import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddPorodicniStatusValidator, IAddPorodicniStatusDto } from './dto/IAddPorodicniStatus.dto';
import { EditPorodicniStatusValidator, IEditPorodicniStatusDto } from "./dto/IEditPorodicniStatus.dto";

class PorodicniStatusController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.porodicniStatus.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.porodicniStatus.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Porodicni status nije pronadjen!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddPorodicniStatusDto;

        if (!AddPorodicniStatusValidator(data)) {
            return res.status(400).send(AddPorodicniStatusValidator.errors);
        }

        this.services.porodicniStatus.add({
            ime: data.ime,
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
        const data = req.body as IEditPorodicniStatusDto;

        if (!EditPorodicniStatusValidator(data)) {
            return res.status(400).send(EditPorodicniStatusValidator.errors);
        }

        this.services.porodicniStatus.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Porodicni status nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.porodicniStatus.edit(
                id,
                {
                    ime: data.ime,
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
        const porodicniStatusId: number     = +req.params?.id;

        this.services.porodicniStatus.getById(porodicniStatusId, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Porodicni status nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.porodicniStatus.deleteById(porodicniStatusId)
        })
        .then(() => {
            res.send('PorodicniStatus je izbrisan!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }
}

export default PorodicniStatusController;
