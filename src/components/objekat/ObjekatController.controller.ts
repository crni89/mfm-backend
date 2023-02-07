import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddObjekatValidator, IAddObjekatDto } from './dto/IAddObjekat.dto';
import { EditObjekatValidator, IEditObjekatDto } from "./dto/IEditObjekat.dto";

class ObjekatController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.objekat.getAll({})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.objekat.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Objekat nije pronadjen!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddObjekatDto;

        if (!AddObjekatValidator(data)) {
            return res.status(400).send(AddObjekatValidator.errors);
        }

        this.services.objekat.add({
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
        const data = req.body as IEditObjekatDto;

        if (!EditObjekatValidator(data)) {
            return res.status(400).send(EditObjekatValidator.errors);
        }

        this.services.objekat.getById(id, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Objekat nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.objekat.edit(
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
        const objekatId: number     = +req.params?.id;

        this.services.objekat.getById(objekatId, {})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Objekat nije pronadjen!',
                }
            }
        })
        .then(() => {
            return this.services.objekat.deleteById(objekatId)
        })
        .then(() => {
            res.send('Objekat je izbrisan!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }
}

export default ObjekatController;
