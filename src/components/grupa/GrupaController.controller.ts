import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddGrupaValidator, IAddGrupaDto } from './dto/IAddGrupa.dto';
import { EditGrupaValidator, IEditGrupaDto } from "./dto/IEditGrupa.dto";

class GrupaController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.grupa.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.grupa.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Grupa nije pronadjena!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddGrupaDto;

        if (!AddGrupaValidator(data)) {
            return res.status(400).send(AddGrupaValidator.errors);
        }

        this.services.grupa.add({
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
        const data = req.body as IEditGrupaDto;

        if (!EditGrupaValidator(data)) {
            return res.status(400).send(EditGrupaValidator.errors);
        }

        this.services.grupa.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Grupa nije pronadjena!',
                }
            }
        })
        .then(() => {
            return this.services.grupa.edit(
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
        const GrupaId: number     = +req.params?.id;

        this.services.grupa.getById(GrupaId, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Grupa nije pronadjena!',
                }
            }
        })
        .then(() => {
            return this.services.grupa.deleteById(GrupaId)
        })
        .then(() => {
            res.send('Grupa je izbrisana!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }
}

export default GrupaController;
