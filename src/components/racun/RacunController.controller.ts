import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { AddRacunValidator, IAddRacunDto } from './dto/IAddRacun.dto';
import { EditRacunValidator, IEditRacunDto } from "./dto/IEditRacun.dto";
import { DefaultDeteAdapterOptions } from '../dete/DeteService.service';

class RacunController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        const deteId: number = +req.params?.did;

        this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
        .then(result => {
            if(result === null){
                return res.status(404).send("Dete not found!");
            }
            this.services.racun.getAllByDeteId(deteId)
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

        this.services.racun.getAll({loadDete:true})
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
            this.services.racun.getById(id, {loadDete: true})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Racun nije pronadjena!',
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
    //     const data = req.body as IAddRacunDto;

    //     if (!AddRacunValidator(data)) {
    //         return res.status(400).send(AddRacunValidator.errors);
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
    //         return this.services.racun.startTransaction();
    //     })
    //     .then( () => {
    //         return this.services.racun.add({
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
    //         await this.services.racun.commitChanges();
    //         res.send(result);
    //     })
    //     .catch(async error =>{
    //         await this.services.racun.rollbackChanges();
    //         res.status(error?.status ?? 500).send(error?.message);
    //     })
    // }

    async edit(req: Request, res: Response) {
        const deteid: number = +req.params?.did;
        const id: number = +req.params?.id;
        const data = req.body as IEditRacunDto;

        if (!EditRacunValidator(data)) {
            return res.status(400).send(EditRacunValidator.errors);
        }
        this.services.dete.getById(deteid,DefaultDeteAdapterOptions)
        .then(result => {
            if( result === null){
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }
            this.services.racun.getById(id, {loadDete:false})
            .then(result => {
                if (result === null) {
                    throw {
                        status: 404,
                        message: 'Racun nije pronadjena!',
                    }
                }
            })
            .then(() => {
                return this.services.racun.edit(
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
        const racunId: number     = +req.params?.pid;

        this.services.racun.getById(racunId, {loadDete:false})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Racun nije pronadjena!',
                }
            }
        })
        .then(() => {
            return this.services.racun.deleteById(racunId)
        })
        .then(() => {
            res.send('Racun je izbrisana!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    async add(req: Request, res: Response) {
        const deteId: number = +req.params?.did;
        const data = req.body as IAddRacunDto;

        if(!AddRacunValidator(data)) {
            return res.status(400).send(AddRacunValidator.errors);
        }

        this.services.dete.getById(deteId, {loadRoditelj: true, loadPredracun:false })
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.racun.add({
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

export default RacunController;
