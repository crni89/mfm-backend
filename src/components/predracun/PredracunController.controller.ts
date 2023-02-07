import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddPredracunValidator, IAddPredracunDto } from './dto/IAddPredracun.dto';
import { EditPredracunValidator, IEditPredracunDto } from "./dto/IEditPredracun.dto";
import { DefaultDeteAdapterOptions } from '../dete/DeteService.service';

class PredracunController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        const deteId: number = +req.params?.did;

        this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
        .then(result => {
            if(result === null){
                return res.status(404).send("Dete not found!");
            }
            this.services.predracun.getAllByDeteId(deteId)
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

    async getAllPre(req: Request, res: Response) {

        this.services.predracun.getAll({loadDete:true})
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
            this.services.predracun.getById(id, {loadDete: true})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Predracun nije pronadjena!',
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
    //     const data = req.body as IAddPredracunDto;

    //     if (!AddPredracunValidator(data)) {
    //         return res.status(400).send(AddPredracunValidator.errors);
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
    //         return this.services.predracun.startTransaction();
    //     })
    //     .then( () => {
    //         return this.services.predracun.add({
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
    //         await this.services.predracun.commitChanges();
    //         res.send(result);
    //     })
    //     .catch(async error =>{
    //         await this.services.predracun.rollbackChanges();
    //         res.status(error?.status ?? 500).send(error?.message);
    //     })
    // }

    async edit(req: Request, res: Response) {
        const deteid: number = +req.params?.did;
        const id: number = +req.params?.id;
        const data = req.body as IEditPredracunDto;

        if (!EditPredracunValidator(data)) {
            return res.status(400).send(EditPredracunValidator.errors);
        }
        this.services.dete.getById(deteid,DefaultDeteAdapterOptions)
        .then(result => {
            if( result === null){
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }
            this.services.predracun.getById(id, {loadDete:false})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Predracun nije pronadjena!',
                    }
                }
            })
            .then(() => {
                return this.services.predracun.edit(
                    id,
                    {
                        datum: data.datum,
                        status: data.status,
                        datum_od: data.datumOd,
                        datum_do: data.datumDo,
                        tip: data.tip,
                        broj_fakture: +data.brojFakture,
                        godina: data.godina,
                        poziv_na_broj: data.pozivNaBroj,
                        iznos: data.iznos,
                        paket: data.paket,
                        valuta: data.valuta,
                        popust: data.popust,
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
        const predracunId: number     = +req.params?.pid;

        this.services.predracun.getById(predracunId, {loadDete:false})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Predracun nije pronadjena!',
                }
            }
        })
        .then(() => {
            return this.services.predracun.deleteById(predracunId)
        })
        .then(() => {
            res.send('Predracun je izbrisana!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    async add(req: Request, res: Response) {
        const deteId: number = +req.params?.did;
        const data = req.body as IAddPredracunDto;

        if(!AddPredracunValidator(data)) {
            return res.status(400).send(AddPredracunValidator.errors);
        }

        this.services.dete.getById(deteId, {loadRoditelj: true, loadPredracun:false })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.predracun.add({
                    dete_id: deteId,
                    datum: data.datum,
                    status: data.status,
                    datum_od: data.datumOd,
                    datum_do: data.datumDo,
                    tip: data.tip,
                    broj_fakture: +data.brojFakture,
                    godina: data.godina,
                    poziv_na_broj: data.pozivNaBroj,
                    iznos: data.iznos,
                    paket: data.paket,
                    valuta: data.valuta,
                    popust: data.popust,
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

export default PredracunController;
