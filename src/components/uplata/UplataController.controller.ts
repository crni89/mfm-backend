import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddUplataValidator, IAddUplataDto } from './dto/IAddUplata.dto';
import { EditUplataValidator, IEditUplataDto } from "./dto/IEditUplata.dto";
import { DefaultDeteAdapterOptions } from '../dete/DeteService.service';

class UplataController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        const deteId: number = +req.params?.did;

        this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
        .then(result => {
            if(result === null){
                return res.status(404).send("Dete not found!");
            }
            this.services.uplata.getAllByDeteId(deteId)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getAllRac(req: Request, res: Response) {

        this.services.uplata.getAll({loadDete:true})
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const deteId: number = +req.params?.did;
        const id: number = +req.params?.id;

        this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
        .then(result => {
            if(result === null){
                return res.status(404).send("Dete not found!");
            }
            this.services.uplata.getById(id, {loadDete: true})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Uplata nije pronadjena!',
                    }
                }

                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    // async add(req: Request, res: Response) {
    //     const deteId: number = +req.params?.did;
    //     const data = req.body as IAddUplataDto;

    //     if (!AddUplataValidator(data)) {
    //         return res.status(400).send(AddUplataValidator.errors);
    //     }
    //     this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
    //     .then(resultDete => {
    //         if( resultDete === null){
    //             throw{
    //                 status: 404,
    //                 message: `Dete with ${deteId} not found`,
    //             }
    //         }
    //     })
    //     .then( () => {
    //         return this.services.uplata.startTransaction();
    //     })
    //     .then( () => {
    //         return this.services.uplata.add({
    //             dete_id: deteId,
    //             datum: data.datum,
    //             status: data.status,
    //             datum_od: data.datumOd,
    //             datum_do: data.datumDo,
    //             tip: data.tip,
    //             broj_fakture: data.brojFakture,
    //             godina: data.godina,
    //             poziv_na_broj: data.pozivNaBroj,
    //             iznos: data.iznos,
    //             paket: data.paket,
    //             valuta: data.valuta,
    //             popust: data.popust,
    //         });
    //     })
    //     .then( async result => {
    //         await this.services.uplata.commitChanges();
    //         res.send(result);
    //     })
    //     .catch(async error =>{
    //         await this.services.uplata.rollbackChanges();
    //         res.status(error?.status ?? 500).send(error?.message);
    //     })
    // }

    async edit(req: Request, res: Response) {
        const deteid: number = +req.params?.did;
        const id: number = +req.params?.id;
        const data = req.body as IEditUplataDto;

        if (!EditUplataValidator(data)) {
            return res.status(400).send(EditUplataValidator.errors);
        }
        this.services.dete.getById(deteid,DefaultDeteAdapterOptions)
        .then(result => {
            if( result === null){
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }
            this.services.uplata.getById(id, {loadDete:false})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Uplata nije pronadjena!',
                    }
                }
            })
            .then(() => {
                return this.services.uplata.edit(
                    id,
                    {
                        datum: data.datum,
                        status: data.status,
                        poziv_na_broj: data.pozivNaBroj,
                        iznos: data.iznos,
                    }
                )
            })
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(error?.status ?? 500).send(error?.message);
            });
        })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    async delete(req: Request, res: Response) {
        const uplataId: number     = +req.params?.pid;

        this.services.uplata.getById(uplataId, {loadDete:false})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Uplata nije pronadjena!',
                }
            }
        })
        .then(() => {
            return this.services.uplata.deleteById(uplataId)
        })
        .then(() => {
            res.send('Uplata je izbrisana!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    async add(req: Request, res: Response) {
        const deteId: number = +req.params?.did;
        const data = req.body as IAddUplataDto;

        if(!AddUplataValidator(data)) {
            return res.status(400).send(AddUplataValidator.errors);
        }

        this.services.dete.getById(deteId, {loadRoditelj: true, loadPredracun:false })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.uplata.add({
                    dete_id: deteId,
                    datum: data.datum,
                    status: data.status,
                    poziv_na_broj: data.pozivNaBroj,
                    iznos: data.iznos,
                })
                .then(result =>{
                    res.send(result);
                })
                .catch(error => {
                    res.status(400).send(error?.message);
                });

            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }
}

export default UplataController;
