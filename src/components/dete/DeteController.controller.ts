import {Request, response, Response} from "express";
import BaseController from '../../common/BaseController';
import { DefaultDeteAdapterOptions, IDeteAdapterOptions } from './DeteService.service';
import { AddDeteValidator, IAddDeteDto } from './dto/IAddDete.dto';
import { EditDeteValidator, IEditDeteDto, IEditDete } from './dto/IEditDete.dto';
import DeteService from './DeteService.service';
import { DevConfig } from "../../configs";
import IConfig from "../../common/IConfig.interface";
import * as mysql2 from "mysql2/promise"
import DeteModel from './DeteModel.model';

class DeteController extends BaseController {
    
    async getAll(req: Request, res: Response) {
        this.services.dete.getAll(DefaultDeteAdapterOptions)
        .then(result =>{
            res.send(result);
        })
        .catch(error =>{
            res.status(500).send(error?.message);
        });
    }
    
    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.dete.getById(id, DefaultDeteAdapterOptions)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddDeteDto;

        if (!AddDeteValidator(data)) {
            return res.status(400).send(AddDeteValidator.errors);
        }

        this.services.dete.add({
            ime_prezime: data.imePrezime,
            jmbg: data.jmbg,
            datum_rodj: data.datumRodj,
            adresa: data.adresa,
            broj_ugovora: data.brojUgovora,
            datum_ugovora: data.datumUgovora,
            datum_polaska: data.datumPolaska,
            subvencija: +data.subvencija,
            popust: data.popust,
            objekat: data.objekat,
            ugovor: data.ugovor,
            grupa: data.grupa,
            pstatus: data.pstatus
        })
        .then(newDete => {
            return this.services.dete.getById(newDete.deteId, {
                loadRoditelj:true,
                loadPredracun: true
            });
        })
        .then(async result => {
            await this.services.dete.commitChanges();
            res.send(result);
        })
        .catch(async error => {
            await this.services.dete.rollbackChanges();
            res.status(error?.status ?? 500).send(error?.message);
        })
    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;
        const data = req.body as IEditDeteDto;

        if (!EditDeteValidator(data)) {
            return res.status(400).send(EditDeteValidator.errors);
        }

        const serviceData: IEditDete = { };

        if (data.imePrezime !== undefined) {
            serviceData.ime_prezime = data.imePrezime;
        }

        if (data.jmbg !== undefined) {
            serviceData.jmbg = data.jmbg;
        }
        
        if (data.datumRodj !== undefined) {
            serviceData.datum_rodj = data.datumRodj;
        }

        if (data.adresa !== undefined){
            serviceData.adresa = data.adresa;
        }

        if (data.brojUgovora !== undefined){
            serviceData.broj_ugovora = data.brojUgovora;
        }

        if (data.datumUgovora !== undefined){
            serviceData.datum_ugovora = data.datumUgovora;
        }

        if (data.datumPolaska !== undefined){
            serviceData.datum_polaska = data.datumPolaska;
        }

        if (data.subvencija !== undefined){
            serviceData.subvencija = data.subvencija ? 1:0;
        }

        if (data.popust !== undefined){
            serviceData.popust = data.popust;
        }

        if (data.ugovor !== undefined){
            serviceData.ugovor = data.ugovor;
        }

        if (data.objekat !== undefined){
            serviceData.objekat = data.objekat;
        }
        
        if (data.grupa !== undefined){
            serviceData.grupa = data.grupa;
        }
        
        if (data.pstatus !== undefined){
            serviceData.pstatus = data.pstatus;
        }

        this.services.dete.edit(id, serviceData)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async delete(req: Request, res: Response) {
        const deteId: number     = +req.params?.id;

        this.services.dete.getById(deteId, DefaultDeteAdapterOptions)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }
        })
        .then(() => {
            return this.services.dete.deleteById(deteId)
        })
        .then(() => {
            res.send('Dete je izbrisano!');
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    // async searchDete(req, res) {
    //     const config: IConfig = DevConfig;
    //     const db = await mysql2.createConnection({
    //         host: config.database.host,
    //         port: config.database.port,
    //         user: config.database.user,
    //         password: config.database.password,
    //         database: config.database.database,
    //         charset: config.database.charset,
    //         timezone: config.database.timezone,
    //         supportBigNumbers: config.database.supportBigNumbers,
    //     });
        
        
    //     try {
    //       // get the deteId from the request query
    //       const objekat = req.query.objekat;
    //       const ugovor = req.query.ugovor;
    //       // search for the dete record in the database using the deteId
    //       const [dete] = await db.query(
    //         "SELECT * FROM dete WHERE objekat = ? AND ugovor = ?",
    //         [objekat, ugovor]
    //       );
    //       // if dete is found, return it in the response
    //       if (dete) {
    //         return res.json({ dete });
    //       } else {
    //         // if dete is not found, return a "not found" message
    //         return res.status(404).json({ message: "Dete not found" });
    //       }
    //     } catch (error) {
    //       // if there is an error, return a "server error" message
    //       return res.status(500).json({ message: "Server error" });
    //     }
    // }

    async search(req: Request, res: Response) {
        const value1 = req.query.objekat;
        const value2 = req.query.ugovor;

        this.services.dete.search('objekat',value1,'ugovor',value2, {loadRoditelj: true, loadPredracun: true})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async searchPred(req: Request, res: Response) {
        const value1 = req.query.objekat;
        const value2 = req.query.ugovor;
        const value3 = req.query.status;

        this.services.dete.searchPredracun('objekat',value1,'ugovor',value2, 'status',value3, {loadRoditelj: true, loadPredracun: true})
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: 'Dete nije pronadjeno!',
                }
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }
}

export default DeteController;
